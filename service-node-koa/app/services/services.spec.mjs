import chai, {expect} from "chai"
import {knex, dbMigrate} from "../config/db/index.mjs";

import {listModelocategoria} from "./index.mjs"

chai.should();

describe("Base service test", () => {

  before(async () => await dbMigrate())
  after(async () => await knex.destroy())

  it("should list modelocategoria", async () => {
    const modelos = await listModelocategoria()
    modelos.should.be.a("array")
    expect(modelos.find(m => m.descricao == "SALARIO")).to.be.ok
  })
})