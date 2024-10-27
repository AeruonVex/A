module.exports = {
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	tag: 'Group',
	models: '%prefix%command `@user | quoted`',
	desc: 'Cambia los privilegios de un usuario a administrador.',
	cases: ['promote', 'admin'],
	run: async(m, { sock }) => {
		let member = m.isQuoted ? m.quoted.sender : m.mentions ? m.mentions[0] : undefined;

		if (!member) return m.reply('🚩 `Mencione` un usuario para darle administracion en el grupo.');
		if (m.sender === member || m.botNumber === member) return m.reply('🚩 Lo siento no puedo darle admin a este usuario.');
		if (m.admins.includes(member)) return m.reply('🚩 Este usuario ya es `administrador`.');

		await m.react(react.wait);

		addFilter(m.sender);

		await sock.groupParticipantsUpdate(m.from, [member], 'promote')
		.then(async(update) => {
			for(let { status } of update) {
				if (status !== '200') {
					await m.react(react.error);
					await m.reply('🚩 Lo siento no se pudo dar administracion al usuario que menciono.');
				} else {
					await m.react(react.admin);
					await m.reply('✅ Se promovio como `administrador` al usuario que menciono.');
				};
			};
		});
	}
};