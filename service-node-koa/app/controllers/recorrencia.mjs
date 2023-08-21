import { listRecorrencia } from "../services/index.mjs";

export const listRecorrenciaRequest = async ctx => {
  const { user_id } = ctx.request.params;
  const { q, limit = 10, offset = 0  } = ctx.request.query;
  return await listRecorrencia({ user_id, q, limit, offset });
};
