import chai, {expect} from "chai"
import chaiHttp from "chai-http"

import {app} from "../main.mjs"
import {verify} from "../config/security/index.mjs"

chai.should();
chai.use(chaiHttp);

describe("Modelocategoria API test", () => {

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
})
