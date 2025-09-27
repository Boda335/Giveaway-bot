const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ms = require('ms');
/**
 * @type {import("../../Base/baseCommand")}
 */
module.exports = {
  name: 'edit',
  description: 'Edit a giveaway (prize, winners, or adjust time)',
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
      name: 'prize',
      description: 'New prize',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: 'winners',
      description: 'New number of winners',
      type: ApplicationCommandOptionType.Integer,
      required: false,
    },
    {
      name: 'time',
      description: 'Time to add/remove (e.g. 10m, 1h)',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: 'timeaction',
      description: 'Whether to add or remove the time',
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: [
        { name: 'Add', value: 'add' },
        { name: 'Remove', value: 'remove' },
      ],
    },
  ],
  type: ApplicationCommandType.ChatInput,
  slashCommand: { enabled: true },

  async interactionExecute(client, interaction) {
    const give = client.giveaway;

    const messageId = interaction.options.getString('messageid');
    const prize = interaction.options.getString('prize');
    const winners = interaction.options.getInteger('winners');
    const time = interaction.options.getString('time');
    const timeAction = interaction.options.getString('timeaction');

    let addTime;

    if (time && timeAction) {
      const parsed = ms(time);
      if (!parsed) {
        return interaction.reply({ content: '⚠️ Invalid time format!', ephemeral: true });
      }

      // لو اخترت remove نخلي الوقت بالسالب
      addTime = timeAction === 'remove' ? -parsed : parsed;
    }

    await give.edit(messageId, {
      prize,
      winnerCount: winners,
      addTime,
    });

    await interaction.reply({ content: '✏️ Giveaway edited successfully!', ephemeral: true });
  },
};
