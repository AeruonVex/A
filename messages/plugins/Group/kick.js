module.exports = {
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	tag: 'Group',
	models: '%prefix%command `@user | quoted`',
	desc: 'Elimina a un participante del grupo mencionandolo o marcando su mensaje.',
	cases: ['kick', 'eliminar', 'sacar'],
	run: async(m, { sock, group }) => {
		let member = m.isQuoted ? m.quoted.sender : m.mentions[0] ? m.mentions[0] : undefined;

		if (!member) return m.reply(`🚩 Mencione un usuario para eliminarlo del grupo.`);
		if (member === m.botNumber || member === m.sender) return m.reply('🚩 Lo siento no puedo eliminar al participante que selecciono.');

		let participants = group.participants.map((v) => sock.decodeJid(v.id));

		if (!participants.includes(member)) return m.reply('🚩 El participante que selecciono no se encuentra en el grupo.');

		await m.react(react.wait);

		addFilter(m.sender);

		await sock.groupParticipantsUpdate(m.from, [member], 'remove')
		.then(async(update) => {
			for (let { status } of update) {
				if (status !== '200') {
					await m.react(react.error);
					await m.reply('🚩 Lo siento no se pudo eliminar al participante seleccionado.');
				} else {
					await m.react(react.admin);
					await m.reply('✅ Se elimino del grupo al participante seleccionado.');
				};
			};
		});
	}
};