import {knex} from "../config/db/index.mjs";

export const findMovimentacao = async id =>
  knex("movimentacao").where({id}).first();

export const listMovimentacaoByUsuario = async (params) => {
  const {
    usuario_id = -1,
  } = params

  return prepareMovimentacaoQuery(params)
    .whereIn("conta_id",
      knex("conta").where({usuario_id}).select("id"));
};


export const listMovimentacaoByConta = async (params) => {
  const {
    conta_id = -1,
  } = params;

  return prepareMovimentacaoQuery(params, {conta_id});
};

const prepareMovimentacaoQuery = (params, whereParams = {}) => {
  const {
    q = '',
    tipo_movimentacao_id,
    categoria_id,
    efetivada,
    dataInicio,
    dataFim,
    limit = 50,
    offset = 0,
    sort = "vencimento",
    direction = "desc"
  } = params

  let query = knex("movimentacao").whereLike("descricao", `%${q}%`);

  if (tipo_movimentacao_id && tipo_movimentacao_id !== "null") {
    whereParams.tipo_movimentacao_id = tipo_movimentacao_id;
  }

  if (categoria_id && categoria_id !== "null") {
    whereParams.categoria_id = categoria_id;
  }

  if (dataInicio
    && dataInicio !== "null"
    && dataInicio !== "undefined"
    && dataFim
    && dataFim !== "null"
    && dataFim !== "undefined") {
    query = query.whereBetween("vencimento", [new Date(dataInicio).toISOString(), new Date(dataFim).toISOString()]);
  }

  if (efetivada == "true") query = query.whereNotNull("efetivada");
  else if (efetivada == "false") query = query.whereNull("efetivada");

  return query
    .where(whereParams)
    .orderBy(sort, direction)
    .offset(offset)
    .limit(limit)
}

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
