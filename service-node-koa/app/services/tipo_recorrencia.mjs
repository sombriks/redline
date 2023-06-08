import { knex } from "../config/db/index.mjs";

export const listTipoRecorrencia = async () => await knex("tipo_recorrencia");
