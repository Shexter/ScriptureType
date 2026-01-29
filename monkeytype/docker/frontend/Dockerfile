FROM node:24.11.0-alpine3.22 AS builder
WORKDIR /app

# tooling for native modules + git metadata during build
RUN apk add --no-cache python3 make g++ git

# Install build dependencies for native modules (re2, etc.)
RUN apk add --no-cache python3 make g++

#ENV
ENV BACKEND_URL=###MONKEYTYPE_BACKENDURL### SCRIPTURE_API_URL=###SCRIPTURE_API_URL### RECAPTCHA_SITE_KEY=###RECAPTCHA_SITE_KEY###

#COPY
COPY ["package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml", "turbo.json", "./"]
COPY packages packages
COPY frontend frontend

COPY docker/frontend/firebase-config-live.ts frontend/src/ts/constants/firebase-config.ts
COPY docker/frontend/firebase-config-live.ts frontend/src/ts/constants/firebase-config-live.ts

#gimme pnpm + build
RUN corepack enable && \
    corepack prepare pnpm@9.15.5 --activate && \
    pnpm install --frozen-lockfile && \
    pnpm run build

# COPY to target
FROM nginx:mainline-alpine

COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/frontend/updateConfig.sh /docker-entrypoint.d/updateConfig.sh
RUN chmod +x /docker-entrypoint.d/updateConfig.sh

# entry
#CMD ["./entryPoint.sh"]
