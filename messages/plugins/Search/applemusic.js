module.exports = {
	tag: 'Search',
	models: '%prefix%command `text | url`',
	desc: 'Busca o descarga musica de Apple Music.',
	cases: ['applemusic', 'apple', 'appmusic'],
	run: async(m, { bytesToSize, msToTime, resizeImg }) => {
		if (m.text && !m.bodyUrl) {
			await m.react(react.wait);

			addFilter(m.sender);

			let { status, data, message } = await api.get('/search/apple-music', { text: m.text });

			if (!status) return m.reply('🚩 Error al realizar la busqueda.');

			let teks = '\t\t\t*「 ✦ Search AppleMusic ✦ 」*\n\n';

			teks += `*❏ Busqueda:* ${m.query}\n`;
			teks += `*❏ Resultados:* ${data.length}\n\n`;

			for (let i = 0; i < data.length; i++) {
				teks += `*⎔ _Cancion N°:_* ${i+1}\n`;
				teks += `*⎔ _Titulo:_* ${data[i].title}\n`;
				teks += `*⎔ _Autor:_* ${data[i].artist}\n`;
				teks += `*⎔ _Publicado:_* ${data[i].pushiled}\n`;
				teks += `*⎔ _URL:_* ${data[i].url}`;
				teks += `\n\n────────────※ ·❆· ※────────────\n\n`;
			};

			teks += `> ${mess.fakedata}`;

			await m.react(react.global);
			await m.reply(teks, { ads: true, render: true, title: 'Consejo para descargar:', body: '`Mencione este mensaje con audio y el numero de la cancion.`', image: data[0].thumb });
		} else if (m.bodyUrl && /music\.apple\.com\//i.test(m.bodyUrl)) {
			await m.react(react.wait);

			addFilter(m.sender);

			let { status, data, message } = await api.get('/download/applemusic', { url: m.bodyUrl });

			if (!status) return m.reply('🚩 Error al realizar la descarga.');

			let image = await resizeImg(data.thumb, 200);
			let teks = '\t\t\t*「 ✦ Download AppleMusic ✦ 」*\n\n';

			teks += `*• Titulo:* ${data.title}\n`;
			teks += `*• Tipo:* ${data.type}\n`;
			teks += `*• Duracion:* ${msToTime(data.duration)}\n`;
			teks += `*• Peso:* ${bytesToSize(data.size)}\n`;
			teks += `\n> ${mess.fakedata}`;

			await m.react(react.global);
			await m.replyDoc(data.link, { caption: teks, jpeg: image.toString('base64'), filename: `${data.title}.mp3`, mimetype: 'audio/mpeg' });
		} else {
			await m.react(react.error);
			await m.reply(`🚩 Ingrese un termino para buscar en AppleMusic o una url para descargar.\n\n*Ejemplo 1:* ${m.prefix+m.command} amorfoda bad bunny\n*Ejemplo 2:* ${m.prefix+m.command} https://music.apple.com/id/album/xxxxx/xxxxx`);
		}
	}
}