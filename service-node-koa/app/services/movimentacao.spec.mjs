import chai, { expect } from "chai";

import {
  atualizaMovimentacao,
  findMovimentacao,
  getAdmin,
  listCategorias,
  listContas, listMovimentacaoByConta,
  listMovimentacaoByUsuario,
  novaEntrada,
  novaSaida,
  removeMovimentacao,
  resetCategorias,
  resetConta
} from "./index.mjs";

chai.should();

describe("Movimentacao service test", () => {

  before(async () => {
    const { id } = await getAdmin();
    await resetConta({ usuario_id: id });
    await resetCategorias({ usuario_id: id });
    const [conta] = await listContas({ usuario_id: id });
    const [categoria] = await listCategorias({ usuario_id: id, q: "OUTROS" });
    // movimentações de teste
    await novaEntrada({
      conta_id: conta.id,
      valor: 100,
      descricao: "teste dinheiro",
      categoria_id: categoria?.id
    });
    await novaSaida({
      conta_id: conta.id,
      valor: 50,
      descricao: "teste dinheiro saída",
      categoria_id: categoria?.id
    });
  });

  it("Should list movimentacoes by usuario", async () => {
    const usuario = await getAdmin();
    const movimentacoes = await listMovimentacaoByUsuario({ usuario_id: usuario.id });
    movimentacoes.should.be.an("array");
    movimentacoes.length.should.be.eql(2);
    expect(movimentacoes.find(m => m.valor == 100)).to.be.ok;
  });

  it("Should list movimentacoes by conta", async () => {
    const usuario = await getAdmin();
    const [conta] = await listContas({ usuario_id: usuario.id });
    const movimentacoes = await listMovimentacaoByConta({ conta_id: conta.id });
    movimentacoes.should.be.an("array");
    movimentacoes.length.should.be.eql(2);
    expect(movimentacoes.find(m => m.valor == 100)).to.be.ok;
  });

  it("Should save a new movimentacao", async () => {
    const usuario = await getAdmin();
    const [conta] = await listContas({ usuario_id: usuario.id });
    const result = await novaEntrada({
      conta_id: conta.id,
      valor: 200,
      descricao: "teste dinheiro 2"
    });
    expect(result).to.be.an("array");
    expect(result[0]).to.be.an("object");
    expect(result[0].id).to.be.an("number");
    const movimentacoes = await listMovimentacaoByUsuario({ usuario_id: usuario.id });
    movimentacoes.should.be.an("array");
    const movimentacao = movimentacoes.find(m => m.descricao === "teste dinheiro 2");
    expect(movimentacao).to.be.ok;
    expect(movimentacao.id).to.be.eq(result[0].id);
  });

  it("Should update movimentacao", async () => {
    const usuario = await getAdmin();
    const movimentacoes = await listMovimentacaoByUsuario({ usuario_id: usuario.id });
    const [movimentacao] = movimentacoes;
    movimentacao.descricao = "atualizada teste";
    movimentacao.valor = 350;
    await atualizaMovimentacao({ id: movimentacao.id, movimentacao });
    const result = await findMovimentacao(movimentacao.id);
    result.descricao.should.be.eq(movimentacao.descricao);
    parseInt(result.valor).should.be.eq(parseInt(movimentacao.valor));
  });

  it("Should delete movimentacao", async () => {
    const usuario = await getAdmin();
    const movimentacoes = await listMovimentacaoByUsuario({ usuario_id: usuario.id });
    await removeMovimentacao(movimentacoes[0].id);
    const result = await findMovimentacao(movimentacoes[0].id);
    expect(result).to.be.undefined;
  });
});
