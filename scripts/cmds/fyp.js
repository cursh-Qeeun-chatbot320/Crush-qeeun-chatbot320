const axios = require('axios');

async function getStreamFromURL(url) {
  const response = await axios.get(url, { responseType: 'stream' });
  return response.data;
}

async function fetchTikTokVideos(query) {
  try {
    const response = await axios.get(`https://mahi-apis.onrender.com/api/tiktok?search=${query}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  config: {
    name: "fyp",
    aliases: ["tiktok", "tikdl"],
    author: "Mahi--",
    version: "2.1",
    shortDescription: {
      en: "Search for TikTok anime edit videos",
    },
    longDescription: {
      en: "Search and fetch TikTok anime edit videos based on your query.",
    },
    category: "fun",
    guide: {
      en: "{p}{n} [query]",
    },
  },
  onStart: async function ({ api, event, args }) {
    api.setMessageReaction("✨", event.messageID, (err) => {}, true);

    const query = args.join(' ');

    if (!query) {
      api.sendMessage({ body: "Please provide a search query." }, event.threadID, event.messageID);
      return;
    }

    const modifiedQuery = `${query}`;

    const videos = await fetchTikTokVideos(modifiedQuery);

    if (!videos || videos.length === 0) {
      api.sendMessage({ body: `No videos found for query: ${query}.` }, event.threadID, event.messageID);
      return;
    }

    const selectedVideo = videos[Math.floor(Math.random() * videos.length)];
    const videoUrl = selectedVideo.video;
    const title = selectedVideo.title || "No title available";

    if (!videoUrl) {
      api.sendMessage({ body: 'Error: Video not found in the API response.' }, event.threadID, event.messageID);
      return;
    }

    try {
      const videoStream = await getStreamFromURL(videoUrl);

      await api.sendMessage({
        body: `🎥 Video Title: ${title}\n\nHere's the video you requested!`,
        attachment: videoStream,
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage({
        body: 'An error occurred while processing the video.\nPlease try again later.',
      }, event.threadID, event.messageID);
    }
  },
};
