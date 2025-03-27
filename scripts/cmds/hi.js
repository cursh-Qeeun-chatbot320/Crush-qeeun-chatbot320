const axios = require("axios");
const googleTTS = require("google-tts-api");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

let PriyaPrefix = ["question", "ai", ".ai"];

module.exports = {
  config: {
    name: "hi",
    version: "2.2.0",
    role: 0,
    category: "hi",
    author: "Priyanshi || Priyansh",
    shortDescription: "cxly Voice Assistant",
    longDescription: "Ask Anything To cxly and get a voice reply!",
  },

  onStart: async function () {},

  onChat: async function ({ message, event, args }) {
    const command = args[0]?.toLowerCase();
    if (!command) return;

    // 🔹 Help Command
    if (command === "help") {
      const helpMessage = `
      🌟 *AI Commands* 🌺
      - Prefixes: ${PriyaPrefix.join(", ")}
      - AI Query: ${PriyaPrefix[0]} <your query>
      - Say Hi: hi
      `;
      return message.reply(helpMessage);
    }

    // 🔹 Check for Prefix
    const ahprefix = PriyaPrefix.find((p) =>
      event.body?.toLowerCase().startsWith(p)
    );
    if (!ahprefix) return;

    const query = event.body.substring(ahprefix.length).trim();
    if (!query) return message.reply("Enter a question 🥹?");

    await message.reply("Processing your request...");

    try {
      // 🔹 Fetch AI Response
      const response = await axios.get(
        `https://priyansh-ai.onrender.com/gemini/ai?query=${encodeURIComponent(
          query
        )}`
      );
      const aiReply = response.data;

      // 🔹 Convert AI Reply to Voice
      const audioURL = googleTTS.getAudioUrl(aiReply, {
        lang: "en",
        slow: false,
      });

      // 🔹 Download & Send Voice
      const filePath = path.join(__dirname, "ai-voice.mp3");
      exec(`wget -O "${filePath}" "${audioURL}"`, (err) => {
        if (err) return message.reply("❌ Error generating voice!");
        message.reply({ attachment: fs.createReadStream(filePath) }, () => {
          fs.unlinkSync(filePath);
        });
      });

      // 🔹 Also send text response
      message.reply(aiReply);
    } catch (error) {
      return message.reply("Oops! Something went wrong. Please try again.");
    }
  },
};
