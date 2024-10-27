module.exports = {
	isOwner: true,
	tag: 'Owner',
	models: '%prefix%command `packname/autor`',
	desc: 'Cambia el exif de los stickers creados por el bot, por el que ingrese.',
	cases: ['setexif', 'editexif'],
	run: async(m, { bot }) => {
		let [packname, author] = m.text.split(/\/|\||\-|\_|\|/);

		if (!packname || !author) return await m.reply('🚩 Ingrese un nombre de paquete y un autor.');

		bot.exif.author = author;
		bot.exif.packName = packname;

		await m.react(react.owner);
		await m.reply('✅ Se actualizo el exif de los stickers. Ahora todos tendran una firma diferente.');
	}
};