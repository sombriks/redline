/**
 * email endpoint
 */
export const emailApiUrl =
	process.env.EMAIL_API_URL || "https://api.mailjet.com/v3.1/send";

/**
 * email credentials encoded in base64 for basic authentication
 *
 * @returns {string}
 */
export const emailCreds = () =>
	Buffer.from(
		process.env.EMAIL_API_USERNAME + ":" + process.env.EMAIL_API_PASSWORD,
	).toString("base64");

/**
 * payload for one single email
 *
 * https://dev.mailjet.com/email/guides/send-api-v31/
 */
export const singlePayload = ({ email, name, subject, body }) => ({
	Messages: [
		{
			From: {
				Email: "noreply@sombriks.com.br",
				Name: `Redline`,
			},
			To: [
				{
					Email: email,
					Name: name,
				},
			],
			Subject: subject,
			TextPart: body,
		},
	],
});
