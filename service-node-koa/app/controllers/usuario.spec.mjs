import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import { app } from "../main.mjs";
import { verify } from "../config/security/index.mjs";

chai.should();
chai.use(chaiHttp);

describe("User API test", () => {

  it("Should login", done => {
    const testUser = { email: "adm@meudinheiro.cc", senha: "e1e2e3e4" };
    chai
      .request(app.callback())
      .post("/login")
      .send(testUser)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.an("object");
        const data = verify(res.body);
        expect(data).to.be.ok;
        data.email.should.be.eq(testUser.email);
        expect(data.senha).to.be.undefined;
        done();
      });
  });
});