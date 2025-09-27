const { EmbedBuilder,AttachmentBuilder } = require('discord.js');
const NEXUS = require('../../handlers/Nexus.js');

/**
 * @type {import("../../types.ts").BaseEvent}
 */
module.exports = {
  name: 'giveawayWon',
  target: 'giveaway',
  once: false,
  /**
   * @param {import("../../types.ts").Participant[]} winners
   * @param {import("prizebox").Giveaway} giveaway
   * @param {NEXUS} client
   */
  async execute(winners, giveaway, client) {
    try {
      for (const winner of winners) {
        const user = await client.users.fetch(winner.id);

        const embed = new EmbedBuilder()
          .setColor(client.config.embed.successcolor || client.config.embed.color)
          .setTitle('🎉 You Won the Giveaway!')
          .setDescription(
            `Congratulations ${winner.username}!\n` +
              `You won **${giveaway.data.prize}** 🎁\n\n` +
              `[View Giveaway](${`https://discord.com/channels/${giveaway.data.guildId}/${giveaway.data.channelId}/${giveaway.data.messageId}`})`
          )
          .setTimestamp();

        await user.send({ embeds: [embed] }).catch(() => null);
        const channel = client.channels.cache.get(giveaway.data.channelId);
        const messageId = giveaway.data.messageId;
        const give = client.giveaway;
        const html = await give.generateTranscript(messageId);

        const file = new AttachmentBuilder(Buffer.from(html, 'utf8'), {
          name: `giveaway-${messageId}-transcript.html`,
        });

        await channel.send({
          content: `📝 Transcript for giveaway \`${messageId}\` generated successfully!`,
          files: [file],
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
