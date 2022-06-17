import { Client } from 'discord.js'

// import { log } from '../utils/log';
import { GuildsGet } from '../database/get/guildsget'
import { } from "../database/schemas/Guilds/guilds";
import { managerCommands } from '../managers/managerCommands'

export function execute(client: Client) {
  return client.on('messageCreate', async (message) => {

    if (message.author.bot) return;
    const guilResult = await GuildsGet(`${message.guild?.id}`);

    if (guilResult.antilink.enabled) {

      const regexUrl = /^(ftp|http|https):\/\/[^ "]+$/;
      const urls = message.content.split(' ').filter(x => regexUrl.test(x));

      if (urls.length > 0) {
        const WhileList = guilResult.antilink.channels.includes(message.channel.id)
        console.log('sdasd', WhileList);

        if (!WhileList) {

          console.log(message.channel.toString())
          await message.author.send(`Links are not allowed on this channel: ${message.channel.toString()}`)
          await message.delete()
        };
      }

      return;
    }

    if (message.content.startsWith(guilResult.prefix)) {

      managerCommands(client, message);
    }

    return
  });
}
