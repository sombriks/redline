
/**
 * confirm user creation table
 *
 * - all user data
 * - confirm expiration time
 * - six digit challenge code for this
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void>|import("knex").Knex.SchemaBuilder }
 */
export const up = async (knex) => {
  return knex.schema.createTable('confirma_cadastro', tb => {
    tb.increments()
    tb.string('nome').notNullable()
    tb.string('email').notNullable()
    tb.string('senha').notNullable()
    tb.string('challenge').notNullable()
    tb.timestamp("criacao").notNullable().defaultTo(knex.fn.now())
    tb.timestamp("alteracao").notNullable().defaultTo(knex.fn.now())
    tb.boolean('enviado').notNullable().defaultTo(false)
    tb.boolean('consumido').notNullable().defaultTo(false)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void>|import("knex").Knex.SchemaBuilder }
 */
export const down = async (knex) => {
  return knex.schema.dropTable('confirma_cadastro');
};
