import chai, { expect } from "chai";
import { login } from "./usuario.mjs";

chai.should();


describe("Base user tests", () => {

  it("should find usuario", async () => {
    const result = await login({ email: "adm@meudinheiro.cc", senha: "e1e2e3e4" });
    result.should.be.ok
    expect(result.id).to.be.ok
  });

  it("should NOT find usuario wrong password", async () => {
    const result = await login({ email: "adm@meudinheiro.cc", senha: "" });
    expect(result).to.not.be.ok
  });

  it("should NOT find usuario wrong email", async () => {
    const result = await login({ email: "adm-err@meudinheiro.cc", senha: "" });
    expect(result).to.not.be.ok
  });
});
