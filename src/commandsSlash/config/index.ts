import { CommandInteraction, Client } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import { Guilds } from "../../database/schemas/Guilds/guilds";
function data() {
	return new SlashCommandBuilder()
		.setName('config')
		.setDescription('configurate the bot')
		.addSubcommand((sub) =>
			sub.setName('anti-link').setDescription('anti link config ').addBooleanOption(
				(e) => e.setName('enable').setDescription('enable anti link')
			)
				.addChannelOption(sub =>
					sub.setName('white-list-add').setDescription('add channel to white list')
				).addChannelOption(sub =>
					sub.setName('white-list-delete').setDescription('remove channels from anti-link white-list')
				)
		)


}

async function execute(client: Client, interaction: CommandInteraction) {

	try {

		const guild = await Guilds.findOne({ guildId: interaction.guild.id });
		let change = false;
		const updateobject = {
			guildId: interaction.guild.id,
			prefix: guild.prefix,
			antilink: {
				enabled: guild.antilink.enabled,
				channels: [...guild.antilink.channels]
			}
		}
		console.log(guild)

		const white_list_delete = interaction.options.get('white-list-delete');
		const white_list_add = interaction.options.get('white-list-add');

		if (white_list_delete) {
			change = true;
			updateobject.antilink.channels = updateobject.antilink.channels
				.filter(channel => channel != white_list_delete.channel.id);
		}

		if (white_list_add) {
			change = true;
			updateobject.antilink.channels.push(white_list_add.channel.id);

		}


		if (change) {
			guild.overwrite(updateobject)
			await guild.save()
			interaction.reply({
				content: 'Saveing config...'
			})
		}
		interaction.reply({
			content: 'Ok'
		})

	} catch (error) {
		console.log(error)
	}
}
module.exports = {
	name: 'config',
	data: data(),
	execute: execute
} 