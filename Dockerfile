FROM node:lts-alpine as builder

WORKDIR /app

COPY ./package.json ./package.json

RUN yarn

COPY . .

RUN yarn build

FROM nginx:alpine

COPY --from=builder /app/dist  /app/
# COPY ./dist  /app/

RUN ls /app
