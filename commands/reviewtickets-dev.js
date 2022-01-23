let collections
(async function () ***REMOVED***
    collections = await require('../modules/databaseManager.js')
***REMOVED***)()

const discordBot = require('../modules/discordClient')
const ***REMOVED*** MessageActionRow, MessageButton, MessageEmbed ***REMOVED*** = require('discord.js');

discordBot.on('interactionCreate', async interaction => ***REMOVED***
    if (!interaction.isButton()) return;
    if (interaction.customId === 'previous_ticket')***REMOVED***
        await interaction.update('Previous boi')
    ***REMOVED***
    else if(interaction.customId === 'next_ticket')***REMOVED***
        await interaction.update('Next boi')
    ***REMOVED***
***REMOVED***);

module.exports = ***REMOVED***
    name: 'reviewtickets',
    description: 'A dev command. Shows a list of reports/tickets in chronological order.',
    usage: 'prefix reviewtickets. Example: mxa reviewtickets.',
    permLevel: 2,
    execute: async function (msg, tokens) ***REMOVED***
        let ticketCount = await collections.dc_tickets.countDocuments()
        if (ticketCount > 0) ***REMOVED***
            const embed = new MessageEmbed().setTitle(`Ticket by $***REMOVED***'someone'***REMOVED***.`).setColor('LIGHT_GREY').setDescription('Hello, world!')
            const row = new MessageActionRow().addComponents(new MessageButton().setCustomId('previous_ticket').setEmoji('⬅️').setStyle('SECONDARY'),
                new MessageButton().setCustomId('next_ticket').setEmoji('➡️').setStyle('SECONDARY'))
            msg.channel.send(***REMOVED***embeds: [embed], components: [row]***REMOVED***)
        ***REMOVED***
        else***REMOVED***
            msg.channel.send('No tickets to review.')
        ***REMOVED***
    ***REMOVED***
***REMOVED***