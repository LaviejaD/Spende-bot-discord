import { Cachedata } from '../../function/cachedata';
import { Guilds, interfaceGuild } from "../schemas/Guilds/guilds";

const GuildCache = new Cachedata<interfaceGuild>()

async function guildSet(guildId: string) {
	const guild: interfaceGuild = await Guilds.findOne({ guildId: guildId })
	GuildCache.set(guildId, guild)
	return guild
}

export function GuildsGet(guildId: string) {

	return GuildCache.get(guildId) ?? guildSet(guildId)

}