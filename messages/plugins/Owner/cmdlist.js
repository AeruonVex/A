module.exports = {
    isOwner: true,
    tag: 'Owner',
    models: '%prefix%command',
    desc: 'Muestra una lista de los stickers que se usan para comandos.',
    cases: ['cmdlist', 'listcmd', 'cmd'],
    run: async(m) => {
        let cmds = Object.keys(db.stickers);
        let number = 1;
        let teks = '\t\t\t*[ Lista de Comandos ]*\n\n';
        teks += '*Si desea ver el sticker del comando use `getcmd` y el id del sticker.*\n\n';

        if (cmds.length === 0) return m.reply('🚩 No hay ningun comando con sticker agregado a la lista.')

        for (let cmd of cmds) {
            teks += `*Comando N°${number++}:*\n`;
            teks += `*ID:* ${db.stickers[cmd].id}\n`;
            teks += `*Comando:* ${db.stickers[cmd].command}\n`;
			teks += '\n────────────※ ·❆· ※────────────\n\n';
        };

        teks += `> ${mess.fake}`;

        await m.react(react.owner);
        await m.reply(teks);
    }
};