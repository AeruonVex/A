module.exports = {
	tag: 'Download',
	models: '%prefix%command `url`',
	desc: 'Descargar una cancion de YouTube con una url que proveea el usuario.',
	cases: ['ytmp3'],
	run: async(m, { h2k, runtime, resizeImg }) => {
		if (!m.bodyUrl || !/youtube\.com(\/shorts)?|youtu\.be\//.test(m.bodyUrl)) return m.reply(`🚩 Ingrese un link de YouTube para descargar.\n\n*Ejemplo:* ${m.prefix+m.command} https://youtube.com/watch?v=XXXXX`);
		
		await m.react(react.wait);

		addFilter(m.sender);
		
		let { status, data, message } = await api.get('/download/youtube-audio', { url: m.bodyUrl });

		if (!status) return m.reply(`🚩 Error al realizar la descarga.`);

		let image = await resizeImg(data.thumbnail, 200);

		let teks = '\t\t\t*「 ✦ Download YouTube ✦ 」*\n\n';
		teks += `*⎔ Titulo:* ${data.title}\n`;
		teks += `*⎔ Duracion:* ${data.duration}\n`;
		teks += `*⎔ Calidad:* ${data.quality}\n`;
		teks += `> ${mess.fakedata}`;


		if (!/\-\-debug/gi.test(m.text)) await m.reply(teks, { ads: true, render: true, title: 'YouTube Download', body: `${mess.fake}`, image: data.thumbnail, link: m.bodyUrl });

		await m.react(react.global);

		await m.replyAud(data.link, { ptt: false });
	}
};