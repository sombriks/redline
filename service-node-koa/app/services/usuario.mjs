import { knex } from "../config/db/index.mjs";
import { decrypt, encrypt } from "../config/security/index.mjs";

export const novoUsuario = async ({ nome, email, senha }) =>
	knex("usuario").insert({ nome, email, senha: encrypt(senha) }, ["id"]);

export const delUsuario = async (id = -1) =>
	knex("usuario").del().where({ id });

export const getAdmin = async () =>
	knex("usuario").where({ email: "adm@meudinheiro.cc" }).first();

export const login = async ({ email, senha }) => {
	const user = await knex("usuario").where({ email }).first();
	if (!user || decrypt(user.senha) !== senha) return null;
	return user;
};
