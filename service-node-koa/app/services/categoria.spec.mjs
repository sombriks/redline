import chai, { expect } from "chai";
import { getAdmin } from "./usuario.mjs";
import { listContas, resetConta } from "./conta.mjs";
import {
	delCategoria,
	findCategoria,
	insertCategoria,
	listCategorias,
	resetCategorias,
	updateCategoria,
} from "./categoria.mjs";

chai.should();

describe("Categoria service tests", () => {
	before(async () => {
		const { id } = await getAdmin();
		await resetCategorias({ usuario_id: id });
	});

	it("Should list categorias", async () => {
		const { id } = await getAdmin();
		const result = await listCategorias({ usuario_id: id });
		expect(result).to.be.an("array");
	});

	it("Should find categorias", async () => {
		const { id } = await getAdmin();
		const [categoria] = await listCategorias({ usuario_id: id });
		const result = await findCategoria({ id: categoria.id, usuario_id: id });
		expect(result).to.be.ok;
		expect(result.descricao).to.be.eq(categoria.descricao);
	});

	it("Should create new categoria", async () => {
		const { id } = await getAdmin();
		const novaCategoria = {
			descricao: "Uma nova categoria",
			usuario_id: id,
		};
		const result = await insertCategoria(novaCategoria);
		expect(result).to.be.ok;
	});

	it("Should update categoria", async () => {
		const { id } = await getAdmin();
		const [categoria] = await listCategorias({ usuario_id: id });
		categoria.descricao = "atualizada descrição";
		await updateCategoria({ id: categoria.id, categoria });
		const result = await findCategoria({ id: categoria.id, usuario_id: id });
		expect(result).to.be.ok;
		result.descricao.should.be.eq(categoria.descricao);
	});

	it("Should remove categoria", async () => {
		const { id } = await getAdmin();
		const [categoria] = await listCategorias({ usuario_id: id });
		const result = await delCategoria({ id: categoria.id, usuario_id: id });
	});
});
