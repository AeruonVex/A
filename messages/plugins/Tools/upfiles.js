module.exports = {
	tag: 'Tools',
	models: '%prefix%command `media | quoted media`',
	desc: 'Sube a la nube un archivo multimedia y le otorga una url para acceder al archivo.',
	cases: ['upfile', 'files', 'cloudfile'],
	run: async(m, { v, bytesToSize }) => {
		if (!v.isMedia) return m.reply('🚩 Envie o mencione un archivo multimedia no mayor a `60MB`, con el comando para subirlo a la nube.');

		if (60000000 < v.size) return m.reply('🚩 El archivo que intenta subir pesa mas de 60MB.');

		await m.react(react.wait);

		addFilter(m.sender, 8000);

		let media = await v.download();
		let { status, data, message } = await api.post('/tools/upload-files', { file: media });

		if (!status) return m.reply(`🚩 Error al realizar la funcion.`);

		let teks = '\t\t\t*「 ✦ Upload Files ✦ 」*\n\n';
		teks += `*⎔ Nombre:* ${data.filename}\n`;
		teks += `*⎔ Hash:* ${data.hash}\n`;
		teks += `*⎔ Peso:* ${bytesToSize(v.size)}\n`;
		teks += `*⎔ URL:* ${data.url}\n`;
		teks += `\n> ${mess.fake}`;

		await m.react(react.global);
		await m.reply(teks);
	}
};