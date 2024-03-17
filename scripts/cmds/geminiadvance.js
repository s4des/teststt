const axios = require('axios');

async function fetchFromGemini(prompt, uid) {
  try {
    const url = `https://gemini-api.replit.app/gemini?prompt=${prompt}&uid=${uid}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getGeminiResponse(input, userId) {
  const response = await fetchFromGemini(input, userId);
  return response?.gemini || "Error: No response from Gemini.";
}

module.exports = {
  config: {
    name: 'geminiadvance', // Assuming command name is "gemini"
    author: 'Charlie, API by Deku', // Author
    description: "Talk to Gemini (conversational)", // Description
    category: 'AI', // Category
  },
  onStart: async function ({ event, args }) {
    const prompt = args.join(' ').trim();
    if (!prompt) {
      return message.reply("Please enter a prompt."); // Assuming message object is available
    }

    const response = await getGeminiResponse(prompt, event.senderID);
    return message.reply(` | Google Gemini | \n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━`, event.threadID, event.messageID); // Assuming message object and threadID are available
  },
  onReply: async function ({ event }) {
    if (event.type !== "message_reply") return; // Only process replies

    const attachment = event.messageReply.attachments[0];
    if (!attachment || attachment.type !== "photo") return; // Only handle image replies

    const prompt = args.join(' ').trim(); // Assuming args are still available in onReply
    if (!prompt) {
      return message.reply("Please enter a prompt."); // Assuming message object is available
    }

    const imageUrl = encodeURIComponent(attachment.url);
    const response = await getGeminiResponse(`${prompt} [Image](${imageUrl})`, event.senderID);
    return message.reply(` | Google Gemini | \n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━`, event.threadID, event.messageID); // Assuming message object and threadID are available
  }
};
