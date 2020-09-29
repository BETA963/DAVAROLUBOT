const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      client.channels.get("747881090471166064").send('**'+message.author+'** rehber çağırıyor'+" <@&557984515302096927>")
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor(message.author.username + ' Rehber geliyor!!!!')
    .setColor('RANDOM')
    .setTimestamp()
    .setDescription('')
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'rehber',
  description: 'rehber çağarır',
  usage: 'rehber'
};
