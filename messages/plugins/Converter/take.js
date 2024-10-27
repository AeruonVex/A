const { writeFileSync, unlinkSync } = require('fs');

module.exports = {
	tag: 'Converter',
	models: '%prefix%command `quoted sticker`',
	desc: 'Cambia el nombre de un sticker por uno personalizado.',
	cases: ['take', 'exif', 'make'],
	run: async(m, { v, bot, writeExif, getRandom }) => {
		if (!m.text || !/webp$/.test(v.mime)) return m.reply(`🚩 Mencione un sticker junto con el nombre que le quiera dar.\n\n*Ejemplo:* ${m.prefix+m.command} Bot|${botName}`);

		await m.react(react.wait);

		addFilter(m.sender);

		let [packname, author] = m.text.split(/(\/|\||\\)/);
		let media = await v.download();
		let pathName = getRandom('.webp');

		writeFileSync(pathName, media);

		let buffer = await writeExif(pathName, { packname, author, emojis: bot.exif.emojis });

		await m.react(react.global);
		await m.replyStik(buffer);

		unlinkSync(pathName);
	}
};