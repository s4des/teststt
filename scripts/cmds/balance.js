module.exports = {

    config: {

        name: "balance",

        aliases: ["bal"],

        version: "1.0",

        author: "Rishad",

        countDown: 5,

        role: 0,

        description: {

            vi: "xem số tiền hiện có của bạn hoặc người được tag",

            en: "view your money or the money of the tagged person"

        },

        category: "economy",

        guide: {

            vi: "   {pn}: xem số tiền của bạn"

                + "\n   {pn} <@tag>: xem số tiền của người được tag",

            en: "   {pn}: view your money"

                + "\n   {pn} <@tag>: view the money of the tagged person"

        }

    },



    langs: {

        vi: {

            balance: "𝗬𝗼𝘂𝗿 𝗕𝗮𝗹𝗮𝗻𝗰𝗲",

            money: "Bạn đang có %1$",

            moneyOf: "%1 đang có %2$",

            loading: "⏳loading......."

        },

        en: {

            balance: "𝗬𝗼𝘂𝗿 𝗕𝗮𝗹𝗮𝗻𝗰𝗲",

            money: "You have %1$",

            moneyOf: "%1 has %2$",

            loading: "⏳loading......."

        }

    },



    onStart: async function ({ message, usersData, event, getLang, api }) {

        const boldLettersMap = {

            "0": "𝟬", "1": "𝟭", "2": "𝟮", "3": "𝟯", "4": "𝟰",

            "5": "𝟱", "6": "𝟲", "7": "𝟳", "8": "𝟴", "9": "𝟵"

        };

        const userStatus = "in the database system.";

        const boldTag = (text) => {

            let modifiedText = "";

            for (const char of text) {

                modifiedText += boldLettersMap[char] || char;

            }

            return modifiedText;

        };



        const loadingMessage = getLang("loading");

        const loadingReply = await message.reply(loadingMessage);



        setTimeout(async () => {

            if (Object.keys(event.mentions).length > 0) {

                const uids = Object.keys(event.mentions);

                let msg = "💵 𝗕𝗮𝗹𝗮𝗻𝗰𝗲\n━━━━━━━━━━━━━━━\n";

                for (const uid of uids) {

                    const userMoney = await usersData.get(uid, "money");

                    msg += `${boldTag(event.mentions[uid].replace("@", ""))} has ${boldTag(userMoney + "$")} ${userStatus}\n`;

                }

                msg += "━━━━━━━━━━━━━━━";

                api.editMessage(msg, loadingReply.messageID);

            } else {

                const userData = await usersData.get(event.senderID);

                const userMoney = userData.money;

                const userName = getLang("balance");

                const userBalance = boldTag(userMoney + "$");

                const msg = `💵 ${userName}\n━━━━━━━━━━━━━━━\nYou have ${userBalance} ${userStatus}\n━━━━━━━━━━━━━━━`;

                api.editMessage(msg, loadingReply.messageID);

            }

        }, 2000);

    }

};
