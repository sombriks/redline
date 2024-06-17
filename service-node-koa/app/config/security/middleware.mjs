import { knex } from "../db/index.mjs";
import { verify } from "./encryption.mjs";

const extractDetails = (ctx) => {
	const authHeader = ctx.request.header["authorization"];
	if (!authHeader) ctx.throw(401, { message: "Missing auth header" });
	const token = authHeader.replace("Bearer ", "");
	return verify(token);
};

export const ifAdmin = async (ctx, next) => {
	const { admin } = extractDetails(ctx);
	if (admin) return await next();
	else return ctx.throw(403, "User is not an admin");
};

export const ifAuthenticated = async (ctx, next) => {
	const details = extractDetails(ctx); // id, nome, emil, admin, criacao, alteracao, iat, exp
	if (!details.iat || !details.exp)
		ctx.throw(401, { message: "Something strange with this token" });
	if (new Date().getTime() > new Date(details.exp * 1000))
		ctx.throw(401, { message: "Token expired" });
	return await next();
};

export const contaOwnedBy = async (ctx, next) => {
	const { id } = extractDetails(ctx);
	const { usuario_id, conta_id } = ctx.request.params;
	if (id != usuario_id)
		return ctx.throw(403, `Usuário logado não é o usuário informado`);
	const [count] = await knex("conta")
		.where({ usuario_id, id: conta_id })
		.count();
	if (count[Object.keys(count)[0]]) await next();
	else
		ctx.throw(403, `Conta ${conta_id} não pertence ao usuário ${usuario_id}`);
};
