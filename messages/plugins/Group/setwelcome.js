module.exports = {
	isGroup: true,
	isAdmin: true,
	tag: 'Group',
	models: '%prefix%command `text`',
	desc: 'Modifica el mensaje de bienvenida del grupo.',
	cases: ['setwelcome', 'setwel'],
	run: async(m, { chat, sock }) => {
		if (chat.welcome) return m.reply('🚩 La bienvenida del grupo debe estar activa para usar esta funcion.');
		if (!m.text) return m.reply(`🚩 Ingrese una bienvenida para guardarla en la base de datos.\n\n> Elementos que se pueden usar:\n* @user = Etiqueta la usuario que ingresa.\n* @group = Agrega el nombre del grupo al mensaje.\n* @desc = Agrega la descripcion del grupo al mensaje.\n* @bot = Agrega el nombre del bot al mensaje.`);

		await m.react(react.wait);

		addFilter(m.sender);

		chat.welText = m.text.trim();

		await m.react(react.admin);
		await m.reply(`✅ Se agrego la bienvenida para este grupo con exito. Si desea saber como se ve la bienvenida use: "${m.prefix}test welcome"`);
	}
};