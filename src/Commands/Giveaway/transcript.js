const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  AttachmentBuilder,
} = require('discord.js');
/**
 * @type {import("../../Base/baseCommand")}
 */
module.exports = {
  name: 'transcript',
  description: 'Generate transcript for a giveaway',
  cooldown: 5,
  category: 'Giveaway',
  botPermissions: ['SendMessages', 'AttachFiles'],
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
  async msgExecute(client, message, args) {},
  async interactionExecute(client, interaction) {
    const give = client.giveaway;
    const messageId = interaction.options.getString('messageid');

    try {
      const html = await give.generateTranscript(messageId);

      const file = new AttachmentBuilder(Buffer.from(html, 'utf8'), {
        name: `giveaway-${messageId}-transcript.html`,
      });

      await interaction.reply({
        content: `📝 Transcript for giveaway \`${messageId}\` generated successfully!`,
        files: [file],
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: '❌ Failed to generate transcript. Please try again later.',
        ephemeral: true,
      });
    }
  },
};
