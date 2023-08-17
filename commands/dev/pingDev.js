const { SlashCommandBuilder } = require("discord.js");

const command = new SlashCommandBuilder().setName("ping").setDescription("Ping pong command but only for dev");

module.exports = {
  type: "dev",
  data: command,
  execute: main,
};

async function main(interaction) {
  await interaction.deferReply();
  await interaction.followUp("Pong!");
}
