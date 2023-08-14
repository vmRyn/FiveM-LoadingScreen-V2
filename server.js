const Discord = require('discord.js');
const client = new Discord.Client({ intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages
  ]})
const botToken = 'MTE0MDQwMDY4MzQ0Nzc2NzE3MQ.Ghvq66.ks7kpLfZJFeCv01yFuq_-WAt9808PK2Nte92X8'; //Bot Token
const channelID = '1140402948501942402';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('Fetching Images', { type: 'WATCHING' });
});

client.on('message', async (message) => {
    if (message.channel.id === '1140402948501942402') {
      const imageUrls = extractImageUrls(message); // Function to extract image URLs
      console.log('Received message with image URLs:', imageUrls);
    }
  });
  
  // Extract image URLs from a message
  async function extractImageUrls(message) {
    const imageUrls = [];
  
    // Extract image URLs from attachments
    message.attachments.forEach((attachment) => {
      if (attachment.url) {
        imageUrls.push(attachment.url);
      }
    });
  
    // Extract image URLs from message content (assuming they are plain text URLs)
    const urlsInContent = message.content.match(/\bhttps?:\/\/\S+\b/g);
    if (urlsInContent) {
      urlsInContent.forEach((url) => {
        if (url.match(/\.(jpeg|jpg|gif|png)$/i)) {
          imageUrls.push(url);
        }
      });
    }
  
    return imageUrls;
  }

client.login(botToken);
