FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json api.tsconfig.json ./
COPY src/api ./src/api

CMD ["npx", "tsx", "src/api/main.ts"]