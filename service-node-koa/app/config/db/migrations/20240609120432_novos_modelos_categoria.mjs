/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) =>
	knex("modelocategoria").insert([
		{ descricao: "ESTUDO", cor: "#A0FF16" },
		{ descricao: "TRANSFERENCIA", cor: "#AAEEEE" },
	]);

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) =>
	knex("modelocategoria")
		.del()
		.whereIn("descricao", ["ESTUDO", "TRANSFERENCIA"]);
