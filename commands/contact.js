const ***REMOVED*** MessageEmbed ***REMOVED*** = require('discord.js');

module.exports = ***REMOVED***
    name: 'contact',
    description: 'Displays how you can contact the devs',
    execute: function(msg, tokens) ***REMOVED***
        var embed = new MessageEmbed().setTitle("Contact us")
        .setDescription("If you want to report a bug or have a bot-related issue, use the `report` command to report an issue. If it's something that requires solving ASAP you can contact one of the developers.")
        .setColor("RED").addField("Main dev", "`m4tex#5886`").addField("Helping dev", "`Wegblad#0118`")
        msg.channel.send(***REMOVED*** embeds: [embed]***REMOVED***)
    ***REMOVED***
***REMOVED***