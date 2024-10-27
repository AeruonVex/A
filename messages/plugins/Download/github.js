module.exports = {
	tag: 'Download',
	models: '%prefix%command `url`',
	desc: 'Descarga repositorios de Github en formato zip.',
	cases: ['gitclone', 'git-pull', 'git'],
	run: async(m, { chat }) => {
		if (!m.bodyUrl || !/github\.com\//i.test(m.bodyUrl)) return m.reply(`🚩 Ingrese un link de Github para descargar.\n\n*Ejemplo:* ${m.prefix+m.command} https://github.com/XXXXX`);

		await m.react(react.wait);

		addFilter(m.sender);

		let { status, data, message } = await api.get('/download/github', { url: m.bodyUrl });

		if (!status) return m.reply('🚩 `Error` al realizar la descarga.');

		let teks = '\t\t\t*「 ✦ Git Clone ✦ 」*\n\n';
		teks += `*⎔ Nombre:* ${data.title}\n`;
		teks += `*⎔ Author:* ${data.author}\n`;
		teks += `*⎔ Lenguaje:* ${data.language}\n`;
		teks += `*⎔ Peso:* %size\n`;
		teks += `*⎔ Descripcion:* ${data.description}\n\n`;
		teks += `> ${mess.fakedata}`;

		await m.react(react.global);
		await m.replyDoc(data.link, { caption: teks, filename: data.output, mimetype: data.mimetype });
	}
};