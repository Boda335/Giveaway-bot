

const embedSettings = {
  successcolor: '#00ff00',
  color: '#ff6301',
  wrongcolor: '#b50b0b',
};
const options = {
  embedFooter: true,
};
const emojiSettings = {
  ERROR: '❌',
  SUCCESS: '✅',
  disabled: '🔴',
  enabled: '🟢',
  cleared: '🧹',
  time: '⏲️',
  ping: '🏓',
  bot: '🤖',
};

const links = {
  inviteURL: `https://discord.com/api/oauth2/authorize?client_id=BOTID&permissions=6508997968&scope=bot%20applications.commands`,
  DiscordServer: `discord.gg/AT6W2nHEVz`,
  Devloper: `https://discord.com/users/1139143053387509840`,
};
const bot = {
  TOKEN: 'Bot_token',
  PREFIX: '-',
  ID: 'Id',
  MONGO_URL: 'MONGODB_URL',
  Owners: ['1139143053387509840', 'OWNER_ID2', 'OWNER_ID3'],
  Dev: `\`\`\`[Boda3350]\`\`\`(${links.Devloper})`,
  DevTeam: `\`\`\`[Foxy Code Team]\`\`\`(${links.DiscordServer})`,
};
const slashSettings = {
  global: true,
  guildIDS: ['1344065394368839701'],
};

module.exports = {
  ...bot,
  embed: embedSettings,
  emoji: emojiSettings,
  links,
  options,
  slash: slashSettings,
};
