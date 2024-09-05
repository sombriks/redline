import {
  emailApiUrl,
  emailCreds,
  singlePayload,
} from "../config/email-config.mjs";
import {logger} from "../config/base-logging.mjs";

const log = logger.scope('services/email.mjs')

// https://developer.mozilla.org/pt-BR/docs/Web/API/Window/fetch
const sendEmail = async ({email, nome, subject, body}) => {
  log.info('sendEmail')
  // TODO send to a queue instead
  return await fetch(emailApiUrl, {
    body: JSON.stringify(singlePayload({email, name: nome, subject, body})),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${emailCreds()}`,
    },
    method: "POST",
  });
};

export const emailConfirmaCadastro = async ({email, nome, challenge}) => {
  log.info('emailConfirmaCadastro')
  const subject = "Redline - Confirmação de cadastro"
  return sendEmail(({
    nome, email, subject, body: `
			Olá ${nome}!
			
			O código de confirmação da criação de conta é: 
			
			${challenge}
			
			Informe este código no aplicativo e ative a sua conta.
		`
  }))
}
