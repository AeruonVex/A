module.exports = {
	tag: 'Search',
	models: '%prefix%command `text | url`',
	desc: 'Descarga o busca, videos e imagenes de TikTok.',
	cases: ['tiktok', 'ttdl', 'tt'],
	run: async(m, { h2k, chat, runtime, webpToImgURL }) => {
		if (m.text && !m.bodyUrl) {
			await m.react(react.wait);

			addFilter(m.sender);

			let { status, data, message } = await api.get('/search/tiktok', { text: m.text });

			if (!status) return m.reply('🚩 Error al realizar la busqueda.');

			let teks = '\t\t\t*「 ✦ TikTok Search ✦ 」*\n\n';
			let sections = [];

			for (let i = 0; i < data.length; i++) {
				if (!data || !data[i]) continue;
				sections.push({
					title: `⎔ Resultado: ${i+1}`,
					rows: [{
						header: '',
						title: data[i].title,
						description: `Autor: ${data[i].author} | Duracion: ${runtime(data[i].duration)} | Likes: ${h2k(data[i].liked)}`,
						id: `${m.prefix}fetch ${data[i].link}`
					}]
				});
			};

			teks += `*❏ Busqueda:* ${m.text}\n`;
			teks += `*❏ Resultados:* ${sections.length}`;

			await m.react(react.global);
			await m.replyButton({
				type: 'list',
				buttonText: '📥 ¡Descargas! 📥',
				sections
			}, {
				title: teks,
				footer: mess.fakedata
			}, {
				media: true,
				response: data[0].thumbnail,
				type: 'image'
			});
		} else if (m.bodyUrl && /(vm|www)\.tiktok\.com\//i.test(m.bodyUrl)) {
			await m.react(react.wait);

			addFilter(m.sender);

			let { status, data, message } = await api.get('/download/tiktok', { url: m.bodyUrl });

			if (!status) return m.reply('🚩 Error al realizar la descaga.');

			let result = Array.isArray(data.media) ? data.media : [data.media];

			for (let { type, link } of result) {
				switch (type) {
					case 'image':
						await m.replyImg(link, { caption: mess.fakeimg });
					break;

					case 'video':
						await m.replyVid(link, { caption: mess.fakevid });
					break;
				};
			};

			await m.react(react.global);
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Ingrese un termino para buscar o una url para descargar de TikTok.\n\n*Ejemplo 1:* ${m.prefix+m.command} Vanitas no carte\n*Ejemplo 2:* ${m.prefix+m.command} https://vm.tiktok.com/ZM6y8hwsM/`);
		}
	}
}