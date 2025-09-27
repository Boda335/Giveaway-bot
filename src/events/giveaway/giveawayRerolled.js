const { EmbedBuilder } = require("discord.js");
const NEXUS = require("../../handlers/Nexus.js");

/**
 * @type {import("../../types.ts").BaseEvent}
 */
module.exports = {
  name: "giveawayRerolled",
  target: "giveaway",
  once: false,
  /**
   * @param {import("../../types.ts").Participant[]} newWinners
   * @param {import("prizebox").Giveaway} giveaway
   * @param {NEXUS} client
   */
  async execute(newWinners, giveaway, client) {
    try {
      for (const winner of newWinners) {
        const user = await client.users.fetch(winner.id);

        const embed = new EmbedBuilder()
          .setColor(client.config.embed.successcolor || client.config.embed.color)
          .setTitle("🔄 Giveaway Rerolled!")
          .setDescription(
            `Congratulations ${winner.username}!\n` +
            `You are a new winner for **${giveaway.data.prize}** 🎁\n\n` +
            `[View Giveaway](${`https://discord.com/channels/${giveaway.data.guildId}/${giveaway.data.channelId}/${giveaway.data.messageId}`})`
          )
          .setTimestamp();

        await user.send({ embeds: [embed] }).catch(() => null);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
