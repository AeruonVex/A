module.exports = {
	isOwner: true,
	tag: 'Owner',
	models: '%prefix%command',
	desc: 'Reinicia el proceso principal del bot.',
	cases: ['reiniciar', 'reset'],
	run: async(m, { sock }) => {
		if (!process.send) return m.reply('🚩 El bot no se esta ejecutando con `monitor.js` incie ese archivo para poder reiniciar por comando. Si no hagalo manualmente.');

		await m.react(react.wait);
		await m.reply('Aguarde reiniciando...');
		await m.delay(2000);
		process.send('reset');
	}
};