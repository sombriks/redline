import {knex} from "../config/db/index.mjs"

export const list = async () => await knex("modelocategoria")