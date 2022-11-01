require("dotenv").config();
const fs = require("fs");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  client.commands.forEach((command) => {
    if (interaction.commandName === command.name && command.type === "user") {
      command.execute(interaction);
    }

    if (interaction.commandName === command.name && command.type === "dev") {
      if (interaction.user.id === process.env.DEV_ID) {
        command.execute(interaction);
      } else {
        interaction.reply(
          "You are not a dev! The command u are trying to use is Dev only"
        );
      }
    }
  });
});

client.login(process.env.BOT_TOKEN);
