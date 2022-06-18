import { CommandInteraction } from "discord.js";

type updateAdminrole = String[];

function adminrole(interaction: CommandInteraction, updateobject: updateAdminrole): updateAdminrole {

	const add_role = interaction.options.getRole('add-role');
	const delete_role = interaction.options.getRole('delete-role');

	if (add_role) updateobject.push(add_role.id);
	if (delete_role) updateobject = updateobject.filter(role => role !== delete_role.id);

	return updateobject;
}


export default adminrole