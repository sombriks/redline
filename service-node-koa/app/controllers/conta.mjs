import Router from "@koa/router";
import { delConta, findConta, insertConta, listContas, updateConta } from "../services/index.mjs";

export const contaRouter = new Router();

contaRouter.get("/:usuario_id/conta", async ctx => {
  const { usuario_id } = ctx.request.params;
  const { q = "", limit = 100, offset = 0 } = ctx.request.query;
  ctx.body = await listContas({ usuario_id, q, limit, offset });
});

contaRouter.get("/:usuario_id/conta/:id", async ctx => {
  const { usuario_id, id } = ctx.request.params;
  ctx.body = await findConta({ id, usuario_id });
});

contaRouter.post("/:usuario_id/conta", async ctx => {
  const { usuario_id } = ctx.request.params;
  const novaConta = ctx.request.body;
  novaConta.usuario_id = usuario_id;
  ctx.body = await insertConta(novaConta);
});

contaRouter.put("/:usuario_id/conta/:id", async ctx => {
  const { usuario_id, id } = ctx.request.params;
  const conta = ctx.request.body;
  if (conta.usuario_id != usuario_id) ctx.throw(403, "invalid user");
  else ctx.body = await updateConta({ id, conta });
});

contaRouter.del("/:usuario_id/conta/:id", async ctx => {
  const { usuario_id, id } = ctx.request.params;
  ctx.body = await delConta({ usuario_id, id });
});
