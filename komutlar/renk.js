const Discord = require("discord.js");
const ms = require("ms");
const client = new Discord.Client();
const db = require("quick.db");
exports.run = async (receivedMessage, msg, args) => {
if (!msg.member.roles.has("750044775079477309")) return msg.channel.send('Renk değiştirmek için booster olan gerek');
    let user = args[0];
  let reason = args.slice(1).join(' ');
  const renkler = new Discord.RichEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL)
      .setColor('RANDOM')
      .setTimestamp()
      .addField('Renkler',"<@&773118083706388480>\n<@&774381853871702068>\n<@&774381612103499808>\n<@&774381587374538752>\n<@&774381722464026634>\n<@&774381853384769586>\n<@&774381760052985866>\n<@&774381611138547742>\n**Kullanım : !renk <RENK>**" )
  
  if (!args[0]) return msg.channel.send(renkler);
console.log(args)
  var roleList = ["774381853871702068","774381612103499808","774381587374538752","774381722464026634","774381853384769586","774381760052985866","774381611138547742"]
roleList = await roleList.filter(b => msg.member.roles.has(b))

await msg.member.removeRoles(roleList).catch(console.error);
  if (args== "mavi") {
if(!msg.member.roles.has("773118083706388480")){ msg.member.addRole("773118083706388480").catch(console.error)
msg.channel.send("Renginiz "+args+" olarak ayarlandı")
};
  };
  if (args== "pembe") {
if(!msg.member.roles.has("774381853871702068")) {msg.member.addRole("774381853871702068").catch(console.error)
msg.channel.send("Renginiz "+args+" olarak ayarlandı")
};
};
  if (args== "kırmızı") {
if(!msg.member.roles.has("774381612103499808")) {msg.member.addRole("774381612103499808").catch(console.error)
msg.channel.send("Renginiz "+args+" olarak ayarlandı")
};
};
  if (args== "yeşil") {
if(!msg.member.roles.has("774381587374538752")) {msg.member.addRole("774381587374538752").catch(console.error)
msg.channel.send("Renginiz "+args+" olarak ayarlandı")
};
};
  if (args== "sarı") {
if(!msg.member.roles.has("774381722464026634")) {msg.member.addRole("774381722464026634").catch(console.error)
msg.channel.send("Renginiz "+args+" olarak ayarlandı")
};
};
  if (args== "beyaz") {
if(!msg.member.roles.has("774381853384769586")) {msg.member.addRole("774381853384769586").catch(console.error)
msg.channel.send("Renginiz "+args+" olarak ayarlandı")
};
};
  if (args== "siyah") {
if(!msg.member.roles.has("774381760052985866")) {msg.member.addRole("774381760052985866").catch(console.error)
msg.channel.send("Renginiz "+args+" olarak ayarlandı")
};
};
  if (args== "turuncu") {
if(!msg.member.roles.has("774381611138547742")) {msg.member.addRole("774381611138547742").catch(console.error)
msg.channel.send("Renginiz "+args+" olarak ayarlandı")
};
}

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["renk"],
  permLevel: 0
};

exports.help = {
  name: "renk",
  description: "",
  usage: "renk"
};
