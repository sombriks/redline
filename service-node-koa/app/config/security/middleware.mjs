import { knex } from "../db/index.mjs";

export const ifAdmin = (ctx, next) => {
  return next();
};

export const ifOwner = (ctx, next) => {
  return next();
};

export const ifAuthenticated = (ctx, next) => {
  return next();
};

export const contaOwnedBy = async (ctx, next) => {
  const { usuario_id, conta_id } = ctx.request.params;
  const [count] = await knex("conta").where({ usuario_id, id: conta_id }).count();
  if (count[Object.keys(count)]) await next();
  else throw new Error(`Conta ${conta_id} não pertence ao usuário ${usuario_id}`);
};
