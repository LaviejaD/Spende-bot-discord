import { Schema, model } from "mongoose";
import { configbot } from "../../../configuration/bot";

const schema = new Schema({
	guidId: { type: String, required: true },
	prefix: { type: String, default: configbot.prefix },
	antilink: {
		on: { type: Boolean, default: false },
		channel: [{ type: String }],
	},
})
export interface interfaceGuild {
	prefix: string,
	guidId: String,
}
export const Guilds = model('Guilds', schema)