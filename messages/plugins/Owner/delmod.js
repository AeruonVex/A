const { readFileSync, writeFileSync } = require('fs');

module.exports = {
	isOwner: true,
	tag: 'Owner',
	models: '%prefix%command `@user | quoted`',
	desc: 'Quita a un participante de los moderadores del bot etiquetando un mensaje o al usuario.',
	cases: ['delmod', 'quitarmod'],
	run: async(m, { sock }) => {
		let participant = m.isQuoted ? m.quoted.sender : m.mentions ? m.mentions[0] : null;
		if (!participant) return m.reply(`🚩 Utilice: ${m.prefix+m.command} @user o mencione un mensaje`);

		let mods = mods_config.map((v) => v.number + '@s.whatsapp.net');
		let owners = owner_config.map((v) => v.number + '@s.whatsapp.net');

		if (!mods.includes(participant)) return m.reply('🚩 Este usuario no es moderador del bot.'); 
		if (participant === m.sender || participant === m.botNumber || owners.includes(participant)) return m.reply(`🚩 Utilice: ${m.prefix+m.command} @user o mencione un mensaje`);		

		let index = global.mods_config.findIndex((v) => v.number === participant.split('@')[0]);

		if (index !== -1) {
			global.mods_config.splice(index, 1);

			let data = JSON.parse(readFileSync('tmp/bot.json', 'utf-8'));

			data.mods_config = global.mods_config;

			writeFileSync('tmp/bot.json', JSON.stringify(data, null, 2), 'utf-8');

			await m.react(react.owner);
			await m.reply('✅ Se quito de los moderadores a @' + participant.split('@')[0] + ' correctamente. `Ahora ya no tiene funciones de moderador en el menu`.')
		};
	}
};