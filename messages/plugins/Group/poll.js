const crypto = require('crypto');

module.exports = {
	isAdmin: true,
	tag: 'Group',
	models: '%prefix%command `name/opt1/opt2/opt3`',
	desc: 'Crea una encuesta con el bot etiquetando a todos en el grupo.',
	cases: ['encuesta', 'poll', 'getpoll'],
	run: async(m, { sock, group }) => {
		let a = [];
		let b = m.text.split(/\/|\||\-/);

		if (!b[0]) return m.reply(`🚩 Ingrese un nombre a la encuesta para iniciarla.\n\n*Ejemplo:* ${m.prefix+m.command} ¿Programas en VSC?|Si|No|En otros`);
		if (!b[1]) return m.reply(`🚩 Ingrese opciones a la encuesta para iniciarla.\n\n*Ejemplo:* ${m.prefix+m.command} ¿Programas en VSC?|Si|No|En otros`);
		if (b[13]) return m.reply(`🚩 Ingreso demasiadas opciones para responder el limite es 12.`);

		for (let i = 1; i < b.length; i++) {

			for (let v = i + 1; v < b.length; v++) {
				if (b[i] === b[v]) return m.reply(`🚩 La opcion ${i} se repite con la opcion ${v}. Intente no poner las mismas opciones.`);
			};

			a.push(b[i]);
		};

		await m.react(react.wait);

		addFilter(m.sender);

		let teks = `\t\t\t*「 ✦ Encuesta by ${botName} ✦ 」*\n\n`;
		teks += `*• Encuesta:* ${b[0]}`;

		let createPollMessage = {
			pollCreationMessage: {
				name: teks,
				selectableOptionsCount: 1,
				options: a.map((v) => ({ optionName: v })),
				contextInfo: {
					mentionedJid: group.participants.map((v) => sock.decodeJid(v.id)),
					remoteJid: m.from
				}
			},
			messageContextInfo: {
				messageSecret: crypto.randomBytes(32)
			}
		};

		await m.react(react.admin);
		await sock.relayMessage(m.from, createPollMessage, {});
	}
};