module.exports = {
	isGroup: true,
	isAdmin: true,
	tag: 'Group',
	models: '%prefix%command `text | message`',
	desc: 'Reenvia un mensaje etiquetando a todos los participantes.',
	cases: ['tag', 'hidetag', 'msgtag'],
	run: async(m, { v, sock, group }) => {
		if (`${v.prefix+v.command}` === v.body) return m.reply('🚩 Escriba o mencione un mensaje para etiquetar a todos en el grupo.');

		await m.react(react.wait);

		addFilter(m.sender);

		let users = group.participants;
		let teks = m.text ? m.text : v.text;
		let participants = users.filter((v) => ![m.botNumber].includes(v.id)).map((i) => sock.decodeJid(i.id));

		await m.react(react.admin);
		await m.replyForward(v, { caption: teks, mentions: [...participants, ...sock.parseMentions(teks)] });
	}
};