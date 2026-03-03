# --> base deps
FROM node:20.19-bookworm-slim AS deps

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm i -g npm@11.7.0
RUN npm ci && npx prisma generate

# --> dev
FROM node:20.19-bookworm-slim AS dev
# Install dumb-init for proper signal handling
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y --no-install-recommends dumb-init openssl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=development

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["npm", "run", "start:dev"]

# --> build
FROM node:20.19-bookworm-slim AS build
WORKDIR /app

COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules

COPY . .
RUN npm run build
RUN npm prune --omit=dev

# --> prod
FROM node:20.19-bookworm-slim AS prod
# Install dumb-init for proper signal handling
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y --no-install-recommends dumb-init openssl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production

COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/package*.json ./
COPY --chown=node:node prisma ./prisma

USER node
EXPOSE 3000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "dist/main.js"]
