const { SlashCommandBuilder } = require("discord.js");

const command = new SlashCommandBuilder().setName("ping").setDescription("Ping Command");

module.exports = {
  type: "user",
  data: command,
  execute: main,
};

async function main(interaction) {
  await interaction.deferReply();
  await interaction.followUp("Pong!");
}
