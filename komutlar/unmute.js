const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
exports.run = async (receivedMessage,  msg, args) => {
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if (!msg.guild.members.get(receivedMessage.user.id).hasPermission("MANAGE_MESSAGES")) return msg.channel.send('Gerekli izin yok')
// if (user.hasPermission("BAN_MEMBERS")) return msg.channel.send(`Hata! \`${user.tag}\` isimli kullanıcı bu sunucuda yetkili.`)
let log = await db.fetch(`log_${msg.guild.id}`)
  if (!log) return msg.channel.send("Ayarlı Bir Mute Log Kanalı Yok! Ayarlamak için \`-log #kanal\` !") 
var mod = msg.author
 let sebep = args.slice(1).join(' ')
 
  if (!user) return msg.channel.send('Kullanıcı Etiketlemedin')
if (!sebep) return msg.channel.send('Sebep Belirtmedin!')
 
 
 
  let mute = msg.guild.roles.find(r => r.name === "SUSTURULDU");
        

db.delete(`muteli_${msg.guild.id + user.id}`)
    user.removeRole(mute.id)
 msg.channel.send(`<@${user.id}> Muten açıldı.`)

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sustur"],
  permLevel: 1
};
 
exports.help = {
  name: "unmute",
  description: "",
  usage: ""
};