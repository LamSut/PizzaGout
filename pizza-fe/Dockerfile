# Build Frontend Stage
FROM node:25-alpine3.22 AS build
WORKDIR /app

ARG VITE_TARGET
ENV VITE_TARGET=${VITE_TARGET}

COPY package*.json ./
RUN npm ci

COPY . .
RUN echo "Building with VITE_TARGET=$VITE_TARGET" && npm run build

# Build Caddy Stage
FROM caddy:2.11.2-builder-alpine AS caddy-build

RUN xcaddy build \
    --replace github.com/smallstep/certificates=github.com/smallstep/certificates@v0.30.0 \
    --replace github.com/go-jose/go-jose/v3=github.com/go-jose/go-jose/v3@v3.0.5 \
    --replace github.com/go-jose/go-jose/v4=github.com/go-jose/go-jose/v4@v4.1.4 \
    --replace google.golang.org/grpc=google.golang.org/grpc@v1.79.3

# Run Stage
FROM alpine:3.22
WORKDIR /srv

RUN apk add --no-cache ca-certificates

COPY --from=caddy-build /usr/bin/caddy /usr/bin/caddy
COPY --from=build /app/dist /srv/dist
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
