import { knex } from "../config/db/index.mjs";

export const resetConta = async ({ usuario_id }) => {
  await knex("conta").where({ usuario_id }).del();
  const tipos = await knex("tipo_conta")

  const novas = tipos.map(t => ({
    usuario_id,
    tipo_conta_id: t.id,
    descricao: `${t.descricao} PADRÃO`,
    dia_fechamento: 5,
    dia_vencimento: 15
  }));

  return knex("conta").insert(novas, ["id"]);
};

export const listContas = async ({ usuario_id, q = "", limit = 100, offset = 0 }) =>
  await knex("conta")
    .where({ usuario_id })
    .andWhereLike("descricao", `%${q}%`)
    .orderBy("id")
    .limit(limit)
    .offset(offset);

export const findConta = async ({ id, usuario_id }) =>
  await knex("conta").where({ id, usuario_id }).first();

export const insertConta = async conta =>
  await knex("conta").insert(conta, ["id"]);

export const updateConta = async ({ id = -1, conta }) => {
  conta.id = id;
  return knex("conta").update(conta).where({ id });
};

export const delConta = async ({ id = -1, usuario_id = -1 }) =>
  await knex("conta").del().where({ id, usuario_id });
