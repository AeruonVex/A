module.exports = {
    isOwner: true,
    tag: 'Owner',
    models: '%prefix%command',
    desc: 'Muestra una lista de los stickers que se usan para comandos.',
    cases: ['getcmd', 'cmdget', 'sendcmd'],
    run: async(m) => {
        if (!m.query) return m.reply('🚩 Ingrese un ID de la lista de cmd para enviar el sticker.');

        let cmd = Object.values(db.stickers);
        let index = cmd.find((v) => v.id.toLowerCase() == m.query);

        if (!index) return m.reply('🚩 No se encontro ningun sticker con ese ID. Revise la lista de cmd con `cmdlist`');

        let media = Buffer.from(index.buffer, 'base64');

        await m.reply(`El siguiente sticker pertenece al comando: *${index.command}*`);
        await m.react(react.owner);
        await m.replyStik(media);
    }
};