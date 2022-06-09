//module import
import { Client } from "discord.js";
import { config } from "dotenv";
config();
//local import
import { start } from "./managers/managerClient";
import { dbconnect } from "./database/mongoose";
console.log('adasd');
//import { log } from "./utils/log";


(async () => {
  process.env['TIMEUP'] = `${new Date().getTime()} `;
  const client = new Client({
    partials:
      ["USER", "MESSAGE", "GUILD_MEMBER", "CHANNEL"],
    intents: [4611]
  });

  await dbconnect().catch(console.log);
  start(client);
  require("./service/serversocket")
})();
