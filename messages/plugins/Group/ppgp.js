const { default: axios } = require('axios');

module.exports = {
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    tag: 'Group',
    models: '%prefix%command `image | url`',
    desc: 'Cambia la foto de perfil del grupo por una nueva.',
    cases: ['ppgp', 'setppgp', 'ppgc'],
    run: async(m, { v, sock }) => {
        if (!v.isMedia && !v.bodyUrl) return m.reply('🚩 Envie, mencione una imagen o envie un url de una imagen para cambiar el icono del grupo.');

        let mime = v.isMedia ? v.mime : await (await axios(v.bodyUrl)).headers['content-type'];

        if (!/^image/.test(mime) || /webp$/.test(mime)) return m.reply('🚩 Asegurese que el multimedia que selecciono es una imagen.');

        let image = v.isMedia ? await v.download() : { url: v.bodyUrl };

        await m.react(react.wait);

        addFilter(m.sender);

        await sock.updateProfilePicture(m.from, image);

        await m.react(react.admin);
        await m.reply('✅ Se `actualizo` el icono del grupo con exito.');
    }
}