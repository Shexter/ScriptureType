package com.aseemsavio.bibilia.core.api

import com.aseemsavio.bibilia.data.*
import com.aseemsavio.bibilia.database.extensions.BibiliaDatabases

class BibiliaMapService(private val databases: BibiliaDatabases) : BibiliaService, CpdvLightweightService {

  private val cpdvVerses: List<Verse> by lazy {
    val database = databases[Version("CPDV")] ?: return@lazy emptyList()
    database.getTestamentNames()
      .flatMap { testament ->
        database.getBookNames(testament)[testament].orEmpty()
          .flatMap { book ->
            val totalChapters = database.getTotalChapters(testament, book)
            if (totalChapters <= 0) emptyList()
            else (1..totalChapters).flatMap { chapterNumber ->
              database.getChapter(testament, book, BibleChapter(chapterNumber))
            }
          }
      }
  }

  override fun getTestamentNames(version: Version): Set<String> =
    databases[version]?.getTestamentNames()?.map { it.value }?.toSet() ?: emptySet()

  override fun getTestaments(version: Version, testamentName: String?): List<JsonTestament> {
    TODO("Not yet implemented")
  }

  override fun getBookNames(version: Version, testamentName: String?): List<BookNamesItem> {
    fun getBooks(t: String) = databases[version]?.getBookNames(Testament(t))?.map { testament ->
      testament.value?.map { it.value }?.let { BookNamesItem(testament.key.value, it.toSet()) }
    }?.filterNotNull() ?: emptyList()

    return if (testamentName == null) getTestamentNames(version).map { t -> getBooks(t) }.flatten()
    else getBooks(testamentName)
  }

  override fun getBook(version: Version, bookName: String): JsonBook? {
    TODO("Not yet implemented")
  }

  override fun getTotalChapters(version: Version, testament: Testament, book: BibleBookName): TotalChapters =
    databases[version]?.getTotalChapters(testament, book) ?: 0

  override fun getChapter(
    version: Version,
    testament: Testament,
    book: BibleBookName,
    chapter: BibleChapter
  ): List<JsonVerse> =
    databases[version]?.getChapter(testament, book, chapter)?.map {
      JsonVerse(it.chapter, it.verse, it.text, it.notes)
    } ?: emptyList()


  override fun getTotalVerses(
    version: Version,
    testament: Testament,
    book: BibleBookName,
    chapter: BibleChapter
  ): TotalVerses =
    databases[version]?.getTotalVerses(testament, book, chapter) ?: 0

  override fun getVerse(
    version: Version,
    testament: Testament,
    book: BibleBookName,
    chapter: BibleChapter,
    verse: VerseNumber
  ): JsonVerse? = databases[version]?.getVerse(testament, book, chapter, verse)?.let {
    JsonVerse(it.chapter, it.verse, it.text, it.notes)
  }

  override fun getVerses(
    version: Version,
    testament: Testament,
    book: BibleBookName,
    chapter: BibleChapter,
    from: VerseNumber,
    to: VerseNumber
  ): List<JsonVerse> = databases[version]?.getVerses(testament, book, chapter, from, to)?.map {
    JsonVerse(it.chapter, it.verse, it.text, it.notes)
  } ?: emptyList()

  override fun getRandomVerseTypingPayload(): TypingVersePayload? {
    if (cpdvVerses.isEmpty()) return null
    val verse = cpdvVerses.random()

    return TypingVersePayload(
      id = verse.toVerseId(),
      text = verse.text,
      ref = verse.toRef(),
      book = verse.book.value,
      chapter = verse.chapter,
      verse = verse.verse,
      wordCount = verse.text.wordCount()
    )
  }

  override fun getVerseNotePayload(verseId: String): VerseNotePayload? {
    val parts = parseVerseId(verseId) ?: return null
    val database = databases[Version("CPDV")] ?: return null
    val verse = database.getVerse(parts.testament, parts.book, parts.chapter, parts.verse) ?: return null
    val noteHtml = verse.notes?.takeIf { it.isNotBlank() } ?: return null

    return VerseNotePayload(
      verseId = verse.toVerseId(),
      ref = verse.toRef(),
      noteHtml = noteHtml
    )
  }

  override fun getTypingChapterPayload(testament: Testament, book: BibleBookName, chapter: BibleChapter): TypingChapterPayload? {
    val database = databases[Version("CPDV")] ?: return null
    val verses = database.getChapter(testament, book, chapter)
    if (verses.isEmpty()) return null
    return verses.toTypingChapterPayload(testament, book, chapter.value)
  }

  override fun getNotesChapterPayload(testament: Testament, book: BibleBookName, chapter: BibleChapter): NotesChapterPayload? {
    val database = databases[Version("CPDV")] ?: return null
    val verses = database.getChapter(testament, book, chapter)
    if (verses.isEmpty()) return null
    return verses.toNotesChapterPayload(testament, book, chapter.value)
  }
}
