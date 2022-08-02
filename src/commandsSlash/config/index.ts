import { CommandInteraction, Client } from "discord.js";
import data from "./data";
import { Guilds } from "../../database/schemas/Guilds/guilds";
import adminrole from "./Admin-role";
import antilink from "./Anti-links";


async function execute(_client: Client, interaction: CommandInteraction) {

	try {
		const guild = await Guilds.findOne({ guildId: interaction.guild.id });
		let change = false;

		const updateobject = {
			guildId: interaction.guild.id,
			prefix: guild.prefix,
			adminroles: [...guild.adminroles],
			antilink: {
				enabled: guild.antilink.enabled,
				channels: [...guild.antilink.channels]
			}
		}

		if (!interaction.memberPermissions.has('ADMINISTRATOR') //@ts-ignore
			|| interaction.member.roles.cache.hasAny(updateobject.adminroles)) return interaction.reply(
				{
					content: 'you are not admin to use this command'
				});
		const subcommand = interaction.options.getSubcommand();
		if (subcommand === 'custom-prefix') {
			const prefix = interaction.options.getString('set-prefix');
			if (prefix) {
				updateobject.prefix = prefix;
				change = true;
			}

		}
		if (subcommand === 'admin-roles') {
			change = true;

			updateobject.adminroles = adminrole(interaction, updateobject.adminroles);
		}
		if (subcommand === 'anti-link') {
			change = true;

			updateobject.antilink = antilink(interaction, updateobject.antilink);
		}
		if (change) {
			guild.overwrite(updateobject)
			await guild.save()
			return interaction.reply({
				content: 'Saving config...'
			})
		}

	} catch (error) {
		console.log(error)
	}
}
module.exports = {
	name: 'config',
	data: data(),
	execute: execute
} 