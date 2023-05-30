import chai, { expect } from "chai";

import {
  listCategoriasByUsuarioIdAndDescricao,
  listContasByUsuarioId,
  listMovimentacaoByUsuarioId, novaEntrada, resetCategorias, resetConta
} from "./index.mjs";
import { knex } from "../config/db/index.mjs";

chai.should();

describe("Movimentacao service test", () => {

  before(async () => {
    const { id } = await knex("usuario")
      .where({ email: "adm@meudinheiro.cc" }).first();
    await resetCategorias(id);
    await resetConta(id);
    const [conta] = await listContasByUsuarioId(id);
    const [categoria] = await listCategoriasByUsuarioIdAndDescricao({ usuario_id: id, descricao: "OUTROS" });
    // movimentações de teste
    await novaEntrada({ conta_id: conta.id, valor: 100, descricao: "teste dinheiro", categoria_id: categoria?.id });
  });

  it("Should be in testing mode", done => {
    if (!process.env.NODE_ENV) return done(new Error("NODE_ENV vazio"));
    process.env.NODE_ENV.should.be.eql("test");
    done();
  });

  it("Should list movimentacoes", async () => {
    const usuario = await knex("usuario")
      .where({ email: "adm@meudinheiro.cc" }).first();
    const movimentacoes = await listMovimentacaoByUsuarioId(usuario.id);
    movimentacoes.should.be.a("array");
    expect(movimentacoes.find(m => m.valor === 100)).to.be.ok;
  });

});