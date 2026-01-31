# Build Stage
FROM node:25-alpine3.22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Run Stage
FROM node:25-alpine3.22
WORKDIR /app
RUN apk upgrade --no-cache \
    && rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/bin/npm \
    /usr/local/bin/npx
COPY --from=build /app /app
RUN chown -R node:node /app
USER node
EXPOSE 5173
