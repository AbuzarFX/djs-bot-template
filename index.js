const { Client, Collection, MessageEmbed } = require("discord.js")

const bot = new Client();
module.exports = bot;
const { PREFIX, TOKEN } = require("./config")
const db = require("./reconDB")
//const DBL = require("dblapi.js");
require("discord-reply")
//Defining Collections


bot.commands = new Collection();
bot.aliases = new Collection();




["commands", "aliases"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handler/${x}`)(bot));


//const dbl = new DBL('TOKEN', bot);
//dbl.on('posted', () => {
 // console.log('Server count posted!');
//})

//dbl.on('error', e => {
// console.log(`Oops! ${e}`);
//})

bot.on("message", async message => {
    if (message.author.bot || message.channel.type === "dm") return;
    
    //Prefix fetching for each guild to support multi guild changeable prefix
    let prefix;
    try {
        let fetch = await db.get(`prefix_${message.guild.id}`)
        if(fetch === undefined) {
            prefix = PREFIX
        }

        else {
            prefix = fetch
        }
    }
    catch(e) {
        console.log(e) //console logging any error
    };

    //On mentioning the bot it will display the message [My prefix : PREFIX for the paticular guild]
    try{
        if(message.mentions.has(bot.user.id) && !message.content.includes("@everyone") && !message.content.includes("@here")  && !message.author.bot) {

            const embed = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())
            .setTitle("My configuration for this guild are: ")
            .setDescription(`My prefix in the server \`[${message.guild.name}]\` is : \`${prefix}\`\n\nUse \`${prefix}help\` for more information.`)


            message.lineReplyNoMention(embed)

        }
    }

    catch(e) {
        console.log(e)
    }

})




bot.on('guildCreate', guild => {
     try {
      const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
      channel.send(`Thank you for adding me to your server!`)
     }catch(err) {
         console.log(err)
     }
})




//Start the bot
bot.login(TOKEN)


