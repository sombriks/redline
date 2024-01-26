import chai from "chai";
import chaiHttp from "chai-http";

import {app} from "./main.mjs";

chai.should();
chai.use(chaiHttp);

describe("Base API test", () => {

  it("Should return status ONLINE", async () => {
    const res = await chai.request(app.callback()).get("/status")
    res.should.have.status(200);
    res.text.should.be.eql("ONLINE");
  });

  it("Should answer with 404", async () => {
    const res = await chai.request(app.callback()).get("/crap")
    res.should.have.status(404);
  })
});
