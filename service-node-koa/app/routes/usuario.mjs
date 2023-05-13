import Router from "@koa/router";
import { delUsuario, getUsusario } from "../services/index.mjs";

export const usuarioRouter = new Router();

// TODO add security check here
usuarioRouter.del("/removeAccount", async ctx => {
  const { email, senha } = ctx.request.body;
  const usuario = await getUsusario({ email, senha });
  if (!usuario) {
    ctx.body = null;
  } else {
    ctx.body = delUsuario(usuario.id);
  }
});