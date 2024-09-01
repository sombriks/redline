import {
	emailApiUrl,
	emailCreds,
	singlePayload,
} from "../config/email-config.mjs";

// https://developer.mozilla.org/pt-BR/docs/Web/API/Window/fetch
const sendEmail = async ({ email, name, subject, body }) => {
	return await fetch(emailApiUrl, {
		body: JSON.stringify(singlePayload({ email, name, subject, body })),
		headers: {
			"Content-Type": "application/json",
			Authorization: emailCreds(),
		},
		method: "POST",
	});
};
