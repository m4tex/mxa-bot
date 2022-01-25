const SteamID = require('steamid')
const SteamClient = require('../modules/steamClient')
// const addToVerifier = require('./verify').addUserToVerify

let collections
(async () => {
    collections = await require('../modules/databaseManager.js')
})()

setInterval(checkUsers, 20000)
module.exports = {
    name: 'connect',
    description: 'Connects your discord account with a steam account. It is not associated with the *connections* section on your discord account. The connections are being stored separately on our database.',
    usage: 'prefix connect steamid. Example: mxa connect 76561198982789899',
    execute: async function (msg, tokens) {
        if (tokens[0] !== undefined && /^(([0-9]){17})$/.test(tokens[0]) && new SteamID(tokens[0]).isValidIndividual()) {
            let res = await collections.inventories.countDocuments({discord: msg.author.id}, {limit: 1})
            let res2 = await collections.inventories.countDocuments({steam: tokens[0]}, {limit: 1})
            if (res === 1) {
                msg.channel.send("You already have connected a steam account. If you want to change it, contact one of the developers (`mxa contact`)")
            } else if (res2 === 1) {
                msg.channel.send("This Steam ID is already connected to a discord account. If you know this is your steam account and you want to change the discord assigned to it, contact the devs, use `mxa contact` for more info.")
            } else {
                let code = genCode()
                usersToCheck.push({discordID: msg.author.id, steamID: tokens[0], code: code, msg: msg, iterations: 5})
                msg.channel.send("In order to verify your account, please add: `" + code + "` to your nickname. It should take 20 seconds at most, the request will expire after 80-100 seconds. You can remove the code once the bot verifies you.")
            }
        } else {
            msg.channel.send("Please enter a valid SteamID after the command, example: `mxa connect 76561198982789899`.")
        }
    }
}

let usersToCheck = []

async function checkUsers() {
    if (usersToCheck.length === 0) {
        return
    }
    let personas = (await SteamClient.getPersonas([...usersToCheck.map(x => x.steamID)])).personas
    for (let i = 0; i < usersToCheck.length; i++) {
        let steamId = usersToCheck[i].steamID.toString()
        let currentUser = usersToCheck[i]
        if (personas[steamId].player_name.split(/ +/).includes(usersToCheck[i].code)) {
            collections.inventories.insertOne({
                steam: steamId,
                discord: currentUser.discordID,
                wallet: 0,
                inventoryContents: []
            })
            currentUser.msg.reply('Verified ' + currentUser.msg.author.username + ' successfully.')
            usersToCheck.splice(i, 1)
        } else if (currentUser.iterations <= 0) {
            currentUser.msg.reply('Your connecting request expired.')
            usersToCheck.splice(i, 1)
        } else {
            currentUser.iterations--
        }
    }
}

const possibleCodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function genCode() {
    let code = ""

    for (let i = 0; i < 7; i++) {
        code += possibleCodeChars.charAt(Math.floor(Math.random() * possibleCodeChars.length))
    }
    return code
}