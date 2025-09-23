let badwordRegex = /fuck|shit|dick|pussy|bitch|tits|boobs|bastard|asshole|slut|whore|cunt|nigga|faggot|cock|dildo|prick|wanker|jerkoff|motherfucker|retard|idiot|loser/i // tambahin sendiri

export function before(m, { isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return !0
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let isBadword = badwordRegex.exec(m.text)
    console.log(isBadword)

    if (chat.antiBadword && isBadword) {
        user.warning += 1
        m.reply('Don't be toxic, okay!!\n' + `you have ${user.warning} warning` + '\nTo turn off type *.disable antibadword*')
        if (user.warning >= 5) {
            user.banned = false
            user.warning = 0
            if (m.isGroup) {
                if (isBotAdmin) {
                    this.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    //this.groupSettingChange(m.chat, GroupSettingChange.messageSend, false)
                }
            }
        }
    }
    return !0
}
