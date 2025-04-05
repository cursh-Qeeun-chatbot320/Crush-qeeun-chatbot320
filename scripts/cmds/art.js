const { GoatWrapper } = require("fca-liane-utils");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const FormData = require("form-data");

module.exports = {
  config: {
    name: "art",
    version: "1.1",
    author: "JARiF | Cxly 🐼",
    countDown: 5,
    role: 0,
    category: "image",
  },

  onStart: async function ({ event, message, getLang, threadsData, api, args }) {
    try {
      if (args.length >= 2 || (event.type === "message_reply" && event.messageReply.attachments.length > 0 && event.messageReply.attachments[0].type === "photo")) {
        message.reply("Please Wait...🐼");

        const imageUrl = event.type === "message_reply" ? event.messageReply.attachments[0].url : args[0];
        const prompt = event.type === "message_reply" ? "same pose, same person, same environment, all same just add anime effect,anime look,boy will be a boy,girl will be a girl" : args.slice(1).join(" ");

        const formData = new FormData();
        formData.append("key", "391edcbef918942c6ae0e82eb6cf30b8");
        formData.append("image", imageUrl);

        const imgbbResponse = await axios.post("https://api.imgbb.com/1/upload", formData, {
          headers: formData.getHeaders(),
        });
        const imgbbImageUrl = imgbbResponse.data.data.url;

        const response = await axios.get(`https://www.annie-jarif.repl.co/jarif?imgurl=${imgbbImageUrl}&prompt=${prompt}&apikey=annie_emma`, {
          responseType: "arraybuffer",
        });

        const imageBuffer = Buffer.from(response.data);
        const pathSave = path.join(__dirname, "art.png");

        await saveArrayBufferToFile(imageBuffer, pathSave);

        message.reply(
          {
            attachment: fs.createReadStream(pathSave),
          },
          () => {
            fs.unlinkSync(pathSave);
          }
        );
      } else if (event.type === "message_reply") {
        message.reply("❌ | Reply With An Image.");
      } 
    } catch (e) {
      console.error(e);
      message.reply("❌ | Something Went Wrong.");
    }
  },
};

async function saveArrayBufferToFile(arrayBuffer, filePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, Buffer.from(arrayBuffer), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

Correction:- Here,
const p = args.join(" ");
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
