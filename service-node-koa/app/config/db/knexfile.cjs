/**
 * @type { import('knex').Knex.Config }
 */
const _cfg = {
	client: "sqlite3",
	useNullAsDefault: true,
	connection: {
		filename: `${__dirname}/../../../redline.sqlite3`,
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		directory: `${__dirname}/migrations`,
		loadExtensions: [".mjs"],
	},
};

/**
 * @type { Object.<string, import('knex').Knex.Config> }
 */
module.exports = {
	development: {
		..._cfg,
		pool: {
			..._cfg.pool,
			afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb), // does not work with postgres
		},
	},
	test: {
		..._cfg,
		connection: {
			filename: ":memory:",
		},
		pool: {
			..._cfg.pool,
			afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb), // does not work with postgres
		},
	},
	staging: {
		..._cfg,
		client: "pg",
		connection: process.env.PG_CONNECTION_URL,
	},
	production: {
		..._cfg,
		client: "pg",
		connection: process.env.PG_CONNECTION_URL,
	},
};
