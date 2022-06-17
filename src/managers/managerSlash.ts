import { readdirSync } from 'fs'
import { join } from "path";
import { Client, Interaction } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import { log } from "../utils/log";
import { GuildId } from "../configuration/bot";


interface slashcommandIterface {
	name: string, data: any, execute(client: Client, interaction: Interaction): void
}

const CommandSlash = new Map<string, string>()

export function SlashRegister() {
	return new Promise<void>(async (done) => {
		log(`Register Slash Commands`)
		let Commands: any[] = []
		const rest = new REST({ version: '9' }).setToken(`${process.env['BOT_TOKEN']}`)
		const folders = readdirSync(join(__dirname, '../commandsSlash'))

		folders
			.forEach((folder) => {
				const pathFile = join(__dirname, '../commandsSlash', `${folder}`)
				const { name, data }: slashcommandIterface = require(join(pathFile, `./index`))

				Commands.push(data.toJSON())
				CommandSlash.set(name, join(pathFile, `./index`))
				log(`Commands slash ${folder} is save`, 'loader')
			})

		const route = process.env['DEV'] == "true"
			? Routes.applicationGuildCommands(`${process.env['BOTCLIENT']}`, GuildId)
			: Routes.applicationCommands(`${process.env['BOTCLIENT']}`);
		try { await rest.put(route, { body: Commands }) }
		catch (error) { console.log(error.name) }
		done()
	})
}

export function ManagarSlash(commandName: string, interaction: Interaction, client: Client): void {
	const execute: (client: Client, interaction: Interaction) => void = require(CommandSlash.get(commandName)).execute
	if (execute) return execute(client, interaction)
}