import {knex} from "../config/db/index.mjs"

export const listTipoMovimentacao = async () => await knex("tipo_movimentacao")