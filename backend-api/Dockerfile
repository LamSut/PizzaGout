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

# expose port 3000 for node
EXPOSE 3000

# run node server
CMD [ "node", "server.js" ]