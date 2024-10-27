module.exports = {
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	tag: 'Group',
	models: '%prefix%command `text`',
	desc: 'Cambia la descripcion del grupo.',
	cases: ['desc', 'setdesc', 'description'],
	run: async(m, { sock, group }) => {
		if (!m.text) return m.reply(`🚩 Ingrese un texto para cambiar la descripcion del grupo.`);

		let desc = group.desc ? group.desc : '';

		await m.react(react.wait);

		addFilter(m.sender);

		await sock.groupUpdateDescription(m.from, m.text);

		await m.react(react.admin);
		await m.reply(`✅ Se actualizo la descripcion: ${desc ? `"${desc}" a "${m.text}"` : `"${m.text}"`}`);
	}
};