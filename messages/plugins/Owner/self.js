module.exports = {
	isOwner: true,
	tag: 'Owner',
	models: '%prefix%command `true | false`',
	desc: 'Silencia el bot globalmente y no responde a ningun grupo, ni usuario solo a su desarrollador.',
	cases: ['self', 'onlydev'],
	run: async(m, { bot }) => {
		if (['activar', 'encnender', 'true', 'on', '1'].includes(m.query)) {
			if (bot.self) return m.reply('🚩 El modo privado esta activo.');

			bot.self = true;

			await m.reply('✅ Se activo el modo privado del bot. `Solo el desarrollador puede usar el bot`.');
			await m.react(react.owner);
		} else if (['desactivar', 'apagar', 'false', 'off', '0'].includes(m.query)) {
			if (!bot.self) return m.reply('🚩 El modo privado esta desactivado.');

			bot.self = false;

			await m.react(react.owner);
			await m.reply('✅ Se desactivo el modo privado del bot. `Todos pueden usar el bot`.');
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Use: ${m.prefix+m.command} true o false`);
		};
	}
};