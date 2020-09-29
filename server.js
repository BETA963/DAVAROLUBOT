const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);
console.log("asdasdasdadas")
var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.on("message", msg => {
  const kzgn = client.emojis.get("512302904141545509");
  const embedlul = new Discord.RichEmbed()
    .setColor(0x00ae86)
    .setDescription(msg.author + " Reklam Yasak Bunu Bilmiyormusun!");

  const embedlulz = new Discord.RichEmbed()
    .setTitle("Sunucunda " + msg.author.tag + " reklam yapıyor!")
    .setColor(0x00ae86)
    .setDescription(
      "?uyar <kişi> komutu ile onu uyarabilir ya da ?kick <kişi> veya ?ban <kişi> komutlarını kullanarak onu sunucudan uzaklaştırabilirsin!"
    )
    .addField("Kullanıcının mesajı:", "**" + msg.content + "**");

  if (
    msg.content
      .toLowerCase()
      .match(/(discord\.gg\/)|(discordapp\.com\/invite\/) (htpp)/g) &&
    msg.channel.type === "text" &&
    msg.channel
      .permissionsFor(msg.guild.member(client.user))
      .has("MANAGE_MESSAGES")
  ) {
    if (msg.member.hasPermission("BAN_MEMBERS")) {
      return;
    } else {
      msg
        .delete(30)
        .then(deletedMsg => {
          deletedMsg.channel.send(embedlul);
          msg.guild.owner.send(embedlulz).catch(e => {
            console.error(e);
          });
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
});

const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube("AIzaSyCkT_L10rO_NixDHNjoAixUu45TVt0ES-s");
const queue = new Map();

client.on("message", async msg => {
  if (msg.author.bot) return undefined;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);
  let command = msg.content.toLowerCase().split(" ")[0];

  if (command === "çal") {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription("❎ | Lütfen Seli Bir Kanala Giriş Yapınız!")
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("❎ | Lütfen Seli Bir Kanala Giriş Yapınız!")
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("❎ | Şarkıyı Çalamıyorum Bu Kanalda Konuşma Yetkim Yok!")
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel
        .sendEmbed(new Discord.RichEmbed())
        .setTitle(`✅** | **${playlist.title}** Adlı Şarkı Kuyruğa Eklendi!**`);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;

          msg.channel.sendEmbed(
            new Discord.RichEmbed()
              .setTitle("Şarkı Seçimi")
              .setDescription(
                `${videos
                  .map(video2 => `**${++index} -** ${video2.title}`)
                  .join("\n")}`
              )
              .setFooter(
                "Lütfen 1-10 Arasında Bir Rakam Seçiniz 10 Saniye İçinde Liste İptal Edilecektir!"
              )
              .setFooter("Örnek Kullanım 1")
              .setColor("0x36393E")
          );
          msg.delete(5000);
          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 10000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.sendEmbed(
              new Discord.RichEmbed()
                .setColor("0x36393E")
                .setDescription(
                  "❎ | **10 Saniye İçinde Şarkı Seçmediğiniz İçin seçim İptal Edilmiştir!**."
                )
            );
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.sendEmbed(
            new Discord.RichEmbed()
              .setColor("0x36393E")
              .setDescription("❎ | YouTubede Böyle Bir Şarkı Yok !**")
          );
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === "gir") {
    return new Promise((resolve, reject) => {
      const voiceChannel = msg.member.voiceChannel;
      if (!voiceChannel || voiceChannel.type !== "voice")
        return msg.reply("Kanalda Kimse Olmadığından Çıkıyorum!");
      voiceChannel
        .join()
        .then(connection => resolve(connection))
        .catch(err => reject(err));
    });
  } else if (command === "geç") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription("❎ | Lütfen Seli Bir Kanala Giriş Yapınız!")
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("❎ **Şu An Zaten Şarkı Çalmıyorum!")
      );
    serverQueue.connection.dispatcher.end("**Sıradaki Şarkıya Geçildi!**");
    return undefined;
  } else if (command === "durdur") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription("❎ | Lütfen Seli Bir Kanala Giriş Yapınız!")
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("❎ | Şu An Zaten Şarkı Çalmıyorum!")
      );
    msg.channel.send(
      `:stop_button: **${serverQueue.songs[0].title}** Adlı Şarkı Durduruldu`
    );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("**Şarkı Bitti**");
    return undefined;
  } else if (command === "ses") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription("❎ | Lütfen Seli Bir Kanala Giriş Yapınız!")
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("❎ | Çalmayan Müziğin Sesine Bakamam")
      );
    if (!args[1])
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(
            `:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`
          )
          .setColor("RANDOM")
      );
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(`:loud_sound: Ses Seviyesi Ayarlanıyor: **${args[1]}**`)
        .setColor("RANDOM")
    );
  } else if (command === "çalan") {
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("❎ | Şu An Şarkı Çalınmıyor!")
          .setColor("RANDOM")
      );
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Çalan")
        .addField(
          "Başlık",
          `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`,
          true
        )
        .addField(
          "Süre",
          `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`,
          true
        )
    );
  } else if (command === "sıra") {
    let index = 0;
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("❎ | **Şarkı Kuyruğunda Şarkı Bulunmamakta**")
          .setColor("RANDOM")
      );
    return msg.channel
      .sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("Şarkı Kuyruğu")
          .setDescription(
            `${serverQueue.songs
              .map(song => `**${++index} -** ${song.title}`)
              .join("\n")}`
          )
      )
      .addField("Şu Anda Çalınan: " + `${serverQueue.songs[0].title}`);
  } else if (command === "?duraklat") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("**:pause_button: Şarkı Durduruldu!**")
          .setColor("RANDOM")
      );
    }
    return msg.channel.send("❎ | **Şarkı Çalmıyor Şu An**");
  } else if (command === "devam") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("**:arrow_forward: Şarkı Devam Ediyor!**")
          .setColor("RANDOM")
      );
    }
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle("**❎ | Şu An Şarkı Çalınmıyor!**")
        .setColor("RANDOM")
    );
  }

  return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    views: video.views
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(
        `❎ | **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`
      );
      queue.delete(msg.guild.id);
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(
            `❎ | **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`
          )
          .setColor("RANDOM")
      );
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(`✅ | **${song.title}** Adlı Şarkı Kuyruğa Eklendi!`)
        .setColor("RANDOM")
    );
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === "❎ | **Yayın Akış Hızı Yeterli Değil.**")
        console.log("Şarkı Bitti.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.sendEmbed(
    new Discord.RichEmbed()
      .setTitle("**🎙 Şarkı Başladı**", `https://i.hizliresim.com/RDm4EZ.png`)
      .setThumbnail(
        `https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`
      )
      .addField("\nBaşlık", `[${song.title}](${song.url})`, true)
      .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
      .addField("Süre", `${song.durationm}:${song.durations}`, true)
      .setColor("RANDOM")
  );
}

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on("message", async msg => {
  if (msg.guild.id != "747914371316973709") {
    if (msg.content.toLowerCase() === "sa") {
      if (msg.author.id == "444095448425299977") {
        msg.channel.send(
          "Aleyküm selam,hoş geldin **SAHİP** " +
            `${client.users.size} Kişi sunucumuzda`
        );
      } else if (msg.member.roles.has("748933383584874497")) {
        var facts = [
          "Aleyküm selam, hoş geldin, uranyum reis",
          "as, sonunda geldin bazıları çok boş yapmaya başlamıştı",
          "Aleyküm selam, sen geldiğine göre eğlence başlasın",
          "as, hg, sensiz buralar çok sıkıcı",
          "Aleyküm selam reis, hoş geldin, nasılsın"
        ];
        var fact = Math.floor(Math.random() * facts.length);
        msg.reply(facts[fact]);
      } else if (msg.member.roles.has("748933991180271747")) {
        var facts = [
          "Aleyküm selam, hoş geldin, bor reis",
          "as, sonunda geldin bazıları çok boş yapmaya başlamıştı",
          "Aleyküm selam, sen geldiğine göre eğlence başlasın",
          "as, hg, sensiz buralar çok sıkıcı",
          "Aleyküm selam reis, hoş geldin, nasılsın"
        ];
        var fact = Math.floor(Math.random() * facts.length);
        msg.reply(facts[fact]);
      } else if (msg.member.roles.has("750044775079477309")) {
        var facts = [
          "Aleyküm selam, hoş geldin, booster",
          "as, sonunda geldin bazıları çok boş yapmaya başlamıştı",
          "Aleyküm selam, sen geldiğine göre eğlence başlasın",
          "as, hg, sensiz buralar çok sıkıcı",
          "Aleyküm selam reis, hoş geldin, nasılsın"
        ];
        var fact = Math.floor(Math.random() * facts.length);
        msg.reply(facts[fact]);
      } else {
        var facts = [
          "Aleyküm selam, hoş geldin",
          "as",
          "Aleyküm selam",
          "as, hg",
          "Aleyküm selam reis, hoş geldin"
        ];
        var fact = Math.floor(Math.random() * facts.length);
        msg.reply(facts[fact]);
      }
    }
    if (msg.content.toLowerCase() === "selam") {
      if (msg.author.id == "444095448425299977") {
        msg.channel.send(
          "Aleyküm selam,hoş geldin **SAHİP** " +
            `${client.users.size} Kişi sunucumuzda`
        );
      } else if (msg.member.roles.has("748933383584874497")) {
        var facts = [
          "Aleyküm selam, hoş geldin, uranyum reis",
          "as, sonunda geldin bazıları çok boş yapmaya başlamıştı",
          "Aleyküm selam, sen geldiğine göre eğlence başlasın",
          "as, hg, sensiz buralar çok sıkıcı",
          "Aleyküm selam reis, hoş geldin, nasılsın"
        ];
        var fact = Math.floor(Math.random() * facts.length);
        msg.reply(facts[fact]);
      } else if (msg.member.roles.has("748933991180271747")) {
        var facts = [
          "Aleyküm selam, hoş geldin, bor reis",
          "as, sonunda geldin bazıları çok boş yapmaya başlamıştı",
          "Aleyküm selam, sen geldiğine göre eğlence başlasın",
          "as, hg, sensiz buralar çok sıkıcı",
          "Aleyküm selam reis, hoş geldin, nasılsın"
        ];
        var fact = Math.floor(Math.random() * facts.length);
        msg.reply(facts[fact]);
      } else if (msg.member.roles.has("750044775079477309")) {
        var facts = [
          "Aleyküm selam, hoş geldin, booster",
          "as, sonunda geldin bazıları çok boş yapmaya başlamıştı",
          "Aleyküm selam, sen geldiğine göre eğlence başlasın",
          "as, hg, sensiz buralar çok sıkıcı",
          "Aleyküm selam reis, hoş geldin, nasılsın"
        ];
        var fact = Math.floor(Math.random() * facts.length);
        msg.reply(facts[fact]);
      } else {
        var facts = [
          "Aleyküm selam, hoş geldin",
          "as",
          "Aleyküm selam",
          "as, hg",
          "Aleyküm selam reis, hoş geldin"
        ];
        var fact = Math.floor(Math.random() * facts.length);
        msg.reply(facts[fact]);
      }
    }
    if (msg.content.toLowerCase() === "sea") {
      if (msg.author.id == "444095448425299977") {
        msg.channel.send(
          "Aleyküm selam,hoş geldin **SAHİP** " +
            `${client.users.size} Kişi sunucumuzda`
        );
      } else if (msg.member.roles.has("748933383584874497")) {
        var facts = [
          "Aleyküm selam, hoş geldin, uranyum reis",
          "as, sonunda geldin bazıları çok boş yapmaya başlamıştı",
          "Aleyküm selam, sen geldiğine göre eğlence başlasın",
          "as, hg, sensiz buralar çok sıkıcı",
          "Aleyküm selam reis, hoş geldin, nasılsın"
        ];
        var fact = Math.floor(Math.random() * facts.length);
        msg.reply(facts[fact]);
      } else if (msg.member.roles.has("748933991180271747")) {
        var facts = [
          "Aleyküm selam, hoş geldin, bor reis",
          "as, sonunda geldin bazıları çok boş yapmaya başlamıştı",
          "Aleyküm selam, sen geldiğine göre eğlence başlasın",
          "as, hg, sensiz buralar çok sıkıcı",
          "Aleyküm selam reis, hoş geldin, nasılsın"
        ];
        var fact = Math.floor(Math.random() * facts.length);
        msg.reply(facts[fact]);
      } else if (msg.member.roles.has("750044775079477309")) {
        var facts = [
          "Aleyküm selam, hoş geldin, booster",
          "as, sonunda geldin bazıları çok boş yapmaya başlamıştı",
          "Aleyküm selam, sen geldiğine göre eğlence başlasın",
          "as, hg, sensiz buralar çok sıkıcı",
          "Aleyküm selam reis, hoş geldin, nasılsın"
        ];
        var fact = Math.floor(Math.random() * facts.length);
        msg.reply(facts[fact]);
      } else {
        var facts = [
          "Aleyküm selam, hoş geldin",
          "as",
          "Aleyküm selam",
          "as, hg",
          "Aleyküm selam reis, hoş geldin"
        ];
        var fact = Math.floor(Math.random() * facts.length);
        msg.reply(facts[fact]);
      }
    }
    if (msg.content.toLowerCase() === "espiri yap") {
      msg.channel.send("tamam biraz düşüneyim").then(msgg => {
        msgg.delete(1000);
        var facts = [
          "- Bir gün 1 Alman 1 Fransız bide Temel uçağa binmişler... Temel osturmuş",
          "- Doktor bu ilAÇ dedi bizde yardım topladık.",
          "- Bekarlık sultanlıktır, fakat er ya da geç demokrasiye geçilir",
          "- Ayakkabıcı sıkıyorsa alma dedi, bende korktum aldım",
          "- Aklımı kaçırdım, 100.000 TL fidye istiyorum.",
          "- Çiçeğin biri solmuş diğeri de sağ.",
          "- Kalbinin sesini dinle güzelse kaset yap",
          "- Aaaaa siz çok terlemişsiniz durun size terlik getiriyim.",
          "- Ben ekmek yedim Will Smith.",
          "- Burger King, bende Vezir.",
          "- Ahmet Saz çaldı. Polis tutukladı.",
          "- Beni ayda bir sinemaya götürme, Marsta bir sinemaya götür.",
          "- İnsanların seni ezmesine izin verme; Ehliyet al, sen onları ez...",
          "- İlahi Azrail ... Sen adamı öldürürsün!",
          "- Kim vurduya gittim birazdan gelecem...",
          "- Hava korsanı uçağı kaçıracaktı ama yapamadı çünkü uçağı kaçırdı.",
          "- Geçenlerde izdivaç programında adam evim, arabam, param var dedi üç hatun aynı anda elektrik aldı. Adam bildiğin üçlü priz çıktı.",
          "- Sinemada on dakika ara dedi, aradım aradım açmadı.",
          "- Tebrikler kazandınız, şimdi tencere oldunuz!",
          "- Kaba kuvvet uygulama, kap kırılabilir.",
          "- Türkiye’nin en yeni şehri – Nevşehir",
          "- Adamın biri gülmüş, saksıya koymuşlar.",
          "- Adamın biri kızmış istemeye gelmişler.",
          "- Uzun lafın kısası : U.L.",
          "- Yağmur yağmış, kar peynir!",
          "- Sakla samanı, inekler aç kalsın.",
          "- Baraj dendi mi, akan sular durur.",
          "- Dünya dönermiş ay da köfte…",
          "- Top ağlarda, ben ağlamaz mıyım? ",
          "- Esra Erol ile - İs The Watch.",
          "29 la 2 yi toplayın çok komik oluyor"
        ];
        var fact = Math.floor(Math.random() * facts.length);
        if (facts[fact] == "29 la 2 yi toplayın çok komik oluyor") {
          setTimeout(() => {
            msg.channel.send(facts[fact]);
          }, 1100);
          setTimeout(() => {
            msg.channel.send("sjsjsjsjs");
          }, 3100);
        } else if (
          facts[fact] ==
          "- Bir gün 1 Alman 1 Fransız bide Temel uçağa binmişler... Temel osturmuş"
        ) {
          files: [
            {
              attachment: "https://i.hizliresim.com/nfLzHo.png",
              name: "temelosturmuş.jpg"
            }
          ];
        } else {
          setTimeout(() => {
            msg.channel.send(facts[fact]);
          }, 1100);
          var ss = ["0", "1", "2", "3", "4", "5"];
          var s = Math.floor(Math.random() * ss.length);

          if (ss[s] == "1") {
            var rastmes = [
              "bence komikti",
              "ben buna çok gülüyorum",
              "XD",
              "beğendinizmi",
              "O kadarda kötü değil :)"
            ];
            var rasmes = Math.floor(Math.random() * rastmes.length);
            setTimeout(() => {
              msg.channel.send(rastmes[rasmes]);
            }, 3100);
          }
        }
      });
    }
    if (msg.content.toLowerCase() === "fıkra anlat") {
      msg.channel.send("tamam biraz düşüneyim").then(msgg => {
        msgg.delete(1000);
        var facts = [
          'Temel aldığı bir daktiloyu bozuk diye geri götürdü. Satıcı;- Neresi bozuk, dün aldığında sağlamdı.Temel:- İki tane "a" yok, saat yazamıyorum.',
          "Bir adam intihar edecekmiş, yakından geçmekte olan bir adam da;- Dur! İntihar etme, demiş. Adam da;- İntihar etmemem için bir sebep söyle, demiş. Diğer adam da;- Eğer intihar edersen ölürsün, demiş. Adam da intihar etmekten vazgeçmiş.",
          "- Anne sınavdan 90 aldım.- Komşunun kızı 100 almış.- Anne komşunun kızı annesinden 200 TL almış.- Yav çocuğum bize ne elalemden. Bizi ilgilendirmez.",
          "Küçük çocuk okulun ilk günü sonunda eve döner.Annesi sorar;- Bugün okulda ne öğrendiniz?Çocuk cevaplar;- Yeterli değil, yarın tekrar gitmem gerek",
          "Bir deli hastenisnde herkes zıplıyor, Temel yerinden kımıldamıyormuş;- Biz patlamış mısırız, ben tavanın altına yapışmışım.",
          "Doktor Temele sormuş,- Bacağın nasıl?- Hala sekeyrum.- Devamlı mı?- Yok daa yürurken.",
          "Temel trene binmiş, bilet kontrol gelmiş, biletinin İstanbula olduğunu, trenin Ankaraya gittiğini söylemiş. Temel kendinden emin:- Peçi maçinist yanlış istikamete cittiğini piliy mi?",
          "Küçük çocuk ninesine;- Senin gözlüklerin her şeyi büyütüyormuş, doğru mu nine?- Evet yavrum, neden sordun?- Ne olursun nineciğim, tabağıma tatlı koyarken gözlüğünü çıkar olur mu?",
          "Temel araba sürerken kırmızı ışıkta geçmiş. Tabii bunu gören polis Temeli durdurmuş. Polis:– Ehliyet ve ruhsat beyefendi!Temel:– Verdunuzda mi isteysunuz...",
          "Temel ve Fadime uzun yıllar nikahsız yaşamaktadır. Bir gün Fadime:- Temel bu iş böyle olmuyor, evlenelim artık, demiş. Temel gayet sakin:- Bizi bu yaştan sonra kim alır Fadimem",
          "Temelin eldivenle yazı yazdığını görenler sormuş:- Niye eldivenli yazıyorsun zor olmuyor mu?- Zorluğuna zor ama el yazımın tanınmasını istemeyrum.",
          "Bektaşiye sormuşlar.- Dünya öküzün boynuzlarının üstünde duruyormuş, ne diyorsun bu işe?- Valla onu bilmem ama buna inanan öküzlerin olduğunu biliyorum, demiş.",
          "Ramazan ayında Bektaşinin birini ağzında erikle görmüşler.- Bu ne hal efendim! İftara daha çok var, demişler. Bektaşi de;- Ben bunu ağzıma koydum ki iftara kadar yumuşasın sonra yiyeceğim, demiş.",
          "Bir gün bir karınca bir file aşık olmuş. Annesi bu durumu onaylamamış.Karınca:- Bana değil karnımdakine acı, demiş."
        ];
        var fact = Math.floor(Math.random() * facts.length);
        setTimeout(() => {
          msg.channel.send(facts[fact]);
        }, 1100);
        var ss = ["0", "1", "2", "3", "4", "5"];
        var s = Math.floor(Math.random() * ss.length);
        if (ss[s] == "1") {
          var rastmes = [
            "bence komikti",
            "bunu hiç unutmam",
            "senin beğenip beğenmemen beni ilgilendirmez ben sadece işimi yapıyorum",
            "beğendinizmi",
            "hahahahahah"
          ];
          var rasmes = Math.floor(Math.random() * rastmes.length);
          setTimeout(() => {
            msg.channel.send(rastmes[rasmes]);
          }, 10000);
        }
      });
    }
    if (msg.content.toLowerCase() === "adam") {
      if (msg.author.id == "444095448425299977") {
        msg.channel.send("adam adam");
      } else {
        msg.reply("konu adamlıksa sen konuşmayacaksın!");
      }
    }
    if (msg.content.toLowerCase() === "hayatın anlamı ne") {
      msg.channel.send({
        files: [
          {
            attachment: "https://i.hizliresim.com/AnFyI2.png",
            name: "SPOILER_FILE.jpg"
          }
        ]
      });
      true;
    }
    if (msg.content.toLowerCase() === "29 la 2 yi toplayın çok komik oluyor") {
      if (msg.author.id != "747431829623013478") {
        msg.reply("espirimi neden çalıyorsun!!!!!");
      }
    }
    if (msg.content.toLowerCase() === "beta") {
      if (msg.guild.id == "557981420782616607") {
        msg.channel.send(
          "<@444095448425299977>" +
            ", " +
            msg.author +
            " bu kişi seni çağarıyor."
        );
      }
    }
    if (msg.content.toLowerCase() === "beta abi") {
      if (msg.guild.id == "557981420782616607") {
        msg.channel.send(
          "<@444095448425299977>" +
            ", " +
            msg.author +
            " bu kişi seni çağarıyor."
        );
      }
    }
    if (msg.content.toLowerCase() === "can") {
      if (msg.guild.id == "557981420782616607") {
        msg.channel.send(
          "<@444095448425299977>" +
            ", " +
            msg.author +
            " bu kişi seni çağarıyor."
        );
      }
    }
    if (msg.content.toLowerCase() === "alperen") {
      if (msg.guild.id == "557981420782616607") {
        msg.channel.send(
          "<@294513654668460032>" +
            ", " +
            msg.author +
            " bu kişi seni çağarıyor."
        );
      }
    }
    if (msg.content.toLowerCase() === "lovepk") {
      if (msg.guild.id == "557981420782616607") {
        msg.channel.send(
          "<@294513654668460032>" +
            ", " +
            msg.author +
            " bu kişi seni çağarıyor."
        );
      }
    }
    if (msg.content.toLowerCase() === "alp") {
      if (msg.guild.id == "557981420782616607") {
        msg.channel.send(
          "<@294513654668460032>" +
            ", " +
            msg.author +
            " bu kişi seni çağarıyor."
        );
      }
    }
    if (msg.channel.type == "dm") {
      msg.author.send(
        "Dostum ben bir botum seninle konuşamam sahibim ile konuşmak istersen buraya onun profilini bırakıyorum " +
          "<@444095448425299977>"
      );
      return;
    }
    if (msg.content.toLowerCase() === "bruh") {
      var ss = ["1", "2", "3", "4", "5"];
      var s = Math.floor(Math.random() * ss.length);
      if (ss[s] == "1") {
        msg.channel.send("sus bi bruh deme artık");
      }
    }
  }
});

