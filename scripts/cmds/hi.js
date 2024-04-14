module.exports = {
	config: {
			name: "hi",
			version: "1.0",
			author: "zach",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "hi") return message.reply("━━━━━━━━━━━━━━━\nhello love, how can i help you?\n━━━━━━━━━━━━━━━");
}
};