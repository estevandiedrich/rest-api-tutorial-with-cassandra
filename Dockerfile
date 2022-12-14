
FROM artifactory.tracfone.com/docker.tracfone/node:16.17-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3600

USER 1001

CMD [ "node", "index.js" ]