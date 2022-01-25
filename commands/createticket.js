let collections
(async function () {
    collections = await require('../modules/databaseManager.js')
})()

module.exports = {
    name: 'createticket',
    description: 'Creates a ticket/report that the creator can later read',
    usage: 'prefix createticket issue. Example: mxa createticket Wegblad stole my steam account, but I got it back. The only problem is that it\'s connected to his discord account, can you somehow remove him so I can connect my account?',
    execute: async function (msg, tokens) {
        if (!msg.author.bot) {
            if (await collections.dc_tickets.countDocuments({dcid: msg.author.id}) < 5) {
                if (tokens[0] !== undefined) {
                    collections.dc_tickets.insertOne({
                        user: msg.author.username,
                        dcid: msg.author.id,
                        issue: tokens.join(' '),
                        date: new Date()
                    })
                    msg.reply('Your ticket got sent successfully.')
                } else {
                    msg.reply('You have to specify the issue after the command. Use `help createticket` for more details.')
                }
            } else {
                msg.reply('Sorry, you reached the maximum ticket limit of 5. You are most likely spamming, which is why the limit exists in the first place. You can\'t speed up the process like that unfortunately. The tickets are reviewed in chronological order.')
            }
        } else {
            msg.channel.send('Bot clients can\'t create a ticket. Use a normal discord account.')
        }
    }
}