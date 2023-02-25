import config from "./config.json" assert { type: "json" };
import cron from "cron";
import { activityChecker } from "./functions/messageFunctions.js";
import { setupChannelsCommandBasic, setupChannels } from "./commands/setupChannels.js";
import { premiumLiteSetupCommand, premiumLiteSetup } from "./commands/premiumLiteSetup.js";
import { premiumSetupCommand, premiumSetup } from "./commands/premiumSetup.js";

// -------------- Connect to DB ------------------
import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('QuickQ.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

// -------------- Set up App Client --------------
import { Client } from "discord.js";
export const client = new Client({
  intents: ["Guilds", "GuildMembers", "MessageContent", "GuildPresences"],
  allowedMentions: { parse: ["roles"], repliedUser: true },
});

// -------------- Command Setup --------------
function addCommands(commandList) {
    client.application.commands.set(commandList);
}

const commands = [
  setupChannelsCommandBasic,
  premiumLiteSetupCommand,
  premiumSetupCommand
];

// --------------- On Interaction ----------------------
client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName == "setup_channels") {
      setupChannels(interaction);
    } else if (interaction.commandName == "premium_lite_setup") {
      premiumLiteSetup(interaction);
    } else if (interaction.commandName == "premium_setup") {
      premiumSetup(interaction);
    }
  }
});



// -------------- App ready --------------
client.on("ready", async () => {
  console.log("App is online.");
  addCommands(commands);
  let runDailyAtNoon = new cron.CronJob(
         "0 10 * * *",
        async function () {
          console.log("Job Running...");
          await activityChecker();
        },
        null,
        true,
        "America/Los_Angeles"
    );
});

// -------------- Run application --------------
client.login(config.TOKEN);