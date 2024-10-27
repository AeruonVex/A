module.exports = {
	isMod: true,
	tag: 'Owner',
	models: '%prefix%command `@user | quoted`',
	desc: 'Desbanea a un usuario seleccionado del uso del bot',
	cases: ['unban', 'userunban'],
	run: async(m) => {
		let member = m.isQuoted ? m.quoted.sender : m.mentions ? m.mentions[0] : undefined;
		let owners = owner_config.map((v) => v.number + '@s.whatsapp.net');

		if (!member || member == m.sender || member == botNumber || owners.includes(member)) return m.reply(`🚩 Use: ${m.prefix+m.command} @user`);

		await m.react(react.wait);

		addFilter(m.sender);

		let user = (member in db.users) ? db.users[member] : {};

		if (!user?.ban) return m.reply('🚩 Este usuario no esta baneado.');

		user.ban = false;
		user.banReason = '';

		db.users[member] = user;

		await m.react(react.owner);
		await m.reply('✅ El usuario fue desbaneado con exito.');
	}
};