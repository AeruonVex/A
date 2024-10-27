const { default: axios } = require('axios');

module.exports = {
    isOwner: true,
    tag: 'Owner',
    models: '%prefix%command `image | url`',
    desc: 'Cambia la foto de perfil del bot.',
    cases: ['ppbot', 'setppbot', 'setpp'],
    run: async(m, { v, sock }) => {
        if (!v.isMedia && !v.bodyUrl) return m.reply('🚩 Envie, mencione una imagen o use un url para cambiar la foto de perfil del bot.');

        let mime = v.isMedia ? v.mime : await (await axios(v.bodyUrl)).headers['content-type'];

        if (!/^image/.test(mime) || /webp$/.test(mime)) return m.reply('🚩 Mencione, envie o use una url que contenga una imagen.');

        let image = v.isMedia ? await v.download() : { url: v.bodyUrl };

        await m.react(react.wait);

        addFilter(m.sender);

        await sock.updateProfilePicture(m.botNumber, image);

        await m.react(react.owner);
        await m.reply('✅ Se `actualizo` la foto de perfil del bot correctamente.');
    }
};