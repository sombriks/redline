import chai from "chai";
import chaiHttp from "chai-http";

import {
	findConta,
	getAdmin,
	listContas,
	resetConta,
} from "../services/index.mjs";
import { sign } from "../config/security/index.mjs";
import { app } from "../main.mjs";

chai.should();
chai.use(chaiHttp);

describe("Conta API tests", () => {
	let user;
	let authorization;

	before(async () => {
		user = await getAdmin();
		await resetConta({ usuario_id: user.id });
		const { token } = sign(user);
		authorization = `Bearer ${token}`;
	});

	it("Should list contas", async () => {
		try {
			const res = await chai
				.request(app.callback())
				.get(`/${user.id}/conta`)
				.set("Authorization", authorization);
			res.should.have.status(200);
			res.body.should.be.an("array");
		} catch (e) {
			chai.expect.fail(e);
		}
	});

	it("Should find conta", async () => {
		try {
			const contas = await listContas({ usuario_id: user.id });
			const res = await chai
				.request(app.callback())
				.get(`/${user.id}/conta/${contas[0].id}`)
				.set("Authorization", authorization);
			res.should.have.status(200);
			res.body.should.be.an("object");
			res.body.id.should.be.eq(contas[0].id);
		} catch (e) {
			chai.expect.fail(e);
		}
	});

	it("Should insert conta", async () => {
		try {
			const novaConta = { descricao: "teste conta", tipo_conta_id: 1 };
			const res = await chai
				.request(app.callback())
				.post(`/${user.id}/conta`)
				.set("Authorization", authorization)
				.send(novaConta);
			res.should.have.status(200);
			res.body.should.be.an("array");
			res.body[0].id.should.be.ok;
		} catch (e) {
			chai.expect.fail(e);
		}
	});

	it("Should update conta", async () => {
		try {
			const [conta] = await listContas({ usuario_id: user.id });
			conta.descricao = "conta teste update";
			const res = await chai
				.request(app.callback())
				.put(`/${user.id}/conta/${conta.id}`)
				.set("Authorization", authorization)
				.send(conta);
			res.should.have.status(200);
			const affected = res.body; // update/PUT only returns number of affected rows
			affected.should.be.eq(1);
			const check = await listContas({
				usuario_id: user.id,
				q: "conta teste update",
			});
			check.should.be.an("array");
			check[0].id.should.be.eq(conta.id);
		} catch (e) {
			chai.expect.fail(e);
		}
	});

	it("Should delete conta", async () => {
		try {
			const [conta] = await listContas({ usuario_id: user.id });
			const res = await chai
				.request(app.callback())
				.del(`/${user.id}/conta/${conta.id}`)
				.set("Authorization", authorization);
			res.should.have.status(200);
			const affected = res.body; // delete only returns number of affected rows
			affected.should.be.eq(1);
			const check = await findConta({ id: conta.id, usuario_id: user.id });
			chai.expect(check).to.be.undefined;
		} catch (e) {
			chai.expect.fail(e);
		}
	});
});
