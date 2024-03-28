module.exports = {
	config: {
			name: "hi",
			version: "1.0",
			author: "Charlie",
			countDown: 5,
			role: 0,
			shortDescription: "eyy neggas",
			longDescription: "wala negga",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "@everyone") return message.reply("Samoka uy linte");
}
};
