# base image node for build stage
FROM node:23-alpine AS build

# working directory of container is /app
WORKDIR /app

# copy package.json (package-lock.json) to working directory
# install dependencies faster with Docker cache (if unchanged)
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code into workdir "/app" of container
COPY . .

# build VueJS app, the app will be stored in "build" directory
RUN npm run build

## RUN STAGE ##

# base image Caddy for run stage
FROM caddy:2.7-alpine

# working directory for Caddy
WORKDIR /srv

# create /dist directory, Caddy will run files built inside it
RUN mkdir ./dist

# copy built Vue app to Caddy workdir
COPY --from=build /app/dist /srv/dist

# copy the Caddyfile for config
COPY Caddyfile /etc/caddy/Caddyfile

# start Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]