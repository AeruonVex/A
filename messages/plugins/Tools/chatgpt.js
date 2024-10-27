module.exports = {
	tag: 'Tools',
	models: '%prefix%command `text`',
	desc: 'Conversa o resuelve tus dudas con una inteligencia artificial.',
	cases: ['ia', 'ai', 'chatgpt'],
	run: async(m) => {
		if (!m.text) return m.reply(`🚩 Ingrese un texto para interactuar con la IA.\n\n*Ejemplo:* ${m.prefix+m.command} ¿Que es una API rest?`);

		await m.react(react.wait);

		addFilter(m.sender, 8000);

		let { status, data, message } = await api.get('/tools/chat-gpt', { text: m.text });

		if (!status) return m.reply(`🚩 Error al realizar la funcion.`);

		await m.reply(data.trim());
		await m.react(react.global);
	}
};