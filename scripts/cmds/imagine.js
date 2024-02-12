const fs = require("fs");
const axios = require("axios");

const badWords = ["gay", "pussy", "dick","nude"," without","clothes","sugar","fuck","fucked","step","🤭","🍼","shit","bitch","hentai","🥵","clothes","sugar","fuck","fucked","step","?","?","shit","bitch","hentai","?","sex","fuck","boobs","cute girl undressed","undressed", "nude","without clothes", "without cloth","🍑","💦","👙","🩲","🫧","sex","segs","porn","loli","ahegao","panties","fellatio","blow job","blow","skin","naked","underwear","🥺","sexy","panty","fuckers","fck","fucking","vagina","intercourse","ugh","fuc","penis","gay","gae","👅","😋","🛏","🛌","crotch","dildo","vibrator","ass","asses","butt","asshole","cleavage","arse","dic","puss","👄","💋","😚","😘","😙","😗","blowjob"]; // Add your list of bad words here

module.exports = {
  config: {
    name: "imagine",
    aliases: [],
    author: "kshitiz",
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "generate an image"
    },
    category: "image",
    guide: {
      en: "[prompt]"
    }
  },
  onStart: async function ({ api, event, args }) {
    let path = __dirname + "/cache/image.png";
    let prompt = args.join(" ");
    let tid = event.threadID;
    let mid = event.messageID;

    // Check for NSFW prompt
    if (containsBadWords(prompt)) {
      return api.sendMessage("❎ | NSFW Prompt Detected", tid, mid);
    }

    const availableStyles = ['1', '2', '3']; // Define available style numbers

    // Choose a random style from availableStyles
    let randomStyle = availableStyles[Math.floor(Math.random() * availableStyles.length)];

    try {
      api.sendMessage("⏳ Generating... please wait it will take time.", tid, mid);

      let enctxt = encodeURIComponent(prompt);
      let encStyle = encodeURIComponent(randomStyle);
      let url = `http://ger2-1.deploy.sbs:1792/sdxl?prompt=${enctxt}&styles=${encStyle}`;

      let response = await axios.get(url, { responseType: "stream" });

      response.data.pipe(fs.createWriteStream(path));

      response.data.on("end", () => {
        api.sendMessage({ attachment: fs.createReadStream(path) }, tid, () => fs.unlinkSync(path), mid);
      });
    } catch (e) {
      return api.sendMessage(e.message, tid, mid);
    }
  }
};

function containsBadWords(prompt) {
  const promptLower = prompt.toLowerCase();
  return badWords.some(badWord => promptLower.includes(badWord));
}