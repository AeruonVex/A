let regexLink = /(https?:\/\/)?((chat\.)?whatsapp\.com\/(?:(invite|channel)\/)?([0-9A-Za-z]{20,24})|discord(?:app)?\.(com|gg)\/invite\/|t\.me\/|wa\.me\/)/gi;

module.exports = {
    isGroup: true,
    tag: 'Automatic',
    desc: 'Detecta los links de spam dentre de un mensaje.',
    start: async (m, { sock, chat }) => {
        if (chat.antilink) {
            if (m.isMod ||  m.isAdmin || m.isMe) return;

            if (regexLink.test(m.body)) {                
                if (/chat\.whatsapp\.com/.test(m.body)) {
                    let code = await sock.groupInviteCode(m.from);

                    if (m.body.includes('chat.whatsapp.com/' + code)) return;
                };

                await m.reply('🚩 Se detecto un link de spam en su mensaje, se eliminara al participante que lo envio junto con el mensaje.');
                await m.delete();

                await m.delay(2000);
                await sock.groupParticipantsUpdate(m.from, [m.sender], 'remove');
            };
        };
    }
};