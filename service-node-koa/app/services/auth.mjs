import {knex} from "../config/db/index.mjs"
import {decrypt} from "../config/security/index.mjs";

export const login = async (email, pwd) => {
  const user = await knex("usuario").where({email}).first()
  if (!user || decrypt(user.senha) !== pwd) return null
  return await user
}