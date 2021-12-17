module.exports = ***REMOVED***
    name: 'guard',
    description: 'Enters the steam bot steam guard code.',
    execute: function (msg, tokens, extra) ***REMOVED***
        if (extra.canSend === true) ***REMOVED***
            extra.guardCallback(tokens[0])
        ***REMOVED*** else ***REMOVED***
            msg.channel.send("The bot is already logged into the account.")
        ***REMOVED***
    ***REMOVED***
***REMOVED***