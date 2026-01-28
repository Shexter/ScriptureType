package com.aseemsavio.bibilia.data

import kotlinx.serialization.Serializable
import java.security.MessageDigest

@Serializable
data class TypingVersePayload(
  val id: String,
  val text: String,
  val ref: String,
  val book: String,
  val chapter: Int,
  val verse: Int,
  val wordCount: Int
)

@Serializable
data class VerseNotePayload(
  val verseId: String,
  val ref: String,
  val noteHtml: String
)

// PRD-aligned lightweight payloads with short keys
@Serializable
data class ChapterRef(
  val t: String, // testament
  val b: String, // book
  val c: Int    // chapter
)

@Serializable
data class VerseItem(
  val v: Int,    // verse number
  val tx: String // text
)

@Serializable
data class TypingChapterPayload(
  val ref: ChapterRef,
  val vs: List<VerseItem>,
  val hash: String
)

@Serializable
data class NoteItem(
  val id: String,
  val txt: String,
  val src: String? = null
)

@Serializable
data class VerseNotes(
  val v: Int,      // verse number
  val n: List<NoteItem> // notes
)

@Serializable
data class NotesChapterPayload(
  val ref: ChapterRef,
  val notes: List<VerseNotes>,
  val hash: String
)

data class VerseIdParts(
  val testament: Testament,
  val book: BibleBookName,
  val chapter: BibleChapter,
  val verse: VerseNumber
)

fun Verse.toVerseId(): String = "${testament.value}-${book.value}-${chapter}-${verse}"

fun Verse.toRef(): String = "${book.value} ${chapter}:${verse}"

fun String.wordCount(): Int =
  trim().split(Regex("\\s+")).filter { it.isNotBlank() }.size

fun parseVerseId(verseId: String): VerseIdParts? {
  val sanitized = verseId.trim()
  if (sanitized.isEmpty()) return null
  val segments = sanitized.split("-")
  if (segments.size < 4) return null

  val testamentValue = segments.first()
  val verseValue = segments.last()
  val chapterValue = segments[segments.size - 2]
  val bookValue = segments.subList(1, segments.size - 2).joinToString("-")

  if (testamentValue.isBlank() || bookValue.isBlank()) return null
  val chapter = chapterValue.toIntOrNull() ?: return null
  val verse = verseValue.toIntOrNull() ?: return null

  return VerseIdParts(Testament(testamentValue), BibleBookName(bookValue), BibleChapter(chapter), verse)
}

// Helper functions for lightweight payloads
fun List<Verse>.toTypingChapterPayload(testament: Testament, book: BibleBookName, chapter: Int): TypingChapterPayload {
  val verses = this.sortedBy { it.verse }
  val ref = ChapterRef(testament.value, book.value, chapter)
  val vs = verses.map { VerseItem(it.verse, it.text) }
  val content = verses.joinToString("|") { "${it.verse}:${it.text}" }
  val hash = "sha256:${content.sha256()}"
  return TypingChapterPayload(ref, vs, hash)
}

fun List<Verse>.toNotesChapterPayload(testament: Testament, book: BibleBookName, chapter: Int): NotesChapterPayload? {
  val versesWithNotes = this.filter { it.notes != null && it.notes!!.isNotBlank() }
  if (versesWithNotes.isEmpty()) return null
  
  val ref = ChapterRef(testament.value, book.value, chapter)
  val notes = versesWithNotes.sortedBy { it.verse }.map { verse ->
    VerseNotes(
      v = verse.verse,
      n = listOf(
        NoteItem(
          id = "${book.value.lowercase()}-${chapter}-${verse.verse}-1",
          txt = verse.notes ?: "",
          src = null // TODO: parse source from notes if available
        )
      )
    )
  }
  val content = notes.joinToString("|") { "${it.v}:${it.n.joinToString(",") { n -> n.txt }}" }
  val hash = "sha256:${content.sha256()}"
  return NotesChapterPayload(ref, notes, hash)
}

private fun String.sha256(): String {
  val digest = MessageDigest.getInstance("SHA-256")
  val hash = digest.digest(this.toByteArray())
  return hash.joinToString("") { "%02x".format(it) }
}
