module.exports = {
	isGroup: true,
	isAdmin: true,
	tag: 'Group',
	models: '%prefix%command `activar | desactivar`',
	desc: 'Activa o desactiva el sistema que detecta cambios en el grupo.',
	cases: ['antiraid', 'antiraideo', 'notify'],
	run: async (m, { chat }) => {
		if (['activar', 'encender', 'on', 'true', '1'].includes(m.query)) {
			if (chat.notify) return m.reply('🚩 El antiraid ya esta activo en el grupo.');

			chat.notify = true;

			await m.react(react.admin);
			await m.reply('✅ El antiraid se activo con exito en el grupo. `Todos los cambios en el grupo seran anunciados etiquetando solo a los admins`.');
		} else if (['desactivar', 'apagar', 'off', 'false', '0'].includes(m.query)) {
			if (!chat.notify) return m.reply('🚩 El antiraid no esta activo en el grupo.');

			chat.notify = false;

			await m.react(react.admin);
			await m.reply('✅ El antiraid se desactivo con exito en el grupo. `No se avisaran si se realizan cambios en el grupo`.');
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Utilice: ${m.prefix+m.command} apagar | ${m.prefix+m.command} encender`);
		};
	}
};