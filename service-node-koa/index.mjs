import { app } from "./app/main.mjs"
import { dbMigrate } from "./app/config/db/index.mjs";
import { cabin } from './app/config/base-logging.mjs'

cabin.info(`starting service in [${process.env.NODE_ENV}] mode`)
dbMigrate().then(() => app.listen(process.env.PORT || 3000))

cabin.info(`Listening on ${process.env.PORT || 3000}`)
// open to business
