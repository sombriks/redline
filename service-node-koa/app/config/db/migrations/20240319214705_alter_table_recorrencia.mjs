/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.table('recorrencia', tb => {
    tb.dropColumn('valor')
    tb.dropColumn('usuario_id')
    tb.string('cor').notNullable().defaultTo('#f00')
    tb.integer('parcelas').notNullable().defaultTo(1)
    tb.decimal('valorParcela', 10, 2).notNullable().defaultTo(0)
    tb.integer('categoria_id').unsigned()
      .references('categoria.id')
      .onDelete('set null')
    tb.integer('conta_id').notNullable().unsigned()
      .references('conta.id')
      .onDelete('cascade')
    tb.integer('tipo_movimentacao_id').notNullable().unsigned()
      .references('tipo_movimentacao.id').defaultTo(2)
  })
}

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.table('recorrencia', tb => {
    tb.decimal('valor', 10, 2).notNullable().defaultTo(0)
    tb.integer('usuario_id').notNullable().unsigned()
      .references('usuario.id')
      .onDelete('cascade')
    tb.dropColumn('cor')
    tb.dropColumn('parcelas')
    tb.dropColumn('valorParcela')
    tb.dropColumn('categoria_id')
    tb.dropColumn('conta_id')
    tb.dropColumn('tipo_movimentacao_id')
  })
}
