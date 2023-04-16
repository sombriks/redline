import chai, {expect} from "chai"
import chaiHttp from "chai-http"

import {app} from "../app/main.mjs"
import {verify} from "../app/config/security/index.mjs"

chai.should();
chai.use(chaiHttp);

describe("Base API test", () => {

  it("Should be in testing mode", done => {
    if (!process.env.NODE_ENV) return done(new Error("NODE_ENV vazio"));
    process.env.NODE_ENV.should.be.eql("test");
    done();
  })

  it("Should return status ONLINE", done => {
    chai
      .request(app.callback())
      .get('/status')
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.text.should.be.eql("ONLINE");
        done();
      });
  })

  it("Should return modelocategoria", done => {
    chai
      .request(app.callback())
      .get('/modelocategoria')
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.an("array")
        done();
      });
  })

  it("Should login", done => {
    const testUser = {email: "adm@meudinheiro.cc", senha: "e1e2e3e4"}
    chai
      .request(app.callback())
      .post("/login")
      .send(testUser)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.an("object")
        const data = verify(res.body)
        expect(data).to.be.ok
        data.email.should.be.eq(testUser.email)
        expect(data.senha).to.be.undefined
        done();
      });
  })
})