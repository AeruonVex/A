module.exports = {
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	tag: 'Group',
	models: '%prefix%command `activar | desactivar`',
	desc: 'Activa o desactiva el sistema que detecta los links de spam en un mensaje.',
	cases: ['antilink', 'antilinks', 'antispam'],
	run: async (m, { chat }) => {
		if (['activar', 'encender', 'on', 'true', '1'].includes(m.query)) {
			if (chat.antilink) return m.reply('🚩 El antilink ya esta activo en el grupo.');

			chat.antilink = true;

			await m.react(react.admin);
			await m.reply('✅ El antilink se activo con exito en el grupo. `Todos los mensajes que contengan links de spam seran eliminados junto con el emisor`.');
		} else if (['desactivar', 'apagar', 'off', 'false', '0'].includes(m.query)) {
			if (!chat.antilink) return m.reply('🚩 El antilink no esta activo en el grupo.');

			chat.antilink = false;

			await m.react(react.admin);
			await m.reply('✅ El antilink se desactivo con exito en el grupo. `Los mensajes con spam no seran eliminados ni el emisor`.');
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Utilice: ${m.prefix+m.command} apagar | ${m.prefix+m.command} encender`);
		};
	}
};