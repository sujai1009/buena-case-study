# Production
FROM node:trixie-slim AS production

WORKDIR /app


COPY ./package*.json ./lerna.json ./
COPY ./packages/property-service-be/package.json ./packages/property-service-be/package.json

RUN npm ci

COPY ./packages/property-service-be ./packages/property-service-be

EXPOSE 3000

RUN npx lerna run build --scope property-service-be

CMD ["npx", "lerna", "run", "start:prod", "--scope", "property-service-be"]
#CMD ["echo", "Hello, World3!"]