const { readFileSync, writeFileSync } = require('fs');

module.exports = {
    isOwner: true,
    tag: 'Owner',
    models: '%prefix%command `text`',
    desc: 'Cambia el nombre de perfil del bot.',
    cases: ['setname', 'namebot', 'botname'],
    run: async(m, { sock }) => {
        if (!m.text) return m.reply('🚩 Escriba un nombre para establecer en el bot.');

        let isBussines = await sock.getBusinessProfile(m.botNumber);

        if (isBussines) {
            await m.react(react.owner);
            await m.reply('🚩 El nombre del bot no puede actualizarse en un perfil Bussines. Pero se hara el cambio localmente.');
        } else {
            await sock.updateProfileName(m.text.trim());
            await m.react(react.owner);
            await m.reply('✅ Se `actualizo` el nombre del bot.');
        };

        global.botName = m.text.trim();

        let data = JSON.parse(readFileSync('tmp/bot.json', 'utf-8'));

        data.botName = global.botName;

        writeFileSync('tmp/bot.json', JSON.stringify(data, null, 2), 'utf-8');
    }
};