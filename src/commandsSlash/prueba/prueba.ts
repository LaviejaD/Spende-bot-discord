//import { SlashCommandBuilder } from "@discordjs/builders";
//import { Interaction, Client } from "discord.js";

import { Interaction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';


function data() {

	return new SlashCommandBuilder()
		.setName('prueba')
		.setDescription('Prueba xd')
		.setDefaultPermission(true)
}


function execute(interaction: Interaction): void {
	console.log(interaction)

}

module.exports = {
	name: 'prueba',
	data: data(),
	execute: execute
} 