module.exports = {
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	tag: 'Group',
	models: '%prefix%command',
	desc: 'Muestra la lista de los prefijos que se agregaron para evitar que ingresen.',
	cases: ['fakelist', 'listfake'],
	run: async (m, { chat }) => {
		if (!chat.antifake) return m.reply('🚩 El antifake no esta activo en el grupo.');

		let list = chat.fakelist;
		let teks = '\t\t\t*「 ✦ Lista de Prefijos Fake ✦ 」*\n\n';

		if (list.length === 0) return m.reply('🚩 No tiene ningun prefijo agregado a la lista.');

		for (let fake of list) {
			teks += `*⇝* ${fake}\n`;
		};

		teks += `\n> ${mess.fake}`;

		await m.react(react.admin);
		await m.reply(teks);
	}
};