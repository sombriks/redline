import {
  findMovimentacao,
  insertMovimentacao,
  listMovimentacaoByConta,
  listMovimentacaoByUsuario,
  novaEntrada,
  novaSaida,
  removeMovimentacao,
  updateMovimentacao
} from "../services/index.mjs";

export const listMovimentacaoRequest = async ctx => {
  const {usuario_id} = ctx.request.params;
  const {q = "", conta_id, tipo_movimentacao_id, dataInicio, dataFim, limit = 50, offset = 0} = ctx.request.query;
  if (conta_id) ctx.body = await listMovimentacaoByConta({q, conta_id, tipo_movimentacao_id, dataInicio, dataFim, limit, offset});
  else ctx.body = await listMovimentacaoByUsuario({q, usuario_id, tipo_movimentacao_id, dataInicio, dataFim, limit, offset});
};

export const findMovimentacaoRequest = async ctx => {
  const {usuario_id, id} = ctx.request.params;
  ctx.body = await findMovimentacao({usuario_id, id});
};

export const novaEntradaRequest = async ctx => {
  const {conta_id} = ctx.request.params;
  const novaMovimentacao = ctx.request.body;
  novaMovimentacao.conta_id = conta_id;
  ctx.body = await novaEntrada(novaMovimentacao);
};

export const novaSaidaRequest = async ctx => {
  const {conta_id} = ctx.request.params;
  const novaMovimentacao = ctx.request.body;
  novaMovimentacao.conta_id = conta_id;
  ctx.body = await novaSaida(novaMovimentacao);
};

export const insertMovimentacaoRequest = async ctx => {
  const {conta_id} = ctx.request.params;
  const novaMovimentacao = ctx.request.body;
  novaMovimentacao.conta_id = conta_id;
  ctx.body = await insertMovimentacao(novaMovimentacao);
};

export const updateMovimentacaoRequest = async ctx => {
  const {conta_id, id} = ctx.request.params;
  const movimentacao = ctx.request.body;
  movimentacao.alteracao = new Date();
  movimentacao.conta_id = conta_id;
  movimentacao.id = id;
  ctx.body = await updateMovimentacao({id, movimentacao});
};

export const removeMovimentacaoRequest = async ctx => {
  const {id} = ctx.request.params;
  ctx.body = await removeMovimentacao(id);
};
