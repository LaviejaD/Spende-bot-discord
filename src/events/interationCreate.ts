import { Client, Interaction } from 'discord.js';

//import { log } from '../utils/log';

export function execute(client: Client) {
	client.on('interactionCreate', async (interaction: Interaction) => {
		try {

			if (interaction.isCommand()) {
				await interaction.reply({ content: 'hola mundo' })
			}
		
		}
		catch (error) {

		}

	})
}