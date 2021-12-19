const SteamUser = require('steam-user')

const TradeOfferManager = require('steam-tradeoffer-manager')
const steamClient = new SteamUser()

const manager = new TradeOfferManager(***REMOVED***
  steam: steamClient,
  language: 'en'
***REMOVED***)

steamClient.setOption('promptSteamGuardCode', false)

module.exports = steamClient