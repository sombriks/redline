import {knex} from "../config/db/index.mjs"

export const resetConta = async usuario_id => {
  await knex("conta").where({usuario_id}).del()
  const {id} = await knex("tipo_conta")
    .where("descricao", "CARTEIRA").first()
  return knex("conta").insert({usuario_id, tipo_conta_id: id, descricao: "Minha Carteira"})
}