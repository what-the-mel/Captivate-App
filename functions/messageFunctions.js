import { client } from "../index.js";
import { unixToDatetimeFunction, getDaysSinceLastMessage } from "./timeFunctions.js";
import { generatePrompt } from "./apiCalls.js";


export function getMessageDate(message) {
    return message.creationDate
}


export async function getInactiveChannelName(channelID, inactiveDays) {
    let channel = client.channels.cache.get(channelID);
    let prompt = await generatePrompt(channel.name)
    channel.messages.fetch({ limit: 1 }).then(messages => {
        let lastMessage = messages.first();
        if (lastMessage == undefined) {
            channel.send(prompt)
        } else if (!lastMessage.author.bot) {
            let messageUnix = lastMessage.createdTimestamp
            let daysSinceSent = getDaysSinceLastMessage(unixToDatetimeFunction(messageUnix))
            if (daysSinceSent > inactiveDays) {
                console.log(`Getting Inactive Channel: ${channel.name}`)
                // use channel name in API query for conversation starters
                channel.send(prompt)
            } else {
                console.log(`${channel.name} has had recent activity.`)
                //channel.send(prompt)
            }
        }
    })
    .catch(console.error);
}


export function getGuilds() {
    let guildsID = [];
    client.guilds.cache.forEach(guild => {
        guildsID.push(guild.id)
    });
    return guildsID;
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


export async function activityChecker(days) {
    let guilds = getGuilds()
    for (let i in guilds) {
        let channels = getChannels(guilds[i])
        for (let j in channels) {
            await getInactiveChannelName(channels[j], days);
        }
    }

}