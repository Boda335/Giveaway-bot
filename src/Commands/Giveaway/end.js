const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
/**
 * @type {import("../../Base/baseCommand")}
 */
module.exports = {
  name: 'end',
  description: 'End an active giveaway',
  cooldown: 5,
  category: 'Giveaway',
  botPermissions: ['SendMessages', 'EmbedLinks'],
  userPermissions: ['ManageChannels', 'ManageMessages'],
  options: [
    {
      name: 'messageid',
      description: 'The message ID of the giveaway',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  type: ApplicationCommandType.ChatInput,
  slashCommand: { enabled: true },

  async interactionExecute(client, interaction) {
    const give = client.giveaway;
    const messageId = interaction.options.getString('messageid');

    await give.end(messageId);
    await interaction.reply({ content: '✅ Giveaway ended successfully!', ephemeral: true });
  },
};
