module.exports = {
	tag: 'Download',
	models: '%prefix%command `url | username`',
	desc: 'Descarga historias de instagram de un perfil publico.',
	cases: ['instagramh', 'instahdl', 'ighdl'],
	run: async(m) => {
		if (!m.bodyUrl || /instagram\.com\/(p|reels?|tv)\//.test(m.bodyUrl)) return m.reply(`🚩 Ingrese una url del perfil del usuario o de la historia para descargar.\n\n*Ejemplo 1:* ${m.prefix+m.command} https://www.instagram.com/stories/nikorasu_gzz\n*Ejemplo 2:* ${m.prefix+m.command} https://www.instagram.com/nikorasu_gzz`);

		await m.react(react.wait);

		addFilter(m.sender);

		m.bodyUrl = m.bodyUrl.includes('stories') ? m.bodyUrl : 'https://www.instagram.com/stories/' + m.bodyUrl.replace('https://www.instagram.com/', '').replace(/\?.*$/g, '');

		let { status, data, message } = await api.get('/download/instagram-stories', { url: m.bodyUrl });

		if (!status) return m.reply(`🚩 Error al realizar la descarga.`);
		
		for (let { url, type } of data.media) {
			switch (type.toLowerCase()) {
				case 'video':
					await m.replyVid(url, { caption: mess.fakevid, gif: false });
				break;

				case 'image':
					await m.replyImg(url, { caption: mess.fakeimg });
				break;
			}
		}

		await m.react(react.global);

	}
}