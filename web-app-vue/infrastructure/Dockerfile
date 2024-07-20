FROM alpine:3.19 AS build

ENV NODE_ENV=${NODE_ENV:-production}

ADD .env.production index.html \
  package.json package-lock.json vite.config.js ./
ADD src ./src/
ADD public ./public/

RUN apk add nodejs npm
RUN npm install --include dev ; npm run build

FROM busybox:1.36

ENV PORT=${PORT:-5000}

RUN adduser -D static
USER static
WORKDIR /home/static

COPY --from=build dist ./

EXPOSE $PORT/tcp $PORT/udp

ENTRYPOINT busybox httpd -f -v -p $PORT
