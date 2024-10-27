module.exports = {
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	tag: 'Group',
	models: '%prefix%command `@user | quoted`',
	desc: 'Quita los privilegios de un usuario de administrador.',
	cases: ['demote', 'noadmin'],
	run: async(m, { sock }) => {
		let member = m.isQuoted ? m.quoted.sender : m.mentions ? m.mentions[0] : undefined;

		if (!member) return m.reply('🚩 `Mencione` un usuario para quitarle administracion en el grupo.');
		if (m.sender === member || m.botNumber === member) return m.reply('🚩 Lo siento no puedo quitarle el admin a este usuario.');
		if (!m.admins.includes(member)) return m.reply('🚩 Este usuario no es `administrador`.');

		await m.react(react.wait);

		addFilter(m.sender);

		await sock.groupParticipantsUpdate(m.from, [member], 'demote')
		.then(async(update) => {
			for(let { status } of update) {
				if (status !== '200') {
					await m.react(react.error);
					await m.reply('🚩 Lo siento no se pudo quitar el admin al usuario que menciono.');
				} else {
					await m.react(react.admin);
					await m.reply('✅ Se le quito admin al usuario que menciono.');
				};
			};
		});
	}
}