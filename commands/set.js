var collections
async function db() ***REMOVED***
   collections = await require('../modules/databaseManager')
***REMOVED***
db()

module.exports = ***REMOVED***
  name: "set",
  description: "Assigns channel's purpose",
  execute: async function(msg, args) ***REMOVED***
    if (args[0] === 'dev') ***REMOVED***
      var res = await collections.devchannels.countDocuments(***REMOVED***channelID: msg.channelId***REMOVED***, ***REMOVED*** limit: 1***REMOVED***)
      if (res === 1) ***REMOVED***
        msg.channel.send("This channel is already set to dev mode.")
      ***REMOVED*** else ***REMOVED***
        collections.devchannels.insertOne(***REMOVED***channelID: msg.channelId***REMOVED***)
        msg.channel.send("Set this channel to dev mode.")
      ***REMOVED***
    ***REMOVED***
    else***REMOVED***
      msg.channel.send("Couldn't find channel mode: " + args[0] + ". Please make sure there are no misspellings or use `mxa help` to get a full list of commands.")
    ***REMOVED***
  ***REMOVED***
***REMOVED***