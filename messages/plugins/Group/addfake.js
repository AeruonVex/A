module.exports = {
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	tag: 'Group',
	models: '%prefix%command `+prefix`',
	desc: 'Agrega un prefijo a la lista de prefijos que no estan permitidos ingresar al grupo.',
	cases: ['addfake', 'añadirfake'],
	run: async (m, { chat }) => {
		if (!chat.antifake) return m.reply('🚩 El antifake no esta activo en el grupo.');

		if (!m.text || m.text.length > 4) return m.reply(`🚩 Utilice: ${m.prefix+m.command} +1`);

		let prefijo = /^\+/.test(m.args[0]) ? m.args[0] : '+' + m.args[0];

		if (chat.fakelist.includes(prefijo)) return ('🚩 El prefijo que ingreso ya esta en la lista.');

		chat.fakelist.push(prefijo);

		await m.react(react.admin);
		await m.reply(`✅ Se agrego el prefijo ${prefijo} a la lista. Todos los numeros que ingresen al grupo que empiezen con ${prefijo} seran eliminados.`);
	}
};