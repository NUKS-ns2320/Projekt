FROM node:14-alpine

WORKDIR /app
COPY package.json yarn.lock ./


RUN yarn install

COPY index.html /app
COPY yarn.lock /app
COPY log.txt /app
COPY public /app/public
COPY src /app/src
COPY postcss.config.js /app
COPY vite.config.js /app
COPY tailwind.config.js /app

EXPOSE 5175

CMD yarn dev