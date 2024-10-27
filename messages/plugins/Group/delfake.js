module.exports = {
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	tag: 'Group',
	models: '%prefix%command `+prefix`',
	desc: 'Elimina un prefijo de la lista de prefijos que no estan permitidos ingresar al grupo.',
	cases: ['delfake', 'quitarfake'],
	run: async (m, { chat }) => {
		if (!chat.antifake) return m.reply('🚩 El antifake no esta activo en el grupo.');

		if (!m.text || m.text.length > 4) return m.reply(`🚩 Utilice: ${m.prefix+m.command} +1`);

		let prefijo = /^\+/.test(m.args[0]) ? m.args[0] : '+' + m.args[0];

		if (!chat.fakelist.includes(prefijo)) return ('🚩 El prefijo que ingreso no esta en la lista.');

		let index = chat.fakelist.indexOf(prefijo);

		chat.fakelist.splice(index, 1);

		await m.react(react.admin);
		await m.reply(`✅ Se quito el prefijo ${prefijo} de la lista. Todos los numeros que ingresen al grupo que empiezen con ${prefijo} no seran eliminados.`);
	}
};