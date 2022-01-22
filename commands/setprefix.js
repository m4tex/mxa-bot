let collections
(async () => ***REMOVED***
    collections = await require('../modules/databaseManager')
***REMOVED***)()

module.exports = ***REMOVED***
    name: 'setprefix',
    description: 'Changes the prefix that distinguishes the MxaBot\'s commands.',
    usage: 'prefix setprefix newPrefix. Example: mxa setprefix !#',
    execute: async function (msg, tokens) ***REMOVED***
        if (tokens[0] === undefined) ***REMOVED***
            msg.channel.send('Please specify the prefix after the command. Check out `help setprefix` if you still aren\'t sure about the usage.')
        ***REMOVED*** else if (tokens[0].length > 10) ***REMOVED***
            msg.channel.send('The prefix cannot be longer than 10 characters.')
        ***REMOVED*** else if(tokens[0] === 'mxa') ***REMOVED***
            collections.prefixes.deleteOne(***REMOVED***serverID: msg.guildId***REMOVED***)
            msg.channel.send('Changed the bot\'s prefix to: ' + tokens[0] + '.')
        ***REMOVED***
        else ***REMOVED***
            await collections.prefixes.updateOne(***REMOVED***serverID: msg.guildId***REMOVED***, ***REMOVED***
                $set: ***REMOVED***
                    serverID: msg.guildId,
                    bot_prefix: tokens[0]
                ***REMOVED***
            ***REMOVED***, ***REMOVED***upsert: true***REMOVED***)
            msg.channel.send('Changed the bot\'s prefix to: ' + tokens[0] + '.')
        ***REMOVED***
    ***REMOVED***
***REMOVED***