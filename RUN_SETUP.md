# ScriptureType Local Run Setup (Verse API + Monkeytype UI + Monkeytype Backend)

This guide explains how to run **all three pieces** together:

1) **Verse API (Kotlin backend)**
2) **Monkeytype backend (accounts/stats)**
3) **Monkeytype frontend**

It also explains where Docker fits and whether you should Dockerize the verse API.

---

## Overview (Recommended Flow)

- **Run Verse API on host** using Gradle (fast iteration).
- **Run Monkeytype backend + frontend via Docker** using the repo compose file.

This keeps the Kotlin backend simple while still using Docker for the Monkeytype stack.

---

## Option A (Recommended): Verse API on Host + Monkeytype via Docker

### 1) Run Verse API on Host (Kotlin)

```zsh
cd /Users/timothylauw/Documents/Github\ Repos/typescripture/backend
# If 8080 is already used by the Monkeytype frontend, run the verse API on 8081
# by changing the port in backend/utils/config/src/main/resources/application.json
./gradlew clean run
```

Expected health response:

```zsh
curl http://localhost:8080/
```

### 2) Configure Docker Env for Monkeytype

```zsh
cd /Users/timothylauw/Documents/Github\ Repos/typescripture/monkeytype/docker
cp example.env .env
```

Ensure these values (host gateway lets Docker reach your host services):

```
MONKEYTYPE_FRONTENDURL=http://localhost:8080
MONKEYTYPE_BACKENDURL=http://localhost:5005
# If verse API runs on 8081:
SCRIPTURE_API_URL=http://host.docker.internal:8081
```

### 3) Build + Run Monkeytype Frontend/Backend (Docker)

From repo root:

```zsh
cd /Users/timothylauw/Documents/Github\ Repos/typescripture
docker compose -f monkeytype/docker/docker-compose.yml up -d --build
```

### 4) Open UI

Open: `http://localhost:8080`

The UI will fetch verses from the Kotlin API and still use Monkeytype backend for accounts/stats.

---

## Option B: Run Everything on Host (No Docker)

If you want all services without Docker:

1) Run Verse API:
```zsh
cd backend
./gradlew clean run
```

2) Run Monkeytype backend (Node):
```zsh
cd monkeytype/backend
pnpm install
pnpm dev
```

3) Run Monkeytype frontend (Vite):
```zsh
cd monkeytype/frontend
pnpm install
pnpm dev
```

This uses Vite dev server and Node backend locally, without Docker.

---

## Option C: Dockerize Verse API Too (Optional)

If you want **everything** in Docker, you’ll need a new Dockerfile for the Kotlin backend and a compose service. This repo does not include it yet.

### Suggested Docker approach (not implemented yet)

1) Add a Dockerfile under `backend/` to build the Gradle project.
2) Add a service to `monkeytype/docker/docker-compose.yml` named `verse-api`.
3) Update `SCRIPTURE_API_URL` to `http://verse-api:8080`.

If you want this, I can implement it next.

---

## Notes on Docker and Ports

- `8080` is used by the **Monkeytype frontend** when running via Docker compose.
- `5005` is used by the **Monkeytype backend**.
- The **Verse API** should use a different port (recommended `8081`) if the frontend already uses `8080`.

---

## Troubleshooting

### UI shows default Monkeytype (not ScriptureType changes)
- Ensure you’re using this repo’s compose file (it builds from `monkeytype/`, not Docker Hub).
- Stop any old containers and remove the local image, then rebuild:
```zsh
docker compose -f monkeytype/docker/docker-compose.yml down --remove-orphans
docker image rm -f monkeytype/monkeytype-frontend:local
docker compose -f monkeytype/docker/docker-compose.yml build --no-cache
docker compose -f monkeytype/docker/docker-compose.yml up -d
```
- Confirm the container/image and port:
```zsh
docker ps --filter name=monkeytype-frontend
```
- If `8080` is already in use (e.g., an older container or a dev server), stop it or change `HTTP_PORT` in `.env`.

### Verse API not reachable from Docker
- Confirm host URL:
```zsh
curl http://localhost:8081/api/cpdv/v1/typing/verse
```
- Ensure `.env` uses:
```
SCRIPTURE_API_URL=http://host.docker.internal:8081
```

---

## Summary

- **Yes**, you should keep Monkeytype backend.
- **Yes**, the frontend now uses the Verse API for words.
- **No**, you do not have to Dockerize the Verse API right now.
- **If you want**, I can add a Docker service for the Verse API next.
