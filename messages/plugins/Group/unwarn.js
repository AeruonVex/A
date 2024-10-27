module.exports = {
	isGroup: true,
	isAdmin: true,
	tag: 'Group',
	models: '%prefix%command `@user | quoted`',
	desc: 'Retira un warn (advertencia) a un usuario mencionado.',
	cases: ['unwarn'],
	run: async(m, { sock }) => {
		let member = m.isQuoted ? m.quoted.sender : m.mentions ? m.mentions[0] : undefined;

		if (!member || member === m.botNumber || member === m.sender) return m.reply('🚩 `Mencione` un mensaje o a un usuario para quitar un warn (advertencia).');

		let user = (member in db.users) ? db.users[member] : {};

		if (!user.warn || user.warn === 0) return m.reply('🚩 El usuario mencionado `no` tiene ningun warn (advertencia).');

		await m.react(react.wait);

		addFilter(m.sender);

		user.warn -= 1;

		db.users[member] = user;

		await m.react(react.admin);
		await m.reply('✅ Se le retiro 1 warn (advertencia) al usuario mencionado.');
	}
};