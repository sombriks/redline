import {
	delCategoria,
	findCategoria,
	insertCategoria,
	listCategorias,
	updateCategoria,
} from "../services/index.mjs";

export const listCategoriasRequest = async (ctx) => {
	const { usuario_id } = ctx.request.params;
	const { q, limit, offset } = ctx.request.query;
	ctx.body = await listCategorias({ usuario_id, q, limit, offset });
};

export const findCategoriaRequest = async (ctx) => {
	const { usuario_id, id } = ctx.request.params;
	ctx.body = await findCategoria({ id, usuario_id });
};

export const insertCategoriaRequest = async (ctx) => {
	const { usuario_id } = ctx.request.params;
	const novaCategoria = ctx.request.body;
	novaCategoria.usuario_id = usuario_id;
	ctx.body = await insertCategoria(novaCategoria);
};

export const updateCategoriaRequest = async (ctx) => {
	const { usuario_id, id } = ctx.request.params;
	const categoria = ctx.request.body;
	categoria.usuario_id = usuario_id;
	categoria.id = id;
	ctx.body = await updateCategoria({ id, categoria });
};

export const delCategoriaRequest = async (ctx) => {
	const { usuario_id, id } = ctx.request.params;
	ctx.body = await delCategoria({ id, usuario_id });
};
