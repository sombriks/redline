import chai from "chai";
import chaiHttp from "chai-http";

import { app } from "../main.mjs";
import {
	getAdmin,
	listCategorias,
	listContas,
	resetCategorias,
	resetConta,
} from "../services/index.mjs";
import { sign } from "../config/security/index.mjs";

chai.should();
chai.use(chaiHttp);

describe("Planejamento API tests", () => {
	let user;
	let authorization;
	let conta;
	let categoria;

	before(async () => {
		user = await getAdmin();
		await resetConta({ usuario_id: user.id });
		await resetCategorias({ usuario_id: user.id });
		const { token } = sign(user);
		authorization = `Bearer ${token}`;
		conta = (await listContas({ usuario_id: user.id }))[0];
		categoria = (await listCategorias({ usuario_id: user.id }))[0];
	});

	it("should list planejamentos", async () => {
		try {
			const res = await chai
				.request(app.callback())
				.get(`/${user.id}/planejamento`)
				.set("Authorization", authorization);
			res.should.have.status(200);
			res.body.should.be.an("array");
		} catch (e) {
			chai.expect.fail(e);
		}
	});

	it("should insert planejamentos", async () => {
		try {
			const novoPlanejamento = {
				descricao: "Test planejamento",
				categoria_id: categoria.id,
				inicial: "2024-01-01",
				final: "2024-12-31",
				limite: 3000,
			};
			const res = await chai
				.request(app.callback())
				.post(`/${user.id}/planejamento`)
				.set("Authorization", authorization)
				.send(novoPlanejamento);
			res.should.have.status(200);
			res.body.should.be.an("array"); // array of inserted ids
		} catch (e) {
			chai.expect.fail(e);
		}
	});

	it("should update planejamento", async () => {
		try {
			const novoPlanejamento = {
				descricao: "Test planejamento",
				categoria_id: categoria.id,
				inicial: "2024-01-01",
				final: "2024-12-31",
				limite: 3000,
			};
			const res = await chai
				.request(app.callback())
				.post(`/${user.id}/planejamento`)
				.set("Authorization", authorization)
				.send(novoPlanejamento);
			res.should.have.status(200);
			res.body.should.be.an("array"); // array of inserted ids

			const check = await chai
				.request(app.callback())
				.put(`/${user.id}/planejamento/${res.body[0].id}`)
				.set("Authorization", authorization)
				.send({ ...novoPlanejamento, descricao: "Test update planejamento" });
			check.should.have.status(200);
			check.body.should.be.ok;
		} catch (e) {
			chai.expect.fail(e);
		}
	});

	it("should remove planejamento", async () => {
		try {
			const res = await chai
				.request(app.callback())
				.del(`/${user.id}/planejamento/1`)
				.set("Authorization", authorization);
			res.should.have.status(200);
			res.body.should.be.ok;
		} catch (e) {
			chai.expect.fail(e);
		}
	});
});
