module.exports = async function (msg) ***REMOVED***
    if (msg.content === "mxa set dev") ***REMOVED***
      var res = await discord_bound_channels.find(***REMOVED*** channelID : msg.channelId ***REMOVED***).count()
      if (res > 0) ***REMOVED***
        msg.channel.send("This channel is already set to dev mode")
      ***REMOVED***
      else***REMOVED***
        discord_bound_channels.insert(***REMOVED*** channelID : msg.channelId ***REMOVED***)
        msg.channel.send("Set this channel to dev mode")
      ***REMOVED***
    ***REMOVED***
***REMOVED***