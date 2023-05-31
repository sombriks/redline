import { knex } from "../config/db/index.mjs";

export const findMovimentacaoById = async id =>
  knex("movimentacao").where({ id }).first();

export const listMovimentacaoByUsuarioId = async (usuario_id, limit = 50, offset = 0) =>
  knex("movimentacao").whereIn("conta_id",
    knex("conta").where({ usuario_id }).select("id"));

// TODO imaginar mais funções auxiliares pra criação de distintas movimentações

export const novaEntrada = async ({ conta_id, valor, descricao, categoria_id, efetivada }) =>
  knex("movimentacao").insert({
    conta_id,
    valor,
    descricao,
    categoria_id,
    efetivada,
    tipo_movimentacao_id: 1 // entrada
  }, ["id"]);


export const novaSaida = async ({ conta_id, valor, descricao, categoria_id, efetivada }) =>
  knex("movimentacao").insert({
    conta_id,
    valor,
    descricao,
    categoria_id,
    efetivada,
    tipo_movimentacao_id: 2 // saída
  }, ["id"]);

export const atualizaMovimentacao = async (id = -1, movimentacao) =>
  knex("movimentacao").update(movimentacao).where({ id });

export const removeMovimentacao = async (id = -1) =>
  knex("movimentacao").del().where({ id });