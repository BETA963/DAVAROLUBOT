const Discord = require('discord.js')

exports.run = (client, message, args) => {
    const bildiri = args.join(" ")
    if (!args[0]) {
        const embed = new Discord.RichEmbed()
            .setDescription(`Lütfen geçerli bir bildiri yazın. Eğer boş/gereksiz bildiri gönderirseniz bottan engellenirsiniz.`)
            .setTimestamp()
            .setColor("RANDOM")
        message.channel.send({embed})
        return
    }
  
    const embed = new Discord.RichEmbed()
        .setDescription("Bildiriniz başarıyla bot geliştiricisine iletilmiştir")
        .setTimestamp()
        .setColor("RANDOM")
    message.channel.send({embed})
        const yazi = new Discord.RichEmbed()
            .addField(`Bildiren Kişi`, message.author)
            .addField(`Bildiri`, bildiri)
            .setColor("RANDOM")
            .setTimestamp()
      client.users.get("444095448425299977").send(yazi)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rapor', 'raporla', 'tavsiye', 'tavsiyeet', 'tavsiyet', 'öner', 'öneri', 'bildir'],
    permLevel: 0,
  kategori: "bot"
}

exports.help = {
    name: 'tavsiye',
    description: 'Bot geliştiricisine hataları raporlamayı/tavsiye vermeyi/öneri iletmeyi sağlar.',
    usage: 'tavsiye [bildiri]'
}