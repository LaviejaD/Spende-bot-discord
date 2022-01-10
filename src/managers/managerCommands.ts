//module import
import { Client, Message } from 'discord.js';
import { readdirSync } from "fs";
import { join, } from 'path';
// local import
import { log } from "../utils/log";
import { interfaceCommands } from "../utils/interface/Commands"
import { GuildsGet } from '../mongodb/cache/Guilds/guildscache'

//const for Commands 
export const Commands = new Map<string, interfaceCommands>()

/** register Commands to Map
 */
export function registerCommands() {
	return new Promise<void>((resolve) => {

		const propierty: any = { 'name': 'string', 'alise': 'string', 'devperms': 'boolean', 'execute': 'function' }

		const files = readdirSync(join(__dirname, '../commands'))

		log('Register Commands');

		files.forEach((file) => {
			const pathfile = join(__dirname, `../commands/${(file.split('.'))[0]}`)
			let Command = require(pathfile);
			let error = false

			Object.entries(propierty).forEach(([A, B]) => {
				let errorPropierty = false;
				let errorType = false;

				Command[A] === undefined ? errorPropierty = true : false;
				!(typeof Command[A] === B) ? errorType = true : false;

				if (errorPropierty) log(` faltante ${A} en ${file}`, 'error-loader');
				if (errorType) log(`Property "${A}" is not the correct type must be "${B}" in ${file}`, 'error-loader');
				if (errorPropierty || errorType) return error = true;

			})
			if (!error) { log(`Command ${file} is save`, 'loader'); Commands.set(Command.name, Command); return }

			return log(`${file} not is a command`, 'warng');

		})
		log('Commands Ready')
		resolve()
	})
}

export async function managerCommands(client: Client, message: Message) {

	const { prefix }: { prefix: string } = await GuildsGet(`${message.guild?.id}`);
	const args = message.content.trim().split(/ +/g);
	const cmd = args[0].slice(prefix.length).toLowerCase()

	const command = Commands.has(cmd) ? Commands.get(cmd) :
		Commands.forEach((cmd_: interfaceCommands) => { if (cmd_.alise.includes(cmd)) { return cmd_ } })

	if (command) return command.execute(message, args, client);

}