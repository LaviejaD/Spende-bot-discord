import { CommandInteraction } from "discord.js";
interface updateAntilinks {
	enabled: boolean
	channels: string[]
}

function antilink(interaction: CommandInteraction, updateobject: updateAntilinks): updateAntilinks {

	const white_list_delete = interaction.options.get('white-list-delete');
	const white_list_add = interaction.options.get('white-list-add');
	const enable = interaction.options.get('enable');


	if (enable) updateobject.enabled = updateobject.enabled == enable.value ? updateobject.enabled : !updateobject.enabled;
	if (white_list_delete) updateobject.channels = updateobject.channels.filter(channel => channel != white_list_delete.channel.id)
	if (white_list_add) updateobject.channels.push(white_list_add.channel.id);

	return updateobject;
}


export default antilink