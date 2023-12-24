import {delUsuario, login, novoUsuario, resetCategorias, resetConta} from "../services/index.mjs";
import {sign} from "../config/security/index.mjs";

export const userLoginRequest = async ctx => {
  const {email, senha} = ctx.request.body;
  const user = await login({email, senha});
  if (!user) return; // 404
  const payload = {...user, senha: undefined};
  ctx.body = sign(payload);
};

export const userSignupRequest = async ctx => { // TODO captcha protection
  const {nome, email, senha} = ctx.request.body;
  const [{id}] = await novoUsuario({nome, email, senha});
  await resetCategorias({usuario_id: id});
  await resetConta({usuario_id: id});
  ctx.body = {id, nome, email};
};

export const delUsuarioRequest = async ctx => {
  const {email, senha} = ctx.request.query;
  const usuario = await login({email, senha});
  if (!usuario) {
    ctx.body = null;
  } else if (ctx.request.params.usuario_id != usuario.id) {
    ctx.throw("mismatch user id");
  } else {
    ctx.body = delUsuario(usuario.id);
  }
};
