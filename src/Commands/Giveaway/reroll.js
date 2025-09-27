const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
/**
 * @type {import("../../Base/baseCommand")}
 */
module.exports = {
  name: 'reroll',
  description: 'Reroll winners for a giveaway',
  cooldown: 5,
  category: 'Giveaway',
  userPermissions: ['ManageMessages'],
  options: [
    {
      name: 'messageid',
      description: 'The message ID of the giveaway',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'winners',
      description: 'Number of winners to reroll',
      type: ApplicationCommandOptionType.Integer,
      required: false,
    },
  ],
  type: ApplicationCommandType.ChatInput,
  slashCommand: { enabled: true },

  async interactionExecute(client, interaction) {
    const give = client.giveaway;
    const messageId = interaction.options.getString('messageid');
    const winners = interaction.options.getInteger('winners');
    await give.reroll(messageId, winners);
    await interaction.reply({ content: '🔄 Giveaway rerolled!', ephemeral: true });
  },
};
