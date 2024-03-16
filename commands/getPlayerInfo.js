import { hiscores, miscellaneous, runemetrics } from "runescape-api"

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
        let data = await runemetrics.getProfile(nameEntered);
        let avatarUrl = await miscellaneous.getAvatar(nameEntered);
        const embed = new EmbedBuilder()
            .setTitle(`${nameEntered.toUpperCase()}'S PLAYER INFO`)
            .addFields(
                { name: "-------OVERALL STATS-------", value: ` ` },
                { name: "Rank", value: `${data.overall.rank}`, inline: true },
                { name: "Level", value: `${data.overall.level}`, inline: true },
                { name: "Experience", value: `${data.overall.experience}`, inline: true },
            ).setImage(avatarUrl)
            .addFields(
                { name: "-------QUEST STATS-------", value: ` `},
                { name: "Completed", value: `${data.quests.complete}`, inline: true },
                { name: "Started", value: `${data.quests.started}`, inline: true },
                { name: "Remaining", value: `${data.quests.not_started}`, inline: true },
                
            ).addFields(
                { name: "-------COMBAT LEVELS-------", value: ` `},
                { name: "Attack", value: `${data.skills.attack.level}`, inline: true },
                { name: "Defense", value: `${data.skills.defence.level}`, inline: true },
                { name: "Strength", value: `${data.skills.strength.level}`, inline: true },
                { name: "Constitution", value: `${data.skills.constitution.level}`, inline: true },
                { name: "Ranged", value: `${data.skills.ranged.level}`, inline: true },
                { name: "Magic", value: `${data.skills.magic.level}`, inline: true },
                
            )
        interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.log(error)
        interaction.reply({ content: `The player ${nameEntered} does not exist.`, ephemeral: true });
    }
}


