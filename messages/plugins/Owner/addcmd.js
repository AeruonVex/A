module.exports = {
	isOwner: true,
	tag: 'Owner',
	models: '%prefix%command `command`',
	desc: 'Añade un sticker para ejecutar comandos',
	cases: ['addcmd'],
	run: async(m, { getRandomID }) => {
		if (!m.isQuoted || !/webp$/.test(m.quoted.mime) || !m.text) return m.reply('🚩 Mencione un `sticker` y `escriba` el nombre del comando que quiere ejecutar.');

		let plugin = plugins.filter((c) => c.cases && Array.isArray(c.cases)).map((c) => c.cases);
		let isFilteredCmd = plugin.some((v) => v.includes(m.query));

		if (!isFilteredCmd) return m.reply('🚩 Lo siento el `comando` que ingreso no corresponde a un comando dentro del bot, revise el `menu`.');

		if ((m.quoted.sha256String in db.stickers)) return m.reply('🚩 Ese `sticker` ya esta seleccionado para otro comando. Para evitar conflictos use otro `sticker` diferente.', { quoted: m.quoted });

		await m.react(react.wait);

		let media = await m.quoted.download();

		db.stickers[m.quoted.sha256String] = { prefix: m.prefix, command: m.query, id: getRandomID(5, true), buffer: media.toString('base64') };

		await m.react(react.global);
		await m.reply('✅ Se `agrego` con exito el `sticker` a la lista de comandos.', { quoted: m.quoted });
	}
};