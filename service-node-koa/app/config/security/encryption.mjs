import {createCipheriv, createDecipheriv, randomBytes} from "crypto";
import jwt from "jsonwebtoken";

export const encrypt = (plain, iv = randomBytes(16)) => {
  const key = createCipheriv(
    process.env.ALG,
    process.env.SECRET,
    iv)
  const hash = Buffer
    .concat([key.update(plain), key.final()])
    .toString("hex")
  const ivHex = iv.toString("hex")
  return ivHex + "@" + hash
}
export const decrypt = (secret) => {
  const [ivHex, hash] = secret.split("@")
  const unKey = createDecipheriv(
    process.env.ALG,
    process.env.SECRET,
    Buffer.from(ivHex, "hex"))
  return Buffer
    .concat([unKey.update(Buffer.from(hash, "hex")), unKey.final()])
    .toString("utf8")
}

export const sign = payload => {
  // TODO what else to add to payload?
  return {token: jwt.sign(payload, process.env.SECRET)}
}

export const verify = token => {
  jwt.verify(token?.token || token)
}
