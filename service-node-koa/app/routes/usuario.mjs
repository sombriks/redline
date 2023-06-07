import Router from "@koa/router";
import {
  delUsuario,
  login,
  novoUsuario,
  resetCategorias,
  resetConta
} from "../services/index.mjs";
import { sign } from "../config/security/index.mjs";

export const usuarioRouter = new Router();

usuarioRouter.post("/login", async ctx => {
  const { email, senha } = ctx.request.body;
  const user = await login({ email, senha });
  if (!user) return; // 404
  const payload = { ...user, senha: undefined };
  ctx.body = sign(payload);
});

usuarioRouter.post("/signup", async ctx => { // TODO captcha protection
  const { nome, email, senha } = ctx.request.body;
  const [{ id }] = await novoUsuario({ nome, email, senha });
  await resetCategorias(id);
  await resetConta(id);
  ctx.body = { id, nome, email };
});

// TODO add security check here
usuarioRouter.del("/:usuario_id/removeAccount", async ctx => {
  const { email, senha } = ctx.request.query;
  const usuario = await login({ email, senha });
  if (!usuario) {
    ctx.body = null;
  } else if(ctx.request.params.usuario_id != usuario.id) {
    ctx.throw("mismatch user id")
  } else {
    ctx.body = delUsuario(usuario.id);
  }
});
