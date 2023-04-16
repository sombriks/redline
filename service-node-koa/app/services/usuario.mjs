import {knex} from "../config/db/index.mjs"
import {encrypt} from "../config/security/index.mjs";

export const novoUsuario = async ({nome, email, senha}) => {
  const pwd = encrypt(senha)
  const [usuario_id] = await knex("usuario").insert({nome, email, senha: pwd})
  return usuario_id
}