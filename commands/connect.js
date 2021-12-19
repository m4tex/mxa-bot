const steamClient = require('../modules/steamClient')
const SteamID = require('steamid')

var collections
(async () => ***REMOVED*** collections = await require('../modules/databaseManager') ***REMOVED***)()

module.exports = ***REMOVED***
    name: 'connect',
    description: 'Connects your discord account with a steam account. It is not associated with the `connections` section on your account. The connections are being stored separately on our database for security reasons.)',
    execute: async function (msg, tokens) ***REMOVED***
        if (tokens[0] !== undefined && new SteamID(tokens[0]).isValidIndividual()) ***REMOVED***
            var res = await collections.inventories.countDocuments(***REMOVED***discord: msg.author.id***REMOVED***, ***REMOVED***limit: 1***REMOVED***)
            var res2 = await collections.inventories.countDocuments(***REMOVED*** steam: tokens[0] ***REMOVED***, ***REMOVED***limit: 1***REMOVED***)
            if(res === 1)***REMOVED***
                msg.channel.send("You already connected a steam account. If you want to change it, contact one of the developers (`mxa contact`)")
            ***REMOVED***
            else if(res2 === 1)***REMOVED***
                msg.channel.send("This Steam ID is already connected to a discord account. If you know this is your steam account and you want to change the discord assigned to it, contact the devs, use `mxa contact` for more info.")
            ***REMOVED***
            else ***REMOVED***
                var code = genCode()
                usersToCheck.push(***REMOVED*** discordId: msg.author.id, steamId: tokens[0], code: code, msg: msg, iterations: 36 ***REMOVED***)
                msg.channel.send("In order to verify your account, please add: `" + code + "` to your nickname. You can remove the code once the bot verifies you.")
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
            msg.channel.send("Please enter a valid SteamID after the command, example: `mxa connect 76561198982789899`.")
        ***REMOVED***
    ***REMOVED***
***REMOVED***

const possibleCodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

var usersToCheck = [] //Stores what users to await for verification

//Example of a connects item: ***REMOVED*** discordId: 1032910239, steamId: 1203910239120, code: TW02FOS, msg: 1023910293109, iterations: 36 ***REMOVED*** 36 iterations = 180 senconds = 3 minutes...

async function checkUsers() ***REMOVED***
    if(usersToCheck.length > 0)***REMOVED***
        usersToCheck.forEach(async user => ***REMOVED***
            if((await steamClient.getPersonas([user.steamId])).personas[user.steamId].player_name.split(/ +/).includes(user.code))***REMOVED***
                user.msg.channel.send("Verified " + user.msg.author.username + " successfuly.")
                collections.inventories.insertOne(***REMOVED*** steam: user.steamId, discord: user.discordId, wallet: 0, inventoryContents: [] ***REMOVED***)
                for(var i = 0; i < usersToCheck.length; i++)***REMOVED***
                    if(usersToCheck[i] === user)***REMOVED***
                        usersToCheck.splice(i, 1)
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***)
    ***REMOVED***
***REMOVED***

setInterval(checkUsers, 5000)

function genCode() ***REMOVED***
    var code = ""

    for (let i = 0; i < 7; i++) ***REMOVED***
        code += possibleCodeChars.charAt(Math.floor(Math.random() * possibleCodeChars.length))
    ***REMOVED***
    return code
***REMOVED***

async function createInventory(msg, steamId) ***REMOVED***
    var res = await collections.inventories.countDocuments(***REMOVED***userID: msg.author.id***REMOVED***, ***REMOVED***limit: 1***REMOVED***)
    ***REMOVED***
        await collections.inventories.insertOne(***REMOVED***
            discord: msg.author.id,
            steam: steamid,
            inventoryContents: []
        ***REMOVED***)
        msg.channel.send("Created an inventory for :" + msg.author.username + ".")
    ***REMOVED***
***REMOVED***