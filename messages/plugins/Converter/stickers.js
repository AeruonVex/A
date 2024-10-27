module.exports = {
	tag: 'Converter',
	models: '%prefix%command `img | vid | gif`',
	desc: 'Convierte imagen, videos o GiF en stickers.',
	cases: ['sticker', 'stiker', 'stik', 's'],
	run: async(m, { v, bot, imageToWebp, videoToWebp }) => {
		if (!v.isMedia || !/^(image|video)/.test(v.mime) || /webp$/.test(v.mime)) return m.reply(`🚩 Envie o mencione una imagen, un video o un GiF para convertirlo en sticker.\n\n*Ejemplo:* ${m.prefix+m.command} <imagen>`);

		await m.react(react.wait);

		addFilter(m.sender);

		let media, cropped, buffer;

		switch(v.type) {
			case 'imageMessage':
				media = await v.download();
				cropped = /\-x/i.test(m.text);
				buffer = await imageToWebp(media, cropped, bot.exif);
			break;

			case 'videoMessage':
				media = await v.download();
				cropped = /\-x/i.test(m.text);
				buffer = await videoToWebp(media, cropped, bot.exif);
			break;
		}

		if (!buffer) return m.reply('🚩 Error al realizar la convercion.');

		await m.replyStik(buffer);
		await m.react(react.global);
	}
};