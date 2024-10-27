module.exports = {
	tag: 'Download',
	models: '%prefix%command `url`',
	desc: 'Descargar un video de YouTube con una url que proveea el usuario.',
	cases: ['ytmp4'],
	run: async(m, { h2k, runtime, resizeImg }) => {
		if (!m.bodyUrl || !/youtube\.com(\/shorts)?|youtu\.be\//.test(m.bodyUrl)) return m.reply(`🚩 Ingrese un link de YouTube para descargar.\n\n*Ejemplo:* ${m.prefix+m.command} https://youtube.com/watch?v=XXXXX`);

		await m.react(react.wait);

		addFilter(m.sender);

		let { status, data, message } = await api.get('/download/youtube-video', { url: m.bodyUrl, base64: true });

		if (!status) return m.reply(`🚩 Error al realizar la descarga.`);

		let image = await resizeImg(data.thumbnail, 200);

		let teks = '\t\t\t*「 ✦ Download YouTube ✦ 」*\n\n';
		teks += `*⎔ Titulo:* ${data.title}\n`;
		teks += `*⎔ Duracion:* ${data.duration}\n`;
		teks += `*⎔ Calidad:* ${data.quality}\n`;
		teks += `> ${mess.fakedata}`;

		await m.react(react.global);

		await m.replyVid(data.link, { caption: teks, gif: false });
	}
};