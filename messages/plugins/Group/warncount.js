module.exports = {
	isGroup: true,
	tag: 'Group',
	models: '%prefix%command `@user | quoted`',
	desc: 'Muestra la cantidad de warns (advertencias) de un usuario mencionado.',
	cases: ['warncount', 'countwarn'],
	run: async(m, { sock }) => {
		let member = m.isQuoted ? m.quoted.sender : m.mentions ? m.mentions[0] : undefined;

		if (!member) return m.reply('🚩 Mencione a un usuario para ver sus advertencia(s).');

		let user = (member in db.users) ? db.users[member] : {};

		await m.react(react.wait);

		addFilter(m.sender);

		if (!user.warn || user.warn === 0) return m.reply('🚩 El usuario no posee warns (advertencias).');

		await m.react(react.global);
		await m.reply(`El usuario posee ${user.warn} advertencia(s).`);
	}
}