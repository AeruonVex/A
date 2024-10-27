module.exports = {
	tag: 'Download',
	models: '%prefix%command `url`',
	desc: 'Descarga video e imagenes de Threads.',
	cases: ['threads', 'thdl', 'th'],
	run: async(m) => {
		if (!m.bodyUrl || !/threads\.net\//i.test(m.bodyUrl)) return m.reply(`🚩 Ingrese un link de Threads para descargar.\n\n*Ejemplo:* ${m.prefix+m.command} https://www.threads.net/XXXXX`);

		await m.react(react.wait);

		addFilter(m.sender);

		let { status, data, message } = await api.get('/download/threads', { url: m.bodyUrl });

		if (!status) return m.reply(`🚩 Error al realizar la descarga.`);
		
		for (let { ext, link } of data) {
			switch (ext) {
				case 'mp4':
					await m.replyVid(link, { caption: mess.fakevid, gif: false });
				break;

				case 'jpg':
				case 'png':
				case 'jpeg':
					await m.replyImg(link, { caption: mess.fakeimg });
				break;
			};
		};

		await m.react(react.global);
	}
};