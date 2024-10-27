module.exports = {
	isOwner: true,
	tag: 'Owner',
	models: '%prefix%command `url`',
	desc: 'Hace que el bot ingrese a un grupo con el enlace enviado.',
	cases: ['join', 'ingresar'],
	run: async(m, { sock }) => {
		if (!/chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/.test(m.bodyUrl)) return m.reply('🚩 Ingrese un link de un grupo de `WhatsApp` para hacer que el bot ingrese.');

		let decodeLink = m.bodyUrl.split('chat.whatsapp.com/')[1];
		let { id, participants, subject, joinApprovalMode } = await sock.groupGetInviteInfo(decodeLink);

		if (!(id in sock.chats)) {
			await m.react(react.wait);

			if (participants.length < 10) return m.reply('🚩 Lo siento el grupo debe tener un minimo de 10 participantes para poder ingresar.');

			await sock.groupAcceptInvite(decodeLink);

			await m.react(react.owner);
	
			await m.reply(`✅ Se ${joinApprovalMode ? '`solicito ingresar`' : '`ingreso`'} al grupo *'${subject}'* correctamente.`);
		};
	}
};