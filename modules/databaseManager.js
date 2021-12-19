//This module connects to the database and exports the awaitable promise.

console.log('Establishing a connection with the database... ')

const MongoClient = require('mongodb').MongoClient

//Collections
var discord_bound_channels
var steam_user_data
var virtual_inventories

async function connection() ***REMOVED***
  var database = await MongoClient.connect('mongodb://localhost:27017/dcsteam_bot')
  discord_bound_channels = await database.db("dcsteam_bot").collection("discord_bound_channels")
  steam_user_data = await database.db("dcsteam_bot").collection("steam_user_data")
  virtual_inventories = await database.db("dcsteam_bot").collection("virtual_inventories")

  var collections = ***REMOVED***
    devchannels: discord_bound_channels,
    user_data: steam_user_data,
    inventories: virtual_inventories
  ***REMOVED***

  console.log('Connection established.')

  return collections
***REMOVED***

var connPromise = connection()

module.exports = connPromise