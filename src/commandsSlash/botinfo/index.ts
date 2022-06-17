import { CommandInteraction, MessageEmbed, Client } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';

function data() {
	return new SlashCommandBuilder().setName('bot').setDescription('bot config').setDefaultPermission(true);
}

async function execute(client: Client, interaction: CommandInteraction) {
	try {
		const embed = new MessageEmbed()
			.setAuthor(interaction.user.username, interaction.user.avatarURL())
			.setTitle(`${client.user.username}`)
			.setThumbnail(`${client.user.avatarURL()}`)
			.setFields([
				{ name: ':globe_with_meridians: Server', value: `${client.guilds.cache.size}`, inline: true },
				{ name: `:busts_in_silhouette: channels`, value: `${client.channels.cache.size}`, inline: true },
				{ name: `:hourglass: Ping`, value: `${client.ws.ping}ms`, inline: true },
				{ name: `Joined at`, value: `${client.user.createdAt}` }

			])
			.setColor('RANDOM')
			.setFooter("Bot created by: OnlyD#5221")
			.setTimestamp()
		await interaction.reply({
			embeds: [embed]

		});
	} catch (error) {

		console.log(error)

	}
}
module.exports = {
	name: 'bot_stats',
	data: data(),
	execute: execute
} 