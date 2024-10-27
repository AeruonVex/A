module.exports = {
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    tag: 'Group',
    models: '%prefix%command `close | open | lock | unlock`',
    desc: 'Cambia los ajustes del grupo.',
    cases: ['group', 'chat', 'settings'],
    run: async(m, { sock, group }) => {
        await m.react(react.wait);

        switch(m.query) {
            case 'close':
                if (group.announce) return m.reply('🚩 El grupo ya se encuentra cerrado.');
                await sock.groupSettingUpdate(m.from, 'announcement');
                await m.react(react.admin);
                await m.reply('✅ El grupo se cerro con exito.');
            break;

            case 'open':
                if (!group.announce) return m.reply('🚩 El grupo ya se encuentra abierto.');
                await sock.groupSettingUpdate(m.from, 'not_announcement');
                await m.react(react.admin);
                await m.reply('✅ El grupo se abrio con exito.');
            break;

            case 'lock':
                if (group.restrict) return m.reply('🚩 Ya estan bloqueadas las configuraciones del grupo.');
                await sock.groupSettingUpdate(m.from, 'locked');
                await m.react(react.admin);
                await m.reply('✅ Los ajustes del grupo se bloquearon solo para los admins con exito.');
            break;

            case 'unlock':
                if (!group.restrict) return m.reply('🚩 Ya estan desbloqueados las configuraciones del grupo.');
                await sock.groupSettingUpdate(m.from, 'unlocked');
                await m.react(react.admin);
                await m.reply('✅ Los ajustes del grupo se desbloquearon para todos los participantes con exito.');
            break;

            default:
                await m.react(react.error);
                await m.reply(`🚩 Utilice: ${m.prefix+m.command} open | close | lock | unlock`);
        };
    }
};