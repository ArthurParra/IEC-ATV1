# ---------- Estágio 1: build (compila o TypeScript) ----------
FROM node:22-alpine AS build
WORKDIR /app
RUN npm install -g pnpm

# Copia só os manifestos primeiro para aproveitar o cache de camadas
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY tsconfig.json ./
COPY src ./src
RUN pnpm build

# ---------- Estágio 2: produção (imagem final enxuta) ----------
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

COPY --from=build /app/dist ./dist

USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]
