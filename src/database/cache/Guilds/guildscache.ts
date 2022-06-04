import NodeCache from 'node-cache';
import { Guilds, interfaceGuild } from "../../schemas/Guilds/guilds";
import { configbot } from '../../../configuration/bot';
const { prefix } = configbot;


export interface interfaceguilResult {
	prefix: string
}

const GuildCache = new NodeCache()

async function guildSet(guildId: string) {

	const guild: interfaceGuild = await Guilds.findOne({ guildId: guildId })
	const res: { prefix: string } = guild ? { prefix: guild.prefix } : { prefix: prefix };
	console.log(prefix)
	return res
}

export async function GuildsGet(guildId: string): Promise<any> {
	const res = (GuildCache.has(guildId) ? GuildCache.get(guildId) : await guildSet(guildId))

	return res
}