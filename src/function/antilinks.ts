import { Message } from "discord.js";
export default async function antiLinks(message: Message, channels: string[]) {
	const regexUrl = /^(ftp|http|https):\/\/[^ "]+$/;
	const urls = message.content.split(' ').filter(x => regexUrl.test(x));
	console.log(urls)
	if (urls.length > 0) {
		const WhileList = channels.includes(message.channel.id)


		if (!WhileList) {

			console.log(message.channel.toString())
			await message.author.send(`Links are not allowed on this channel: ${message.channel.toString()}`)
			await message.delete()
		};
	}
}