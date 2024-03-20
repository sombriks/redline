
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.table("recorrencia", tb => {
    tb.dropColumn("valor")
    tb.string("cor").notNullable().defaultTo("#f00")
    tb.boolean("divide").notNullable().defaultTo(true)
    tb.integer("parcelas").notNullable().defaultTo(1)
    tb.decimal("valorTotal", 10, 2).notNullable().defaultTo(0)
    tb.integer("categoria_id").unsigned()
      .references("categoria.id")
      .onDelete("set null")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.table("recorrencia", tb => {
    tb.decimal("valor", 10, 2).notNullable().defaultTo(0)
    tb.dropColumn("cor")
    tb.dropColumn("divide")
    tb.dropColumn("parcelas")
    tb.dropColumn("valorTotal")
    tb.dropColumn("categoria_id")
  })
};
