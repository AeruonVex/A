const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
	models: '%prefix%command',
	desc: 'Despliega el menu de comandos del bot.',
	cases: ['menu', 'commands'],
	run: async(m, { bot, user, chat, fontsConvert, runtime }) => {
		let filterCommand = function (commandTag) {
			let Vplugins = plugins.filter((v) => v.run && typeof v.run === 'function' && v.tag && v.tag.toLowerCase() === commandTag.toLowerCase())
			.sort((a, b) => Array.isArray(a.cases) && a.cases[0].localeCompare(b.cases[0]))
			.map((x) => {
				let command = Array.isArray(x.cases) ? x.cases[0] : x.cases.source.replace(/\?|\^|\$|\(|\)|\[|\]|\|/g, ' ').trim().split(/ +/)[0];

				if (x.models) {
					if (x?.isBotAdmin && !m.isBotAdmin) return null;
					else if (x?.isAdmin && !m.isAdmin) return null;
					else if (x?.isOwner && !m.isOwner) return null;
					else if (x?.isGroup && !m.isGroup) return null;
					else if (x?.isNsfw && !chat.nsfw) return null;
					else if (x?.isPremium && !user.premium) return null;
					else return `*⁜* ${x.models.replace('%prefix', m.prefix).replace('%command', fontsConvert(command, 1))}`;
				}
			}).filter(Boolean).join('\n');

			return Vplugins || false;
		};

		let time = moment.tz('America/Argentina/Buenos_Aires').format('HH:MM');
		let saludo = (time > '06:00' && time < '11:59') && 'Buenos Dias 🏙️' || (time > '12:00' && time < '20:00') && 'Buenas Tardes 🌇' || (time > '20:00' && time < '23:59') && 'Buenas Noches 🌃' || 'Buenas 🌆';
		let baileys = JSON.parse(fs.readFileSync('node_modules/baileys/package.json'));

		let menuText = `> *Hola ${saludo} ${user.name} bienvenid@ al menu*`;
		menuText += `\n\n*◈ Available Prefix:* ${prefix.map((a) => `[${a}]`).join('')}`;
		menuText += `\n*◈ Database:* 'Local'`;
		menuText += `\n*◈ Conexion:* '${baileys.name}'`;
		menuText += `\n*◈ Version:* '${baileys.version}'\n${String.fromCharCode(8206).repeat(4000)}\n`;
		menuText += filterCommand('Converter') ? `> *❏ Convertidores:*\n${filterCommand('Converter')}\n\n` : '';
		menuText += filterCommand('Tools') ? `> *❏ Herramientas:*\n${filterCommand('Tools')}\n\n` : '';
		menuText += filterCommand('NSFW') ? `> *❏ NSFW (+18):*\n${filterCommand('NSFW')}\n\n` : '';
		menuText += filterCommand('Download') ? `> *❏ Descargas:*\n${filterCommand('Download')}\n\n` : '';
		menuText += filterCommand('Search') ? `> *❏ Busqueda:*\n${filterCommand('Search')}\n\n` : '';
		menuText += filterCommand('Random') ? `> *❏ Random:*\n${filterCommand('Random')}\n\n` : '';
		menuText += filterCommand('Games') ? `> *❏ Juegos:*\n${filterCommand('Games')}\n\n` : '';
		menuText += filterCommand('Group') ? `> *❏ Grupo:*\n${filterCommand('Group')}\n\n` : '';
		menuText += filterCommand('Other') ? `> *❏ Otros:*\n${filterCommand('Other')}\n\n` : '';
		menuText += filterCommand('Premium') ? `> *❏ Premium:*\n${filterCommand('Premium')}\n\n` : '';
		menuText += filterCommand('Owner') ? `> *❏ Owner & Staff:*\n${filterCommand('Owner')}\n` : '';
		menuText += `\n> *${mess.fake}*`;

		await m.react(react.global);
		await m.reply(menuText.trim(), {
			ads: true,
			render: true,
			adAttrib: true,
			title: fontsConvert(`Modo: '${bot.self ? 'Privado' : 'Publico'}'`, 10),
			body: fontsConvert(`Bot online: ${runtime(process.uptime())}`, 10),
			image: menuTemplate,
			link: 'https://vanitas-api.online/docs'
		});
	}
}