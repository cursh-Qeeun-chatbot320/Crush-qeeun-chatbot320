module.exports = {
    config: {
        name: "cxly",
        version: "1.0",
        author: "Aryan",
        countDown: 5,
        role: 0,
        shortDescription: "cxly",
        longDescription: "cxly",
        category: "Fun",
        guide: {
            en: "{pn} text"
        }
    },
    onStart: async () => {},
    onChat: async function({ message, event, api }) {
        const quotes = [
            "Kya Tu ELvish Bhai Ke Aage Bolega🙄", 
            "Cameraman Jaldi Focus Kro 📸", 
            "Lagdi Lahore di aa🙈", 
            "Chay pe Chaloge", 
            "Mere liye Chay Bana Kar LA ,Pura din Dekho Bot BoT🙄", 
            "Din vicho tere Layi Teym Kadd ke, Kardi me Promise Milan aungi", 
            "Yee bat Delhi tak jayegi", 
            "Je koi shaq ni , Kari check ni", 
            "ME HERAAN HU KI TUM BINA DIMAG KESE REH LETE HO☹️", 
            "sheHar me Hai rukka baeje Rao Saab ka🙄", 
            "Bewafa Nikali re tu🙂🤨", 
            "Systemmmmmmm😴", 
            "Leja Leja tenu 7 samundra paar🙈🙈", 
            "Laado puche manne kyu tera rang kala", 
            "Moye moye moye moye🙆🏻‍♀🙆🏻‍♀", 
            "Ye dukh kahe nahi khatm hota 🙁", 
            "Tum to dokebaz ho", 
            "you just looking like a wow😶", 
            "Mera aasmaan dhunde teri zamin", 
            "Kal ana abhi lunch time hai", 
            "Jab dekho B0T B0T b0T😒😒", 
            "Chhodo na koi dekh lega🤭", 
            "Kab ayega mere banjaare", 
            "Tum wahi ho na ,jisko.me.nahi janti 🙂", 
            "Ye I love you kya hota hai", 
            "Sunai deta hai mujhe behri nahi hu me   😒", 
            "so elegent, so beautiful , just looking like a wow🤭", 
            "began🙂", 
            "Aayein🤔", 
            "I Love you baby , mera recharge khtm hone wala h", 
            "paani paani uncle ji", 
            "apne Labhar ko dhoka do , daling hme bhi moka do🙈", 
            "Arry Bas Kar🤣😛", 
            "Me ni To Kon Be", 
            "naam adiya kumar 7vi kaksha me padhte hai favret subject begon😘", 
            "Mera Dimag Mat Khaya kro😒😒", 
            "Chuppp Saatvi Fail😒", 
            "Saste Nashe Kab Band kroge", 
            "Mai Jaanu Ke sath Busy hu yar, mujhe mat balao", 
            "Haye Jaanu Mujhe Yaad Kiya🙈", 
            "Hayee ese mt bulaya kro, mujhe sharm aati h", 
            "System pe system betha rahi chhori bot ki", 
            "Naach meri Bulbul tujhe pesa milega", 
            "me idhar se hu aap kidhar se ho", 
            "will you be my valentine🙈🙈", 
            "aye haye oye hoye aye haye oye hoye😍 bado badi bado badi😘", 
            "Mujhe bhi koi gulab chocolate dedo hum koi gair hai kya😥", 
            "akh ladi bado badi", 
            "haaye garmi😕", 
            "Ao kabhi haweli pe😍"
        ];

        const Prefixes = ['cxly', 'cxly'];

        if (!event.body) return;

        const prefix = Prefixes.find(p => event.body.toLowerCase().startsWith(p.toLowerCase()));
        if (!prefix) return;

        const uid = event.senderID;

        let name = "User";
        try {
            const userInfo = await api.getUserInfo(uid);
            name = userInfo[uid]?.name || "User";
        } catch (error) {
            console.error("Error fetching user info:", error);
        }

        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        return message.reply({
            body: `🐼 ${name} 🌺\n\n${randomQuote}`,
            mentions: [{ id: uid, tag: name }]
        });
    }
};
