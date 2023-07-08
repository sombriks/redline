import Router from "@koa/router"
import {listTipoMovimentacao} from "../services/index.mjs";

export const tipoMovimentacaoRouter = new Router()

tipoMovimentacaoRouter.get("/tipo-movimentacao",
  async ctx => ctx.body = await listTipoMovimentacao())
