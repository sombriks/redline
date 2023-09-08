import { knex } from "../config/db/index.mjs";

export const resetCategorias = async ({ usuario_id = -1 }) => {
  await knex("categoria").where({ usuario_id }).del();
  const modelos = await knex("modelocategoria").orderBy("criacao");
  return knex("categoria").insert(modelos
    .map(({ descricao, cor }) => ({ usuario_id, descricao, cor })));
};

export const listCategorias = async ({ usuario_id, q = "", limit = 100, offset = 0 }) =>
  knex("categoria").where({ usuario_id })
    .andWhereLike("descricao", `%${q}%`)
    .orderBy("criacao")
    .offset(offset)
    .limit(limit);

export const findCategoria = async ({ id, usuario_id }) =>
  knex("categoria").where({ id, usuario_id }).first();

export const insertCategoria = async categoria =>
  knex("categoria").insert(categoria, ["id"]);

export const updateCategoria = async ({ id = -1, categoria }) => {
  categoria.id = id;
  return knex("categoria").update(categoria).where({ id });
};

export const delCategoria = async ({ id = -1, usuario_id = -1 }) =>
  knex("categoria").where({ id, usuario_id }).del();
