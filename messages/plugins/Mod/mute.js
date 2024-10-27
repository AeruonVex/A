module.exports = {
	isMod: true,
	isGroup: true,
	tag: 'Owner',
	models: '%prefix%command `encender | apagar`',
	desc: 'Silencia un chat, el bot no responde a nadie solo al owner dentro de un grupo.',
	cases: ['mute', 'banchat', 'mutechat'],
	run: async(m, { chat }) => {
		if (['activar', 'encender', 'on', 'true', '1'].includes(m.query)) {
			if (chat.mute) return m.reply('🚩 El chat ya esta silenciado.');

			chat.mute = true;

			await m.react(react.mod);
			await m.reply('✅ El chat se `silencio` con exito.');
		} else if (['desactivar', 'apagar', 'off', 'false', '0'].includes(m.query)) {
			if (!chat.mute) return m.reply('🚩 El chat no esta silenciado.');

			chat.mute = false;

			await m.reply(react.mod);
			await m.reply('✅ El chat se `desilencio` con exito.');
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Utilice: ${m.prefix+m.command} apagar | ${m.prefix+m.command} encender`);
		};
	}
};