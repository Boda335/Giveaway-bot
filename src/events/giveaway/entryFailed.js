const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const NEXUS = require('../../handlers/Nexus.js');
/**
 * @type {import("../../types.ts").BaseEvent}
 */
module.exports = {
  name: 'entryFailed',
  target: 'giveaway',
  once: false,
  /**
   * @typedef {Object} EntryFailReason
   * @property {string} code
   * @property {string} [guildName]
   * @property {string} [inviteURL]
   * @property {string} [guildIcon]
   * @property {string} [roleId]
   */
  /**
   * @param {NEXUS} client
   * @param {import("discord.js").User} participant
   * @param {import("prizebox").Giveaway} giveaway
   * @param {EntryFailReason} reason
   */
  async execute(participant, giveaway, reason, client) {
    try {
      let reasonText;
      let embed = new EmbedBuilder()
        .setColor(client.config.embed.wrongcolor)
        .setTitle(':x: Entry Denied | You are not eligible to join this giveaway.');
      switch (reason.code) {
        case 'notInRequiredGuild':
          reasonText = `You must join [**${reason.guildName}**](${reason.inviteURL}) first`;
          embed.setDescription(reasonText).setThumbnail(reason.guildIcon);
          break;

        case 'invalidInvite':
          reasonText = `The invite link provided is invalid: ${reason.inviteURL}`;
          embed.setDescription(reasonText);
          break;

        case 'missingRequiredRole': {
          const guild = client.guilds.cache.get(giveaway.data.guildId);
          const roleName = guild?.roles.cache.get(reason.roleId)?.name || 'Unknown Role';
          reasonText = `You must have the role **${roleName}** to enter this giveaway.`;
          embed.setDescription(reasonText);
          break;
        }

        default:
          reasonText = 'You are not eligible to join this giveaway.';
          embed.setDescription(reasonText);
      }

      const user = await client.users.fetch(participant.id);
      await user.send({ embeds: [embed] }).catch(() => null);
    } catch (err) {
      console.error('Failed to send DM for entryFailed:', err);
    }
  },
};
