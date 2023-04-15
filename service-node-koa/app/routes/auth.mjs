import jwt from "jsonwebtoken"
import Router from "@koa/router"

import {sign} from "../config/security.mjs";
import {login} from "../services/index.mjs"

export const authRouter = new Router()

authRouter.post("/login", async ctx => {
  const {email, senha} = ctx.request.body
  const user = await login(email, senha)
  if (!user) return // 404
  ctx.body = sign(user)
})