const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
/**
 * @type {import("../../Base/baseCommand")}
 */
module.exports = {
  name: 'pause',
  description: 'Pause a giveaway',
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

    await give.pause(messageId);
    await interaction.reply({ content: '⏸️ Giveaway paused!', ephemeral: true });
  },
};
