var collections
async function db() ***REMOVED***
   collections = await require('../modules/databaseManager')
***REMOVED***
db()

module.exports = ***REMOVED***
    name: 'inv',
    description: 'Shows inventory of a user (no user in the arguments will show the senders inventory)',
    execute: async function(msg, tokens) ***REMOVED***
        var res = await collections.inventories.countDocuments(***REMOVED*** discord : msg.author.id ***REMOVED***, ***REMOVED*** limit: 1 ***REMOVED***)
        if(res === 1)***REMOVED***
            var invData = await collections.inventories.find(***REMOVED*** discord : msg.author.id ***REMOVED***).limit(1)
            if(invData.inventoryContents === undefined)***REMOVED***
                msg.channel.send("Items: none.")
            ***REMOVED***
            else
            ***REMOVED***
                msg.channel.send("Items: " + invData.inventoryContents.toString() + ".")
            ***REMOVED***
        ***REMOVED***
        else***REMOVED***
            msg.channel.send("No inventory found. Use `mxa connect` to begin your adventure!")
        ***REMOVED***
    ***REMOVED***
***REMOVED***