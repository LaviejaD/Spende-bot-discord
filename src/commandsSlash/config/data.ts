import { SlashCommandBuilder } from '@discordjs/builders';
export function data() {
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
		.addSubcommand((sub) =>
			sub.setName('admin-roles').setDescription('roles can change configuration the bot').addRoleOption((r) =>
				r.setName('add-role').setDescription('add role to admin roles')
			).addRoleOption((r) => r.setName('delete-role').setDescription('remove role from admin roles'))
		).addSubcommand(
			(sub) => sub.setName('custom-prefix').setDescription('set custom prefix to server')
				.addStringOption((s) => s.setName('set-prefix').setDescription('set custom prefix'))
		)
}