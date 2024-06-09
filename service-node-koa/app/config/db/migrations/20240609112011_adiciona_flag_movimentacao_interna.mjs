/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) =>
  knex.schema.table('movimentacao', tb => {
    tb.dropNullable('categoria_id')
    tb.foreign('categoria_id').references('categoria.id').onDelete('cascade')
    tb.boolean('interna').defaultTo(false)
      .comment('indica uma movimentação entre contas')
  })

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) =>
  knex.schema.table('movimentacao', tb => {
    tb.setNullable('categoria_id')
    tb.dropColumn('interna')
  })
