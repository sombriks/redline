import Router from "@koa/router"
import {listTipoConta} from "../services/index.mjs";

export const tipoContaRouter = new Router()

tipoContaRouter.get("/tipo_conta",
  async ctx => ctx.body = await listTipoConta())