import { knex } from "../config/db/index.mjs";

export const listRecorrencia = ({ user_id = -1, q = "", limit = 10, offset = 0 }) => {
  return knex("recorrencia")
    .where({ user_id })
    .andWhereLike("descricao", `%${q}%`)
    .offset(offset)
    .limit(limit);
};
