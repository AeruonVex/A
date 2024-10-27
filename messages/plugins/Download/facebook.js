module.exports = {
	tag: 'Download',
	models: '%prefix%command `url`',
	desc: 'Descarga videos de Facebook (cuando no son privados).',
	cases: ['facebook', 'fbdl', 'fb'],
	run: async(m) => {
		if (!m.bodyUrl || !/facebook\.com|fb\.watch/i.test(m.bodyUrl)) return m.reply(`🚩 Ingrese un link de Facebook para descargar.\n\n*Ejemplo:* ${m.prefix+m.command} https://fb.watch/XXXXX`);

		await m.react(react.wait);

		addFilter(m.sender);

		let { status, message, data } = await api.get('/download/facebookv3', { url: m.bodyUrl });

		if (!status) return m.reply('🚩 `Error` al realizar la descarga.');

		let response = data?.metadata || data;
		let result = Array.isArray(response) ? response.find((value) => value.quality === 'HD' || value.quality === 'SD') : (response.hd ? response.hd : response.sd);

		await m.react(react.global);
		await m.replyVid(result, { caption: mess.fakevid, gif: false });
	}
};