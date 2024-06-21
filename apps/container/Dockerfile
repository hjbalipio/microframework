FROM node:slim

ENV NODE_ENV development

WORKDIR /express-docker

COPY dist ./dist
COPY dist/container/latest/index.html ./dist/.
COPY server.js .
COPY package.json .

RUN npm install

CMD [ "node", "server.js" ]

EXPOSE 3000