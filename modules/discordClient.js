//Importing needed modules.
const fs = require('fs')
const config = require('../config.json')
const Discord = require('discord.js')
//Creates the client
let discordBot = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
})

//exports the client.
module.exports = discordBot
//adds a new field to the client that stores the commands.
discordBot.commands = new Discord.Collection()
//stores the list that is shown when using the 'help' command
let commandList = []

//I like how retarded it looks. This reads and imports the command modules from the /commands/ directory.
// Then adds them to the commands' collection, the one assigned to the client.
fs.readdirSync(config.localPath + 'commands/').filter(file => file.endsWith('.js'))
  .map(file => require(`${config.localPath}commands/${file}`)).forEach(command => {
  discordBot.commands.set(command.name, command)
  commandList.push(command.name)
})

//I have to implement the 'help' command from here because it needs access to the commands list and last attempts to implement it went...
//not so well... so I just decided to do it this way.
let helpCommand = {
  name: 'help',
  description: 'Displays a full list of the commands, or a description of a single command. You can even specify a command after `\'help\'` to get information about the given command.',
  execute: function (msg, tokens) {
    if(tokens[0] === undefined){
      let embed = new Discord.MessageEmbed().setColor('#0099ff').setTitle('Commands :sunglasses:')
        .setDescription(this.description)
        .addField("List of commands:", "`" + commandList.join(', ') + "`")
      msg.channel.send({
        embeds: [embed]
      })
    }
    else{
      let cmd = discordBot.commands.get(tokens[0].toLowerCase())
      if(cmd !== undefined){
        let embed = new Discord.MessageEmbed().setTitle('Command Help').addField('Command', '`' + tokens[0] + '`')
        .addField('Usage', '`' + cmd.usage + '`').addField('Description', cmd.description)
        msg.channel.send({embeds: [embed]})
      }
      else{
        msg.channel.send("Couldn't find the command: " + tokens[0] + ".")
      }
    }
  }
}
//adds the command to the commands, but it doesn't add the command to the list.
discordBot.commands.set(helpCommand.name, helpCommand)
//logs the bot into discord.
discordBot.login(config.discordToken)

//Extra stuff (cosmetic)
discordBot.on('ready', () => {
  console.info(`Bot started as: ${discordBot.user.tag}.`)
  discordBot.user.setActivity('mxa start', {type: 'PLAYING'})
})