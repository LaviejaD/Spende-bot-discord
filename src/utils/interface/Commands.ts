import { Client, Message } from "discord.js";

export interface interfaceExecute {
	(message: Message, args: string[], client: Client): void
}

export interface interfaceCommands {
	name: string,
	alise: string
	devperms: boolean,
	execute: interfaceExecute

}