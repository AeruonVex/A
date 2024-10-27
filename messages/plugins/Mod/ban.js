module.exports = {
	isMod: true,
	tag: 'Owner',
	models: '%prefix%command `@user`',
	desc: 'Banea a un usuario mencionado para que no pueda usar el bot.',
	cases: ['ban', 'userban', 'banuser'],
	run: async (m) => {
		let member = m.isQuoted ? m.quoted.sender : m.mentions ? m.mentions[0] : null;
		let owners = owner_config.map((v) => v.number + '@s.whatsapp.net');

		if (!member || member == m.sender || owners.includes(member) || m.boNumber == member) return m.reply(`🚩 Utilice: ${m.prefix+m.command} @user`);

		await m.react(react.wait);

		let user = (member in db.users) ? db.users[member] : {};

		if (user.ban) return m.reply(`🚩 Este usuario ya esta baneado ${user.banReason ? `, razon: ${user.banReason}` : '.'}`);

		user.ban = true;
		user.banReason = m.text.replace(`@${member.split('@')[0]}`, '');

		db.users[member] = user;

		await m.reply(react.owner);
		await m.reply('✅ El usuario fue baneado con exito.');
	}
};