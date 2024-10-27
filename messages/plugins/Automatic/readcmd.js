const { proto, generateWAMessage } = require('baileys');

module.exports = {
	tag: 'Automatic',
	desc: 'Comando automatico para leer los stickers.',
	start: async(m, { sock, v }) => {
		if (!/webp$/.test(m.mime)) return;
		if (!(m.sha256String in db.stickers)) return;

		let { command, prefix } = db.stickers[m.sha256String];

		let msg = await generateWAMessage(m.from, { text: prefix + command, mentions: m.isQuoted ? [m.quoted.sender] : null }, { userJid: m.sender, quoted: v });

		msg.key = m.key;

		sock.ev.emit('messages.upsert', { type: 'notify', messages: [proto.WebMessageInfo.fromObject(msg)] });
	}
};