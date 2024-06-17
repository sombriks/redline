/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) =>
	knex.schema.table("planejamento", (tb) => {
		tb.integer("tipo_movimentacao_id")
			.unsigned()
			.notNullable()
			.references("tipo_movimentacao.id")
			.defaultTo(2);
	});

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) =>
	knex.schema.table("planejamento", (tb) => {
		tb.dropColumn("tipo_movimentacao_id");
	});
