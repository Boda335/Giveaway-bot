const { EmbedBuilder } = require('discord.js');
const NEXUS = require('../../handlers/Nexus.js');
/**
 * @type {import("../../types.ts").BaseEvent}
 */
module.exports = {
  name: "participantJoined",
  target: 'giveaway',
  once: false,
  /**
   * @param {NEXUS} client
   * @param {import("discord.js").User} participant
   * @param {import("prizebox").Giveaway} giveaway
   */
  async execute(participant, giveaway, client) {
    try {
      const user = await client.users.fetch(participant.id);
      const embed = new EmbedBuilder().setColor(client.config.embed.color).setTitle('Entry Approved! | You have a chance to win!!').setDescription(`Your entry to [${giveaway.data.prize}](https://discord.com/channels/${giveaway.data.guildId}/${giveaway.data.channelId}/${giveaway.data.messageId}) has been approved!`).setTimestamp();
      await user.send({ embeds: [embed] }).catch(() => null);
    } catch (error) {
      console.error(error);
    }
  },
};
