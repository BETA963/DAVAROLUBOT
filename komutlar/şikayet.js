const Discord = require('discord.js');
const db = require('quick.db');

exports.run = function(client, message, args) {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send(
new Discord.RichEmbed()
.setDescription('Kullanım: !sikayet <Şikayet>'));
const embed2 = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**${message.author.tag}** adlı kullanıcının Şikayeti:`)
.addField(`Kulanıcı Bilgileri`, `Kullanıcı ID: ${message.author.id}\nKullanıcı Adı: ${message.author.username}\nKullanıcı Tagı: ${message.author.discriminator}`)
.addField("Şikayet", type)
.setThumbnail(message.author.avatarURL)
if (db.has(`sikayet_${message.guild.id}`) === false) return message.channel.send('Şikayet kanalı ayarlanmamış ayarlamak için **-şikayetkanal <KANAL>**');
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription('Şikayetiniz Bildirildi!')
message.channel.send(embed)
let modlog = message.guild.channels.get(db.fetch(`sikayet_${message.guild.id}`).replace("<#", "").replace(">", ""));
message.guild.channels.get(modlog.id).send(embed2)

};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'şikayet',
  description: 'Şikayet de bulunursunuz..',
  usage: 'şikayet <Şikayet>'
};