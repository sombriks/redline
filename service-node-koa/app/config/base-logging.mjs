import Cabin from "cabin";
import Signale from "signale/signale.js";

export const logger = new Signale({
	config: {
		// displayFilename: true,
		displayTimestamp: true,
		displayDate: true,
	},
});
export const cabin = new Cabin({ logger });
