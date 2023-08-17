const { SlashCommandBuilder } = require("discord.js");

const command = new SlashCommandBuilder().setName("test").setDescription("Test command");

module.exports = {
  type: "dev",
  data: command,
  execute: main,
};

async function main(interaction) {
  // use this command for testing or prototyping commands
  await interaction.deferReply();
  await interaction.followUp("Test");
}
