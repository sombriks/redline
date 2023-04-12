import { app } from "./app/main.mjs"
import { dbMigrate } from "./app/config/db/index.mjs";


console.log(`starting service in [${process.env.NODE_ENV}] mode`)
dbMigrate().then(() => app.listen(process.env.PORT || 3000))

console.log("http://localhost:3000")