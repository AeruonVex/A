const fs = require('fs/promises');
const qrcode = require('qrcode');

module.exports = {
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	tag: 'Group',
	models: '%prefix%command `-qr`',
	desc: 'Envia la invitacion del grupo en link o codigo QR usando -qr despues del comando.',
	cases: ['linkgp', 'gplink', 'linkgc'],
	run: async(m, { sock, getRandom }) => {
		await m.react(react.wait);

		addFilter(m.sender);

		let code = await sock.groupInviteCode(m.from);

		if (m.text.includes('-qr')) {
			let qrname = getRandom('.png');

			await qrcode.toFile(qrname, `https://chat.whatsapp.com/${code}`);

			let image = await fs.readFile(qrname);

			await m.replyImg(image, { caption: '✅ Se genero un link de invitacion en un codigo QR para escanear.' });
			await m.react(react.admin);

			await fs.unlink(qrname);
		} else {			
			await m.reply('✅ *El enlace es:* https://chat.whatsapp.com/' + code);
			await m.react(react.admin);
		};
	}
}