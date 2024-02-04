import chai from "chai";
import chaiHttp from "chai-http";

import {app} from "../main.mjs";
import {
  findMovimentacao,
  getAdmin,
  insertMovimentacao,
  listContas,
  resetCategorias,
  resetConta
} from "../services/index.mjs";
import {sign} from "../config/security/index.mjs";

chai.should();
chai.use(chaiHttp);

describe("Movimentacao API test", () => {

  let user;
  let authorization;

  before(async () => {
    user = await getAdmin()
    await resetConta({usuario_id: user.id})
    await resetCategorias({usuario_id: user.id});
    const {token} = sign(user)
    authorization = `Bearer ${token}`
  })

  it("Should list movimentações by usuario", async () => {
    try {
      const res = await chai
        .request(app.callback())
        .get(`/${user.id}/movimentacao`)
        .set("Authorization", authorization)
      res.should.have.status(200);
      res.body.should.be.an("array");
    } catch (e) {
      chai.expect.fail(e)
    }
  });

  it("Should list movimentações by conta", async () => {
    try {
      const [conta] = await listContas({usuario_id: user.id})
      const res = await chai
        .request(app.callback())
        .get(`/${user.id}/movimentacao?conta_id=${conta.id}`)
        .set("Authorization", authorization)
      res.should.have.status(200);
      res.body.should.be.an("array");
    } catch (e) {
      chai.expect.fail(e)
    }
  });

  it("Should list movimentações by period", async () => {
    try {
      const res = await chai
        .request(app.callback())
        .get(`/${user.id}/movimentacao?dataInicio=2023-01-01&dataFim=2023-12-31`)
        .set("Authorization", authorization)
      res.should.have.status(200);
      res.body.should.be.an("array");
    } catch (e) {
      chai.expect.fail(e)
    }
  });

  it("Should insert movimentação", async () => {
    try {
      const [conta] = await listContas({usuario_id: user.id})
      const novaMovimentacao = {
        tipo_movimentacao_id: 1,
        descricao: "Teste movimentação",
        conta_id: conta.id,
        valor: 100,
        vencimento: "2024-02-04",
        efetivada: "2024-02-04",
      }

      const res = await chai
        .request(app.callback())
        .post(`/${user.id}/movimentacao/${conta.id}`)
        .set("Authorization", authorization)
        .send(novaMovimentacao)
      res.should.have.status(200);
      res.body.should.be.an("array");
    } catch (e) {
      chai.expect.fail(e)
    }
  })

  it("Should find movimentação", async () => {
    try {
      const [conta] = await listContas({usuario_id: user.id})
      const novaMovimentacao = {
        tipo_movimentacao_id: 1,
        descricao: "Test movimentação",
        conta_id: conta.id,
        valor: 100,
        vencimento: "2024-02-04",
        efetivada: "2024-02-04",
      }
      const [{id}] = await insertMovimentacao(novaMovimentacao)

      const res = await chai
        .request(app.callback())
        .get(`/${user.id}/movimentacao/${conta.id}/${id}`)
        .set("Authorization", authorization)
      res.should.have.status(200);
      res.body.should.be.an("object");
      res.body.conta_id.should.be.eq(conta.id)
    } catch (e) {
      chai.expect.fail(e)
    }
  });

  it("Should update movimentação", async () => {
    try {
      const [conta] = await listContas({usuario_id: user.id})
      const novaMovimentacao = {
        tipo_movimentacao_id: 1,
        descricao: "Test movimentação",
        conta_id: conta.id,
        valor: 100,
        vencimento: "2024-02-04",
        efetivada: "2024-02-04",
      }
      const [{id}] = await insertMovimentacao(novaMovimentacao)

      const res = await chai
        .request(app.callback())
        .put(`/${user.id}/movimentacao/${conta.id}/${id}`)
        .set("Authorization", authorization)
        .send({...novaMovimentacao, descricao: "update test"})
      res.should.have.status(200);
      res.body.should.be.ok

      const check = await chai
        .request(app.callback())
        .get(`/${user.id}/movimentacao/${conta.id}/${id}`)
        .set("Authorization", authorization)
      check.body.descricao.should.not.be.eq(novaMovimentacao.descricao)
    } catch (e) {
      chai.expect.fail(e)
    }
  });

  it("Should remove movimentação", async () => {
    try {
      const [conta] = await listContas({usuario_id: user.id})
      const novaMovimentacao = {
        tipo_movimentacao_id: 1,
        descricao: "Test movimentação",
        conta_id: conta.id,
        valor: 100,
        vencimento: "2024-02-04",
        efetivada: "2024-02-04",
      }
      const [{id}] = await insertMovimentacao(novaMovimentacao)

      const res = await chai
        .request(app.callback())
        .del(`/${user.id}/movimentacao/${conta.id}/${id}`)
        .set("Authorization", authorization)
      res.should.have.status(200);
      res.body.should.be.ok

      const check = await findMovimentacao(id)
      chai.expect(check).to.be.undefined
    } catch (e) {
      chai.expect.fail(e)
    }
  });
});
