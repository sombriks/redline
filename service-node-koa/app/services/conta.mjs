import { knex } from "../config/db/index.mjs";

export const resetConta = async (usuario_id) => {
  await knex("conta").where({ usuario_id }).del();
  const { id } = await knex("tipo_conta")
    .where("descricao", "CARTEIRA").first();
  const nova = { usuario_id, tipo_conta_id: id, descricao: "Minha Carteira" };
  return knex("conta").insert(nova, ["id"]);
};

export const listContas = async ({ usuario_id, limit = 100, offset = 0 }) =>
  await knex("conta").where({ usuario_id }).limit(limit).offset(offset);

export const findConta = async ({ id, usuario_id }) =>
  await knex("conta").where({ id, usuario_id }).first();

export const insertConta = async conta =>
  await knex("conta").insert(conta, ["id"]);

export const updateConta = async ({ id, conta }) =>
  await knex("conta").update(conta).where({ id });

export const delConta = async (id = -1) =>
  await knex("conta").del().where({ id });
