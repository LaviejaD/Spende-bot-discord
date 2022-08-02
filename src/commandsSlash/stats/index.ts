import { CommandInteraction, MessageEmbed, Client } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import { totalmem } from "os";
function data() {
	return new SlashCommandBuilder().setName('stats').setDescription('stats of  the bot').setDefaultPermission(true);
}

async function execute(client: Client, interaction: CommandInteraction) {

	const memoria_usada = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024);
	const memoria_total = process.env.DEV ? Math.floor(totalmem() / 1024 / 1024) : 450

	const time = Math.floor(process.uptime());
	const minute = Math.floor(time / 60);
	const hour = Math.floor(minute / 60)
	const day = Math.floor(hour / 24);


	try {
		const embed = new MessageEmbed()
			.setAuthor(interaction.user.username, interaction.user.avatarURL())
			.setTitle(`${client.user.username}`)
			.setThumbnail(client.user.avatarURL({
				dynamic: true,
			}))
			.setFields([
				{
					name: ':globe_with_meridians: Servers',
					value: `${client.guilds.cache.size}`, inline: true
				},
				{
					name: `:satellite_orbital: channels`,
					value: `${client.channels.cache.size}`, inline: true
				},
				{
					name: `:hourglass: Ping `,
					value: `${client.ws.ping}ms`, inline: true
				},
				{
					name: `:busts_in_silhouette: users`,
					value: `${client.users.cache.size}`, inline: true
				},
				{
					name: ` :stopwatch: Up Time`,
					value: `Days:${day}, Hours:${hour}, Minutes:${minute}`, inline: true
				},
				{
					name: `:floppy_disk: Ram Memory usage`,
					value: `${((memoria_usada * 100) / memoria_total).toFixed(2)}% of ${memoria_total}MB`,
					inline: true
				}

			])
			.setColor('RANDOM')
			.setFooter("Bot created by: OnlyD#5221")
			.setTimestamp()
		await interaction.reply({
			embeds: [embed]
		});
	} catch (error) {
		interaction.reply(`${error}`);
	}
}
module.exports = {
	name: 'stats',
	data: data(),
	execute: execute
} 