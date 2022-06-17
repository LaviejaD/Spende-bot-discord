import { Cachedata } from '../../function/cachedata';
import { Guilds, interfaceGuild } from "../schemas/Guilds/guilds";
import { prefix } from '../../configuration/bot'
const GuildCache = new Cachedata<interfaceGuild>()

async function guildSet(guildId: string) {

	const guildf: interfaceGuild = await Guilds.find({ guildId: guildId }).catch(console.log)[0];

	guildf ?? await Guilds.create({ guildId: guildId })
	const guild = {
		guildId: guildId,
		prefix: guildf?.prefix ?? prefix,
		antilink: {
			enabled: guildf?.antilink?.enabled ?? false,
			channels: guildf?.antilink?.channels ?? [],
		}
	}


	GuildCache.set(guildId, guild)
	return guild
}

export function GuildsGet(guildId: string) {

	return GuildCache.get(guildId) ?? guildSet(guildId)

}