const axios = require("axios");

module.exports = {
  config: {
    name: "rizz",
    aliases: ["pickupline"],
    version: "1.0",
    author: "zach",
    countDown: 5,
    role: 0,
    shortDescription: "Get pickup lines",
    longDescription: {
      en: "Get random pickup lines.",
    },
    category: "fun",
    guide: {
      en: "{prefix}pickuplines",
    },
  },
  langs: {
    en: {
      final: "🤖 | RIZZ |",
      loading: "🤖 | RIZZ |\n━━━━━━━━━━━━━━━\n⏳ | 𝙋𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩......\n━━━━━━━━━━━━━━━\n",
    },
  },
  onStart: async function ({ api, event, getLang, message }) {
    try {
      const loadingMessage = getLang("loading");
      const loadingReply = await message.reply(loadingMessage);
      const response = await axios.get("https://api.popcat.xyz/pickuplines");


      const { pickupline } = response.data;
      const finalMsg = `💘 ${pickupline}`;
      // You need to define finalMsg and loadingReply.messageID somewhere in your code
      return api.editMessage(finalMsg, loadingReply.messageID);
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
};
