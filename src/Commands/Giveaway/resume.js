const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
/**
 * @type {import("../../Base/baseCommand")}
 */
module.exports = {
  name: 'resume',
  description: 'Resume a paused giveaway',
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
  ],
  type: ApplicationCommandType.ChatInput,
  slashCommand: { enabled: true },

  async interactionExecute(client, interaction) {
    const give = client.giveaway;
    const messageId = interaction.options.getString('messageid');

    await give.resume(messageId);
    await interaction.reply({ content: '▶️ Giveaway resumed!', ephemeral: true });
  },
};
