const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ms = require('ms');
/**
 * @type {import("../../Base/baseCommand")}
 */
module.exports = {
  name: 'start',
  description: 'Start a giveaway',
  cooldown: 10,
  category: 'Giveaway',
  botPermissions: ['SendMessages', 'EmbedLinks'],
  userPermissions: ['ManageChannels', 'ManageMessages'],
  options: [
    {
      name: 'duration',
      description: 'The duration of the giveaway',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'prize',
      description: 'The prize of the giveaway',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'winners',
      description: 'The number of winners',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: 'bonusrole',
      description: 'Role that will get bonus entries',
      type: ApplicationCommandOptionType.Role,
      required: false,
    },
    {
      name: 'bonusamount',
      description: 'How many extra entries this role gets',
      type: ApplicationCommandOptionType.Integer,
      required: false,
    },
    {
      name: 'requiredrole',
      description: 'Role required to enter the giveaway',
      type: ApplicationCommandOptionType.Role,
      required: false,
    },
    {
      name: 'requiredguild',
      description: 'Invite link of the guild the user must be in (e.g. https://discord.gg/abc123)',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  type: ApplicationCommandType.ChatInput,
  slashCommand: {
    enabled: true,
  },

  async msgExecute(client, message, args) {},

  async interactionExecute(client, interaction) {
    const give = client.giveaway;
    const channel = interaction.channel;
    const duration = interaction.options.getString('duration');
    const prize = interaction.options.getString('prize');
    const winners = interaction.options.getInteger('winners');

    // optional bonus entries
    const bonusRole = interaction.options.getRole('bonusrole');
    const bonusAmount = interaction.options.getInteger('bonusamount') || 0;

    // optional requirements
    const requiredRole = interaction.options.getRole('requiredrole');
    const requiredGuildInvite = interaction.options.getString('requiredguild');

    await give.start(channel, {
      duration: ms(duration),
      prize: prize,
      winnerCount: winners,
      hostId: interaction.user.id,

      // 🎁 Bonus Entries
      bonusEntries:
        bonusRole && bonusAmount > 0
          ? [
              {
                roleId: bonusRole.id,
                bonus: bonusAmount,
              },
            ]
          : [],

      // 📌 Requirements
      requirements: {
        roleId: requiredRole?.id,
        mustBeInGuild: requiredGuildInvite || undefined, // هنخزن اللينك زي ما هو
      },
    });

    await interaction.reply({
      content: '✅ Giveaway started successfully!',
      ephemeral: true,
    });
  },
};
