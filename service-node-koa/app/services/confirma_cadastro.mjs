import {knex} from "../config/db/index.mjs";
import {logger} from "../config/base-logging.mjs";
import {encrypt, newChallenge} from "../config/security/index.mjs";
import {differenceInMinutes} from "date-fns";

const log = logger.scope('services/confirma_cadastro.mjs')

export const validaConfirmaCadastro = async ({email}) => {
  log.info('validaConfirmaCadastro')
  const exists = await knex("usuario").where({email}).first();
  if (exists) throw {status: 422, message: "Usuario já existe"};
}

export const novoConfirmaCadastro = async ({nome, email, senha}) => {
  log.info('novoConfirmaCadastro')
  const challenge = newChallenge()
  senha = encrypt(senha)
  return knex("confirma_cadastro").insert({nome, email, senha, challenge}).returning("*")
}

export const marcarEnvioConfirmaCadastro = async ({email, challenge}) => {
  log.info('marcarEnvioConfirmaCadastro')
  return knex("confirma_cadastro").update({enviado: true, alteracao: new Date()}).where({email, challenge});
}

export const marcarConsumoConfirmaCadastro = async ({email, challenge}) => {
  log.info('marcarConsumoConfirmaCadastro')
  const confirmaCadastro = await knex("confirma_cadastro").where({email, challenge}).first();
  if (!confirmaCadastro) throw {code: 422, message: 'Código ou email incorretos'}
  if (confirmaCadastro.consumido) throw {code: 422, message: 'Código já foi utilizado'}
  if (differenceInMinutes(new Date(), confirmaCadastro.criado) > 5) throw {code: 422, message: 'Código expirado'}
  await knex("confirma_cadastro").update({consumido: true}).where({email, challenge});
  return confirmaCadastro
}
