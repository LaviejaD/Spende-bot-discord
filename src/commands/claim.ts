//import { Client, Message } from "discord.js";
import { interfaceExecute, interfaceCommands } from "../utils/interface/Commands"

const execute: interfaceExecute = (message): void => {
	message.reply('hola')
}

const export_: interfaceCommands = {
	name: 'claim',
	alise: ' ',
	devperms: false,
	execute: execute
}

module.exports = export_