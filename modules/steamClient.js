//imports database collections
let collections
(async function () {
    collections = await require('./databaseManager.js')
})()

const SteamUser = require('steam-user')
const SteamTotp = require('steam-totp') //For generating the steam guard code
const SteamCommunity = require('steamcommunity')
const TradeOfferManager = require('steam-tradeoffer-manager')

const config = require("../config.json");

let steamClient = new SteamUser()
let community = new SteamCommunity()

const manager = new TradeOfferManager({
    steam: steamClient,
    language: 'en'
})

const logOnOptions = {
    "accountName": config.username,
    "password": config.password,
    "twoFactorCode": SteamTotp.generateAuthCode(config.sharedSecret)
}

steamClient.setOption('promptSteamGuardCode', false)
// steamClient.logOn(logOnOptions)

module.exports = steamClient

steamClient.on('loggedOn', function () {
    steamClient.setPersona(SteamUser.EPersonaState.Online)
    steamClient.gamesPlayed(['Make sure to add me before interacting'])
    // steamClient.uploadRichPresence(730, {
    //   "steam_display": "#TF_RichPresence_Display",
    //   "state": "PlayingMatchGroup",
    //   "matchgrouploc": "SpecialEvent",
    //   "currentmap": "Your mother."
    // })
    console.log('Logged into steam successfully.')
})

steamClient.on('webSession', function (sessionID, cookies) {
    manager.setCookies(cookies, function (err) {
        if (err) {
            console.log(err);
            process.exit(1); // Fatal error since we couldn't get our API key
            return;
        }

        console.log("Got API key: " + manager.apiKey);
    });

    community.setCookies(cookies);
});

steamClient.on('friendRelationship', (steamID, relation) => {
    if (relation === 1 || relation === 5) {
        return
    }
    steamClient.addFriend(steamID)
})

manager.on('newOffer', async offer => {
    let steamID = offer.partner.getSteamID64()
    //checks for validity of the offer and if the sender is registered in the database
    if (await collections.inventories.countDocuments({steam: steamID}, {limit: 1})) {
        if (offer.itemsToGive.length === 0 && !offer.isGlitched() && offer.itemsToReceive.length > 0) {
            offer.accept(() => {
                collections.inventories.updateOne({steam: steamID}, {$push: {inventoryContents: {$each: offer.itemsToReceive}}})
                steamClient.chat.sendFriendMessage(steamID, 'Successfully deposited your skins for 1230 mxa coins.')
            })
        } else {
            offer.decline(() => {
                steamClient.chat.sendFriendMessage(steamID, 'The offer you sent, is invalid. That might be because you may have added items from an unsupported game. Don\'t worry, the offer got declined.')
            })
        }
    }
    else{
        steamClient.chat.sendFriendMessage(steamID, 'I couldn\'t find you in the database. Are you sure you connected your account via the discord bot?')
    }
})