# PRD: Lightweight CPDV-Only API (Hoverable Study Notes, Minimal Payloads)

## Status
- Draft

## Owner
- Backend / API

## Target Release Window
- TBD (phased rollout below)

## Background and Context
The current API serves multiple Bible versions (Vulgate default, CPDV optional), and exposes a broad set of endpoints for testaments, books, chapters, and verses. This PRD proposes a refactor to a lightweight, CPDV-only API optimized for typing experiences and hoverable study notes. The goal is to reduce payload sizes, simplify version handling, and support a dedicated notes payload for UI hover interactions. The CPDV source is already defined in the data-prep utilities and configuration, so the refactor primarily targets the REST entrypoint and API contracts.

## Goals
- Deliver a **CPDV-only** API surface (no version query parameter) focused on typing flows.
- Provide **minimal typing payloads** optimized for low bandwidth and fast render.
- Add a **notes payload** endpoint that supports hoverable study notes per verse.
- Preserve deterministic verse addressing (testament/book/chapter/verse) consistent with the current CPDV numbering.
- Keep API responses cache-friendly and CDN-ready.

## Non-Goals
- Do not add support for additional Bible versions.
- Do not expose the full legacy API surface (testament/book listing, counts, or multi-version lookups) in the new lightweight API.
- Do not introduce complex search, cross-references, or user-specific annotations in this phase.
- Do not change the underlying CPDV source data in this phase.

## User Stories
1. **Typing UI**: As a user, I can load a chapter or verse range with a small payload so the typing UI feels instant.
2. **Hover Notes**: As a user, I can hover over a verse and see a concise study note without reloading the full chapter.
3. **Client Caching**: As a developer, I can cache responses efficiently with ETags to reduce repeat downloads.
4. **Operational Simplicity**: As an operator, I can deploy a CPDV-only API that is simpler to configure and scale.

## API Contract (Lightweight CPDV-Only)
**Base path:** `/api/cpdv/v1` (proposed). All endpoints return JSON. No `version` query param.

### 1) Typing Payload
Endpoint options (select one in implementation phase):
- **Option A:** `GET /api/cpdv/v1/typing/chapter/:testament/:book/:chapter`
- **Option B:** `GET /api/cpdv/v1/typing/verses/:testament/:book/:chapter?from=1&to=10`

Minimal payload shape (short keys to reduce size):

```json
{
  "ref": {
    "t": "OT",
    "b": "Psalms",
    "c": 116
  },
  "vs": [
    { "v": 1, "tx": "Alleluia. All nations, praise the Lord. All peoples, praise him." },
    { "v": 2, "tx": "For his mercy has been confirmed over us..." }
  ],
  "hash": "sha256:..."
}
```

**Notes:**
- `ref` identifies the chapter.
- `vs` is an ordered list of verses.
- `hash` allows client-side cache validation; use ETag/If-None-Match in HTTP.

### 2) Notes Payload (Hoverable Study Notes)
Endpoint:
- `GET /api/cpdv/v1/notes/:testament/:book/:chapter`

Payload shape:

```json
{
  "ref": {
    "t": "OT",
    "b": "Psalms",
    "c": 116
  },
  "notes": [
    {
      "v": 1,
      "n": [
        {
          "id": "ps-116-1-1",
          "txt": "Liturgical use note...",
          "src": "Catena Aurea"
        }
      ]
    }
  ],
  "hash": "sha256:..."
}
```

**Notes:**
- `notes` is indexed by verse number, each with a list of note objects.
- `txt` is concise text intended for hover display.
- `src` is an optional source label (not a URL in this phase).

## Data Model Requirements
- **CPDV-only dataset** sourced from the existing CPDV JSON link.
- **Normalized verse model** keyed by `{testament, book, chapter, verse}`.
- **Typing text** stored as a plain string (no markup) to keep payload minimal.
- **Notes model** supports: `id`, `text`, `source`, `verse` (no rich formatting in v1).
- **Lookup indices** for chapter -> verses and chapter -> notes to enable O(1) access.

## Performance and Caching Requirements
- **Startup load**: pre-load CPDV data into memory at service start.
- **Hot path**: avoid per-request remote fetches; all data should be in-memory.
- **Compression**: enable gzip or brotli at the gateway (if supported).
- **HTTP caching**: ETag or Last-Modified headers; support `If-None-Match`.
- **Payload size targets**: chapter typing payload <= 25 KB for typical chapters.

## Success Metrics
- **Median response time**: <= 50 ms for typing endpoints (p50).
- **p95 response time**: <= 150 ms.
- **Payload reduction**: >= 40% smaller than current `/api/v1` chapter responses for CPDV.
- **Cache hit rate**: >= 60% on CDN for typing payloads.
- **Error rate**: < 0.5% 5xx for typing/notes endpoints.

## Phased Rollout
1. **Phase 0 — Spec & Data Prep**
   - Finalize contracts and payload shapes.
   - Add notes dataset scaffolding (structure only).
2. **Phase 1 — CPDV Typing API (Read-only)**
   - Implement `/api/cpdv/v1/typing/...` endpoint.
   - Enable caching headers and compression.
3. **Phase 2 — Notes API**
   - Implement `/api/cpdv/v1/notes/...` endpoint.
   - Validate hover UX with sample notes.
4. **Phase 3 — Client Migration**
   - Update clients to consume the lightweight API.
   - Monitor performance metrics and cache hit rate.
5. **Phase 4 — Deprecation Plan**
   - Announce v1 deprecations for CPDV use cases.
   - Keep legacy routes for a fixed sunset window.

## Open Questions
- Notes data source: where will study notes originate and who curates them?
- Should the notes endpoint be chapter-scoped only, or also support verse-range queries?
- Should there be a compact book/testament metadata endpoint for client UI labels?

## References (Repo Context)
- CPDV source link and data reader: `backend/data-preparation/src/main/kotlin/com/aseemsavio/bibilia/data/BibiliaDataReader.kt`
- Config versions and links: `backend/utils/config/src/main/resources/application.json`
- Current routes: `backend/rest-entrypoint/src/main/kotlin/com/aseemsavio/bibilia/rest/endpoint/routes/BibiliaRoutes.kt`
- Current API docs: `backend/documentation/api-docs/api-doc-v1.0.0.md`
