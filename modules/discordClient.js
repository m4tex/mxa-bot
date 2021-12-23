//Importing the file system module.
const fs = require('fs')

//Importing config
const config = require('../config.json')

const Discord = require('discord.js')

var discordBot = new Discord.Client(***REMOVED***
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
***REMOVED***);

discordBot.commands = new Discord.Collection()
var commandFiles
var commandList = []

commandFiles = fs.readdirSync(config.localPath + 'commands/').filter(file => file.endsWith('.js'))
  .map(file => require(`$***REMOVED***config.localPath***REMOVED***commands/$***REMOVED***file***REMOVED***`))

commandFiles.forEach(command => ***REMOVED***
  discordBot.commands.set(command.name, command)
  commandList.push(command.name)
***REMOVED***);

var helpCommand = ***REMOVED***
  name: 'help',
  description: 'Displays a full list of the commands, or a description of a single command. Usage: `mxa help command`',
  execute: function (msg, tokens) ***REMOVED***
    var embed = new Discord.MessageEmbed().setColor('#0099ff').setTitle('Commands :sunglasses:')
      .setDescription(this.description)
      .addField("List of commands:", "`" + commandList.join(', ') + " `")
    msg.channel.send(***REMOVED***
      embeds: [embed]
    ***REMOVED***)
  ***REMOVED***
***REMOVED***

discordBot.commands.set(helpCommand.name, helpCommand)

discordBot.login(config.discordToken);

module.exports = discordBot