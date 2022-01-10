import { Schema, model } from "mongoose";

const schema = new Schema({
	guidId: String,
	prefix: String
})
export interface interfaceGuild {
	prefix: string
}
export const Guilds = model('Guilds', schema)