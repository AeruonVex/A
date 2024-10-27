let unavalible = false;

module.exports = {
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	tag: 'Group',
	models: '%prefix%command `@user | number`',
	desc: 'Agrega a un participante al grupo. En caso de estar privado se envia una invitacion.',
	cases: ['add', 'adduser', 'invite'],
	run: async(m, { sock, group, resizeImg }) => {
		if (unavalible) return;

		let member = m.isQuoted ? m.quoted.sender : /\+?[0-9]/g.test(m.text) ? m.text.replace(/\D/g, '') + '@s.whatsapp.net' : undefined;

		if (!member || member === m.sender || member === m.botNumber) return m.reply(`🚩 Mencione un usuario para agregarlo al grupo o invitarlo.`);

		let participants = group.participants.map((v) => sock.decodeJid(v.id));

		if (participants.includes(member)) return m.reply('🚩 El participante que selecciono ya se encuentra en el grupo.');

		await m.react(react.wait);

		unavalible = true;

		await sock.groupParticipantsUpdate(m.from, [member], 'add')
		.then(async(update) => {
			for (let { status, content } of update) {
				if (status === '200') {
					await m.react(react.admin);
					await m.reply('✅ Se agrego al grupo el participante.');
				} else if (status == '403') {
					await m.react(react.wait);

					let code = content.content[0].attrs.code;
					let expiration = content.content[0].attrs.expiration;
					let picture = await sock.profilePictureUrl(m.from, 'image').catch(() => bot['render-template']);
					let { image } = await resizeImg(picture, 200);

					await m.replyInvite(member, code, expiration, group.subject, 'Invitacion a mi grupo de WhatsApp', image);

					await m.delay(2500);
					await m.reply('✅ El participante solo puede ser agregado por sus contactos. Pero se envio una invitacion para que se una');
					await m.react(react.admin);
				} else {
					await m.react(react.error);
					await m.reply('🚩 Lo siento no se pudo eliminar al participante seleccionado.');
				}
			}
		});

		setTimeout(() => unavalible = false, 35_000);
	}
};