////////////////////////

////////////////////////
const db = require("quick.db");
const ms = require("ms");

client.on("guildMemberAdd", async member => {
  let mute = member.guild.roles.find(r => r.name === "Oyuncular Şehri");
  let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`);
  let süre = db.fetch(`süre_${member.id + member.guild.id}`);
  if (!mutelimi) return;
  if (mutelimi == "muteli") {
    member.addRole(mute.id);

    member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!");
    setTimeout(function() {
      db.delete(`muteli_${member.guild.id + member.id}`);
      member.send(`<@${member.id}> Muten açıldı.`);
      member.removeRole(mute.id);
    }, ms(süre));
  }
});

client.on("message", msg => {
  const uyarıembed = new Discord.RichEmbed()
    .setColor(0x00ae86)
    .setDescription(
      ":crown: " +
        msg.author +
        "Reklam Yapmayı Kes Seni Yetkililere Söyledim :angry: :rage: "
    );

  const dmembed = new Discord.RichEmbed()
    .setTitle("Sunucunda " + msg.author.tag + " reklam yapıyor!")
    .setColor(0x00ae86)
    .setDescription(
      " " +
        msg.author.tag +
        " Sunucunda Reklam Yapıyor k?uyar komutu ile kişiyi uyara bilir k?ban Komutu İle Kişiyi Banlayabilirsin "
    )
    .addField("Kullanıcının mesajı:", "**" + msg.content + "**");

  if (
    msg.content
      .toLowerCase()
      .match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g) &&
    msg.channel.type === "text" &&
    msg.channel
      .permissionsFor(msg.guild.member(client.user))
      .has("MANAGE_MESSAGES")
  ) {
    if (msg.member.hasPermission("BAN_MEMBERS")) {
      return;
    } else {
      msg
        .delete(30)
        .then(deletedMsg => {
          deletedMsg.channel.send(uyarıembed);
          msg.guild.owner.send(dmembed).catch(e => {
            console.error(e);
          });
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
});

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});
console.log("asdasdasdadas")
client.login(ayarlar.token);
