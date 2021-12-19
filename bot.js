//#region Imports and Node modules implementation
//Importing the file system module.
const fs = require('fs')
//Importing the fetch method.
const fetch = require('node-fetch')

//Importing the configuration file.
const config = require('./config.json')

//Extra data stored outside.
const extraData = require('./modules/commandData')

//MongoDB implementation (imports collections)
var collections
async function database()***REMOVED***
  collections = await require('./modules/databaseManager')
***REMOVED***
database()

//Discord.js module implementation
const Discord = require('discord.js')
const discordBot = new Discord.Client(***REMOVED***
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
***REMOVED***);

discordBot.commands = new Discord.Collection()

var commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')).map(file => require(`./commands/$***REMOVED***file***REMOVED***`))
commandFiles.forEach(command => ***REMOVED***
   discordBot.commands.set(command.name, command)
   console.log(command.name);
***REMOVED***);

//mxa help command
var commandNames = Array.from(discordBot.commands).map(x => " " + x[0]).toString()
var help = ***REMOVED***
  name: 'help',
  execute: function(msg, tokens)***REMOVED***
    var embed = new Discord.MessageEmbed().setColor('#0099ff').setTitle('Commands :sunglasses:').addField("List of commands:", `$***REMOVED***commandNames***REMOVED***`)
    msg.channel.send(***REMOVED***embeds: [embed]***REMOVED***)
  ***REMOVED***
***REMOVED***

discordBot.commands.set(help.name, help)

discordBot.login(config.discordToken);

//Steam modules implementation
const steamClient = require('./modules/steamClient')
const SteamUser = require('steam-user')

const logOnOptions = ***REMOVED***
  "accountName": config.username,
  "password": config.password
***REMOVED***
//#endregion

//Here begins the actual code
discordBot.on('ready', () => ***REMOVED***
  console.info(`Bot started as: $***REMOVED***discordBot.user.tag***REMOVED***.`)
  steamClient.logOn(logOnOptions)
***REMOVED***);

discordBot.on('message', function (msg) ***REMOVED***
  var tokens = msg.content.split(/ +/)
  if(tokens.shift() === 'mxa')***REMOVED***
    var command = tokens.shift().toLowerCase()
    var dcCommand = discordBot.commands.get(command)
    if(dcCommand !== undefined)***REMOVED***
      dcCommand.execute(msg, tokens)
    ***REMOVED***
    else***REMOVED***
      msg.channel.send("This command doesn't exist. Check out `mxa help` to see a full list of the commands.")
    ***REMOVED***
  ***REMOVED***
***REMOVED***)

steamClient.on('steamGuard', async function (domain, callback) ***REMOVED***
  extraData.steamGuardCallback = callback;
  sendToDev("Enter steam guard code for: m4tex.")
***REMOVED***)

steamClient.on('loggedOn', function () ***REMOVED***
  steamClient.setPersona(SteamUser.EPersonaState.Online)
  sendToDev("Logged into steam successfuly.")
  extraData.loggedOn = true;
***REMOVED***)

async function sendToDev(message)***REMOVED***
  channels = await collections.devchannels.find(***REMOVED******REMOVED***)
  channels.forEach(channel => ***REMOVED***
    discordBot.channels.cache.get(channel.channelID).send(message)
  ***REMOVED***)
***REMOVED***