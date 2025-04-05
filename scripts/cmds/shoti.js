 const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "shoti",
    version: "0.0.1",
    author: "ArYAN",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Shoti video",
    },
    longDescription: {
      en: "Fetches a Shoti video and sends it to the chat.",
    },
    category: "Video",
    guide: {
      en: "Use this command to fetch and share a Shoti video.",
    },
  },

  onStart: async function ({ api, event }) {
    const videoDir = path.join(__dirname, "cache");
    const videoPath = path.join(videoDir, "shoti.mp4");
    const apiUrl = "https://aryan-shoti-api.vercel.app/shoti";

    try {
      if (!fs.existsSync(videoDir)) {
        fs.mkdirSync(videoDir);
      }

      const res = await axios.get(apiUrl);
      const data = res.data;

      if (!data || !data.shotiurl) {
        return api.sendMessage("❌ Failed to fetch Shoti video.", event.threadID, event.messageID);
      }

      const { title, shotiurl, username, nickname, duration, region } = data;

      const videoRes = await axios({
        method: "GET",
        url: shotiurl,
        responseType: "stream",
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });

      const writer = fs.createWriteStream(videoPath);

      videoRes.data.pipe(writer);

      writer.on("finish", () => {
        const caption = `😾 Shoti\n━━━━━━━━━━\n📝 Title: ${title || "No title"}`;
        
        api.sendMessage(
          { body: caption, attachment: fs.createReadStream(videoPath) },
          event.threadID,
          () => fs.unlinkSync(videoPath),
          event.messageID
        );
      });

      writer.on("error", (err) => {
        console.error("❌ Error writing video file:", err);
        api.sendMessage("❌ Error saving the video file.", event.threadID, event.messageID);
      });

    } catch (err) {
      console.error("❌ Error:", err.message || err);
      api.sendMessage("❌ Error fetching Shoti video.", event.threadID, event.messageID);
    }
  },
};
