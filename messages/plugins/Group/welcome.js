module.exports = {
	isGroup: true,
	isAdmin: true,
	tag: 'Group',
	models: '%prefix%command `activar | desactivar`',
	desc: 'Activa o desactiva el sistema que detecta si se elimino un mensaje.',
	cases: ['welcome', 'bienvenida', 'wel'],
	run: async (m, { chat }) => {
		if (['activar', 'encender', 'on', 'true', '1'].includes(m.query)) {
			if (chat.welcome) return m.reply('🚩 La bienvenida ya esta activo en el grupo.');

			chat.welcome = true;

			await m.react(react.admin);
			await m.reply('✅ La bienvenida se activo con exito en el grupo. `Todos los participantes que ingresen al grupos seran recibidos con un mensaje`.');
		} else if (['desactivar', 'apagar', 'off', 'false', '0'].includes(m.query)) {
			if (!chat.welcome) return m.reply('🚩 La bienvenida no esta activo en el grupo.');

			chat.welcome = false;

			await m.react(react.admin);
			await m.reply('✅ La bienvenida se desactivo con exito en el grupo. `No se enviara un mensaje cuando alguien ingrese al grupo`.');
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Utilice: ${m.prefix+m.command} apagar | ${m.prefix+m.command} encender`);
		};
	}
};