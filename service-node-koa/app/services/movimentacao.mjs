import { knex } from "../config/db/index.mjs";

export const listMovimentacaoByUsuarioId = async (usuario_id) =>
  knex("movimentacao").whereIn("conta_id",
    knex("conta").where({ usuario_id }).select("id"));

export const novaEntrada = async ({ conta_id, valor, descricao, categoria_id }) =>
  knex("movimentacao").insert({
    conta_id,
    valor,
    descricao,
    categoria_id,
    tipo_movimentacao_id: 1,
    efetivada: new Date()
  });