const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
/**
 * @type {import("../../Base/baseCommand")}
 */
module.exports = {
  name: 'list',
  description: 'List giveaways by status',
  cooldown: 5,
  category: 'Giveaway',
  userPermissions: ['ManageMessages'],
  options: [
    {
      name: 'status',
      description: 'Filter giveaways by status',
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: [
        { name: 'Active', value: 'active' },
        { name: 'Paused', value: 'paused' },
        { name: 'Ended', value: 'ended' },
      ],
    },
  ],
  type: ApplicationCommandType.ChatInput,
  slashCommand: { enabled: true },

  async interactionExecute(client, interaction) {
    const give = client.giveaway;
    const status = interaction.options.getString('status');

    const list = give.list(status);
    if (!list.length) {
      return interaction.reply({ content: `⚠️ No giveaways found for status: ${status || 'all'}`, ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle('🎁 Giveaways List')
      .setColor('Blue')
      .setDescription(
        list.map(g => `• **${g.data.prize}** (${g.data.messageId}) → Status: ${g.data.ended ? 'Ended' : g.data.paused ? 'Paused' : 'Active'}`).join('\n')
      );

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
