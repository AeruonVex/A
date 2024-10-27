const { format } = require('util');
const syntaxErr = require('syntax-error');

module.exports = {
	isOwner: true,
	tag: 'Owner',
	models: '%command `function`',
	desc: 'Comando para evaluar funciones y definiciones.',
	cases: /^(eval|~?>)/i,
	run: async(m, args) => {
		defineProperties(args, this);

		let body = m.body.replace(/eval|~|>/gi, '');

		let _text = /await|return/gi.test(body) ? `(async () => { ${body.trim()} })()` : `${body.trim()}`;
		let _syntax = '';
		let _result;

		try {
			_result = await eval(_text);
		} catch(error) {
			let err = await syntaxErr(_text, 'Sistema De Ejecucion');
			if (err) _result = err + '\n\n';
			_result = error;
		}

		await m.reply(_syntax + format(_result));
	}
};

function defineProperties(input, output, options = {}) {
	let { exclude = [] } = options;

	Object.entries(input).forEach(([key, value]) => {
		if (!exclude.includes(key)) {
			output[key] = value;
		};
	});
};