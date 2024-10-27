module.exports = {
	tag: 'Download',
	models: '%prefix%command `url`',
	desc: 'Descarga video e imagenes de Instagram',
	cases: ['instagram', 'igdl', 'ig'],
	run: async(m) => {
		if (!m.bodyUrl || !/instagram\.com\/(p|reels?|tv)\//i.test(m.bodyUrl)) return m.reply(`🚩 Ingrese un link de Instagram para descargar.\n\n*Ejemplo:* ${m.prefix+m.command} https://www.instagram.com/XXXXX`);

		await m.react(react.wait);

		addFilter(m.sender);

		let { status, data, message } = await api.get('/download/instagram', { url: m.bodyUrl });

		if (!status) return m.reply(`🚩 Error al realizar la descarga.`);
		
		for (let { url, type } of data.media) {
			switch (type) {
				case 'video':
					await m.replyVid(url, { caption: mess.fakevid, gif: false });
				break;

				case 'image':
					await m.replyImg(url, { caption: mess.fakeimg });
				break;
			};
		};

		await m.react(react.global);
	}
};