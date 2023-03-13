FROM node:slim

RUN npm install -g pnpm

# install guess-shared
WORKDIR /usr/src/app/Shared
COPY Shared .
RUN pnpm install --prefer-offline
RUN npm run build

# install guess-server
WORKDIR /usr/src/app/Server
COPY Server/package.json .
RUN pnpm install --prefer-offline

WORKDIR /usr/src/app
COPY Server ./Server/

WORKDIR /usr/src/app/Server
# test guess-server
# RUN npx knex migrate:latest --env ci
# RUN NODE_ENV=ci npm test
# RUN rm dev.sqlite3

EXPOSE 8100

CMD npx knex migrate:latest --env production && \
    npx knex seed:run --env production && \
    npm run start:prod