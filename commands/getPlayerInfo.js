import { hiscores } from "runescape-api"

import { EmbedBuilder, SlashCommandBuilder } from '@discordjs/builders';


// -------------- Create Command -------------- 
export const playerCommand = new SlashCommandBuilder()
    .setName("get_player")
    .setDescription("Enter a players name to get their stats")
    .addStringOption((option) =>
        option
        .setName("name")
        .setDescription("Enter the players name.")
        .setRequired(true)
    )
    

// // -------------- Command Function -------------- 


export async function getPlayer(interaction) {
    let nameEntered = interaction.options.data[0].value;

    try {
        let data = await hiscores.getPlayer(nameEntered);
        interaction.reply({ content: `Rank: ${data.skills.overall.rank} Level: ${data.skills.overall.level} Experience: ${data.skills.overall.experience}` });
    } catch (error) {
        interaction.reply({ content: `The player ${nameEntered} does not exist.`, ephemeral: true });
    }
}
