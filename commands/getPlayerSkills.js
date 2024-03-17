import { runemetrics } from "runescape-api"

import { EmbedBuilder, SlashCommandBuilder } from '@discordjs/builders';



// -------------- Create Command -------------- 
export const skillsCommand = new SlashCommandBuilder()
    .setName("get_player_skills")
    .setDescription("Enter a players name to get their skill levels")
    .addStringOption((option) =>
        option
        .setName("name")
        .setDescription("Enter the players name.")
        .setRequired(true)
)


// // -------------- Command Function -------------- 
export async function getSkills(interaction) {
    let nameEntered = interaction.options.data[0].value;
    try {
        await interaction.deferReply({ });
        let data = await runemetrics.getProfile(nameEntered);
        const embed = new EmbedBuilder()
            .setTitle(`${nameEntered.toUpperCase()}'S SKILLS`)
            .addFields(
                { name: "-------SKILL LEVELS-------", value: ` ` },
                { name: "Prayer", value: `${data.skills.prayer.level}`, inline: true },
                { name: "Cooking", value: `${data.skills.cooking.level}`, inline: true },
                { name: "Woodcutting", value: `${data.skills.woodcutting.level}`, inline: true },
                { name: "Fletching", value: `${data.skills.fletching.level}`, inline: true },
                { name: "Fishing", value: `${data.skills.fishing.level}`, inline: true },
                { name: "Firemaking", value: `${data.skills.firemaking.level}`, inline: true },
                { name: "Crafting", value: `${data.skills.crafting.level}`, inline: true },
                { name: "Smithing", value: `${data.skills.smithing.level}`, inline: true },
                { name: "Mining", value: `${data.skills.mining.level}`, inline: true },
                { name: "Herblore", value: `${data.skills.herblore.level}`, inline: true },
                { name: "Thieving", value: `${data.skills.thieving.level}`, inline: true },
                { name: "Agility", value: `${data.skills.agility.level}`, inline: true },
                { name: "Slayer", value: `${data.skills.slayer.level}`, inline: true },
                { name: "Farming", value: `${data.skills.farming.level}`, inline: true },
                { name: "Runecrafting", value: `${data.skills.runecrafting.level}`, inline: true },
                { name: "Hunter", value: `${data.skills.hunter.level}`, inline: true },
                { name: "Construction", value: `${data.skills.construction.level}`, inline: true },
                { name: "Summoning", value: `${data.skills.summoning.level}`, inline: true },
                { name: "Dungeoneering", value: `${data.skills.dungeoneering.level}`, inline: true },
                { name: "Divination", value: `${data.skills.divination.level}`, inline: true },
                { name: "Invention", value: `${data.skills.invention.level}`, inline: true },
        )
        interaction.editReply({ embeds: [embed] });
        
    } catch (error) {
        console.log(error)
        interaction.reply({ content: `The player ${nameEntered} does not exist.`, ephemeral: true });
    }
}



        