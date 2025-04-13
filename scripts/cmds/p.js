const { GoatWrapper } = require("fca-liane-utils");
module.exports = {
  config: {
    name: "p",
    version: "1.0",
    author: "cxly npx",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "cxly npx"
  },

langs: {
    en: {
        invaildNumber: "%1 is not an invalid number",
        cancelSuccess: "Refused %1 thread!",
        approveSuccess: "Approved successfully %1 threads!",

        cantGetPendingList: "Can't get the pending list!",
        returnListPending: "»「PENDING」«❮ The whole number of threads to approve is: %1 thread ❯\n\n%2",
        returnListClean: "「PENDING」There is no thread in the pending list"
    }
  },

onReply: async function({ api, event, Reply, getLang, commandName, prefix }) {
    if (String(event.senderID) !== String(Reply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const ArYanIndex of index) {
            console.log(ArYanIndex);
            if (isNaN(ArYanIndex) || ArYanIndex <= 0 || ArYanIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", ArYanIndex), threadID, messageID);
            api.removeUserFromGroup(api.getCurrentUserID(), Reply.pending[ArYanIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getLang("cancelSuccess", count), threadID, messageID);
    }
    else {
        const index = body.split(/\s+/);
        for (const ArYanIndex of index) {
            if (isNaN(ArYanIndex) || ArYanIndex <= 0 || ArYanIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", ArYanIndex), threadID, messageID);
            api.sendMessage(`⚪⚫🟡🟢🔴🔵\n\n🤖 𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐟𝐨𝐫 𝐢𝐧𝐯𝐢𝐭𝐢𝐧𝐠 𝐦𝐞!🌟\n \n🚀 𝐋𝐞𝐭'𝐬 𝐠𝐞𝐭 𝐬𝐭𝐚𝐫𝐭𝐞𝐝! 𝐇𝐞𝐫𝐞'𝐬 𝐬𝐨𝐦𝐞 𝐮𝐬𝐞𝐟𝐮𝐥 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧:\n \n- 𝐁𝐨𝐭 𝐏𝐫𝐞𝐟𝐢𝐱: !\n \n- 𝐓𝐨 𝐝𝐢𝐬𝐜𝐨𝐯𝐞𝐫 𝐭𝐡𝐞 𝐥𝐢𝐬𝐭 𝐨𝐟 𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬, 𝐓𝐲𝐩𝐞 : %𝐡𝐞𝐥𝐩\n \n📚 𝐍𝐞𝐞𝚍 𝐚𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐜𝐞 𝐨𝐫 𝐡𝐚𝐯𝐞 𝐪𝐮𝐬𝐭𝐢𝐨𝐧𝐬? 𝐅𝐞𝚎𝐥 𝐟𝐫𝐞𝐞 𝐭𝐨 𝐫𝐞𝐚𝐜𝐡 𝐨𝐮𝐭 𝐚𝐧𝐲𝐭𝐢𝐦𝐞. 𝐄𝐧𝐣𝐨𝐲 𝐲𝐨𝐮 𝐭𝐮𝐦𝐞 𝐢𝐧 𝐭𝐡𝐞 𝐠𝐫𝐨𝐮𝐩! 🌈✨ `, Reply.pending[ArYanIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getLang("approveSuccess", count), threadID, messageID);
    }
},

onStart: async function({ api, event, getLang, commandName }) {
  const { threadID, messageID } = event;

    var msg = "", index = 1;

    try {
    var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
    var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
  } catch (e) { return api.sendMessage(getLang("cantGetPendingList"), threadID, messageID) }

  const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const ArYan of list) msg += `${index++}/ ${ArYan.name}(${ArYan.threadID})\n`;

    if (list.length != 0) return api.sendMessage(getLang("returnListPending", list.length, msg), threadID, (err, info) => {
    global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
  }, messageID);
    else return api.sendMessage(getLang("returnListClean"), threadID, messageID);
}
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
