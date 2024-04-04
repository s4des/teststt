const axios = require('axios');
const apii = `https://gemini-api.replit.app`;

module.exports = {
  config: {
    name: 'gpt4',
    author: 'Charlie, API by Deku',
    role: 0,
    category: 'ai',
    shortDescription: 'gemini (conversational)',
  },

  langs: {
        en: {
            balance: "GPT-4",
            loading: "GPT-4\n━━━━━━━━━━━━━━━\n⏳Please wait...\n━━━━━━━━━━━━━━━"
        }
  },


  onStart: async function ({ api, event, getLang, args, message }) {
    const prompt = args.join(' '),
    uid = event.senderID;
   let url;
    if (!prompt) return message.reply('Missing prompt.');

    const loadingMessage = getLang("loading");
    const loadingReply = await message.reply(loadingMessage);

    if (event.type == "message_reply"){
        if (event.messageReply.attachments[0]?.type == "photo"){
        url = encodeURIComponent(event.messageReply.attachments[0].url);
        const res = (await axios.get(apii + "/gemini?prompt="+prompt+"&url="+url+"&uid="+uid)).data;
        const userName = getLang("balance");
      const msg = `${userName}\n━━━━━━━━━━━━━━━\n${res.gemini}\n━━━━━━━━━━━━━━━\n`;
       api.editMessage(msg, loadingReply.messageID, res);
        } else {
          return message.reply('Please reply to an image.')
        }
    }
      const rest = (await axios.get(apii + "/gemini?prompt=" + prompt + "&uid=" + uid)).data;
      const userName = getLang("balance");
      const msg = `${userName}\n━━━━━━━━━━━━━━━\n${rest.gemini}\n━━━━━━━━━━━━━━━\n`;
       api.editMessage(msg, loadingReply.messageID, rest);
  }
}





