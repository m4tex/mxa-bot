let collections
(async function db() {
   collections = await require('../modules/databaseManager.js')
})()

module.exports = {
    name: 'wallet',
    description: 'Shows how many mxa credits you have!',
    usage: 'prefix wallet. Example: mxa wallet',
    execute: async function(msg, tokens) {
        if(await collections.inventories.countDocuments({discord: msg.author.id}, {limit: 1})){
            msg.reply('Your wallet balance is: ' + (await collections.inventories.findOne({discord: msg.author.id})).wallet + ' mxa coins.')
        }
        else{
            msg.reply('Couldn\'t find your inventory. Make sure you have connected your steam account.')
        }
    }
}