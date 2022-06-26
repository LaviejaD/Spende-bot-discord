import { interfaceCommands } from "./commandsinter"

const command: interfaceCommands = {
	name: 'math',
	alise: 'mt',
	devperms: false,
	execute: async (message, args): Promise<void> => {
		try {

			let calc = '';
			const ignore = ['+', '-', '*', '/', '(', ')', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
			args.slice(1).join('').trim().split('').forEach((value) => ignore.includes(value) ? calc += value : false);
			const result = eval(calc);

			if (result) await message.reply({ content: `Result: ${eval(result)}` })
			else await message.channel.send({ content: 'I need arguments to calculate example: ((3+3)/2)*2' })

		} catch (error) {
			await message.reply({ content: `Error: ${error}` })
		}
	}
}

export = command