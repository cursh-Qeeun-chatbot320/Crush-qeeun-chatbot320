const axios = require('axios');
module.exports = {
config: {
name: "gf",
version: "0.0.1",
author: "ArYAN",
countDown: 5,
role: 0,
description: {
en: "Find GF"
},
category: "FUN",
guide: {
en: "{pn}gf"
}
},
onStart: async function() {},
onChat: async function({ api, event, message }) {
const input = event.body;
if (input && input.trim().toLowerCase().includes('gf de') || input && input.trim().toLowerCase().includes('bot gf de') || input && input.trim().toLowerCase().includes('need gf')) {

try {
	
api.setMessageReaction("🐼", event.messageID, (err) => {}, true);
const response = await axios.get('https://aryan-gf-api.onrender.com/aryangf');
const res = response.data.data;
api.setMessageReaction("👍", event.messageID, (err) => {}, true);
await message.reply({
body: `${res.title}`,
attachment: await global.utils.getStreamFromURL(res.url)
});

} catch (error) {
console.error('Error fetching data:', error.message);
message.reply('Error fetching data. Please try again later.');
}
}
}
};
