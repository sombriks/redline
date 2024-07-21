import {
	delUsuario,
	login,
	novoUsuario,
	resetCategorias,
	resetConta,
	updateUser,
	validaInvite,
} from "../services/index.mjs";
import { sign } from "../config/security/index.mjs";

export const userLoginRequest = async (ctx) => {
	// TODO captcha protection
	const { email, senha } = ctx.request.body;
	const user = await login({ email, senha });
	if (!user) return; // 404
	const payload = { ...user, senha: undefined };
	ctx.body = sign(payload);
};

export const userSignupRequest = async (ctx) => {
	// TODO captcha protection
	const { nome, email, senha, invite } = ctx.request.body;
	await validaInvite({ email, code: invite });
	const [{ id }] = await novoUsuario({ nome, email, senha });
	await resetCategorias({ usuario_id: id });
	await resetConta({ usuario_id: id });
	ctx.body = { id, nome, email };
};

export const delUsuarioRequest = async (ctx) => {
	const { email, senha } = ctx.request.query;
	const usuario = await login({ email, senha });
	if (!usuario) {
		ctx.body = null;
	} else if (ctx.request.params.usuario_id != usuario.id) {
		ctx.throw("mismatch user id");
	} else {
		ctx.body = delUsuario(usuario.id);
	}
};

export const updateUserRequest = async (ctx) => {
	const { usuario_id: id } = ctx.params;
	const { nome, email, senha, editToken } = ctx.request.body;
	const usuario = await login({ email, senha });
	if (!nome) ctx.throw(400, "Nome de usuário requerido");
	if (!email) ctx.throw(400, "Email requerido");
	if (!senha) ctx.throw(400, "Senha requerida");
	if (!editToken) ctx.throw(400, "editToken requerido");
	if (id != usuario.id) ctx.throw(400, "Usuário incorreto!");
	// TODO verificar/consumir o editToken
	const affected = await updateUser({ id, nome, email, senha });
	// ctx.response.status = 303
	// ctx.set("Location", `/dashboard`) // XXX too fancy!
	ctx.body = { status: "success", affected };
};
