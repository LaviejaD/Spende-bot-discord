import { readdirSync } from 'fs'
import { join } from "path";
import { Client, Interaction } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import { log } from "../utils/log";
const { GuildId }: { GuildId: string } = require("../configuration/bot").default

interface slashcommandIterface {
	name: string, data: any, execute(client: Client, interaction: Interaction): void
}

const CommandSlash = new Map<string, (client: Client, interaction: Interaction) => void>()

export function SlashRegister() {
	return new Promise<void>(async (done) => {
		log(`Register Slash Commands`)

		let Commands: any[] = []
		const rest = new REST({ version: '9' }).setToken(`${process.env['BOT_TOKEN']}`)
		const folders = readdirSync(join(__dirname, '../commandsSlash'))

		folders
			.forEach((folder) => {

				const pathFile = join(__dirname, '../commandsSlash', `${folder}`)
				const { name, data, execute }: slashcommandIterface = require(join(pathFile, `./index`))

				Commands.push(data.toJSON())
				CommandSlash.set(name, execute)
				log(`Commands slash ${folder} is save`, 'loader')
			})

		const route = process.env['DEV']
			? Routes.applicationGuildCommands(`${process.env['BOTCLIENT']}`, GuildId)
			: Routes.applicationCommands(`${process.env['BOTCLIENT']}`);

		try { await rest.put(route, { body: Commands }) }
		catch (error) { console.log(error) }


		done()

	})
}

export function ManagarSlash(commandName: string, interaction: Interaction, client: Client): void {
	const execute = CommandSlash.get(commandName)
	if (execute) return execute(client, interaction)
}