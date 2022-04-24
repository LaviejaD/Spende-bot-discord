import { Client, Message } from "discord.js";

export type execute = (message: Message, args: string[], client: Client) => void

export interface interfaceCommands {
	name: string,
	alise: string
	devperms: boolean,
	execute: execute

}