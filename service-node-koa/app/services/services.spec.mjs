import chai, { expect } from "chai";

import {
  listModelocategoria,
  listTipoRecorrencia,
  listTipoConta,
  listTipoMovimentacao
} from "./index.mjs";

chai.should();

describe("Base service test", () => {

  it("Should list modelo categoria", async () => {
    const modelos = await listModelocategoria();
    modelos.should.be.a("array");
    expect(modelos.find(m => m.descricao === "SALARIO")).to.be.ok;
  });

  it("Should list tipo_conta", async () => {
    const tipos = await listTipoConta();
    tipos.should.be.a("array");
    expect(tipos.find(m => m.descricao === "CARTAO")).to.be.ok;
  });

  it("Should list tipo_movimentacao", async () => {
    const tipos = await listTipoMovimentacao();
    tipos.should.be.a("array");
    expect(tipos.find(m => m.descricao === "ENTRADA")).to.be.ok;
  });

  it("Should list tipo_recorrencia", async () => {
    const tipos = await listTipoRecorrencia();
    tipos.should.be.a("array");
    expect(tipos.find(m => m.descricao === "MENSAL")).to.be.ok;
  });
});
