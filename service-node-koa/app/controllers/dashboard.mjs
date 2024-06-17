import { getDashboard } from "../services/index.mjs";

export const getDashboardRequest = async (ctx) => {
	const { usuario_id } = ctx.request.params;
	const { inicio, fim } = ctx.request.query;
	// more validations
	if (!inicio) return ctx.throw(400, "informe a data de início");
	if (!fim) return ctx.throw(400, "informe a data de fim");
	ctx.body = await getDashboard({ usuario_id, inicio, fim });
};
