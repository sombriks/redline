import { knex } from "../config/db/index.mjs";

export const resetCategorias = async usuario_id => {
  await knex("categoria").where({ usuario_id }).del();
  const modelos = await knex("modelocategoria");
  return knex("categoria").insert(modelos
    .map(({ descricao }) => ({ usuario_id, descricao })));
};

export const listCategorias = async ({ usuario_id, q = "", limit = 100, offset = 0 }) =>
  knex("categoria").where({ usuario_id })
    .andWhereLike("descricao", `%${q}%`)
    .orderBy("descricao")
    .offset(offset)
    .limit(limit);

export const findCategoria = async id =>
  knex("categoria").where({ id });

export const insertCategoria = async categoria =>
  knex("categoria").insert(categoria, ["id"]);

export const updateCategoria = async ({ id = -1, categoria }) => {
  categoria.id = id;
  return knex("categoria").update(categoria).where({ id });
};

export const delCategoria = async (id = -1) =>
  knex("categoria").where({ id }).del();
