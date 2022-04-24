//module import
import { Client } from 'discord.js';
import { readdirSync } from "fs";
import { join, } from 'path';
// local import
import { log } from "../utils/log";

export function ManagerEvents(client: Client) {

	return new Promise<void>((done) => {
		log('Loading events:')
		const files = readdirSync(join(__dirname, '../events'))

		files.forEach((file) => {
			let error = false
			const { execute } = require(join(__dirname, `../events/${(file.split('.'))[0]}`))

			typeof execute === 'function' ? execute(client) : error = true;
			error ? log(` Error to load event:${file} `, 'error-loader') : log(`${file}`, 'loader');

		})

		done()
		
	})


}