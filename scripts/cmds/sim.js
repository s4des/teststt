const axios = require('axios');

module.exports = {
	config: {
		name: 'simsimi',
		aliases: ['sim'],
		version: '1.0',
		author: 'zach',
		countDown: 5,
		role: 0,
		shortDescription: 'Simsimi',
		longDescription: 'Chat with simsimi',
		category: 'funny',
		guide: {
			body: '   {pn} {{[on | off]}}: bật/tắt simsimi'
				+ '\n'
				+ '\n   {pn} {{<word>}}: chat nhanh với simsimi'
				+ '\n   Ví dụ: {pn} {{hi}}'
		}
	},

	onStart: async function ({ args, threadsData, message, event }) {
		if (args[0] == 'on' || args[0] == 'off') {
			await threadsData.set(event.threadID, args[0] == "on", "settings.simsimi");
			return message.reply(`Already ${args[0] == "on" ? "turn on" : "Turn off"} simsimi in your group`);
		}
		else if (args[0]) {
			const yourMessage = args.join(" ");
			try {
				const responseMessage = await getMessage(yourMessage);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				return message.reply("Simsimi is busy, please try again later");
			}
		}
	},

	onChat: async ({ args, message, threadsData, event, isUserCallCommand }) => {
		if (args.length > 1 && !isUserCallCommand && await threadsData.get(event.threadID, "settings.simsimi")) {
			try {
				const responseMessage = await getMessage(args.join(" "));
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				return message.reply("Simsimi is busy, please try again later");
			}
		}
	}
};

async function getMessage(yourMessage) {
	const res = await axios.get(`https://api.simsimi.net/v2`, {
		params: {
			text: yourMessage,
			lc: global.GoatBot.config.language == 'vi' ? 'vn' : 'en',
			cf: false
		}
	});

	if (res.status > 200)
		throw new Error(res.data.success);

	return res.data.success;
          }