import Router from "@koa/router"
import {list} from "../services/index.mjs";

export const modelocategoriaRouter = new Router()

modelocategoriaRouter.get("/modelocategoria", async ctx => ctx.body = await list())