const NEXUS = require('../../handlers/Nexus.js');
const { EmbedBuilder } = require('discord.js');
/**
 * @type {import("../../types.ts").BaseEvent}
 */
module.exports = {
  name: 'entryAfterEnd',
  target: 'giveaway',
  once: false,
  /**
   * @param {NEXUS} client
   */
  async execute(participant, giveaway, client) {
    try {
      const user = await client.users.fetch(participant.id);
      const embed = new EmbedBuilder()
        .setColor(client.config.embed.color)
        .setTitle('⏰ Giveaway Ended')
        .setDescription(
          `Sorry ${participant.username}, the giveaway for **${giveaway.data.prize}** has already ended!`
        );

      await user
        .send({
          embeds: [embed],
        })
        .catch(() => null);
    } catch (error) {
      console.error(error);
    }
  },
};
