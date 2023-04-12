import Koa from "koa";
import bodyParser from "koa-bodyparser";

export const app = new Koa()
app.use(bodyParser())