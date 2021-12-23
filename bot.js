//#region Imports and Node modules implementation
//Importing the configuration file.
const config = require('./config.json')
//Imports the readline module that allows to await input in the console.
const readline = require('readline')
const rl = readline.createInterface(***REMOVED***
  input: process.stdin,
  output: process.stdout
***REMOVED***);
//MongoDB implementation (imports collections)
var collections
(async () => ***REMOVED***
  collections = await require('./modules/databaseManager')
***REMOVED***)()

//Discord.js module implementation
var discordBot = require('./modules/discordClient')

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
  // steamClient.logOn(logOnOptions)
***REMOVED***);

discordBot.on('messageCreate', function (msg) ***REMOVED***
  var tokens = msg.content.toLowerCase().split(/ +/)
  if(tokens.shift() === 'mxa')***REMOVED***
    var command = tokens.shift()
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
  rl.question('Input Steam Guard Code: ', code => ***REMOVED***
    callback(code)
  ***REMOVED***)
***REMOVED***)

steamClient.on('loggedOn', function () ***REMOVED***
  steamClient.setPersona(SteamUser.EPersonaState.Online)
  sendToDev("Logged into steam successfuly.")
  extraData.loggedOn = true;
***REMOVED***)