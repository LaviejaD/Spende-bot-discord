"strict"

//module import
import { Client } from 'discord.js';
// local import
import { log } from '../utils/log';
import { ManagerEvents } from './managerEvents';
import { registerCommands } from "./managerCommands";
import { SlashRegister } from "./managerSlash";

export function start(client: Client) {

	Promise.all([
		SlashRegister(),
		registerCommands(),
		ManagerEvents(client),

	]).finally(async () => {
		await client.login(process.env['BOT_TOKEN'])
		log('login was complete')
	})



}