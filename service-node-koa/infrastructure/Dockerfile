FROM alpine:3.19

ENV NODE_ENV=${NODE_ENV:-production}

ENV PORT=${PORT:-3000}

ENV PG_CONNECTION_URL=${PG_CONNECTION_URL}

WORKDIR /service-node-koa

ADD .env.production index.mjs package.json package-lock.json ./
ADD app ./app/

RUN apk add nodejs npm
RUN npm install --production

EXPOSE $PORT/tcp $PORT/udp

ENTRYPOINT npm start
