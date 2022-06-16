//module import
import { Client, Message } from 'discord.js';
import { readdirSync } from "fs";
import { join } from 'path';
// local import
import { log } from "../utils/log";
import { interfaceCommands } from "../commands/commandsinter"
import { GuildsGet } from '../database/get/guildscache'

//const for Commands 
export const Commands = new Map<string, { pathfile: string, alise }>()

/** register Commands to Map
 */
export function registerCommands() {
	return new Promise<void>((done) => {

		const propierty = { 'name': 'string', 'alise': 'string', 'devperms': 'boolean', 'execute': 'function' }

		const files = readdirSync(join(__dirname, '../commands'))

		log('Register Commands');

		files.filter((f) => f != 'commandsinter.d.ts').forEach((file) => {


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
				if (errorPropierty || errorType) error = true;

			})
			if (error) return log(`${file} not is a command`, 'warng');

			log(`Command ${file} is save`, 'loader');
			return Commands.set(Command.name, {
				pathfile: pathfile,
				alise: Command.alise
			});
		})

		done()

	})
}

export async function managerCommands(client: Client, message: Message) {

	const { prefix }: { prefix: string } = await GuildsGet(`${message.guild?.id}`);
	const args = message.content.trim().split(/ +/g);
	const cmd = args[0].slice(prefix.length).toLowerCase()
	let comando: interfaceCommands | boolean = false;
	if (!Commands.has(cmd)) Commands.forEach(
		(value) => value.alise.includes(cmd) ? comando = require(value.pathfile).execute : false)
	//@ts-ignore
	if (comando) comando(message, args, client);

}