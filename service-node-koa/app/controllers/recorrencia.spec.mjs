import chai from 'chai'
import chaiHttp from 'chai-http'

import {app} from '../main.mjs'
import {
  findRecorrencia,
  getAdmin,
  insertRecorrencia,
  listContas,
  listMovimentacaoByConta,
  resetConta
} from "../services/index.mjs";
import {sign} from "../config/security/index.mjs";
import {endOfYear, startOfYear} from "date-fns";

chai.should();
chai.use(chaiHttp);

describe("Recorrencia API requests", () => {

  let user;
  let authorization;
  let conta;

  before(async () => {
    user = await getAdmin()
    await resetConta({usuario_id: user.id})
    const {token} = sign(user)
    authorization = `Bearer ${token}`
    conta = (await listContas({usuario_id: user.id}))[0]
  })

  it("Should list recorrencias", async () => {
    try {
      const res = await chai
        .request(app.callback())
        .get(`/${user.id}/recorrencia`)
        .set("Authorization", authorization)
      res.should.have.status(200);
      res.body.should.be.an("array");
    } catch (e) {
      chai.expect.fail(e)
    }
  })

  it("Should insert recorrencia", async () => {
    const novaRecorrencia = {tipo_recorrencia_id: 1, conta_id: conta.id, descricao: "nova", valorParcela: 100.50}
    const res = await chai
      .request(app.callback())
      .post(`/${user.id}/recorrencia`)
      .send(novaRecorrencia)
      .set("Authorization", authorization)
    res.should.have.status(200);
    res.body.should.be.an("array"); // [{id:1}]
  })

  it("Should find recorrencia", async () => {
    const [{id}] = await insertRecorrencia({
      recorrencia: {tipo_recorrencia_id: 1, conta_id: conta.id, descricao: "nova", valorParcela: 100.50}
    })
    const res = await chai
      .request(app.callback())
      .get(`/${user.id}/recorrencia/${id}`)
      .set("Authorization", authorization)
    res.should.have.status(200);
    res.body.should.be.an("object");
    res.body.id.should.be.eq(id)
  })

  it("Should update recorrencia", async () => {
    const [{id}] = await insertRecorrencia({
      recorrencia: {tipo_recorrencia_id: 1, conta_id: conta.id, descricao: "nova", valorParcela: 100.50}
    })
    const res = await chai
      .request(app.callback())
      .put(`/${user.id}/recorrencia/${id}`)
      .set("Authorization", authorization)
      .send({descricao: "atualizada"})
    res.should.have.status(200)
    res.body.should.be.ok
    const recorrencia = await findRecorrencia({id})
    recorrencia.descricao.should.be.eq("atualizada")
  })

  it("should delete recorrencia", async () => {
    const [{id}] = await insertRecorrencia({
      recorrencia: {tipo_recorrencia_id: 1, conta_id: conta.id, descricao: "nova", valorParcela: 100.50}
    })
    const res = await chai
      .request(app.callback())
      .del(`/${user.id}/recorrencia/${id}`)
      .set("Authorization", authorization)
    res.should.have.status(200)
    res.body.should.be.ok
    const recorrencia = await findRecorrencia({id})
    chai.expect(recorrencia).to.be.undefined
  })

  it("should check generated parcels", async () => {
    const [{id}] = await insertRecorrencia({
      recorrencia: {
        tipo_recorrencia_id: 1,
        conta_id: conta.id,
        descricao: "ver parcelas",
        valorParcela: 100.50,
        inicial: startOfYear(new Date()),
        final: endOfYear(new Date())
      }
    })

    const res = await chai
      .request(app.callback())
      .get(`/${user.id}/recorrencia/${id}/lancamentos`)
      .set("Authorization", authorization)
    res.should.have.status(200)
    res.body.should.be.ok

    const parcelas = await listMovimentacaoByConta({conta_id: conta.id})
    parcelas.should.be.ok
    parcelas.should.be.an('array')
    parcelas.length.should.be.eq(12)
  })
})
