const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, params) => {
const ozelmesajuyari = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField("!logkanal <#KANAL>", "log kanalını ayarlarsınız log kanalında ban ve mute logları bunur.")
    .addField("!şikayetkanal <#KANAL>", "Sunucu şikayetlerinin iletildiği yerdir.")
    .addField("!ban <@üye> <sebep> ", "sunucudan birini banlar.")
    .addField("!unban <@üye> <sebep> ", "banlanan kişinin banını kaldırır.")
    .addField("!mute <@üye> <süre> <sebep> ", "yazdığınız kişiye mute atar.")
    .addField("!unmute <@üye> <sebep> ", "yazdığınız kişideki mute kalkar.")
    .addField("!tavsiye <Tavsiye>", "tavsiyenizi bot sahibine ulaştırır.")  
    .addField("!yaz <mesaj>", "yazdığınız şeyi bot tekrar eder.")  
    .addField("!temizle <Temizlenecek mesaj sayısı>", "yazdığınız kadar mesaj siler")
    .addField("!şikayetkanal <KANAL>", "Şikayet kanalını ayarlar.")  
  return message.channel.sendEmbed(ozelmesajuyari);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "yetkiliyardım",
  description: "komutları gösterir",
  usage: "yetkiliyardım"
};
