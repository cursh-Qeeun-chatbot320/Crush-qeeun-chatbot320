const axios = require("axios");
const yts = require("yt-search");

module.exports = {
  config: {
    name: "gan",
    aliases: ["Gana"],
    version: "0.0.1",
    author: "Cxly 🐼",
    countDown: 5,
    role: 0,
    shortDescription: "Download audio from YouTube",
    longDescription: "Searches YouTube and downloads audio in MP3 format.",
    category: "media",
    guide: "{pn} <song name or YouTube URL>"
  },

  onStart: async function ({ message, args }) {
    try {
      if (!args.length) return message.reply("❌ Please provide a song name or YouTube link.");

      let videoUrl = args.join(" ");
      if (!videoUrl.includes("youtube.com") && !videoUrl.includes("youtu.be")) {
        message.reply("🐼 Searching for the 🌺Cxly🌺 song...");
        const searchResults = await yts(videoUrl);
        if (!searchResults.videos.length) return message.reply("⚠️ No results found for your query.");
        videoUrl = searchResults.videos[0].url;
      }

      
      const apiUrl = `https://aryan-ytdl.onrender.com/sing?url=${videoUrl}`;
      const response = await axios.get(apiUrl);
      if (!response.data || !response.data.success || !response.data.result.downloadUrl) {
        return message.reply("❌ Failed to fetch the audio. Try again later.");
      }

    
      const audioUrl = response.data.result.downloadUrl;
      const title = response.data.result.title || "Unknown Title";

    
      await message.reply({
        body: `music`,
        attachment: await global.utils.getStreamFromURL(audioUrl, `${title}.mp3`)
      });

    } catch (error) {
      console.error("Error in music command:", error);
      message.reply("⚠️ An error occurred while processing your request.");
    }
  }
};
