module.exports = {
	tag: 'Download',
	models: '%prefix%command `url`',
	desc: 'Descarga archivos de MediaFire. (Si pesa demasiado el archivo consumira mucha mas RAM)',
	cases: ['mediafire', 'mfire', 'mf'],
	run: async(m, { chat }) => {
		if (!m.bodyUrl || !/mediafire\.com\/(file|download)/i.test(m.bodyUrl)) return m.reply(`🚩 Ingrese un link de MediaFire para descargar.\n\n*Ejemplo:* ${m.prefix+m.command} https://www.mediafire.com/XXXXX`);

		await m.react(react.wait);

		addFilter(m.sender);

		let { status, data, message } = await api.get('/download/mediafire', { url: m.bodyUrl });

		if (!status) return m.reply(`🚩 Error al realizar la descarga.`);

		let teks = '\t\t\t*「 ✦ MediaFire Download ✦ 」*\n\n';
		teks += `*⎔ Nombre:* ${data.title}\n`;
		teks += `*⎔ Tipo:* ${data.filetype}\n`;
		teks += `*⎔ Subido en:* ${data.published}\n`;
		teks += `*⎔ Peso:* ${data.filesize}\n\n`;
		teks += `> ${mess.fakedata}`;

		await m.react(react.global);
		await m.replyDoc(data.link, { isDoc: true, caption: teks, filename: data.filename, mimetype: data.mimetype });
	}
};