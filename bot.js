//#region Imports and Node modules implementation
//Importing the configuration file.

const config = require('./config.json')

//MongoDB implementation (imports collections)
let collections
(async () => ***REMOVED***
    collections = await require('./modules/databaseManager.js')
***REMOVED***)()

//Discord.js module implementation
const discordBot = require('./modules/discordClient')
//Steam modules implementation
const steamClient = require('./modules/steamClient')

//#endregion

//Here begins the actual code
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
            //This abomination takes care of permission restrictions for admin or dev commands. undefined = no permission requirements, 1 = for admins or above, 2 = for devs
            if (!dcCommand.hasOwnProperty('permLevel') || (dcCommand.permLevel === 1 && msg.member.permissions.has('ADMINISTRATOR') ||
                (dcCommand.permLevel === 1 && msg.author.id === config.devDiscordId)|| (dcCommand.permLevel === 2 && msg.author.id === config.devDiscordId))) ***REMOVED***
                dcCommand.execute(msg, tokens)
            ***REMOVED*** else ***REMOVED***
                msg.channel.send('You don\'t have permissions to execute that command.')
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
            msg.channel.send("This command doesn't exist. Check out `mxa help` to see a full list of the commands.")
        ***REMOVED***
    ***REMOVED***
***REMOVED***)