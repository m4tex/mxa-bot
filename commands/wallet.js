let collections
(async function db() ***REMOVED***
   collections = await require('../modules/databaseManager')
***REMOVED***)()

module.exports = ***REMOVED***
    name: 'wallet',
    description: 'Shows how many mxa credits you have!',
    usage: 'prefix wallet. Example: mxa wallet',
    execute: async function(msg, tokens) ***REMOVED***
        if(collections.inventories.countDocuments(***REMOVED***discord: msg.authorId***REMOVED***))***REMOVED***
            msg.reply('Your wallet balance is: ' + (await collections.inventories.findOne(***REMOVED***discord: msg.author.id***REMOVED***)).wallet + ' mxa coins.')
        ***REMOVED***
        else***REMOVED***
            msg.reply('Couldn\'t find your inventory. Make sure you have connected your steam account.')
        ***REMOVED***
    ***REMOVED***
***REMOVED***