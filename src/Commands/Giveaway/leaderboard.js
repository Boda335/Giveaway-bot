const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
/**
 * @type {import("../../Base/baseCommand")}
 */
module.exports = {
  name: 'leaderboard',
  description: 'Show the giveaway leaderboard (entries or wins)',
  cooldown: 10,
  category: 'Giveaway',
  userPermissions: ['ManageMessages'],
  options: [
    {
      name: 'type',
      description: 'Leaderboard type',
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: [
        { name: 'Entries', value: 'entries' },
        { name: 'Wins', value: 'wins' },
      ],
    },
    {
      name: 'top',
      description: 'How many users to show',
      type: ApplicationCommandOptionType.Integer,
      required: false,
    },
  ],
  type: ApplicationCommandType.ChatInput,
  slashCommand: { enabled: true },

  async interactionExecute(client, interaction) {
    const give = client.giveaway;
    const type = interaction.options.getString('type') || 'entries';
    const top = interaction.options.getInteger('top') || 10;

    const leaderboard = give.leaderboard(type, top);

    if (!leaderboard.length) {
      return interaction.reply({ content: `⚠️ No leaderboard data found for **${type}**`, ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle(`🏆 Giveaway Leaderboard (${type})`)
      .setColor('Gold')
      .setDescription(
        leaderboard
          .map((entry, i) => `**#${i + 1}** <@${entry.id}> → ${entry[type]} ${type}`)
          .join('\n')
      );

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
