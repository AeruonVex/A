module.exports = {
	tag: 'Converter',
	models: '%prefix%command `quoted sticker`',
	desc: 'Convierte un sticker con movimiento en video.',
	cases: ['tovid', 'avid', 'tomp4'],
	run: async(m, { v, getRandom }) => {
		if (!v.isMedia || !/\/webp$/.test(v.mime) || !v.isAnimated) return m.reply(`🚩 Mencione un sticker con movimiento para convertilo en video.\n\n*Ejemplo:* ${m.prefix+m.command} <webp>`);

		await m.react(react.wait);

		addFilter(m.sender);

		let media = await v.download();
		let data = await api.post('/tools/webp-to-mp4', { file: media }, true);

		if (!data || !Buffer.isBuffer(data)) return m.reply('🚩 Error al realizar la convercion.');

		await m.replyVid(data, { caption: mess.fakeconvert });
		await m.react(react.global);
	}
}