import { knex } from "../config/db/index.mjs";
import { decrypt, encrypt } from "../config/security/index.mjs";

export const novoUsuario = async ({ nome, email, senha }) => {
  const pwd = encrypt(senha);
  const [usuario_id] = await knex("usuario").insert({ nome, email, senha: pwd });
  return usuario_id;
};

export const getUsusarioByEmailSenha = async ({ email, senha }) => {
  const usuario = await knex("usuario").where({ email }).first();
  const pwd = decrypt(usuario.senha);
  return pwd == senha ? usuario : null;
};

export const delUsuario = async id => {
  const result = await knex("usuario").del().where({ id });
  return result;
};