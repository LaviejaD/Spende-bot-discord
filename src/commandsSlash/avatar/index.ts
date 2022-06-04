

import { CommandInteraction, Client, MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';


function data() {

	const data = new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('look avatar')
		.setDefaultPermission(true)
		.addMentionableOption(e => e.setName('mention').setDescription('mention user').setRequired(false))

	return data
}


async function execute(client: Client, interaction: CommandInteraction): Promise<void> {

	try {

		const mention = interaction.options.getMentionable('mention');


		const AvatarUrl = (id, idavatar) => `https://cdn.discordapp.com/avatars/${id}/${idavatar}.webp`;
		const avatarOption = { dynamic: true }
		//@ts-ignore
		const avatar = mention ? AvatarUrl(mention.user.id, mention.user.avatar) : interaction.user.avatarURL(avatarOption);
		const AvatarEmbed = new MessageEmbed()
			.setImage(avatar)
			.setColor('RANDOM')
			//@ts-ignore
			.setTitle(mention ? `Avatar: ${mention.user.username}` : `Avatar: ${interaction.user.username}`)
			.setURL(avatar)


		await interaction.reply({
			embeds: [AvatarEmbed]
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	name: 'avatar',
	data: data(),
	execute: execute
} 