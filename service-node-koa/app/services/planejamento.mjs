import {knex} from "../config/db/index.mjs";

export const listPlanejamento = ({usuario_id = -1, q = "", limit = 10, offset = 0}) => {
  return knex("planejamento")
    .whereIn("categoria_id", knex("categoria")
      .select("id")
      .where({usuario_id}))
    .andWhereLike("descricao", `%${q}%`)
    .orderBy("criacao", "desc")
    .offset(offset)
    .limit(limit);
};

export const delPlanejamento = ({usuario_id = -1, id = -1}) =>
  knex("planejamento").del()
    .whereIn("categoria_id", knex("categoria")
      .select("id")
      .where({usuario_id}))
    .andWhere({id})
