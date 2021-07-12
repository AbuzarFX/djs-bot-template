const db = require("../../reconDB")
const { MessageEmbed } = require("discord.js")
const { PREFIX } = require("../../config")

module.exports = {
    config: {
        name: "prefix",
        description: "Change/Know The server's Prefix or the Global Prefix",
        usage: "<new prefix/reset>",
        example: "1) aki prefix = \n2) aki prefix reset",
        aliases: ["prefix"]
    },

    run: async (bot, message, args) => {
      
        try {
          let option = args[0];

            //PERMISSION
     if(!message.member.hasPermission("MANAGE_GUILD")) {

                return message.lineReplyNoMention({ embed: {
                  description: ":x: | You don't have the required permissions to use this command!"
                }})
              }
            
            if(!option) {
                let prefix = await db.get(`prefix_${message.guild.id}`)
                if (!prefix) prefix = PREFIX;
                let prefEmbed = new MessageEmbed()

                .setThumbnail(message.guild.iconURL())
                .setDescription(`My prefix for \`[${message.guild.name}]\` is  **` + `  \`${prefix}\` \n\n**Type \`${prefix}help\` for help.`)
              
              message.lineReplyNoMention(prefEmbed);
            }

            if(option.toLowerCase() === "reset") {
                db.delete(`prefix_${message.guild.id}`)
                return await message.lineReplyNoMention({ embed: {

                  description: "✅ | Successfully reset the prefix"
                }})
            }
            
            if(args[1]) {
              return message.lineReplyNoMention({ embed: {

                description: ":x: | The prefix cannot be a double argument."
              }})
            }
            
            if(args[0].length > 4) {
              return message.lineReplyNoMention({ embed: {

                description: ":x: | You cannot have a prefix more than 4 characters."
              }})
            }
            
            if(args.join("") === PREFIX) {
              db.delete(`prefix_${message.guild.id}`)
             return await message.lineReplyNoMention({ embed: {

               description: "✅ | Successfully reset the prefix"
             }})
            }
            
            db.set(`prefix_${message.guild.id}`, args[0])
          await message.lineReplyNoMention({ embed: {

            description: `✅ | Prefix successfully set to \`${args[0]}\``
          }})

          
        }
            catch(err) {
              console.log(err)
            }

        }
        
    }
