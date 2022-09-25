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
		ManagerEvents(client)
	]).finally(async () => {

		await client.login(process.env['BOT_TOKEN']).then(
			() => client.channels.fetch('850852816884858910')

				.then(res =>
					//@ts-ignore
					res.send('Bot is Ready')
				)
		)

		log('Commands Ready')
		log(`Slash Commands Ready`)
		log('Events is Ready')
		log('login was complete')
	})


}