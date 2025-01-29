const axios = require("axios");
const fs = require("fs");

const vipFilePath = "vip.json";

function loadVIPData() {
	// Function to load VIP data from vip.json
	try {
		const data = fs.readFileSync(vipFilePath);
		return JSON.parse(data);
	} catch (err) {
		console.error("Error loading VIP data:", err);
		return {};
	}
}

module.exports = {
	config: {
		name: "font",
		version: "1.0",
		author: "ArYAN",
		countDown: 0,
		role: 0,
		shortDescription: "",
		longDescription: "",
		category: "text",
		guide: "{pn}"
	},
	onStart: async ({ event, api, args }) => {
		const vipData = loadVIPData(); // Load VIP data from vip.json
		const blockedCommands = ["font"]; // List of commands that require VIP access

		if (blockedCommands.includes(module.exports.config.name)) { // Update this.config.name to module.exports.config.name
			// Check if the user's UID is in the VIP list
			if (!vipData[event.senderID]) {
				api.sendMessage(
					"⛔ 𝗩𝗜𝗣 𝗔𝗟𝗘𝗥𝗧 ⛔\n\n⚠ 𝗔𝗟𝗘𝗥𝗧 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡\n 🚫 You are not a VIP user. First buy our VIP subscription to use this command.\n\n💹 𝗧𝗛𝗔𝗡𝗞 𝗬𝗢𝗨\nThanks for interacting with our command. We hope to implement this command and make it better.\n\n👑 𝗕𝗨𝗬 𝗩𝗜𝗣\n💎 Buy VIP membership for free. Just type [.buyvip] to purchase our free subscription.\n\n𝗠𝗢𝗥𝗘 𝗢𝗣𝗧𝗜𝗢𝗡𝗦\n🎀 [.quiz] - Play quiz and win money\n🎰 [.slot] - Bet your amount and chance to win double money\n☯ [.spin] - Spin spinner and earn money",
					event.threadID
				);
				return; // Exit the function to prevent the command from executing
			}
		}

		// Define the font maps for different font types
		const fontMaps = [
			{
				name: 'cursive',
				map: {
					' ': ' ',
					'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱',
					'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺',
					'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃',
					'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗',
					'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠',
					'R': '𝓡', 'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩',
				},
			},
			{
				name: 'dstruck',
				map: {
					' ': ' ',
					'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙',
					'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢',
					'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
					'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ',
					'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ',
					'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ',
				},
			},
			{
				name: 'bold',
				map: {
					' ': ' ',
					'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵',
				'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾',
				'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
				'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛',
				'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤',
				'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
			},
		},
		{
			 name: 'font',
				map: {
		'':'', 
	'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃','A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗', 'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩'
	},
 },
		{
			name: 'italic',
			map: {
				' ': ' ',
				'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': '𝒉',
				'i': '𝒊', 'j': '𝒋', 'k': '𝒌', 'l': '𝒍', 'm': '𝒎', 'n': '𝒏', 'o': '𝒐', 'p': '𝒑', 'q': '𝒒',
				'r': '𝒓', 's': '𝒔', 't': '𝒕', 'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙', 'y': '𝒚', 'z': '𝒛',
				'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯',
				'I': '𝑰', 'J': '𝑱', 'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸',
				'R': '𝑹', 'S': '𝑺', 'T': '𝑻', 'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁',
			},
		},
	 {
		 name: 'unknown',
		 map: {
			 '':'',
			 'a':'ᴬ', 'b':'ᴮ', 'c':'ᶜ', 'd':'ᴰ', 'e':'ᴱ', 'f':'ᶠ', 'g':'ᴳ','h':'ᴴ', 'i':'ᴵ', 'j':'ᴶ', 'k':'ᴷ', 'l':'ᴸ', 'm':'ᴹ', 'n':'ᴺ', 'o':'ᴼ', 'p':'ᴾ', 'q':'ᵟ', 'r':'ᴿ', 's':'ˢ', 't':'ᵀ', 'u':'ᵁ', 'v':'ᵛ', 'w':'ᵂ', 'x':'ˣ', 'y':'ᵞ', 'z':'ᶻ','A':'ᴬ', 'B':'ᴮ', 'C':'ᶜ', 'D':'ᴰ', 'E':'ᴱ', 'F':'ᶠ', 'G':'ᴳ','H':'ᴴ', 'I':'ᴵ', 'J':'ᴶ', 'K':'ᴷ', 'L':'ᴸ', 'M':'', 'N':'ᴺ', 'O':'ᴼ', 'P':'ᴾ', 'Q':'ᵟ', 'R':'ᴿ', 'S':'ˢ', 'T':'ᵀ', 'U':'ᵁ', 'V':'ᵛ', 'W':'ᵂ', 'X':'ˣ', 'Y':'ᵞ', 'Z':'ᶻ',
		 },
	 },
	 {
			name: 'cycle',
			map: {
				' ': ' ',
				'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ',
				'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ',
				'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
				'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ',
				'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ',
				'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ',
			},
		},
										{
			 name: 'thickb',
				map: {
					'': '',
		'a': '𝖆', 'b': '𝖇', 'c': '𝖈', 'd': '𝖉', 'e': '𝖊', 'f': '𝖋', 'g': '𝖌', 'h': '𝖍', 'i': '𝖎', 'j': '𝖏',
		'k': '𝖐', 'l': '𝖑', 'm': '𝖒', 'n': '𝖓', 'o': '𝖔', 'p': '𝖕', 'q': '𝖖', 'r': '𝖗', 's': '𝖘', 't': '𝖙',
		'u': '𝖚', 'v': '𝖛', 'w': '𝖜', 'x': '𝖝', 'y': '𝖞', 'z': '𝖟',
		'A': '𝕬', 'B': '𝕭', 'C': '𝕮', 'D': '𝕯', 'E': '𝕰', 'F': '𝕱', 'G': '𝕲', 'H': '𝕳', 'I': '𝕴', 'J': '𝕵',
		'K': '𝕶', 'L': '𝕷', 'M': '𝕸', 'N': '𝕹', 'O': '𝕺', 'P': '𝕻', 'Q': '𝕼', 'R': '𝕽', 'S': '𝕾', 'T': '𝕿',
		'U': '𝖀', 'V': '𝖁', 'W': '𝖂', 'X': '𝖃', 'Y': '𝖄', 'Z': '𝖅',
	},
},
		{
		 name: 'fraktur',
	map: {
		' ': ' ',
		'a': '𝔄', 'b': '𝔅', 'c': '𝔇', 'd': '𝔈', 'e': '𝔉', 'f': '𝔉', 'g': '𝔊', 'h': '𝔍',
		'i': '𝔎', 'j': '𝔏', 'k': '𝔐', 'l': '𝔏', 'm': '𝔑', 'n': '𝔒', 'o': '𝔒', 'p': '𝔓', 'q': '𝔔',
		'r': '𝔕', 's': '𝔖', 't': '𝔗', 'u': '𝔘', 'v': '𝔙', 'w': '𝔚', 'x': '𝔛', 'y': '𝔜', 'z': '𝔷',
		'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ',
		'I': 'ℑ', 'J': '𝔍', 'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑', 'O': '𝔒', 'P': '𝔓', 'Q': '𝔔',
		'R': 'ℜ', 'S': '𝔖', 'T': '𝔗', 'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛', 'Y': '𝔜', 'Z': 'ℨ',
	},
},
	{name: 'sbd',
			map: {
				' ': ' ',
				'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡',
				'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪',
				'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
				'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇',
				'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐',
				'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
 },
},
		{
	name: 'impact',
	map: {
		'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ',
		'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ',
		'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ',
		'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ',
		'I': 'ɪ', 'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ',
		'R': 'ʀ', 'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ',
	},
},

	{name: 'sdxl',
			map: {
				' ': ' ',
				'a': 'ȃ̈', 'b': 'b̑̈', 'c': 'c̑̈', 'd': 'd̑̈', 'e': 'ȇ̈', 'f': 'f̑̈', 'g': 'g̑̈', 'h': 'h̑̈',
				'i': 'ȋ̈', 'j': 'j̑̈', 'k': 'k̑̈', 'l': 'l̑̈', 'm': 'm̑̈', 'n': 'n̑̈', 'o': 'ȏ̈', 'p': 'p̑̈', 'q': 'q̑̈',
				'r': 'ȓ̈', 's': 's̑̈', 't': 't̑̈', 'u': 'ȗ̈', 'v': 'v̑̈', 'w': 'w̑̈', 'x': 'x̑̈', 'y': 'y̑̈', 'z': 'z̑̈',
				'A': 'Ȃ̈', 'B': 'B̑̈', 'C': 'C̑̈', 'D': 'D̑̈', 'E': 'Ȇ̈', 'F': 'F̑̈', 'G': 'G̑̈', 'H': 'H̑̈',
				'I': '𝐈', 'J': '𝐉', 'K': 'K̑̈', 'L': 'L̑̈', 'M': 'M̑̈', 'N': 'N̑̈', 'O': 'Ȏ̈', 'P': 'P̑̈', 'Q': 'Q̑̈',
				'R': 'Ȓ̈', 'S': 'S̑̈', 'T': 'T̑̈', 'U': 'Ȗ̈', 'V': 'V̑̈', 'W': 'W̑̈', 'X': 'X̑̈', 'Y': 'Y̑̈', 'Z': 'Z̑̈',
 },
},

			{name: 'frank',
						map: {
							' ': ' ',
							'a': 'a̺͆', 'b': 'b̺͆', 'c': 'c̺͆', 'd': 'd̺͆', 'e': 'e̺͆', 'f': 'f̺͆', 'g': 'g̺͆', 'h': 'h̺͆',
							'i': 'i̺͆', 'j': 'j̺͆', 'k': 'k̺͆', 'l': 'l̺͆', 'm': 'm̺͆', 'n': 'n̺͆', 'o': 'o̺͆', 'p': 'p̺͆', 'q': 'q̺͆',
							'r': 'r̺͆', 's': 's̺͆', 't': 't̺͆', 'u': 'u̺͆', 'v': 'v̺͆', 'w': 'w̺͆', 'x': 'x̺͆', 'y': 'y̺͆', 'z': 'z̺͆',
							'A': 'A̺͆', 'B': 'B̺͆', 'C': 'C̺͆', 'D': 'D̺͆', 'E': 'E̺͆', 'F': 'F̺͆', 'G': 'G̺͆', 'H': 'H̺͆',
							'I': 'I̺͆', 'J': 'J̺͆', 'K': 'K̺͆', 'L': 'L̺͆', 'M': 'M̺͆', 'N': 'N̺͆', 'O': 'O̺͆', 'P': 'P̺͆', 'Q': 'Q̺͆',
							'R': 'R̺͆', 'S': 'S̺͆', 'T': 'T̺͆', 'U': 'U̺͆', 'V': 'V̺͆', 'W': 'W̺͆', 'X': 'X̺͆', 'Y': 'Y̺͆', 'Z': 'Z̺͆',
			 },
			},
			{name: 'sks',
			map: {
				' ': ' ',
				'a': '【a】', 'b': '【b】', 'c': '【c】', 'd': '【d】', 'e': '【e】', 'f': '【f】', 'g': '【g】', 'h': '【h】',
				'i': '【i】', 'j': '【j】', 'k': '【k】', 'l': '【l】', 'm': '【m】', 'n': '【n】', 'o': '【o】', 'p': '【p】', 'q': '【q】',
				'r': '【r】', 's': '【s】', 't': '【t】', 'u': '【u】', 'v': '【v】', 'w': '【w】', 'x': '【x】', 'y': '【y】', 'z': '【z】',
				'A': '【A】', 'B': '【B】', 'C': '【C】', 'D': '【D】', 'E': '【E】', 'F': '【F】', 'G': '【G】', 'H': '【H】',
				'I': '【I】', 'J': '【J】', 'K': '【K】', 'L': '【L】', 'M': '【M】', 'N': '【N】', 'O': '【O】', 'P': '【O】', 'Q': '【Q】',
				'R': '【R】', 'S': '【S】', 'T': '【T】', 'U': '【U】', 'V': '【V】', 'W': '【W】', 'X': '【X】', 'Y': '【Y】', 'Z': '【Z】',
 },
}
	];

		if (args.length === 0) {
			return api.sendMessage('🚫 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗨𝗦𝗘:➡ Invalid usage. Please use the command with a font type and input text. \n\n📝 Example: [.font bold <your-text> ]\n\n👑 Type [.font list] to view all available fonts',
				event.threadID,
				event.messageID
			);
		}

		if (args[0].toLowerCase() === 'list') {
			const availableFontTypes = fontMaps.map(item => item.name).join('\n• ');
			return api.sendMessage(
				`📍|𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗙𝗢𝗡𝗧𝗦 𝗧𝗬𝗣𝗘𝗦 :\n\n➤【 𝗰𝘂𝗿𝘀𝗶𝘃𝗲 】\n➤【 𝗱𝘀𝘁𝗿𝘂𝗰𝗸 】\n➤ 【 𝗯𝗼𝗹𝗱 】\n➤【 𝗳𝗼𝗻𝘁 】\n➤【 𝗶𝘁𝗮𝗹𝗶𝗰 】\n➤【 𝘂𝗻𝗸𝗻𝗼𝘄𝗻 】\n➤【 𝗰𝘆𝗰𝗹𝗲 】\n➤【 𝘁𝗵𝗶𝗰𝗸𝗯 】\n➤【 𝗳𝗿𝗮𝗸𝘁𝘂𝗿 】\n➤ 【 𝘀𝗯𝗱 】\n➤ 【 𝗶𝗺𝗽𝗮𝗰𝘁 】\n➤【 𝘀𝗱𝘅𝗹 】\n➤【 𝗳𝗿𝗮𝗻𝗸 】\n➤【 𝘀𝗸𝘀 】\n\n➡ 𝗠𝗢𝗥𝗘 𝗢𝗣𝗧𝗜𝗢𝗡𝗦 :\n\n Type [.font list] to view all available fonts\n📝 𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n [ .font bold <your text> ]`,
				event.threadID,
				event.messageID
			);
		}

		const fontType = args.shift().toLowerCase();
		const inputText = args.join(' ');

		const fontMap = fontMaps.find(item => item.name === fontType);

		if (!fontMap) {
			const availableFontTypes = fontMaps.map(item => item.name).join(', ');
			const errorMessage = `❌ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗙𝗢𝗡𝗧 𝗧𝗬𝗣𝗘 :➡\n📍|𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗙𝗢𝗡𝗧𝗦 𝗧𝗬𝗣𝗘𝗦 :\n\n➤【 𝗰𝘂𝗿𝘀𝗶𝘃𝗲 】\n➤【 𝗱𝘀𝘁𝗿𝘂𝗰𝗸 】\n➤ 【 𝗯𝗼𝗹𝗱 】\n➤【 𝗳𝗼𝗻𝘁 】\n➤【 𝗶𝘁𝗮𝗹𝗶𝗰 】\n➤【 𝘂𝗻𝗸𝗻𝗼𝘄𝗻 】\n➤【 𝗰𝘆𝗰𝗹𝗲 】\n➤【 𝘁𝗵𝗶𝗰𝗸𝗯 】\n➤【 𝗳𝗿𝗮𝗸𝘁𝘂𝗿 】\n➤ 【 𝘀𝗯𝗱 】\n➤ 【 𝗶𝗺𝗽𝗮𝗰𝘁 】\n➤【 𝘀𝗱𝘅𝗹 】\n➤【 𝗳𝗿𝗮𝗻𝗸 】\n➤【 𝘀𝗸𝘀 】\n\n➡ 𝗠𝗢𝗥𝗘 𝗢𝗣𝗧𝗜𝗢𝗡𝗦 :\n\n Type [.font list] to view all available fonts\n📝 𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n [ .font bold <your text> ]`;
			return api.sendMessage(errorMessage, event.threadID, event.messageID);
		}

		const outputText = inputText
			.split('')
			.map(char => fontMap.map[char] || char)
			.join('');

		return api.sendMessage(outputText, event.threadID, event.messageID);
	}
}
