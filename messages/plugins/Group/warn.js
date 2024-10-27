module.exports = {
	isGroup: true,
	isAdmin: true,
	tag: 'Group',
	models: '%prefix%command `@user | quoted`',
	desc: 'Otorga un warn (advertencia) a un usuario mencionado.',
	cases: ['warn'],
	run: async(m, { sock }) => {
		let member = m.isQuoted ? m.quoted.sender : m.mentions ? m.mentions[0] : undefined;

		if (!member || member === m.botNumber || member === m.sender) return m.reply('🚩 `Mencione` un mensaje o a un usuario para darle un warn (advertencia).');

		let user = (member in db.users) ? db.users[member] : {};

		await m.react(react.wait);

		addFilter(m.sender);

		if (user?.warn === 3) {
			if (m.isBotAdmin) {
				await m.reply('🚩 El usuario seleccionado llego al limte de `warns (advertencias)` permitidas (3). Se eliminara del grupo.');
				await m.delay(2500);

				await sock.groupParticipantsUpdate(m.from, [member], 'remove');
				db.users[member].warn = 0;
			} else {
				await m.reply('🚩 El usuario seleccionado llego al limte de `warns (advertencias)` permitidas (3). No podra volver a usar el bot hasta nuevo aviso.');
				await m.delay(2500);

				await sock.updateBlockStatus(member, 'block');
			};
		};

		if (user.warn < 0 || !user.warn) user.warn = 0;

		user.warn += 1;

		db.users[member] = user;

		await m.react(react.admin);
		await m.reply('✅ Se le agrego 1 warn (advertencia) al usuario mencionado.');
	}
};