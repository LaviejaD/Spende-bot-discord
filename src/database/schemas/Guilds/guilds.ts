import { Schema, model } from "mongoose";
import { prefix } from "../../../configuration/bot";

export interface interfaceGuild {
	prefix: string,
	guildId: string,
	adminroles: string[],
	antilink: {
		enabled: boolean,
		channels: string[],
	}
}


const schema = new Schema<interfaceGuild>({
	guildId: { type: String, required: true },
	prefix: { type: String, default: prefix },
	adminroles: [{ type: String, default: [] }],
	antilink: {
		enabled: { type: Boolean, default: false },
		channels: [{ type: String, default: [] }],
	},
})

export const Guilds = model('Guilds', schema)