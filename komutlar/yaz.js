const Discord = require('discord.js');

exports.run = (client, message, args, args1) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(':warning: | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!')
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
  message.delete();
  message.channel.send(mesaj);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['say', 'söyle'],
  permLevel: 3
};

exports.help = {
  name: 'yaz',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: 'yaz [yazdırmak istediğiniz şey]'
};
