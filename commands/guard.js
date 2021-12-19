var collections
async function db() ***REMOVED***
   collections = await require('../modules/databaseManager')
***REMOVED***
db()

const extraData = require('../modules/commandData')

module.exports = ***REMOVED***
    name: 'guard',
    description: 'Enters the steam bot steam guard code.',
    execute: function (msg, tokens) ***REMOVED***
        if (extraData.loggedOn === false) ***REMOVED***
            extraData.steamGuardCallback(tokens[0])
        ***REMOVED*** else ***REMOVED***
            msg.channel.send("The bot is already logged into the account.")
        ***REMOVED***
    ***REMOVED***
***REMOVED***