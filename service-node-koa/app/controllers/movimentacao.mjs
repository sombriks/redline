import {
	downloadMovimentacoes,
	findCategoria,
	findConta,
	findMovimentacao,
	insertMovimentacao,
	listMovimentacaoByConta,
	listMovimentacaoByUsuario,
	pagamento,
	removeMovimentacao,
	transferencia,
	updateMovimentacao,
	uploadMovimentacoes,
} from "../services/index.mjs";

export const listMovimentacaoRequest = async (ctx) => {
	const { usuario_id } = ctx.request.params;
	// TODO validar
	const params = { ...ctx.request.query, usuario_id };
	if (ctx.request.query.conta_id)
		ctx.body = await listMovimentacaoByConta(params);
	else ctx.body = await listMovimentacaoByUsuario(params);
};

export const findMovimentacaoRequest = async (ctx) => {
	const { /*usuario_id, conta_id,*/ id } = ctx.request.params;
	ctx.body = await findMovimentacao(id);
};

export const insertMovimentacaoRequest = async (ctx) => {
	const { conta_id } = ctx.request.params;
	const novaMovimentacao = ctx.request.body;
	novaMovimentacao.conta_id = conta_id;
	ctx.body = await insertMovimentacao(novaMovimentacao);
};

export const updateMovimentacaoRequest = async (ctx) => {
	const { conta_id, id } = ctx.request.params;
	const movimentacao = ctx.request.body;
	movimentacao.alteracao = new Date();
	movimentacao.conta_id = conta_id;
	movimentacao.id = id;
	ctx.body = await updateMovimentacao({ id, movimentacao });
};

export const removeMovimentacaoRequest = async (ctx) => {
	const { id } = ctx.request.params;
	ctx.body = await removeMovimentacao(id);
};

export const uploadMovimentacoesRequest = async (ctx) => {
	const { usuario_id: id } = ctx.request.params;
	const { file } = ctx.request.body;
	ctx.logger.info(`prepare to import data for user #${id}`);
	if (!file) throw new Error("csv file not found");
	const lines = file.split(/[\r\n]/).filter((l) => l.length > 0);
	if (lines.length <= 1) throw new Error("File is empty");
	ctx.logger.info(`File with ${lines.length} lines`);
	const header = lines.shift();
	if (header.split(/[,;]/).length < 7)
		throw new Error("Incorrect column count");
	ctx.logger.info("Proper column count. Start processing...");
	const result = await uploadMovimentacoes({ id, header, lines });
	ctx.body = { message: "processed", result };
};

export const downloadMovimentacoesRequest = async (ctx) => {
	const { usuario_id: id } = ctx.request.params;
	const { conta_id, data_inicio, data_fim } = ctx.request.query;
	if (!conta_id) throw new Error("account not found");
	if (!data_inicio || !data_fim)
		throw new Error("must provide date interval (data_inicio/data_fim)");
	// if (!data_inicio.match(/\d{4}-\d{2}-\d{2}/)) throw new Error("invalid date format for data_inicio")
	// if (!data_fim.match(/\d{4}-\d{2}-\d{2}/)) throw new Error("invalid date format for data_fim")
	const csv = await downloadMovimentacoes({
		id,
		conta_id,
		data_inicio,
		data_fim,
	});
	ctx.body = { csv };
};

export const transferenciaRequest = async (ctx) => {
	const {
		usuario_id,
		conta_id: conta_origem_id,
		conta_destino_id,
	} = ctx.request.params;
	const { valor, vencimento, categoria: categoria_id } = ctx.request.body;

	const origem = await findConta({ id: conta_origem_id, usuario_id });
	const destino = await findConta({ id: conta_destino_id, usuario_id });
	const categoria = await findCategoria({ id: categoria_id, usuario_id });

	if (!origem) return ctx.throw(400, "conta origem não encontrada");
	if (!destino) return ctx.throw(400, "conta destino não encontrada");
	if (!categoria) return ctx.throw(400, "categoria não encontrada");

	const result = await transferencia({
		origem,
		destino,
		categoria,
		valor,
		vencimento,
	});
	ctx.body = result;
};

export const pagamentoRequest = async (ctx) => {
	const { usuario_id, conta_id, conta_destino_id } = ctx.request.params;
	const { movimentacoes_id, categoria_id, vencimento, valor } =
		ctx.request.body;

	const origem = await findConta({ id: conta_id, usuario_id });
	const destino = await findConta({ id: conta_destino_id, usuario_id });
	const categoria = await findCategoria({ id: categoria_id, usuario_id });

	if (!origem) return ctx.throw(400, "conta origem não encontrada");
	if (!destino) return ctx.throw(400, "conta destino não encontrada");
	if (!categoria) return ctx.throw(400, "categoria não encontrada");
	if (!movimentacoes_id || movimentacoes_id.length === 0)
		return ctx.throw(400, "informe as movimentações a pagar");

	const result = await pagamento({
		origem,
		destino,
		categoria,
		valor,
		vencimento,
		movimentacoes_id,
	});
	ctx.body = result;
};
