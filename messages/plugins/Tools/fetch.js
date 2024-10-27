const { default: axios } = require('axios');

module.exports = {
	tag: 'Tools',
	models: '%prefix%command `url`',
	desc: 'Obtiene la informacion de una url de la WEB.',
	cases: ['fetch', 'axios', 'got', 'nodefetch'],
	run: async(m, { sock }) => {
		if (!m.bodyUrl) return m.reply('🚩 Ingrese una url para poder realizar la solicitud.');

		await m.react(react.wait);

		addFilter(m.sender);

		let link = /^https?:\/\//i.test(m.text) ? m.text : 'https://' + m.text;
		let { href: url, origin } = new URL(link);
		let response, text, type, mime;

		try {
			response = await fetch(url, { headers: { 'referer': origin } });
			text = await response.text();
			mime = response.headers.get('content-type');
			type = response.headers.get('content-type').split('/')[0];
		} catch {
			try {
				response = await axios.get(url, { headers: { 'referer': origin } });
				txt = response.data;
				mime = response.headers['content-type'];
				type = response.headers['content-type'].split('/')[0];
			} catch {
				await m.react(react.error);
				await m.reply('🚩 ¡No se pudo realizar la solicitud!');
			}
		}

		await m.react(react.global);

		switch(type) {
			case 'image':
				await m.replyImg(url, { caption: mess.fakedata });
			break;

			case 'video':
				await m.replyVid(url, { caption: mess.fakedata, gif: false });
			break;

			case 'audio':
				await m.replyAud(url, { ptt: false });
			break;

			case 'text':
			case 'json':
				try {
					text = format(JSON.parse(text + ''));
				} catch {
					text = text + '';
				} finally {
					await m.reply(text);
				}
			break;

			default:
				await m.replyDoc(url, { caption: mess.fakedata, mimetype: mime, fileName: `${Date.now()}.${mime.split('/')[1]}` });
		};
	}
};