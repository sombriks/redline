import {knex} from "../db/index.mjs";
import {verify} from "./encryption.mjs";

export const extractDetails = ctx => {
  const authHeader = ctx.request.header["authorization"];
  if (!authHeader) ctx.throw(401, {message: "Missing auth header"});
  const token = authHeader.replace("Bearer ", "");
  return verify(token);
}

export const ifAdmin = async (ctx, next) => {
  return await next();
};

export const ifOwner = async (ctx, next) => {
  return await next();
};

export const ifAuthenticated = async (ctx, next) => {
  const details = extractDetails(ctx)
  // console.log(details)
  // console.log(new Date(details.exp * 1000))
  if (!details.iat || !details.exp)
    ctx.throw(401, {message: "Something strange with this token"})
  if (new Date().getTime() > new Date(details.exp * 1000))
    ctx.throw(401, {message: "Token expired"})
  // ctx.throw(401, {message:"test"})
  return await next()
};

export const contaOwnedBy = async (ctx, next) => {
  const {usuario_id, conta_id} = ctx.request.params;
  const [count] = await knex("conta").where({usuario_id, id: conta_id}).count();
  if (count[Object.keys(count)[0]]) await next();
  else throw new Error(`Conta ${conta_id} não pertence ao usuário ${usuario_id}`);
};
