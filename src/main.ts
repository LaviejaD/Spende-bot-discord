//module import
import { Client } from "discord.js";
import { config } from "dotenv";

//local import
//import { log } from "./utils/log";
import { start } from "./managers/managerClient";
import { dbconnect } from "./database/mongoose";

export async function Main() {
  config();
  const client = new Client({
    partials:
      ["USER", "MESSAGE", "GUILD_MEMBER", "CHANNEL"],
    intents: [4611]
  });

  await dbconnect().catch(console.log);
  start(client);


}

process.on('message', (msg) => {
  msg === 'start' && Main();
  msg === 'exit' && process.exit(0);

})
