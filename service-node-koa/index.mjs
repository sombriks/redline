import { app } from "./app/main.mjs"
import { dbMigrate } from "./app/config/db/index.mjs";

dbMigrate().then(() => app.listen(process.env.PORT || 3000))
