const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
/**
 * @type {import("../../Base/baseCommand")}
 */
module.exports = {
  name: 'sendleaderboard',
  description: 'Send the giveaway leaderboard to this channel',
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

    await give.sendLeaderboard(interaction.channel, type, top);
    await interaction.reply({ content: '✅ Leaderboard sent!', ephemeral: true });
  },
};
