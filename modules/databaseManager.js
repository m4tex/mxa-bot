//This module connects to the database and exports the awaitable promise.

console.log('Establishing a connection with the database... ')

const MongoClient = require('mongodb').MongoClient

//Collections
let server_prefixes
let steam_user_data
let virtual_inventories
let discord_tickets

async function connection() {
  let database = await MongoClient.connect('mongodb://localhost:27017/dcsteam_bot')
  server_prefixes = await database.db("dcsteam_bot").collection("server_prefixes")
  steam_user_data = await database.db("dcsteam_bot").collection("steam_user_data")
  virtual_inventories = await database.db("dcsteam_bot").collection("virtual_inventories")
  discord_tickets = await database.db('dcsteam_bot').collection('discord_tickets')

  let collections = {
    prefixes: server_prefixes,
    steam_data: steam_user_data,
    inventories: virtual_inventories,
    dc_tickets: discord_tickets,
  }

  console.log('Connection established.')

  return collections
}

let connPromise = connection()

module.exports = connPromise