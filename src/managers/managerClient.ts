//module import
import { Client } from 'discord.js';
// local import
import { log } from '../utils/log';
import { ManagerEvents } from './managerEvents';
import { registerCommands } from "./managerCommands";
import { SlashRegister } from "./managerSlash";

export async function start(client: Client) {

	try {
		await SlashRegister()
		await registerCommands()
		await ManagerEvents(client)
		await client.login(process.env['BOT_TOKEN'])
		log('login was complete')
	}

	catch (erro) {
		console.log(erro)
		//	log(`Invalid token was provider on:\n ${__filename}`, 'error')
	}

}