## Build stage
FROM node:22-alpine3.21 AS build

RUN apk update && apk upgrade --no-cache

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

## Runtime stage
FROM nginx:1.27-alpine3.21

RUN apk update && apk upgrade --no-cache

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/test /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
