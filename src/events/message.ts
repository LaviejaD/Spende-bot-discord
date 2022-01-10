import { Client } from 'discord.js'

// import { log } from '../utils/log';
import { GuildsGet, interfaceguilResult } from '../mongodb/cache/Guilds/guildscache'

import { managerCommands } from '../managers/managerCommands'

export function execute(client: Client) {

  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const guilResult: interfaceguilResult = await GuildsGet(`${message.guild?.id}`);

    if (!message.content.startsWith(guilResult.prefix)) return;
    managerCommands(client, message);
  });
}
