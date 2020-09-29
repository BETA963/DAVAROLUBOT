const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
exports.run = async (receivedMessage,  msg, args) => {
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if (!msg.guild.members.get(receivedMessage.user.id).hasPermission("MANAGE_MESSAGES")) return msg.channel.send('Gerekli izin yok')
// if (user.hasPermission("BAN_MEMBERS")) return msg.channel.send(`Hata! \`${user.tag}\` isimli kullanıcı bu sunucuda yetkili.`)
let log = await db.fetch(`mlog_${msg.guild.id}`)
  if (!log) return msg.channel.send("Ayarlı Bir Mute Log Kanalı Yok! Ayarlamak için \`-log #kanal\` !")
var mod = msg.author
var reason = args[1]
 let sebep = args.slice(2).join(' ')
   let member = msg.guild.members.get(user.id);
  if (!user) return msg.channel.send('Kullanıcı Etiketlemedin')
 if (!reason) return msg.channel.send('Süre Belirtmedin! Seçeneklerin : 1s/1m/1h/1d/1w')
if (!sebep) return msg.channel.send('Sebep Belirtmedin!')
if (member.roles.has("592042647611244566")) return msg.channel.send('Dokunulmazlığı olan birini muteleyemezsin');
 
 
 
  let mute = msg.guild.roles.find(r => r.name === "SUSTURULDU");
        
  let mutetime = args[1]
if(!mute){
      mute = await msg.guild.createRole({
        name: "SUSTURULDU",
        color: "#818386",
        permissions:[]
      })
      msg.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(mute, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
 
    }
 
 
  await(user.addRole(mute.id));
msg.channel.send(``)
  let mutezaman = args[1]
.replace(`d`," Gün")
.replace(`s`," Saniye")
.replace(`h`," Saat")
.replace(`m`," Dakika")
.replace(`w`," Hafta")
  msg.channel.send(`${user} Adlı Kişi , ${mutezaman} Susturuldu! Sunucudan Çıkarsa Bile Mutesi Devam edecek!`)
db.set(`muteli_${msg.guild.id + user.id}`, 'muteli')
db.set(`süre_${msg.mentions.users.first().id + msg.guild.id}`, mutetime)
                        
  const muteembed = new Discord.RichEmbed()
        .setTitle('Ceza: Mute')
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
      .addField('Moderatör', `${mod}`,true)
      .addField('Sebep', `\`${sebep}\``,true)
      .addField('Kullanıcı', `<@${user.id}>`,true)
      .addField('Süre',`\`${mutezaman}\``)
  . setColor("RANDOM")
msg.guild.channels.get(log).sendEmbed(muteembed)
 
  setTimeout(function(){
db.delete(`muteli_${msg.guild.id + user.id}`)
    user.removeRole(mute.id)
 msg.channel.send(`<@${user.id}> Muten açıldı.`)
  }, ms(mutetime));
 
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sustur"],
  permLevel: 1
};
 
exports.help = {
  name: "mute",
  description: "",
  usage: ""
};