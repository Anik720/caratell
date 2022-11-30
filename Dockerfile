FROM node:16 as build

WORKDIR /app
COPY . ./


FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build/ /usr/share/nginx/html

EXPOSE 80