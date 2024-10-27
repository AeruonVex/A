const { exec } = require('child_process');
const { readFile, writeFile } = require('fs/promises');

module.exports = {
	tag: 'Converter',
	models: '%prefix%command `video`',
	desc: 'Convierte un video en un audio MP3',
	cases: ['tomp3', 'amp3', 'toaudio'],
	run: async(m, { v, getRandom }) => {
		if (!v.isMedia || !/video/.test(v.mime)) return m.reply(`🚩 Mencione o envie un video para convertirlo en audio.\n\n*Ejemplo:* ${m.prefix+m.command} <video>\n\n> *Nota:* Agregre -doc despues del comando para convertirlo en documento.`);

		await m.react(react.wait);

		addFilter(m.sender);

		let media = await v.download();
		let isDoc = /\-doc/.test(m.text);
		let nameMP4 = getRandom('mp4');
		let nameMp3 = getRandom('.mp3');

		await fs.writeFile(nameMP4, media);

		exec(`ffmpeg -i ${nameMP4} ${nameMp3}`, async (error) => {
			if (error) {
				await m.react(react.error);
				await m.reply('🚩 Error al convertir en audio.');
				await fs.unlinkSync(nameMP4);
			};

			let file = await fs.readFile(nameMp3);

			if (isDoc) await m.replyDoc(file, { caption: mess.fakeconvert, mimetype: 'audio/mpeg', filename: `${Date.now()}-convert-audio.mp3` });
			else await m.replyAud(file, { ptt: false });

			await m.react(react.global);

			Promise.all([fs.unlink(nameMP4), fs.unlink(nameMp3)]);
		});
	}
};