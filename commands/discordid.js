module.exports = {
    name: 'dcid',
    description: 'Displays your discord id.',
    usage: 'prefix dcid. Example: mxa dcid',
    execute: function(msg, tokens) {
        msg.channel.send("Your discord id is: " + msg.author.id + ".")
    }
}