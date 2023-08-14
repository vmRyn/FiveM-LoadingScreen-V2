const Discord = require('discord.js');
const client = new Discord.Client({ intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages
  ]})
const botToken = 'MTE0MDQwMDY4MzQ0Nzc2NzE3MQ.Ghvq66.ks7kpLfZJFeCv01yFuq_-WAt9808PK2Nte92X8'; //Bot Token
const channelID = '1140402948501942402';

client.once('ready', () => {
    console.log('Bot Logged In');
});

client.on('message', async (message) => {
    if (MessageChannel === channelID) {
        console.log('Image Receieved')
    }
});

function extractImageUrls(message) {
    const imageUrls = [];

    message.attachments.forEach((attachment) => {
        if (attachment.url) {
            imageUrls.push(attachment.url);
    }
});

const urlsInContent = message.content.match(/\bhttps?:\/\/\S+\b/g);
if (urlsInContent) {
    urlsInContent.forEach((url) => {
        if (url.match(/\.(jpeg|jpg|gif|png)$/i)) {
            imageUrls.push(url);
        }
    })
}
return imageUrls;
}

client.login(botToken)