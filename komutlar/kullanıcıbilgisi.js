const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
    if (message.channel.type !== "group") {
      const user = message.mentions.users.first();
      const kullanicibilgimk = new Discord.RichEmbed()
      .setAuthor(user.username, user.avatarURL)
      .setColor('RANDOM')
      .setTimestamp()
      .addField('Ad:', user.first + '#' + user.discriminator)
      .addField('ID:', user.id)
      .addField('Kayıt tarihi:', user.createdAt)
      .addField('Şu an oynadığı oyun:', user.presence.game ? user.presence.game.name : 'Şu an oyun oynamıyor')
      .addField('BOT mu?', user.bot ? '\n Evet' : 'Hayır')
      console.log("!kullanıcıbilgim komutu " + user.username + " tarafından kullanıldı.")
      return message.channel.sendEmbed(kullanicibilgimk);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanıcı', 'kullanıcı bilgim', 'kbilgim'],
  permLevel: 0
};

exports.help = {
  name: 'kullanıcıbilgisi',
  description: 'Komutu kullanan kişi hakkında bilgi verir.',
  usage: 'kullanıcıbilgisi'
};
