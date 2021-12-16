//#region Imports and Node modules implementation

//Importing the configuration file.
const config = require('./config.json')

//MongoDB implementation
const database = require('./db_connect')('dcsteam_bot')

//Discord.js module implementation
const Discord = require('discord.js')

const discordBot = new Discord.Client(***REMOVED***
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
***REMOVED***);

discordBot.login(config.discordToken);

//Steam modules implementation
const SteamUser = require('steam-user')
const TradeOfferManager = require('steam-tradeoffer-manager')
const steamClient = new SteamUser()

const logOnOptions = ***REMOVED***
  "accountName": config.username,
  "password": config.password
***REMOVED***

const manager = new TradeOfferManager(***REMOVED***
  steam: steamClient,
  language: 'en'
***REMOVED***)

steamClient.setOption('promptSteamGuardCode', false)

//#endregion

//Here begins the actual code
discordBot.on('ready', () => ***REMOVED***
  console.info(`Logged in as $***REMOVED***discordBot.user.tag***REMOVED***!`)
  steamClient.logOn(logOnOptions);
***REMOVED***);

discordBot.on('message', msg => ***REMOVED***
  if (msg.content === "!bind") ***REMOVED***
    
  ***REMOVED***
***REMOVED***);

steamClient.on('steamGuard', (domain, callback) => ***REMOVED***

***REMOVED***)

steamClient.on('loggedOn', function () ***REMOVED***
  console.log('Logged into steam.')
***REMOVED***)

steamClient.on('webSession', function (sessionID, cookies) ***REMOVED***

***REMOVED***)

async function discordCommand(command, callback) ***REMOVED***

***REMOVED***