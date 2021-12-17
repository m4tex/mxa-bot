//#region Imports and Node modules implementation

//Importing the configuration file.
const config = require('./config.json')

//MongoDB implementation
const MongoClient = require('mongodb').MongoClient

console.log('Establishing a connection with the database... ');

var database
var discord_bound_channels
var steam_user_data

async function connection() ***REMOVED***
  database = await MongoClient.connect('mongodb://localhost:27017/dcsteam_bot')
  discord_bound_channels = await database.db("dcsteam_bot").collection("discord_bound_channels")
  steam_user_data = await database.db("dcsteam_bot").collection("steam_user_data")

  console.log('Connection established.');
***REMOVED***
connection()


//Discord.js module implementation
const Discord = require('discord.js')
const commandHandler = require('./commands')

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
  console.info(`Bot started as: $***REMOVED***discordBot.user.tag***REMOVED***.`)
  steamClient.logOn(logOnOptions);
***REMOVED***);

discordBot.on('message', commandHandler);

steamClient.on('steamGuard', async function(domain, callback) ***REMOVED***
  channels = await discord_bound_channels.find(***REMOVED******REMOVED***)
  channels.forEach(channel => ***REMOVED***
    discordBot.channels.cache.get(channel.channelID).send("Enter Steam guard for the bot.")
  ***REMOVED***);
***REMOVED***)

steamClient.on('loggedOn', function () ***REMOVED***
  console.log('Logged into steam.')
***REMOVED***)

steamClient.on('webSession', function (sessionID, cookies) ***REMOVED***

***REMOVED***)