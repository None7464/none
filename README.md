# ALS Webhook Cleaner (Release)

A lightweight Discord bot that forwards ALS webhook messages to categorized channels based on detected keywords (win/lose/infinite).

## Features
- Forwards messages from a source channel to target channels
- Classifies using message content and embed texts (title/description/fields)
- Forwards attachments and embeds

## Requirements
- Node.js 18+ (or 20+ recommended)
- A Discord Bot application and token
- Bot added to your server with permissions to read messages in the source channel and send messages in target channels

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file from the example and add your bot token:
   ```bash
   cp .env.example .env
   # then open .env and set TOKEN=your_bot_token
   ```
3. Open `bot.js` and fill in these channel IDs:
   - `ALSWEBHOOK_CHANNEL_ID`
   - `WIN_CHANNEL_ID`
   - `LOSE_CHANNEL_ID`
   - `INFINITE_CHANNEL_ID`
4. Start the bot:
   ```bash
   npm start
   ```

## Tutorial: How to run it
1. Create a Discord application and bot:
   - Go to the Discord Developer Portal, create an application, add a Bot, and copy the bot token.
2. Set intents and invite the bot:
   - This bot only needs `Guilds` and `GuildMessages` gateway intents (non-privileged).
   - Invite the bot to your server with permissions: View Channels, Read Message History, Send Messages, and Manage Messages (needed to delete forwarded originals).
3. Get your channel IDs:
   - In Discord, enable Developer Mode → right-click channel → Copy ID.
   - Gather IDs for: ALS webhook source, WIN target, LOSE target, INFINITE target.
4. Configure the project:
   - Run `npm install`.
   - Duplicate `.env.example` to `.env` and set `TOKEN=your_bot_token`.
   - Open `bot.js` and paste the four channel IDs.
5. Run and verify:
   - Start the bot with `npm start`.
   - Look for `Logged in as <botname>` in the console.
6. Test forwarding:
   - Post or let the ALS webhook send a message in the source channel.
   - The bot will forward embeds/attachments to the matching target channel (win/lose/infinite) and delete the original.

## Notes
- This bot does not use the Message Content privileged intent; it relies on embeds and available content.
- If you see "Used disallowed intents", ensure only `Guilds` and `GuildMessages` intents are enabled in the code and that your bot has the required permissions in your server.

## Environment Variables
- `TOKEN` (required): Your Discord bot token

## License
MIT 