import chai, { expect } from "chai";

chai.should();

import { getAdmin } from "./usuario.mjs";
import { resetConta, listContas, insertConta, findConta, updateConta, delConta } from "./conta.mjs";

describe("Conta service tests", () => {

  before(async () => {
    const { id } = await getAdmin();
    await resetConta(id);
  });

  it("Should list contas", async () => {
    const { id } = await getAdmin();
    const contas = await listContas({ usuario_id: id });
    expect(contas).to.be.an("array");
  });

  it("Should insert contas", async () => {
    const { id } = await getAdmin();
    const novaConta = {
      usuario_id: id,
      descricao: "Nova conta",
      tipo_conta_id: 3 // CARTAO
    };
    const result = await insertConta(novaConta);
    const contas = await listContas({ usuario_id: id });
    expect(contas).to.be.an("array");
    contas.find(c => parseInt(c.tipo_conta_id) === 3).should.be.ok;
  });

  it("Should find contas", async () => {
    const { id } = await getAdmin();
    const [conta] = await listContas({ usuario_id: id });
    const result = await findConta({ id: conta.id, usuario_id: id });
    expect(result).to.be.ok;
    result.id.should.be.eq(conta.id);
  });

  it("Should update conta", async () => {
    const { id } = await getAdmin();
    const contas = await listContas({ usuario_id: id });
    expect(contas).to.be.an("array");
    expect(contas.length > 0).to.be.ok;
    const [conta] = contas;
    conta.descricao = "minha conta atualizada";
    const result = await updateConta({ id: conta.id, conta });
    expect(result).to.be.ok;
    const updated = await findConta({ id: conta.id, usuario_id: id });
    conta.descricao.should.be.eq(updated.descricao);
  });

  it("Should delete conta", async () => {
    const { id } = await getAdmin();
    const contas = await listContas({ usuario_id: id });
    expect(contas).to.be.an("array");
    expect(contas.length > 0).to.be.ok;
    const [conta] = contas;
    const result = await delConta(conta.id);
    expect(result).to.be.ok;
    const none = await findConta({ id: conta.id, usuario_id: id });
    expect(none).to.be.undefined;
  });
});
