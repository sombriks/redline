import Cabin from "cabin";
import Signale from "signale/signale.js";

export const cabin = new Cabin({ logger: new Signale() });
