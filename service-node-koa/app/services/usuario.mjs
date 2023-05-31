import { knex } from "../config/db/index.mjs";
import { decrypt, encrypt } from "../config/security/index.mjs";

export const novoUsuario = async ({ nome, email, senha }) =>
  knex("usuario").insert({ nome, email, senha: encrypt(senha) }, ["id"]);

export const getUsusarioByEmailSenha = async ({ email, senha }) => {
  const usuario = await knex("usuario").where({ email }).first();
  const pwd = decrypt(usuario.senha);
  return pwd == senha ? usuario : null;
};

export const delUsuario = async id =>
  knex("usuario").del().where({ id });


export const getAdmin = async () =>
  knex("usuario").where({ email: "adm@meudinheiro.cc" }).first();
