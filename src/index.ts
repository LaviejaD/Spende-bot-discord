//module import
import { Client } from "discord.js";
import { config } from "dotenv";
//local import
import { start } from "./managers/managerClient";
import { dbconnect } from "./mongodb/mongoose";
//import { log } from "./utils/log";

(async () => {
  process.env['TIMEUP'] = `${new Date().getTime()
    }`
  const client = new Client({ intents: [4625] });
  config();

  try {
    await dbconnect();
    await start(client);
  } catch (error) {
    console.log(error);
  }
})();
