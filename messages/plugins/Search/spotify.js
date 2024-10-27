module.exports = {
	tag: 'Search',
	models: '%prefix%command `text | url`',
	desc: 'Busqueda en spotify o descarga por url de spotify.',
	cases: ['spotify', 'spoti', 'sp'],
	run: async(m, { chat, msToTime, resizeImg }) => {
		if (m.text && !m.bodyUrl) {
			await m.react(react.wait);

			addFilter(m.sender);

			let { status, data, message } = await api.get('/search/spotify', { text: m.text });

			if (!status) return m.reply('🚩 Error al realizar la busqueda.');

			let teks = '\t\t\t*「 ✦ Spotify Search ✦ 」*\n\n';
			let sections = [];

			for (let i = 0; i < data.length; i++) {
				sections.push({
					title: `⎔ Resultado: ${i+1}`,
					rows: [{
						header: '',
						title: data[i].title,
						description: `Autor: ${data[i].artist} | Duracion: ${msToTime(data[i].duration)} | Popularidad: ${data[i].popularity}`,
						id: `${m.prefix+m.command} ${data[i].url}`
					}]
				})
			}

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
		} else if (m.bodyUrl && /open\.spotify\.com|spotify\.link/i.test(m.bodyUrl)) {
			await m.react(react.wait);

			addFilter(m.sender);

			let { status, data, message } = await api.get('/download/spotify', { url: m.bodyUrl });

			if (!status) return m.reply('🚩 Error al realizar la descarga.');

			let image = await resizeImg(data.cover, 200);
			let teks = '\t\t\t*「 ✦ Download Spotify ✦ 」*\n\n';

			teks += `*• Titulo:* ${data.title}\n`;
			teks += `*• Artistas:* ${data.artists}\n`;
			teks += `*• Album:* ${data.album}\n`;
			teks += `*• Subido:* ${data.releaseDate}\n`;
			teks += `\n> ${mess.fakedata}`;

			await m.react(react.global);
			await m.replyDoc(data.link, { caption: teks, jpeg: image.toString('base64'), filename: `${data.title}-${data.artists}.mp3`, mimetype: 'audio/mpeg' });
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Ingrese un termino para buscar en Spotify o una url para descargar.\n\n*Ejemplo 1:* ${m.prefix+m.command} amorfoda bad bunny\n*Ejemplo 2:* ${m.prefix+m.command} https://open.spotify.com/track/xxxx`);
		}
	}
}