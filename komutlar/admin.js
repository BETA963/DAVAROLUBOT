const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");

exports.run = (client, message, params) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL())
      .addField("**Özelden admin mi çağırıyorsun hadi amaa!**");
    return message.author.send(ozelmesajuyari);
  }
  if (message.channel.type !== "dm") {
    client.channels.cache
      .get("747881090471166064")
      .send(
        "**" +
          message.author +
          "** admin çağırıyor " +
          "<@&557984047683600450> " +
          "<@&561825628186345472> \n" +
          "https://discord.com/channels/557981420782616607/" +
          message.channel.id +
          "/" +
          message.id
      );
    const sunucubilgi = new Discord.MessageEmbed()
      .setAuthor(message.author.username + " Admin geliyor!!!!")
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription("");
    return message.channel.send(sunucubilgi);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "admin",
  description: "admini çağarır",
  usage: "admin"
};
