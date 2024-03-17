import config from "../config.json" assert { type: "json" };
import { EmbedBuilder, SlashCommandBuilder } from '@discordjs/builders';


// -------------- Create Command -------------- 
export const testCommand = new SlashCommandBuilder()
    .setName("test")
    .setDescription("This is a test command")
    .addStringOption((option) =>
        option
        .setName("option")
        .setDescription("Enter some text")
        .setRequired(true)
    )
    

// // -------------- Command Function -------------- 
export async function testCommandRun(interaction) {
    interaction.reply({ content: `You have run a command - ${interaction.options.data[0].value}`, ephemeral: true })
}