import {knex} from "../config/db/index.mjs";

export const validaInvite = async ({email, code}) => {
  if (!email) throw {status: 401, message: "Email inválido"};
  if (!code) throw {status: 401, message: "Código de convite inválido"};

  const invite = await knex("invite").where({email, code}).first();
  if (!invite) throw {status: 401, message: "Convite não encontrado"};

  const exists = await knex("usuario").where({email}).first();
  if (exists) throw {status: 422, message: "Usuario já existe"};
};
