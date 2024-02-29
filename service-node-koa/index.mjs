import { app } from "./app/main.mjs"
import { dbMigrate } from "./app/config/db/index.mjs";
import { logger } from './app/config/base-logging.mjs'

logger.info(`starting service in [${process.env.NODE_ENV}] mode`)
dbMigrate().then(() => app.listen(process.env.PORT || 3000))

logger.info(`Listening on ${process.env.PORT || 3000}`)
// open to business
