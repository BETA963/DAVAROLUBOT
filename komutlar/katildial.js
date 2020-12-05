const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
exports.run = async (receivedMessage,  msg, args) => {
  const list = receivedMessage.guilds.get("557981420782616607"); 
      list.members.forEach(member => {
        member.removeRole("761581110781411338")
      });
    }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["çekilişsıfırla","çekilişreset"],
  permLevel: 1
};
 
exports.help = {
  name: "çekilişsıfırla",
  description: "",
  usage: ""
};