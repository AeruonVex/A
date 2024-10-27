module.exports = {
    isGroup: true,
    tag: 'Automatic',
    desc: 'Detecta los mensajes eliminados de un grupo y los reenvia.',
    start: async(m, { chat, user, sock }) => {
        if (chat.antidelete) {
            if (sock.messages.length > 500) sock.messages = [];
            if (m.type !== 'protocolMessage' && m.key && m.message) sock.messages.push({ key: m.key, message: m.message });
            if (m.type == 'protocolMessage') {
                let msg = sock.messages.find((index) => index.key.id === m.msg.key.id);

                if (msg) {
                    let quoted = { key: msg.key, message: { extendedTextMessage: { text: '🚩 Este mensaje fue eliminado.' } } };

                    await m.replyForward(msg, { isReadOneView: true, viewOnce: false, quoted });

                    let index = sock.messages.indexOf(msg);

                    if (user.countMsg > 0) user.countMsg -= 1;
                    if (index !== -1) sock.messages.splice(index, 1);
                };
            };
        };
    }
};