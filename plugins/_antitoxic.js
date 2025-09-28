// Anti-toxic / Badword filter plugin

// Regex list of banned words
const badwordRegex = /fuck|shit|dick|pussy|bitch|tits|boobs|bastard|asshole|slut|whore|cunt|nigga|faggot|cock|dildo|prick|wanker|jerkoff|motherfucker|retard|idiot|loser/i

export function before(m, { isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true

    let chat = global.db.data.chats[m.chat] || {}
    let user = global.db.data.users[m.sender] || {}
    let isBadword = badwordRegex.test(m.text)

    if (chat.antiBadword && isBadword) {
        if (!user.warning) user.warning = 0
        user.warning += 1

        m.reply(
            `🚫 Don't be toxic!\nYou now have ${user.warning} warning(s).\nTo turn it off, type *.disable antibadword*`
        )

        if (user.warning >= 5) {
            user.banned = true
            user.warning = 0
            if (m.isGroup && isBotAdmin) {
                this.groupParticipantsUpdate(m.chat, [m.sender], "remove")
            }
        }
    }
    return true
}
