module.exports = {
	isOwner: true,
	tag: 'Owner',
	models: '%prefix%command `quoted sticker`',
	desc: 'Elimina un sticker de la lista de comandos.',
	cases: ['delcmd'],
	run: async(m) => {
		if (!m.isQuoted || !/webp$/.test(m.quoted.mime)) return m.reply('🚩 Mencione un `sticker` para borrarlo de la base de datos.');
		if (!(m.quoted.sha256String in db.stickers)) return m.reply('🚩 Lo siento el `sticker` que menciono parece no estar en la lista de comandos.');

		await m.react(react.wait);

		delete db.stickers[m.quoted.sha256String];

		await m.react(react.owner);
		await m.reply('✅ Se `elimino` con exito el `sticker` de la base de datos con exito.');
	}
}