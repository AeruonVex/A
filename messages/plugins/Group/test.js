module.exports = {
	isGroup: true,
	isAdmin: true,
	tag: 'Group',
	models: '%prefix%command `welcome | bye`',
	desc: 'Realiza una prueba para vizualizar la bienvenida o la despedida del grupo.',
	cases: ['test'],
	run: async(m, { chat, group, sock }) => {
		if (!chat.welcome) return m.reply('🚩 La bienvenida del grupo debe estar activa para usar esta funcion.');

		await m.react(react.wait);

		addFilter(m.sender);

		let avatar;

		switch(m.query) {

			case 'welcome':
				avatar = await sock.profilePictureUrl(m.sender, 'image').catch(() => bot['render-template']);
				let textWelcome = chat.welText.replace(/\@(usuario|user)/g, `@${m.senderNumber}`).replace(/\@(group|grupo)/g, group.subject).replace(/\@(desc|descripcion|description)/g, group.desc).replace(/\@(bot|botcito)/g, bot.name);
				await m.react(react.admin);

				await m.reply(textWelcome, {
					ads: true,
					render: true,
					title: 'Bienvenid@ al grupo',
					body: 'Cumple con las normas para permanecer en el grupo.',
					image: avatar
				});
			break;

			case 'bye':
 				avatar = await sock.profilePictureUrl(m.sender, 'image').catch(() => bot['render-template']);
				let textBye = chat.byeText.replace(/\@(usuario|user)/g, `@${m.senderNumber}`).replace(/\@(group|grupo)/g, group.subject).replace(/\@(desc|descripcion|description)/g, group.desc).replace(/\@(bot|botcito)/g, bot.name);
				await m.react(react.admin);

				await m.reply(textBye, {
					ads: true,
					render: true,
					title: 'Un usuario a salido del grupo',
					body: 'El usuario salio del grupo.',
					image: avatar
				});
			break;

			default:
				await m.react(react.error);
				await m.reply(`🚩 Utilice: ${m.prefix+m.command} welcome | bye`);
		}
	}
}