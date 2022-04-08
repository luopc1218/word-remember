FROM node:alpine

WORKDIR /app

COPY ./package.json ./package.json

RUN yarn --prod

COPY . ./

RUN yarn build
