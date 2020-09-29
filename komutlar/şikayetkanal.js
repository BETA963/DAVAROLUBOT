const Discord = require('discord.js')
const db = require('quick.db');
 
exports.run = async (client, message, args) => {
 
 if (!message.member.hasPermission("MANAGE_MESSAGES")) {
  const bilgi = new Discord.RichEmbed()
  .setDescription('Yetkin yok.')
  .setColor("0000A0")
return message.channel.sendEmbed(bilgi).then(m => m.delete(150000)); return
       }
  let şikayetkanal = message.mentions.channels.first()
  let sıfırla = db.fetch(`sikayet_${message.guild.id}`)
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(` Şikayet kanalı zaten ayarlı değil.`)
                    
      return
    }
    db.delete(`sikayet_${message.guild.id}`)
    message.channel.send(`Şikayet kanalı başarıyla sıfırlandı.`)
              
    return
  }
  if (!şikayetkanal) {
    return message.channel.send(
    `Şikayet Olacak Kanalı etiketlemelisin.`)                     
  }
  db.set(`sikayet_${message.guild.id}`, şikayetkanal.id)
  message.channel.send(`✅| Şikayet Kanalı başarıyla ${şikayetkanal} olarak ayarlandı.`)
  };
  
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['şikayetkanal'],
    permLevel: 2
}
 
exports.help = {
    name: 'şikayetkanal',
    description: 'şikayet Logu Ayarlar.',
    usage: 'şikayetkanal <KANAL>'
}