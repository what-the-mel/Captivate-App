import { client } from "../index.js";
import { unixToDatetimeFunction, getDaysSinceLastMessage } from "./timeFunctions.js";
import { generatePrompt } from "./apiCalls.js";
import { getAll } from "../database/databaseHelpers.js";


export function getMessageDate(message) {
    return message.creationDate
}


export async function getInactiveChannelName(channelID, inactiveDays) {
    //console.log(typeof channelID)
    let channel = client.channels.cache.get(channelID);
    let prompt = await generatePrompt(channel.name)
    //console.log(`Prompt: ${prompt}`)
    channel.messages.fetch({ limit: 1 }).then(messages => {
        let lastMessage = messages.first();
        if (lastMessage == undefined) {
            //console.log(`No messages sent in channel yet.`)
            channel.send(prompt)
        } else if (!lastMessage.author.bot) {
            let messageUnix = lastMessage.createdTimestamp
            let daysSinceSent = getDaysSinceLastMessage(unixToDatetimeFunction(messageUnix))
            if (daysSinceSent > inactiveDays) {
                //console.log(`Getting Inactive Channel: ${channel.name}`)
                channel.send(prompt)
            }
            // else {
            //     console.log(`${channel.name} has had recent activity.`)
            // }
        }
    })
    .catch(console.error);
}


export function getChannels(guildID) {
    let guild = client.guilds.cache.get(guildID);
    let guildTextChannels = []
    guild.channels.cache.forEach(channel => {
        if (channel.type == 0){
            guildTextChannels.push(channel.id)
        }
    })
    return guildTextChannels
}


export async function activityChecker() {
    let servers = await getAll(`SELECT * FROM servers`)
    // for each server in the db
    for (let i in servers) {
        console.log('Server ID ' + servers[i].serverID)
        let channelList = servers[i].channels.split(',')
        console.log("Channels " + channelList)
         // loop through channels and run get active channel name function
        for (let j in channelList) {
            console.log("Channel Loop " + channelList[j])
            await getInactiveChannelName(channelList[j], servers[i].inactivityTime)
        }
    }


}