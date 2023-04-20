FROM node:14-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY index.js /app
COPY yarn.lock /app
COPY .env /app
COPY uploads /app
COPY models /app/models

EXPOSE 5000

CMD nodemon index.js