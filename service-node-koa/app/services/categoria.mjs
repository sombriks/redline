import {knex} from "../config/db/index.mjs"

export const resetCategorias = async usuario_id => {
  await knex("categoria").where({usuario_id}).del()
  const modelos = await knex("modelocategoria")
  return knex("categoria").insert(modelos
    .map(({descricao}) => ({usuario_id, descricao})))
}
