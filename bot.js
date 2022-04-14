//#region Imports and Node modules implementation
//Importing the configuration file.
const config = require('./config.json')

//MongoDB implementation (imports collections)
let collections = (async () => await require('./modules/databaseManager.js'))()

//Discord module implementation
const discordBot = require('./modules/discordClient')
//Steam module implementation
const steamClient = require('./modules/steamClient')

"OTIwNDEzMDk3NjU3Nzg2NDQ5.Ybj_fg.iIYTo7APg_ihheLH3qR4hT8yy98"

//#endregion

//Here begins the actual code
discordBot.on('messageCreate', async function (msg) {
    let prefix = 'mxa'
    //This checks for a custom prefix on a server.
    if (await collections.prefixes.countDocuments({serverID: msg.guildId}, {limit: 1})) {
        prefix = (await collections.prefixes.findOne({serverID: msg.guildId})).bot_prefixb
    }
    let tokens = msg.content.toLowerCase().split(/ +/)
    if (tokens.shift() === prefix) {
        let command = tokens.shift()
        let dcCommand = discordBot.commands.get(command)
        if (dcCommand !== undefined) {
            //This abomination takes care of permission restrictions for admin or dev commands. undefined = no permission requirements, 1 = for admins or above, 2 = for devs
            if (!dcCommand.hasOwnProperty('permLevel') || (dcCommand.permLevel === 1 && msg.member.permissions.has('ADMINISTRATOR') ||
                (dcCommand.permLevel === 1 && msg.author.id === config.devDiscordId) || (dcCommand.permLevel === 2 && msg.author.id === config.devDiscordId))) {
                dcCommand.execute(msg, tokens)
            } else {
                msg.channel.send('You don\'t have permissions to execute that command.');
            }
        } else {
            msg.channel.send("This command doesn't exist. Check out `mxa help` to see a full list of the commands.")
        }
    }
})