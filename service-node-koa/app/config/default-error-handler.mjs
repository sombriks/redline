export const errHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.set('ContentType', 'application/json')
    ctx.response.body = JSON.stringify(err)
    if (err.status) ctx.status = err.status
    else if (err.name === 'JsonWebTokenError') ctx.status = 401
    else ctx.status = 500
    ctx.log.error(err.message)
  }
}
