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

    onStart: async function ({ args, message, event, getLang, api, threadsData }) {
        try {
            const loadingMessage = getLang("loading");
            const loadingReply = await message.reply(loadingMessage);
            const langCode = await threadsData.get(event.threadID, "settings.lang") || global.GoatBot.config.language;
            const yourMessage = args.join(" ");
            const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=${langCode}&message=${yourMessage}&filter=false`);
            if (!res.data.success) {
                throw new Error('API returned a non-successful message');
            }
            await api.editMessage(loadingReply.messageID, `${res.data.success}`);
        } catch (err) {
            console.error('Error while getting a message:', err);
            throw err;
        }
    },

    onChat: async function ({ args, message, threadsData, event, isUserCallCommand, getLang, api }) {
        if (!isUserCallCommand || args.length < 1) {
            return;
        }
        try {
            const loadingMessage = getLang("loading");
            const loadingReply = await message.reply(loadingMessage);
            const langCode = await threadsData.get(event.threadID, "settings.lang") || global.GoatBot.config.language;
            const yourMessage = args.join(" ");
            const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=${langCode}&message=${yourMessage}&filter=false`);
            if (!res.data.success) {
                throw new Error('API returned a non-successful message');
            }
            await api.editMessage(loadingReply.messageID, `${res.data.success}`);
        } catch (err) {
            console.error('Error while getting a message:', err);
            throw err;
        }
    }
};
