const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'report',
    description: 'Shows how to report a bug, and what template the report should follow.',
    usage: 'prefix report. Example: mxa report.',
    execute: function (msg, tokens) {
        let embed = new MessageEmbed().setTitle('How to report')
            .setDescription('In order to report a bug, or any bot-related issue that requires solving, use `createticket`. The report should follow the template below.')
            .addField('Report Template', 'there currently is no template, just make sure to properly describe your issue.').setColor('PURPLE')
        msg.channel.send({embeds: [embed]})
    }
}