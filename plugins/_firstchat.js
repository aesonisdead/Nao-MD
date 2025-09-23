import moment from 'moment-timezone'

export async function before(m) {
    if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return

    let user = global.db.data.users[m.sender]

    if (new Date() - user.pc < 86400000) return // waktu ori 21600000 (6 jam)
    await m.reply(`
📮Note: Don't spam the bot.
⏩Type *.menu* to display the menu

📝Want to get rid of *limit*?
Buy access to *Premium*

Type *.premium* for more information
`)
    user.pc = new Date * 1
}


function ucapan() {
    const time = moment.tz('Africa/Casablanca').format('HH')
    let res = "Good morning 🌆"
    if (time >= 4) {
        res = "Good morning 🌄"
    }
    if (time > 10) {
        res = "Good afternoon ☀️"
    }
    if (time >= 15) {
        res = "Good evening 🌇"
    }
    if (time >= 18) {
        res = "Good night 🌙"
    }
    return res
}
