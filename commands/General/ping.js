const { MessageEmbed } = require('discord.js');

module.exports = {
config: {
    name: 'ping',
    description: "Returns the bot ping.",

},
run: async(bot, message, args) => {


    const embed = new MessageEmbed()
    .setDescription('`Pinging...`')
  
  const msg = await message.lineReplyNoMention(embed);
  const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp; // Check if edited
  const latency = `\`\`\`ini\n[ ${Math.floor(msg.createdTimestamp - timestamp)}ms ]\`\`\``;
  const apiLatency = `\`\`\`ini\n[ ${Math.round(message.client.ws.ping)}ms ]\`\`\``;
  embed.setTitle(`Pong! :ping_pong:`)
    .setDescription('')
    .addField(`Latency #${message.guild.shard.id}`, latency, true)
    .addField('API Latency', apiLatency, true)
    .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp();
    
  msg.edit(embed);


    }
}