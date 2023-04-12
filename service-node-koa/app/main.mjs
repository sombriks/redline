import Koa from "koa";
import bodyParser from "koa-bodyparser";

import { status } from "./routes/index.mjs"

export const app = new Koa()

app
  .use(bodyParser())

  .use(status.routes())
  .use(status.allowedMethods())
