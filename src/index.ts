//module import
import { Client } from "discord.js";
import { config } from "dotenv";

config();
//local import
//import { log } from "./utils/log";
import { start } from "./managers/managerClient";
import { dbconnect } from "./database/mongoose";

(async () => {
  const client = new Client({
    partials:
      ["USER", "MESSAGE", "GUILD_MEMBER", "CHANNEL"],
    intents: [4611]
  });

  await dbconnect().catch(console.log);
  await start(client);

})();
