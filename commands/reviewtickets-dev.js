let collections
(async function () ***REMOVED***
    collections = await require('../modules/databaseManager.js')
***REMOVED***)()

const discordBot = require('../modules/discordClient')
const ***REMOVED***MessageActionRow, MessageButton, MessageEmbed***REMOVED*** = require('discord.js');

discordBot.on('interactionCreate', async interaction => ***REMOVED***
    if (!interaction.isButton()) return;

    if (interaction.customId === 'ticket_previous') ***REMOVED***
        currentIndex--
    ***REMOVED*** else if (interaction.customId === 'ticket_next') ***REMOVED***
        currentIndex++
    ***REMOVED***
    interaction.update(***REMOVED***embeds: [ticketToEmbed(tickets[currentIndex])], components: [createButtons(currentIndex)]***REMOVED***)
    // interaction.update(***REMOVED***components: [createButtons(currentIndex)]***REMOVED***)
***REMOVED***)

let currentIndex
let tickets

module.exports = ***REMOVED***
    name: 'reviewtickets',
    description: 'A dev command. Shows a list of reports/tickets in chronological order.',
    usage: 'prefix reviewtickets. Example: mxa reviewtickets.',
    permLevel: 2,
    execute: async function (msg, tokens) ***REMOVED***
        currentIndex = 0
        let ticketCount = await collections.dc_tickets.countDocuments()
        if (ticketCount > 0) ***REMOVED***
            tickets = await collections.dc_tickets.find().toArray()
            msg.channel.send(***REMOVED***
                embeds: [ticketToEmbed(tickets[currentIndex])],
                components: [createButtons(currentIndex)]
            ***REMOVED***)
        ***REMOVED*** else ***REMOVED***
            msg.channel.send('No tickets to review.')
        ***REMOVED***
    ***REMOVED***
***REMOVED***

function ticketToEmbed(ticket) ***REMOVED***
    return new MessageEmbed().setTitle('Ticket by ' + ticket.user).setDescription(ticket.issue).setFooter(ticket.date.toString())
***REMOVED***

function createButtons(currentIndex) ***REMOVED***
    let row = new MessageActionRow()
    let prevBtn = new MessageButton().setCustomId('ticket_previous').setEmoji('⬅️').setStyle('SECONDARY')
    let nextBtn = new MessageButton().setCustomId('ticket_next').setEmoji('➡️').setStyle('SECONDARY')

    if (currentIndex === 0) ***REMOVED***
        prevBtn.setDisabled()
    ***REMOVED***
    if (currentIndex === tickets.length - 1) ***REMOVED***
        nextBtn.setDisabled()
    ***REMOVED***
    return row.addComponents(prevBtn, nextBtn)
***REMOVED***