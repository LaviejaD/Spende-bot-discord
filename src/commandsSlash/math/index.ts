

import { CommandInteraction, Client, MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';


function data() {

	const data = new SlashCommandBuilder()
		.setName('math')
		.setDescription('yeh')
		.setDefaultPermission(true)
		.addStringOption(e => e.setName('math').setDescription('math').setRequired(true))
	return data
}


async function execute(client: Client, interaction: CommandInteraction): Promise<void> {

	try {
		const xd = interaction.options.getString('math')

		console.log(xd)
		interaction.reply('yeh')

	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	name: 'math',
	data: data(),
	execute: execute
} 