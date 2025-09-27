const NEXUS = require('../../handlers/Nexus.js');
const { EmbedBuilder } = require('discord.js');

/**
 * @type {import("../../types.ts").BaseEvent}
 */
module.exports = {
  name: 'participantLeft',
  target: 'giveaway',
  once: false,
  /**
   * @param {NEXUS} client
   * @param {import("discord.js").User} participant
   * @param {import("prizebox").Giveaway} giveaway
   */
  async execute(participant, giveaway, client) {
    const embed = new EmbedBuilder()
      .setColor(client.config.embed.color)
      .setTitle('❓ Hold Up Did You Just Remove a Reaction From A Giveaway?')
      .setDescription(
        `Your entery to [This Giveaway](https://discord.com/channels/${giveaway.data.guildId}/${giveaway.channelId}/${giveaway.data.messageId}) was recorded but you un-reacted, since you don't need **${giveaway.data.prize}** I would have to choose someone else 😭`
      );
    const user = await client.users.fetch(participant.id);
    try {
      user.send({embeds: [embed]});
    } catch (error) {
      console.error(error);
    }
  },
};
