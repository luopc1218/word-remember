FROM node:lts as builder

RUN mkdir /app

WORKDIR /app

COPY ./package.json ./

RUN node -v &&npm -v && npm i --legacy-peer-deps

COPY . ./

RUN npm run build

FROM nginx:latest 

COPY --from=builder /app/dist /app

COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf


