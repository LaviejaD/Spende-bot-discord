import { CommandInteraction, Client } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

function data() { return new SlashCommandBuilder().setName('roll').setDescription('returns a value between the range of 2 numbers').addNumberOption((opt) => opt.setName('max').setDescription('max value of number')); }

function execute(_client: Client, interaction: CommandInteraction) {
	const maxvalue = (interaction.options.getNumber('max') ?? 2) + 1;

	interaction.reply({
		content: `${Math.floor(Math.random() * (maxvalue - 1) + 1)}	`
	})
}

module.exports = {
	name: 'roll',
	data: data(),
	execute: execute
}