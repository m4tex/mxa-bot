const SteamID = require('steamid')
const SteamClient = require('../modules/steamClient')
// const addToVerifier = require('./verify').addUserToVerify

let collections
(async () => ***REMOVED***
    collections = await require('../modules/databaseManager')
***REMOVED***)()

setInterval(checkUsers, 20000)
module.exports = ***REMOVED***
    name: 'connect',
    description: 'Connects your discord account with a steam account. It is not associated with the *connections* section on your discord account. The connections are being stored separately on our database.',
    usage: 'prefix connect steamid. Example: mxa connect 76561198982789899',
    execute: async function (msg, tokens) ***REMOVED***
        if (tokens[0] !== undefined && /^(([0-9])***REMOVED***17***REMOVED***)$/.test(tokens[0]) && new SteamID(tokens[0]).isValidIndividual()) ***REMOVED***
            let res = await collections.inventories.countDocuments(***REMOVED***discord: msg.author.id***REMOVED***, ***REMOVED***limit: 1***REMOVED***)
            let res2 = await collections.inventories.countDocuments(***REMOVED***steam: tokens[0]***REMOVED***, ***REMOVED***limit: 1***REMOVED***)
            if (res === 1) ***REMOVED***
                msg.channel.send("You already connected a steam account. If you want to change it, contact one of the developers (`mxa contact`)")
            ***REMOVED*** else if (res2 === 1) ***REMOVED***
                msg.channel.send("This Steam ID is already connected to a discord account. If you know this is your steam account and you want to change the discord assigned to it, contact the devs, use `mxa contact` for more info.")
            ***REMOVED*** else ***REMOVED***
                let code = genCode()
                usersToCheck.push(***REMOVED***discordID: msg.author.id, steamID: tokens[0], code: code, msg: msg, iterations: 5***REMOVED***)
                msg.channel.send("In order to verify your account, please add: `" + code + "` to your nickname. It should take 20 seconds at most, the request will expire after 80-100 seconds. You can remove the code once the bot verifies you.")
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
            msg.channel.send("Please enter a valid SteamID after the command, example: `mxa connect 76561198982789899`.")
        ***REMOVED***
    ***REMOVED***
***REMOVED***

let usersToCheck = []

async function checkUsers() ***REMOVED***
    if (usersToCheck.length === 0) ***REMOVED***
        return
    ***REMOVED***
    let personas = (await SteamClient.getPersonas([...usersToCheck.map(x => x.steamID)])).personas
    for (let i = 0; i < usersToCheck.length; i++) ***REMOVED***
        let steamId = usersToCheck[i].steamID.toString()
        let currentUser = usersToCheck[i]
        if (personas[steamId].player_name.split(/ +/).includes(usersToCheck[i].code)) ***REMOVED***
            collections.inventories.insertOne(***REMOVED***
                steam: steamId,
                discord: currentUser.discordID,
                wallet: 0,
                inventoryContents: []
            ***REMOVED***)
            currentUser.msg.reply('Verified ' + currentUser.msg.author.username + ' successfully.')
            usersToCheck.splice(i, 1)
        ***REMOVED*** else if (currentUser.iterations <= 0) ***REMOVED***
            currentUser.msg.reply('Your connecting request expired.')
            usersToCheck.splice(i, 1)
        ***REMOVED*** else ***REMOVED***
            currentUser.iterations--
        ***REMOVED***
    ***REMOVED***
***REMOVED***

const possibleCodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function genCode() ***REMOVED***
    let code = ""

    for (let i = 0; i < 7; i++) ***REMOVED***
        code += possibleCodeChars.charAt(Math.floor(Math.random() * possibleCodeChars.length))
    ***REMOVED***
    return code
***REMOVED***