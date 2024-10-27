module.exports = {
	tag: 'Search',
	models: '%prefix%command `text`',
	desc: 'Busca canciones para descargar en audio o video.',
	cases: ['play', 'music', 'ytplay'],
	run: async(m, { chat, h2k }) => {
		if (!m.text && !m.bodyUrl) return m.reply(`🚩 Ingrese un termino para buscar en YouTube.\n\n*Ejemplo:* ${m.prefix+m.command} musica para estudiar\n*Ejemplo 2:* ${m.prefix+m.command} https://www.youtube.com/watch=xxxxxx`);

		await m.react(react.wait);

		addFilter(m.sender);

		let url = m.bodyUrl ? '/search/youtube-url' : '/search/youtube';
		let URLSearch = m.bodyUrl ? { url: encodeURIComponent(m.bodyUrl) } : { text: m.text };

		let { status, data, message } = await api.get(url, URLSearch);

		if (!status) return m.reply('🚩 Error al realizar la busqueda.');

		data = Array.isArray(data) ? data : new Array(data);
		let teks = '\t\t\t*「 ✦ YouTube Search ✦ 」*\n\n';
		let sections = [];

		for (let i = 0; i < 1; i++) {
			if (!data || !data[i]) continue;
			teks += `*⎔ Titulo:* ${data[i].title}\n`;
			teks += `*⎔ Autor:* ${data[i].author.name}\n`;
			teks += `*⎔ Vistas:* ${h2k(data[i].views)}\n`;
			teks += `*⎔ Duracion:* ${data[i].duration}\n`;
			teks += `*⎔ Subido:* ${data[i].publishedAt || 'No especificado'}\n`;
			sections.push({
				title: '────────────※ ·❆· ※────────────',
				rows: [{
					title: '🎧 Audio MP3 🎧',
					description: `Audio en formato mp3 para WhatsApp.`,
					id: `${m.prefix}ytmp3 ${data[i].url}  --debug`
				}]
			}, {
				title: '────────────※ ·❆· ※────────────',
				rows: [{
					title: '📦 Audio MP3 Doc 📦',
					description: `Audio en formato documento para apps externas.`,
					id: `${m.prefix}mp3doc ${data[i].url}`
				}]
			}, {
				title: '────────────※ ·❆· ※────────────',
				rows: [{
					title: '🎥 Video MP4 🎥',
					description: `Video en formato mp4 para WhatsApp.`,
					id: `${m.prefix}ytmp4 ${data[i].url}`
				}]
			}, {
				title: '────────────※ ·❆· ※────────────',
				rows: [{
					title: '📦 Video MP4 Doc 📦',
					description: `Video en formato documento para apps externas.`,
					id: `${m.prefix}mp4doc ${data[i].url}`
				}]
			})
		}

		if (URLSearch?.text) sections.push({
				title: '────────────※ ·❆· ※────────────',
				rows: [{
					title: '🔎 Busqueda Extendida 🔍',
					description: 'Busca mas resultados de: ' + m.text,
					id: `${m.prefix}yts ${m.text}`
				}]
		});

		await m.react(react.global);
		await m.replyButton([{
			type: 'url',
			buttonText: 'External Link',
			buttonUrl: data[0].url
		}, {
			type: 'list',
			buttonText: '📥 ¡Descargas! 📥',
			sections
		}], {
			title: teks,
			footer: mess.fakedata
		}, {
			media: true,
			response: data[0].thumbnail,
			type: 'image'
		});
	}
}