import chai, {expect} from "chai"

import {
  listModelocategoria,
  listTipoRecorrencia,
  listTipoConta,
  listTipoMovimentacao
} from "../app/services/index.mjs"

chai.should();

describe("Base service test", () => {

  it("Should be in testing mode", done => {
    if (!process.env.NODE_ENV) return done(new Error("NODE_ENV vazio"));
    process.env.NODE_ENV.should.be.eql("test");
    done();
  })

  it("should list modelocategoria", async () => {
    const modelos = await listModelocategoria()
    modelos.should.be.a("array")
    expect(modelos.find(m => m.descricao === "SALARIO")).to.be.ok
  })

  it("should list tipo_conta", async () => {
    const tipos = await listTipoConta()
    tipos.should.be.a("array")
    expect(tipos.find(m => m.descricao === "CARTAO")).to.be.ok
  })

  it("should list tipo_movimentacao", async () => {
    const tipos = await listTipoMovimentacao()
    tipos.should.be.a("array")
    expect(tipos.find(m => m.descricao === "ENTRADA")).to.be.ok
  })

  it("should list tipo_recorrencia", async () => {
    const tipos = await listTipoRecorrencia()
    tipos.should.be.a("array")
    expect(tipos.find(m => m.descricao === "MENSAL")).to.be.ok
  })
})