//imports database collections
let collections
(async function () ***REMOVED***
    collections = await require('../modules/databaseManager')
***REMOVED***)()

const SteamUser = require('steam-user')
const SteamTotp = require('steam-totp') //For generating the steam guard code
const SteamCommunity = require('steamcommunity')
const TradeOfferManager = require('steam-tradeoffer-manager')

const config = require("../config.json");

let steamClient = new SteamUser()
let community = new SteamCommunity()

const manager = new TradeOfferManager(***REMOVED***
    steam: steamClient,
    language: 'en'
***REMOVED***)

const logOnOptions = ***REMOVED***
    "accountName": config.username,
    "password": config.password,
    "twoFactorCode": SteamTotp.generateAuthCode(config.sharedSecret)
***REMOVED***

steamClient.setOption('promptSteamGuardCode', false)
steamClient.logOn(logOnOptions)

module.exports = steamClient

steamClient.on('loggedOn', function () ***REMOVED***
    steamClient.setPersona(SteamUser.EPersonaState.Online)
    steamClient.gamesPlayed(['Make sure to add me before interacting'])
    // steamClient.uploadRichPresence(730, ***REMOVED***
    //   "steam_display": "#TF_RichPresence_Display",
    //   "state": "PlayingMatchGroup",
    //   "matchgrouploc": "SpecialEvent",
    //   "currentmap": "Your mother."
    // ***REMOVED***)
    console.log('Logged into steam successfully.')
***REMOVED***)

steamClient.on('webSession', function (sessionID, cookies) ***REMOVED***
    manager.setCookies(cookies, function (err) ***REMOVED***
        if (err) ***REMOVED***
            console.log(err);
            process.exit(1); // Fatal error since we couldn't get our API key
            return;
        ***REMOVED***

        console.log("Got API key: " + manager.apiKey);
    ***REMOVED***);

    community.setCookies(cookies);
***REMOVED***);

steamClient.on('friendRelationship', (steamID, relation) => ***REMOVED***
    if (relation === 1 || relation === 5) ***REMOVED***
        return
    ***REMOVED***
    steamClient.addFriend(steamID)
***REMOVED***)

manager.on('newOffer', async offer => ***REMOVED***
    let steamID = offer.partner.getSteamID64()
    //checks for validity of the offer and if the sender is registered in the database
    if (await collections.inventories.countDocuments(***REMOVED***steam: steamID***REMOVED***, ***REMOVED***limit: 1***REMOVED***)) ***REMOVED***
        if (offer.itemsToGive.length === 0 && !offer.isGlitched() && offer.itemsToReceive.length > 0) ***REMOVED***
            offer.accept(() => ***REMOVED***
                let items = offer.itemsToReceive.map(x => ***REMOVED***name: x.name, appId: x.appid, ***REMOVED***)
                collections.inventories.updateOne(***REMOVED***steam: steamID***REMOVED***, ***REMOVED***$push: ***REMOVED***inventoryContents: ***REMOVED***$each: skinNames***REMOVED******REMOVED******REMOVED***)
                steamClient.chat.sendFriendMessage(steamID, 'Successfully deposited your skins for 1230 mxa coins.')
            ***REMOVED***)
        ***REMOVED*** else ***REMOVED***
            offer.decline(() => ***REMOVED***
                steamClient.chat.sendFriendMessage(steamID, 'The offer you sent, is invalid. That might be because you may have added items from an unsupported game. Don\'t worry, the offer got declined.')
            ***REMOVED***)
        ***REMOVED***
    ***REMOVED***
    else***REMOVED***
        steamClient.chat.sendFriendMessage(steamID, 'I couldn\'t find you in the database. Are you sure you connected your account via the discord bot?')
    ***REMOVED***
***REMOVED***)