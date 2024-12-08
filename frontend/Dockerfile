# base image node for build stage
FROM node:23-alpine

# working directory of container is /app
WORKDIR /app

# copy package.json (package-lock.json) to working directory
# install dependencies faster with Docker cache (if unchanged)
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code into workdir "/app" of container
COPY . .

# expose port 5173 for Vue
EXPOSE 5173

# run Vue in dev mode
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]