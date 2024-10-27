const { generateMessageIDV2 } = require('baileys');

module.exports = {
	isOwner: true,
	tag: 'Owner',
	models: '%prefix%command `text` `-mentions`',
	desc: 'Envia un anuncio a todos los grupos mencioando o no a todos los participantes. Usar -mentions despues del comando hace que etiquete a todos los participantes del grupo a donde se envio el anuncio.',
	cases: ['broadcast', 'bc', 'bcgp'],
	run: async(m, { v, sock, runtime, resizeImg }) => {
		if (!v.msg || `${v.prefix+v.command}` === v.body) return m.reply('🚩 `Escriba` o `mencione` un mensaje para reenviar a todos los grupos donde el bot se encuentra.');

		let groups = Object.keys(sock.chats);
		let quoted = { key: { id: generateMessageIDV2(), participant: '13135550002@s.whatsapp.net', remoteJid: 'status@broadcast' }, message: { imageMessage: { caption: `「 ✦ Anuncio by ${botName} ✦ 」`, jpegThumbnail: await resizeImg(renderTemplate, 200) } } };
		let isMentions = m.args.includes('-mentions');

		for (let group of groups) {
			let { participants } = sock.chats[group];

			let teks = m.text ? m.text : v.text;
			let mentions = isMentions ? [...participants.map((v) => v.id), ...sock.parseMentions(teks)] : [...sock.parseMentions(teks)];

			await m.replyForward(v, { from: group, caption: teks?.replace(/\-(mentions?|mencion|mencionar?)/gi, ''), mentions, quoted });
			await m.delay(5000);
		};

		await m.react(react.admin);
		await m.reply('✅ Se `envio` correctamente el anuncio a ' + groups.length + ' grupo(s) en ' + runtime(groups.length * 5) + '.');
	}
};