//This module connects to the database and exports the awaitable promise.

console.log('Establishing a connection with the database... ')

const MongoClient = require('mongodb').MongoClient

//Collections
let server_prefixes
let steam_user_data
let virtual_inventories

async function connection() ***REMOVED***
  let database = await MongoClient.connect('mongodb://localhost:27017/dcsteam_bot')
  server_prefixes = await database.db("dcsteam_bot").collection("server_prefixes")
  steam_user_data = await database.db("dcsteam_bot").collection("steam_user_data")
  virtual_inventories = await database.db("dcsteam_bot").collection("virtual_inventories")

  let collections = ***REMOVED***
    prefixes: server_prefixes,
    steam_data: steam_user_data,
    inventories: virtual_inventories
  ***REMOVED***

  console.log('Connection established.')

  return collections
***REMOVED***

let connPromise = connection()

module.exports = connPromise