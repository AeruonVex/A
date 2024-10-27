module.exports = {
	isGroup: true,
	isAdmin: true,
	tag: 'Group',
	models: '%prefix%command `activar | desactivar`',
	desc: 'Activa o desactiva el sistema que detecta imagenes y las convierte en stickers automaticamente.',
	cases: ['autosticker', 'autostickers', 'antiarabes'],
	run: async (m, { chat }) => {
		if (['activar', 'encender', 'on', 'true', '1'].includes(m.query)) {
			if (chat.autosticker) return m.reply('🚩 El autosticker ya esta activo en el grupo.');

			chat.autosticker = true;

			await m.react(react.admin);
			await m.reply('✅ El autosticker se activo con exito en el grupo. `Todos los mensajes que sean imagenes se convertiran en stickers, *evite hacer spam de imagenes o sera baneado*`.');
		} else if (['desactivar', 'apagar', 'off', 'false', '0'].includes(m.query)) {
			if (!chat.autosticker) return m.reply('🚩 El autosticker no esta activo en el grupo.');

			chat.autosticker = false;

			await m.react(react.admin);
			await m.reply('✅ El autosticker se desactivo con exito en el grupo. `No se convertira ninguna imagen en sticker de manera automatica`.');
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Utilice: ${m.prefix+m.command} apagar | ${m.prefix+m.command} encender`);
		};
	}
};