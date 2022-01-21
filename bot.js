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
let collections
(async () => ***REMOVED***
    collections = await require('./modules/databaseManager')
***REMOVED***)()

//Discord.js module implementation
let discordBot = require('./modules/discordClient')

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

discordBot.on('messageCreate', async function (msg) ***REMOVED***

    let prefix = 'mxa'
    //This checks for a custom prefix on a server.
    if(await collections.prefixes.countDocuments(***REMOVED***serverID: msg.guildId***REMOVED***, ***REMOVED***limit: 1***REMOVED***))***REMOVED***
        let dbData = await collections.prefixes.find(***REMOVED***serverID: msg.guildId***REMOVED***).limit(1).next()//I read that find().limit(1) is faster than findOne() that's why I'm using it.
        prefix = dbData.bot_prefix //For some reason I couldn't directly access bot_prefix in the line above... that's why 2 lines.
    ***REMOVED***
    let tokens = msg.content.toLowerCase().split(/ +/)
    if (tokens.shift() === prefix) ***REMOVED***
        let command = tokens.shift()
        let dcCommand = discordBot.commands.get(command)
        if (dcCommand !== undefined) ***REMOVED***
            dcCommand.execute(msg, tokens)
        ***REMOVED*** else ***REMOVED***
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
    console.log('Logged into steam successfully.')
***REMOVED***)