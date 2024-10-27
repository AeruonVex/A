module.exports = {
	isOwner: true,
	tag: 'Owner',
	models: '%prefix%command `true | false`',
	desc: 'Permite usar el bot en modo chat privado.',
	cases: ['privado', 'private', 'dm'],
	run: async(m, { bot }) => {
		if (['activar', 'encnender', 'true', 'on', '1'].includes(m.query)) {
			if (bot.usepriv) return m.reply('🚩 El modo chat privado esta activo.');

			bot.usepriv = true;

			await m.reply('✅ Se activo el modo chat privado del bot. `Todos los usuarios pueden usar comandos en el chat privado del bot`.');
			await m.react(react.owner);
		} else if (['desactivar', 'apagar', 'false', 'off', '0'].includes(m.query)) {
			if (!bot.usepriv) return m.reply('🚩 El modo chat privado esta desactivado.');

			bot.usepriv = false;

			await m.react(react.owner);
			await m.reply('✅ Se desactivo el modo chat privado del bot. `Solo el desarrollador pueden usar el bot en el chat privado`.');
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Use: ${m.prefix+m.command} true o false`);
		};
	}
};