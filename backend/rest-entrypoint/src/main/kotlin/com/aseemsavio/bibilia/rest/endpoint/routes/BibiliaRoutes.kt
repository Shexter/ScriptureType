package com.aseemsavio.bibilia.rest.endpoint.routes

import com.aseemsavio.bibilia.core.api.BibiliaService
import com.aseemsavio.bibilia.core.api.CpdvLightweightService
import com.aseemsavio.bibilia.data.VerseNotePayload
import com.aseemsavio.bibilia.data.TypingVersePayload
import com.aseemsavio.bibilia.data.TypingChapterPayload
import com.aseemsavio.bibilia.data.NotesChapterPayload
import com.aseemsavio.bibilia.data.b
import com.aseemsavio.bibilia.data.c
import com.aseemsavio.bibilia.data.t
import com.aseemsavio.bibilia.data.v
import com.aseemsavio.vertx.rest.dsl.*
import io.vertx.ext.web.Route
import io.vertx.ext.web.Router
import io.vertx.ext.web.RoutingContext
import io.vertx.kotlin.coroutines.dispatcher
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlin.coroutines.CoroutineContext

/**
 * @author Aseem Savio
 * @since v1
 *
 * This is where all the route configuration should go.
 */
class BibiliaRoutes(
    private val service: BibiliaService,
    private val cpdvService: CpdvLightweightService
) : CoroutineScope {

    private val default = "Vulgate"

    suspend fun configureRoutes(router: Router) {
        with(router) {
            `health check route`(this)
            // Legacy CPDV endpoints
            `cpdv typing route`(this)
            `cpdv notes route`(this)
            // PRD-aligned lightweight CPDV endpoints
            `cpdv typing chapter route`(this)
            `cpdv notes chapter route`(this)
            `testament routes`(this)
            `get book names in testament route`(this)
            `get all book names route`(this)
            `chapter count route`(this)
            `get chapter route`(this)
            `verse count route`(this)
            `get verse route`(this)
            `get verses route`(this)
        }
    }

    private suspend fun `health check route`(router: Router) {
        router.get("/").serve {
            with(it) {
                val res =
                    "Gloria Patri, et filio, et spiritui sancto in saecula saeculorum! Biblia Sacra Vulgata is UP!!"
                ok { text { res } }
            }
        }
    }

    private suspend fun `cpdv typing route`(router: Router) {
        router.get("/api/cpdv/v1/typing/verse").serve {
            with(it) {
                val res: TypingVersePayload? = cpdvService.getRandomVerseTypingPayload()
                fold(
                    res,
                    { ok { json { res } } },
                    { notFound { } }
                )
            }
        }
    }

    private suspend fun `cpdv notes route`(router: Router) {
        router.get("/api/cpdv/v1/notes/:verseId").serve {
            with(it) {
                val verseId = pp { "verseId" }
                val res: VerseNotePayload? = cpdvService.getVerseNotePayload(verseId)
                fold(
                    res,
                    { ok { json { res } } },
                    { notFound { } }
                )
            }
        }
    }

    // PRD-aligned lightweight endpoints
    private suspend fun `cpdv typing chapter route`(router: Router) {
        router.get("/api/cpdv/v1/typing/chapter/:testament/:book/:chapter").serve {
            with(it) {
                val testament = pp { "testament" }
                val book = pp { "book" }
                val chapter = ppAsInt { "chapter" }
                val res: TypingChapterPayload? = cpdvService.getTypingChapterPayload(testament.t, book.b, chapter.c)
                
                if (res != null) {
                    // Check If-None-Match header for caching
                    val ifNoneMatch = request().getHeader("If-None-Match")
                    if (ifNoneMatch == res.hash) {
                        response().statusCode = 304
                        response().end()
                    } else {
                        response().putHeader("ETag", res.hash)
                        response().putHeader("Cache-Control", "public, max-age=3600")
                        ok { json { res } }
                    }
                } else {
                    notFound { }
                }
            }
        }
    }

    private suspend fun `cpdv notes chapter route`(router: Router) {
        router.get("/api/cpdv/v1/notes/:testament/:book/:chapter").serve {
            with(it) {
                val testament = pp { "testament" }
                val book = pp { "book" }
                val chapter = ppAsInt { "chapter" }
                val res: NotesChapterPayload? = cpdvService.getNotesChapterPayload(testament.t, book.b, chapter.c)
                
                if (res != null) {
                    // Check If-None-Match header for caching
                    val ifNoneMatch = request().getHeader("If-None-Match")
                    if (ifNoneMatch == res.hash) {
                        response().statusCode = 304
                        response().end()
                    } else {
                        response().putHeader("ETag", res.hash)
                        response().putHeader("Cache-Control", "public, max-age=3600")
                        ok { json { res } }
                    }
                } else {
                    notFound { }
                }
            }
        }
    }

    private suspend fun `testament routes`(router: Router) {
        router.get("$PREFIX/testaments").serve {
            with(it) {
                val version = qp(default) { "version" }
                val res = service.getTestamentNames(version.v)
                fold(
                    res,
                    { ok { json { res } } },
                    { notFound { } }
                )
            }
        }
    }

    private suspend fun `get book names in testament route`(router: Router) {
        router.get("$PREFIX/testament/:testament/books").serve {
            with(it) {
                val testament = pp { "testament" }
                val version = qp(default) { "version" }
                val res = service.getBookNames(version.v, testament)
                fold(
                    res,
                    { ok { json { res } } },
                    { notFound { } }
                )
            }
        }
    }

    private suspend fun `get all book names route`(router: Router) {
        router.get("$PREFIX/books").serve {
            with(it) {
                val version = qp(default) { "version" }
                val res = service.getBookNames(version.v)
                fold(
                    res,
                    { ok { json { res } } },
                    { notFound { } }
                )
            }
        }
    }

    private suspend fun `chapter count route`(router: Router) {
        router.get("$PREFIX/testament/:testament/book/:book/chapterCount").serve {
            with(it) {
                val testament = pp { "testament" }
                val book = pp { "book" }
                val version = qp(default) { "version" }
                val res = service.getTotalChapters(version.v, testament.t, book.b)
                fold(
                    res,
                    { ok { text { res } } },
                    { notFound { } }
                )
            }
        }
    }

    private suspend fun `get chapter route`(router: Router) {
        router.get("$PREFIX/testament/:testament/book/:book/chapter/:chapter").serve {
            with(it) {
                val testament = pp { "testament" }
                val book = pp { "book" }
                val chapter = ppAsInt { "chapter" }
                val version = qp(default) { "version" }
                val res = service.getChapter(version.v, testament.t, book.b, chapter.c)
                fold(
                    res,
                    { ok { json { res } } },
                    { notFound { } }
                )
            }
        }
    }

    private suspend fun `verse count route`(router: Router) {
        router.get("$PREFIX/testament/:testament/book/:book/chapter/:chapter/verseCount").serve {
            with(it) {
                val testament = pp { "testament" }
                val book = pp { "book" }
                val chapter = ppAsInt { "chapter" }
                val version = qp(default) { "version" }
                val res = service.getTotalVerses(version.v, testament.t, book.b, chapter.c)
                fold(
                    res,
                    { ok { text { res } } },
                    { notFound { } }
                )
            }
        }
    }

    private suspend fun `get verse route`(router: Router) {
        router.get("$PREFIX/testament/:testament/book/:book/chapter/:chapter/verse/:verse").serve {
            with(it) {
                val testament = pp { "testament" }
                val book = pp { "book" }
                val chapter = ppAsInt { "chapter" }
                val verse = ppAsInt { "verse" }
                val version = qp(default) { "version" }
                val res = service.getVerse(version.v, testament.t, book.b, chapter.c, verse)
                fold(
                    res,
                    { ok { json { res } } },
                    { notFound { } }
                )
            }
        }
    }

    private suspend fun `get verses route`(router: Router) {
        router.get("$PREFIX/testament/:testament/book/:book/chapter/:chapter/verses/from/:from/to/:to").serve {
            with(it) {
                val testament = pp { "testament" }
                val book = pp { "book" }
                val chapter = ppAsInt { "chapter" }
                val from = ppAsInt { "from" }
                val to = ppAsInt { "to" }
                val version = qp(default) { "version" }
                val res = service.getVerses(version.v, testament.t, book.b, chapter.c, from, to)
                fold(
                    res,
                    { ok { json { res } } },
                    { notFound { } }
                )
            }
        }
    }

    override val coroutineContext: CoroutineContext
        get() = Dispatchers.IO

    /**
     * An extension method for simplifying coroutines usage with Vert.x Web routers
     */
    private suspend fun Route.serve(fn: suspend (RoutingContext) -> Unit) {
        handler { context ->
            launch(context.vertx().dispatcher()) {
                try {
                    fn(context)
                } catch (e: Exception) {
                    e.printStackTrace()
                    context.fail(e)
                }
            }
        }
    }
}

private const val PREFIX = "/api/v1"
