import chai from "chai";
import chaiHttp from "chai-http";

import {app} from "../main.mjs";

chai.should();
chai.use(chaiHttp);

describe("Modelocategoria API test", () => {

  it("Should return modelocategoria", async () => {
    const res = await chai.request(app.callback()).get("/modelocategoria")
    res.should.have.status(200);
    res.body.should.be.an("array");
  });
});
