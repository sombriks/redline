import chai from "chai";
import {app} from "../main.mjs";
import {getAdmin, listCategorias, resetCategorias} from "../services/index.mjs";
import chaiHttp from "chai-http";
import {sign} from "../config/security/index.mjs";

chai.should();
chai.use(chaiHttp);

describe("Categoria API tests", () => {

  let user;
  let authorization;

  before(async () => {
    user = await getAdmin();
    await resetCategorias({usuario_id: user.id});
    const {token} = sign(user)
    authorization = `Bearer ${token}`
  });

  it("should list categorias", async () => {
    try {
      const res = await chai
        .request(app.callback())
        .get(`/${user.id}/categoria`)
        .set("Authorization", authorization)
      res.should.have.status(200);
      res.body.should.be.an("array");
    } catch (e) {
      chai.expect.fail(e)
    }
  })

  it("should find categoria", async () => {
    try {
      const categorias = await listCategorias({usuario_id: user.id})
      const res = await chai
        .request(app.callback())
        .get(`/${user.id}/categoria/${categorias[0].id}`)
        .set("Authorization", authorization)
      res.should.have.status(200);
      res.body.should.be.an("object");
      res.body.usuario_id.should.be.eq(user.id);
    } catch (e) {
      chai.expect.fail(e)
    }
  })

  it("should insert categoria", async () => {
    try {
      const novaCat = {descricao: "teste", cor: "#FEA"}
      const res = await chai
        .request(app.callback())
        .post(`/${user.id}/categoria`)
        .set("Authorization", authorization)
        .send(novaCat)
      res.should.have.status(200);
      res.body.should.be.an("array");
      res.body[0].id.should.be.ok
    } catch (e) {
      chai.expect.fail(e)
    }
  })

  it("should update categoria", async () => {
    try {
      const [cat] = await listCategorias({usuario_id: user.id})
      cat.cor = "#AFE"
      cat.descricao = "categoria sob teste"
      const res = await chai
        .request(app.callback())
        .put(`/${user.id}/categoria/${cat.id}`)
        .set("Authorization", authorization)
        .send(cat)
      res.should.have.status(200);
      const affected = res.body // update/PUT only returns number of affected rows
      affected.should.be.eq(1)
      const check = await listCategorias({q: "sob teste", usuario_id: user.id})
      check.should.be.an("array")
      check[0].cor.should.be.eq("#AFE")
    } catch (e) {
      chai.expect.fail(e)
    }
  })

  it("should del categoria", async () => {

    try {
      const categorias = await listCategorias({usuario_id: user.id})
      const res = await chai
        .request(app.callback())
        .del(`/${user.id}/categoria/${categorias[0].id}`)
        .set("Authorization", authorization)
      res.should.have.status(200);
      const affected = res.body // delete only returns number of affected rows
      affected.should.be.eq(1)
    } catch (e) {
      chai.expect.fail(e)
    }
  })
})
