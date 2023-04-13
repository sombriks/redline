import Koa from "koa";
import bodyParser from "koa-bodyparser";

import {
  authRouter,
  modelocategoriaRouter,
  statusRouter,
  tipoContaRouter,
  tipoMovimentacaoRouter,
  tipoRecorrenciaRouter,
  usuarioRouter
} from "./routes/index.mjs"

export const app = new Koa()

app
  .use(bodyParser())

  .use(authRouter.routes())
  .use(authRouter.allowedMethods())

  .use(modelocategoriaRouter.routes())
  .use(modelocategoriaRouter.allowedMethods())

  .use(statusRouter.routes())
  .use(statusRouter.allowedMethods())

  .use(tipoContaRouter.routes())
  .use(tipoContaRouter.allowedMethods())

  .use(tipoMovimentacaoRouter.routes())
  .use(tipoMovimentacaoRouter.allowedMethods())

  .use(tipoRecorrenciaRouter.routes())
  .use(tipoRecorrenciaRouter.allowedMethods())

  .use(usuarioRouter.routes())
  .use(usuarioRouter.allowedMethods())
