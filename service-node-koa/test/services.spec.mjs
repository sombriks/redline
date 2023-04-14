import chai, {expect} from "chai"

import {knex, dbMigrate} from "../app/config/db/index.mjs";
import {listModelocategoria} from "../app/services/index.mjs"

chai.should();

describe("Base service test", () => {

  before(async () => await dbMigrate())
  after(async () => await knex.destroy())

  it("Should be in testing mode", done => {
    if (!process.env.NODE_ENV) return done(new Error("NODE_ENV vazio"));
    process.env.NODE_ENV.should.be.eql("test");
    done();
  })

  it("should list modelocategoria", async () => {
    const modelos = await listModelocategoria()
    modelos.should.be.a("array")
    expect(modelos.find(m => m.descricao == "SALARIO")).to.be.ok
  })
})