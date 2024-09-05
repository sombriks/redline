import {
  delUsuario,
  login,
  novoUsuario,
  resetCategorias,
  resetConta,
  updateUser,
  validaInvite,
} from "../services/index.mjs";
import {sign} from "../config/security/index.mjs";
import {
  marcarConsumoConfirmaCadastro,
  marcarEnvioConfirmaCadastro,
  novoConfirmaCadastro,
  validaConfirmaCadastro
} from "../services/confirma_cadastro.mjs";
import {emailConfirmaCadastro} from "../services/email.mjs";
import {logger} from "../config/base-logging.mjs";

const log = logger.scope('controllers/usuario.mjs')

export const userLoginRequest = async (ctx) => {
  // TODO captcha protection
  const {email, senha} = ctx.request.body;
  const user = await login({email, senha});
  if (!user) return; // 404
  const payload = {...user, senha: undefined};
  ctx.body = sign(payload);
};

export const userSignupRequest = async (ctx) => {
  // TODO captcha protection
  const {nome, email, senha, invite} = ctx.request.body;
  if (invite) {
    await validaInvite({email, code: invite});
    const [{id}] = await novoUsuario({nome, email, senha});
    await resetCategorias({usuario_id: id});
    await resetConta({usuario_id: id});
    ctx.body = {id, nome, email, created: true};
  } else {
    // email challenge
    await validaConfirmaCadastro({email})
    const [{challenge}] = await novoConfirmaCadastro({nome, email, senha});
    const result = await emailConfirmaCadastro({email, nome, challenge})
    log.info(result)
    await marcarEnvioConfirmaCadastro({email, challenge})
    ctx.body = {message: "check mail for activation code!"}
  }
};

export const userConfirmRequest = async (ctx) => {
  // TODO captcha protection
  const {email, challenge} = ctx.request.body;
  const {nome, senha} = await marcarConsumoConfirmaCadastro({email, challenge});
  const [{id}] = await novoUsuario({nome, email, senha, pwdEncrypt: false});
  await resetCategorias({usuario_id: id});
  await resetConta({usuario_id: id});
  ctx.body = {id, nome, email, created: true};
}

export const delUsuarioRequest = async (ctx) => {
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

export const updateUserRequest = async (ctx) => {
  const {usuario_id: id} = ctx.params;
  const {nome, email, senha, editToken} = ctx.request.body;
  if (!nome) ctx.throw(400, "Nome de usuário requerido");
  if (!email) ctx.throw(400, "Email requerido");
  if (!senha) ctx.throw(400, "Senha requerida");
  if (!editToken) ctx.throw(400, "editToken requerido");
  // TODO verificar/consumir o editToken
  const affected = await updateUser({id, nome, email, senha});
  // ctx.response.status = 303
  // ctx.set("Location", `/dashboard`) // XXX too fancy!
  ctx.body = {status: "success", affected};
};
