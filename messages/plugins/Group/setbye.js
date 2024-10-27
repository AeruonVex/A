module.exports = {
	isGroup: true,
	isAdmin: true,
	tag: 'Group',
	models: '%prefix%command `text`',
	desc: 'Modifica el mensaje de despedida del grupo.',
	cases: ['setbye', 'setdespedida'],
	run: async(m, { chat, sock }) => {
		if (chat.welcome) return m.reply('🚩 La bienvenida del grupo debe estar activa para usar esta funcion.');
		if (!m.text) return m.reply(`🚩 Ingrese una despedida para guardarla en la base de datos.\n\n> Elementos que se pueden usar:\n* @user = Etiqueta la usuario que ingresa.\n* @group = Agrega el nombre del grupo al mensaje.\n* @desc = Agrega la descripcion del grupo al mensaje.\n* @bot = Agrega el nombre del bot al mensaje.`);

		await m.react(react.wait);

		addFilter(m.sender);

		chat.byeText = m.text.trim();

		await m.react(react.admin);
		await m.reply(`✅ Se agrego la despedida para este grupo con exito. Si desea saber como se ve la despedida use: "${m.prefix}test bye"`);
	}
};