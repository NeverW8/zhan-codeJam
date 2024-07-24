FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY website/ .

EXPOSE 8181

CMD ["nginx", "-g", "daemon off;"]

