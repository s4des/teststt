module.exports = {
	config: {
			name: "hi",
			version: "1.0",
			author: "Jaychris Garcia",
			countDown: 5,
			role: 0,
			shortDescription: "eh",
			longDescription: "sarcasm",
			category: "reply",
			langs: {
				    en: {
				      final: "🤖 | 𝙲𝚑𝚊𝚝𝙶𝙿𝚃 |",
				      loading: "🤖 | 𝙲𝚑𝚊𝚝𝙶𝙿𝚃 |\n━━━━━━━━━━━━━━━\n⏳ | 𝙋𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩......\n━━━━━━━━━━━━━━━\n"
					}
				  },
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	
	if (event.body && event.body.toLowerCase() == "hi") 
	const loadingMessage = getLang("loading");
	      const loadingReply = await message.reply(loadingMessage);
	const messageText = response.data.reply.trim(); // Adjust according to the response structure of the new API
      const userName = getLang("final");
      const finalMsg ="hello love, how can i help you?"; 
api.editMessage(finalMsg, loadingReply.messageID);
}
};