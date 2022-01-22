const SteamUser = require('steam-user')
const SteamTotp = require('steam-totp')
const TradeOfferManager = require('steam-tradeoffer-manager')
const config = require("../config.json");
const steamClient = new SteamUser()

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
  steamClient.gamesPlayed(['mxa-bot.com :)'])
  // steamClient.uploadRichPresence(730, ***REMOVED***
  //   "steam_display": "#TF_RichPresence_Display",
  //   "state": "PlayingMatchGroup",
  //   "matchgrouploc": "SpecialEvent",
  //   "currentmap": "Your mother."
  // ***REMOVED***)
  console.log('Logged into steam successfully.')
***REMOVED***)

steamClient.on('friendRelationship', (steamID, relation) => ***REMOVED***
  if(relation === 1 || relation === 5)***REMOVED***
    return
  ***REMOVED***
  steamClient.addFriend(steamID)
***REMOVED***)