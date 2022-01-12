

import { Interaction, Client, MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';


function data() {

	const data = new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('look avatar')
		.setDefaultPermission(true)
		.addMentionableOption(e => e.setName('mention').setDescription('mention user').setRequired(false))
		.addNumberOption((e) => e.setName('size').setDescription('size of image avatar').setRequired(false)

			.addChoice('grande', 1024)
			.addChoice('mediana', 600)
			.addChoice('pequeña', 128)
		)
	return data
}


async function execute(client: Client, interaction: Interaction): Promise<void> {
	if (!interaction.isCommand()) return;
	try {

		const mention = interaction.options.getMentionable('mention') ?? false
		const size = interaction.options.getNumber('size') ?? 1024
		const avatarOption = { dynamic: true, size: size }
		const AvatarUrl = (id, idavatar, sz) => `https://cdn.discordapp.com/avatars/${id}/${idavatar}.webp?size=${sz}`
		//@ts-ignore
		const avatar = mention ? AvatarUrl(mention.user.id, mention.user.avatar, size) : interaction.user.avatarURL(avatarOption);
		//@ts-ignore
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