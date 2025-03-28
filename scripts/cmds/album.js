const axios = require("axios");
const fs = require("fs");
const path = require("path");

const baseApiUrl = async () => {
  const base = 'https://mahmud-album.onrender.com';
  return base;
};

module.exports = {
  config: {
    name: "album",
    version: "1.7",
    role: 0,
    author: "cxly",
    category: "media",
    guide: {
      en: "{p}{n} [page number] (e.g., {p}{n} 2 to view the next page)\n{p}{n} add [category] [URL] - Add a video to a category\n{p}{n} list - View total videos in each category",
    },
  },

  onStart: async function ({ api, event, args }) {
      const apiUrl = await baseApiUrl();

      if (args[0] === "add") {
      if (!args[1]) {
      return api.sendMessage("❌ Please specify a category. Usage: !album add [category]", event.threadID, event.messageID);
      }

        const category = args[1].toLowerCase();
        if (event.messageReply && event.messageReply.attachments && event.messageReply.attachments.length > 0) {
        const attachment = event.messageReply?.attachments[0];
        if (attachment?.type !== "video") {
        return api.sendMessage("❌ Only video attachments are allowed.", event.threadID, event.messageID);
        }

        try {
          const response = await axios.post(`${apiUrl}/album/add`, {
          category,
          attachmentUrl: attachment.url,
          });

          return api.sendMessage(response.data.message, event.threadID, event.messageID);
        } catch (error) {
          return api.sendMessage(`❌ Failed to upload video.\nError: ${error.message}`, event.threadID, event.messageID);
          }
        }

        if (!args[2]) {
        return api.sendMessage("❌ Please provide a video URL or reply to a video message.", event.threadID, event.messageID);
         }
 
        const videoUrl = args[2];
        try {
        const response = await axios.post(`${apiUrl}/album/add`, {
          category,
          videoUrl,
        });

        return api.sendMessage(response.data.message, event.threadID, event.messageID);
      } catch (error) {
        return api.sendMessage(`❌ Error: ${error.message}`, event.threadID, event.messageID);
      }

    } else if (args[0] === "list") {
      try {
        const response = await axios.get(`${apiUrl}/album/list`);
        api.sendMessage(response.data.message, event.threadID, event.messageID);
      } catch (error) {
        api.sendMessage(`❌ Error: ${error.message}`, event.threadID, event.messageID);
      }
    } else {
      const categories = [
   "𝐅𝐮𝐧𝐧𝐲 𝐕𝐢𝐝𝐞𝐨", "𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐕𝐢𝐝𝐞𝐨", "𝐒𝐚𝐝 𝐕𝐢𝐝𝐞𝐨", "𝐀𝐧𝐢𝐦𝐞 𝐕𝐢𝐝𝐞𝐨", "𝐋𝐨𝐅𝐈 𝐕𝐢𝐝𝐞𝐨",
   "𝐀𝐭𝐭𝐢𝐭𝐮𝐝𝐞 𝐕𝐢𝐝𝐞𝐨", "𝐇𝐨𝐫𝐧𝐲 𝐕𝐢𝐝𝐞𝐨", "𝐂𝐨𝐮𝐩𝐥𝐞 𝐕𝐢𝐝𝐞𝐨", "𝐅𝐥𝐨𝐰𝐞𝐫 𝐕𝐢𝐝𝐞𝐨", "𝐁𝐢𝐤𝐞 & 𝐂𝐚𝐫 𝐕𝐢𝐝𝐞𝐨",
   "𝐋𝐨𝐯𝐞 𝐕𝐢𝐝𝐞𝐨", "𝐋𝐲𝐫𝐢𝐜𝐬 𝐕𝐢𝐝𝐞𝐨", "𝐂𝐚𝐭 𝐕𝐢𝐝𝐞𝐨", "𝟏𝟖+ 𝐕𝐢𝐝𝐞𝐨", "𝐅𝐫𝐞𝐞 𝐅𝐢𝐫𝐞 𝐕𝐢𝐝𝐞𝐨",
   "𝐅𝐨𝐨𝐭𝐛𝐚𝐥𝐥 𝐕𝐢𝐝𝐞𝐨", "𝐁𝐚𝐛𝐲 𝐕𝐢𝐝𝐞𝐨", "𝐅𝐫𝐢𝐞𝐧𝐝𝐬 𝐕𝐢𝐝𝐞𝐨", "𝐅𝐥𝐢𝐫𝐭𝐢𝐧𝐠 𝐯𝐢𝐝𝐞𝐨", "𝐀𝐞𝐬𝐭𝐡𝐞𝐭𝐢𝐜 𝐕𝐢𝐝𝐞𝐨", "𝐍𝐚𝐫𝐮𝐭𝐨 𝐕𝐢𝐝𝐞𝐨", "𝐃𝐫𝐚𝐠𝐨𝐧 𝐛𝐚𝐥𝐥 𝐕𝐢𝐝𝐞𝐨", "𝐁𝐥𝐞𝐚𝐜𝐡 𝐕𝐢𝐝𝐞𝐨", "𝐃𝐞𝐦𝐨𝐧 𝐬𝐲𝐥𝐞𝐫 𝐕𝐢𝐝𝐞𝐨", "𝐉𝐮𝐣𝐮𝐭𝐬𝐮 𝐊𝐚𝐢𝐬𝐞𝐧 𝐯𝐢𝐝𝐞𝐨", "𝐒𝐨𝐥𝐨 𝐥𝐞𝐯𝐞𝐥𝐢𝐧𝐠 𝐕𝐢𝐝𝐞𝐨", "𝐀𝐭𝐭𝐚𝐜𝐤 𝐨𝐧 𝐭𝐢𝐭𝐚𝐧 𝐕𝐢𝐝𝐞𝐨", "𝐁𝐥𝐮𝐞 𝐥𝐨𝐜𝐤 𝐕𝐢𝐝𝐞𝐨", "𝐂𝐡𝐚𝐢𝐧𝐬𝐚𝐰 𝐦𝐚𝐧 𝐕𝐢𝐝𝐞𝐨", "𝐃𝐞𝐚𝐭𝐡 𝐧𝐨𝐭𝐞 𝐯𝐢𝐝𝐞𝐨"
 ];
      const itemsPerPage = 10;
      const page = parseInt(args[0]) || 1;
      const totalPages = Math.ceil(categories.length / itemsPerPage);

      if (page < 1 || page > totalPages) {
      return api.sendMessage(`❌ Invalid page! Please choose between 1 - ${totalPages}.`, event.threadID, event.messageID);
      }

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const displayedCategories = categories.slice(startIndex, endIndex);

      const message = `𝐀𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐀𝐥𝐛𝐮𝐦 𝐕𝐢𝐝𝐞𝐨 𝐋𝐢𝐬𝐭 🌺\n` +
        "━━━━━━━━━━━━━━━━━━━━━\n" +
        displayedCategories.map((option, index) => `${startIndex + index + 1}. ${option}`).join("\n") +
        "\n━━━━━━━━━━━━━━━━━━━━━" +
        `\n♻ | 𝐏𝐚𝐠𝐞 [${page}/${totalPages}]<🐼\nℹ | 𝐓𝐲𝐩𝐞 !album ${page + 1} - 𝐭𝐨 𝐬𝐞𝐞 𝐧𝐞𝐱𝐭 𝐩𝐚𝐠𝐞.`.repeat(page < totalPages);

        await api.sendMessage(message, event.threadID, (error, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID,
          page,
          startIndex,
          categories,
        });
      }, event.messageID);
    }
  },

  onReply: async function ({ api, event, Reply }) {
    api.unsendMessage(Reply.messageID);

    const reply = parseInt(event.body);
    const startIndex = Reply.startIndex;
    const index = reply - 1;

    if (isNaN(reply) || index < 0 || index >= Reply.categories.length) {
      return api.sendMessage("Please reply with a valid number from the list.", event.threadID, event.messageID);
    }

    const categories = [
      "funny", "islamic", "sad", "anime", "lofi", "attitude", "horny", "couple",
      "flower", "bikecar", "love", "lyrics", "cat", "18+", "freefire",
      "football", "baby", "friend", "flirting", "aesthetic", "naruto", "dragon", "bleach", "demon", "jjk", "solo", "attackon", "bluelock", "cman", "deathnote" 

    ];

    const captions = [
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐅𝐮𝐧𝐧𝐲 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <😺",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <🙈",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐒𝐚𝐝 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <😽",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐀𝐧𝐢𝐦𝐞 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <🤓",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐋𝐨𝐅𝐈 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <😟",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐀𝐭𝐭𝐢𝐭𝐮𝐝𝐞 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <☠️ ",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐇𝐨𝐫𝐧𝐲 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <💝",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐂𝐨𝐮𝐩𝐥𝐞 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <💑",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐅𝐥𝐨𝐰𝐞𝐫 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <🌸",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐁𝐢𝐤𝐞 & 𝐂𝐚𝐫 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐋𝐨𝐯𝐞 𝐯𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <❤",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐋𝐲𝐫𝐢𝐜𝐬 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <🎵",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐂𝐚𝐭 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <🤕",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐈𝟖+ 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <🥵",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐅𝐫𝐞𝐞 𝐅𝐢𝐫𝐞 𝐕𝐢𝐝𝐞𝐨 🧡",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐅𝐨𝐨𝐭𝐛𝐚𝐥𝐥 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <💗",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐁𝐚𝐛𝐲 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <❣️",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐅𝐫𝐢𝐞𝐧𝐝𝐬 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <😶‍🌫️",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐅𝐥𝐢𝐫𝐭𝐢𝐧𝐠 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <😩",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐀𝐞𝐬𝐭𝐡𝐞𝐭𝐢𝐜 𝐯𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐍𝐚𝐫𝐮𝐭𝐨 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <😇",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐃𝐫𝐚𝐠𝐨𝐧 𝐛𝐚𝐥𝐥 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <🥰",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐁𝐥𝐞𝐚𝐜𝐡 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <💘",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐃𝐞𝐦𝐨𝐧 𝐬𝐲𝐥𝐞𝐫 𝐁𝐚𝐛𝐲 <🫠",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐉𝐮𝐣𝐮𝐭𝐬𝐮 𝐊𝐚𝐢𝐬𝐞𝐧 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <😊",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐒𝐨𝐥𝐨 𝐥𝐞𝐯𝐞𝐥𝐢𝐧𝐠 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <🫣",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐀𝐭𝐭𝐚𝐜𝐤 𝐨𝐧 𝐭𝐢𝐭𝐚𝐧 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <💋",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐁𝐥𝐮𝐞 𝐥𝐨𝐜𝐤 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <😘",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐂𝐡𝐚𝐢𝐧𝐬𝐚𝐰 𝐦𝐚𝐧 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <🌺",
  "𝐇𝐞𝐫𝐞 𝐲𝐨𝐮𝐫 𝐃𝐞𝐚𝐭𝐡 𝐧𝐨𝐭𝐞 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <🐼"
    ];

    let query = categories[index];
    let cp = captions[index];

    const userID = event.senderID;

    try {
      const apiUrl = await baseApiUrl();
      const response = await axios.get(`${apiUrl}/videos/${query}?userID=${userID}`);

      if (!response.data.success) {
      return api.sendMessage(response.data.message, event.threadID, event.messageID);
      }

      const videoUrls = response.data.videos;

      if (!videoUrls || videoUrls.length === 0) {
      return api.sendMessage("❌ | 𝐍𝐨 𝐯𝐢𝐝𝐞𝐨𝐬 𝐟𝐨𝐮𝐧𝐝 𝐟𝐨𝐫 𝐭𝐡𝐢𝐬 𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐲.", event.threadID, event.messageID);
      }

      const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
      const filePath = path.join(__dirname, "temp_video.mp4");

      async function downloadFile(url, filePath) {
      const response = await axios({ url, method: "GET", responseType: "stream" });

         return new Promise((resolve, reject) => {
          const writer = fs.createWriteStream(filePath);
          response.data.pipe(writer);
          writer.on("finish", resolve);
          writer.on("error", reject);
        });
      }

      try {
        await downloadFile(randomVideoUrl, filePath);

        api.sendMessage(
          { body: cp, attachment: fs.createReadStream(filePath) },
          event.threadID,
          () => fs.unlinkSync(filePath),
          event.messageID
        );
      } catch (error) {
        api.sendMessage("❌ | 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐭𝐡𝐞 𝐯𝐢𝐝𝐞𝐨.", event.threadID, event.messageID);
       }
      } catch (error) {
        api.sendMessage("❌ | Error while fetching video URLs from the API. Please check the API or try again later.", event.threadID, event.messageID);
    }
  }
};
