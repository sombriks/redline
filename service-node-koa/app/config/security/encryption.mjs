import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import jwt from "jsonwebtoken";

export const encrypt = (plain, iv = randomBytes(16)) => {
	const key = createCipheriv(process.env.ALG, process.env.SECRET, iv);
	const hash = Buffer.concat([key.update(plain), key.final()]).toString("hex");
	const ivHex = iv.toString("hex");
	return ivHex + "@" + hash;
};

export const decrypt = (secret) => {
	const [ivHex, hash] = secret.split("@");
	const unKey = createDecipheriv(
		process.env.ALG,
		process.env.SECRET,
		Buffer.from(ivHex, "hex"),
	);
	return Buffer.concat([
		unKey.update(Buffer.from(hash, "hex")),
		unKey.final(),
	]).toString("utf8");
};

export const sign = (payload) => {
	// TODO what else to add to payload?
	payload.iat = new Date().getTime() / 1000;
	payload.exp = 86400 + payload.iat;
	return { token: jwt.sign(payload, process.env.SECRET) };
};

/**
 * verify jwt token from payload or the token itself
 *
 * @param {*} token
 *  either a valid jwt token or an object containing a valid token
 *
 * @returns {({email:string}|string|import("jsonwebtoken").JwtPayload)} the original signed payload
 */
export const verify = (token) => {
	return jwt.verify(token?.token || token, process.env.SECRET);
};

export const newChallenge = () => randomBytes(3).toString('hex')
