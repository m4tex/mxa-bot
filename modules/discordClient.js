//Importing the file system module.
const fs = require('fs')

//Importing config
const config = require('../config.json')

const Discord = require('discord.js')

var discordBot = new Discord.Client(***REMOVED***
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
***REMOVED***);

discordBot.commands = new Discord.Collection()
var commandList = []

//I like how retarded it looks
fs.readdirSync(config.localPath + 'commands/').filter(file => file.endsWith('.js'))
  .map(file => require(`$***REMOVED***config.localPath***REMOVED***commands/$***REMOVED***file***REMOVED***`)).forEach(command => ***REMOVED***
  discordBot.commands.set(command.name, command)
  commandList.push(command.name)
***REMOVED***);

//I have to implement the command from here because it needs access to the commands and last attempts to do it went.. 
//not so well.. so I just decided this is the cleanest way..

var helpCommand = ***REMOVED***
  name: 'help',
  description: 'Displays a full list of the commands, or a description of a single command. Usage: `mxa help command`',
  execute: function (msg, tokens) ***REMOVED***
    if(tokens[0] === undefined)***REMOVED***
      var embed = new Discord.MessageEmbed().setColor('#0099ff').setTitle('Commands :sunglasses:')
        .setDescription(this.description)
        .addField("List of commands:", "`" + commandList.join(', ') + "`")
      msg.channel.send(***REMOVED***
        embeds: [embed]
      ***REMOVED***)
    ***REMOVED***
    else***REMOVED***
      var cmd = discordBot.commands.get(tokens[0].toLowerCase())
      if(cmd !== undefined)***REMOVED***
        var embed = new Discord.MessageEmbed().setTitle('Command Help').addField('Command', '`' + tokens[0] + '`')
        .addField('Usage', '`' + cmd.usage + '`').addField('Description', cmd.description)
        msg.channel.send(***REMOVED***embeds: [embed]***REMOVED***)
      ***REMOVED***
      else***REMOVED***
        msg.channel.send("Couldn't find the command: " + tokens[0] + ".")
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

discordBot.commands.set(helpCommand.name, helpCommand)

discordBot.login(config.discordToken);

module.exports = discordBot