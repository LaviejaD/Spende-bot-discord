import { Interaction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';

function data() {
	return new SlashCommandBuilder().setName(' info').setDescription('look info for bot')
}

function execute(interaction: Interaction) {

}
module.exports = {
	name: 'info',
	data: data(),
	execute: execute
} 