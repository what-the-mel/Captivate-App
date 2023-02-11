import config from "./config.json" assert { type: "json" };
import cron from "cron";
import { activityChecker } from "./functions/messageFunctions.js";

// -------------- Set up App Client --------------
import { Client } from "discord.js";
export const client = new Client({
  intents: ["Guilds", "GuildMembers", "MessageContent", "GuildPresences"],
  allowedMentions: { parse: ["roles"], repliedUser: true },
});

const channelID = '1038092563120390217'



// -------------- App ready --------------
client.on("ready", async () => {
  console.log("App is online.");
  let runEveryMin = new cron.CronJob(
         "* * * * *",
        async function () {
          console.log("Job Running...");
          await activityChecker(30);
        },
        null,
        true,
        "America/Los_Angeles"
    );
});

// -------------- Run application --------------
client.login(config.TOKEN);