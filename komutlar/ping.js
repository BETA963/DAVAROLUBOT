const Discord = require('discord.js');


exports.run = function(client, message) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(':warning: | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!')
    message.channel.send("Pingim **" + client.ping + "** ms!");
    message.delete();
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['p'],
  permLevel: 0 
};

exports.help = {
  name: 'ping', 
  description: 'Botun pingini gösterir',
  usage: 'ping'
};
