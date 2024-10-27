module.exports = {
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	tag: 'Group',
	models: '%prefix%command `activar | desactivar`',
	desc: 'Activa o desactiva el sistema que detecta los prefijos fake que ingresan al grupo y los elimina.',
	cases: ['antifake', 'antifakes', 'antiarabes'],
	run: async (m, { chat }) => {
		if (['activar', 'encender', 'on', 'true', '1'].includes(m.query)) {
			if (chat.antifake) return m.reply('🚩 El antifake ya esta activo en el grupo.');

			chat.antifake = true;

			await m.react(react.admin);
			await m.reply('✅ El antifake se activo con exito en el grupo. `Todos los prefijos que esten añadidos a la lista seran eliminados al intentar unirse al grupo`.');
		} else if (['desactivar', 'apagar', 'off', 'false', '0'].includes(m.query)) {
			if (!chat.antifake) return m.reply('🚩 El antifake no esta activo en el grupo.');

			chat.antifake = false;

			await m.react(react.admin);
			await m.reply('✅ El antifake se desactivo con exito en el grupo. `No se eliminara a ningun prefijo que ingrese al grupo`.');
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Utilice: ${m.prefix+m.command} apagar | ${m.prefix+m.command} encender`);
		};
	}
};