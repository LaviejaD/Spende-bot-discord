import { interfaceCommands } from "./commandsinter"

const command: interfaceCommands = {
	name: 'claim',
	alise: ' ',
	devperms: false,
	execute: (message): void => {
		message.reply('hola')
	}
}

export = command