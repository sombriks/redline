import { knex } from "../config/db/index.mjs";

export const listModelocategoria = async () => await knex("modelocategoria");
