module.exports = {
	tag: 'Search',
	models: '%prefix%command `text | url`',
	desc: 'Busca o descarga multimedia de Pinterest.',
	cases: ['pinterest', 'pindl', 'pin'],
	run: async(m, { chat, randomObj }) => {
		if (m.text && !m.bodyUrl) {
			await m.react(react.wait);

			addFilter(m.sender);

			let { status, data, message } = await api.get('/search/pinterest', { text: m.text });

			if (!status) return m.reply('🚩 Error al realizar la busqueda.');

			let { media } = randomObj(data);

			await m.react(react.global);
			await m.replyButton({
				type: 'url',
				buttonText: 'Ver en la WEB',
				buttonUrl: media.url
			}, {
				title: mess.fakeimg
			}, {
				media: true,
				response: media.url,
				type: 'image'
			});
		} else if (m.bodyUrl && /pinterest\.com|pin\.it/i.test(m.bodyUrl)) {
			await m.react(react.wait);

			addFilter(m.sender);

			let { status, data, message } = await api.get('/download/pinterest', { url: m.bodyUrl });

			if (!status) return m.reply('🚩 Error al realizar la busqueda.');

			let media = Array.isArray(data.media) ? data.media : [data.media];

			for (let { url, type } of media) {
				switch (type) {
					case 'gif':
						await m.replyDoc(url, { caption: mess.fakeGif, filename: `Pinterest-${Date.now()}.gif`, mimetype: 'image/gif' });
					break;

					case 'image':
						await m.replyImg(url, { caption: mess.fakeImg });
					break;

					case 'video':
						await m.replyVid(url, { caption: mess.fakeVid, gif: false });
					break;
				}
			}

			await m.react(react.global);
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Ingrese un termino para buscar o una url para descargar de Pinterest.\n\n*Ejemplo 1:* ${m.prefix+m.command} Vanitas\n*Ejemplo2:* ${m.prefix+m.command} https://ar.pinterest.com/pin/xxxx`);
		}
	}
}