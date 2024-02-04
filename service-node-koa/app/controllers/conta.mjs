import {delConta, findConta, insertConta, listContas, updateConta} from "../services/index.mjs";

export const listContasRequest = async ctx => {
  const {usuario_id} = ctx.request.params;
  const {q = "", limit = 100, offset = 0} = ctx.request.query;
  ctx.body = await listContas({usuario_id, q, limit, offset});
};

export const findContaRequest = async ctx => {
  const {usuario_id, id} = ctx.request.params;
  ctx.body = await findConta({id, usuario_id});
};

export const insertContaRequest = async ctx => {
  const {usuario_id} = ctx.request.params;
  const novaConta = ctx.request.body;
  novaConta.usuario_id = usuario_id;
  ctx.body = await insertConta(novaConta);
};

export const updateContaRequest = async ctx => {
  const {usuario_id, id} = ctx.request.params;
  const conta = ctx.request.body;
  if (conta.usuario_id != usuario_id) ctx.throw(403, "invalid user");
  else ctx.body = await updateConta({id, conta});
};

export const delContaRequest = async ctx => {
  const {usuario_id, id} = ctx.request.params;
  ctx.body = await delConta({usuario_id, id});
};
