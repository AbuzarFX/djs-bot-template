const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
    name: 'uptime',
    description: 'Returns the uptime of the bot.',
    aliases: ["upt"]
    },
    run: async (bot, message, args) => {


        {
            let days = Math.floor(bot.uptime / 86400000);
            let hours = Math.floor(bot.uptime / 3600000) % 24;
            let minutes = Math.floor(bot.uptime / 60000) % 60;
            let seconds = Math.floor(bot.uptime / 1000) % 60;
    
            const embed = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                .setTitle(`Uptime #${message.guild.shard.id}`)

                .setDescription(`\`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds\``)
                .setThumbnail(bot.user.displayAvatarURL())
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true}))
  
            message.lineReplyNoMention(embed);
 
        }
    }
}