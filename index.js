const { Client, Intents } = require('discord.js');
const config = require('./config.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async message => {
    if (message.content === '!createpost') {
        const post = await message.channel.send('React to this message to update its text.');
        await post.react('👍');
        await post.react('👎');
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;

    const message = reaction.message;
    if (reaction.emoji.name === '👍') {
        message.edit('Updated text based on 👍 reaction.');
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;

    const message = reaction.message;
    if (reaction.emoji.name === '👍') {
        message.edit('React to this message to update its text.');
    }
});

client.login(config.token);
