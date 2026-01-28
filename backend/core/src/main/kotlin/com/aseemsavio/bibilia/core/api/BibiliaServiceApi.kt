package com.aseemsavio.bibilia.core.api

import com.aseemsavio.bibilia.data.*

interface BibiliaService : TestamentService, BookService, ChaptersService, VersesService

interface CpdvLightweightService {
  // Legacy verse-level endpoints (for backward compatibility)
  fun getRandomVerseTypingPayload(): TypingVersePayload?
  fun getVerseNotePayload(verseId: String): VerseNotePayload?
  
  // PRD-aligned chapter-level endpoints
  fun getTypingChapterPayload(testament: Testament, book: BibleBookName, chapter: BibleChapter): TypingChapterPayload?
  fun getNotesChapterPayload(testament: Testament, book: BibleBookName, chapter: BibleChapter): NotesChapterPayload?
}

interface TestamentService {
  fun getTestamentNames(version: Version): Set<String>
  fun getTestaments(version: Version, testamentName: String?): List<JsonTestament>
}

interface BookService {
  fun getBookNames(version: Version, testamentName: String? = null): List<BookNamesItem>
  fun getBook(version: Version, bookName: String): JsonBook?
}

interface ChaptersService {
  fun getTotalChapters(version: Version, testament: Testament, book: BibleBookName): TotalChapters
  fun getChapter(version: Version, testament: Testament, book: BibleBookName, chapter: BibleChapter): List<JsonVerse>
}

interface VersesService {
  fun getTotalVerses(version: Version, testament: Testament, book: BibleBookName, chapter: BibleChapter): TotalVerses
  fun getVerse(version: Version, testament: Testament, book: BibleBookName, chapter: BibleChapter, verse: VerseNumber): JsonVerse?
  fun getVerses(
    version: Version,
    testament: Testament,
    book: BibleBookName,
    chapter: BibleChapter,
    from: VerseNumber,
    to: VerseNumber
  ): List<JsonVerse>
}
