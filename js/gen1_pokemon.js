/**
 * 🔴 全國寶可夢圖鑑 第一世代（關都地區 No.001 - No.151）
 * 資料來源：神奇寶貝百科 (52poke.com) 官方全國圖鑑編號列表
 * 包含官方中文名、日文名、英文名、標準教育部注音、屬性、代表招式、進化條件與官方立繪
 */

const GEN1_POKEMON_LIST = [
  {
    "id": 1,
    "dexNo": "#001",
    "name": "妙蛙種子",
    "jpName": "フシギダネ",
    "enName": "Bulbasaur",
    "types": [
      "草",
      "毒"
    ],
    "primaryType": "草",
    "secondaryType": "毒",
    "color": "#10B981",
    "icon": "🌿",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    "localImage": "assets/pokemon/gen1/1.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "zhuyin": "ㄇㄧㄠˋ ㄨㄚ ㄓㄨㄥˇ ˙ㄗ",
    "evolution": {
      "reqLevel": 16,
      "evolvesToId": 2,
      "evolvesToName": "妙蛙草"
    },
    "move": "藤鞭",
    "desc": "全國圖鑑 No.001，來自關都地區的經典寶可夢！屬性為【草/毒】。"
  },
  {
    "id": 2,
    "dexNo": "#002",
    "name": "妙蛙草",
    "jpName": "フシギソウ",
    "enName": "Ivysaur",
    "types": [
      "草",
      "毒"
    ],
    "primaryType": "草",
    "secondaryType": "毒",
    "color": "#10B981",
    "icon": "🌿",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
    "localImage": "assets/pokemon/gen1/2.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    "zhuyin": "ㄇㄧㄠˋ ㄨㄚ ㄘㄠˇ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 3,
      "evolvesToName": "妙蛙花"
    },
    "move": "種子炸彈",
    "desc": "全國圖鑑 No.002，來自關都地區的經典寶可夢！屬性為【草/毒】。"
  },
  {
    "id": 3,
    "dexNo": "#003",
    "name": "妙蛙花",
    "jpName": "フシギバナ",
    "enName": "Venusaur",
    "types": [
      "草",
      "毒"
    ],
    "primaryType": "草",
    "secondaryType": "毒",
    "color": "#10B981",
    "icon": "🌿",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
    "localImage": "assets/pokemon/gen1/3.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    "zhuyin": "ㄇㄧㄠˋ ㄨㄚ ㄏㄨㄚ",
    "evolution": null,
    "move": "日光束",
    "desc": "全國圖鑑 No.003，來自關都地區的經典寶可夢！屬性為【草/毒】。"
  },
  {
    "id": 4,
    "dexNo": "#004",
    "name": "小火龍",
    "jpName": "ヒトカゲ",
    "enName": "Charmander",
    "types": [
      "火"
    ],
    "primaryType": "火",
    "secondaryType": null,
    "color": "#EF4444",
    "icon": "🔥",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    "localImage": "assets/pokemon/gen1/4.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    "zhuyin": "ㄒㄧㄠˇ ㄏㄨㄛˇ ㄌㄨㄥˊ",
    "evolution": {
      "reqLevel": 16,
      "evolvesToId": 5,
      "evolvesToName": "火恐龍"
    },
    "move": "過熱",
    "desc": "全國圖鑑 No.004，來自關都地區的經典寶可夢！屬性為【火】。"
  },
  {
    "id": 5,
    "dexNo": "#005",
    "name": "火恐龍",
    "jpName": "リザード",
    "enName": "Charmeleon",
    "types": [
      "火"
    ],
    "primaryType": "火",
    "secondaryType": null,
    "color": "#EF4444",
    "icon": "🔥",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
    "localImage": "assets/pokemon/gen1/5.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
    "zhuyin": "ㄏㄨㄛˇ ㄎㄨㄥˇ ㄌㄨㄥˊ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 6,
      "evolvesToName": "噴火龍"
    },
    "move": "噴射火焰",
    "desc": "全國圖鑑 No.005，來自關都地區的經典寶可夢！屬性為【火】。"
  },
  {
    "id": 6,
    "dexNo": "#006",
    "name": "噴火龍",
    "jpName": "リザードン",
    "enName": "Charizard",
    "types": [
      "火",
      "飛行"
    ],
    "primaryType": "火",
    "secondaryType": "飛行",
    "color": "#EF4444",
    "icon": "🔥",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    "localImage": "assets/pokemon/gen1/6.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    "zhuyin": "ㄆㄣ ㄏㄨㄛˇ ㄌㄨㄥˊ",
    "evolution": null,
    "move": "火焰旋渦",
    "desc": "全國圖鑑 No.006，來自關都地區的經典寶可夢！屬性為【火/飛行】。"
  },
  {
    "id": 7,
    "dexNo": "#007",
    "name": "傑尼龜",
    "jpName": "ゼニガメ",
    "enName": "Squirtle",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    "localImage": "assets/pokemon/gen1/7.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    "zhuyin": "ㄐㄧㄝˊ ㄋㄧˊ ㄍㄨㄟ",
    "evolution": {
      "reqLevel": 16,
      "evolvesToId": 8,
      "evolvesToName": "卡咪龜"
    },
    "move": "水炮",
    "desc": "全國圖鑑 No.007，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 8,
    "dexNo": "#008",
    "name": "卡咪龜",
    "jpName": "カメール",
    "enName": "Wartortle",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png",
    "localImage": "assets/pokemon/gen1/8.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
    "zhuyin": "ㄎㄚˇ ㄇㄧ ㄍㄨㄟ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 9,
      "evolvesToName": "水箭龜"
    },
    "move": "加農水炮",
    "desc": "全國圖鑑 No.008，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 9,
    "dexNo": "#009",
    "name": "水箭龜",
    "jpName": "カメックス",
    "enName": "Blastoise",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
    "localImage": "assets/pokemon/gen1/9.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
    "zhuyin": "ㄕㄨㄟˇ ㄐㄧㄢˋ ㄍㄨㄟ",
    "evolution": null,
    "move": "衝浪",
    "desc": "全國圖鑑 No.009，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 10,
    "dexNo": "#010",
    "name": "綠毛蟲",
    "jpName": "キャタピー",
    "enName": "Caterpie",
    "types": [
      "蟲"
    ],
    "primaryType": "蟲",
    "secondaryType": null,
    "color": "#84CC16",
    "icon": "🐛",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png",
    "localImage": "assets/pokemon/gen1/10.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
    "zhuyin": "ㄌㄩˋ ㄇㄠˊ ㄔㄨㄥˊ",
    "evolution": {
      "reqLevel": 7,
      "evolvesToId": 11,
      "evolvesToName": "鐵甲蛹"
    },
    "move": "蟲咬",
    "desc": "全國圖鑑 No.010，來自關都地區的經典寶可夢！屬性為【蟲】。"
  },
  {
    "id": 11,
    "dexNo": "#011",
    "name": "鐵甲蛹",
    "jpName": "トランセル",
    "enName": "Metapod",
    "types": [
      "蟲"
    ],
    "primaryType": "蟲",
    "secondaryType": null,
    "color": "#84CC16",
    "icon": "🐛",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png",
    "localImage": "assets/pokemon/gen1/11.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
    "zhuyin": "ㄊㄧㄝˇ ㄐㄧㄚˇ ㄩㄥˇ",
    "evolution": {
      "reqLevel": 10,
      "evolvesToId": 12,
      "evolvesToName": "巴大蝶"
    },
    "move": "十字剪",
    "desc": "全國圖鑑 No.011，來自關都地區的經典寶可夢！屬性為【蟲】。"
  },
  {
    "id": 12,
    "dexNo": "#012",
    "name": "巴大蝶",
    "jpName": "バタフリー",
    "enName": "Butterfree",
    "types": [
      "蟲",
      "飛行"
    ],
    "primaryType": "蟲",
    "secondaryType": "飛行",
    "color": "#84CC16",
    "icon": "🐛",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png",
    "localImage": "assets/pokemon/gen1/12.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
    "zhuyin": "ㄅㄚ ㄉㄚˋ ㄉㄧㄝˊ",
    "evolution": null,
    "move": "銀色旋風",
    "desc": "全國圖鑑 No.012，來自關都地區的經典寶可夢！屬性為【蟲/飛行】。"
  },
  {
    "id": 13,
    "dexNo": "#013",
    "name": "獨角蟲",
    "jpName": "ビードル",
    "enName": "Weedle",
    "types": [
      "蟲",
      "毒"
    ],
    "primaryType": "蟲",
    "secondaryType": "毒",
    "color": "#84CC16",
    "icon": "🐛",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png",
    "localImage": "assets/pokemon/gen1/13.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png",
    "zhuyin": "ㄉㄨˊ ㄐㄧㄠˇ ㄔㄨㄥˊ",
    "evolution": {
      "reqLevel": 7,
      "evolvesToId": 14,
      "evolvesToName": "鐵殼蛹"
    },
    "move": "急速折返",
    "desc": "全國圖鑑 No.013，來自關都地區的經典寶可夢！屬性為【蟲/毒】。"
  },
  {
    "id": 14,
    "dexNo": "#014",
    "name": "鐵殼蛹",
    "jpName": "コクーン",
    "enName": "Kakuna",
    "types": [
      "蟲",
      "毒"
    ],
    "primaryType": "蟲",
    "secondaryType": "毒",
    "color": "#84CC16",
    "icon": "🐛",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png",
    "localImage": "assets/pokemon/gen1/14.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png",
    "zhuyin": "ㄊㄧㄝˇ ㄎㄜˊ ㄩㄥˇ",
    "evolution": {
      "reqLevel": 10,
      "evolvesToId": 15,
      "evolvesToName": "大針蜂"
    },
    "move": "致命針刺",
    "desc": "全國圖鑑 No.014，來自關都地區的經典寶可夢！屬性為【蟲/毒】。"
  },
  {
    "id": 15,
    "dexNo": "#015",
    "name": "大針蜂",
    "jpName": "スピアー",
    "enName": "Beedrill",
    "types": [
      "蟲",
      "毒"
    ],
    "primaryType": "蟲",
    "secondaryType": "毒",
    "color": "#84CC16",
    "icon": "🐛",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png",
    "localImage": "assets/pokemon/gen1/15.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png",
    "zhuyin": "ㄉㄚˋ ㄓㄣ ㄈㄥ",
    "evolution": null,
    "move": "蟲咬",
    "desc": "全國圖鑑 No.015，來自關都地區的經典寶可夢！屬性為【蟲/毒】。"
  },
  {
    "id": 16,
    "dexNo": "#016",
    "name": "波波",
    "jpName": "ポッポ",
    "enName": "Pidgey",
    "types": [
      "一般",
      "飛行"
    ],
    "primaryType": "一般",
    "secondaryType": "飛行",
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png",
    "localImage": "assets/pokemon/gen1/16.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
    "zhuyin": "ㄅㄛ ㄅㄛ",
    "evolution": {
      "reqLevel": 18,
      "evolvesToId": 17,
      "evolvesToName": "比比鳥"
    },
    "move": "電光一閃",
    "desc": "全國圖鑑 No.016，來自關都地區的經典寶可夢！屬性為【一般/飛行】。"
  },
  {
    "id": 17,
    "dexNo": "#017",
    "name": "比比鳥",
    "jpName": "ピジョン",
    "enName": "Pidgeotto",
    "types": [
      "一般",
      "飛行"
    ],
    "primaryType": "一般",
    "secondaryType": "飛行",
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
    "localImage": "assets/pokemon/gen1/17.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png",
    "zhuyin": "ㄅㄧˇ ㄅㄧˇ ㄋㄧㄠˇ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 18,
      "evolvesToName": "大比鳥"
    },
    "move": "劈開",
    "desc": "全國圖鑑 No.017，來自關都地區的經典寶可夢！屬性為【一般/飛行】。"
  },
  {
    "id": 18,
    "dexNo": "#018",
    "name": "大比鳥",
    "jpName": "ピジョット",
    "enName": "Pidgeot",
    "types": [
      "一般",
      "飛行"
    ],
    "primaryType": "一般",
    "secondaryType": "飛行",
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png",
    "localImage": "assets/pokemon/gen1/18.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png",
    "zhuyin": "ㄉㄚˋ ㄅㄧˇ ㄋㄧㄠˇ",
    "evolution": null,
    "move": "破壞光線",
    "desc": "全國圖鑑 No.018，來自關都地區的經典寶可夢！屬性為【一般/飛行】。"
  },
  {
    "id": 19,
    "dexNo": "#019",
    "name": "小拉達",
    "jpName": "コラッタ",
    "enName": "Rattata",
    "types": [
      "一般"
    ],
    "primaryType": "一般",
    "secondaryType": null,
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png",
    "localImage": "assets/pokemon/gen1/19.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
    "zhuyin": "ㄒㄧㄠˇ ㄌㄚ ㄉㄚˊ",
    "evolution": {
      "reqLevel": 20,
      "evolvesToId": 20,
      "evolvesToName": "拉達"
    },
    "move": "泰山壓頂",
    "desc": "全國圖鑑 No.019，來自關都地區的經典寶可夢！屬性為【一般】。"
  },
  {
    "id": 20,
    "dexNo": "#020",
    "name": "拉達",
    "jpName": "ラッタ",
    "enName": "Raticate",
    "types": [
      "一般"
    ],
    "primaryType": "一般",
    "secondaryType": null,
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png",
    "localImage": "assets/pokemon/gen1/20.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png",
    "zhuyin": "ㄌㄚ ㄉㄚˊ",
    "evolution": null,
    "move": "撞擊",
    "desc": "全國圖鑑 No.020，來自關都地區的經典寶可夢！屬性為【一般】。"
  },
  {
    "id": 21,
    "dexNo": "#021",
    "name": "烈雀",
    "jpName": "オニスズメ",
    "enName": "Spearow",
    "types": [
      "一般",
      "飛行"
    ],
    "primaryType": "一般",
    "secondaryType": "飛行",
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
    "localImage": "assets/pokemon/gen1/21.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png",
    "zhuyin": "ㄌㄧㄝˋ ㄑㄩㄝˋ",
    "evolution": {
      "reqLevel": 20,
      "evolvesToId": 22,
      "evolvesToName": "大嘴雀"
    },
    "move": "電光一閃",
    "desc": "全國圖鑑 No.021，來自關都地區的經典寶可夢！屬性為【一般/飛行】。"
  },
  {
    "id": 22,
    "dexNo": "#022",
    "name": "大嘴雀",
    "jpName": "オニドリル",
    "enName": "Fearow",
    "types": [
      "一般",
      "飛行"
    ],
    "primaryType": "一般",
    "secondaryType": "飛行",
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/22.png",
    "localImage": "assets/pokemon/gen1/22.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png",
    "zhuyin": "ㄉㄚˋ ㄗㄨㄟˇ ㄑㄩㄝˋ",
    "evolution": null,
    "move": "劈開",
    "desc": "全國圖鑑 No.022，來自關都地區的經典寶可夢！屬性為【一般/飛行】。"
  },
  {
    "id": 23,
    "dexNo": "#023",
    "name": "阿柏蛇",
    "jpName": "アーボ",
    "enName": "Ekans",
    "types": [
      "毒"
    ],
    "primaryType": "毒",
    "secondaryType": null,
    "color": "#8B5CF6",
    "icon": "☠️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png",
    "localImage": "assets/pokemon/gen1/23.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png",
    "zhuyin": "ㄚ ㄅㄛˊ ㄕㄜˊ",
    "evolution": {
      "reqLevel": 22,
      "evolvesToId": 24,
      "evolvesToName": "阿柏怪"
    },
    "move": "毒擊",
    "desc": "全國圖鑑 No.023，來自關都地區的經典寶可夢！屬性為【毒】。"
  },
  {
    "id": 24,
    "dexNo": "#024",
    "name": "阿柏怪",
    "jpName": "アーボック",
    "enName": "Arbok",
    "types": [
      "毒"
    ],
    "primaryType": "毒",
    "secondaryType": null,
    "color": "#8B5CF6",
    "icon": "☠️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png",
    "localImage": "assets/pokemon/gen1/24.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png",
    "zhuyin": "ㄚ ㄅㄛˊ ㄍㄨㄞˋ",
    "evolution": null,
    "move": "劇毒",
    "desc": "全國圖鑑 No.024，來自關都地區的經典寶可夢！屬性為【毒】。"
  },
  {
    "id": 25,
    "dexNo": "#025",
    "name": "皮卡丘",
    "jpName": "ピカチュウ",
    "enName": "Pikachu",
    "types": [
      "電"
    ],
    "primaryType": "電",
    "secondaryType": null,
    "color": "#F59E0B",
    "icon": "⚡",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    "localImage": "assets/pokemon/gen1/25.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    "zhuyin": "ㄆㄧˊ ㄎㄚˇ ㄑㄧㄡ",
    "evolution": {
      "reqLevel": 16,
      "evolvesToId": 26,
      "evolvesToName": "雷丘"
    },
    "move": "十萬伏特",
    "desc": "全國圖鑑 No.025，來自關都地區的經典寶可夢！屬性為【電】。"
  },
  {
    "id": 26,
    "dexNo": "#026",
    "name": "雷丘",
    "jpName": "ライチュウ",
    "enName": "Raichu",
    "types": [
      "電"
    ],
    "primaryType": "電",
    "secondaryType": null,
    "color": "#F59E0B",
    "icon": "⚡",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png",
    "localImage": "assets/pokemon/gen1/26.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png",
    "zhuyin": "ㄌㄟˊ ㄑㄧㄡ",
    "evolution": null,
    "move": "打雷",
    "desc": "全國圖鑑 No.026，來自關都地區的經典寶可夢！屬性為【電】。"
  },
  {
    "id": 27,
    "dexNo": "#027",
    "name": "穿山鼠",
    "jpName": "サンド",
    "enName": "Sandshrew",
    "types": [
      "地面"
    ],
    "primaryType": "地面",
    "secondaryType": null,
    "color": "#D97706",
    "icon": "🏜️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png",
    "localImage": "assets/pokemon/gen1/27.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png",
    "zhuyin": "ㄔㄨㄢ ㄕㄢ ㄕㄨˇ",
    "evolution": {
      "reqLevel": 22,
      "evolvesToId": 28,
      "evolvesToName": "穿山王"
    },
    "move": "地震",
    "desc": "全國圖鑑 No.027，來自關都地區的經典寶可夢！屬性為【地面】。"
  },
  {
    "id": 28,
    "dexNo": "#028",
    "name": "穿山王",
    "jpName": "サンドパン",
    "enName": "Sandslash",
    "types": [
      "地面"
    ],
    "primaryType": "地面",
    "secondaryType": null,
    "color": "#D97706",
    "icon": "🏜️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/28.png",
    "localImage": "assets/pokemon/gen1/28.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png",
    "zhuyin": "ㄔㄨㄢ ㄕㄢ ㄨㄤˊ",
    "evolution": null,
    "move": "大地之力",
    "desc": "全國圖鑑 No.028，來自關都地區的經典寶可夢！屬性為【地面】。"
  },
  {
    "id": 29,
    "dexNo": "#029",
    "name": "尼多蘭",
    "jpName": "ニドラン♀",
    "enName": "Nidoran♀",
    "types": [
      "毒"
    ],
    "primaryType": "毒",
    "secondaryType": null,
    "color": "#8B5CF6",
    "icon": "☠️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/29.png",
    "localImage": "assets/pokemon/gen1/29.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png",
    "zhuyin": "ㄋㄧˊ ㄉㄨㄛ ㄌㄢˊ",
    "evolution": {
      "reqLevel": 16,
      "evolvesToId": 30,
      "evolvesToName": "尼多娜"
    },
    "move": "劇毒",
    "desc": "全國圖鑑 No.029，來自關都地區的經典寶可夢！屬性為【毒】。"
  },
  {
    "id": 30,
    "dexNo": "#030",
    "name": "尼多娜",
    "jpName": "ニドリーナ",
    "enName": "Nidorina",
    "types": [
      "毒"
    ],
    "primaryType": "毒",
    "secondaryType": null,
    "color": "#8B5CF6",
    "icon": "☠️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/30.png",
    "localImage": "assets/pokemon/gen1/30.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png",
    "zhuyin": "ㄋㄧˊ ㄉㄨㄛ ㄋㄚˋ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 31,
      "evolvesToName": "尼多后"
    },
    "move": "溶解液",
    "desc": "全國圖鑑 No.030，來自關都地區的經典寶可夢！屬性為【毒】。"
  },
  {
    "id": 31,
    "dexNo": "#031",
    "name": "尼多后",
    "jpName": "ニドクイン",
    "enName": "Nidoqueen",
    "types": [
      "毒",
      "地面"
    ],
    "primaryType": "毒",
    "secondaryType": "地面",
    "color": "#8B5CF6",
    "icon": "☠️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png",
    "localImage": "assets/pokemon/gen1/31.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png",
    "zhuyin": "ㄋㄧˊ ㄉㄨㄛ ㄏㄡˋ",
    "evolution": null,
    "move": "毒針",
    "desc": "全國圖鑑 No.031，來自關都地區的經典寶可夢！屬性為【毒/地面】。"
  },
  {
    "id": 32,
    "dexNo": "#032",
    "name": "尼多朗",
    "jpName": "ニドラン♂",
    "enName": "Nidoran♂",
    "types": [
      "毒"
    ],
    "primaryType": "毒",
    "secondaryType": null,
    "color": "#8B5CF6",
    "icon": "☠️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/32.png",
    "localImage": "assets/pokemon/gen1/32.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png",
    "zhuyin": "ㄋㄧˊ ㄉㄨㄛ ㄌㄤˇ",
    "evolution": {
      "reqLevel": 16,
      "evolvesToId": 33,
      "evolvesToName": "尼多力諾"
    },
    "move": "污泥炸彈",
    "desc": "全國圖鑑 No.032，來自關都地區的經典寶可夢！屬性為【毒】。"
  },
  {
    "id": 33,
    "dexNo": "#033",
    "name": "尼多力諾",
    "jpName": "ニドリーノ",
    "enName": "Nidorino",
    "types": [
      "毒"
    ],
    "primaryType": "毒",
    "secondaryType": null,
    "color": "#8B5CF6",
    "icon": "☠️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png",
    "localImage": "assets/pokemon/gen1/33.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png",
    "zhuyin": "ㄋㄧˊ ㄉㄨㄛ ㄌㄧˋ ㄋㄨㄛˋ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 34,
      "evolvesToName": "尼多王"
    },
    "move": "毒擊",
    "desc": "全國圖鑑 No.033，來自關都地區的經典寶可夢！屬性為【毒】。"
  },
  {
    "id": 34,
    "dexNo": "#034",
    "name": "尼多王",
    "jpName": "ニドキング",
    "enName": "Nidoking",
    "types": [
      "毒",
      "地面"
    ],
    "primaryType": "毒",
    "secondaryType": "地面",
    "color": "#8B5CF6",
    "icon": "☠️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/34.png",
    "localImage": "assets/pokemon/gen1/34.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png",
    "zhuyin": "ㄋㄧˊ ㄉㄨㄛ ㄨㄤˊ",
    "evolution": null,
    "move": "劇毒",
    "desc": "全國圖鑑 No.034，來自關都地區的經典寶可夢！屬性為【毒/地面】。"
  },
  {
    "id": 35,
    "dexNo": "#035",
    "name": "皮皮",
    "jpName": "ピッピ",
    "enName": "Clefairy",
    "types": [
      "妖精"
    ],
    "primaryType": "妖精",
    "secondaryType": null,
    "color": "#F472B6",
    "icon": "🎀",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png",
    "localImage": "assets/pokemon/gen1/35.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png",
    "zhuyin": "ㄆㄧˊ ㄆㄧˊ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 36,
      "evolvesToName": "皮可西"
    },
    "move": "吸取之吻",
    "desc": "全國圖鑑 No.035，來自關都地區的經典寶可夢！屬性為【妖精】。"
  },
  {
    "id": 36,
    "dexNo": "#036",
    "name": "皮可西",
    "jpName": "ピクシー",
    "enName": "Clefable",
    "types": [
      "妖精"
    ],
    "primaryType": "妖精",
    "secondaryType": null,
    "color": "#F472B6",
    "icon": "🎀",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/36.png",
    "localImage": "assets/pokemon/gen1/36.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png",
    "zhuyin": "ㄆㄧˊ ㄎㄜˇ ㄒㄧ",
    "evolution": null,
    "move": "妖精之風",
    "desc": "全國圖鑑 No.036，來自關都地區的經典寶可夢！屬性為【妖精】。"
  },
  {
    "id": 37,
    "dexNo": "#037",
    "name": "六尾",
    "jpName": "ロコン",
    "enName": "Vulpix",
    "types": [
      "火"
    ],
    "primaryType": "火",
    "secondaryType": null,
    "color": "#EF4444",
    "icon": "🔥",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png",
    "localImage": "assets/pokemon/gen1/37.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png",
    "zhuyin": "ㄌㄧㄡˋ ㄨㄟˇ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 38,
      "evolvesToName": "九尾"
    },
    "move": "大字爆炎",
    "desc": "全國圖鑑 No.037，來自關都地區的經典寶可夢！屬性為【火】。"
  },
  {
    "id": 38,
    "dexNo": "#038",
    "name": "九尾",
    "jpName": "キュウコン",
    "enName": "Ninetales",
    "types": [
      "火"
    ],
    "primaryType": "火",
    "secondaryType": null,
    "color": "#EF4444",
    "icon": "🔥",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/38.png",
    "localImage": "assets/pokemon/gen1/38.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png",
    "zhuyin": "ㄐㄧㄡˇ ㄨㄟˇ",
    "evolution": null,
    "move": "閃焰衝鋒",
    "desc": "全國圖鑑 No.038，來自關都地區的經典寶可夢！屬性為【火】。"
  },
  {
    "id": 39,
    "dexNo": "#039",
    "name": "胖丁",
    "jpName": "プリン",
    "enName": "Jigglypuff",
    "types": [
      "一般",
      "妖精"
    ],
    "primaryType": "一般",
    "secondaryType": "妖精",
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png",
    "localImage": "assets/pokemon/gen1/39.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png",
    "zhuyin": "ㄆㄤˋ ㄉㄧㄥ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 40,
      "evolvesToName": "胖可丁"
    },
    "move": "泰山壓頂",
    "desc": "全國圖鑑 No.039，來自關都地區的經典寶可夢！屬性為【一般/妖精】。"
  },
  {
    "id": 40,
    "dexNo": "#040",
    "name": "胖可丁",
    "jpName": "プクリン",
    "enName": "Wigglytuff",
    "types": [
      "一般",
      "妖精"
    ],
    "primaryType": "一般",
    "secondaryType": "妖精",
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/40.png",
    "localImage": "assets/pokemon/gen1/40.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png",
    "zhuyin": "ㄆㄤˋ ㄎㄜˇ ㄉㄧㄥ",
    "evolution": null,
    "move": "撞擊",
    "desc": "全國圖鑑 No.040，來自關都地區的經典寶可夢！屬性為【一般/妖精】。"
  },
  {
    "id": 41,
    "dexNo": "#041",
    "name": "超音蝠",
    "jpName": "ズバット",
    "enName": "Zubat",
    "types": [
      "毒",
      "飛行"
    ],
    "primaryType": "毒",
    "secondaryType": "飛行",
    "color": "#8B5CF6",
    "icon": "☠️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/41.png",
    "localImage": "assets/pokemon/gen1/41.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png",
    "zhuyin": "ㄔㄠ ㄧㄣ ㄈㄨˊ",
    "evolution": {
      "reqLevel": 22,
      "evolvesToId": 42,
      "evolvesToName": "大嘴蝠"
    },
    "move": "毒針",
    "desc": "全國圖鑑 No.041，來自關都地區的經典寶可夢！屬性為【毒/飛行】。"
  },
  {
    "id": 42,
    "dexNo": "#042",
    "name": "大嘴蝠",
    "jpName": "ゴルバット",
    "enName": "Golbat",
    "types": [
      "毒",
      "飛行"
    ],
    "primaryType": "毒",
    "secondaryType": "飛行",
    "color": "#8B5CF6",
    "icon": "☠️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/42.png",
    "localImage": "assets/pokemon/gen1/42.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png",
    "zhuyin": "ㄉㄚˋ ㄗㄨㄟˇ ㄈㄨˊ",
    "evolution": null,
    "move": "污泥炸彈",
    "desc": "全國圖鑑 No.042，來自關都地區的經典寶可夢！屬性為【毒/飛行】。"
  },
  {
    "id": 43,
    "dexNo": "#043",
    "name": "走路草",
    "jpName": "ナゾノクサ",
    "enName": "Oddish",
    "types": [
      "草",
      "毒"
    ],
    "primaryType": "草",
    "secondaryType": "毒",
    "color": "#10B981",
    "icon": "🌿",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/43.png",
    "localImage": "assets/pokemon/gen1/43.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png",
    "zhuyin": "ㄗㄡˇ ㄌㄨˋ ㄘㄠˇ",
    "evolution": {
      "reqLevel": 21,
      "evolvesToId": 44,
      "evolvesToName": "臭臭花"
    },
    "move": "日光束",
    "desc": "全國圖鑑 No.043，來自關都地區的經典寶可夢！屬性為【草/毒】。"
  },
  {
    "id": 44,
    "dexNo": "#044",
    "name": "臭臭花",
    "jpName": "クサイハナ",
    "enName": "Gloom",
    "types": [
      "草",
      "毒"
    ],
    "primaryType": "草",
    "secondaryType": "毒",
    "color": "#10B981",
    "icon": "🌿",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/44.png",
    "localImage": "assets/pokemon/gen1/44.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png",
    "zhuyin": "ㄔㄡˋ ㄔㄡˋ ㄏㄨㄚ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 45,
      "evolvesToName": "霸王花"
    },
    "move": "瘋狂植物",
    "desc": "全國圖鑑 No.044，來自關都地區的經典寶可夢！屬性為【草/毒】。"
  },
  {
    "id": 45,
    "dexNo": "#045",
    "name": "霸王花",
    "jpName": "ラフレシア",
    "enName": "Vileplume",
    "types": [
      "草",
      "毒"
    ],
    "primaryType": "草",
    "secondaryType": "毒",
    "color": "#10B981",
    "icon": "🌿",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/45.png",
    "localImage": "assets/pokemon/gen1/45.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png",
    "zhuyin": "ㄅㄚˋ ㄨㄤˊ ㄏㄨㄚ",
    "evolution": null,
    "move": "飛葉快刀",
    "desc": "全國圖鑑 No.045，來自關都地區的經典寶可夢！屬性為【草/毒】。"
  },
  {
    "id": 46,
    "dexNo": "#046",
    "name": "派拉斯",
    "jpName": "パラス",
    "enName": "Paras",
    "types": [
      "蟲",
      "草"
    ],
    "primaryType": "蟲",
    "secondaryType": "草",
    "color": "#84CC16",
    "icon": "🐛",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/46.png",
    "localImage": "assets/pokemon/gen1/46.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png",
    "zhuyin": "ㄆㄞˋ ㄌㄚ ㄙ",
    "evolution": {
      "reqLevel": 24,
      "evolvesToId": 47,
      "evolvesToName": "派拉斯特"
    },
    "move": "十字剪",
    "desc": "全國圖鑑 No.046，來自關都地區的經典寶可夢！屬性為【蟲/草】。"
  },
  {
    "id": 47,
    "dexNo": "#047",
    "name": "派拉斯特",
    "jpName": "パラセクト",
    "enName": "Parasect",
    "types": [
      "蟲",
      "草"
    ],
    "primaryType": "蟲",
    "secondaryType": "草",
    "color": "#84CC16",
    "icon": "🐛",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/47.png",
    "localImage": "assets/pokemon/gen1/47.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/47.png",
    "zhuyin": "ㄆㄞˋ ㄌㄚ ㄙ ㄊㄜˋ",
    "evolution": null,
    "move": "銀色旋風",
    "desc": "全國圖鑑 No.047，來自關都地區的經典寶可夢！屬性為【蟲/草】。"
  },
  {
    "id": 48,
    "dexNo": "#048",
    "name": "毛球",
    "jpName": "コンパン",
    "enName": "Venonat",
    "types": [
      "蟲",
      "毒"
    ],
    "primaryType": "蟲",
    "secondaryType": "毒",
    "color": "#84CC16",
    "icon": "🐛",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/48.png",
    "localImage": "assets/pokemon/gen1/48.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/48.png",
    "zhuyin": "ㄇㄠˊ ㄑㄧㄡˊ",
    "evolution": {
      "reqLevel": 31,
      "evolvesToId": 49,
      "evolvesToName": "摩魯蛾"
    },
    "move": "急速折返",
    "desc": "全國圖鑑 No.048，來自關都地區的經典寶可夢！屬性為【蟲/毒】。"
  },
  {
    "id": 49,
    "dexNo": "#049",
    "name": "摩魯蛾",
    "jpName": "モルフォン",
    "enName": "Venomoth",
    "types": [
      "蟲",
      "毒"
    ],
    "primaryType": "蟲",
    "secondaryType": "毒",
    "color": "#84CC16",
    "icon": "🐛",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/49.png",
    "localImage": "assets/pokemon/gen1/49.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png",
    "zhuyin": "ㄇㄛˊ ㄌㄨˇ ㄜˊ",
    "evolution": null,
    "move": "致命針刺",
    "desc": "全國圖鑑 No.049，來自關都地區的經典寶可夢！屬性為【蟲/毒】。"
  },
  {
    "id": 50,
    "dexNo": "#050",
    "name": "地鼠",
    "jpName": "ディグダ",
    "enName": "Diglett",
    "types": [
      "地面"
    ],
    "primaryType": "地面",
    "secondaryType": null,
    "color": "#D97706",
    "icon": "🏜️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/50.png",
    "localImage": "assets/pokemon/gen1/50.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png",
    "zhuyin": "ㄉㄧˋ ㄕㄨˇ",
    "evolution": {
      "reqLevel": 26,
      "evolvesToId": 51,
      "evolvesToName": "三地鼠"
    },
    "move": "擲泥",
    "desc": "全國圖鑑 No.050，來自關都地區的經典寶可夢！屬性為【地面】。"
  },
  {
    "id": 51,
    "dexNo": "#051",
    "name": "三地鼠",
    "jpName": "ダグトリオ",
    "enName": "Dugtrio",
    "types": [
      "地面"
    ],
    "primaryType": "地面",
    "secondaryType": null,
    "color": "#D97706",
    "icon": "🏜️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/51.png",
    "localImage": "assets/pokemon/gen1/51.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/51.png",
    "zhuyin": "ㄙㄢ ㄉㄧˋ ㄕㄨˇ",
    "evolution": null,
    "move": "重踏",
    "desc": "全國圖鑑 No.051，來自關都地區的經典寶可夢！屬性為【地面】。"
  },
  {
    "id": 52,
    "dexNo": "#052",
    "name": "喵喵",
    "jpName": "ニャース",
    "enName": "Meowth",
    "types": [
      "一般"
    ],
    "primaryType": "一般",
    "secondaryType": null,
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png",
    "localImage": "assets/pokemon/gen1/52.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png",
    "zhuyin": "ㄇㄧㄠ ㄇㄧㄠ",
    "evolution": {
      "reqLevel": 28,
      "evolvesToId": 53,
      "evolvesToName": "貓老大"
    },
    "move": "劈開",
    "desc": "全國圖鑑 No.052，來自關都地區的經典寶可夢！屬性為【一般】。"
  },
  {
    "id": 53,
    "dexNo": "#053",
    "name": "貓老大",
    "jpName": "ペルシアン",
    "enName": "Persian",
    "types": [
      "一般"
    ],
    "primaryType": "一般",
    "secondaryType": null,
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/53.png",
    "localImage": "assets/pokemon/gen1/53.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/53.png",
    "zhuyin": "ㄇㄠ ㄌㄠˇ ㄉㄚˋ",
    "evolution": null,
    "move": "破壞光線",
    "desc": "全國圖鑑 No.053，來自關都地區的經典寶可夢！屬性為【一般】。"
  },
  {
    "id": 54,
    "dexNo": "#054",
    "name": "可達鴨",
    "jpName": "コダック",
    "enName": "Psyduck",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png",
    "localImage": "assets/pokemon/gen1/54.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png",
    "zhuyin": "ㄎㄜˇ ㄉㄚˊ ㄧㄚ",
    "evolution": {
      "reqLevel": 33,
      "evolvesToId": 55,
      "evolvesToName": "哥達鴨"
    },
    "move": "衝浪",
    "desc": "全國圖鑑 No.054，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 55,
    "dexNo": "#055",
    "name": "哥達鴨",
    "jpName": "ゴルダック",
    "enName": "Golduck",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/55.png",
    "localImage": "assets/pokemon/gen1/55.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png",
    "zhuyin": "ㄍㄜ ㄉㄚˊ ㄧㄚ",
    "evolution": null,
    "move": "水槍",
    "desc": "全國圖鑑 No.055，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 56,
    "dexNo": "#056",
    "name": "猴怪",
    "jpName": "マンキー",
    "enName": "Mankey",
    "types": [
      "格鬥"
    ],
    "primaryType": "格鬥",
    "secondaryType": null,
    "color": "#B91C1C",
    "icon": "🥊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/56.png",
    "localImage": "assets/pokemon/gen1/56.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png",
    "zhuyin": "ㄏㄡˊ ㄍㄨㄞˋ",
    "evolution": {
      "reqLevel": 28,
      "evolvesToId": 57,
      "evolvesToName": "火爆猴"
    },
    "move": "近身戰",
    "desc": "全國圖鑑 No.056，來自關都地區的經典寶可夢！屬性為【格鬥】。"
  },
  {
    "id": 57,
    "dexNo": "#057",
    "name": "火爆猴",
    "jpName": "オコリザル",
    "enName": "Primeape",
    "types": [
      "格鬥"
    ],
    "primaryType": "格鬥",
    "secondaryType": null,
    "color": "#B91C1C",
    "icon": "🥊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/57.png",
    "localImage": "assets/pokemon/gen1/57.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png",
    "zhuyin": "ㄏㄨㄛˇ ㄅㄠˋ ㄏㄡˊ",
    "evolution": null,
    "move": "十字劈",
    "desc": "全國圖鑑 No.057，來自關都地區的經典寶可夢！屬性為【格鬥】。"
  },
  {
    "id": 58,
    "dexNo": "#058",
    "name": "卡蒂狗",
    "jpName": "ガーディ",
    "enName": "Growlithe",
    "types": [
      "火"
    ],
    "primaryType": "火",
    "secondaryType": null,
    "color": "#EF4444",
    "icon": "🔥",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/58.png",
    "localImage": "assets/pokemon/gen1/58.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png",
    "zhuyin": "ㄎㄚˇ ㄉㄧˋ ㄍㄡˇ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 59,
      "evolvesToName": "風速狗"
    },
    "move": "閃焰衝鋒",
    "desc": "全國圖鑑 No.058，來自關都地區的經典寶可夢！屬性為【火】。"
  },
  {
    "id": 59,
    "dexNo": "#059",
    "name": "風速狗",
    "jpName": "ウインディ",
    "enName": "Arcanine",
    "types": [
      "火"
    ],
    "primaryType": "火",
    "secondaryType": null,
    "color": "#EF4444",
    "icon": "🔥",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png",
    "localImage": "assets/pokemon/gen1/59.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png",
    "zhuyin": "ㄈㄥ ㄙㄨˋ ㄍㄡˇ",
    "evolution": null,
    "move": "過熱",
    "desc": "全國圖鑑 No.059，來自關都地區的經典寶可夢！屬性為【火】。"
  },
  {
    "id": 60,
    "dexNo": "#060",
    "name": "蚊香蝌蚪",
    "jpName": "ニョロモ",
    "enName": "Poliwag",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/60.png",
    "localImage": "assets/pokemon/gen1/60.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png",
    "zhuyin": "ㄨㄣˊ ㄒㄧㄤ ㄎㄜ ㄉㄡˇ",
    "evolution": {
      "reqLevel": 25,
      "evolvesToId": 61,
      "evolvesToName": "蚊香君"
    },
    "move": "水槍",
    "desc": "全國圖鑑 No.060，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 61,
    "dexNo": "#061",
    "name": "蚊香君",
    "jpName": "ニョロゾ",
    "enName": "Poliwhirl",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/61.png",
    "localImage": "assets/pokemon/gen1/61.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png",
    "zhuyin": "ㄨㄣˊ ㄒㄧㄤ ㄐㄩㄣ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 62,
      "evolvesToName": "蚊香泳士"
    },
    "move": "水之波動",
    "desc": "全國圖鑑 No.061，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 62,
    "dexNo": "#062",
    "name": "蚊香泳士",
    "jpName": "ニョロボン",
    "enName": "Poliwrath",
    "types": [
      "水",
      "格鬥"
    ],
    "primaryType": "水",
    "secondaryType": "格鬥",
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/62.png",
    "localImage": "assets/pokemon/gen1/62.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png",
    "zhuyin": "ㄨㄣˊ ㄒㄧㄤ ㄩㄥˇ ㄕˋ",
    "evolution": null,
    "move": "水炮",
    "desc": "全國圖鑑 No.062，來自關都地區的經典寶可夢！屬性為【水/格鬥】。"
  },
  {
    "id": 63,
    "dexNo": "#063",
    "name": "凱西",
    "jpName": "ケーシィ",
    "enName": "Abra",
    "types": [
      "超能力"
    ],
    "primaryType": "超能力",
    "secondaryType": null,
    "color": "#EC4899",
    "icon": "🔮",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png",
    "localImage": "assets/pokemon/gen1/63.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png",
    "zhuyin": "ㄎㄞˇ ㄒㄧ",
    "evolution": {
      "reqLevel": 16,
      "evolvesToId": 64,
      "evolvesToName": "勇基拉"
    },
    "move": "預知未來",
    "desc": "全國圖鑑 No.063，來自關都地區的經典寶可夢！屬性為【超能力】。"
  },
  {
    "id": 64,
    "dexNo": "#064",
    "name": "勇基拉",
    "jpName": "ユンゲラー",
    "enName": "Kadabra",
    "types": [
      "超能力"
    ],
    "primaryType": "超能力",
    "secondaryType": null,
    "color": "#EC4899",
    "icon": "🔮",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/64.png",
    "localImage": "assets/pokemon/gen1/64.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/64.png",
    "zhuyin": "ㄩㄥˇ ㄐㄧ ㄌㄚ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 65,
      "evolvesToName": "胡地"
    },
    "move": "精神擊破",
    "desc": "全國圖鑑 No.064，來自關都地區的經典寶可夢！屬性為【超能力】。"
  },
  {
    "id": 65,
    "dexNo": "#065",
    "name": "胡地",
    "jpName": "フーディン",
    "enName": "Alakazam",
    "types": [
      "超能力"
    ],
    "primaryType": "超能力",
    "secondaryType": null,
    "color": "#EC4899",
    "icon": "🔮",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png",
    "localImage": "assets/pokemon/gen1/65.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png",
    "zhuyin": "ㄏㄨˊ ㄉㄧˋ",
    "evolution": null,
    "move": "念力",
    "desc": "全國圖鑑 No.065，來自關都地區的經典寶可夢！屬性為【超能力】。"
  },
  {
    "id": 66,
    "dexNo": "#066",
    "name": "腕力",
    "jpName": "ワンリキー",
    "enName": "Machop",
    "types": [
      "格鬥"
    ],
    "primaryType": "格鬥",
    "secondaryType": null,
    "color": "#B91C1C",
    "icon": "🥊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/66.png",
    "localImage": "assets/pokemon/gen1/66.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png",
    "zhuyin": "ㄨㄢˋ ㄌㄧˋ",
    "evolution": {
      "reqLevel": 28,
      "evolvesToId": 67,
      "evolvesToName": "豪力"
    },
    "move": "近身戰",
    "desc": "全國圖鑑 No.066，來自關都地區的經典寶可夢！屬性為【格鬥】。"
  },
  {
    "id": 67,
    "dexNo": "#067",
    "name": "豪力",
    "jpName": "ゴーリキー",
    "enName": "Machoke",
    "types": [
      "格鬥"
    ],
    "primaryType": "格鬥",
    "secondaryType": null,
    "color": "#B91C1C",
    "icon": "🥊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/67.png",
    "localImage": "assets/pokemon/gen1/67.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/67.png",
    "zhuyin": "ㄏㄠˊ ㄌㄧˋ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 68,
      "evolvesToName": "怪力"
    },
    "move": "十字劈",
    "desc": "全國圖鑑 No.067，來自關都地區的經典寶可夢！屬性為【格鬥】。"
  },
  {
    "id": 68,
    "dexNo": "#068",
    "name": "怪力",
    "jpName": "カイリキー",
    "enName": "Machamp",
    "types": [
      "格鬥"
    ],
    "primaryType": "格鬥",
    "secondaryType": null,
    "color": "#B91C1C",
    "icon": "🥊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/68.png",
    "localImage": "assets/pokemon/gen1/68.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png",
    "zhuyin": "ㄍㄨㄞˋ ㄌㄧˋ",
    "evolution": null,
    "move": "爆裂拳",
    "desc": "全國圖鑑 No.068，來自關都地區的經典寶可夢！屬性為【格鬥】。"
  },
  {
    "id": 69,
    "dexNo": "#069",
    "name": "喇叭芽",
    "jpName": "マダツボミ",
    "enName": "Bellsprout",
    "types": [
      "草",
      "毒"
    ],
    "primaryType": "草",
    "secondaryType": "毒",
    "color": "#10B981",
    "icon": "🌿",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/69.png",
    "localImage": "assets/pokemon/gen1/69.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/69.png",
    "zhuyin": "ㄌㄚˇ ㄅㄚ ㄧㄚˊ",
    "evolution": {
      "reqLevel": 21,
      "evolvesToId": 70,
      "evolvesToName": "口呆花"
    },
    "move": "瘋狂植物",
    "desc": "全國圖鑑 No.069，來自關都地區的經典寶可夢！屬性為【草/毒】。"
  },
  {
    "id": 70,
    "dexNo": "#070",
    "name": "口呆花",
    "jpName": "ウツドン",
    "enName": "Weepinbell",
    "types": [
      "草",
      "毒"
    ],
    "primaryType": "草",
    "secondaryType": "毒",
    "color": "#10B981",
    "icon": "🌿",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/70.png",
    "localImage": "assets/pokemon/gen1/70.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/70.png",
    "zhuyin": "ㄎㄡˇ ㄉㄞ ㄏㄨㄚ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 71,
      "evolvesToName": "大食花"
    },
    "move": "飛葉快刀",
    "desc": "全國圖鑑 No.070，來自關都地區的經典寶可夢！屬性為【草/毒】。"
  },
  {
    "id": 71,
    "dexNo": "#071",
    "name": "大食花",
    "jpName": "ウツボット",
    "enName": "Victreebel",
    "types": [
      "草",
      "毒"
    ],
    "primaryType": "草",
    "secondaryType": "毒",
    "color": "#10B981",
    "icon": "🌿",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/71.png",
    "localImage": "assets/pokemon/gen1/71.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/71.png",
    "zhuyin": "ㄉㄚˋ ㄕˊ ㄏㄨㄚ",
    "evolution": null,
    "move": "藤鞭",
    "desc": "全國圖鑑 No.071，來自關都地區的經典寶可夢！屬性為【草/毒】。"
  },
  {
    "id": 72,
    "dexNo": "#072",
    "name": "瑪瑙水母",
    "jpName": "メノクラゲ",
    "enName": "Tentacool",
    "types": [
      "水",
      "毒"
    ],
    "primaryType": "水",
    "secondaryType": "毒",
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/72.png",
    "localImage": "assets/pokemon/gen1/72.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png",
    "zhuyin": "ㄇㄚˇ ㄋㄠˇ ㄕㄨㄟˇ ㄇㄨˇ",
    "evolution": {
      "reqLevel": 30,
      "evolvesToId": 73,
      "evolvesToName": "毒刺水母"
    },
    "move": "水炮",
    "desc": "全國圖鑑 No.072，來自關都地區的經典寶可夢！屬性為【水/毒】。"
  },
  {
    "id": 73,
    "dexNo": "#073",
    "name": "毒刺水母",
    "jpName": "ドククラゲ",
    "enName": "Tentacruel",
    "types": [
      "水",
      "毒"
    ],
    "primaryType": "水",
    "secondaryType": "毒",
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/73.png",
    "localImage": "assets/pokemon/gen1/73.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png",
    "zhuyin": "ㄉㄨˊ ㄘˋ ㄕㄨㄟˇ ㄇㄨˇ",
    "evolution": null,
    "move": "加農水炮",
    "desc": "全國圖鑑 No.073，來自關都地區的經典寶可夢！屬性為【水/毒】。"
  },
  {
    "id": 74,
    "dexNo": "#074",
    "name": "小拳石",
    "jpName": "イシツブテ",
    "enName": "Geodude",
    "types": [
      "岩石",
      "地面"
    ],
    "primaryType": "岩石",
    "secondaryType": "地面",
    "color": "#78716C",
    "icon": "🪨",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png",
    "localImage": "assets/pokemon/gen1/74.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png",
    "zhuyin": "ㄒㄧㄠˇ ㄑㄩㄢˊ ㄕˊ",
    "evolution": {
      "reqLevel": 25,
      "evolvesToId": 75,
      "evolvesToName": "隆隆石"
    },
    "move": "原始之力",
    "desc": "全國圖鑑 No.074，來自關都地區的經典寶可夢！屬性為【岩石/地面】。"
  },
  {
    "id": 75,
    "dexNo": "#075",
    "name": "隆隆石",
    "jpName": "ゴローン",
    "enName": "Graveler",
    "types": [
      "岩石",
      "地面"
    ],
    "primaryType": "岩石",
    "secondaryType": "地面",
    "color": "#78716C",
    "icon": "🪨",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/75.png",
    "localImage": "assets/pokemon/gen1/75.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/75.png",
    "zhuyin": "ㄌㄨㄥˊ ㄌㄨㄥˊ ㄕˊ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 76,
      "evolvesToName": "隆隆岩"
    },
    "move": "落石",
    "desc": "全國圖鑑 No.075，來自關都地區的經典寶可夢！屬性為【岩石/地面】。"
  },
  {
    "id": 76,
    "dexNo": "#076",
    "name": "隆隆岩",
    "jpName": "ゴローニャ",
    "enName": "Golem",
    "types": [
      "岩石",
      "地面"
    ],
    "primaryType": "岩石",
    "secondaryType": "地面",
    "color": "#78716C",
    "icon": "🪨",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/76.png",
    "localImage": "assets/pokemon/gen1/76.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png",
    "zhuyin": "ㄌㄨㄥˊ ㄌㄨㄥˊ ㄧㄢˊ",
    "evolution": null,
    "move": "岩石封鎖",
    "desc": "全國圖鑑 No.076，來自關都地區的經典寶可夢！屬性為【岩石/地面】。"
  },
  {
    "id": 77,
    "dexNo": "#077",
    "name": "小火馬",
    "jpName": "ポニータ",
    "enName": "Ponyta",
    "types": [
      "火"
    ],
    "primaryType": "火",
    "secondaryType": null,
    "color": "#EF4444",
    "icon": "🔥",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/77.png",
    "localImage": "assets/pokemon/gen1/77.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png",
    "zhuyin": "ㄒㄧㄠˇ ㄏㄨㄛˇ ㄇㄚˇ",
    "evolution": {
      "reqLevel": 40,
      "evolvesToId": 78,
      "evolvesToName": "烈焰馬"
    },
    "move": "大字爆炎",
    "desc": "全國圖鑑 No.077，來自關都地區的經典寶可夢！屬性為【火】。"
  },
  {
    "id": 78,
    "dexNo": "#078",
    "name": "烈焰馬",
    "jpName": "ギャロップ",
    "enName": "Rapidash",
    "types": [
      "火"
    ],
    "primaryType": "火",
    "secondaryType": null,
    "color": "#EF4444",
    "icon": "🔥",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/78.png",
    "localImage": "assets/pokemon/gen1/78.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png",
    "zhuyin": "ㄌㄧㄝˋ ㄧㄢˋ ㄇㄚˇ",
    "evolution": null,
    "move": "閃焰衝鋒",
    "desc": "全國圖鑑 No.078，來自關都地區的經典寶可夢！屬性為【火】。"
  },
  {
    "id": 79,
    "dexNo": "#079",
    "name": "呆呆獸",
    "jpName": "ヤドン",
    "enName": "Slowpoke",
    "types": [
      "水",
      "超能力"
    ],
    "primaryType": "水",
    "secondaryType": "超能力",
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/79.png",
    "localImage": "assets/pokemon/gen1/79.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/79.png",
    "zhuyin": "ㄉㄞ ㄉㄞ ㄕㄡˋ",
    "evolution": {
      "reqLevel": 37,
      "evolvesToId": 80,
      "evolvesToName": "呆殼獸"
    },
    "move": "衝浪",
    "desc": "全國圖鑑 No.079，來自關都地區的經典寶可夢！屬性為【水/超能力】。"
  },
  {
    "id": 80,
    "dexNo": "#080",
    "name": "呆殼獸",
    "jpName": "ヤドラン",
    "enName": "Slowbro",
    "types": [
      "水",
      "超能力"
    ],
    "primaryType": "水",
    "secondaryType": "超能力",
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/80.png",
    "localImage": "assets/pokemon/gen1/80.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80.png",
    "zhuyin": "ㄉㄞ ㄎㄜˊ ㄕㄡˋ",
    "evolution": null,
    "move": "水槍",
    "desc": "全國圖鑑 No.080，來自關都地區的經典寶可夢！屬性為【水/超能力】。"
  },
  {
    "id": 81,
    "dexNo": "#081",
    "name": "小磁怪",
    "jpName": "コイル",
    "enName": "Magnemite",
    "types": [
      "電",
      "鋼"
    ],
    "primaryType": "電",
    "secondaryType": "鋼",
    "color": "#F59E0B",
    "icon": "⚡",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/81.png",
    "localImage": "assets/pokemon/gen1/81.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png",
    "zhuyin": "ㄒㄧㄠˇ ㄘˊ ㄍㄨㄞˋ",
    "evolution": {
      "reqLevel": 30,
      "evolvesToId": 82,
      "evolvesToName": "三合一磁怪"
    },
    "move": "打雷",
    "desc": "全國圖鑑 No.081，來自關都地區的經典寶可夢！屬性為【電/鋼】。"
  },
  {
    "id": 82,
    "dexNo": "#082",
    "name": "三合一磁怪",
    "jpName": "レアコイル",
    "enName": "Magneton",
    "types": [
      "電",
      "鋼"
    ],
    "primaryType": "電",
    "secondaryType": "鋼",
    "color": "#F59E0B",
    "icon": "⚡",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/82.png",
    "localImage": "assets/pokemon/gen1/82.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/82.png",
    "zhuyin": "ㄙㄢ ㄏㄜˊ ㄧ ㄘˊ ㄍㄨㄞˋ",
    "evolution": null,
    "move": "電擊",
    "desc": "全國圖鑑 No.082，來自關都地區的經典寶可夢！屬性為【電/鋼】。"
  },
  {
    "id": 83,
    "dexNo": "#083",
    "name": "大蔥鴨",
    "jpName": "カモネギ",
    "enName": "Farfetch'd",
    "types": [
      "一般",
      "飛行"
    ],
    "primaryType": "一般",
    "secondaryType": "飛行",
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/83.png",
    "localImage": "assets/pokemon/gen1/83.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png",
    "zhuyin": "ㄉㄚˋ ㄘㄨㄥ ㄧㄚ",
    "evolution": null,
    "move": "破壞光線",
    "desc": "全國圖鑑 No.083，來自關都地區的經典寶可夢！屬性為【一般/飛行】。"
  },
  {
    "id": 84,
    "dexNo": "#084",
    "name": "嘟嘟",
    "jpName": "ドードー",
    "enName": "Doduo",
    "types": [
      "一般",
      "飛行"
    ],
    "primaryType": "一般",
    "secondaryType": "飛行",
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/84.png",
    "localImage": "assets/pokemon/gen1/84.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/84.png",
    "zhuyin": "ㄉㄨ ㄉㄨ",
    "evolution": {
      "reqLevel": 31,
      "evolvesToId": 85,
      "evolvesToName": "嘟嘟利"
    },
    "move": "泰山壓頂",
    "desc": "全國圖鑑 No.084，來自關都地區的經典寶可夢！屬性為【一般/飛行】。"
  },
  {
    "id": 85,
    "dexNo": "#085",
    "name": "嘟嘟利",
    "jpName": "ドードリオ",
    "enName": "Dodrio",
    "types": [
      "一般",
      "飛行"
    ],
    "primaryType": "一般",
    "secondaryType": "飛行",
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/85.png",
    "localImage": "assets/pokemon/gen1/85.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/85.png",
    "zhuyin": "ㄉㄨ ㄉㄨ ㄌㄧˋ",
    "evolution": null,
    "move": "撞擊",
    "desc": "全國圖鑑 No.085，來自關都地區的經典寶可夢！屬性為【一般/飛行】。"
  },
  {
    "id": 86,
    "dexNo": "#086",
    "name": "小海獅",
    "jpName": "パウワウ",
    "enName": "Seel",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/86.png",
    "localImage": "assets/pokemon/gen1/86.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/86.png",
    "zhuyin": "ㄒㄧㄠˇ ㄏㄞˇ ㄕ",
    "evolution": {
      "reqLevel": 34,
      "evolvesToId": 87,
      "evolvesToName": "白海獅"
    },
    "move": "水之波動",
    "desc": "全國圖鑑 No.086，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 87,
    "dexNo": "#087",
    "name": "白海獅",
    "jpName": "ジュゴン",
    "enName": "Dewgong",
    "types": [
      "水",
      "冰"
    ],
    "primaryType": "水",
    "secondaryType": "冰",
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/87.png",
    "localImage": "assets/pokemon/gen1/87.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png",
    "zhuyin": "ㄅㄞˊ ㄏㄞˇ ㄕ",
    "evolution": null,
    "move": "水炮",
    "desc": "全國圖鑑 No.087，來自關都地區的經典寶可夢！屬性為【水/冰】。"
  },
  {
    "id": 88,
    "dexNo": "#088",
    "name": "臭泥",
    "jpName": "ベトベター",
    "enName": "Grimer",
    "types": [
      "毒"
    ],
    "primaryType": "毒",
    "secondaryType": null,
    "color": "#8B5CF6",
    "icon": "☠️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/88.png",
    "localImage": "assets/pokemon/gen1/88.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/88.png",
    "zhuyin": "ㄔㄡˋ ㄋㄧˊ",
    "evolution": {
      "reqLevel": 38,
      "evolvesToId": 89,
      "evolvesToName": "臭臭泥"
    },
    "move": "毒擊",
    "desc": "全國圖鑑 No.088，來自關都地區的經典寶可夢！屬性為【毒】。"
  },
  {
    "id": 89,
    "dexNo": "#089",
    "name": "臭臭泥",
    "jpName": "ベトベトン",
    "enName": "Muk",
    "types": [
      "毒"
    ],
    "primaryType": "毒",
    "secondaryType": null,
    "color": "#8B5CF6",
    "icon": "☠️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/89.png",
    "localImage": "assets/pokemon/gen1/89.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png",
    "zhuyin": "ㄔㄡˋ ㄔㄡˋ ㄋㄧˊ",
    "evolution": null,
    "move": "劇毒",
    "desc": "全國圖鑑 No.089，來自關都地區的經典寶可夢！屬性為【毒】。"
  },
  {
    "id": 90,
    "dexNo": "#090",
    "name": "大舌貝",
    "jpName": "シェルダー",
    "enName": "Shellder",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/90.png",
    "localImage": "assets/pokemon/gen1/90.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/90.png",
    "zhuyin": "ㄉㄚˋ ㄕㄜˊ ㄅㄟˋ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 91,
      "evolvesToName": "刺甲貝"
    },
    "move": "水槍",
    "desc": "全國圖鑑 No.090，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 91,
    "dexNo": "#091",
    "name": "刺甲貝",
    "jpName": "パルシェン",
    "enName": "Cloyster",
    "types": [
      "水",
      "冰"
    ],
    "primaryType": "水",
    "secondaryType": "冰",
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/91.png",
    "localImage": "assets/pokemon/gen1/91.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/91.png",
    "zhuyin": "ㄘˋ ㄐㄧㄚˇ ㄅㄟˋ",
    "evolution": null,
    "move": "水之波動",
    "desc": "全國圖鑑 No.091，來自關都地區的經典寶可夢！屬性為【水/冰】。"
  },
  {
    "id": 92,
    "dexNo": "#092",
    "name": "鬼斯",
    "jpName": "ゴース",
    "enName": "Gastly",
    "types": [
      "幽靈",
      "毒"
    ],
    "primaryType": "幽靈",
    "secondaryType": "毒",
    "color": "#6366F1",
    "icon": "👻",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/92.png",
    "localImage": "assets/pokemon/gen1/92.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png",
    "zhuyin": "ㄍㄨㄟˇ ㄙ",
    "evolution": {
      "reqLevel": 25,
      "evolvesToId": 93,
      "evolvesToName": "鬼斯通"
    },
    "move": "暗影球",
    "desc": "全國圖鑑 No.092，來自關都地區的經典寶可夢！屬性為【幽靈/毒】。"
  },
  {
    "id": 93,
    "dexNo": "#093",
    "name": "鬼斯通",
    "jpName": "ゴースト",
    "enName": "Haunter",
    "types": [
      "幽靈",
      "毒"
    ],
    "primaryType": "幽靈",
    "secondaryType": "毒",
    "color": "#6366F1",
    "icon": "👻",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/93.png",
    "localImage": "assets/pokemon/gen1/93.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png",
    "zhuyin": "ㄍㄨㄟˇ ㄙ ㄊㄨㄥ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 94,
      "evolvesToName": "耿鬼"
    },
    "move": "黑夜魔影",
    "desc": "全國圖鑑 No.093，來自關都地區的經典寶可夢！屬性為【幽靈/毒】。"
  },
  {
    "id": 94,
    "dexNo": "#094",
    "name": "耿鬼",
    "jpName": "ゲンガー",
    "enName": "Gengar",
    "types": [
      "幽靈",
      "毒"
    ],
    "primaryType": "幽靈",
    "secondaryType": "毒",
    "color": "#6366F1",
    "icon": "👻",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    "localImage": "assets/pokemon/gen1/94.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png",
    "zhuyin": "ㄍㄥˇ ㄍㄨㄟˇ",
    "evolution": null,
    "move": "禍不單行",
    "desc": "全國圖鑑 No.094，來自關都地區的經典寶可夢！屬性為【幽靈/毒】。"
  },
  {
    "id": 95,
    "dexNo": "#095",
    "name": "大岩蛇",
    "jpName": "イワーク",
    "enName": "Onix",
    "types": [
      "岩石",
      "地面"
    ],
    "primaryType": "岩石",
    "secondaryType": "地面",
    "color": "#78716C",
    "icon": "🪨",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png",
    "localImage": "assets/pokemon/gen1/95.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png",
    "zhuyin": "ㄉㄚˋ ㄧㄢˊ ㄕㄜˊ",
    "evolution": null,
    "move": "落石",
    "desc": "全國圖鑑 No.095，來自關都地區的經典寶可夢！屬性為【岩石/地面】。"
  },
  {
    "id": 96,
    "dexNo": "#096",
    "name": "催眠貘",
    "jpName": "スリープ",
    "enName": "Drowzee",
    "types": [
      "超能力"
    ],
    "primaryType": "超能力",
    "secondaryType": null,
    "color": "#EC4899",
    "icon": "🔮",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/96.png",
    "localImage": "assets/pokemon/gen1/96.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/96.png",
    "zhuyin": "  ",
    "evolution": {
      "reqLevel": 26,
      "evolvesToId": 97,
      "evolvesToName": "引夢貘人"
    },
    "move": "幻象光線",
    "desc": "全國圖鑑 No.096，來自關都地區的經典寶可夢！屬性為【超能力】。"
  },
  {
    "id": 97,
    "dexNo": "#097",
    "name": "引夢貘人",
    "jpName": "スリーパー",
    "enName": "Hypno",
    "types": [
      "超能力"
    ],
    "primaryType": "超能力",
    "secondaryType": null,
    "color": "#EC4899",
    "icon": "🔮",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/97.png",
    "localImage": "assets/pokemon/gen1/97.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/97.png",
    "zhuyin": " ㄇㄥˋ  ㄖㄣˊ",
    "evolution": null,
    "move": "精神強念",
    "desc": "全國圖鑑 No.097，來自關都地區的經典寶可夢！屬性為【超能力】。"
  },
  {
    "id": 98,
    "dexNo": "#098",
    "name": "大鉗蟹",
    "jpName": "クラブ",
    "enName": "Krabby",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/98.png",
    "localImage": "assets/pokemon/gen1/98.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/98.png",
    "zhuyin": "ㄉㄚˋ ㄑㄧㄢˊ ㄒㄧㄝˋ",
    "evolution": {
      "reqLevel": 28,
      "evolvesToId": 99,
      "evolvesToName": "巨鉗蟹"
    },
    "move": "加農水炮",
    "desc": "全國圖鑑 No.098，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 99,
    "dexNo": "#099",
    "name": "巨鉗蟹",
    "jpName": "キングラー",
    "enName": "Kingler",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/99.png",
    "localImage": "assets/pokemon/gen1/99.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/99.png",
    "zhuyin": "ㄐㄩˋ ㄑㄧㄢˊ ㄒㄧㄝˋ",
    "evolution": null,
    "move": "衝浪",
    "desc": "全國圖鑑 No.099，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 100,
    "dexNo": "#100",
    "name": "霹靂電球",
    "jpName": "ビリリダマ",
    "enName": "Voltorb",
    "types": [
      "電"
    ],
    "primaryType": "電",
    "secondaryType": null,
    "color": "#F59E0B",
    "icon": "⚡",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/100.png",
    "localImage": "assets/pokemon/gen1/100.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png",
    "zhuyin": "ㄆㄧ ㄌㄧˋ ㄉㄧㄢˋ ㄑㄧㄡˊ",
    "evolution": {
      "reqLevel": 30,
      "evolvesToId": 101,
      "evolvesToName": "頑皮雷彈"
    },
    "move": "十萬伏特",
    "desc": "全國圖鑑 No.100，來自關都地區的經典寶可夢！屬性為【電】。"
  },
  {
    "id": 101,
    "dexNo": "#101",
    "name": "頑皮雷彈",
    "jpName": "マルマイン",
    "enName": "Electrode",
    "types": [
      "電"
    ],
    "primaryType": "電",
    "secondaryType": null,
    "color": "#F59E0B",
    "icon": "⚡",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/101.png",
    "localImage": "assets/pokemon/gen1/101.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/101.png",
    "zhuyin": "ㄨㄢˊ ㄆㄧˊ ㄌㄟˊ ㄉㄢˋ",
    "evolution": null,
    "move": "打雷",
    "desc": "全國圖鑑 No.101，來自關都地區的經典寶可夢！屬性為【電】。"
  },
  {
    "id": 102,
    "dexNo": "#102",
    "name": "蛋蛋",
    "jpName": "タマタマ",
    "enName": "Exeggcute",
    "types": [
      "草",
      "超能力"
    ],
    "primaryType": "草",
    "secondaryType": "超能力",
    "color": "#10B981",
    "icon": "🌿",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/102.png",
    "localImage": "assets/pokemon/gen1/102.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/102.png",
    "zhuyin": "ㄉㄢˋ ㄉㄢˋ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 103,
      "evolvesToName": "椰蛋樹"
    },
    "move": "種子炸彈",
    "desc": "全國圖鑑 No.102，來自關都地區的經典寶可夢！屬性為【草/超能力】。"
  },
  {
    "id": 103,
    "dexNo": "#103",
    "name": "椰蛋樹",
    "jpName": "ナッシー",
    "enName": "Exeggutor",
    "types": [
      "草",
      "超能力"
    ],
    "primaryType": "草",
    "secondaryType": "超能力",
    "color": "#10B981",
    "icon": "🌿",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/103.png",
    "localImage": "assets/pokemon/gen1/103.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png",
    "zhuyin": "ㄧㄝ ㄉㄢˋ ㄕㄨˋ",
    "evolution": null,
    "move": "日光束",
    "desc": "全國圖鑑 No.103，來自關都地區的經典寶可夢！屬性為【草/超能力】。"
  },
  {
    "id": 104,
    "dexNo": "#104",
    "name": "卡拉卡拉",
    "jpName": "カラカラ",
    "enName": "Cubone",
    "types": [
      "地面"
    ],
    "primaryType": "地面",
    "secondaryType": null,
    "color": "#D97706",
    "icon": "🏜️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/104.png",
    "localImage": "assets/pokemon/gen1/104.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/104.png",
    "zhuyin": "ㄎㄚˇ ㄌㄚ ㄎㄚˇ ㄌㄚ",
    "evolution": {
      "reqLevel": 28,
      "evolvesToId": 105,
      "evolvesToName": "嘎啦嘎啦"
    },
    "move": "骨頭回力鏢",
    "desc": "全國圖鑑 No.104，來自關都地區的經典寶可夢！屬性為【地面】。"
  },
  {
    "id": 105,
    "dexNo": "#105",
    "name": "嘎啦嘎啦",
    "jpName": "ガラガラ",
    "enName": "Marowak",
    "types": [
      "地面"
    ],
    "primaryType": "地面",
    "secondaryType": null,
    "color": "#D97706",
    "icon": "🏜️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/105.png",
    "localImage": "assets/pokemon/gen1/105.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/105.png",
    "zhuyin": "ㄍㄚ  ㄍㄚ ",
    "evolution": null,
    "move": "擲泥",
    "desc": "全國圖鑑 No.105，來自關都地區的經典寶可夢！屬性為【地面】。"
  },
  {
    "id": 106,
    "dexNo": "#106",
    "name": "飛腿郎",
    "jpName": "サワムラー",
    "enName": "Hitmonlee",
    "types": [
      "格鬥"
    ],
    "primaryType": "格鬥",
    "secondaryType": null,
    "color": "#B91C1C",
    "icon": "🥊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/106.png",
    "localImage": "assets/pokemon/gen1/106.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png",
    "zhuyin": "ㄈㄟ ㄊㄨㄟˇ ",
    "evolution": null,
    "move": "近身戰",
    "desc": "全國圖鑑 No.106，來自關都地區的經典寶可夢！屬性為【格鬥】。"
  },
  {
    "id": 107,
    "dexNo": "#107",
    "name": "快拳郎",
    "jpName": "エビワラー",
    "enName": "Hitmonchan",
    "types": [
      "格鬥"
    ],
    "primaryType": "格鬥",
    "secondaryType": null,
    "color": "#B91C1C",
    "icon": "🥊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/107.png",
    "localImage": "assets/pokemon/gen1/107.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/107.png",
    "zhuyin": "ㄎㄨㄞˋ ㄑㄩㄢˊ ",
    "evolution": null,
    "move": "十字劈",
    "desc": "全國圖鑑 No.107，來自關都地區的經典寶可夢！屬性為【格鬥】。"
  },
  {
    "id": 108,
    "dexNo": "#108",
    "name": "大舌頭",
    "jpName": "ベロリンガ",
    "enName": "Lickitung",
    "types": [
      "一般"
    ],
    "primaryType": "一般",
    "secondaryType": null,
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/108.png",
    "localImage": "assets/pokemon/gen1/108.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/108.png",
    "zhuyin": "ㄉㄚˋ ㄕㄜˊ ˙ㄊㄡ",
    "evolution": null,
    "move": "破壞光線",
    "desc": "全國圖鑑 No.108，來自關都地區的經典寶可夢！屬性為【一般】。"
  },
  {
    "id": 109,
    "dexNo": "#109",
    "name": "瓦斯彈",
    "jpName": "ドガース",
    "enName": "Koffing",
    "types": [
      "毒"
    ],
    "primaryType": "毒",
    "secondaryType": null,
    "color": "#8B5CF6",
    "icon": "☠️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/109.png",
    "localImage": "assets/pokemon/gen1/109.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/109.png",
    "zhuyin": "ㄨㄚˇ ㄙ ㄉㄢˋ",
    "evolution": {
      "reqLevel": 35,
      "evolvesToId": 110,
      "evolvesToName": "雙彈瓦斯"
    },
    "move": "劇毒",
    "desc": "全國圖鑑 No.109，來自關都地區的經典寶可夢！屬性為【毒】。"
  },
  {
    "id": 110,
    "dexNo": "#110",
    "name": "雙彈瓦斯",
    "jpName": "マタドガス",
    "enName": "Weezing",
    "types": [
      "毒"
    ],
    "primaryType": "毒",
    "secondaryType": null,
    "color": "#8B5CF6",
    "icon": "☠️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/110.png",
    "localImage": "assets/pokemon/gen1/110.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/110.png",
    "zhuyin": "ㄕㄨㄤ ㄉㄢˋ ㄨㄚˇ ㄙ",
    "evolution": null,
    "move": "溶解液",
    "desc": "全國圖鑑 No.110，來自關都地區的經典寶可夢！屬性為【毒】。"
  },
  {
    "id": 111,
    "dexNo": "#111",
    "name": "獨角犀牛",
    "jpName": "サイホーン",
    "enName": "Rhyhorn",
    "types": [
      "地面",
      "岩石"
    ],
    "primaryType": "地面",
    "secondaryType": "岩石",
    "color": "#D97706",
    "icon": "🏜️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/111.png",
    "localImage": "assets/pokemon/gen1/111.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png",
    "zhuyin": "ㄉㄨˊ ㄐㄧㄠˇ ㄒㄧ ㄋㄧㄡˊ",
    "evolution": {
      "reqLevel": 42,
      "evolvesToId": 112,
      "evolvesToName": "鑽角犀獸"
    },
    "move": "重踏",
    "desc": "全國圖鑑 No.111，來自關都地區的經典寶可夢！屬性為【地面/岩石】。"
  },
  {
    "id": 112,
    "dexNo": "#112",
    "name": "鑽角犀獸",
    "jpName": "サイドン",
    "enName": "Rhydon",
    "types": [
      "地面",
      "岩石"
    ],
    "primaryType": "地面",
    "secondaryType": "岩石",
    "color": "#D97706",
    "icon": "🏜️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/112.png",
    "localImage": "assets/pokemon/gen1/112.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png",
    "zhuyin": "ㄗㄨㄢ ㄐㄧㄠˇ ㄒㄧ ㄕㄡˋ",
    "evolution": null,
    "move": "地震",
    "desc": "全國圖鑑 No.112，來自關都地區的經典寶可夢！屬性為【地面/岩石】。"
  },
  {
    "id": 113,
    "dexNo": "#113",
    "name": "吉利蛋",
    "jpName": "ラッキー",
    "enName": "Chansey",
    "types": [
      "一般"
    ],
    "primaryType": "一般",
    "secondaryType": null,
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/113.png",
    "localImage": "assets/pokemon/gen1/113.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/113.png",
    "zhuyin": "ㄐㄧˊ ㄌㄧˋ ㄉㄢˋ",
    "evolution": null,
    "move": "破壞光線",
    "desc": "全國圖鑑 No.113，來自關都地區的經典寶可夢！屬性為【一般】。"
  },
  {
    "id": 114,
    "dexNo": "#114",
    "name": "蔓藤怪",
    "jpName": "モンジャラ",
    "enName": "Tangela",
    "types": [
      "草"
    ],
    "primaryType": "草",
    "secondaryType": null,
    "color": "#10B981",
    "icon": "🌿",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/114.png",
    "localImage": "assets/pokemon/gen1/114.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/114.png",
    "zhuyin": "ㄇㄢˋ ㄊㄥˊ ㄍㄨㄞˋ",
    "evolution": null,
    "move": "瘋狂植物",
    "desc": "全國圖鑑 No.114，來自關都地區的經典寶可夢！屬性為【草】。"
  },
  {
    "id": 115,
    "dexNo": "#115",
    "name": "袋獸",
    "jpName": "ガルーラ",
    "enName": "Kangaskhan",
    "types": [
      "一般"
    ],
    "primaryType": "一般",
    "secondaryType": null,
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/115.png",
    "localImage": "assets/pokemon/gen1/115.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/115.png",
    "zhuyin": "ㄉㄞˋ ㄕㄡˋ",
    "evolution": null,
    "move": "撞擊",
    "desc": "全國圖鑑 No.115，來自關都地區的經典寶可夢！屬性為【一般】。"
  },
  {
    "id": 116,
    "dexNo": "#116",
    "name": "墨海馬",
    "jpName": "タッツー",
    "enName": "Horsea",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/116.png",
    "localImage": "assets/pokemon/gen1/116.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/116.png",
    "zhuyin": "ㄇㄛˋ ㄏㄞˇ ㄇㄚˇ",
    "evolution": {
      "reqLevel": 32,
      "evolvesToId": 117,
      "evolvesToName": "海刺龍"
    },
    "move": "水之波動",
    "desc": "全國圖鑑 No.116，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 117,
    "dexNo": "#117",
    "name": "海刺龍",
    "jpName": "シードラ",
    "enName": "Seadra",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/117.png",
    "localImage": "assets/pokemon/gen1/117.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/117.png",
    "zhuyin": "ㄏㄞˇ ㄘˋ ㄌㄨㄥˊ",
    "evolution": null,
    "move": "水炮",
    "desc": "全國圖鑑 No.117，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 118,
    "dexNo": "#118",
    "name": "角金魚",
    "jpName": "トサキント",
    "enName": "Goldeen",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/118.png",
    "localImage": "assets/pokemon/gen1/118.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/118.png",
    "zhuyin": "ㄐㄧㄠˇ ㄐㄧㄣ ㄩˊ",
    "evolution": {
      "reqLevel": 33,
      "evolvesToId": 119,
      "evolvesToName": "金魚王"
    },
    "move": "加農水炮",
    "desc": "全國圖鑑 No.118，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 119,
    "dexNo": "#119",
    "name": "金魚王",
    "jpName": "アズマオウ",
    "enName": "Seaking",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/119.png",
    "localImage": "assets/pokemon/gen1/119.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/119.png",
    "zhuyin": "ㄐㄧㄣ ㄩˊ ㄨㄤˊ",
    "evolution": null,
    "move": "衝浪",
    "desc": "全國圖鑑 No.119，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 120,
    "dexNo": "#120",
    "name": "海星星",
    "jpName": "ヒトデマン",
    "enName": "Staryu",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/120.png",
    "localImage": "assets/pokemon/gen1/120.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png",
    "zhuyin": "ㄏㄞˇ ㄒㄧㄥ ㄒㄧㄥ",
    "evolution": {
      "reqLevel": 36,
      "evolvesToId": 121,
      "evolvesToName": "寶石海星"
    },
    "move": "水槍",
    "desc": "全國圖鑑 No.120，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 121,
    "dexNo": "#121",
    "name": "寶石海星",
    "jpName": "スターミー",
    "enName": "Starmie",
    "types": [
      "水",
      "超能力"
    ],
    "primaryType": "水",
    "secondaryType": "超能力",
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/121.png",
    "localImage": "assets/pokemon/gen1/121.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png",
    "zhuyin": "ㄅㄠˇ ㄕˊ ㄏㄞˇ ㄒㄧㄥ",
    "evolution": null,
    "move": "水之波動",
    "desc": "全國圖鑑 No.121，來自關都地區的經典寶可夢！屬性為【水/超能力】。"
  },
  {
    "id": 122,
    "dexNo": "#122",
    "name": "魔牆人偶",
    "jpName": "バリヤード",
    "enName": "Mr. Mime",
    "types": [
      "超能力",
      "妖精"
    ],
    "primaryType": "超能力",
    "secondaryType": "妖精",
    "color": "#EC4899",
    "icon": "🔮",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/122.png",
    "localImage": "assets/pokemon/gen1/122.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png",
    "zhuyin": "ㄇㄛˊ ㄑㄧㄤˊ ㄖㄣˊ ㄡˇ",
    "evolution": null,
    "move": "精神強念",
    "desc": "全國圖鑑 No.122，來自關都地區的經典寶可夢！屬性為【超能力/妖精】。"
  },
  {
    "id": 123,
    "dexNo": "#123",
    "name": "飛天螳螂",
    "jpName": "ストライク",
    "enName": "Scyther",
    "types": [
      "蟲",
      "飛行"
    ],
    "primaryType": "蟲",
    "secondaryType": "飛行",
    "color": "#84CC16",
    "icon": "🐛",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/123.png",
    "localImage": "assets/pokemon/gen1/123.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png",
    "zhuyin": "ㄈㄟ  ㄊㄤˊ ㄌㄤˊ",
    "evolution": null,
    "move": "急速折返",
    "desc": "全國圖鑑 No.123，來自關都地區的經典寶可夢！屬性為【蟲/飛行】。"
  },
  {
    "id": 124,
    "dexNo": "#124",
    "name": "迷唇姐",
    "jpName": "ルージュラ",
    "enName": "Jynx",
    "types": [
      "冰",
      "超能力"
    ],
    "primaryType": "冰",
    "secondaryType": "超能力",
    "color": "#06B6D4",
    "icon": "❄️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/124.png",
    "localImage": "assets/pokemon/gen1/124.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png",
    "zhuyin": "ㄇㄧˊ ㄔㄨㄣˊ ㄐㄧㄝˇ",
    "evolution": null,
    "move": "絕對零度",
    "desc": "全國圖鑑 No.124，來自關都地區的經典寶可夢！屬性為【冰/超能力】。"
  },
  {
    "id": 125,
    "dexNo": "#125",
    "name": "電擊獸",
    "jpName": "エレブー",
    "enName": "Electabuzz",
    "types": [
      "電"
    ],
    "primaryType": "電",
    "secondaryType": null,
    "color": "#F59E0B",
    "icon": "⚡",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/125.png",
    "localImage": "assets/pokemon/gen1/125.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/125.png",
    "zhuyin": "ㄉㄧㄢˋ ㄐㄧˊ ㄕㄡˋ",
    "evolution": null,
    "move": "十萬伏特",
    "desc": "全國圖鑑 No.125，來自關都地區的經典寶可夢！屬性為【電】。"
  },
  {
    "id": 126,
    "dexNo": "#126",
    "name": "鴨嘴火獸",
    "jpName": "ブーバー",
    "enName": "Magmar",
    "types": [
      "火"
    ],
    "primaryType": "火",
    "secondaryType": null,
    "color": "#EF4444",
    "icon": "🔥",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/126.png",
    "localImage": "assets/pokemon/gen1/126.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/126.png",
    "zhuyin": "ㄧㄚ ㄗㄨㄟˇ ㄏㄨㄛˇ ㄕㄡˋ",
    "evolution": null,
    "move": "火焰旋渦",
    "desc": "全國圖鑑 No.126，來自關都地區的經典寶可夢！屬性為【火】。"
  },
  {
    "id": 127,
    "dexNo": "#127",
    "name": "凱羅斯",
    "jpName": "カイロス",
    "enName": "Pinsir",
    "types": [
      "蟲"
    ],
    "primaryType": "蟲",
    "secondaryType": null,
    "color": "#84CC16",
    "icon": "🐛",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/127.png",
    "localImage": "assets/pokemon/gen1/127.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/127.png",
    "zhuyin": "ㄎㄞˇ ㄌㄨㄛˊ ㄙ",
    "evolution": null,
    "move": "銀色旋風",
    "desc": "全國圖鑑 No.127，來自關都地區的經典寶可夢！屬性為【蟲】。"
  },
  {
    "id": 128,
    "dexNo": "#128",
    "name": "肯泰羅",
    "jpName": "ケンタロス",
    "enName": "Tauros",
    "types": [
      "一般"
    ],
    "primaryType": "一般",
    "secondaryType": null,
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/128.png",
    "localImage": "assets/pokemon/gen1/128.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/128.png",
    "zhuyin": "ㄎㄣˇ ㄊㄞˋ ㄌㄨㄛˊ",
    "evolution": null,
    "move": "破壞光線",
    "desc": "全國圖鑑 No.128，來自關都地區的經典寶可夢！屬性為【一般】。"
  },
  {
    "id": 129,
    "dexNo": "#129",
    "name": "鯉魚王",
    "jpName": "コイキング",
    "enName": "Magikarp",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/129.png",
    "localImage": "assets/pokemon/gen1/129.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png",
    "zhuyin": "ㄌㄧˇ ㄩˊ ㄨㄤˊ",
    "evolution": {
      "reqLevel": 20,
      "evolvesToId": 130,
      "evolvesToName": "暴鯉龍"
    },
    "move": "衝浪",
    "desc": "全國圖鑑 No.129，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 130,
    "dexNo": "#130",
    "name": "暴鯉龍",
    "jpName": "ギャラドス",
    "enName": "Gyarados",
    "types": [
      "水",
      "飛行"
    ],
    "primaryType": "水",
    "secondaryType": "飛行",
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png",
    "localImage": "assets/pokemon/gen1/130.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png",
    "zhuyin": "ㄅㄠˋ ㄌㄧˇ ㄌㄨㄥˊ",
    "evolution": null,
    "move": "水槍",
    "desc": "全國圖鑑 No.130，來自關都地區的經典寶可夢！屬性為【水/飛行】。"
  },
  {
    "id": 131,
    "dexNo": "#131",
    "name": "拉普拉斯",
    "jpName": "ラプラス",
    "enName": "Lapras",
    "types": [
      "水",
      "冰"
    ],
    "primaryType": "水",
    "secondaryType": "冰",
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png",
    "localImage": "assets/pokemon/gen1/131.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png",
    "zhuyin": "ㄌㄚ ㄆㄨˇ ㄌㄚ ㄙ",
    "evolution": null,
    "move": "水之波動",
    "desc": "全國圖鑑 No.131，來自關都地區的經典寶可夢！屬性為【水/冰】。"
  },
  {
    "id": 132,
    "dexNo": "#132",
    "name": "百變怪",
    "jpName": "メタモン",
    "enName": "Ditto",
    "types": [
      "一般"
    ],
    "primaryType": "一般",
    "secondaryType": null,
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png",
    "localImage": "assets/pokemon/gen1/132.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
    "zhuyin": "ㄅㄞˇ ㄅㄧㄢˋ ㄍㄨㄞˋ",
    "evolution": null,
    "move": "劈開",
    "desc": "全國圖鑑 No.132，來自關都地區的經典寶可夢！屬性為【一般】。"
  },
  {
    "id": 133,
    "dexNo": "#133",
    "name": "伊布",
    "jpName": "イーブイ",
    "enName": "Eevee",
    "types": [
      "一般"
    ],
    "primaryType": "一般",
    "secondaryType": null,
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
    "localImage": "assets/pokemon/gen1/133.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
    "zhuyin": "ㄧ ㄅㄨˋ",
    "evolution": {
      "reqLevel": 16,
      "evolvesToId": 134,
      "evolvesToName": "水伊布"
    },
    "move": "破壞光線",
    "desc": "全國圖鑑 No.133，來自關都地區的經典寶可夢！屬性為【一般】。"
  },
  {
    "id": 134,
    "dexNo": "#134",
    "name": "水伊布",
    "jpName": "シャワーズ",
    "enName": "Vaporeon",
    "types": [
      "水"
    ],
    "primaryType": "水",
    "secondaryType": null,
    "color": "#3B82F6",
    "icon": "🌊",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png",
    "localImage": "assets/pokemon/gen1/134.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png",
    "zhuyin": "ㄕㄨㄟˇ ㄧ ㄅㄨˋ",
    "evolution": null,
    "move": "衝浪",
    "desc": "全國圖鑑 No.134，來自關都地區的經典寶可夢！屬性為【水】。"
  },
  {
    "id": 135,
    "dexNo": "#135",
    "name": "雷伊布",
    "jpName": "サンダース",
    "enName": "Jolteon",
    "types": [
      "電"
    ],
    "primaryType": "電",
    "secondaryType": null,
    "color": "#F59E0B",
    "icon": "⚡",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png",
    "localImage": "assets/pokemon/gen1/135.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png",
    "zhuyin": "ㄌㄟˊ ㄧ ㄅㄨˋ",
    "evolution": null,
    "move": "十萬伏特",
    "desc": "全國圖鑑 No.135，來自關都地區的經典寶可夢！屬性為【電】。"
  },
  {
    "id": 136,
    "dexNo": "#136",
    "name": "火伊布",
    "jpName": "ブースター",
    "enName": "Flareon",
    "types": [
      "火"
    ],
    "primaryType": "火",
    "secondaryType": null,
    "color": "#EF4444",
    "icon": "🔥",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png",
    "localImage": "assets/pokemon/gen1/136.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png",
    "zhuyin": "ㄏㄨㄛˇ ㄧ ㄅㄨˋ",
    "evolution": null,
    "move": "火焰旋渦",
    "desc": "全國圖鑑 No.136，來自關都地區的經典寶可夢！屬性為【火】。"
  },
  {
    "id": 137,
    "dexNo": "#137",
    "name": "多邊獸",
    "jpName": "ポリゴン",
    "enName": "Porygon",
    "types": [
      "一般"
    ],
    "primaryType": "一般",
    "secondaryType": null,
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png",
    "localImage": "assets/pokemon/gen1/137.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/137.png",
    "zhuyin": "ㄉㄨㄛ ㄅㄧㄢ ㄕㄡˋ",
    "evolution": null,
    "move": "劈開",
    "desc": "全國圖鑑 No.137，來自關都地區的經典寶可夢！屬性為【一般】。"
  },
  {
    "id": 138,
    "dexNo": "#138",
    "name": "菊石獸",
    "jpName": "オムナイト",
    "enName": "Omanyte",
    "types": [
      "岩石",
      "水"
    ],
    "primaryType": "岩石",
    "secondaryType": "水",
    "color": "#78716C",
    "icon": "🪨",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/138.png",
    "localImage": "assets/pokemon/gen1/138.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/138.png",
    "zhuyin": "ㄐㄩˊ ㄕˊ ㄕㄡˋ",
    "evolution": {
      "reqLevel": 40,
      "evolvesToId": 139,
      "evolvesToName": "多刺菊石獸"
    },
    "move": "尖石攻擊",
    "desc": "全國圖鑑 No.138，來自關都地區的經典寶可夢！屬性為【岩石/水】。"
  },
  {
    "id": 139,
    "dexNo": "#139",
    "name": "多刺菊石獸",
    "jpName": "オムスター",
    "enName": "Omastar",
    "types": [
      "岩石",
      "水"
    ],
    "primaryType": "岩石",
    "secondaryType": "水",
    "color": "#78716C",
    "icon": "🪨",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/139.png",
    "localImage": "assets/pokemon/gen1/139.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
    "zhuyin": "ㄉㄨㄛ ㄘˋ ㄐㄩˊ ㄕˊ ㄕㄡˋ",
    "evolution": null,
    "move": "原始之力",
    "desc": "全國圖鑑 No.139，來自關都地區的經典寶可夢！屬性為【岩石/水】。"
  },
  {
    "id": 140,
    "dexNo": "#140",
    "name": "化石盔",
    "jpName": "カブト",
    "enName": "Kabuto",
    "types": [
      "岩石",
      "水"
    ],
    "primaryType": "岩石",
    "secondaryType": "水",
    "color": "#78716C",
    "icon": "🪨",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/140.png",
    "localImage": "assets/pokemon/gen1/140.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/140.png",
    "zhuyin": "ㄏㄨㄚˋ ㄕˊ ",
    "evolution": {
      "reqLevel": 40,
      "evolvesToId": 141,
      "evolvesToName": "鐮刀盔"
    },
    "move": "落石",
    "desc": "全國圖鑑 No.140，來自關都地區的經典寶可夢！屬性為【岩石/水】。"
  },
  {
    "id": 141,
    "dexNo": "#141",
    "name": "鐮刀盔",
    "jpName": "カブトプス",
    "enName": "Kabutops",
    "types": [
      "岩石",
      "水"
    ],
    "primaryType": "岩石",
    "secondaryType": "水",
    "color": "#78716C",
    "icon": "🪨",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/141.png",
    "localImage": "assets/pokemon/gen1/141.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/141.png",
    "zhuyin": "ㄌㄧㄢˊ ㄉㄠ ",
    "evolution": null,
    "move": "岩石封鎖",
    "desc": "全國圖鑑 No.141，來自關都地區的經典寶可夢！屬性為【岩石/水】。"
  },
  {
    "id": 142,
    "dexNo": "#142",
    "name": "化石翼龍",
    "jpName": "プテラ",
    "enName": "Aerodactyl",
    "types": [
      "岩石",
      "飛行"
    ],
    "primaryType": "岩石",
    "secondaryType": "飛行",
    "color": "#78716C",
    "icon": "🪨",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/142.png",
    "localImage": "assets/pokemon/gen1/142.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/142.png",
    "zhuyin": "ㄏㄨㄚˋ ㄕˊ ㄧˋ ㄌㄨㄥˊ",
    "evolution": null,
    "move": "岩崩",
    "desc": "全國圖鑑 No.142，來自關都地區的經典寶可夢！屬性為【岩石/飛行】。"
  },
  {
    "id": 143,
    "dexNo": "#143",
    "name": "卡比獸",
    "jpName": "カビゴン",
    "enName": "Snorlax",
    "types": [
      "一般"
    ],
    "primaryType": "一般",
    "secondaryType": null,
    "color": "#94A3B8",
    "icon": "⚪",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png",
    "localImage": "assets/pokemon/gen1/143.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png",
    "zhuyin": "ㄎㄚˇ ㄅㄧˇ ㄕㄡˋ",
    "evolution": null,
    "move": "破壞光線",
    "desc": "全國圖鑑 No.143，來自關都地區的經典寶可夢！屬性為【一般】。"
  },
  {
    "id": 144,
    "dexNo": "#144",
    "name": "急凍鳥",
    "jpName": "フリーザー",
    "enName": "Articuno",
    "types": [
      "冰",
      "飛行"
    ],
    "primaryType": "冰",
    "secondaryType": "飛行",
    "color": "#06B6D4",
    "icon": "❄️",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png",
    "localImage": "assets/pokemon/gen1/144.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png",
    "zhuyin": "ㄐㄧˊ ㄉㄨㄥˋ ㄋㄧㄠˇ",
    "evolution": null,
    "move": "絕對零度",
    "desc": "全國圖鑑 No.144，來自關都地區的經典寶可夢！屬性為【冰/飛行】。"
  },
  {
    "id": 145,
    "dexNo": "#145",
    "name": "閃電鳥",
    "jpName": "サンダー",
    "enName": "Zapdos",
    "types": [
      "電",
      "飛行"
    ],
    "primaryType": "電",
    "secondaryType": "飛行",
    "color": "#F59E0B",
    "icon": "⚡",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png",
    "localImage": "assets/pokemon/gen1/145.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png",
    "zhuyin": "ㄕㄢˇ ㄉㄧㄢˋ ㄋㄧㄠˇ",
    "evolution": null,
    "move": "十萬伏特",
    "desc": "全國圖鑑 No.145，來自關都地區的經典寶可夢！屬性為【電/飛行】。"
  },
  {
    "id": 146,
    "dexNo": "#146",
    "name": "火焰鳥",
    "jpName": "ファイヤー",
    "enName": "Moltres",
    "types": [
      "火",
      "飛行"
    ],
    "primaryType": "火",
    "secondaryType": "飛行",
    "color": "#EF4444",
    "icon": "🔥",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/146.png",
    "localImage": "assets/pokemon/gen1/146.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png",
    "zhuyin": "ㄏㄨㄛˇ ㄧㄢˋ ㄋㄧㄠˇ",
    "evolution": null,
    "move": "火焰旋渦",
    "desc": "全國圖鑑 No.146，來自關都地區的經典寶可夢！屬性為【火/飛行】。"
  },
  {
    "id": 147,
    "dexNo": "#147",
    "name": "迷你龍",
    "jpName": "ミニリュウ",
    "enName": "Dratini",
    "types": [
      "龍"
    ],
    "primaryType": "龍",
    "secondaryType": null,
    "color": "#4F46E5",
    "icon": "🐉",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/147.png",
    "localImage": "assets/pokemon/gen1/147.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png",
    "zhuyin": "ㄇㄧˊ  ㄌㄨㄥˊ",
    "evolution": {
      "reqLevel": 30,
      "evolvesToId": 148,
      "evolvesToName": "哈克龍"
    },
    "move": "逆鱗",
    "desc": "全國圖鑑 No.147，來自關都地區的經典寶可夢！屬性為【龍】。"
  },
  {
    "id": 148,
    "dexNo": "#148",
    "name": "哈克龍",
    "jpName": "ハクリュー",
    "enName": "Dragonair",
    "types": [
      "龍"
    ],
    "primaryType": "龍",
    "secondaryType": null,
    "color": "#4F46E5",
    "icon": "🐉",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/148.png",
    "localImage": "assets/pokemon/gen1/148.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png",
    "zhuyin": "ㄏㄚ ㄎㄜˋ ㄌㄨㄥˊ",
    "evolution": {
      "reqLevel": 55,
      "evolvesToId": 149,
      "evolvesToName": "快龍"
    },
    "move": "龍之俯衝",
    "desc": "全國圖鑑 No.148，來自關都地區的經典寶可夢！屬性為【龍】。"
  },
  {
    "id": 149,
    "dexNo": "#149",
    "name": "快龍",
    "jpName": "カイリュー",
    "enName": "Dragonite",
    "types": [
      "龍",
      "飛行"
    ],
    "primaryType": "龍",
    "secondaryType": "飛行",
    "color": "#4F46E5",
    "icon": "🐉",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
    "localImage": "assets/pokemon/gen1/149.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
    "zhuyin": "ㄎㄨㄞˋ ㄌㄨㄥˊ",
    "evolution": null,
    "move": "天龍流星",
    "desc": "全國圖鑑 No.149，來自關都地區的經典寶可夢！屬性為【龍/飛行】。"
  },
  {
    "id": 150,
    "dexNo": "#150",
    "name": "超夢",
    "jpName": "ミュウツー",
    "enName": "Mewtwo",
    "types": [
      "超能力"
    ],
    "primaryType": "超能力",
    "secondaryType": null,
    "color": "#EC4899",
    "icon": "🔮",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    "localImage": "assets/pokemon/gen1/150.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
    "zhuyin": "ㄔㄠ ㄇㄥˋ",
    "evolution": null,
    "move": "念力",
    "desc": "全國圖鑑 No.150，來自關都地區的經典寶可夢！屬性為【超能力】。"
  },
  {
    "id": 151,
    "dexNo": "#151",
    "name": "夢幻",
    "jpName": "ミュウ",
    "enName": "Mew",
    "types": [
      "超能力"
    ],
    "primaryType": "超能力",
    "secondaryType": null,
    "color": "#EC4899",
    "icon": "🔮",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
    "localImage": "assets/pokemon/gen1/151.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
    "zhuyin": "ㄇㄥˋ ㄏㄨㄢˋ",
    "evolution": null,
    "move": "幻象光線",
    "desc": "全國圖鑑 No.151，來自關都地區的經典寶可夢！屬性為【超能力】。"
  }
];

if (typeof window !== 'undefined') {
  window.GEN1_POKEMON_LIST = GEN1_POKEMON_LIST;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GEN1_POKEMON_LIST;
}
