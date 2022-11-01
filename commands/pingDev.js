const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  name: "devping",
  description: "ping pong command but only for dev",
  type: "dev",

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
