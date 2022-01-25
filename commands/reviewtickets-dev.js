let collections
(async function () {
    collections = await require('../modules/databaseManager.js')
})()

const discordBot = require('../modules/discordClient')
const {MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');

discordBot.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'ticket_previous') {
        currentIndex--
    } else if (interaction.customId === 'ticket_next') {
        currentIndex++
    }
    interaction.update({embeds: [ticketToEmbed(tickets[currentIndex])], components: [createButtons(currentIndex)]})
    // interaction.update({components: [createButtons(currentIndex)]})
})

let currentIndex
let tickets

module.exports = {
    name: 'reviewtickets',
    description: 'A dev command. Shows a list of reports/tickets in chronological order.',
    usage: 'prefix reviewtickets. Example: mxa reviewtickets.',
    permLevel: 2,
    execute: async function (msg, tokens) {
        currentIndex = 0
        let ticketCount = await collections.dc_tickets.countDocuments()
        if (ticketCount > 0) {
            tickets = await collections.dc_tickets.find().toArray()
            msg.channel.send({
                embeds: [ticketToEmbed(tickets[currentIndex])],
                components: [createButtons(currentIndex)]
            })
        } else {
            msg.channel.send('No tickets to review.')
        }
    }
}

function ticketToEmbed(ticket) {
    return new MessageEmbed().setTitle('Ticket by ' + ticket.user).setDescription(ticket.issue).setFooter(ticket.date.toString())
}

function createButtons(currentIndex) {
    let row = new MessageActionRow()
    let prevBtn = new MessageButton().setCustomId('ticket_previous').setEmoji('⬅️').setStyle('SECONDARY')
    let nextBtn = new MessageButton().setCustomId('ticket_next').setEmoji('➡️').setStyle('SECONDARY')

    if (currentIndex === 0) {
        prevBtn.setDisabled()
    }
    if (currentIndex === tickets.length - 1) {
        nextBtn.setDisabled()
    }
    return row.addComponents(prevBtn, nextBtn)
}