import { listPlanejamento } from "../services/index.mjs";

export const listPlanejamentoRequest = async ctx => {
  const { user_id } = ctx.request.params;
  const { q, limit = 10, offset = 0 } = ctx.request.query;
  return await listPlanejamento({ user_id, q, limit, offset });
};
