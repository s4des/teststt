const axios = require('axios');
const srod = require('srod-v2');

module.exports = {
  config: {
    name: 'advice',
    version: '1.0',
    author: 'zach',
    countDown: 5,
    role: 0,
    shortDescription: '',
    longDescription: {
      en: 'Get a random advice.',
    },
    category: 'study',
    guide: {
      en: '{prefix} <>',
    },

    langs: {
      en: {
        final: "🤖 | TRANSLATING |",
        loading: "🤖 | TRANSLATING |\n━━━━━━━━━━━━━━━\n⏳ | 𝙋𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩......\n━━━━━━━━━━━━━━━\n",
      },
    },
  },

  onStart: async function ({ api, event, args, message, getLang }) {
    try {
      const loadingMessage = getLang("loading");
      const loadingReply = await message.reply(loadingMessage);

      const adviceResult = await srod.GetAdvice();
      const advice = adviceResult.embed.description;

      const translatedAdvice = await translateAdvice(advice, message);

      const finalMsg = `𝙎𝙤𝙥𝙝𝙞𝙖 𝘼𝙄:  ${translatedAdvice}`;

      await api.editMessage(finalMsg, loadingReply.messageID);
    } catch (error) {
      console.error(error);
    }
  },
};

async function translateAdvice(advice, message) {
  try {
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(advice)}`
    );
    const translations = response.data[0];
    const translatedAdvice = translations.reduce((accumulator, translation) => {
      if (translation[0]) {
        accumulator += translation[0];
      }
      return accumulator;
    }, '');
    return translatedAdvice;
  } catch (error) {
    console.error(error);
    return 'Error translating advice.';
  }
}
