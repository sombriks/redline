# service-node-koa

Backend part of redline finance

## Requirements

- node 18+
- docker 20+

## How to run

```bash
npm install
npm run dev
```

## How to test

```bash
npm install
npm run test:service:coverage
```

## Docker image build and run

```sh
docker build -f infrastructure/Dockerfile -t sombriks/redline-api:testing .
```

You can change the postgres database url for proper test values:

```sh
docker run --rm -it -p 3000:3000 --network=host \
-e PG_CONNECTION_URL=postgresql://postgres:postgres@localhost/redline \
sombriks/redline-api:testing
```

If you don't have a suitable postgres installation, there is a docker compose
just for that:

```bash
docker compose -f infrastructure/test-database-docker-compose.yml up
```

## Database migrations

There are npm scripts to help on database migration:

```bash
npm run migrate:make new_script # give a proper name for the migrate
```

```bash
npm run migrate:latest # apply all pending migrates
```

```bash
npm run migrate:rollback # undo latest applied migrate batch
```
