let collections
(async function () ***REMOVED***
    collections = await require('../modules/databaseManager')
***REMOVED***)()

module.exports = ***REMOVED***
    name: 'createticket',
    description: 'Creates a ticket/report that the creator can later read',
    usage: 'prefix createticket issue. Example: mxa createticket Wegblad stole my steam account, but I got it back. The only problem is that it\'s connected to his discord account, can you somehow remove him so I can connect my account?',
    execute: async function (msg, tokens) ***REMOVED***
        if (!msg.author.bot) ***REMOVED***
            if (await collections.dc_tickets.countDocuments(***REMOVED***dcid: msg.author.id***REMOVED***) < 5) ***REMOVED***
                if (tokens[0] !== undefined) ***REMOVED***
                    collections.dc_tickets.insertOne(***REMOVED***
                        user: msg.author.username,
                        dcid: msg.author.id,
                        issue: tokens.join(' '),
                        date: new Date()
                    ***REMOVED***)
                    msg.reply('Your ticket got sent successfully.')
                ***REMOVED*** else ***REMOVED***
                    msg.reply('You have to specify the issue after the command. Use `help createticket` for more details.')
                ***REMOVED***
            ***REMOVED*** else ***REMOVED***
                msg.reply('Sorry, you reached the maximum ticket limit of 5. You are most likely spamming, which is why the limit exists in the first place. You can\'t speed up the process like that unfortunately. The tickets are reviewed in chronological order.')
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
            msg.channel.send('Bot clients can\'t create a ticket. Use a normal discord account.')
        ***REMOVED***
    ***REMOVED***
***REMOVED***