module.exports = {
	tag: 'Converter',
	models: '%prefix%command `quoted sticker`',
	desc: 'Convierte un sticker fijo en imagen.',
	cases: ['toimg', 'aimg', 'topng'],
	run: async(m, { v, getRandom }) => {
		if (!v.isMedia || !/\/webp$/.test(v.mime) || v.isAnimated) m.reply(`🚩 Mencione un sticker sin movimiento para convertilo en imagen.\n\n*Ejemplo:* ${m.prefix+m.command} <webp>`);

		await m.react(react.wait);

		addFilter(m.sender);

		let media = await v.download();
		let data = await api.post('/tools/webp-to-png', { file: media }, true);

		if (!data || !Buffer.isBuffer(data)) return m.reply('🚩 Error al realizar la convercion.');

		await m.replyImg(data, { caption: mess.fekeconvert });
		await m.react(react.global);
	}
};