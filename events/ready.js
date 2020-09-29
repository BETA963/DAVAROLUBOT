const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const request = require('request-promise');
var prefix = ayarlar.prefix;

module.exports =  client => {
var oyun = [
        //"Pazartesi, Çarşamba, Cuma saat 13:30 da yeni video!",
        "!yardım Bot komutları",
        //"🎂 Doğum günün kutlu olsun baby yoda",
    ];

    setInterval(function() {
        var random = Math.floor(Math.random()*(oyun.length));
        client.user.setGame(oyun[random] );//"https://www.twitch.tv/DavarOluYayıncılık"
      }, 2 * 3000); //DEĞİŞME SÜRESİ
//var guildID = bot.guild.find() guildID.leave()
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);

  //console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Oyun ismi ayarlandı!`);
  //console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);
};
