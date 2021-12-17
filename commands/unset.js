module.exports = ***REMOVED***
    name: 'unset',
    description: 'This command unsets a channel from a specified mode.',
    execute: async function (msg, args, coll) ***REMOVED***
        if (args[0] === 'dev') ***REMOVED***
            if (await coll.countDocuments(***REMOVED*** channelID: msg.channelId ***REMOVED***, ***REMOVED*** limit: 1***REMOVED***) === 1) ***REMOVED***
                await coll.deleteOne(***REMOVED*** channelID: msg.channelId ***REMOVED***)
                msg.channel.send("Removed the 'dev' mode from this channel.")
            ***REMOVED*** else ***REMOVED***
                msg.channel.send("This channel is not set to 'dev' mode.")
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
            msg.channel.send("Couldn't find channel mode: " + args[0] + ". Please make sure there are no misspellings or use 'mxa help' to get a full list of commands.")
        ***REMOVED***
    ***REMOVED***
***REMOVED***