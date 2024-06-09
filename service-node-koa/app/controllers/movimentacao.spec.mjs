import chai from "chai";
import chaiHttp from "chai-http";

import {app} from "../main.mjs";
import {
  findMovimentacao,
  getAdmin,
  insertMovimentacao, listCategorias,
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
  let conta;
  let categoria;

  before(async () => {
    user = await getAdmin()
    await resetConta({usuario_id: user.id})
    await resetCategorias({usuario_id: user.id});
    const {token} = sign(user)
    authorization = `Bearer ${token}`
    conta = (await listContas({usuario_id: user.id}))[0]
    categoria = (await listCategorias({usuario_id:user.id}))[0]
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
      const novaMovimentacao = {
        tipo_movimentacao_id: 1,
        descricao: "Teste movimentação",
        categoria_id: categoria.id,
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
      const novaMovimentacao = {
        tipo_movimentacao_id: 1,
        descricao: "Test movimentação",
        categoria_id: categoria.id,
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
      const novaMovimentacao = {
        tipo_movimentacao_id: 1,
        descricao: "Test movimentação",
        categoria_id: categoria.id,
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
      const novaMovimentacao = {
        tipo_movimentacao_id: 1,
        descricao: "Test movimentação",
        categoria_id: categoria.id,
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

  it("Should upload", async () => {
    try {
      const data = [
        "tipo,conta,categoria,vencimento,efetivada,valor,descrição",
        "entrada,carteira,salário,2024-01-06,2024-01-08,5120.22,salário de janeiro",
        "saída,conta banco,casa,2024-01-06,2024-01-22,-101.42,conta de energia elétrica",
        "saída,conta banco,casa,INVALID,2024-01-22,INVALID,INVALID",
        "saída,cartão 1,lazer,2024-01-16,2024-02-15,70.22,cinema"
      ]
      const file = data.join("\n")
      const res = await chai
        .request(app.callback())
        .post(`/${user.id}/movimentacao/upload`)
        .set("Authorization", authorization)
        .send({file})
      res.should.have.status(200);
      res.body.message.should.be.eq("processed")
      res.body.result.imported.should.be.eq(3)
    } catch (e) {
      chai.expect.fail(e)
    }
  });

  it("Should download", async () => {
    try {
      const novaMovimentacao = {
        tipo_movimentacao_id: 1,
        descricao: "Test movimentação",
        conta_id: conta.id,
        categoria_id: categoria.id,
        valor: 100,
        vencimento: "2024-02-04",
        efetivada: "2024-02-04",
      }
      await insertMovimentacao(novaMovimentacao)

      let uri = `/${user.id}/movimentacao/download?conta_id=${conta.id}`
      uri += "&data_inicio=2024-01-01&data_fim=2024-12-31"
      const res = await chai
        .request(app.callback())
        .get(uri)
        .set("Authorization", authorization)
      res.should.have.status(200);
      res.body.csv.should.be.ok
    } catch (e) {
      chai.expect.fail(e)
    }
  });

});
