require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const devCommands = [];
const userCommands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      if (command.type == "dev") {
        devCommands.push(command.data.toJSON());
      } else if (command.type == "user") {
        userCommands.push(command.data.toJSON());
      }
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

const rest = new REST().setToken(process.env.BOT_TOKEN);

// Deploy Dev Commands (Guild Commands)
(async () => {
  try {
    console.log(`Started refreshing ${devCommands.length} application (/) devCommands.`);
    const data = await rest.put(Routes.applicationGuildCommands(process.env.OAUTH2_CLIENT_ID, process.env.TEST_SERVER), {
      body: devCommands,
    });

    console.log(`Successfully reloaded ${data.length} application (/) devCommands.`);
  } catch (error) {
    console.error(error);
  }
})();

// Deploy User Commands (Global Commands)
(async () => {
  try {
    console.log(`Started refreshing ${userCommands.length} application (/) userCommands.`);
    const data = await rest.put(Routes.applicationCommands(process.env.OAUTH2_CLIENT_ID), {
      body: userCommands,
    });

    console.log(`Successfully reloaded ${data.length} application (/) userCommands.`);
  } catch (error) {
    console.error(error);
  }
})();
