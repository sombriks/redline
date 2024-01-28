import { knex } from '../config/db/index.mjs'

export const listPlanejamento = ({ usuario_id = -1, q = '', limit = 10, offset = 0 }) => {
  return knex('planejamento')
    .whereIn('categoria_id', knex('categoria')
      .select('id')
      .where({ usuario_id }))
    .andWhereLike('descricao', `%${q}%`)
    .orderBy('criacao', 'desc')
    .offset(offset)
    .limit(limit)
}

export const insertPlanejamento = async ({ usuario_id, planejamento }) => {
  const count = await knex('categoria').where({ usuario_id, id: planejamento.categoria_id }).count()
  if (!count[Object.keys(count)[0]]) throw Error('Categoria não pertence ao usuário')
  return knex('planejamento').insert(planejamento, ['id'])
}

export const updatePlanejamento = async ({ id, usuario_id, planejamento }) => {
  const count = await knex('categoria').where({ usuario_id, id: planejamento.categoria_id }).count()
  if (!count[Object.keys(count)[0]]) throw Error('Categoria não pertence ao usuário')
  planejamento.id = id // sanity
  return knex('planejamento').update(planejamento).where({ id })
}

export const delPlanejamento = ({ usuario_id = -1, id = -1 }) =>
  knex('planejamento').del()
    .whereIn('categoria_id', knex('categoria')
      .select('id')
      .where({ usuario_id }))
    .andWhere({ id })
