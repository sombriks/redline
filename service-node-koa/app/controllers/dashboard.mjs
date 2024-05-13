import { getDashboard } from '../services/index.mjs'

export const getDashboardRequest = async ctx => {
  const { usuario_id } = ctx.request.params
  const { inicio, fim } = ctx.request.query
  // more validations
  ctx.body = await getDashboard({usuario_id, inicio, fim})
}
