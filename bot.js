const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

if (!process.env.TOKEN) {
    console.error("Missing TOKEN in .env. Set TOKEN=your_bot_token");
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Channel IDs (fill these before running)
const ALSWEBHOOK_CHANNEL_ID = "";
const WIN_CHANNEL_ID = "";
const LOSE_CHANNEL_ID = "";
const INFINITE_CHANNEL_ID = "";

const bottoken = process.env.TOKEN;

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.channel.id !== ALSWEBHOOK_CHANNEL_ID) return;

    // Only forward if there's an embed or attachment
    if (!message.embeds.length && !message.attachments.size) return;

    const compositeText = [
        message.content,
        ...message.embeds.map(e => [e.title, e.description, ...(e.fields || []).flatMap(f => [f.name, f.value])].filter(Boolean).join(" "))
    ].filter(Boolean).join(" ").toLowerCase();

    let targetChannelId = null;

    if (compositeText.includes("win") && !compositeText.includes("infinite")) {
        targetChannelId = WIN_CHANNEL_ID;
    } else if (compositeText.includes("lose") && !compositeText.includes("infinite")) {
        targetChannelId = LOSE_CHANNEL_ID;
    } else if (compositeText.includes("infinite")) {
        targetChannelId = INFINITE_CHANNEL_ID;
    }

    if (targetChannelId) {
        try {
            const targetChannel = await client.channels.fetch(targetChannelId);
            await targetChannel.send({
                content: message.content || null,
                embeds: message.embeds,
                files: message.attachments.map(att => att.url)
            });
            await message.delete();
        } catch (err) {
            console.error("Error forwarding message:", err);
        }
    }
});

client.login(bottoken); 