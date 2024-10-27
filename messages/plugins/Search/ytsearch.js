module.exports = {
	tag: 'Search',
	models: '%prefix%command `text`',
	desc: 'Busqueda mas extensa que el comando play en YouTube.',
	cases: ['ytsearch', 'yts'],
	run: async(m, { h2k, chat }) => {
		if (!m.text || m.bodyUrl) return m.reply(`🚩 Ingrese un termino de busqueda.\n\n*Ejemplo:* ${m.prefix+m.command} amorfoda`);

		await m.react(react.wait);

		addFilter(m.sender);

		let { status, data, message } = await api.get('/search/youtube', { text: m.text });

		if (!status) return m.reply('🚩 Error al realizar la busqueda.');

		let teks = '\t\t\t*「 ✦ YouTube Search ✦ 」*\n\n';
		let sections = [];

		for (let i = 0; i < data.length; i++) {
			if (!data[i]) continue;
			sections.push({
				title: `⎔ Resultado: ${i+1}`,
				rows: [{
					header: '',
					title: data[i].title,
					description: `Vistas: ${h2k(data[i].views)} | Duracion: ${data[i].duration} | Autor: ${data[i].author.name}`,
					id: `${m.prefix}play ${data[i].url}`
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
	}
}