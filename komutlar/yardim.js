const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, params) => {
  console.log(message.guild.id)
  if (message.guild.id == "557981420782616607") {
  const ozelmesajuyari = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField("-rank", "Sunucudaki rankınızı ve xp miktarınızı gösterir.")
    .addField("-play","Yazdığınız şarkı ismini çalar. (sesli kanalda olmak zorundasınız)")
    .addField("!admin","Admini çağırır. (gereksiz kullanmak yasaktır / denemek için kullanmak yasaktır)")
    .addField("!reber","Rehber çağırır. (gereksiz kullanmak yasaktır / denemek için kullanmak yasaktır)")
    .addField("!avatar", "Discord üzerindeki kapak fotoğrafını gösterir.")
    .addField("!havadurumu <Şehir/Ülke>","Yazdığınız konumdaki hava durumunu gösterir.")
    .addField("!herkesebendençay", "Herkese çay ısmarlarsınız.")
    .addField("!hesapla <İşlem>", "Yazdığınız işlemin cevabını verir.")
    .addField("!kullanıcıbilgim", "Sunucudaki bilgilerinizi gösterir.")
    .addField("!mcbaşarım <Başarım adı>", "Yazdığınız başarımı verir.")
    .addField("!şikayet <Şikayet>", "Şikayetinizi iletir.")
    .addField("!tavsiye <Tavsiye>", "Tavsiyenizi iletir.")
    .addField("Sunucu kuralalrı için ",'<#557982754487271455>')
    .addField("Kanallar hakkında bilgi edinmek için ",'<#723266400529022997>')
  return message.channel.sendEmbed(ozelmesajuyari);
  }else{
const ozelmesajuyarii = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField("!avatar", "Discord üzerindeki kapak fotoğrafını gösterir.")
    .addField("!havadurumu <Şehir/Ülke>","Yazdığınız konumdaki hava durumunu gösterir.")
    .addField("!herkesebendençay", "Herkese çay ısmarlarsınız.")
    .addField("!hesapla <İşlem>", "Yazdığınız işlemin cevabını verir.")
    .addField("!kullanıcıbilgim", "Sunucudaki bilgilerinizi gösterir.")
    .addField("!mcbaşarım <Başarım adı>", "Yazdığınız başarımı verir.")
    .addField("!şikayet <Şikayet>", "Şikayetinizi iletir.")
    .addField("!tavsiye <Tavsiye>", "Tavsiyenizi iletir.")
    .addField("espiri yap","size espiri yapar")
    .addField("fıkra anlat","size fıkra anlatır")
  return message.channel.sendEmbed(ozelmesajuyarii);
}
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "komutları gösterir",
  usage: "yardım"
};
