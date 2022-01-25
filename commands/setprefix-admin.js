let collections
(async () => {
    collections = await require('../modules/databaseManager.js')
})()

const discordBot = require('../modules/discordClient')

module.exports = {
    name: 'setprefix',
    description: 'Changes the prefix that distinguishes the MxaBot\'s commands.',
    usage: 'prefix setprefix newPrefix. Example: mxa setprefix !#',
    execute: async function (msg, tokens) {
        if (tokens[0] === undefined) {
            msg.channel.send('Please specify the prefix after the command. Check out `help setprefix` if you still aren\'t sure about the usage.')
        } else if (tokens[0].length > 10) {
            msg.channel.send('The prefix cannot be longer than 10 characters.')
        } else if(tokens[0] === 'mxa') {
            collections.prefixes.deleteOne({serverID: msg.guildId})
            msg.channel.send('Changed the bot\'s prefix to: ' + tokens[0] + '.')
            msg.guild.me.setNickname('M4texaBot')
        }
        else {
            await collections.prefixes.updateOne({serverID: msg.guildId}, {
                $set: {
                    serverID: msg.guildId,
                    bot_prefix: tokens[0]
                }
            }, {upsert: true})
            msg.channel.send('Changed the bot\'s prefix to: ' + tokens[0] + '.')
            msg.guild.me.setNickname('M4texaBot (prefix ' + tokens[0] + ')')
        }
    },
    permLevel: 1,
}