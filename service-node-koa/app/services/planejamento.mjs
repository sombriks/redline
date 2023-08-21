import { knex } from "../config/db/index.mjs";

export const listPlanejamento = ({ user_id = -1, q = "", limit = 10, offset = 0 }) => {
  return knex("planejamento")
    .whereIn("categoria_id", knex("categoria")
      .select("id")
      .where({ user_id }))
    .andWhereLike("descricao", `%${q}%`)
    .offset(offset)
    .limit(limit);
};
