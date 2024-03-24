import { logger } from "./base-logging.mjs"
export const errHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.set('ContentType', 'application/json')
    ctx.response.body = JSON.stringify(err?.message ? {message: err.message} : err)
    if (err.status) ctx.status = err.status
    else if (['JsonWebTokenError', 'TokenExpiredError'].includes(err.name)) ctx.status = 401
    else ctx.status = 500
    logger.error(err)
  }
}
