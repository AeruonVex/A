module.exports = {
	tag: 'Download',
	models: '%prefix%command `url`',
	desc: 'Descarga videos de Twitter.',
	commands: ['twitter', 'twdl', 'tw'],
	exec: async(m) => {
		if (!m.bodyUrl || !/(twitter|x)\.com\//i.test(m.bodyUrl)) return m.reply(`🚩 Ingrese un link de Twitter para descargar.\n\n*Ejemplo:* ${m.prefix+m.command} https://twitter.com/XXXXX`);

		await m.react(react.wait);

		addFilter(m.sender);

		let { status, data, message } = await api.get('/download/twitter', { url: m.bodyUrl });

		if (!status) return m.reply(`🚩 Error al realizar la descarga.`);

		let result = data?.media?.video_urls[0];

		if (!result.url) return m.reply('No se pudo obtener el url de descarga intente de nuevo.');

		await m.react(react.global);
		await m.replyVid(result.url, { caption: mess.fakevid, gif: false });
	}
};