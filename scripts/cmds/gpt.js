const axios = require('axios');

const api = axios.create({
  baseURL: 'https://sandipapi.onrender.com/',
});

module.exports = {
  config: {
    name: "gpt",
    version: 2.0,
    author: "OtinXSandip",
    longDescription: "chatgpt",
    category: "ai",
    guide: {
      en: "{p}{n} questions",
    },
  },
  async makeApiRequest(encodedPrompt, uid, a) {
    const response = await api.get(`gpt2?prompt=${encodedPrompt}&uid=${uid}`);
    return response.data;
  },
  async handleCommand({ message, event, args }) {
    const uid = event.senderID;
    const encodedPrompt = encodeURIComponent(args.join(" "));
    const a = "repl";

    if (!encodedPrompt) {
      return message.reply("Please provide questions");
    }

    if (args[0] === 'draw') {
      const [promptText, model] = args.slice(1).join(' ').split('|').map((text) => text.trim());
      const puti = model || "2";
      const url = `sdxl?prompt=${promptText}&model=${puti}`;

      try {
        const response = await api.get(url);
        const body = `🗨 | 𝙲𝚑𝚊𝚝𝙶𝙿𝚃 | \n━━━━━━━━━━━━━━━━\n${args.join(" ")}\n${response.data}\n━━━━━━━━━━━━━━━━`;

        message.reply({
          body,
          attachment: await global.utils.getStreamFromURL(response.data)
        });
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      try {
        const result = await this.makeApiRequest(encodedPrompt, uid, a);
        const body = `🗨 | 𝙲𝚑𝚊𝚝𝙶𝙿𝚃 | \n━━━━━━━━━━━━━━━━\n${result}\n━━━━━━━━━━━━━━━━`;

        message.reply({
          body,
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            messageID: info.messageID,
            author: event.senderID
          });
        });
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  },
  onStart: function (params) {
    return this.handleCommand(params);
  },
  onReply: function (params) {
    return this.handleCommand(params);
  },
};