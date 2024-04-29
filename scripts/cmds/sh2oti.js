const axios = require("axios");
const fs = require("fs");
const request = require("request");

module.exports = {
  config: {
    name: "shoti2",
    version: "1.0",
    author: "Ronald Allen Albania",
    countDown: 20,
    category: "chatbox",
  },

  langs: {
    vi: {},
    en: { 
        final: "🤖 | 𝙲𝚑𝚊𝚝𝙶𝙿𝚃 |",
        loading: "| SCANNING USERNAME |\n━━━━━━━━━━━━━━━\n⏳ | 𝙋𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩......\n━━━━━━━━━━━━━━━\n"
},
  },

  onStart: async function ({ api, event }) {
     const loadingMessage = getLang("loading");
     const loadingReply = await message.reply(loadingMessage);
    api.sendMessage("Fetching a short video from Shoti...", event.threadID);

    try {
      let response = await axios.post(
        "https://shoti-srv1.onrender.com/api/v1/get",
        {
          apikey: "shoti-1ha4h3do8at9a7ponr",
        },
      );

      if (
        response.data.code === 200 &&
        response.data.data &&
        response.data.data.url
      ) {
        const videoUrl = response.data.data.url;
        const filePath = __dirname + "/cache/shoti.mp4";
        const file = fs.createWriteStream(filePath);
        const rqs = request(encodeURI(videoUrl));

        rqs.pipe(file);

        file.on("finish", async () => {
          const userInfo = response.data.data.user;
          const username = userInfo.username;
          const nickname = userInfo.nickname;

          await api.sendMessage(
            {
              attachment: fs.createReadStream(filePath),
            },
            event.threadID,
          );
          api.editMessage(
            `Username: @${username}\nNickname: ${nickname}`, loadingReply.messageID,
            event.threadID,
          );
        });
      } else {
        api.sendMessage(
          "No video URL found in the API response.",
          event.threadID,
        );
      }
    } catch (error) {
      console.error(error);
      api.sendMessage(
        "An error occurred while fetching the video.",
        event.threadID,
      );
    }
  },
};