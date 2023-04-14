import Router from "@koa/router"
import {listTipoRecorrencia} from "../services/index.mjs";

export const tipoRecorrenciaRouter = new Router()

tipoRecorrenciaRouter.get("/tipo_recorrencia",
  async ctx => ctx.body = await listTipoRecorrencia())
