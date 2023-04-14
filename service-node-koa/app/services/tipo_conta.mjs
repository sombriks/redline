import {knex} from "../config/db/index.mjs"

export const listTipoConta = async () => await knex("tipo_conta")