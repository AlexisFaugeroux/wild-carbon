FROM node:18-alpine3.17

WORKDIR /app

COPY public public
COPY tsconfig.json tsconfig.json
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY src src

CMD npm start