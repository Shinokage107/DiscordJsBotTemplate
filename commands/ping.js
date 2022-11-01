const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  name: "ping",
  description: "ping pong command",
  type: "user",

  commandBuilder() {
    const data = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
    return data;
  },

  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
