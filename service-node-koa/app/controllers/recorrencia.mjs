import {
  delRecorrencia,
  findRecorrencia,
  insertRecorrencia,
  listRecorrencia,
  updateRecorrencia
} from "../services/index.mjs";

export const listRecorrenciaRequest = async ctx => {
  const {usuario_id} = ctx.request.params;
  const {q = "", limit = 10, offset = 0} = ctx.request.query;
  ctx.body = await listRecorrencia({usuario_id, q, limit, offset});
};

export const insertRecorrenciaRequest = async ctx => {
  const {usuario_id} = ctx.request.params;
  const recorrencia = ctx.request.body;
  ctx.body = await insertRecorrencia({usuario_id, recorrencia})
}

export const findRecorrenciaRequest = async ctx => {
  const {usuario_id, id} = ctx.request.params;
  ctx.body = await findRecorrencia({usuario_id, id})
}

export const updateRecorrenciaRequest = async ctx => {
  const {usuario_id, id} = ctx.request.params;
  const recorrencia = ctx.request.body;
  ctx.body = await updateRecorrencia({usuario_id, id, recorrencia})
}

export const delRecorrenciaRequest = async ctx => {
  const {usuario_id, id} = ctx.request.params;
  ctx.body = await delRecorrencia({usuario_id, id})
}
