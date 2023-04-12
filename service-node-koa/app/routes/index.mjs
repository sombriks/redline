import Router from "@koa/router"

export const status = new Router()

status.get("/status", async ctx => ctx.body = "ONLINE")
