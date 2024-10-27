const { readFileSync, writeFileSync } = require('fs');

module.exports = {
	isOwner: true,
	tag: 'Owner',
	models: '%prefix%command `@user | quoted`',
	desc: 'Agrega a un participante a los moderadores del bot etiquetando un mensaje o al usuario.',
	cases: ['addmod', 'darmod'],
	run: async(m, { sock }) => {
		let participant = m.isQuoted ? m.quoted.sender : m.mentions ? m.mentions[0] : null;
		if (!participant) return m.reply(`🚩 Utilice: ${m.prefix+m.command} @user o mencione un mensaje`);

		let mods = mods_config.map((v) => v.number + '@s.whatsapp.net');
		let owners = owner_config.map((v) => v.number + '@s.whatsapp.net');

		if (mods.includes(participant) || owners.includes(participant)) return m.reply('🚩 Este usuario ya es moderador del bot.');
		if (participant === m.sender || participant === m.botNumber) return m.reply(`🚩 Use: ${m.prefix+m.command} @user o mencione un mensaje`);

		global.mods_config.push({ name: await sock.getName(participant), number: participant.split('@')[0] });
		
		let data = JSON.parse(readFileSync('tmp/bot.json', 'utf-8'));

		data.mods_config = global.mods_config;

		writeFileSync('tmp/bot.json', JSON.stringify(data, null, 2), 'utf-8');

		await m.react(react.owner);
		await m.reply('✅ Se agrego a los moderadores a @' + participant.split('@')[0] + ' correctamente. `Ahora tiene funciones nuevas desbloqueadas revise el menu`.')
	}
};