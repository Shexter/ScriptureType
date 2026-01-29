import { envConfig } from "virtual:env-config";

type VerseReference = {
  t: string;
  b: string;
  c: number;
  v: number;
};

type VerseResponse = {
  ref: VerseReference;
  tx: string;
  hash?: string;
};

type ChapterRef = {
  t: string;
  b: string;
  c: number;
};

type ChapterVerse = {
  v: number;
  tx: string;
};

type ChapterResponse = {
  ref: ChapterRef;
  vs: ChapterVerse[];
  hash: string;
};

export type ChapterMeta = {
  testament: string;
  book: string;
  chapter: number;
  verses: number[];
  verseRange: string;
};

const defaultEndpoint = "/api/cpdv/v1/typing/verse";
const chapterEndpoint = "/api/cpdv/v1/typing/chapter";
const defaultTestament = "OT";
const defaultBook = "Genesis";
const defaultChapter = 1;

let lastChapterMeta: ChapterMeta | null = null;

function normalizeText(text: string): string {
  return text.replace(/(\r\n|\r|\n)/g, " ").replace(/\s+/g, " ").trim();
}

function toWords(text: string): string[] {
  if (!text) return [];
  return normalizeText(text)
    .split(" ")
    .map((word) => word.trim())
    .filter((word) => word.length > 0);
}

function buildUrl(baseUrl: string): string {
  if (baseUrl.endsWith("/")) {
    return `${baseUrl.slice(0, -1)}${defaultEndpoint}`;
  }
  return `${baseUrl}${defaultEndpoint}`;
}

function buildVerseRange(
  book: string,
  chapter: number,
  verses: number[],
): string {
  if (verses.length === 0) {
    return `${book} ${chapter}`;
  }
  const minVerse = Math.min(...verses);
  const maxVerse = Math.max(...verses);
  if (minVerse === maxVerse) {
    return `${book} ${chapter}:${minVerse}`;
  }
  return `${book} ${chapter}:${minVerse}-${maxVerse}`;
}

function buildChapterUrl(
  baseUrl: string,
  testament: string,
  book: string,
  chapter: number,
): string {
  const encodedTestament = encodeURIComponent(testament);
  const encodedBook = encodeURIComponent(book);
  const encodedChapter = encodeURIComponent(`${chapter}`);
  if (baseUrl.endsWith("/")) {
    return `${baseUrl.slice(0, -1)}${chapterEndpoint}/${encodedTestament}/${encodedBook}/${encodedChapter}`;
  }
  return `${baseUrl}${chapterEndpoint}/${encodedTestament}/${encodedBook}/${encodedChapter}`;
}

async function fetchVerse(): Promise<VerseResponse> {
  const url = buildUrl(envConfig.scriptureApiUrl);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Scripture API error: ${response.status}`);
  }

  return (await response.json()) as VerseResponse;
}

async function fetchChapter(
  testament = defaultTestament,
  book = defaultBook,
  chapter = defaultChapter,
): Promise<ChapterResponse> {
  const url = buildChapterUrl(envConfig.scriptureApiUrl, testament, book, chapter);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Scripture API error: ${response.status}`);
  }

  return (await response.json()) as ChapterResponse;
}

export async function getVerseWords(minWords: number): Promise<string[]> {
  const words: string[] = [];
  const maxFetches = 8;

  for (let i = 0; i < maxFetches; i++) {
    const verse = await fetchVerse();
    words.push(...toWords(verse.tx));
    if (words.length >= minWords) break;
  }

  return words;
}

export function getChapterMeta(): ChapterMeta | null {
  return lastChapterMeta;
}

export function clearChapterMeta(): void {
  lastChapterMeta = null;
}

export async function getChapterWords(
  minWords: number,
  testament = defaultTestament,
  book = defaultBook,
  chapter = defaultChapter,
): Promise<string[]> {
  const payload = await fetchChapter(testament, book, chapter);
  const verses = payload.vs ?? [];
  const words: string[] = [];
  const verseNumbers = verses.map((verse) => verse.v);

  lastChapterMeta = {
    testament: payload.ref.t,
    book: payload.ref.b,
    chapter: payload.ref.c,
    verses: verseNumbers,
    verseRange: buildVerseRange(payload.ref.b, payload.ref.c, verseNumbers),
  };

  for (const verse of verses) {
    const verseWords = toWords(verse.tx);
    words.push(...verseWords);
    if (words.length >= minWords) {
      break;
    }
  }

  return words;
}
