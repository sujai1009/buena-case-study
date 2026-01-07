# Production
FROM node:trixie-slim AS production

WORKDIR /app

COPY ./package*.json ./lerna.json ./
COPY ./packages/property-service-fe/package.json ./packages/property-service-fe/package.json

RUN npm ci

COPY ./packages/property-service-fe ./packages/property-service-fe

EXPOSE 8080

RUN npx lerna run build --scope property-service-fe

CMD ["npx", "lerna", "run", "start", "--scope", "property-service-fe"]