const axios = require('axios');

module.exports = {
  config: {
    name: "gpt",
    version: 2.0,
    author: "OtinXSandip",
    shortDescription: "chatgpt",
    category: "ai",
    guide: {
      en: "{p}{n} questions",
    },
  },
  async makeApiRequest(encodedPrompt, uid, a) {
    try {
      const response = await axios.get(`https://sandipapi.onrender.com/gpt2?prompt=${encodedPrompt}&uid=${uid}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async handleCommand({ message, event, args, api }) {
    try {
      const uid = event.senderID;
      const encodedPrompt = encodeURIComponent(args.join(" "));
      const a = "repl";

      if (!encodedPrompt) {
        return message.reply("Please provide questions");
      }

      let header = "🗨 | 𝙲𝚑𝚊𝚝𝙶𝙿𝚃 | \n━━━━━━━━━━━━━━━━\n";
      let footer = "\n━━━━━━━━━━━━━━━━";

      if (args[0] === 'draw') {
        const [promptText, model = "2"] = args.slice(1).join(' ').split('|').map(text => text.trim());
        const baseURL = `https://sandipapi.onrender.com/sdxl?prompt=${promptText}&model=${model}`;

        const attachment = await global.utils.getStreamFromURL(baseURL);
        message.reply({
          body: `${header}${args.join(" ")}${footer}`,
          attachment
        });
      } else {
        const result = await this.makeApiRequest(encodedPrompt, uid, a);

        message.reply({
          body: `${header}${result}${footer}`,
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            messageID: info.messageID,
            author: event.senderID
          });
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
  onStart: function (params) {
    return this.handleCommand(params);
  },
  onReply: function (params) {
    return this.handleCommand(params);
  },
};