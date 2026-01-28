package com.aseemsavio.bibilia.server

import com.aseemsavio.bibilia.database.extensions.initialiseDatabases
import com.aseemsavio.bibilia.database.extensions.versions
import com.aseemsavio.bibilia.core.api.BibiliaMapService
import com.aseemsavio.bibilia.database.extensions.db
import com.aseemsavio.bibilia.rest.endpoint.routes.BibiliaRoutes
import com.aseemsavio.bibilia.utils.config.lightbend.config

import io.vertx.kotlin.coroutines.CoroutineVerticle
import io.vertx.ext.web.Router
import io.vertx.ext.web.handler.CorsHandler
import io.vertx.core.http.HttpMethod
import io.vertx.kotlin.coroutines.await

class MainVerticle : CoroutineVerticle() {
    override suspend fun start() {
        val config = config()
        val router = Router.router(vertx)
        
        // Enable CORS for frontend access
        router.route().handler(
            CorsHandler.create()
                .addOrigin("*")
                .allowedMethods(setOf(HttpMethod.GET, HttpMethod.POST, HttpMethod.OPTIONS))
                .allowedHeaders(setOf("Content-Type", "Authorization", "If-None-Match"))
                .allowCredentials(true)
        )
        
        val databases = initialiseDatabases(versions(config), config.database.db)
        val service = BibiliaMapService(databases)
        BibiliaRoutes(service, service).configureRoutes(router)
        
        val server = vertx.createHttpServer()
            .requestHandler(router)
            .listen(config.port)
            .await()
        
        println("✅ Server started successfully on port ${config.port}")
        println("✅ CORS enabled for frontend access")
    }
}
