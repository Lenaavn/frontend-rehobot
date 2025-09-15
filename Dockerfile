# Build Angular app
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Servir con Node.js + Express
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist/rehobot_front/browser ./dist/rehobot_front/browser
COPY server.js .
RUN npm install express
EXPOSE 8080
CMD ["node", "server.js"]
