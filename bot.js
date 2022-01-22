//#region Imports and Node modules implementation
//Importing the configuration file.
const config = require('./config.json')
//Imports the readline module that allows to await input in the console.
// const readline = require('readline')
// const rl = readline.createInterface(***REMOVED***
//     input: process.stdin,
//     output: process.stdout
// ***REMOVED***);
//MongoDB implementation (imports collections)
let collections
(async () => ***REMOVED***
    collections = await require('./modules/databaseManager')
***REMOVED***)()

//Discord.js module implementation
let discordBot = require('./modules/discordClient')

//Steam modules implementation
const steamClient = require('./modules/steamClient')
const SteamTotp = require('steam-totp')
const SteamUser = require('steam-user')

const logOnOptions = ***REMOVED***
    "accountName": config.username,
    "password": config.password,
    "twoFactorCode": SteamTotp.generateAuthCode(config.sharedSecret)
***REMOVED***
//#endregion

//Here begins the actual code
discordBot.on('ready', () => ***REMOVED***
    console.info(`Bot started as: $***REMOVED***discordBot.user.tag***REMOVED***.`)
    steamClient.logOn(logOnOptions)
    discordBot.user.setActivity('mxa start', ***REMOVED***type: 'PLAYING'***REMOVED***)
***REMOVED***);

discordBot.on('messageCreate', async function (msg) ***REMOVED***

    let prefix = 'mxa'
    //This checks for a custom prefix on a server.
    if (await collections.prefixes.countDocuments(***REMOVED***serverID: msg.guildId***REMOVED***, ***REMOVED***limit: 1***REMOVED***)) ***REMOVED***
        prefix = (await collections.prefixes.findOne(***REMOVED***serverID: msg.guildId***REMOVED***)).bot_prefix
    ***REMOVED***
    let tokens = msg.content.toLowerCase().split(/ +/)
    if (tokens.shift() === prefix) ***REMOVED***
        let command = tokens.shift()
        let dcCommand = discordBot.commands.get(command)
        if (dcCommand !== undefined) ***REMOVED***
            if (!dcCommand.hasOwnProperty('permLevel') || (dcCommand.permLevel === 1 && msg.member.permissions.has('ADMINISTRATOR') || (dcCommand.permLevel === 2 && msg.author.id === config.devDiscordId))) ***REMOVED***
                dcCommand.execute(msg, tokens)
            ***REMOVED*** else ***REMOVED***
                msg.channel.send('You don\'t have permissions to execute that command.')
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
            msg.channel.send("This command doesn't exist. Check out `mxa help` to see a full list of the commands.")
        ***REMOVED***
    ***REMOVED***
***REMOVED***)

//Old steamguard code, this process in now automatic thanks to the identity secret and the steam-totp module.
// steamClient.on('steamGuard', async function (domain, callback) ***REMOVED***
//     rl.question('Input Steam Guard Code: ', code => ***REMOVED***
//         callback(code)
//     ***REMOVED***)
// ***REMOVED***)

steamClient.on('loggedOn', function () ***REMOVED***
    steamClient.setPersona(SteamUser.EPersonaState.Online)
    console.log('Logged into steam successfully.')
***REMOVED***)