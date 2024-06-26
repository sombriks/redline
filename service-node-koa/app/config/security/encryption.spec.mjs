import chai from "chai";
import { decrypt, encrypt } from "./index.mjs";

chai.should();

describe("Encryption tests", () => {
	it("Should be in testing mode", (done) => {
		if (!process.env.NODE_ENV) return done(new Error("NODE_ENV vazio"));
		process.env.NODE_ENV.should.be.eql("test");
		done();
	});

	it("Should load env file", (done) => {
		if (!process.env.ALG) return done(new Error("ALG vazio"));
		if (!process.env.SECRET) return done(new Error("SECRET vazio"));
		done();
	});

	it("Should encrypt a text", (done) => {
		const text = "my password";
		const iv = Buffer.from("known initialization vector").subarray(0, 16);
		const secret = encrypt(text, iv);
		secret.should.be.eq(
			"6b6e6f776e20696e697469616c697a61@1f0d69d2583df6dd37b5b3e2d4c8152e",
		);
		done();
	});

	it("Should decrypt a text", (done) => {
		const secret =
			"6b6e6f776e20696e697469616c697a61@1f0d69d2583df6dd37b5b3e2d4c8152e";
		const original = decrypt(secret);
		original.should.be.eq("my password");
		done();
	});
});
