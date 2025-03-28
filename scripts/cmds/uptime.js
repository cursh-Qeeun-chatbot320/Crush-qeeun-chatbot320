module.exports = {
    config: {
        name: "uptime",
        aliases: ["uptime", "up"],
        version: "1.5",
        author: "cxly",
        role: 0,
        shortDescription: { bn: "🐼 cxly chatbot uptime🌺।" },
        category: "system",
    },

    onStart: async function ({ message, usersData, threadsData }) {
        const iURL = "https://i.imgur.com/n0gnjMo.mp4"; // Updated Imgur link

        const uptime = process.uptime();
        const totalSeconds = Math.floor(uptime);
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;

        const response = {
            body: `╭━─━─≪✠≫─━╮
┃🐼 cxly bot uptime😽┃
╰━──≪✠≫──━╯
┣⏳ days: ${days}  
┣⏱️ hours: ${hours}  
┣⌛ minutes: ${minutes}  
┣⏳ second : ${seconds}  
┣━━━━━━≪✠≫━━━━━━┫
┣👥 all botuser: ${(await usersData.getAll()).length}  
┣🌺 box: ${(await threadsData.getAll()).length}  
╰━━━━━━≪✠≫━━━━━━╯`,
            attachment: await global.utils.getStreamFromURL(iURL)
        };

        message.reply(response);
    }
};
