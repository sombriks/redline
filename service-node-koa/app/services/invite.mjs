import { knex } from "../config/db/index.mjs";

export const validaInvite = async ({ email, code }) => {

  if (!email) throw { status: 401, message: "Invalid email" }
  if (!code) throw { status: 401, message: "Invalid invite code" }

  const invite = await knex("invite").where({ email, code }).first()

  if (!invite) throw { status: 401, message: "Invite code not found" }
}