import Router from "@koa/router"

export const statusRouter = new Router()

statusRouter.get("/status", async ctx => ctx.body = "ONLINE")
