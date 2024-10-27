const moment = require('moment-timezone');

module.exports = {
	isOwner: true,
	tag: 'Owner',
	models: '%prefix%command',
	desc: 'Muestra una lista de los grupos donde esta el bot para que el desarrollador elija de donde quiere que el bot salga.',
	cases: ['leave', 'salir', 'grupos', 'chats'],
	start: async(m, { sock }) => {
		if (!m.isQuoted) return;
		if (!m.quoted.isMe) return;
		if (!/[0-9]/.test(m.text)) return;
		if (!m?.quoted?.body?.includes('@g.us')) return;

		let groups = [...m.quoted.text.matchAll(/Grupo ID: (\d+@g\.us)/g)].map((match) => match[1]);
		let selectGroup = groups[(m.text.match(/\d+/g) || [1, ''])[0] - 1];

		if (sock.chats[selectGroup]) {
			await sock.groupLeave(selectGroup);
			await m.reply('✅ Se salio de ' + sock.chats[selectGroup].subject + ' correctamente.', { from: m.botNumber });
		};
	},
	run: async(m, { sock }) => {
		await m.react(react.owner);

		let groups = Object.values(sock.chats);

		let number = 1;
		let teks = '\t\t\t*「 ✦ Lista de Grupos ✦ 」*\n\n';

		teks += `> Si quiere que el bot salga de un grupo responda a este mensaje con el numero de grupo.\n\n`;

		for (let group of groups) {
			let members = group.participants;
			let admins = group.participants.filter((v) => v.admin == 'admin' || v.admin == 'superadmin').length;
			let includeOwner = members.map((v) => v.id.split('@')[0]).some((v) => owner_config.map((i) => i.number).includes(v));
			let includeMods = members.map((v) => v.id.split('@')[0]).some((v) => mods_config.map((i) => i.number).includes(v));

			teks += '`Grupo N°` ' + (number++) + '\n';
			teks += `> ❏ ${group.subject}:\n`;
			teks += `*⁜* Creador: ${group.owner ? `@${group.owner.split('@')[0]}` : 'Sin Creador'}\n`;
			teks += `*⁜* Creado: ${moment(group.creation * 1000).format('DD/MM/YYYY')}\n`;
			teks += `*⁜* Participantes: ${members.length}\n`;
			teks += `*⁜* Owner en el grupo: ${includeOwner ? 'Si' : 'No'}\n`;
			teks += `*⁜* Mods en el grupo: ${includeMods ? 'Si' : 'No'}\n`;
			teks += `*⁜* Grupo ID: ${group.id}`;
			teks += '\n────────────※ ·❆· ※────────────\n\n';
		};

		teks += `> ${mess.fake}`;

		await m.reply(teks);
		await m.react(react.owner);
	}
};