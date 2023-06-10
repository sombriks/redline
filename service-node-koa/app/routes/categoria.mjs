import Router from "@koa/router";
import { delCategoria, findCategoria, insertCategoria, listCategorias, updateCategoria } from "../services/index.mjs";

export const categoriaRouter = new Router();

categoriaRouter.get("/:usuario_id/categoria", async ctx => {
  const { usuario_id } = ctx.request.params;
  const { q, limit, offset } = ctx.request.query;
  ctx.body = await listCategorias({ usuario_id, q, limit, offset });
});

categoriaRouter.get("/:usuario_id/categoria/:id", async ctx => {
  const { usuario_id, id } = ctx.request.params;
  ctx.body = await findCategoria({ id, usuario_id });
});

categoriaRouter.post("/:usuario_id/categoria", async ctx => {
  const { usuario_id } = ctx.request.params;
  const novaCategoria = ctx.request.body;
  novaCategoria.usuario_id = usuario_id;
  ctx.body = await insertCategoria(novaCategoria);
});

categoriaRouter.put("/:usuario_id/categoria/:id", async ctx => {
  const { usuario_id, id } = ctx.request.params;
  const categoria = ctx.request.body;
  categoria.usuario_id = usuario_id;
  categoria.id = id;
  ctx.body = await updateCategoria(({ id, categoria }));
});

categoriaRouter.del("/:usuario_id/categoria/:id", async ctx => {
  const { usuario_id, id } = ctx.request.params;
  ctx.body = await delCategoria({id, usuario_id})
})
