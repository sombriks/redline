import Koa from "koa";
import cors from "@koa/cors"
import bodyParser from "koa-bodyparser";

import {
  authRouter,
  categoriaRouter,
  contaRouter,
  modelocategoriaRouter,
  movimentacaoRouter,
  planejamentoRouter,
  recorrenciaRouter,
  statusRouter,
  tipoContaRouter,
  tipoMovimentacaoRouter,
  tipoRecorrenciaRouter,
  usuarioRouter
} from "./routes/index.mjs"

export const app = new Koa()

app
  .use(cors())
  .use(bodyParser())

  .use(authRouter.routes())
  .use(authRouter.allowedMethods())

  .use(categoriaRouter.routes())
  .use(categoriaRouter.allowedMethods())

  .use(contaRouter.routes())
  .use(contaRouter.allowedMethods())

  .use(modelocategoriaRouter.routes())
  .use(modelocategoriaRouter.allowedMethods())

  .use(movimentacaoRouter.routes())
  .use(movimentacaoRouter.allowedMethods())

  .use(planejamentoRouter.routes())
  .use(planejamentoRouter.allowedMethods())

  .use(recorrenciaRouter.routes())
  .use(recorrenciaRouter.allowedMethods())

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
