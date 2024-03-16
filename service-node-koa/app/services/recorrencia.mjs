import {knex} from "../config/db/index.mjs";

export const listRecorrencia = ({usuario_id = -1, q = "", limit = 10, offset = 0}) => {
  return knex("recorrencia")
    .where({usuario_id})
    .andWhereLike("descricao", `%${q}%`)
    .offset(offset)
    .limit(limit);
};

export const findRecorrencia = ({usuario_id = -1, id = -1}) => {
  return knex("recorrencia")
    .where({usuario_id, id})
    .first()
}

export const insertRecorrencia = ({usuario_id, recorrencia}) => {
  recorrencia.usuario_id = usuario_id
  return knex("recorrencia").insert(recorrencia, ["id"])
}

export const updateRecorrencia = ({usuario_id, id, recorrencia}) => {
  recorrencia.usuario_id = usuario_id;
  recorrencia.id = id;
  return knex("recorrencia").update(recorrencia).where({usuario_id, id})
}

export const delRecorrencia = ({usuario_id, id}) => {
  return knex("recorrencia").del().where({usuario_id, id})
}
