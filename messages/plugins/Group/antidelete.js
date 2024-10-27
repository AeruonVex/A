module.exports = {
	isGroup: true,
	isAdmin: true,
	tag: 'Group',
	models: '%prefix%command `activar | desactivar`',
	desc: 'Activa o desactiva el sistema que detecta si se elimino un mensaje.',
	cases: ['antidelete', 'antidel', 'anticlear'],
	run: async (m, { chat }) => {
		if (['activar', 'encender', 'on', 'true', '1'].includes(m.query)) {
			if (chat.antidelete) return m.reply('🚩 El antidelete ya esta activo en el grupo.');

			chat.antidelete = true;

			await m.react(react.admin);
			await m.reply('✅ El antidelete se activo con exito en el grupo. `Todos los mensajes eliminados seran reenviados`.');
		} else if (['desactivar', 'apagar', 'off', 'false', '0'].includes(m.query)) {
			if (!chat.antidelete) return m.reply('🚩 El antidelete no esta activo en el grupo.');

			chat.antidelete = false;

			await m.react(react.admin);
			await m.reply('✅ El antidelete se desactivo con exito en el grupo. `No se reenviara ningun mensaje eliminado`');
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Utilice: ${m.prefix+m.command} apagar | ${m.prefix+m.command} encender`);
		};
	}
};