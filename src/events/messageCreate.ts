import { Client } from 'discord.js'
import { prefix } from '../configuration/bot'
// import { log } from '../utils/log';
import { GuildsGet } from '../database/get/guildsget'
import { managerCommands } from '../managers/managerCommands'
import antilinks from "../function/antilinks";

export function execute(client: Client) {
  return client.on('messageCreate', async (message) => {

    if (message.author.bot) return;
    const guilResult = await GuildsGet(`${message.guild?.id}`);

    if (guilResult.antilink.enabled) return antilinks(message, guilResult.antilink.channels);
    if (message.content.startsWith(guilResult.prefix || prefix)) return managerCommands(client, message);
    return
  });
}
