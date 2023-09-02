import { knex } from "../db/index.mjs";
import { verify } from "./encryption.mjs";

export const ifAdmin = async (ctx, next) => {
  return await next();
};

export const ifOwner = async (ctx, next) => {
  return await next();
};

export const ifAuthenticated = async (ctx, next) => {
  const authHeader = ctx.request.header["authorization"];
  if (!authHeader) ctx.throw(401, "Missing auth header");
  const token = authHeader.replace("Bearer ", "");
  try {
    const details = verify(token);
    if(!details.iat)
      ctx.throw(401, "Something strange with this token", e);
    // TODO more checks
    return await next();
  } catch (e) {
    ctx.throw(401, "Something strange with this token", e);
  }
};

export const contaOwnedBy = async (ctx, next) => {
  const { usuario_id, conta_id } = ctx.request.params;
  const [count] = await knex("conta").where({ usuario_id, id: conta_id }).count();
  if (count[Object.keys(count)[0]]) await next();
  else throw new Error(`Conta ${conta_id} não pertence ao usuário ${usuario_id}`);
};
