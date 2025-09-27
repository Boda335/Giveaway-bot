# Discord Giveaway Bot

A powerful Discord giveaway bot built with **DiscoForge** framework and **PrizeBox** giveaway system.

## 🎯 About

This bot provides a complete giveaway management system for your Discord server. It supports creating, managing, and tracking giveaways with advanced features like user statistics, leaderboards, and flexible entry methods.

## ✨ Features

- **🎪 Complete Giveaway Management**: Start, pause, resume, edit, and end giveaways
- **🎲 Multiple Entry Types**: Support for both reaction and button-based giveaways  
- **📊 Statistics Tracking**: Track user participation and wins
- **🏆 Leaderboards**: Built-in leaderboard system for most active participants
- **⚡ Real-time Updates**: Live participant count and notifications
- **💾 Data Persistence**: JSON-based storage system
- **🔄 Hot Reload**: Dynamic command reloading for development

## 🚀 Quick Start

### Prerequisites

- Node.js 16.9.0 or higher
- Discord bot token
- Basic JavaScript knowledge

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Giveawaybot
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure the bot**
Edit `settings/config.js`:
```javascript
module.exports = {
  TOKEN: "YOUR_BOT_TOKEN",
  ID: "YOUR_BOT_CLIENT_ID", 
  PREFIX: "!",
  Owners: ["YOUR_USER_ID"],
  MONGO_URL: "mongodb://localhost:27017/giveawaybot" // optional
};
```

4. **Start the bot**
```bash
npm start
```

## 📁 Project Structure

```
├── 📁 database/           # Giveaway data storage
│   └── giveaways.json    
├── 📁 settings/          # Bot configuration
│   ├── config.js         # Main config
│   └── discoforge.js     # Framework settings
├── 📁 src/
│   ├── 📁 Commands/      # Bot commands
│   │   ├── 📁 Giveaway/  # Giveaway management commands
│   │   │   ├── start.js  # Start giveaway
│   │   │   ├── end.js    # End giveaway
│   │   │   ├── pause.js  # Pause giveaway
│   │   │   ├── resume.js # Resume giveaway
│   │   │   ├── edit.js   # Edit giveaway
│   │   │   ├── reroll.js # Reroll winners
│   │   │   ├── list.js   # List giveaways
│   │   │   └── leaderboard.js # User statistics
│   │   └── 📁 misc/      # Utility commands
│   ├── 📁 events/        # Event handlers
│   │   └── 📁 giveaway/  # Giveaway-specific events
│   ├── 📁 functions/     # Utility functions
│   └── 📁 handlers/      # System handlers
```

## 🎮 Commands

### Giveaway Management

| Command | Description | Usage |
|---------|-------------|-------|
| `/start` | Create a new giveaway | `/start prize:Discord Nitro duration:1h winners:1` |
| `/end` | End a giveaway early | `/end giveaway-id:123456` |
| `/pause` | Pause an active giveaway | `/pause giveaway-id:123456` |
| `/resume` | Resume a paused giveaway | `/resume giveaway-id:123456` |
| `/edit` | Edit giveaway details | `/edit giveaway-id:123456 prize:New Prize` |
| `/reroll` | Pick new winners | `/reroll giveaway-id:123456` |
| `/delete` | Delete a giveaway | `/delete giveaway-id:123456` |

### Information Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/list` | Show active giveaways | `/list` |
| `/leaderboard` | Show participation stats | `/leaderboard` |
| `/help` | Show bot commands | `/help` |
| `/ping` | Check bot latency | `/ping` |

## ⚙️ Configuration

### Bot Settings (`settings/config.js`)
```javascript
module.exports = {
  TOKEN: "YOUR_BOT_TOKEN",
  ID: "YOUR_BOT_CLIENT_ID",
  PREFIX: "!",
  Owners: ["YOUR_USER_ID"],
  MONGO_URL: "mongodb://localhost:27017/giveawaybot",
  errorLogs: "YOUR_WEBHOOK_URL" // optional
};
```

### Framework Settings (`settings/discoforge.js`)
```javascript
module.exports = {
  errorLogging: {
    enabled: false,
    errorLogs: 'WEBHOOK_URL'
  },
  presence: {
    enabled: true,
    status: 'idle',
    interval: 10000,
    type: 'Custom',
    names: [
      'Managing Giveaways!',
      'Type /help for commands',
      'Powered by DiscoForge'
    ]
  }
};
```

## 🎪 Usage Examples

### Starting a Giveaway
```javascript
// Slash command
/start prize:Discord Nitro duration:24h winners:1

// The bot will create an interactive giveaway with:
// - Embed with giveaway details
// - Join/Leave buttons or reaction
// - Live participant counter
// - Automatic winner selection when time ends
```

### Managing Active Giveaways
```javascript
// List all active giveaways
/list

// Pause a giveaway
/pause giveaway-id:1234567890

// Edit giveaway details
/edit giveaway-id:1234567890 prize:Steam Gift Card winners:3
```

### Viewing Statistics
```javascript
// Show leaderboard
/leaderboard

// Send leaderboard to channel
/sendleaderboard type:entries top:10
```

## 📊 Features in Detail

### Entry Methods
- **Reactions**: Users react with 🎉 to join
- **Buttons**: Interactive buttons for join/leave actions
- **Live Updates**: Real-time participant count updates

### Statistics System
- Track user entries across all giveaways
- Record wins and participation
- Generate leaderboards for most active users
- Guild-specific statistics storage

### Data Storage
- JSON-based storage in `database/giveaways.json`
- Persistent data across bot restarts
- User statistics tracking
- Automatic backups (if configured)

## 🛠️ Development

### Adding Custom Commands
1. Create a new file in `src/Commands/Giveaway/`
2. Follow the DiscoForge command structure:
```javascript
module.exports = {
  name: "mycommand",
  description: "My custom command",
  category: "giveaway",
  
  async interactionExecute(client, interaction) {
    // Command logic here
    await interaction.reply("Hello!");
  }
};
```

### Custom Events
Add event handlers in `src/events/giveaway/`:
```javascript
module.exports = {
  name: "giveawayJoin",
  
  async execute(client, participant, giveaway) {
    console.log(`${participant.username} joined ${giveaway.data.prize}!`);
  }
};
```

## 🤝 Support

- **Discord Server**: [Join our support server](https://discord.gg/AT6W2nHEVz)
- **Documentation**: Check DiscoForge and PrizeBox docs
- **Issues**: Report bugs on GitHub

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **[DiscoForge](https://github.com/Boda335/DiscoForge)**: Modern Discord bot framework
- **[PrizeBox](https://github.com/Boda335/prizebox)**: Complete giveaway management system  
- **[Discord.js](https://github.com/discordjs/discord.js)**: Powerful Discord API library

---

**Made with ❤️ for the Discord community**