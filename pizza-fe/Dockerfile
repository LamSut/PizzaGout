# Build Frontend Stage
FROM node:25-alpine3.22 AS build
WORKDIR /app

ARG VITE_TARGET
ENV VITE_TARGET=${VITE_TARGET}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Build Caddy Stage
FROM caddy:2.11-builder-alpine AS caddy-build
RUN xcaddy build

# Run Stage
FROM alpine:3.22
WORKDIR /srv

RUN apk add --no-cache ca-certificates

COPY --from=caddy-build /usr/bin/caddy /usr/bin/caddy
COPY --from=build /app/dist /srv/dist
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
