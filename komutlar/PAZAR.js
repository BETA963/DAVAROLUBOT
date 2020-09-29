const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, params) => {
  let mesaj = params.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
  const ozelmesajuyari = new Discord.RichEmbed()
    .setColor("#0099ff")
    .setTimestamp()
    .setAuthor(message.guild.name,message.guild.iconURL)
     .addField(message.author.username,mesaj)
    message.delete()
return message.channel.sendEmbed(ozelmesajuyari);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "yazdır",
  description: "komutları gösterir",
  usage: "yazdır"
};
