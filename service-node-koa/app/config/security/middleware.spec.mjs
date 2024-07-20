import chai from 'chai'

import * as middleware from './middleware.mjs'
import sinon from 'sinon'
import { sign } from './encryption.mjs'
import { getAdmin, resetConta } from '../../services/index.mjs'

chai.should()

describe('Middleware tests', () => {
  it('should check if it\'s admin', async () => {
    const adm = await getAdmin()
    const { token } = sign(adm)
    const authorization = `Bearer ${token}`
    const ctx = { request: { header: { authorization } }, throw: sinon.fake() }
    const next = sinon.mock()
    next.once()

    await middleware.ifAdmin(ctx, next)

    next.verify()
  })

  it('should check if it\'s authenticated', async () => {
    const adm = await getAdmin()
    const { token } = sign(adm)
    const authorization = `Bearer ${token}`
    const ctx = { params: { usuario_id: 1 }, request: { header: { authorization } }, throw: sinon.fake() }
    const next = sinon.mock()
    next.once()

    await middleware.ifAuthenticated(ctx, next)

    next.verify()
  })

  it('should check if it owns the resource', async () => {
    // given
    const adm = await getAdmin()
    const contasIds = await resetConta({ usuario_id: adm.id })
    const { token } = sign(adm)
    const authorization = `Bearer ${token}`
    const params = { usuario_id: adm.id, conta_id: contasIds[0].id }
    const ctx = {
      request: { header: { authorization }, params },
      throw: sinon.fake()
    }
    const next = sinon.mock()
    next.once()

    // when
    await middleware.contaOwnedBy(ctx, next)

    // then
    next.verify()
  })

  it('Should FAIL due missing auth header', async () => {
    // given
    const authorization = `Bearer`
    const ctx = { request: { header: { authorization } }, throw: sinon.mock() }
    const next = sinon.mock()
    next.never()
    ctx.throw.never()

    // when
    const spyable = { ifAuthenticated: middleware.ifAuthenticated }
    const spy = sinon.spy(spyable, 'ifAuthenticated')
    try {
      await spyable.ifAuthenticated(ctx, next)
    } catch (e) {
      chai.expect(spy.exceptions).length(1)
    }

    // then
    chai.expect(spy.called)
    chai.expect(spy.threw())
    ctx.throw.verify()
    next.verify()
  })
})
