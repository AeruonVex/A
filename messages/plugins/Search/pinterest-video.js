module.exports = {
	tag: 'Search',
	models: '%prefix%command `text`',
	desc: 'Busca videos en Pinterest',
	cases: ['pinvid', 'pinv', 'vpin'],
	run: async(m, { chat, randomObj }) => {
		if (!m.text) return m.reply(`🚩 Ingrese un termino para buscar en Pinterest.\n\n*Ejemplo 1:* ${m.prefix+m.command} Vanitas`);

		await m.react(react.wait);

		addFilter(m.sender);

		let { status, data, message } = await api.get('/search/pinterest-video', { text: m.text });

		if (!status) return m.reply('🚩 Error al realizar la busqueda.');

		let { media } = randomObj(data);

		await m.react(react.global);
		await m.replyButton({
			type: 'url',
			buttonText: 'Ver en la WEB',
			buttonUrl: media.url
		}, {
			title: mess.fakevid
		}, {
			media: true,
			response: media.url,
			type: 'video'
		});
	}
}