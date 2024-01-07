import {
  findMovimentacao,
  insertMovimentacao,
  listMovimentacaoByConta,
  listMovimentacaoByUsuario,
  removeMovimentacao,
  updateMovimentacao
} from "../services/index.mjs";

export const listMovimentacaoRequest = async ctx => {
  const {usuario_id} = ctx.request.params;
  // TODO validar
  const params = {...ctx.request.query, usuario_id}
  if (ctx.request.query.conta_id) ctx.body = await listMovimentacaoByConta(params);
  else ctx.body = await listMovimentacaoByUsuario(params);
};

export const findMovimentacaoRequest = async ctx => {
  const {usuario_id, id} = ctx.request.params;
  ctx.body = await findMovimentacao({usuario_id, id});
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

export const uploadMovimentacaoRequest = async ctx => {
  const {id} = ctx.request.params;
  const {file} = ctx.request.body;
  ctx.logger.info(`prepare to import data for user #${id}`);
  if (!file) throw new Error("csv file not found");
  const lines = file.split("\n").filter(l => l.length > 0);
  if (lines.length <= 1) throw new Error("File is empty");
  ctx.logger.info(`File with ${lines.length} lines`);
  ctx.body = {messsage: "OK"}
}
