import { Client } from 'discord.js';
import { log } from '../utils/log';

export function execute(client: Client) {

	client.once('ready', () => {

		client.user?.setActivity('Youtube', { type: 'STREAMING' })
		log('Bot is Ready')



	})
}

