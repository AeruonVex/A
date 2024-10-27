const { format } = require('util');
const { exec } = require('child_process');

module.exports = {
	isOwner: true,
	tag: 'Owner',
	models: '%command `command`',
	desc: 'Ejecuta un comando directo en la consola. ¡Esto es un comando de riesgo!',
	cases: /^(exec|\$)/i,
	run: async(m) => {
		let command = m.body.replace(/exec|\$/gi, '');

		if (!command) {
			await m.react(react.error);
			await m.reply(`🚩 Por favor, ingrese un comando para ejecutar en la consola.\n\n*Ejemplo:* ${m.text} npm update baileys\n\n> ❗ Precaucion: ¡Si no sabe como opera el comando, *NO LO USE*!`);
			return;
		}

		exec(command, (error, stdout) => {
			if (error) return m.reply(`${format(error)}`.trim());
			if (stdout) return m.reply(`${format(stdout)}`.trim());
		})
	}
}