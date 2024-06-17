import { dbMigrate, knex } from "./db/index.mjs";

/**
 * hooks to make sure there will be a testing database available and proper
 * teardown after all tests are done https://mochajs.org/#root-hook-plugins
 */
export const mochaHooks = {
	async beforeAll() {
		await dbMigrate();
	},
	async afterAll() {
		await knex.destroy();
	},
};
