const Discord = require('discord.js');


exports.run = function(client, message, arg) {
if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(':warning: | Bu komutu kullanabilmek için `Mesajları Yönet` yetkisine sahip olmalısın!')
  let mesaj = arg.slice(0).join(' ');
  var sil = arg.join(' ');
   if(!sil) return message.reply('Rakam girmelisin')
message.channel.bulkDelete(sil);
message.channel.send(mesaj+" mesaj sildim").then(msg => {
	msg.delete(5000)
})
message.delete();
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'temizle', 
  description: 'Belirtilen miktarda mesaj siler',
  usage: 'temizle <miktar>'
};
