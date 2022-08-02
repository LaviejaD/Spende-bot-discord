import { interfaceCommands } from "./commandsinter"
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { GuildId } from "../configuration/bot";
const command: interfaceCommands = {
	name: 'restcmd',
	alise: '',
	devperms: true,
	execute: async (message, args, client): Promise<void> => {


		const rest = new REST({ version: '9' }).setToken(`${process.env['BOT_TOKEN']}`)
		const router = process.env['DEV'] == "true"
			? Routes.applicationGuildCommands(`${process.env['BOTCLIENT']}`, GuildId)
			: Routes.applicationCommands(`${process.env['BOTCLIENT']}`);


		rest.put(router, { body: [] }).then(() => {
			message.channel.send('Successfully deleted all application commands.')
			rest.get(router).then(res => { console.log(res) })
		})
			.catch(() => message.channel.send('Error to  deleted all application commands.'));


	}
}

export = command