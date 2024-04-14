const axios = require("axios");

module.exports = {
    config: {
        name: 'sim',
        version: '1.2',
        author: 'KENLIEPLAYS',
        countDown: 3,
        role: 0,
        shortDescription: 'Simsimi ChatBot by Simsimi.fun',
        longDescription: {
            en: 'Chat with simsimi'
        },
        category: 'groups',
        guide: {
            en: '   {pn} <word>: chat with simsimi' + '\n   Example:{pn} hi'
        }
    },

    langs: {
        en: {
            chatting: 'Already Chatting with sim...',
            error: 'Server Down Please Be Patient',
            final: "🤖 | TYPING |",
            loading: "🤖 | TYPING |\n━━━━━━━━━━━━━━━\n⏳ | Please wait......\n━━━━━━━━━━━━━━━\n"
        },
    },

    onStart: async function ({ args, message, event, getLang, api }) {
        if (args[0]) {
            const yourMessage = args.join(" ");
            try {

                const responseMessage = await getMessage(yourMessage);
                await api.editMessage(loadingReply.messageID, `${responseMessage}`);
            }
            catch (err) {
                console.log(err)
                return message.reply(getLang("error"));
            }
        }
    },

    onChat: async function ({ args, message, threadsData, event, isUserCallCommand, getLang }) {
        if (!isUserCallCommand) {
            return;
        }
        if (args.length > 1) {
            try {
                const loadingMessage = getLang("loading");
      const loadingReply = await message.reply(loadingMessage);
                const langCode = await threadsData.get(event.threadID, "settings.lang") || global.GoatBot.config.language;
                const responseMessage = await getMessage(args.join(" "), langCode);
                await api.editMessage(loadingReply.messageID, `${responseMessage}`);
            }
            catch (err) {
                return message.reply(getLang("error"));
            }
        }
    }
};

async function getMessage(yourMessage, langCode) {
    try {
        const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=${langCode}&message=${yourMessage}&filter=false`);
        if (!res.data.success) {
            throw new Error('API returned a non-successful message');
        }
        return res.data.success;
    } catch (err) {
        console.error('Error while getting a message:', err);
        throw err;
    }
}
