const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {

  const db = require('quick.db');
  

    
  if (!message.member.roles.has("764145903421358131")) return message.channel.send('Polis olmayan biri baskın atamaz');
    const ayy = client.emojis.find(emoji => emoji.name === "begone");
  const ayy1 = client.emojis.find(emoji => emoji.name === "deathtoU");
  const ayy2 = client.emojis.find(emoji => emoji.name === "coolsmirk");
  const ayy3 = client.emojis.find(emoji => emoji.name === "it_iz_what_it_iz");
  
    message.channel.send(`${ayy} BASKIN`);
    message.channel.send(`${ayy1} ELLER YUKARI`);
    message.channel.send(`${ayy2} YAT AŞAĞI YAT YAT`);
    message.channel.send(`${ayy3} BASKIN`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['baskın'],
  permLevel: 0,
  kategori: "moderasyon",
};

exports.help = {
  name: 'BASKIN',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'BASKIN',
 
};