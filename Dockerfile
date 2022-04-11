FROM nginx:latest

COPY ./dist ./app

COPY ./nginx.conf /etc/nginx/nginx.conf


