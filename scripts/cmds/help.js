const Prefixes = [
  '+help',
];

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
	if (event.body && event.body.toLowerCase() == "help") return message.reply("command list of this bot\n\n1. ai \n2. remini\n3. uid\n4. checkgc(admin only)\n5. alldl\n6. antiout\n7. acp(accept friend req)\n8. config(admin only) \n9. confess\n10. guessnumber\n11. coinflip\n12. ttt\n13. pair\n14. ngl(spamming message)\n15. superadmin(admin only) \n16. sing\n17. sim(talking bot)\n18. claire(AI version) \n19. gmage\n20. rizz\n21. emojimix\n22. poli(generate image from ai)\n\nuse prefix to execute the command ex: +confess\nThis bot made by:  https://www.facebook.com/kcccccc.vvvvvvddd");
}
};