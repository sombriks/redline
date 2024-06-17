import { knex } from "../config/db/index.mjs";
import {
	addDays,
	addMonths,
	addYears,
	differenceInDays,
	differenceInMonths,
	differenceInYears,
} from "date-fns";

export const listRecorrencia = ({
	usuario_id = -1,
	q = "",
	limit = 10,
	offset = 0,
}) => {
	return knex("recorrencia")
		.whereIn("conta_id", knex("conta").select("id").where({ usuario_id }))
		.andWhereLike("descricao", `%${q}%`)
		.offset(offset)
		.limit(limit);
};

export const findRecorrencia = ({ id = -1 }) => {
	return knex("recorrencia").where({ id }).first();
};

export const insertRecorrencia = ({ recorrencia }) => {
	return knex("recorrencia").insert(recorrencia, ["id"]);
};

export const updateRecorrencia = ({ usuario_id, id, recorrencia }) => {
	recorrencia.id = id;
	return knex("recorrencia").update(recorrencia).where({ id });
};

export const delRecorrencia = async ({ id = -1 }) => {
	await knex("movimentacao").del().where({ recorrencia_id: id });
	return knex("recorrencia").del().where({ id });
};

export const geraLancamentos = async ({ usuario_id, id }) => {
	const recorrencia = await findRecorrencia({ usuario_id, id });
	if (!recorrencia) throw new Error("recorrencia não encontrada!");
	await limparParcelas(recorrencia);
	const numParcelas = calculaParcelas(recorrencia);
	const lancamentos = [];
	for (let i = 0; i < numParcelas; i++) {
		lancamentos.push({
			descricao: `${recorrencia.descricao} (${i + 1}/${numParcelas})`,
			categoria_id: recorrencia.categoria_id,
			recorrencia_id: recorrencia.id,
			conta_id: recorrencia.conta_id,
			tipo_movimentacao_id: recorrencia.tipo_movimentacao_id,
			vencimento: proximoVencimento(recorrencia, i),
			valor: recorrencia.valorParcela,
		});
	}
	const result = await knex("movimentacao").insert(lancamentos);
	return { success: true, result };
};

const limparParcelas = async (recorrencia) => {
	return knex("movimentacao").del().where({ recorrencia_id: recorrencia.id });
};

const calculaParcelas = ({ tipo_recorrencia_id, inicial, final }) => {
	switch (tipo_recorrencia_id) {
		case 1:
			return 1 + differenceInMonths(final, inicial);
		case 2:
			return 1 + differenceInYears(final, inicial);
		default:
			return 1 + differenceInDays(final, inicial);
	}
};

const proximoVencimento = (recorrencia, i) => {
	switch (recorrencia.tipo_recorrencia_id) {
		case 1:
			return addMonths(recorrencia.inicial, i).toISOString();
		case 2:
			return addYears(recorrencia.inicial, i).toISOString();
		default:
			return addDays(recorrencia.inicial, i).toISOString();
	}
};
