import { delPlanejamento, insertPlanejamento, listPlanejamento, updatePlanejamento } from '../services/index.mjs'

export const listPlanejamentoRequest = async ctx => {
  const { usuario_id } = ctx.request.params
  const { q, limit = 10, offset = 0 } = ctx.request.query
  ctx.body = await listPlanejamento({ usuario_id, q, limit, offset })
}

export const insertPlanejamentoRequest = async ctx => {
  const { usuario_id } = ctx.request.params
  const planejamento = ctx.request.body
  ctx.body = await insertPlanejamento({ usuario_id, planejamento })
}

export const updatePlanejamentoRequest = async ctx => {
  const { id, usuario_id } = ctx.request.params
  const planejamento = ctx.request.body
  ctx.body = await updatePlanejamento({ id, usuario_id, planejamento })
}

export const delPlanejamentoRequest = async ctx => {
  const { usuario_id, id } = ctx.request.params
  ctx.body = await delPlanejamento({ usuario_id, id })
}
