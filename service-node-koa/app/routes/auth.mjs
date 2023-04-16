import Router from "@koa/router"

import {sign} from "../config/security/index.mjs";
import {novoUsuario, login, resetCategorias, resetConta} from "../services/index.mjs"

export const authRouter = new Router()

authRouter.post("/login", async ctx => {
  const {email, senha} = ctx.request.body
  const user = await login(email, senha)
  if (!user) return // 404
  const payload = {...user, senha: undefined}
  ctx.body = sign(payload)
})

authRouter.post("/signup", async ctx => { // TODO captcha protection
  const {nome, email, senha} = ctx.request.body
  const id = await novoUsuario({nome, email, senha})
  await resetCategorias(id)
  await resetConta(id)
  ctx.body = {id, nome, email}
})