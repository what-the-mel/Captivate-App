import config from "../config.json" assert { type: "json" };
import { EmbedBuilder, SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord.js'


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
    interaction.reply({ content: `You have run a command - ${interaction.options.data[0]}`, ephemeral: true })
    // let channelList = [];
    // for (let i in interaction.options.data) {
    //     if (interaction.options.data[i] != undefined) {
    //         channelList.push(interaction.options.data[i].value)
    //     }
    // }

    // let userID = interaction.user.id
    // let userName = interaction.user.tag.ToLowerCase();
    // let serverID = interaction.guild.id

    // // get user from database
    // let user = await getSingle(`SELECT * FROM users WHERE userID = ?`, [userID])
    // let server = await getSingle(`SELECT * FROM servers WHERE serverID = ?`, [serverID])
    // // if user does not exist, create one
    // if (user == undefined) {
    //     await addUser(userID, userName, "Basic", [`${serverID}`]);
    //     user = await getSingle(`SELECT * FROM users WHERE userID = ?`, [userID])
    //     if (server != undefined) {
    //         // if basic, and command has been run within 30 days
    //         let date = new Date(server.channelsLastChanged)
    //         let days = getDaysSinceLastMessage(date)
    //         if (user.membership == "Basic" && days < 30) {
    //             // send message with how much time until they can update the list
    //             let daysLeft = 30 - days
    //             interaction.reply({ content: `Basic accounts can only update channels every 30 days. You still have ${daysLeft} days remaining.`, ephemeral: true })
    //         } else {
    //             // update server
    //             await updateServer(channelList, serverID, user.membership)
    //             interaction.reply({ content: `Channels updated.`, ephemeral: true })
    //         }
    //     } else {
    //         await addServer(userID, serverID, channelList, 'Basic', 30)
    //         interaction.reply({ content: `Channels added to DB!`, ephemeral: true })
    //     }
    // } else {
    //     let serverList = user.servers.split(',')
    //     if (serverList.includes(serverID)) {
    //         // if server in user list - check time since update
    //         if (server != undefined) {
    //             // if basic, and command has been run within 30 days
    //             let date = new Date(server.channelsLastChanged)
    //             let days = getDaysSinceLastMessage(date)
    //             if (user.membership == "Basic" && days < 30) {
    //                 // send message with how much time until they can update the list
    //                 let daysLeft = 30 - days
    //                 interaction.reply({ content: `Basic accounts can only update channels every 30 days. You still have ${daysLeft} days remaining.`, ephemeral: true })
    //             } else {
    //                 // update server
    //                 await updateServer(channelList, serverID, user.membership)
    //                 interaction.reply({ content: `Channels updated.`, ephemeral: true })
    //             }
    //         } else {
    //             await addServer(userID, serverID, channelList, user.membership, 30)
    //             serverList.push(serverID)
    //             await updateUser(userID, user.membership, serverList)
    //             interaction.reply({ content: `Channels added to DB!`, ephemeral: true })
    //         }
    //     } else {
    //         serverList.push(serverID)
    //         await updateUser(userID, user.membership, serverList)
    //         await addServer(userID, serverID, channelList, user.membership, 30)
    //         interaction.reply({ content: `Channels added to DB!`, ephemeral: true })
    //     }
    // }
}