import config from "./config.json" assert { type: "json" };
import { testCommand, testCommandRun } from "./commands/testCommand.js";


// -------------- Set up App Client --------------
import { Client } from "discord.js";
export const client = new Client({
  intents: ["Guilds"],
  allowedMentions: { parse: ["roles"], repliedUser: true },
});

// -------------- Command Setup --------------
function addCommands(commandList) {
    client.application.commands.set(commandList);
}

const commands = [
  testCommand
];

// --------------- On Interaction ----------------------
client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName == "test") {
      testCommandRun(interaction);
    }
  }
});

// -------------- App ready --------------
client.on("ready", async () => {
  console.log("App is online.");
  addCommands(commands);
});

// -------------- Run application --------------
client.login(config.TOKEN);