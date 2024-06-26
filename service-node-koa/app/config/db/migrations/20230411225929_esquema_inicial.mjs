// import fs from 'fs';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
	return knex.schema
		.createTable("usuario", (tb) => {
			tb.increments("id");
			tb.string("nome").notNullable();
			tb.string("email").notNullable().unique();
			tb.string("senha").notNullable();
			tb.boolean("admin").notNullable().defaultTo(false);
			tb.timestamp("criacao").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("alteracao").notNullable().defaultTo(knex.fn.now());
		})
		.createTable("tipo_movimentacao", (tb) => {
			tb.integer("id").notNullable().unsigned().primary();
			tb.string("descricao").notNullable().unique();
			tb.timestamp("criacao").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("alteracao").notNullable().defaultTo(knex.fn.now());
		})
		.createTable("tipo_recorrencia", (tb) => {
			tb.integer("id").notNullable().unsigned().primary();
			tb.string("descricao").notNullable().unique();
			tb.timestamp("criacao").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("alteracao").notNullable().defaultTo(knex.fn.now());
		})
		.createTable("tipo_conta", (tb) => {
			tb.integer("id").notNullable().unsigned().primary();
			tb.string("descricao").notNullable().unique();
			tb.timestamp("criacao").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("alteracao").notNullable().defaultTo(knex.fn.now());
		})
		.createTable("modelocategoria", (tb) => {
			tb.increments("id");
			tb.string("descricao").notNullable().unique();
			tb.string("cor").notNullable().defaultTo("#f00");
			tb.timestamp("criacao").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("alteracao").notNullable().defaultTo(knex.fn.now());
		})
		.createTable("categoria", (tb) => {
			tb.increments("id");
			tb.string("descricao").notNullable();
			tb.string("cor").notNullable().defaultTo("#f00");
			tb.timestamp("criacao").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("alteracao").notNullable().defaultTo(knex.fn.now());
			tb.integer("usuario_id")
				.notNullable()
				.unsigned()
				.references("usuario.id")
				.onDelete("cascade");
			tb.unique(["descricao", "usuario_id"]);
		})
		.createTable("recorrencia", (tb) => {
			tb.increments("id");
			tb.string("descricao").notNullable();
			tb.decimal("valor", 10, 2).notNullable();
			tb.timestamp("criacao").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("alteracao").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("inicial").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("final").notNullable().defaultTo(knex.fn.now());
			tb.integer("tipo_recorrencia_id")
				.notNullable()
				.unsigned()
				.references("tipo_recorrencia.id");
			tb.integer("usuario_id")
				.notNullable()
				.unsigned()
				.references("usuario.id")
				.onDelete("cascade");
		})
		.createTable("conta", (tb) => {
			tb.increments("id");
			tb.string("descricao").notNullable();
			tb.boolean("ativa").notNullable().defaultTo(true);
			tb.string("cor").notNullable().defaultTo("#f00");
			tb.timestamp("criacao").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("alteracao").notNullable().defaultTo(knex.fn.now());
			tb.integer("usuario_id")
				.notNullable()
				.unsigned()
				.references("usuario.id")
				.onDelete("cascade");
			tb.integer("tipo_conta_id")
				.notNullable()
				.unsigned()
				.references("tipo_conta.id");
			tb.integer("dia_fechamento").defaultTo(5);
			tb.integer("dia_vencimento").defaultTo(15);
			tb.decimal("limite", 10, 2).defaultTo(5000);
		})
		.createTable("movimentacao", (tb) => {
			tb.increments("id");
			tb.string("descricao").notNullable();
			tb.decimal("valor", 10, 2).notNullable();
			tb.timestamp("criacao").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("alteracao").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("vencimento").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("efetivada");
			tb.integer("tipo_movimentacao_id")
				.notNullable()
				.unsigned()
				.references("tipo_movimentacao.id");
			tb.integer("conta_id")
				.notNullable()
				.unsigned()
				.references("conta.id")
				.onDelete("cascade");
			tb.integer("categoria_id")
				.unsigned()
				.references("categoria.id")
				.onDelete("set null");
			tb.integer("recorrencia_id")
				.unsigned()
				.references("recorrencia.id")
				.onDelete("cascade");
		})
		.createTable("planejamento", (tb) => {
			tb.increments("id");
			tb.string("descricao").notNullable();
			tb.timestamp("criacao").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("alteracao").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("inicial").notNullable().defaultTo(knex.fn.now());
			tb.timestamp("final").notNullable().defaultTo(knex.fn.now());
			tb.integer("categoria_id")
				.notNullable()
				.unsigned()
				.references("categoria.id")
				.onDelete("cascade");
			tb.decimal("limite", 10, 2).notNullable();
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
	return knex.schema
		.dropTable("planejamento")
		.dropTable("movimentacao")
		.dropTable("conta")
		.dropTable("recorrencia")
		.dropTable("categoria")
		.dropTable("modelocategoria")
		.dropTable("tipo_conta")
		.dropTable("tipo_recorrencia")
		.dropTable("tipo_movimentacao")
		.dropTable("usuario");
};
