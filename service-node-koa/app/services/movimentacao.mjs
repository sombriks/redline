import {knex} from "../config/db/index.mjs";

export const findMovimentacao = async id =>
  knex("movimentacao").where({id}).first();

export const listMovimentacaoByUsuario = async ({
                                                  usuario_id = -1,
                                                  q = "",
                                                  limit = 50,
                                                  offset = 0,
                                                  tipo_movimentacao_id,
                                                  sort = "vencimento",
                                                  direction = "desc"
                                                }) => {

  const whereParams = {}
  if (tipo_movimentacao_id && tipo_movimentacao_id !== "null") {
    whereParams.tipo_movimentacao_id = tipo_movimentacao_id
  }

  return knex("movimentacao")
    .where(whereParams)
    .whereIn("conta_id",
      knex("conta").where({usuario_id}).select("id"))
    .andWhereLike("descricao", `%${q}%`)
    .orderBy(sort, direction)
    .offset(offset)
    .limit(limit);
}


export const listMovimentacaoByConta = async ({
                                                conta_id = -1,
                                                q = "",
                                                limit = 50,
                                                offset = 0,
                                                tipo_movimentacao_id,
                                                sort = "vencimento",
                                                direction = "desc"
                                              }) => {
  const whereParams = {conta_id}
  if (tipo_movimentacao_id && tipo_movimentacao_id !== "null") {
    whereParams.tipo_movimentacao_id = tipo_movimentacao_id
  }

  return knex("movimentacao")
    .where(whereParams)
    .andWhereLike("descricao", `%${q}%`)
    .orderBy(sort, direction)
    .offset(offset)
    .limit(limit);
}


// TODO mais opções de listagem por período

export const novaEntrada = async ({conta_id, valor, descricao, categoria_id, efetivada}) =>
  knex("movimentacao")
    .insert({
      conta_id,
      valor,
      descricao,
      categoria_id,
      efetivada,
      tipo_movimentacao_id: 1 // entrada
    }, ["id"]);


export const novaSaida = async ({conta_id, valor, descricao, categoria_id, efetivada}) =>
  knex("movimentacao")
    .insert({
      conta_id,
      valor,
      descricao,
      categoria_id,
      efetivada,
      tipo_movimentacao_id: 2 // saída
    }, ["id"]);

export const insertMovimentacao = async movimentacao =>
  knex("movimentacao").insert(movimentacao, ["id"]);

export const updateMovimentacao = async ({id = -1, movimentacao}) => {
  movimentacao.id = id;
  return knex("movimentacao")
    .update(movimentacao)
    .where({id});
};

export const removeMovimentacao = async (id = -1) =>
  knex("movimentacao")
    .where({id})
    .del();
