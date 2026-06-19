## Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

## Runtime stage
FROM nginx:1.27-alpine

ENV DB_PASSWORD=hardcoded_db_password_123
ENV API_KEY=HARDCODED_API_KEY_FOR_SCAN_TEST_ONLY
ENV AWS_SECRET_ACCESS_KEY=FAKE_AWS_SECRET_KEY_FOR_SECURITY_TEST

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/test /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
