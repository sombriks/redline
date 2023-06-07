import chai from "chai"
import chaiHttp from "chai-http"

import {app} from "../main.mjs"

chai.should();
chai.use(chaiHttp);

// XXX movido para cá por um bug mocha
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
})
