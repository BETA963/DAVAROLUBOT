const Discord = require('discord.js');
module.exports = member => {
    let username = member.user.username;
    member.sendMessage('😎Sunucuya Hoşgeldin **' + username + '** Eğleniceğini Düşünüyorum!');
};
