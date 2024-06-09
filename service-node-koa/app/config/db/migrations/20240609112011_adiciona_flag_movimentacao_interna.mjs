/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) =>
  knex.schema.table('movimentacao', tb => {
    tb.dropNullable('categoria_id')
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
