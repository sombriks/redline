import Router from "@koa/router";
import {
  updateMovimentacao,
  findMovimentacao,
  listMovimentacaoByConta,
  listMovimentacaoByUsuario,
  novaEntrada, novaSaida, removeMovimentacao, insertMovimentacao
} from "../services/index.mjs";
import { contaOwnedBy } from "../config/security/index.mjs";

export const movimentacaoRouter = new Router();

movimentacaoRouter.get("/:usuario_id/movimentacao", async ctx => {
  const { usuario_id } = ctx.request.params;
  const { q = "", limit = 50, offset = 0, conta_id } = ctx.request.query;
  if (conta_id) ctx.body = await listMovimentacaoByConta({ conta_id, q, limit, offset });
  else ctx.body = await listMovimentacaoByUsuario({ usuario_id, q, limit, offset });
});

movimentacaoRouter.get("/:usuario_id/movimentacao/:id", async ctx => {
  const { usuario_id, id } = ctx.request.params;
  ctx.body = await findMovimentacao({ usuario_id, id });
});

movimentacaoRouter.post("/:usuario_id/entrada/:conta_id", async ctx => {
  const { conta_id } = ctx.request.params;
  const novaMovimentacao = ctx.request.body;
  novaMovimentacao.conta_id = conta_id;
  ctx.body = await novaEntrada(novaMovimentacao);
});

movimentacaoRouter.post("/:usuario_id/saida/:conta_id", async ctx => {
  const { conta_id } = ctx.request.params;
  const novaMovimentacao = ctx.request.body;
  novaMovimentacao.conta_id = conta_id;
  ctx.body = await novaSaida(novaMovimentacao);
});

movimentacaoRouter.post("/:usuario_id/movimentacao/:conta_id", contaOwnedBy, async ctx => {
  const { conta_id } = ctx.request.params;
  const novaMovimentacao = ctx.request.body;
  novaMovimentacao.conta_id = conta_id;
  ctx.body = await insertMovimentacao(novaMovimentacao);
});

movimentacaoRouter.put("/:usuario_id/movimentacao/:conta_id/:id", contaOwnedBy, async ctx => {
  const { conta_id, id } = ctx.request.params;
  const movimentacao = ctx.request.body;
  movimentacao.alteracao = new Date();
  movimentacao.conta_id = conta_id;
  movimentacao.id = id;
  ctx.body = await updateMovimentacao({ id, movimentacao });
});

// TODO rever os mapeamentos
// TODO checagens
movimentacaoRouter.del("/:usuario_id/movimentacao/:conta_id/:id", contaOwnedBy, async ctx => {
  const { id } = ctx.request.params;
  ctx.body = await removeMovimentacao(id);
});
