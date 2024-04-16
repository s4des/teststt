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
      vi: {
        count: "Số tin nhắn của các thành viên:",
        endMessage: "Những người không có tên trong danh sách là chưa gửi tin nhắn nào.",
        page: "Trang [%1/%2]",
        reply: "Phản hồi tin nhắn này kèm số trang để xem tiếp",
        result: "%1 hạng %2 với %3 tin nhắn",
        yourResult: "Bạn đứng hạng %1 và đã gửi %2 tin nhắn trong nhóm này",
        invalidPage: "Số trang không hợp lệ"
      },
      en: {
        count: "Number of messages of members:",
        endMessage: "Those who do not have a name in the list have not sent any messages.",
        page: "Page [%1/%2]",
        reply: "Reply to this message with the page number to view more",
        result: "%1 rank %2 with %3 messages",
        yourResult: "You are ranked %1 and have sent %2 messages in this group",
        invalidPage: "Invalid page number",
              loading: "scanning"
      }
    },
 },


    onStart: async function () {},
  onStart: async function ({ api, event, args, message, getLang }) {
    
    const loadingMessage = getLang("loading");

    const loadingReply = await message.reply(loadingMessage);




    try {
      const adviceResult = await srod.GetAdvice();
      const advice = adviceResult.embed.description;
      
      const translatedAdvice = await translateAdvice(advice, message);
      
      
      const finalMsg = `𝙎𝙤𝙥𝙝𝙞𝙖 𝘼𝙄:  ${translatedAdvice}`;
      return api.editMessage(finalMsg, loadingReply.messageID);

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
