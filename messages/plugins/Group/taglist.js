module.exports = {
	isGroup: true,
	isAdmin: true,
	tag: 'Group',
	models: '%prefix%command `Announce`',
	desc: 'Menciona a todos los participantes en lista y agrega un anuncio al mensaje.',
	cases: ['taglist', 'listag', 'alltag', 'foralltag', 'todos'],
	run: async(m, { group, sock }) => {
		await m.react(react.wait);

		addFilter(m.sender);

		let icon = await sock.profilePictureUrl(m.from, 'image');
		let participants = group.participants.filter((v) => ![m.botNumber].includes(v.id)).map((i) => sock.decodeJid(i.id));

		let teks = `\t\t\t*「 ✦ Participantes de ${group.subject} ✦ 」*\n\n`;

		teks += `${m.text ? `\n*📢 Anuncio:* ${m.text}\n` : ''}`;

		for (let user of participants) {
			teks += `\n*•* @${user.split('@')[0]}`;
		};

		teks += `\n\n> *${mess.fake}*`;

		await m.react(react.admin);
		await m.reply(teks, {
			ads: true,
			render: true,
			title: 'Mencion a todos',
			body: 'Mencionados por: ' + m.pushName,
			image: icon
		});
	}
};