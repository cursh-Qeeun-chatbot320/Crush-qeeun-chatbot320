module.exports = {
  config: {
    name: "hdvid",
    version: "1.0",
    author: "Jisan-rambo",
    countDown: 20,
    role: 0,
    shortDescription: "get hdvid video",
    longDescription: "get random hdvid video",
    category: "hd video",
    guide: "{pn} hdvidvdo",
  },

  sentVideos: [],

  onStart: async function ({ api, event, message }) {
    const senderID = event.senderID;

    const loadingMessage = await message.reply({
      body: "   ...  ! ",
    });

    const link = [
      "https://i.imgur.com/bozDAye.mp4",// video credits xenoz (youtube)
      "https://i.imgur.com/sOSnZFd.mp4",
      "https://i.imgur.com/yyp9YIs.mp4",
      "https://i.imgur.com/O2XvS7X.mp4",
      "https://i.imgur.com/BwLMwuI.mp4",
      "https://i.imgur.com/Qc2nCRE.mp4",
      "https://i.imgur.com/m0j3YrR.mp4",
      "https://i.imgur.com/OmQA23z.mp4",
      "https://i.imgur.com/yEvKUcN.mp4",
      "https://i.imgur.com/HRQxLDB.mp4",
      "https://i.imgur.com/Bl6bp1v.mp4",
      "https://i.imgur.com/VcZpVjz.mp4",
      "https://i.imgur.com/y8PxXD6.mp4",
      "https://i.imgur.com/OmQA23z.mp4",
      "https://i.imgur.com/zd1S4FN.mp4",
      "https://i.imgur.com/f4LBdXX.mp4",
      "https://i.imgur.com/iR1aU0u.mp4",
      "https://i.imgur.com/lTIC17T.mp4",
      "https://i.imgur.com/8IRYKzU.mp4",
      "https://i.imgur.com/aWpL7qo.mp4",
      "https://i.imgur.com/EjYTjCq.mp4",
      "https://i.imgur.com/qIfr6rt.mp4",
      "https://i.imgur.com/LU9jPqX.mp4",
      "https://i.imgur.com/wdfw4uX.mp4",
      "https://i.imgur.com/SYEQncd.mp4",
      "https://i.imgur.com/PudEc9O.mp4",
      "https://i.imgur.com/7jWyw2S.mp4",
      "https://i.imgur.com/FU8Ieob.mp4",
      "https://i.imgur.com/PudEc9O.mp4",
      "https://i.imgur.com/JXXQ767.mp4",
      "https://i.imgur.com/ODexXk1.mp4",
      "https://i.imgur.com/YryGkkJ.mp4",              
"https://i.imgur.com/5qviir2.mp4",
"https://i.imgur.com/ipoIocF.mp4",
"https://i.imgur.com/YtcGxsz.mp4",
"https://i.imgur.com/e5erJcm.mp4",
"https://i.imgur.com/0OvlbNP.mp4",
"https://i.imgur.com/lvyZkcA.mp4",
"https://i.imgur.com/IqwtXjY.mp4",
"https://i.imgur.com/ap6CQPK.mp4",
"https://i.imgur.com/rBPRpn8.mp4",
"https://i.imgur.com/PadIxYI.mp4",
"https://i.imgur.com/AJR2OMe.mp4",
"https://i.imgur.com/ap6CQPK.mp4",
"https://i.imgur.com/rBPRpn8.mp4",
"https://i.imgur.com/rBPRpn8.mp4",
"https://i.imgur.com/PadIxYI.mp4",
"https://i.imgur.com/xsCgIbi.mp4",
"https://i.imgur.com/YdFXck3.mp4",
"https://i.imgur.com/YdFXck3.mp4",
"https://i.imgur.com/RipTILJ.mp4",

"https://i.imgur.com/ApaiT8W.mp4",
"https://i.imgur.com/4mfEyOg.mp4",
"https://i.imgur.com/5ORu2YX.mp4",
"https://i.imgur.com/qVbNOSs.mp4",
"https://i.imgur.com/tnielIK.mp4",
"https://i.imgur.com/S0mvFhE.mp4",
"https://i.imgur.com/5lqjD5R.mp4",
"https://i.imgur.com/TkgFK7b.mp4",
"https://i.imgur.com/bhvsYKS.mp4",
"https://i.imgur.com/aPb9rIa.mp4",
"https://i.imgur.com/hgkox7Y.mp4",
"https://i.imgur.com/bhvsYKS.mp4",
"https://i.imgur.com/aPb9rIa.mp4",
"https://i.imgur.com/TkgFK7b.mp4",
"https://i.imgur.com/hgkox7Y.mp4",
"https://i.imgur.com/bhvsYKS.mp4",
"https://i.imgur.com/aPb9rIa.mp4",
"https://i.imgur.com/JTNCzIN.mp4",
"https://i.imgur.com/f3u0dqM.mp4",
"https://i.imgur.com/LDQ60P3.mp4",
"https://i.imgur.com/r5E99q3.mp4",
"https://i.imgur.com/eoAioBr.mp4",
"https://i.imgur.com/lKyo0h6.mp4",
"https://i.imgur.com/D5oshvg.mp4",
"https://i.imgur.com/iTAoHhx.mp4",
"https://i.imgur.com/IyXrAOj.mp4",
"https://i.imgur.com/Qfjsb18.mp4",
"https://i.imgur.com/2c3PJqZ.mp4",
"https://i.imgur.com/C35j7n8.mp4",
"https://i.imgur.com/jITkr1X.mp4",
"https://i.imgur.com/zSQXzb6.mp4",
"https://i.imgur.com/PlPMAZw.mp4",
"https://i.imgur.com/94dYG4H.mp4",
"https://i.imgur.com/ArwF2mr.mp4",
"https://i.imgur.com/GMEn0n9.mp4",
"https://i.imgur.com/l0Ye6Cr.mp4",
"https://i.imgur.com/LBjVixl.mp4",
"https://i.imgur.com/YoscLff.mp4",
"https://i.imgur.com/J6kL6QI.mp4",
"https://i.imgur.com/bY23GUp.mp4",
"https://i.imgur.com/jAm4nli.mp4",
"https://i.imgur.com/bQlopKo.mp4",
"https://i.imgur.com/xwJFPan.mp4",
"https://i.imgur.com/nvLt98P.mp4",
"https://i.imgur.com/Rc010Wg.mp4",
"https://i.imgur.com/Bt6eBnN.mp4",
"https://i.imgur.com/1nhrdy9.mp4",
"https://i.imgur.com/8dAznUh.mp4",
"https://i.imgur.com/F0nNZbk.mp4",
"https://i.imgur.com/4wiZbe5.mp4",
"https://i.imgur.com/ERPLrqx.mp4",
"https://i.imgur.com/64S9Obh.mp4",
"https://i.imgur.com/aCzsuWf.mp4",
// Add more video links here
    ];

    const availableVideos = link.filter(video => !this.sentVideos.includes(video));

    if (availableVideos.length === 0) {
      this.sentVideos = [];
    }

    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    const randomVideo = availableVideos[randomIndex];

    this.sentVideos.push(randomVideo);

    if (senderID !== null) {
      message.reply({
        body: ' :+ ',
        attachment: await global.utils.getStreamFromURL(randomVideo),
      });

      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 5000);
    }
  },
};
