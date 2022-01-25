let collections
(async function db() {
   collections = await require('../modules/databaseManager.js')
})()

module.exports = {
    name: 'inv',
    description: 'Shows inventory of a user (no user in the arguments will show the senders inventory)',
    usage: 'prefix inv optionalUser. Example: mxa inv @m4tex#5886.',
    execute: async function(msg, tokens) {
        if(await collections.inventories.countDocuments({discord: msg.author.id}, {limit: 1})){
            let invData = await collections.inventories.findOne({discord: msg.author.id})
            if(invData.inventoryContents === undefined){
                msg.channel.send("Items: none.")
            }
            else
            {
                msg.channel.send("Items: " + invData.inventoryContents.join(', ') + ".")
            }
        }
        else{
            msg.channel.send("No inventory found. Use `mxa connect` to start your adventure!")
        }
    }
}