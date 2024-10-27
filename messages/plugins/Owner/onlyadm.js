module.exports = {
	isOwner: true,
	tag: 'Owner',
	models: '%prefix%command `true | false`',
	desc: 'Silencia el bot de un grupo y solo responde a los administradores.',
	cases: ['onlyadm', 'admonly'],
	run: async(m, { bot }) => {
		if (['activar', 'encnender', 'true', 'on', '1'].includes(m.query)) {
			if (bot.onlyadm) return m.reply('🚩 El modo solo admins esta activo.');

			bot.onlyadm = true;

			await m.reply('✅ Se activo el modo solo admins del bot. `Solo los administradores puede usar el bot`.');
			await m.react(react.owner);
		} else if (['desactivar', 'apagar', 'false', 'off', '0'].includes(m.query)) {
			if (!bot.onlyadm) return m.reply('🚩 El modo solo admins esta desactivado.');

			bot.onlyadm = false;

			await m.react(react.owner);
			await m.reply('✅ Se desactivo el modo solo admins del bot. `Todos pueden usar el bot`.');
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Use: ${m.prefix+m.command} true o false`);
		};
	}
};