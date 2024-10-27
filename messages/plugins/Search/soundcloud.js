module.exports = {
	tag: 'Search',
	models: '%prefix%command `text | url`',
	desc: 'Busca o descarga musica de soundcloud.',
	cases: ['soundcloud', 'soundc', 'sc'],
	run: async(m, { h2k, chat, msToTime, resizeImg }) => {
		if (m.text && !m.bodyUrl) {
			await m.react(react.wait);

			addFilter(m.sender);

			let { status, data, message } = await api.get('/search/soundcloud', { text: m.text });

			if (!status) return m.reply('🚩 Error al realizar la busqueda.');

			let teks = '\t\t\t*「 ✦ Sound Cloud Search ✦ 」*\n\n';
			let sections = [];

			for (let i = 0; i < data.length; i++) {
				if (!data || !data[i]) continue;
				sections.push({
					title: `⎔ Resultado: ${i+1}`,
					rows: [{
						header: '',
						title: `Titulo: ${data[i].title}`,
						description: `Duracion: ${msToTime(data[i].duration)} | Genero: ${data[i].genere} | Reproducciones: ${h2k(data[i].playback_count)}`,
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
		} else if (m.bodyUrl && /soundcloud\.com\//i.test(m.bodyUrl)) {
			await m.react(react.wait);

			addFilter(m.sender);

			let { status, data, message } = await api.get('/download/soundcloud', { url: m.bodyUrl });

			if (!status) return m.reply('🚩 Error al realizar la busqueda.');

			let image = await resizeImg(data.imageURL, 200);
			let teks = '\t\t\t*「 ✦ Download SoundCloud ✦ 」*\n\n';

			teks += `*• Titulo:* ${data.title}\n`;
			teks += `*• ID:* ${data.author.id}\n`;
			teks += `*• Artistas:* ${data.author.username}\n`;
			teks += `*• Likes:* ${h2k(data.author.likes_count)}\n`;
			teks += `\n> ${mess.fakedata}`;

			await m.react(react.global);
			await m.replyDoc(data.url, { caption: teks, jpeg: image.toString('base64'), filename: `${data.title}.mp3`, mimetype: 'audio/mpeg' });
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Ingrese un termino para buscar en SoundCloud o una url para descargar.\n\n*Ejemplo 1:* ${m.prefix+m.command} amorfoda bad bunny\n*Ejemplo 2:* ${m.prefix+m.command} https://soundcloud.com/21savage/xxxxx`);
		}
	}
}