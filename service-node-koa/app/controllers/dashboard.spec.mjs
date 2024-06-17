import chai from "chai";
import chaiHttp from "chai-http";

import { sign } from "../config/security/index.mjs";
import { app } from "../main.mjs";
import { getAdmin, resetConta } from "../services/index.mjs";

chai.should();
chai.use(chaiHttp);

describe("Dashboard API tests", () => {
	let user;
	let authorization;

	before(async () => {
		user = await getAdmin();
		await resetConta({ usuario_id: user.id });
		const { token } = sign(user);
		authorization = `Bearer ${token}`;
	});

	it("Should get dashboard data", async () => {
		try {
			const res = await chai
				.request(app.callback())
				.get(`/${user.id}/dashboard?inicio=2024-06-01&fim=2024-06-30`)
				.set("Authorization", authorization);
			res.should.have.status(200);
			res.body.should.be.an("object");
		} catch (e) {
			chai.expect.fail(e);
		}
	});
});
