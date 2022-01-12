import { Client } from 'discord.js';
import { ManagarSlash } from "../managers/managerSlash";
//import { log } from '../utils/log';

export function execute(client: Client) {
	client.on('interactionCreate', async (interaction) => {

		if (interaction.isCommand()) {
			
			return ManagarSlash(interaction.commandName, interaction, client)
}
	})
}