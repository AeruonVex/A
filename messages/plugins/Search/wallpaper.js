module.exports = {
	tag: 'Search',
	models: '%prefix%command `text`',
	desc: 'Realiza una busqueda de wallpapers.',
	cases: ['wallpaper', 'wallpapers', 'wall', 'wp'],
	run: async(m, { randomObj }) => {
		if (!m.text || m.bodyUrl) return m.reply(`🚩 Ingrese un termino de busqueda.\n\n*Ejemplo:* ${m.prefix+m.command} Vanitas no Carte`);

		await m.react(react.wait);

		addFilter(m.sender);

		let { status, data, message } = await api.get('/search/wallpaper', { text: m.text });

		if (!status) return m.reply('🚩 Error al realizar la busqueda.');

		let { link } = randomObj(data);

		await m.replyButton({
			type: 'url',
			buttonText: 'Ver en la WEB',
			buttonUrl: link
		}, {
			title: mess.fakeimg
		}, {
			media: true,
			response: link,
			type: 'image'
		});
		await m.react(react.global);
	}
}