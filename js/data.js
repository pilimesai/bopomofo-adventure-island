/**
 * 台灣教育部小一國語注音符號資料庫
 * 包含37個注音符號的完整定義、發音特徵、聲調規則、結合韻與闖關關卡題庫
 */

const ZHUYIN_DATA = {
  "symbols": [
    {
      "char": "ㄅ",
      "pinyin": "b",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "斑馬爆爆獸",
      "pokeType": "電氣系",
      "pokeTypeIcon": "⚡",
      "dexNo": "No.001",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫折，二筆橫"
      ],
      "mnemonic": "ㄅ像收音機，天線豎起來 ㄅㄅㄅ",
      "word": "斑馬",
      "wordZhuyin": "ㄅㄢ ㄇㄚˇ",
      "icon": "🦓",
      "color": "#FF6B6B",
      "examples": [
        {
          "word": "斑馬",
          "zhuyin": "ㄅㄢ ㄇㄚˇ",
          "icon": "🦓"
        },
        {
          "word": "爸爸",
          "zhuyin": "ㄅㄚˋ ˙ㄅㄚ",
          "icon": "👨"
        },
        {
          "word": "芭樂",
          "zhuyin": "ㄅㄚ ㄌㄜˋ",
          "icon": "🍐"
        }
      ]
    },
    {
      "char": "ㄆ",
      "pinyin": "p",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "泡泡噴水豚",
      "pokeType": "水系",
      "pokeTypeIcon": "💧",
      "dexNo": "No.002",
      "strokes": 2,
      "strokeGuide": [
        "一筆斜撇，二筆橫撇鉤"
      ],
      "mnemonic": "ㄆ像小水盆，潑水嘩啦啦 ㄆㄆㄆ",
      "word": "蘋果",
      "wordZhuyin": "ㄆㄧㄥˊ ㄍㄨㄛˇ",
      "icon": "🍎",
      "color": "#FF8787",
      "examples": [
        {
          "word": "蘋果",
          "zhuyin": "ㄆㄧㄥˊ ㄍㄨㄛˇ",
          "icon": "🍎"
        },
        {
          "word": "葡萄",
          "zhuyin": "ㄆㄨˊ ㄊㄠˊ",
          "icon": "🍇"
        },
        {
          "word": "朋友",
          "zhuyin": "ㄆㄥˊ ㄧㄡˇ",
          "icon": "👫"
        }
      ]
    },
    {
      "char": "ㄇ",
      "pinyin": "m",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "草叢喵喵怪",
      "pokeType": "草系",
      "pokeTypeIcon": "🍃",
      "dexNo": "No.003",
      "strokes": 2,
      "strokeGuide": [
        "一筆豎，二筆橫折"
      ],
      "mnemonic": "ㄇ像小山洞，鑽進山洞裡 ㄇㄇㄇ",
      "word": "貓咪",
      "wordZhuyin": "ㄇㄠ ㄇㄧ",
      "icon": "🐱",
      "color": "#FFA94D",
      "examples": [
        {
          "word": "貓咪",
          "zhuyin": "ㄇㄠ ㄇㄧ",
          "icon": "🐱"
        },
        {
          "word": "帽子",
          "zhuyin": "ㄇㄠˋ ˙ㄗ",
          "icon": "🧢"
        },
        {
          "word": "蜜蜂",
          "zhuyin": "ㄇㄧˋ ㄈㄥ",
          "icon": "🐝"
        }
      ]
    },
    {
      "char": "ㄈ",
      "pinyin": "f",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "烈風飛天雀",
      "pokeType": "飛行系",
      "pokeTypeIcon": "🌪️",
      "dexNo": "No.004",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫，二筆斜撇鉤"
      ],
      "mnemonic": "ㄈ像一把拐杖，老爺爺走路 ㄈㄈㄈ",
      "word": "飛機",
      "wordZhuyin": "ㄈㄟ ㄐㄧ",
      "icon": "✈️",
      "color": "#FFD43B",
      "examples": [
        {
          "word": "飛機",
          "zhuyin": "ㄈㄟ ㄐㄧ",
          "icon": "✈️"
        },
        {
          "word": "風箏",
          "zhuyin": "ㄈㄥ ㄓㄥ",
          "icon": "🪁"
        },
        {
          "word": "帆船",
          "zhuyin": "ㄈㄢˊ ㄔㄨㄢˊ",
          "icon": "⛵"
        }
      ]
    },
    {
      "char": "ㄉ",
      "pinyin": "d",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "撼地巨石象",
      "pokeType": "地面系",
      "pokeTypeIcon": "🏔️",
      "dexNo": "No.005",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫折，二筆橫"
      ],
      "mnemonic": "ㄉ像小馬蹄，得得得往前跑 ㄉㄉㄉ",
      "word": "大象",
      "wordZhuyin": "ㄉㄚˋ ㄒㄧㄤˋ",
      "icon": "🐘",
      "color": "#69DB7C",
      "examples": [
        {
          "word": "大象",
          "zhuyin": "ㄉㄚˋ ㄒㄧㄤˋ",
          "icon": "🐘"
        },
        {
          "word": "豆漿",
          "zhuyin": "ㄉㄡˋ ㄐㄧㄤ",
          "icon": "🥛"
        },
        {
          "word": "袋鼠",
          "zhuyin": "ㄉㄞˋ ㄕㄨˇ",
          "icon": "🦘"
        }
      ]
    },
    {
      "char": "ㄊ",
      "pinyin": "t",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "跳跳活力兔",
      "pokeType": "一般系",
      "pokeTypeIcon": "⭐",
      "dexNo": "No.006",
      "strokes": 3,
      "strokeGuide": [
        "一筆橫，二筆豎，三筆橫"
      ],
      "mnemonic": "ㄊ像一把小雨傘，下雨不怕淋 ㄊㄊㄊ",
      "word": "太陽",
      "wordZhuyin": "ㄊㄞˋ ㄧㄤˊ",
      "icon": "☀️",
      "color": "#38D9A9",
      "examples": [
        {
          "word": "太陽",
          "zhuyin": "ㄊㄞˋ ㄧㄤˊ",
          "icon": "☀️"
        },
        {
          "word": "兔子",
          "zhuyin": "ㄊㄨˋ ˙ㄗ",
          "icon": "🐰"
        },
        {
          "word": "糖果",
          "zhuyin": "ㄊㄤˊ ㄍㄨㄛˇ",
          "icon": "🍬"
        }
      ]
    },
    {
      "char": "ㄋ",
      "pinyin": "n",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "暖暖大角牛",
      "pokeType": "草系",
      "pokeTypeIcon": "🍃",
      "dexNo": "No.007",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫折折，二筆撇"
      ],
      "mnemonic": "ㄋ像一尊小泥人，捏一捏真可愛 ㄋㄋㄋ",
      "word": "牛奶",
      "wordZhuyin": "ㄋㄧㄡˊ ㄋㄞˇ",
      "icon": "🥛",
      "color": "#4DABF7",
      "examples": [
        {
          "word": "牛奶",
          "zhuyin": "ㄋㄧㄡˊ ㄋㄞˇ",
          "icon": "🥛"
        },
        {
          "word": "鳥兒",
          "zhuyin": "ㄋㄧㄠˇ ㄦˊ",
          "icon": "🐦"
        },
        {
          "word": "泥土",
          "zhuyin": "ㄋㄧˊ ㄊㄨˇ",
          "icon": "🌱"
        }
      ]
    },
    {
      "char": "ㄌ",
      "pinyin": "l",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "烈焰鈴鐺虎",
      "pokeType": "火系",
      "pokeTypeIcon": "🔥",
      "dexNo": "No.008",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫折，二筆撇折"
      ],
      "mnemonic": "ㄌ像掛著的小鈴鐺，丁零噹啷響 ㄌㄌㄌ",
      "word": "鈴鐺",
      "wordZhuyin": "ㄌㄧㄥˊ ㄉㄤ",
      "icon": "🔔",
      "color": "#748FFC",
      "examples": [
        {
          "word": "鈴鐺",
          "zhuyin": "ㄌㄧㄥˊ ㄉㄤ",
          "icon": "🔔"
        },
        {
          "word": "老虎",
          "zhuyin": "ㄌㄠˇ ㄏㄨˇ",
          "icon": "🐯"
        },
        {
          "word": "蘿蔔",
          "zhuyin": "ㄌㄨㄛˊ ˙ㄅㄛ",
          "icon": "🥕"
        }
      ]
    },
    {
      "char": "ㄍ",
      "pinyin": "g",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "哥吉火恐龍",
      "pokeType": "龍系",
      "pokeTypeIcon": "🐉",
      "dexNo": "No.009",
      "strokes": 2,
      "strokeGuide": [
        "一筆撇折，二筆豎"
      ],
      "mnemonic": "ㄍ像大哥哥，高高瘦瘦的大哥哥 ㄍㄍㄍ",
      "word": "鴿子",
      "wordZhuyin": "ㄍㄜ ˙ㄗ",
      "icon": "🕊️",
      "color": "#9775FA",
      "examples": [
        {
          "word": "鴿子",
          "zhuyin": "ㄍㄜ ˙ㄗ",
          "icon": "🕊️"
        },
        {
          "word": "西瓜",
          "zhuyin": "ㄒㄧ ㄍㄨㄚ",
          "icon": "🍉"
        },
        {
          "word": "鋼琴",
          "zhuyin": "ㄍㄤ ㄑㄧㄣˊ",
          "icon": "🎹"
        }
      ]
    },
    {
      "char": "ㄎ",
      "pinyin": "k",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "蝌蚪水精靈",
      "pokeType": "水系",
      "pokeTypeIcon": "💧",
      "dexNo": "No.010",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫，二筆豎折"
      ],
      "mnemonic": "ㄎ像一張開口笑，哈哈大笑真開心 ㄎㄎㄎ",
      "word": "恐龍",
      "wordZhuyin": "ㄎㄨㄥˇ ㄌㄨㄥˊ",
      "icon": "🦖",
      "color": "#F06595",
      "examples": [
        {
          "word": "恐龍",
          "zhuyin": "ㄎㄨㄥˇ ㄌㄨㄥˊ",
          "icon": "🦖"
        },
        {
          "word": "蝌蚪",
          "zhuyin": "ㄎㄜ ㄉㄡˇ",
          "icon": "🐸"
        },
        {
          "word": "口罩",
          "zhuyin": "ㄎㄡˇ ㄓㄠˋ",
          "icon": "😷"
        }
      ]
    },
    {
      "char": "ㄏ",
      "pinyin": "h",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "金剛火拳猴",
      "pokeType": "格鬥系",
      "pokeTypeIcon": "🥊",
      "dexNo": "No.011",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫，二筆撇"
      ],
      "mnemonic": "ㄏ像懸崖邊的小亭子，風景美如畫 ㄏㄏㄏ",
      "word": "花朵",
      "wordZhuyin": "ㄏㄨㄚ ㄉㄨㄛˇ",
      "icon": "🌸",
      "color": "#FF6B6B",
      "examples": [
        {
          "word": "花朵",
          "zhuyin": "ㄏㄨㄚ ㄉㄨㄛˇ",
          "icon": "🌸"
        },
        {
          "word": "海豚",
          "zhuyin": "ㄏㄞˇ ㄊㄨㄣˊ",
          "icon": "🐬"
        },
        {
          "word": "蝴蝶",
          "zhuyin": "ㄏㄨˊ ㄉㄧㄝˊ",
          "icon": "🦋"
        }
      ]
    },
    {
      "char": "ㄐ",
      "pinyin": "j",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "尖角金冠雞",
      "pokeType": "飛行系",
      "pokeTypeIcon": "🌪️",
      "dexNo": "No.012",
      "strokes": 3,
      "strokeGuide": [
        "一筆撇折，二筆豎，三筆橫"
      ],
      "mnemonic": "ㄐ像小母雞，嘰嘰喳喳叫 ㄐㄐㄐ",
      "word": "機器人",
      "wordZhuyin": "ㄐㄧ ㄑㄧˋ ㄖㄣˊ",
      "icon": "🤖",
      "color": "#FF922B",
      "examples": [
        {
          "word": "機器人",
          "zhuyin": "ㄐㄧ ㄑㄧˋ ㄖㄣˊ",
          "icon": "🤖"
        },
        {
          "word": "小雞",
          "zhuyin": "ㄒㄧㄠˇ ㄐㄧ",
          "icon": "🐥"
        },
        {
          "word": "積木",
          "zhuyin": "ㄐㄧ ㄇㄨˋ",
          "icon": "🧱"
        }
      ]
    },
    {
      "char": "ㄑ",
      "pinyin": "q",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "七彩水母怪",
      "pokeType": "水系",
      "pokeTypeIcon": "💧",
      "dexNo": "No.013",
      "strokes": 1,
      "strokeGuide": [
        "一筆橫折橫折彎鉤"
      ],
      "mnemonic": "ㄑ像紅旗飄飄，迎風招展 ㄑㄑㄑ",
      "word": "汽車",
      "wordZhuyin": "ㄑㄧˋ ㄔㄜ",
      "icon": "🚗",
      "color": "#FCC419",
      "examples": [
        {
          "word": "汽車",
          "zhuyin": "ㄑㄧˋ ㄔㄜ",
          "icon": "🚗"
        },
        {
          "word": "企鵝",
          "zhuyin": "ㄑㄧˋ ㄜˊ",
          "icon": "🐧"
        },
        {
          "word": "青蛙",
          "zhuyin": "ㄑㄧㄥ ㄨㄚ",
          "icon": "🐸"
        }
      ]
    },
    {
      "char": "ㄒ",
      "pinyin": "x",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "西瓜冰霜龜",
      "pokeType": "冰系",
      "pokeTypeIcon": "❄️",
      "dexNo": "No.014",
      "strokes": 3,
      "strokeGuide": [
        "一筆橫，二筆撇，三筆豎折"
      ],
      "mnemonic": "ㄒ像小西瓜，切開一牙牙 ㄒㄒㄒ",
      "word": "西瓜",
      "wordZhuyin": "ㄒㄧ ㄍㄨㄚ",
      "icon": "🍉",
      "color": "#20C997",
      "examples": [
        {
          "word": "西瓜",
          "zhuyin": "ㄒㄧ ㄍㄨㄚ",
          "icon": "🍉"
        },
        {
          "word": "香蕉",
          "zhuyin": "ㄒㄧㄤ ㄐㄧㄠ",
          "icon": "🍌"
        },
        {
          "word": "小狗",
          "zhuyin": "ㄒㄧㄠˇ ㄍㄡˇ",
          "icon": "🐶"
        }
      ]
    },
    {
      "char": "ㄓ",
      "pinyin": "zh",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "織網彩紋蛛",
      "pokeType": "蟲系",
      "pokeTypeIcon": "🐛",
      "dexNo": "No.015",
      "strokes": 4,
      "strokeGuide": [
        "一筆點，二筆橫，三筆撇，四筆豎折"
      ],
      "mnemonic": "ㄓ像小蜘蛛，吐絲織網忙 ㄓㄓㄓ",
      "word": "蜘蛛",
      "wordZhuyin": "ㄓ ㄓㄨ",
      "icon": "🕷️",
      "color": "#339AF0",
      "examples": [
        {
          "word": "蜘蛛",
          "zhuyin": "ㄓ ㄓㄨ",
          "icon": "🕷️"
        },
        {
          "word": "珍珠",
          "zhuyin": "ㄓㄣ ㄓㄨ",
          "icon": "🦪"
        },
        {
          "word": "指針",
          "zhuyin": "ㄓˇ ㄓㄣ",
          "icon": "🧭"
        }
      ]
    },
    {
      "char": "ㄔ",
      "pinyin": "ch",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "鋼甲穿山獸",
      "pokeType": "鋼系",
      "pokeTypeIcon": "⚙️",
      "dexNo": "No.016",
      "strokes": 3,
      "strokeGuide": [
        "一筆撇，二筆撇，三筆豎"
      ],
      "mnemonic": "ㄔ像小湯匙，吃飽飯長高高 ㄔㄔㄔ",
      "word": "火車",
      "wordZhuyin": "ㄏㄨㄛˇ ㄔㄜ",
      "icon": "🚂",
      "color": "#5C7CFA",
      "examples": [
        {
          "word": "火車",
          "zhuyin": "ㄏㄨㄛˇ ㄔㄜ",
          "icon": "🚂"
        },
        {
          "word": "城堡",
          "zhuyin": "ㄔㄥˊ ㄅㄠˇ",
          "icon": "🏰"
        },
        {
          "word": "直尺",
          "zhuyin": "ㄓˊ ㄔˇ",
          "icon": "📏"
        }
      ]
    },
    {
      "char": "ㄕ",
      "pinyin": "sh",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "獅王烈火獸",
      "pokeType": "火系",
      "pokeTypeIcon": "🔥",
      "dexNo": "No.017",
      "strokes": 3,
      "strokeGuide": [
        "一筆橫折，二筆橫，三筆撇"
      ],
      "mnemonic": "ㄕ像大獅子，森林大國王 ㄕㄕㄕ",
      "word": "獅子",
      "wordZhuyin": "ㄕ ˙ㄗ",
      "icon": "🦁",
      "color": "#845EF7",
      "examples": [
        {
          "word": "獅子",
          "zhuyin": "ㄕ ˙ㄗ",
          "icon": "🦁"
        },
        {
          "word": "手錶",
          "zhuyin": "ㄕㄡˇ ㄅㄧㄠˇ",
          "icon": "⌚"
        },
        {
          "word": "樹木",
          "zhuyin": "ㄕㄨˋ ㄇㄨˋ",
          "icon": "🌳"
        }
      ]
    },
    {
      "char": "ㄖ",
      "pinyin": "r",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "日光太陽葵",
      "pokeType": "超能系",
      "pokeTypeIcon": "🔮",
      "dexNo": "No.018",
      "strokes": 2,
      "strokeGuide": [
        "一筆豎，二筆橫折豎"
      ],
      "mnemonic": "ㄖ像溫暖紅太陽，日出東方升 ㄖㄖㄖ",
      "word": "日曆",
      "wordZhuyin": "ㄖˋ ㄌㄧˋ",
      "icon": "📅",
      "color": "#CC5DE8",
      "examples": [
        {
          "word": "日曆",
          "zhuyin": "ㄖˋ ㄌㄧˋ",
          "icon": "📅"
        },
        {
          "word": "熱狗",
          "zhuyin": "ㄖㄜˋ ㄍㄡˇ",
          "icon": "🌭"
        },
        {
          "word": "日光",
          "zhuyin": "ㄖˋ ㄍㄨㄤ",
          "icon": "☀️"
        }
      ]
    },
    {
      "char": "ㄗ",
      "pinyin": "z",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "鑽石尖齒鼠",
      "pokeType": "鋼系",
      "pokeTypeIcon": "⚙️",
      "dexNo": "No.019",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫折，二筆提折"
      ],
      "mnemonic": "ㄗ像小鴨子游啊游，平舌輕聲唸 ㄗㄗㄗ",
      "word": "足球",
      "wordZhuyin": "ㄗㄨˊ ㄑㄧㄡˊ",
      "icon": "⚽",
      "color": "#51CF66",
      "examples": [
        {
          "word": "足球",
          "zhuyin": "ㄗㄨˊ ㄑㄧㄡˊ",
          "icon": "⚽"
        },
        {
          "word": "棕熊",
          "zhuyin": "ㄗㄨㄥ ㄒㄩㄥ",
          "icon": "🐻"
        },
        {
          "word": "自己",
          "zhuyin": "ㄗˋ ㄐㄧˇ",
          "icon": "🙋"
        }
      ]
    },
    {
      "char": "ㄘ",
      "pinyin": "c",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "刺刺綠甲蝟",
      "pokeType": "草系",
      "pokeTypeIcon": "🍃",
      "dexNo": "No.020",
      "strokes": 2,
      "strokeGuide": [
        "一筆撇折，二筆提"
      ],
      "mnemonic": "ㄘ像刺蝟滿身刺，碰它一下縮成團 ㄘㄘㄘ",
      "word": "草莓",
      "wordZhuyin": "ㄘㄠˇ ㄇㄟˊ",
      "icon": "🍓",
      "color": "#FF6B6B",
      "examples": [
        {
          "word": "草莓",
          "zhuyin": "ㄘㄠˇ ㄇㄟˊ",
          "icon": "🍓"
        },
        {
          "word": "彩虹",
          "zhuyin": "ㄘㄞˇ ㄏㄨㄥˊ",
          "icon": "🌈"
        },
        {
          "word": "蔥花",
          "zhuyin": "ㄘㄨㄥ ㄏㄨㄚ",
          "icon": "🧅"
        }
      ]
    },
    {
      "char": "ㄙ",
      "pinyin": "s",
      "type": "initial",
      "categoryName": "聲母家族",
      "pokeName": "翠綠竹葉蛇",
      "pokeType": "草系",
      "pokeTypeIcon": "🍃",
      "dexNo": "No.021",
      "strokes": 2,
      "strokeGuide": [
        "一筆撇折，二筆點"
      ],
      "mnemonic": "ㄙ像一條小蠶寶寶，吐出細白絲 ㄙㄙㄙ",
      "word": "森林",
      "wordZhuyin": "ㄙㄣ ㄌㄧㄣˊ",
      "icon": "🌲",
      "color": "#22B8CF",
      "examples": [
        {
          "word": "森林",
          "zhuyin": "ㄙㄣ ㄌㄧㄣˊ",
          "icon": "🌲"
        },
        {
          "word": "絲巾",
          "zhuyin": "ㄙ ㄐㄧㄣ",
          "icon": "🧣"
        },
        {
          "word": "掃把",
          "zhuyin": "ㄙㄠˋ ㄅㄚˇ",
          "icon": "🧹"
        }
      ]
    },
    {
      "char": "ㄧ",
      "pinyin": "i",
      "type": "medial",
      "categoryName": "介音夥伴",
      "pokeName": "雷光金絲雀",
      "pokeType": "電氣系",
      "pokeTypeIcon": "⚡",
      "dexNo": "No.022",
      "strokes": 1,
      "strokeGuide": [
        "一筆橫"
      ],
      "mnemonic": "ㄧ像一根魔術棒，變出好多小星星 ㄧㄧㄧ",
      "word": "衣服",
      "wordZhuyin": "ㄧ ˙ㄈㄨ",
      "icon": "👕",
      "color": "#FAB005",
      "examples": [
        {
          "word": "衣服",
          "zhuyin": "ㄧ ˙ㄈㄨ",
          "icon": "👕"
        },
        {
          "word": "醫生",
          "zhuyin": "ㄧ ㄕㄥ",
          "icon": "👨‍⚕️"
        },
        {
          "word": "影子",
          "zhuyin": "ㄧㄥˇ ˙ㄗ",
          "icon": "👤"
        }
      ]
    },
    {
      "char": "ㄨ",
      "pinyin": "u",
      "type": "medial",
      "categoryName": "介音夥伴",
      "pokeName": "深海烏龜王",
      "pokeType": "水系",
      "pokeTypeIcon": "💧",
      "dexNo": "No.023",
      "strokes": 2,
      "strokeGuide": [
        "一筆撇折，二筆豎"
      ],
      "mnemonic": "ㄨ像烏龜小房子，圓圓屋頂好遮風 ㄨㄨㄨ",
      "word": "烏龜",
      "wordZhuyin": "ㄨ ㄍㄨㄟ",
      "icon": "🐢",
      "color": "#40C057",
      "examples": [
        {
          "word": "烏龜",
          "zhuyin": "ㄨ ㄍㄨㄟ",
          "icon": "🐢"
        },
        {
          "word": "圍巾",
          "zhuyin": "ㄨㄟˊ ㄐㄧㄣ",
          "icon": "🧣"
        },
        {
          "word": "屋頂",
          "zhuyin": "ㄨ ㄉㄧㄥˇ",
          "icon": "🏠"
        }
      ]
    },
    {
      "char": "ㄩ",
      "pinyin": "ü",
      "type": "medial",
      "categoryName": "介音夥伴",
      "pokeName": "雨滴藍水精",
      "pokeType": "水系",
      "pokeTypeIcon": "💧",
      "dexNo": "No.024",
      "strokes": 2,
      "strokeGuide": [
        "一筆豎折折，二筆豎"
      ],
      "mnemonic": "ㄩ像一條小金魚，吐著泡泡游過來 ㄩㄩㄩ",
      "word": "金魚",
      "wordZhuyin": "ㄐㄧㄣ ㄩˊ",
      "icon": "🐟",
      "color": "#15AABF",
      "examples": [
        {
          "word": "金魚",
          "zhuyin": "ㄐㄧㄣ ㄩˊ",
          "icon": "🐟"
        },
        {
          "word": "雨傘",
          "zhuyin": "ㄩˇ ㄙㄢˇ",
          "icon": "☂️"
        },
        {
          "word": "月亮",
          "zhuyin": "ㄩㄝˋ ˙ㄌㄧㄤ",
          "icon": "🌙"
        }
      ]
    },
    {
      "char": "ㄚ",
      "pinyin": "a",
      "type": "final",
      "categoryName": "韻母精靈",
      "pokeName": "呆呆可達鴨",
      "pokeType": "水系",
      "pokeTypeIcon": "💧",
      "dexNo": "No.025",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫，二筆豎折折"
      ],
      "mnemonic": "ㄚ像小鴨呱呱叫，張大嘴巴 ㄚㄚㄚ",
      "word": "鴨子",
      "wordZhuyin": "ㄧㄚ ˙ㄗ",
      "icon": "🦆",
      "color": "#FA5252",
      "examples": [
        {
          "word": "鴨子",
          "zhuyin": "ㄧㄚ ˙ㄗ",
          "icon": "🦆"
        },
        {
          "word": "阿姨",
          "zhuyin": "ㄚ ㄧˊ",
          "icon": "👩"
        },
        {
          "word": "啞鈴",
          "zhuyin": "ㄧㄚˇ ㄌㄧㄥˊ",
          "icon": "🏋️"
        }
      ]
    },
    {
      "char": "ㄛ",
      "pinyin": "o",
      "type": "final",
      "categoryName": "韻母精靈",
      "pokeName": "啼曉朝陽雞",
      "pokeType": "火系",
      "pokeTypeIcon": "🔥",
      "dexNo": "No.026",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫折，二筆豎折撇"
      ],
      "mnemonic": "ㄛ像公雞啼破曉，喔喔喔叫大家起 ㄛㄛㄛ",
      "word": "蝸牛",
      "wordZhuyin": "ㄍㄨㄚ ㄋㄧㄡˊ",
      "icon": "🐌",
      "color": "#E64980",
      "examples": [
        {
          "word": "菠菜",
          "zhuyin": "ㄅㄛ ㄘㄞˋ",
          "icon": "🥬"
        },
        {
          "word": "蘿蔔",
          "zhuyin": "ㄌㄨㄛˊ ˙ㄅㄛ",
          "icon": "🥕"
        },
        {
          "word": "公雞叫",
          "zhuyin": "ㄍㄨㄥ ㄐㄧ ㄐㄧㄠˋ",
          "icon": "🐓"
        }
      ]
    },
    {
      "char": "ㄜ",
      "pinyin": "e",
      "type": "final",
      "categoryName": "韻母精靈",
      "pokeName": "優雅白天鵝",
      "pokeType": "水系",
      "pokeTypeIcon": "💧",
      "dexNo": "No.027",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫折，二筆橫"
      ],
      "mnemonic": "ㄜ像白天鵝遊碧波，美麗脖子彎又彎 ㄜㄜㄜ",
      "word": "白鵝",
      "wordZhuyin": "ㄅㄞˊ ㄜˊ",
      "icon": "🦢",
      "color": "#BE4BDB",
      "examples": [
        {
          "word": "白鵝",
          "zhuyin": "ㄅㄞˊ ㄜˊ",
          "icon": "🦢"
        },
        {
          "word": "鱷魚",
          "zhuyin": "ㄜˋ ㄩˊ",
          "icon": "🐊"
        },
        {
          "word": "肚子餓",
          "zhuyin": "ㄉㄨˋ ˙ㄗ ㄜˋ",
          "icon": "😋"
        }
      ]
    },
    {
      "char": "ㄝ",
      "pinyin": "ê",
      "type": "final",
      "categoryName": "韻母精靈",
      "pokeName": "耶誕林中鹿",
      "pokeType": "草系",
      "pokeTypeIcon": "🍃",
      "dexNo": "No.028",
      "strokes": 3,
      "strokeGuide": [
        "一筆橫折，二筆橫，三筆豎撇"
      ],
      "mnemonic": "ㄝ像飄落的小綠葉，輕輕落在手掌心 ㄝㄝㄝ",
      "word": "樹葉",
      "wordZhuyin": "ㄕㄨˋ ㄧㄝˋ",
      "icon": "🍃",
      "color": "#7950F2",
      "examples": [
        {
          "word": "樹葉",
          "zhuyin": "ㄕㄨˋ ㄧㄝˋ",
          "icon": "🍃"
        },
        {
          "word": "椰子",
          "zhuyin": "ㄧㄝˊ ˙ㄗ",
          "icon": "🥥"
        },
        {
          "word": "爺爺",
          "zhuyin": "ㄧㄝˊ ˙ㄧㄝ",
          "icon": "👴"
        }
      ]
    },
    {
      "char": "ㄞ",
      "pinyin": "ai",
      "type": "final",
      "categoryName": "韻母精靈",
      "pokeName": "白毛念力猴",
      "pokeType": "超能系",
      "pokeTypeIcon": "🔮",
      "dexNo": "No.029",
      "strokes": 3,
      "strokeGuide": [
        "一筆橫，二筆撇，三筆豎撇"
      ],
      "mnemonic": "ㄞ像小女孩綁辮子，乖乖可愛大家愛 ㄞㄞㄞ",
      "word": "愛心",
      "wordZhuyin": "ㄞˋ ㄒㄧㄣ",
      "icon": "❤️",
      "color": "#4C6EF5",
      "examples": [
        {
          "word": "愛心",
          "zhuyin": "ㄞˋ ㄒㄧㄣ",
          "icon": "❤️"
        },
        {
          "word": "矮小",
          "zhuyin": "ㄞˇ ㄒㄧㄠˇ",
          "icon": "🧒"
        },
        {
          "word": "海邊",
          "zhuyin": "ㄏㄞˇ ㄅㄧㄢ",
          "icon": "🏖️"
        }
      ]
    },
    {
      "char": "ㄟ",
      "pinyin": "ei",
      "type": "final",
      "categoryName": "韻母精靈",
      "pokeName": "黑夜超音蝠",
      "pokeType": "飛行系",
      "pokeTypeIcon": "🌪️",
      "dexNo": "No.030",
      "strokes": 1,
      "strokeGuide": [
        "一筆橫折斜撇"
      ],
      "mnemonic": "ㄟ像海浪翻白浪，浪花朵朵漂過來 ㄟㄟㄟ",
      "word": "貝殼",
      "wordZhuyin": "ㄅㄟˋ ㄎㄜˊ",
      "icon": "🐚",
      "color": "#228BE6",
      "examples": [
        {
          "word": "貝殼",
          "zhuyin": "ㄅㄟˋ ㄎㄜˊ",
          "icon": "🐚"
        },
        {
          "word": "黑板",
          "zhuyin": "ㄏㄟ ㄅㄢˇ",
          "icon": "⬛"
        },
        {
          "word": "飛鳥",
          "zhuyin": "ㄈㄟ ㄋㄧㄠˇ",
          "icon": "🕊️"
        }
      ]
    },
    {
      "char": "ㄠ",
      "pinyin": "ao",
      "type": "final",
      "categoryName": "韻母精靈",
      "pokeName": "傲骨獵天鷹",
      "pokeType": "飛行系",
      "pokeTypeIcon": "🌪️",
      "dexNo": "No.031",
      "strokes": 3,
      "strokeGuide": [
        "一筆撇，二筆橫折，三筆折撇"
      ],
      "mnemonic": "ㄠ像小貓咪叫傲傲，揮動尾巴找媽媽 ㄠㄠㄠ",
      "word": "貓頭鷹",
      "wordZhuyin": "ㄇㄠ ㄊㄡˊ ㄧㄥ",
      "icon": "🦉",
      "color": "#12B886",
      "examples": [
        {
          "word": "貓頭鷹",
          "zhuyin": "ㄇㄠ ㄊㄡˊ ㄧㄥ",
          "icon": "🦉"
        },
        {
          "word": "書包",
          "zhuyin": "ㄕㄨ ㄅㄠ",
          "icon": "🎒"
        },
        {
          "word": "外套",
          "zhuyin": "ㄨㄞˋ ㄊㄠˋ",
          "icon": "🧥"
        }
      ]
    },
    {
      "char": "ㄡ",
      "pinyin": "ou",
      "type": "final",
      "categoryName": "韻母精靈",
      "pokeName": "海風咕咕鷗",
      "pokeType": "水系",
      "pokeTypeIcon": "💧",
      "dexNo": "No.032",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫撇，二筆捺"
      ],
      "mnemonic": "ㄡ像白海鷗飛藍天，展翅翱翔水面上 ㄡㄡㄡ",
      "word": "海鷗",
      "wordZhuyin": "ㄏㄞˇ ㄡ",
      "icon": "🕊️",
      "color": "#82C91E",
      "examples": [
        {
          "word": "海鷗",
          "zhuyin": "ㄏㄞˇ ㄡ",
          "icon": "🕊️"
        },
        {
          "word": "猴子",
          "zhuyin": "ㄏㄡˊ ˙ㄗ",
          "icon": "🐒"
        },
        {
          "word": "小狗",
          "zhuyin": "ㄒㄧㄠˇ ㄍㄡˇ",
          "icon": "🐶"
        }
      ]
    },
    {
      "char": "ㄢ",
      "pinyin": "an",
      "type": "final",
      "categoryName": "韻母精靈",
      "pokeName": "泰迪大力熊",
      "pokeType": "格鬥系",
      "pokeTypeIcon": "🥊",
      "dexNo": "No.033",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫，二筆撇折橫"
      ],
      "mnemonic": "ㄢ像小馬鞍，騎士坐上好威風 ㄢㄢㄢ",
      "word": "安全帽",
      "wordZhuyin": "ㄢ ㄑㄩㄢˊ ㄇㄠˋ",
      "icon": "⛑️",
      "color": "#FAB005",
      "examples": [
        {
          "word": "安全帽",
          "zhuyin": "ㄢ ㄑㄩㄢˊ ㄇㄠˋ",
          "icon": "⛑️"
        },
        {
          "word": "斑馬",
          "zhuyin": "ㄅㄢ ㄇㄚˇ",
          "icon": "🦓"
        },
        {
          "word": "雨傘",
          "zhuyin": "ㄩˇ ㄙㄢˇ",
          "icon": "☂️"
        }
      ]
    },
    {
      "char": "ㄣ",
      "pinyin": "en",
      "type": "final",
      "categoryName": "韻母精靈",
      "pokeName": "忠誠小卡犬",
      "pokeType": "火系",
      "pokeTypeIcon": "🔥",
      "dexNo": "No.034",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫折，二筆橫"
      ],
      "mnemonic": "ㄣ像小手指輕輕彎，按一下門鈴叮咚 ㄣㄣㄣ",
      "word": "森林",
      "wordZhuyin": "ㄙㄣ ㄌㄧㄣˊ",
      "icon": "🌲",
      "color": "#FD7E14",
      "examples": [
        {
          "word": "森林",
          "zhuyin": "ㄙㄣ ㄌㄧㄣˊ",
          "icon": "🌲"
        },
        {
          "word": "針線",
          "zhuyin": "ㄓㄣ ㄒㄧㄢˋ",
          "icon": "🪡"
        },
        {
          "word": "時鐘",
          "zhuyin": "ㄕˊ ㄓㄨㄥ",
          "icon": "⏰"
        }
      ]
    },
    {
      "char": "ㄤ",
      "pinyin": "ang",
      "type": "final",
      "categoryName": "韻母精靈",
      "pokeName": "昂首金毛獅",
      "pokeType": "一般系",
      "pokeTypeIcon": "⭐",
      "dexNo": "No.035",
      "strokes": 3,
      "strokeGuide": [
        "一筆橫，二筆撇，三筆橫折彎鉤"
      ],
      "mnemonic": "ㄤ像棒棒糖甜滋滋，拿在手裡樂開懷 ㄤㄤㄤ",
      "word": "棒棒糖",
      "wordZhuyin": "ㄅㄤˋ ㄅㄤˋ ㄊㄤˊ",
      "icon": "🍭",
      "color": "#F783AC",
      "examples": [
        {
          "word": "棒棒糖",
          "zhuyin": "ㄅㄤˋ ㄅㄤˋ ㄊㄤˊ",
          "icon": "🍭"
        },
        {
          "word": "太陽",
          "zhuyin": "ㄊㄞˋ ㄧㄤˊ",
          "icon": "☀️"
        },
        {
          "word": "鋼琴",
          "zhuyin": "ㄍㄤ ㄑㄧㄣˊ",
          "icon": "🎹"
        }
      ]
    },
    {
      "char": "ㄥ",
      "pinyin": "eng",
      "type": "final",
      "categoryName": "韻母精靈",
      "pokeName": "夢幻七彩蝶",
      "pokeType": "妖精系",
      "pokeTypeIcon": "🧚",
      "dexNo": "No.036",
      "strokes": 2,
      "strokeGuide": [
        "一筆橫折，二筆提折"
      ],
      "mnemonic": "ㄥ像小蜜蜂嗡嗡嗡，飛到花叢採花蜜 ㄥㄥㄥ",
      "word": "蜜蜂",
      "wordZhuyin": "ㄇㄧˋ ㄈㄥ",
      "icon": "🐝",
      "color": "#DA77F2",
      "examples": [
        {
          "word": "蜜蜂",
          "zhuyin": "ㄇㄧˋ ㄈㄥ",
          "icon": "🐝"
        },
        {
          "word": "燈籠",
          "zhuyin": "ㄉㄥ ㄌㄨㄥˊ",
          "icon": "🏮"
        },
        {
          "word": "風鈴",
          "zhuyin": "ㄈㄥ ㄌㄧㄥˊ",
          "icon": "🎐"
        }
      ]
    },
    {
      "char": "ㄦ",
      "pinyin": "er",
      "type": "final",
      "categoryName": "韻母精靈",
      "pokeName": "幼角小天龍",
      "pokeType": "龍系",
      "pokeTypeIcon": "🐉",
      "dexNo": "No.037",
      "strokes": 2,
      "strokeGuide": [
        "一筆撇，二筆豎彎鉤"
      ],
      "mnemonic": "ㄦ像兩隻小耳朵，聽聽媽媽說故事 ㄦㄦㄦ",
      "word": "耳朵",
      "wordZhuyin": "ㄦˇ ㄉㄨㄛ˙",
      "icon": "👂",
      "color": "#9775FA",
      "examples": [
        {
          "word": "耳朵",
          "zhuyin": "ㄦˇ ㄉㄨㄛ˙",
          "icon": "👂"
        },
        {
          "word": "兒子",
          "zhuyin": "ㄦˊ ˙ㄗ",
          "icon": "👦"
        },
        {
          "word": "兒童",
          "zhuyin": "ㄦˊ ㄊㄨㄥˊ",
          "icon": "🧒"
        }
      ]
    }
  ],
  "combinedFinals": [
    {
      "combo": "ㄧㄚ",
      "pinyin": "ia",
      "word": "鴨子",
      "icon": "🦆"
    },
    {
      "combo": "ㄧㄛ",
      "pinyin": "io",
      "word": "小唷",
      "icon": "🗣️"
    },
    {
      "combo": "ㄧㄝ",
      "pinyin": "ie",
      "word": "爺爺",
      "icon": "👴"
    },
    {
      "combo": "ㄧㄠ",
      "pinyin": "iao",
      "word": "搖籃",
      "icon": "🛏️"
    },
    {
      "combo": "ㄧㄡ",
      "pinyin": "iou",
      "word": "游泳",
      "icon": "🏊"
    },
    {
      "combo": "ㄧㄢ",
      "pinyin": "ian",
      "word": "燕子",
      "icon": "🐦"
    },
    {
      "combo": "ㄧㄣ",
      "pinyin": "in",
      "word": "音樂",
      "icon": "🎵"
    },
    {
      "combo": "ㄧㄤ",
      "pinyin": "iang",
      "word": "小羊",
      "icon": "🐑"
    },
    {
      "combo": "ㄧㄥ",
      "pinyin": "ing",
      "word": "老鷹",
      "icon": "🦅"
    },
    {
      "combo": "ㄨㄚ",
      "pinyin": "ua",
      "word": "青蛙",
      "icon": "🐸"
    },
    {
      "combo": "ㄨㄛ",
      "pinyin": "uo",
      "word": "鳥窩",
      "icon": "🪺"
    },
    {
      "combo": "ㄨㄞ",
      "pinyin": "uai",
      "word": "乖乖",
      "icon": "👶"
    },
    {
      "combo": "ㄨㄟ",
      "pinyin": "uei",
      "word": "微風",
      "icon": "🍃"
    },
    {
      "combo": "ㄨㄢ",
      "pinyin": "uan",
      "word": "海灣",
      "icon": "🌊"
    },
    {
      "combo": "ㄨㄣ",
      "pinyin": "uen",
      "word": "溫暖",
      "icon": "☀️"
    },
    {
      "combo": "ㄨㄤ",
      "pinyin": "uang",
      "word": "汪汪狗",
      "icon": "🐶"
    },
    {
      "combo": "ㄨㄥ",
      "pinyin": "ueng",
      "word": "老翁",
      "icon": "👴"
    },
    {
      "combo": "ㄩㄝ",
      "pinyin": "üe",
      "word": "月亮",
      "icon": "🌙"
    },
    {
      "combo": "ㄩㄢ",
      "pinyin": "üan",
      "word": "公園",
      "icon": "🌳"
    },
    {
      "combo": "ㄩㄣ",
      "pinyin": "ün",
      "word": "白雲",
      "icon": "☁️"
    },
    {
      "combo": "ㄩㄥ",
      "pinyin": "iong",
      "word": "游泳池",
      "icon": "🏊"
    }
  ],
  "tones": [
    {
      "id": 1,
      "name": "第一聲 (陰平)",
      "symbol": "ˉ",
      "mark": "",
      "tuneDesc": "平平的 (高平 55)",
      "rhyme": "一聲平平像地平線 🚗💨",
      "color": "#4DABF7",
      "example": "ㄅㄚ (八)"
    },
    {
      "id": 2,
      "name": "第二聲 (陽平)",
      "symbol": "ˊ",
      "mark": "ˊ",
      "tuneDesc": "向上爬 (中升 35)",
      "rhyme": "二聲向上爬山坡 🚡↗",
      "color": "#38D9A9",
      "example": "ㄅㄚˊ (拔)"
    },
    {
      "id": 3,
      "name": "第三聲 (上聲)",
      "symbol": "ˇ",
      "mark": "ˇ",
      "tuneDesc": "轉個彎 (降升 214)",
      "rhyme": "三聲轉個彎像雲霄飛車 🎢↷↗",
      "color": "#FFA94D",
      "example": "ㄅㄚˇ (把)"
    },
    {
      "id": 4,
      "name": "第四聲 (去聲)",
      "symbol": "ˋ",
      "mark": "ˋ",
      "tuneDesc": "溜滑梯 (全降 51)",
      "rhyme": "四聲溜滑梯向下衝 🛝↘",
      "color": "#FF6B6B",
      "example": "ㄅㄚˋ (爸)"
    },
    {
      "id": 0,
      "name": "輕聲",
      "symbol": "˙",
      "mark": "˙",
      "tuneDesc": "輕輕的短音",
      "rhyme": "輕聲飄飄像小泡泡 🎈˙",
      "color": "#DA77F2",
      "example": "˙ㄅㄚ (爸爸的後字)"
    }
  ],
  "blendingDictionary": [
    {
      "initial": "ㄅ",
      "medial": "",
      "final": "ㄚ",
      "tone": 1,
      "char": "八",
      "word": "八個蘋果",
      "pinyin": "bā"
    },
    {
      "initial": "ㄅ",
      "medial": "",
      "final": "ㄚ",
      "tone": 2,
      "char": "拔",
      "word": "拔蘿蔔",
      "pinyin": "bá"
    },
    {
      "initial": "ㄅ",
      "medial": "",
      "final": "ㄚ",
      "tone": 3,
      "char": "把",
      "word": "一把雨傘",
      "pinyin": "bǎ"
    },
    {
      "initial": "ㄅ",
      "medial": "",
      "final": "ㄚ",
      "tone": 4,
      "char": "爸",
      "word": "爸爸",
      "pinyin": "bà"
    },
    {
      "initial": "ㄅ",
      "medial": "",
      "final": "ㄢ",
      "tone": 1,
      "char": "斑",
      "word": "斑馬",
      "pinyin": "bān"
    },
    {
      "initial": "ㄅ",
      "medial": "",
      "final": "ㄠ",
      "tone": 3,
      "char": "飽",
      "word": "吃飽了",
      "pinyin": "bǎo"
    },
    {
      "initial": "ㄆ",
      "medial": "",
      "final": "ㄠ",
      "tone": 3,
      "char": "跑",
      "word": "跑步",
      "pinyin": "pǎo"
    },
    {
      "initial": "ㄆ",
      "medial": "ㄧ",
      "final": "ㄥ",
      "tone": 2,
      "char": "平",
      "word": "蘋果",
      "pinyin": "píng"
    },
    {
      "initial": "ㄇ",
      "medial": "",
      "final": "ㄚ",
      "tone": 1,
      "char": "媽",
      "word": "媽媽",
      "pinyin": "mā"
    },
    {
      "initial": "ㄇ",
      "medial": "",
      "final": "ㄠ",
      "tone": 1,
      "char": "貓",
      "word": "貓咪",
      "pinyin": "māo"
    },
    {
      "initial": "ㄈ",
      "medial": "",
      "final": "ㄟ",
      "tone": 1,
      "char": "飛",
      "word": "飛機",
      "pinyin": "fēi"
    },
    {
      "initial": "ㄉ",
      "medial": "",
      "final": "ㄚ",
      "tone": 4,
      "char": "大",
      "word": "大象",
      "pinyin": "dà"
    },
    {
      "initial": "ㄊ",
      "medial": "",
      "final": "ㄞ",
      "tone": 4,
      "char": "太",
      "word": "太陽",
      "pinyin": "tài"
    },
    {
      "initial": "ㄊ",
      "medial": "",
      "final": "ㄨ",
      "tone": 4,
      "char": "兔",
      "word": "兔子",
      "pinyin": "tù"
    },
    {
      "initial": "ㄋ",
      "medial": "ㄧ",
      "final": "ㄠ",
      "tone": 3,
      "char": "鳥",
      "word": "小鳥",
      "pinyin": "niǎo"
    },
    {
      "initial": "ㄌ",
      "medial": "",
      "final": "ㄠ",
      "tone": 3,
      "char": "老",
      "word": "老虎",
      "pinyin": "lǎo"
    },
    {
      "initial": "ㄍ",
      "medial": "",
      "final": "ㄜ",
      "tone": 1,
      "char": "哥",
      "word": "哥哥",
      "pinyin": "gē"
    },
    {
      "initial": "ㄍ",
      "medial": "ㄨ",
      "final": "ㄚ",
      "tone": 1,
      "char": "瓜",
      "word": "西瓜",
      "pinyin": "guā"
    },
    {
      "initial": "ㄎ",
      "medial": "",
      "final": "ㄜ",
      "tone": 3,
      "char": "渴",
      "word": "口渴喝水",
      "pinyin": "kě"
    },
    {
      "initial": "ㄏ",
      "medial": "ㄨ",
      "final": "ㄚ",
      "tone": 1,
      "char": "花",
      "word": "花朵",
      "pinyin": "huā"
    },
    {
      "initial": "ㄐ",
      "medial": "ㄧ",
      "final": "",
      "tone": 1,
      "char": "雞",
      "word": "小雞",
      "pinyin": "jī"
    },
    {
      "initial": "ㄑ",
      "medial": "ㄧ",
      "final": "",
      "tone": 4,
      "char": "氣",
      "word": "生氣/氣球",
      "pinyin": "qì"
    },
    {
      "initial": "ㄒ",
      "medial": "ㄧ",
      "final": "ㄠ",
      "tone": 3,
      "char": "小",
      "word": "小朋友",
      "pinyin": "xiǎo"
    },
    {
      "initial": "ㄓ",
      "medial": "",
      "final": "ㄨ",
      "tone": 1,
      "char": "豬",
      "word": "小豬",
      "pinyin": "zhū"
    },
    {
      "initial": "ㄔ",
      "medial": "",
      "final": "ㄜ",
      "tone": 1,
      "char": "車",
      "word": "火車",
      "pinyin": "chē"
    },
    {
      "initial": "ㄕ",
      "medial": "",
      "final": "",
      "tone": 1,
      "char": "獅",
      "word": "獅子",
      "pinyin": "shī"
    },
    {
      "initial": "ㄕ",
      "medial": "ㄨ",
      "final": "",
      "tone": 1,
      "char": "書",
      "word": "看書",
      "pinyin": "shū"
    },
    {
      "initial": "ㄖ",
      "medial": "",
      "final": "",
      "tone": 4,
      "char": "日",
      "word": "日曆",
      "pinyin": "rì"
    },
    {
      "initial": "ㄗ",
      "medial": "",
      "final": "ㄨ",
      "tone": 2,
      "char": "足",
      "word": "足球",
      "pinyin": "zú"
    },
    {
      "initial": "ㄘ",
      "medial": "",
      "final": "ㄠ",
      "tone": 3,
      "char": "草",
      "word": "青草",
      "pinyin": "cǎo"
    },
    {
      "initial": "ㄙ",
      "medial": "",
      "final": "ㄣ",
      "tone": 1,
      "char": "森",
      "word": "森林",
      "pinyin": "sēn"
    },
    {
      "initial": "",
      "medial": "ㄧ",
      "final": "",
      "tone": 1,
      "char": "衣",
      "word": "衣服",
      "pinyin": "yī"
    },
    {
      "initial": "",
      "medial": "ㄨ",
      "final": "",
      "tone": 1,
      "char": "屋",
      "word": "房屋",
      "pinyin": "wū"
    },
    {
      "initial": "",
      "medial": "ㄩ",
      "final": "",
      "tone": 2,
      "char": "魚",
      "word": "小魚",
      "pinyin": "yú"
    },
    {
      "initial": "",
      "medial": "ㄩ",
      "final": "ㄝ",
      "tone": 4,
      "char": "月",
      "word": "月亮",
      "pinyin": "yuè"
    }
  ],
  "quizItems": [
    {
      "type": "listen_symbol",
      "target": "ㄅ",
      "speechPrompt": "ㄅ",
      "options": [
        "ㄅ",
        "ㄉ",
        "ㄆ",
        "ㄇ"
      ],
      "hint": "斑馬的ㄅ，橫折、橫"
    },
    {
      "type": "listen_symbol",
      "target": "ㄆ",
      "speechPrompt": "ㄆ",
      "options": [
        "ㄆ",
        "ㄈ",
        "ㄅ",
        "ㄎ"
      ],
      "hint": "蘋果的ㄆ，小水盆潑水"
    },
    {
      "type": "listen_symbol",
      "target": "ㄇ",
      "speechPrompt": "ㄇ",
      "options": [
        "ㄇ",
        "ㄈ",
        "ㄩ",
        "凵"
      ],
      "hint": "貓咪的ㄇ，小山洞"
    },
    {
      "type": "listen_symbol",
      "target": "ㄈ",
      "speechPrompt": "ㄈ",
      "options": [
        "ㄈ",
        "ㄇ",
        "ㄅ",
        "ㄏ"
      ],
      "hint": "飛機的ㄈ，像小拐杖"
    },
    {
      "type": "listen_symbol",
      "target": "ㄉ",
      "speechPrompt": "ㄉ",
      "options": [
        "ㄉ",
        "ㄅ",
        "ㄌ",
        "ㄊ"
      ],
      "hint": "大象的ㄉ，馬蹄得得得"
    },
    {
      "type": "listen_symbol",
      "target": "ㄊ",
      "speechPrompt": "ㄊ",
      "options": [
        "ㄊ",
        "ㄉ",
        "ㄍ",
        "ㄎ"
      ],
      "hint": "太陽的ㄊ，像一把小雨傘"
    },
    {
      "type": "listen_symbol",
      "target": "ㄋ",
      "speechPrompt": "ㄋ",
      "options": [
        "ㄋ",
        "ㄌ",
        "ㄖ",
        "ㄗ"
      ],
      "hint": "牛奶的ㄋ，小泥人"
    },
    {
      "type": "listen_symbol",
      "target": "ㄌ",
      "speechPrompt": "ㄌ",
      "options": [
        "ㄌ",
        "ㄋ",
        "ㄉ",
        "ㄎ"
      ],
      "hint": "鈴鐺的ㄌ，丁零噹啷響"
    },
    {
      "type": "listen_symbol",
      "target": "ㄍ",
      "speechPrompt": "ㄍ",
      "options": [
        "ㄍ",
        "ㄎ",
        "ㄑ",
        "ㄏ"
      ],
      "hint": "鴿子的ㄍ，高高大哥哥"
    },
    {
      "type": "listen_symbol",
      "target": "ㄎ",
      "speechPrompt": "ㄎ",
      "options": [
        "ㄎ",
        "ㄍ",
        "ㄏ",
        "ㄈ"
      ],
      "hint": "恐龍的ㄎ，開口哈哈笑"
    },
    {
      "type": "listen_symbol",
      "target": "ㄏ",
      "speechPrompt": "ㄏ",
      "options": [
        "ㄏ",
        "ㄎ",
        "ㄍ",
        "ㄖ"
      ],
      "hint": "花朵的ㄏ，懸崖小涼亭"
    },
    {
      "type": "listen_symbol",
      "target": "ㄐ",
      "speechPrompt": "ㄐ",
      "options": [
        "ㄐ",
        "ㄑ",
        "ㄒ",
        "ㄓ"
      ],
      "hint": "小雞的ㄐ，嘰嘰喳喳"
    },
    {
      "type": "listen_symbol",
      "target": "ㄑ",
      "speechPrompt": "ㄑ",
      "options": [
        "ㄑ",
        "ㄐ",
        "ㄒ",
        "ㄍ"
      ],
      "hint": "汽車的ㄑ，迎風小紅旗"
    },
    {
      "type": "listen_symbol",
      "target": "ㄒ",
      "speechPrompt": "ㄒ",
      "options": [
        "ㄒ",
        "ㄐ",
        "ㄑ",
        "ㄕ"
      ],
      "hint": "西瓜的ㄒ，切開一牙牙"
    },
    {
      "type": "listen_symbol",
      "target": "ㄓ",
      "speechPrompt": "ㄓ",
      "options": [
        "ㄓ",
        "ㄗ",
        "ㄔ",
        "ㄕ"
      ],
      "hint": "蜘蛛的ㄓ，翹起舌頭"
    },
    {
      "type": "listen_symbol",
      "target": "ㄔ",
      "speechPrompt": "ㄔ",
      "options": [
        "ㄔ",
        "ㄘ",
        "ㄓ",
        "ㄕ"
      ],
      "hint": "火車的ㄔ，小湯匙"
    },
    {
      "type": "listen_symbol",
      "target": "ㄕ",
      "speechPrompt": "ㄕ",
      "options": [
        "ㄕ",
        "ㄙ",
        "ㄓ",
        "ㄖ"
      ],
      "hint": "獅子的ㄕ，森林大國王"
    },
    {
      "type": "listen_symbol",
      "target": "ㄖ",
      "speechPrompt": "ㄖ",
      "options": [
        "ㄖ",
        "ㄌ",
        "ㄋ",
        "ㄓ"
      ],
      "hint": "日曆的ㄖ，溫暖紅太陽"
    },
    {
      "type": "listen_symbol",
      "target": "ㄗ",
      "speechPrompt": "ㄗ",
      "options": [
        "ㄗ",
        "ㄓ",
        "ㄘ",
        "ㄙ"
      ],
      "hint": "足球的ㄗ，平舌頭"
    },
    {
      "type": "listen_symbol",
      "target": "ㄘ",
      "speechPrompt": "ㄘ",
      "options": [
        "ㄘ",
        "ㄔ",
        "ㄗ",
        "ㄙ"
      ],
      "hint": "草莓的ㄘ，小刺蝟"
    },
    {
      "type": "listen_symbol",
      "target": "ㄙ",
      "speechPrompt": "ㄙ",
      "options": [
        "ㄙ",
        "ㄕ",
        "ㄗ",
        "ㄘ"
      ],
      "hint": "森林的ㄙ，小蠶寶寶"
    },
    {
      "type": "listen_symbol",
      "target": "ㄧ",
      "speechPrompt": "ㄧ",
      "options": [
        "ㄧ",
        "一",
        "ㄩ",
        "ㄨ"
      ],
      "hint": "衣服的ㄧ，像魔術棒"
    },
    {
      "type": "listen_symbol",
      "target": "ㄨ",
      "speechPrompt": "ㄨ",
      "options": [
        "ㄨ",
        "ㄩ",
        "ㄧ",
        "ㄡ"
      ],
      "hint": "烏龜的ㄨ，圓圓小屋頂"
    },
    {
      "type": "listen_symbol",
      "target": "ㄩ",
      "speechPrompt": "ㄩ",
      "options": [
        "ㄩ",
        "ㄨ",
        "ㄧ",
        "ㄇ"
      ],
      "hint": "金魚的ㄩ，吐泡泡"
    }
  ],
  "adventureStages": [
    {
      "id": 1,
      "name": "第一關：微風森林",
      "subtitle": "唇音村四大天王",
      "icon": "🌲",
      "bossIcon": "🦊",
      "bossName": "小狐狸奇奇",
      "color": "#51CF66",
      "bgGradient": "linear-gradient(135deg, #D3F9D8, #B2F2BB)",
      "desc": "仔細聽正音老師的發音、看圖片，找出微風森林裡的四個雙唇與唇齒音好朋友！",
      "questions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音辨字：仔細聽老師唸的聲音，選出「斑馬」開頭的注音符號！",
          "speakText": "第一題！仔細聽：ㄅ，ㄅ！斑馬開頭的音，ㄅ，ㄅ！請問是哪一個注音呢？",
          "icon": "🦓",
          "word": "🦓 斑馬 → 「斑」的開頭聲母",
          "hint": "雙唇緊閉再放開，長得像收音機天線豎起來（共 2 畫）",
          "answer": "ㄅ",
          "options": [
            "ㄅ",
            "ㄆ",
            "ㄇ",
            "ㄈ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選注音：「紅蘋果」的「蘋」，第一個注音符號是什麼？",
          "speakText": "紅通通的蘋果！仔細聽：ㄆ，ㄆ！蘋果開頭的音，ㄆ，ㄆ！是哪一個呢？",
          "icon": "🍎",
          "word": "🍎 蘋果 → 「蘋」的開頭聲母",
          "hint": "雙唇用力送氣出來，長得像小水盆潑水嘩啦啦",
          "answer": "ㄆ",
          "options": [
            "ㄆ",
            "ㄅ",
            "ㄈ",
            "ㄉ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音挑戰：仔細聽老師唸的聲音，選出「貓咪」開頭的注音符號！",
          "speakText": "喵～！仔細聽：ㄇ，ㄇ！小貓咪開頭的音，ㄇ，ㄇ！請找出像小山洞的注音！",
          "icon": "🐱",
          "word": "🐱 貓咪 → 「貓」的開頭聲母",
          "hint": "雙唇閉起來帶點鼻音，長得像開口朝下的小山洞",
          "answer": "ㄇ",
          "options": [
            "ㄇ",
            "ㄈ",
            "ㄩ",
            "ㄅ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：「斑馬」的「斑」，是哪一個聲調？",
          "speakText": "段考選擇題：斑馬的斑，是哪一個聲調呢？",
          "icon": "🦓",
          "word": "🦓 斑馬 → 聲調判斷",
          "hint": "第一聲平平的，國小標準不標調號喔",
          "answer": "第一聲（一聲）",
          "options": [
            "第一聲（一聲）",
            "第二聲（二聲）",
            "第三聲（三聲）",
            "第四聲（四聲）"
          ]
        },
        {
          "qType": "reading",
          "passage": "小白兔，穿白袍，\n長長耳朵豎得高。\n愛吃蘿蔔愛吃草，\n走起路來蹦蹦跳。",
          "prompt": "📖 讀一讀兒歌回答問題：小白兔最喜歡吃什麼？",
          "speakText": "讀一讀兒歌回答問題：小白兔，穿白袍，長長耳朵豎得高。愛吃蘿蔔愛吃草，走起路來蹦蹦跳。請問：小白兔最喜歡吃什麼？",
          "icon": "🐇",
          "word": "🐇 兒歌小故事：小白兔",
          "hint": "兒歌裡說：愛吃蘿蔔愛吃草",
          "answer": "蘿蔔和青草",
          "options": [
            "蘿蔔和青草",
            "蘋果和香蕉",
            "小魚和小蝦",
            "香甜的西瓜"
          ]
        }
      ],
      "finalQuestions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：仔細聽老師發音，選出「斑馬」完全正確的注音！",
          "speakText": "仔細聽：斑馬！黑白條紋的斑馬！請問哪一個注音完全正確？",
          "icon": "🦓",
          "word": "🦓 斑馬",
          "hint": "注意前後鼻音與聲調：斑是一聲、馬是三聲",
          "answer": "ㄅㄢ ㄇㄚˇ",
          "options": [
            "ㄅㄢ ㄇㄚˇ",
            "ㄅㄤ ㄇㄚˇ",
            "ㄉㄢ ㄇㄚˇ",
            "ㄅㄢ ㄇㄚ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：紅通通的「蘋果」，正確的拼音是哪一個？",
          "speakText": "好甜的蘋果！仔細聽：蘋果！請問哪一個拼音完全正確？",
          "icon": "🍎",
          "word": "🍎 蘋果",
          "hint": "蘋是二聲後鼻音，果是三聲三拼音",
          "answer": "ㄆㄧㄥˊ ㄍㄨㄛˇ",
          "options": [
            "ㄆㄧㄥˊ ㄍㄨㄛˇ",
            "ㄆㄧㄣˊ ㄍㄨㄛˇ",
            "ㄅㄧㄥˊ ㄍㄨㄛˇ",
            "ㄆㄧㄥ ㄍㄨㄛˇ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：可愛的「貓咪」喵喵叫，正確的注音是哪一個？",
          "speakText": "可愛的貓咪！仔細聽：貓咪！選出正確的注音符號組合！",
          "icon": "🐱",
          "word": "🐱 貓咪",
          "hint": "兩個字都是第一聲平平的一條線",
          "answer": "ㄇㄠ ㄇㄧ",
          "options": [
            "ㄇㄠ ㄇㄧ",
            "ㄇㄠ ㄋㄧ",
            "ㄋㄠ ㄇㄧ",
            "ㄇㄠ ㄇㄧˇ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：在天上飛的「飛機」，正確的拼音是哪一個？",
          "speakText": "大飛機飛上天！仔細聽：飛機！選出完全正確的拼音！",
          "icon": "✈️",
          "word": "✈️ 飛機",
          "hint": "注意唇齒音與舌面板音的分辨",
          "answer": "ㄈㄟ ㄐㄧ",
          "options": [
            "ㄈㄟ ㄐㄧ",
            "ㄏㄨㄟ ㄐㄧ",
            "ㄈㄟ ㄑㄧ",
            "ㄈㄟ ㄐㄧˋ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：嗡嗡嗡採花蜜的「蜜蜂」，哪一個拼音完全正確？",
          "speakText": "勤勞的蜜蜂！仔細聽：蜜蜂！選出完全正確的注音！",
          "icon": "🐝",
          "word": "🐝 蜜蜂",
          "hint": "蜜是第四聲溜滑梯，蜂是第一聲後鼻音",
          "answer": "ㄇㄧˋ ㄈㄥ",
          "options": [
            "ㄇㄧˋ ㄈㄥ",
            "ㄇㄧˋ ㄏㄨㄥ",
            "ㄇㄧ ㄈㄥ",
            "ㄋㄧˋ ㄈㄥ"
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "第二關：陽光草原",
      "subtitle": "舌尖營地四兄弟",
      "icon": "🌻",
      "bossIcon": "🦁",
      "bossName": "草原小獅王",
      "color": "#FCC419",
      "bgGradient": "linear-gradient(135deg, #FFF3BF, #FFEC99)",
      "desc": "仔細聽老師第一聲清楚的發音，分辨舌尖音四兄弟！",
      "questions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音辨字：請聽老師發音，選出「大象」開頭的注音！",
          "speakText": "仔細聽：ㄉ，ㄉ！大象開頭的音，ㄉ，ㄉ！請問是哪一個注音呢？",
          "icon": "🐘",
          "word": "🐘 大象 → 「大」的開頭聲母",
          "hint": "舌尖頂住上牙齦彈開，長得像小馬蹄，肚子彎彎在左邊！",
          "answer": "ㄉ",
          "options": [
            "ㄉ",
            "ㄅ",
            "ㄊ",
            "ㄌ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選注音：「小兔子」跳跳跳，「兔」的第一個注音是什麼？",
          "speakText": "可愛的小兔子！仔細聽：ㄊ，ㄊ！兔子開頭的音，ㄊ，ㄊ！請問是哪一個注音？",
          "icon": "🐰",
          "word": "🐰 兔子 → 「兔」的開頭聲母",
          "hint": "長得像一把遮雨的小雨傘，總共 3 畫",
          "answer": "ㄊ",
          "options": [
            "ㄊ",
            "ㄉ",
            "ㄋ",
            "ㄌ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音挑戰：喝「牛奶」長高高，請聽老師發音選出「牛」開頭的注音！",
          "speakText": "仔細聽：ㄋ，ㄋ！牛奶開頭的音，ㄋ，ㄋ！請問是哪一個注音呢？",
          "icon": "🥛",
          "word": "🥛 牛奶 → 「牛」的開頭聲母",
          "hint": "帶著鼻音的舌尖音，長得像一尊彎彎的小泥人",
          "answer": "ㄋ",
          "options": [
            "ㄋ",
            "ㄌ",
            "ㄉ",
            "ㄖ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：下列哪一個語詞的開頭，是舌尖音「ㄉ」？",
          "speakText": "段考選擇題：下列哪一個語詞的開頭，是舌尖音ㄉ呢？",
          "icon": "🐘",
          "word": "🐘 聲母分類判斷",
          "hint": "大象的「大」：ㄉ-ㄚˋ 大",
          "answer": "大象",
          "options": [
            "大象",
            "兔子",
            "小鳥",
            "老鷹"
          ]
        },
        {
          "qType": "reading",
          "passage": "大公雞，喔喔啼，\n天天早起不偷懶。\n叫醒太陽照大地，\n小朋友們上學去。",
          "prompt": "📖 讀一讀兒歌回答問題：大公雞早起叫醒了誰？",
          "speakText": "讀一讀兒歌回答問題：大公雞，喔喔啼，天天早起不偷懶。叫醒太陽照大地，小朋友們上學去。請問：大公雞早起叫醒了誰？",
          "icon": "🐓",
          "word": "🐓 兒歌小故事：大公雞",
          "hint": "兒歌裡說：叫醒太陽照大地",
          "answer": "太陽公公",
          "options": [
            "太陽公公",
            "月亮姐姐",
            "天上的白雲",
            "水裡的小鴨"
          ]
        }
      ],
      "finalQuestions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：長鼻子的大動物「大象」，正確的拼音是哪一個？",
          "speakText": "大象長長的鼻子！仔細聽：大象！選出正確的拼音！",
          "icon": "🐘",
          "word": "🐘 大象",
          "hint": "兩個字都是第四聲，象是三拼結合韻",
          "answer": "ㄉㄚˋ ㄒㄧㄤˋ",
          "options": [
            "ㄉㄚˋ ㄒㄧㄤˋ",
            "ㄉㄚˋ ㄒㄧㄤ",
            "ㄅㄚˋ ㄒㄧㄤˋ",
            "ㄉㄚˋ ㄒㄧㄢˋ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：蹦蹦跳跳的「兔子」，正確的拼音是哪一個？",
          "speakText": "可愛的兔子！仔細聽：兔子！選出正確的拼音！",
          "icon": "🐰",
          "word": "🐰 兔子",
          "hint": "注意子在名詞結尾是輕聲點個點",
          "answer": "ㄊㄨˋ ˙ㄗ",
          "options": [
            "ㄊㄨˋ ˙ㄗ",
            "ㄉㄨˋ ˙ㄗ",
            "ㄊㄨ ˙ㄗ",
            "ㄊㄨˋ ㄗ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：喝了營養健康的「牛奶」，哪一個拼音完全正確？",
          "speakText": "香濃的牛奶！仔細聽：牛奶！選出正確的注音組合！",
          "icon": "🥛",
          "word": "🥛 牛奶",
          "hint": "牛是第二聲往上爬，奶是第三聲轉個彎",
          "answer": "ㄋㄧㄡˊ ㄋㄞˇ",
          "options": [
            "ㄋㄧㄡˊ ㄋㄞˇ",
            "ㄌㄧㄡˊ ㄋㄞˇ",
            "ㄋㄧㄡ ㄋㄞˇ",
            "ㄋㄧㄡˊ ㄌㄞˇ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：森林百獸之王「老虎」，正確的拼音是哪一個？",
          "speakText": "威武的大老虎！仔細聽：老虎！選出正確的拼音！",
          "icon": "🐯",
          "word": "🐯 老虎",
          "hint": "注意邊音與聲調的搭配",
          "answer": "ㄌㄠˇ ㄏㄨˇ",
          "options": [
            "ㄌㄠˇ ㄏㄨˇ",
            "ㄋㄠˇ ㄏㄨˇ",
            "ㄌㄠ ㄏㄨˇ",
            "ㄌㄠˇ ㄈㄨˇ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：甜甜好吃的「糖果」，哪一個拼音完全正確？",
          "speakText": "甜甜的糖果！仔細聽：糖果！選出正確的拼音！",
          "icon": "🍬",
          "word": "🍬 糖果",
          "hint": "糖是第二聲後鼻音，果是第三聲三拼音",
          "answer": "ㄊㄤˊ ㄍㄨㄛˇ",
          "options": [
            "ㄊㄤˊ ㄍㄨㄛˇ",
            "ㄊㄤ ㄍㄨㄛˇ",
            "ㄊㄢˊ ㄍㄨㄛˇ",
            "ㄉㄤˊ ㄍㄨㄛˇ"
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "第三關：恐龍山谷",
      "subtitle": "山谷聲母大探險",
      "icon": "🌋",
      "bossIcon": "🦖",
      "bossName": "暴龍阿卡",
      "color": "#FF922B",
      "bgGradient": "linear-gradient(135deg, #FFE8CC, #FFD8A8)",
      "desc": "勇闖恐龍山谷，靠聽力與圖片收服山谷裡的六個聲母精靈！",
      "questions": [
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選注音：「大恐龍」的「恐」，第一個注音是什麼？",
          "speakText": "吼～！大恐龍出現了！仔細聽：ㄎ，ㄎ！恐龍開頭的音，ㄎ，ㄎ！是哪一個呢？",
          "icon": "🦖",
          "word": "🦖 恐龍 → 「恐」的開頭聲母",
          "hint": "長得像一張開口哈哈笑的嘴巴，一筆橫、二筆豎折",
          "answer": "ㄎ",
          "options": [
            "ㄎ",
            "ㄍ",
            "ㄏ",
            "ㄆ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音辨字：高高瘦瘦大哥哥，請聽發音選出「鴿子」開頭的注音！",
          "speakText": "仔細聽：ㄍ，ㄍ！白鴿子跟大哥哥開頭的音，ㄍ，ㄍ！請問是哪一個注音呢？",
          "icon": "🕊️",
          "word": "🕊️ 鴿子 → 「鴿」的開頭聲母",
          "hint": "高高瘦瘦有兩條腿，一筆撇折、二筆豎",
          "answer": "ㄍ",
          "options": [
            "ㄍ",
            "ㄑ",
            "ㄎ",
            "ㄏ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選注音：「花朵」真美麗，「花」的第一個注音是什麼？",
          "speakText": "香噴噴的花朵！仔細聽：ㄏ，ㄏ！花朵開頭的音，ㄏ，ㄏ！請問是哪一個注音呢？",
          "icon": "🌸",
          "word": "🌸 花朵 → 「花」的開頭聲母",
          "hint": "長得像懸崖邊的小涼亭，一筆橫、二筆撇",
          "answer": "ㄏ",
          "options": [
            "ㄏ",
            "ㄎ",
            "ㄈ",
            "ㄒ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：下列哪一個是「三拼音」（聲母 + 介音 + 韻母）？",
          "speakText": "段考選擇題：下列哪一個是三拼音呢？",
          "icon": "🌸",
          "word": "🌸 拼音結構判斷",
          "hint": "「花」是由 ㄏ(聲母) + ㄨ(介音) + ㄚ(韻母) 拼成的",
          "answer": "花（ㄏㄨㄚ）",
          "options": [
            "花（ㄏㄨㄚ）",
            "馬（ㄇㄚˇ）",
            "哥（ㄍㄜ）",
            "喝（ㄏㄜ）"
          ]
        },
        {
          "qType": "reading",
          "passage": "小蜜蜂，嗡嗡嗡，\n飛到花叢採花蜜。\n不怕辛苦不怕累，\n釀出蜂蜜甜如蜜。",
          "prompt": "📖 讀一讀兒歌回答問題：小蜜蜂飛到哪裡採花蜜？",
          "speakText": "讀一讀兒歌回答問題：小蜜蜂，嗡嗡嗡，飛到花叢採花蜜。不怕辛苦不怕累，釀出蜂蜜甜如蜜。請問：小蜜蜂飛到哪裡採花蜜？",
          "icon": "🐝",
          "word": "🐝 兒歌小故事：小蜜蜂",
          "hint": "兒歌裡說：飛到花叢採花蜜",
          "answer": "花叢中",
          "options": [
            "花叢中",
            "大樹下",
            "小溪邊",
            "草地上"
          ]
        }
      ],
      "finalQuestions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：巨大的古生物「恐龍」，正確的拼音是哪一個？",
          "speakText": "巨大恐龍！仔細聽：恐龍！選出正確的拼音！",
          "icon": "🦖",
          "word": "🦖 恐龍",
          "hint": "恐是第三聲，龍是第二聲",
          "answer": "ㄎㄨㄥˇ ㄌㄨㄥˊ",
          "options": [
            "ㄎㄨㄥˇ ㄌㄨㄥˊ",
            "ㄍㄨㄥˇ ㄌㄨㄥˊ",
            "ㄎㄨㄥ ㄌㄨㄥˊ",
            "ㄎㄨㄥˇ ㄋㄨㄥˊ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：搖尾巴的寵物「小狗」，正確的拼音是哪一個？",
          "speakText": "忠誠的小狗！仔細聽：小狗！選出正確的拼音！",
          "icon": "🐶",
          "word": "🐶 小狗",
          "hint": "兩個字都是第三聲轉個彎",
          "answer": "ㄒㄧㄠˇ ㄍㄡˇ",
          "options": [
            "ㄒㄧㄠˇ ㄍㄡˇ",
            "ㄒㄧㄠˇ ㄎㄡˇ",
            "ㄒㄧㄠ ㄍㄡˇ",
            "ㄒㄧㄠˇ ㄍㄡ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：池塘裡的粉嫩「荷花」，哪一個拼音完全正確？",
          "speakText": "美麗的荷花！仔細聽：荷花！選出正確的注音！",
          "icon": "🪷",
          "word": "🪷 荷花",
          "hint": "荷是二聲，花是一聲三拼音",
          "answer": "ㄏㄜˊ ㄏㄨㄚ",
          "options": [
            "ㄏㄜˊ ㄏㄨㄚ",
            "ㄏㄜ ㄏㄨㄚ",
            "ㄜˊ ㄏㄨㄚ",
            "ㄏㄜˊ ㄏㄨㄚˇ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：愛吃香蕉的「猴子」，正確的拼音是哪一個？",
          "speakText": "調皮的猴子！仔細聽：猴子！選出正確的拼音！",
          "icon": "🐵",
          "word": "🐵 猴子",
          "hint": "猴是第二聲，子是輕聲",
          "answer": "ㄏㄡˊ ˙ㄗ",
          "options": [
            "ㄏㄡˊ ˙ㄗ",
            "ㄎㄡˊ ˙ㄗ",
            "ㄏㄡ ˙ㄗ",
            "ㄏㄡˊ ㄗ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：早起啼叫的「公雞」，哪一個拼音完全正確？",
          "speakText": "早起的大公雞！仔細聽：公雞！選出完全正確的注音！",
          "icon": "🐓",
          "word": "🐓 公雞",
          "hint": "公是後鼻音，雞是第一聲",
          "answer": "ㄍㄨㄥ ㄐㄧ",
          "options": [
            "ㄍㄨㄥ ㄐㄧ",
            "ㄎㄨㄥ ㄐㄧ",
            "ㄍㄨㄥ ㄑㄧ",
            "ㄍㄨㄥ ㄐㄧˋ"
          ]
        }
      ]
    },
    {
      "id": 4,
      "name": "第四關：翹舌神殿",
      "subtitle": "平翹舌大對決",
      "icon": "🏛️",
      "bossIcon": "🐉",
      "bossName": "神殿小青龍",
      "color": "#339AF0",
      "bgGradient": "linear-gradient(135deg, #E7F5FF, #D0EBFF)",
      "desc": "小一最常考！仔細聽老師有沒有捲舌，分清楚翹舌音與平舌音！",
      "questions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音辨別：舌頭翹起來！請選出「小蜘蛛」開頭的注音！",
          "speakText": "注意聽，舌頭翹起來：ㄓ，ㄓ！小蜘蛛的，ㄓ，ㄓ！請問是哪一個注音呢？",
          "icon": "🕷️",
          "word": "🕷️ 蜘蛛 → 「蜘」的開頭聲母",
          "hint": "翹舌音，最上面有一點，總共 4 畫！",
          "answer": "ㄓ",
          "options": [
            "ㄓ",
            "ㄗ",
            "ㄔ",
            "ㄕ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 平翹舌考驗：「踢足球」的「足」，第一個注音是哪一個？",
          "speakText": "踢足球囉！舌頭放平平：ㄗ，ㄗ！足球開頭的音，ㄗ，ㄗ！請問是哪一個注音呢？",
          "icon": "⚽",
          "word": "⚽ 足球 → 「足」的開頭聲母",
          "hint": "足球的足不用翹舌，一筆橫折、二筆提折（共 2 畫）",
          "answer": "ㄗ",
          "options": [
            "ㄗ",
            "ㄓ",
            "ㄘ",
            "ㄔ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選注音：「小火車」嘟嘟嘟，請問「車」的完整注音是哪一個？",
          "speakText": "火車開動了！火車的車，ㄔ、ㄜ，車！舌頭要翹起來，請選出車的注音！",
          "icon": "🚂",
          "word": "🚂 火車 → 「車」的完整注音",
          "hint": "像小湯匙的翹舌聲母（3畫）＋ 微笑單韻母",
          "answer": "ㄔㄜ",
          "options": [
            "ㄔㄜ",
            "ㄘㄜ",
            "ㄕㄜ",
            "ㄙㄜ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：「西瓜」這兩個字的聲調分別是幾聲？",
          "speakText": "段考選擇題：西瓜這兩個字的聲調分別是幾聲呢？",
          "icon": "🍉",
          "word": "🍉 聲調連續判斷",
          "hint": "西（ㄒㄧ 一聲）瓜（ㄍㄨㄚ 一聲），兩個都是平平的一聲",
          "answer": "第一聲和第一聲",
          "options": [
            "第一聲和第一聲",
            "第二聲和第三聲",
            "第三聲和第四聲",
            "第四聲和第一聲"
          ]
        },
        {
          "qType": "reading",
          "passage": "小青蛙，呱呱呱，\n碧綠荷葉像小傘。\n坐在傘下唱著歌，\n撲通一聲跳下水。",
          "prompt": "📖 讀一讀兒歌回答問題：小青蛙把荷葉當成什麼？",
          "speakText": "讀一讀兒歌回答問題：小青蛙，呱呱呱，碧綠荷葉像小傘。坐在傘下唱著歌，撲通一聲跳下水。請問：小青蛙把荷葉當成什麼？",
          "icon": "🐸",
          "word": "🐸 兒歌小故事：小青蛙",
          "hint": "兒歌裡說：碧綠荷葉像小傘",
          "answer": "一把小傘",
          "options": [
            "一把小傘",
            "一條小船",
            "一張大床",
            "一個皮球"
          ]
        }
      ],
      "finalQuestions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：夏天冰涼消暑的「西瓜」，正確的拼音是哪一個？",
          "speakText": "多汁的大西瓜！仔細聽：西瓜！選出正確的拼音！",
          "icon": "🍉",
          "word": "🍉 西瓜",
          "hint": "西是一聲，瓜是一聲三拼結合音",
          "answer": "ㄒㄧ ㄍㄨㄚ",
          "options": [
            "ㄒㄧ ㄍㄨㄚ",
            "ㄒㄧ ㄍㄨㄚˇ",
            "ㄒㄧ ㄍㄚ",
            "ㄒㄧ ㄍㄨㄛ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：搖擺走路的極地動物「企鵝」，正確的拼音是哪一個？",
          "speakText": "搖搖擺擺的企鵝！仔細聽：企鵝！選出正確的拼音！",
          "icon": "🐧",
          "word": "🐧 企鵝",
          "hint": "企是第四聲，鵝是第二聲",
          "answer": "ㄑㄧˋ ㄜˊ",
          "options": [
            "ㄑㄧˋ ㄜˊ",
            "ㄐㄧˋ ㄜˊ",
            "ㄑㄧˋ ㄜ",
            "ㄑㄧ ㄜˊ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：水族箱裡游動的「金魚」，哪一個拼音完全正確？",
          "speakText": "游來游去的金魚！仔細聽：金魚！選出正確的注音！",
          "icon": "🐠",
          "word": "🐠 金魚",
          "hint": "金是前鼻音，魚是第二聲介音獨用",
          "answer": "ㄐㄧㄣ ㄩˊ",
          "options": [
            "ㄐㄧㄣ ㄩˊ",
            "ㄐㄧㄥ ㄩˊ",
            "ㄑㄧㄣ ㄩˊ",
            "ㄐㄧㄣ ㄨˊ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：森林裡的毛茸茸「小熊」，正確的拼音是哪一個？",
          "speakText": "可愛的小熊！仔細聽：小熊！選出正確的拼音！",
          "icon": "🐻",
          "word": "🐻 小熊",
          "hint": "熊是第二聲三拼結合韻",
          "answer": "ㄒㄧㄠˇ ㄒㄩㄥˊ",
          "options": [
            "ㄒㄧㄠˇ ㄒㄩㄥˊ",
            "ㄒㄧㄠˇ ㄒㄩㄣˊ",
            "ㄒㄧㄠ ㄒㄩㄥˊ",
            "ㄒㄧㄠˇ ㄒㄩㄥ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：黃色彎彎的水果「香蕉」，哪一個拼音完全正確？",
          "speakText": "甜甜的香蕉！仔細聽：香蕉！選出完全正確的拼音！",
          "icon": "🍌",
          "word": "🍌 香蕉",
          "hint": "兩個字都是第一聲三拼結合韻",
          "answer": "ㄒㄧㄤ ㄐㄧㄠ",
          "options": [
            "ㄒㄧㄤ ㄐㄧㄠ",
            "ㄒㄧㄢ ㄐㄧㄠ",
            "ㄒㄧㄤ ㄑㄧㄠ",
            "ㄒㄧㄤ ㄐㄧㄠˇ"
          ]
        }
      ]
    },
    {
      "id": 5,
      "name": "第五關：精靈湖畔",
      "subtitle": "介音與單韻母精靈",
      "icon": "🦢",
      "bossIcon": "🧚",
      "bossName": "湖畔水精靈",
      "color": "#20C997",
      "bgGradient": "linear-gradient(135deg, #E6FCF5, #C3FAE8)",
      "desc": "認識介音三寶，還有嘴巴張大、圓圓、微笑的單韻母精靈！",
      "questions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音辨字：嘴巴圓圓吐泡泡，請選出「小金魚」的「魚」注音符號！",
          "speakText": "小金魚游呀游！嘴巴撮圓圓：ㄩ，ㄩ！金魚的，ㄩ，ㄩ！請問是哪一個符號呢？",
          "icon": "🐠",
          "word": "🐠 金魚 → 「魚」的注音符號",
          "hint": "長得像一個開口朝上的小金魚缸",
          "answer": "ㄩ",
          "options": [
            "ㄩ",
            "ㄨ",
            "ㄧ",
            "ㄇ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選注音：「小烏龜」慢慢爬，「烏」是哪一個注音符號？",
          "speakText": "小烏龜背著殼！仔細聽：ㄨ，ㄨ！烏龜的，ㄨ，ㄨ！請問是哪一個符號呢？",
          "icon": "🐢",
          "word": "🐢 烏龜 → 「烏」的注音符號",
          "hint": "長得像圓圓的小屋頂，一筆撇折、二筆豎",
          "answer": "ㄨ",
          "options": [
            "ㄨ",
            "ㄩ",
            "ㄧ",
            "ㄛ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音挑戰：嘴巴張得大大發音，請聽老師唸，選出正確的單韻母！",
          "speakText": "嘴巴張得大大的：ㄚ，ㄚ！烏鴉跟小鴨韻母的，ㄚ，ㄚ！請問是哪一個符號呢？",
          "icon": "🦆",
          "word": "🦆 張大嘴巴的單韻母",
          "hint": "嘴巴張最大，長得像樹枝分叉的小樹杈",
          "answer": "ㄚ",
          "options": [
            "ㄚ",
            "ㄛ",
            "ㄜ",
            "ㄝ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：下列哪一個字是翹舌音「ㄕ」開頭？",
          "speakText": "段考選擇題：下列哪一個字是翹舌音ㄕ開頭呢？",
          "icon": "🌳",
          "word": "🌳 翹舌音聲母辨析",
          "hint": "樹木的樹：ㄕㄨˋ（舌尖翹起）",
          "answer": "樹木（ㄕㄨˋ）",
          "options": [
            "樹木（ㄕㄨˋ）",
            "雨傘（ㄙㄢˇ）",
            "森林（ㄙㄣ）",
            "毛巾（ㄐㄧㄣ）"
          ]
        },
        {
          "qType": "reading",
          "passage": "小花貓，照鏡子，\n鬍鬚翹翹真神氣。\n伸出爪子喵喵叫，\n鏡裡也有小花貓。",
          "prompt": "📖 讀一讀兒歌回答問題：鏡子裡面看到的是誰？",
          "speakText": "讀一讀兒歌回答問題：小花貓，照鏡子，鬍鬚翹翹真神氣。伸出爪子喵喵叫，鏡裡也有小花貓。請問：鏡子裡面看到的是誰？",
          "icon": "🐱",
          "word": "🐱 兒歌小故事：小花貓",
          "hint": "鏡子照出來的是小花貓自己喔",
          "answer": "小花貓自己",
          "options": [
            "小花貓自己",
            "一隻小黑狗",
            "可愛的小鳥",
            "美麗的蝴蝶"
          ]
        }
      ],
      "finalQuestions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：萬獸之王大「獅子」，正確的拼音是哪一個？",
          "speakText": "大獅子吼叫！仔細聽：獅子！選出正確的拼音！",
          "icon": "🦁",
          "word": "🦁 獅子",
          "hint": "注意翹舌音與輕聲的分辨",
          "answer": "ㄕ ˙ㄗ",
          "options": [
            "ㄕ ˙ㄗ",
            "ㄙ ˙ㄗ",
            "ㄕ ㄗ",
            "ㄕˊ ˙ㄗ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：鐵軌上跑的「火車」，正確的拼音是哪一個？",
          "speakText": "嘟嘟火車！仔細聽：火車！選出正確的拼音！",
          "icon": "🚂",
          "word": "🚂 火車",
          "hint": "車是翹舌音第一聲",
          "answer": "ㄏㄨㄛˇ ㄔㄜ",
          "options": [
            "ㄏㄨㄛˇ ㄔㄜ",
            "ㄏㄨㄛˇ ㄘㄜ",
            "ㄏㄨㄛ ㄔㄜ",
            "ㄏㄜˇ ㄔㄜ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：結網捕蟲的八腳「蜘蛛」，哪一個拼音完全正確？",
          "speakText": "屋簷下的蜘蛛！仔細聽：蜘蛛！選出正確的注音！",
          "icon": "🕷️",
          "word": "🕷️ 蜘蛛",
          "hint": "兩個字都是翹舌音第一聲",
          "answer": "ㄓ ㄓㄨ",
          "options": [
            "ㄓ ㄓㄨ",
            "ㄗ ㄗㄨ",
            "ㄓ ㄗㄨ",
            "ㄓˊ ㄓㄨ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：天空發光發熱的「太陽」，正確的拼音是哪一個？",
          "speakText": "暖洋洋的太陽！仔細聽：太陽！選出正確的拼音！",
          "icon": "☀️",
          "word": "☀️ 太陽",
          "hint": "太是第四聲，陽是第二聲後鼻音",
          "answer": "ㄊㄞˋ ㄧㄤˊ",
          "options": [
            "ㄊㄞˋ ㄧㄤˊ",
            "ㄊㄞˋ ㄧㄤ",
            "ㄊㄞ ㄧㄤˊ",
            "ㄉㄞˋ ㄧㄤˊ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：泡茶熱水用的「茶壺」，哪一個拼音完全正確？",
          "speakText": "泡好茶的茶壺！仔細聽：茶壺！選出完全正確的拼音！",
          "icon": "🫖",
          "word": "🫖 茶壺",
          "hint": "茶是翹舌音第二聲，壺是第二聲",
          "answer": "ㄔㄚˊ ㄏㄨˊ",
          "options": [
            "ㄔㄚˊ ㄏㄨˊ",
            "ㄘㄚˊ ㄏㄨˊ",
            "ㄔㄚ ㄏㄨˊ",
            "ㄔㄚˊ ㄈㄨˊ"
          ]
        }
      ]
    },
    {
      "id": 6,
      "name": "第六關：彩虹吊橋",
      "subtitle": "複韻母與鼻韻母大考驗",
      "icon": "🌈",
      "bossIcon": "🦄",
      "bossName": "彩虹獨角獸",
      "color": "#845EF7",
      "bgGradient": "linear-gradient(135deg, #F3F0FF, #E5DBFF)",
      "desc": "仔細聽尾音與摩托車發動鼻音，分辨複韻母與閃電鼻韻母！",
      "questions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音辨字：仔細聽老師唸的韻母，選出「飛高高、水杯」的韻母！",
          "speakText": "仔細聽：ㄟ，ㄟ！飛機的飛、水杯的杯裡面的韻母，ㄟ，ㄟ！是哪一個呢？",
          "icon": "🍓",
          "word": "✈️ 飛 / 🥛 杯 → 共同的韻母",
          "hint": "一筆撇、二筆捺，長得像溜滑梯一樣（共 2 畫）",
          "answer": "ㄟ",
          "options": [
            "ㄟ",
            "ㄞ",
            "ㄠ",
            "ㄡ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 鼻音對決：「打雷閃電」的「閃」，後面的韻母是哪一個？",
          "speakText": "轟隆隆閃電來了！閃電的閃，ㄕ、ㄢ、三聲，閃！請問韻母是哪一個呢？",
          "icon": "⚡",
          "word": "⚡ 閃電 → 「閃」的韻母",
          "hint": "最後舌尖頂住上排牙齒後面的前鼻音，長得像小皇冠",
          "answer": "ㄢ",
          "options": [
            "ㄢ",
            "ㄤ",
            "ㄣ",
            "ㄥ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 鼻音對決：「甜糖果」的「糖」，後面的韻母是哪一個？",
          "speakText": "甜甜的糖果！糖果的糖，ㄊ、ㄤ、二聲，糖！嘴巴張大有後鼻音，是哪一個韻母？",
          "icon": "🍬",
          "word": "🍬 糖果 → 「糖」的韻母",
          "hint": "嘴巴張大共鳴的後鼻音，長得像小板凳加一條腿",
          "answer": "ㄤ",
          "options": [
            "ㄤ",
            "ㄢ",
            "ㄥ",
            "ㄣ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：「草莓」的「草」，正確的聲調是哪一個？",
          "speakText": "段考選擇題：草莓的草，正確的聲調是哪一個呢？",
          "icon": "🍓",
          "word": "🍓 聲調符號判斷",
          "hint": "草是第三聲：ㄘㄠˇ（轉個彎打勾）",
          "answer": "第三聲（ˇ）",
          "options": [
            "第三聲（ˇ）",
            "第一聲（無標號）",
            "第二聲（ˊ）",
            "第四聲（ˋ）"
          ]
        },
        {
          "qType": "reading",
          "passage": "小黃狗，看家門，\n搖搖尾巴迎客人。\n生人走近汪汪叫，\n保護主人最忠心。",
          "prompt": "📖 讀一讀兒歌回答問題：小黃狗看到陌生人會怎麼做？",
          "speakText": "讀一讀兒歌回答問題：小黃狗，看家門，搖搖尾巴迎客人。生人走近汪汪叫，保護主人最忠心。請問：小黃狗看到陌生人會怎麼做？",
          "icon": "🐕",
          "word": "🐕 兒歌小故事：小黃狗",
          "hint": "兒歌裡說：生人走近汪汪叫，保護主人最忠心",
          "answer": "汪汪叫保護主人",
          "options": [
            "汪汪叫保護主人",
            "跑去睡大覺",
            "跳到沙發上",
            "出門散步去"
          ]
        }
      ],
      "finalQuestions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：下雨天出門撐的「雨傘」，正確的拼音是哪一個？",
          "speakText": "下雨天撐雨傘！仔細聽：雨傘！選出正確的拼音！",
          "icon": "☂️",
          "word": "☂️ 雨傘",
          "hint": "注意平舌音與第三聲轉彎",
          "answer": "ㄩˇ ㄙㄢˇ",
          "options": [
            "ㄩˇ ㄙㄢˇ",
            "ㄩˇ ㄕㄢˇ",
            "ㄩ ㄙㄢˇ",
            "ㄩˇ ㄙㄢ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：酸甜紅潤的「草莓」，正確的拼音是哪一個？",
          "speakText": "甜美紅草莓！仔細聽：草莓！選出正確的拼音！",
          "icon": "🍓",
          "word": "🍓 草莓",
          "hint": "草是平舌音第三聲，莓是第二聲",
          "answer": "ㄘㄠˇ ㄇㄟˊ",
          "options": [
            "ㄘㄠˇ ㄇㄟˊ",
            "ㄔㄠˇ ㄇㄟˊ",
            "ㄘㄠ ㄇㄟˊ",
            "ㄘㄠˇ ㄇㄟ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：樹上抱松果的大尾巴「松鼠」，哪一個拼音完全正確？",
          "speakText": "樹上的小松鼠！仔細聽：松鼠！選出正確的注音！",
          "icon": "🐿️",
          "word": "🐿️ 松鼠",
          "hint": "松是平舌音，鼠是翹舌音第三聲",
          "answer": "ㄙㄨㄥ ㄕㄨˇ",
          "options": [
            "ㄙㄨㄥ ㄕㄨˇ",
            "ㄕㄨㄥ ㄕㄨˇ",
            "ㄙㄨㄥ ㄙㄨˇ",
            "ㄙㄨㄥ ㄕㄨ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：代步騎乘的「自行車」，正確的拼音是哪一個？",
          "speakText": "快樂騎自行車！仔細聽：自行車！選出正確的拼音！",
          "icon": "🚲",
          "word": "🚲 自行車",
          "hint": "自是平舌第四聲，車是翹舌第一聲",
          "answer": "ㄗˋ ㄒㄧㄥˊ ㄔㄜ",
          "options": [
            "ㄗˋ ㄒㄧㄥˊ ㄔㄜ",
            "ㄓˋ ㄒㄧㄥˊ ㄔㄜ",
            "ㄗˋ ㄒㄧㄣˊ ㄔㄜ",
            "ㄗˋ ㄒㄧㄥˊ ㄘㄜ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：一串串圓圓甜甜的「紫葡萄」，哪一個拼音完全正確？",
          "speakText": "甜甜的紫葡萄！仔細聽：紫葡萄！選出完全正確的注音！",
          "icon": "🍇",
          "word": "🍇 紫葡萄",
          "hint": "紫是平舌音第三聲，萄是輕聲",
          "answer": "ㄗˇ ㄆㄨˊ ˙ㄊㄠ",
          "options": [
            "ㄗˇ ㄆㄨˊ ˙ㄊㄠ",
            "ㄓˇ ㄆㄨˊ ˙ㄊㄠ",
            "ㄗˇ ㄆㄨˊ ㄊㄠˊ",
            "ㄗˇ ㄅㄨˊ ˙ㄊㄠ"
          ]
        }
      ]
    },
    {
      "id": 7,
      "name": "第七關：雲霄飛車",
      "subtitle": "四聲調值聽力大冒險",
      "icon": "🎢",
      "bossIcon": "🐼",
      "bossName": "功夫貓熊阿寶",
      "color": "#F06595",
      "bgGradient": "linear-gradient(135deg, #FFF0F6, #FFDEEB)",
      "desc": "一聲平、二聲揚、三聲轉彎、四聲溜滑梯！聽聲音猜出正確聲調！",
      "questions": [
        {
          "qType": "tone_pick",
          "prompt": "🎢 聲調神射手：聽老師唸「太陽」的「太」，請問是第幾聲？",
          "speakText": "聽聽看！太陽的「太」，太～！高高往下衝，請問是第幾聲呢？",
          "icon": "☀️",
          "word": "☀️ 太陽 → 「太」是第幾聲？",
          "hint": "像溜滑梯一樣從高高的地方往下衝！",
          "answer": "第四聲 ˋ",
          "options": [
            "第一聲 ˉ",
            "第二聲 ˊ",
            "第三聲 ˇ",
            "第四聲 ˋ"
          ]
        },
        {
          "qType": "tone_pick",
          "prompt": "🎢 聲調神射手：聽老師唸「拔蘿蔔」的「拔」，請問是第幾聲？",
          "speakText": "嘿呦嘿呦拔蘿蔔！請問「拔」蘿蔔的「拔」，拔～！聲音往上爬，是第幾聲呢？",
          "icon": "🥕",
          "word": "🥕 拔蘿蔔 → 「拔」是第幾聲？",
          "hint": "像小汽車往上爬山坡一樣，聲音往上升！",
          "answer": "第二聲 ˊ",
          "options": [
            "第一聲 ˉ",
            "第二聲 ˊ",
            "第三聲 ˇ",
            "第四聲 ˋ"
          ]
        },
        {
          "qType": "tone_pick",
          "prompt": "🎢 聲調神射手：聽老師唸「小鳥」的「鳥」，請問是第幾聲？",
          "speakText": "小鳥在唱歌！請問小「鳥」的「鳥」，鳥～！聲音先往下再往上轉彎，是第幾聲呢？",
          "icon": "🐦",
          "word": "🐦 小鳥 → 「鳥」是第幾聲？",
          "hint": "像雲霄飛車轉個彎，符號像一個小勾勾！",
          "answer": "第三聲 ˇ",
          "options": [
            "第一聲 ˉ",
            "第二聲 ˊ",
            "第三聲 ˇ",
            "第四聲 ˋ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：在注音拼音中，下列哪一個是「介音」？",
          "speakText": "段考選擇題：在注音拼音中，下列哪一個是介音呢？",
          "icon": "🌉",
          "word": "🌉 介音三人組判斷",
          "hint": "介音只有三個：ㄧ、ㄨ、ㄩ",
          "answer": "ㄨ（烏）",
          "options": [
            "ㄨ（烏）",
            "ㄅ（玻）",
            "ㄍ（哥）",
            "ㄇ（摸）"
          ]
        },
        {
          "qType": "reading",
          "passage": "彩虹橋，天邊掛，\n紅橙黃綠青藍紫。\n雨過天晴照大地，\n美麗天空笑瞇瞇。",
          "prompt": "📖 讀一讀兒歌回答問題：彩虹通常什麼時候出現在天空？",
          "speakText": "讀一讀兒歌回答問題：彩虹橋，天邊掛，紅橙黃綠青藍紫。雨過天晴照大地，美麗天空笑瞇瞇。請問：彩虹通常什麼時候出現在天空？",
          "icon": "🌈",
          "word": "🌈 兒歌小故事：彩虹橋",
          "hint": "兒歌裡說：雨過天晴照大地",
          "answer": "雨過天晴的時候",
          "options": [
            "雨過天晴的時候",
            "寒冷的冬天早晨",
            "漆黑的大半夜",
            "狂風暴雨的時候"
          ]
        }
      ],
      "finalQuestions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：晚上高掛夜空的「月亮」，正確的拼音是哪一個？",
          "speakText": "夜空中的月亮！仔細聽：月亮！選出正確的拼音！",
          "icon": "🌙",
          "word": "🌙 月亮",
          "hint": "月是第四聲結合韻，亮在詞尾唸輕聲",
          "answer": "ㄩㄝˋ ˙ㄌㄧㄤ",
          "options": [
            "ㄩㄝˋ ˙ㄌㄧㄤ",
            "ㄧㄝˋ ˙ㄌㄧㄤ",
            "ㄩㄝˋ ㄌㄧㄤˋ",
            "ㄩㄝ ˙ㄌㄧㄤ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：池塘裡呱呱游的「小鴨」，正確的拼音是哪一個？",
          "speakText": "池塘裡的小鴨！仔細聽：小鴨！選出正確的拼音！",
          "icon": "🦆",
          "word": "🦆 小鴨",
          "hint": "小是第三聲三拼，鴨是第一聲結合韻",
          "answer": "ㄒㄧㄠˇ ㄧㄚ",
          "options": [
            "ㄒㄧㄠˇ ㄧㄚ",
            "ㄒㄧㄠˇ ㄧㄚˇ",
            "ㄒㄧㄠ ㄧㄚ",
            "ㄒㄧㄠˇ ㄨㄚ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：游來游去的水中「小魚」，哪一個拼音完全正確？",
          "speakText": "水裡游的小魚！仔細聽：小魚！選出正確的注音！",
          "icon": "🐟",
          "word": "🐟 小魚",
          "hint": "魚是第二聲介音獨立成音",
          "answer": "ㄒㄧㄠˇ ㄩˊ",
          "options": [
            "ㄒㄧㄠˇ ㄩˊ",
            "ㄒㄧㄠˇ ㄨˊ",
            "ㄒㄧㄠ ㄩˊ",
            "ㄒㄧㄠˇ ㄩ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：背著殼慢慢爬的「蝸牛」，正確的拼音是哪一個？",
          "speakText": "慢慢爬的蝸牛！仔細聽：蝸牛！選出正確的拼音！",
          "icon": "🐌",
          "word": "🐌 蝸牛",
          "hint": "蝸是一聲三拼，牛是二聲二拼音",
          "answer": "ㄍㄨㄚ ㄋㄧㄡˊ",
          "options": [
            "ㄍㄨㄚ ㄋㄧㄡˊ",
            "ㄍㄨㄚ ㄌㄧㄡˊ",
            "ㄍㄨㄚ ㄋㄧㄡ",
            "ㄍㄚ ㄋㄧㄡˊ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：寫字畫畫用的工具「鉛筆」，哪一個拼音完全正確？",
          "speakText": "削尖尖的鉛筆！仔細聽：鉛筆！選出完全正確的拼音！",
          "icon": "✏️",
          "word": "✏️ 鉛筆",
          "hint": "鉛是一聲前鼻音，筆是第三聲轉彎",
          "answer": "ㄑㄧㄢ ㄅㄧˇ",
          "options": [
            "ㄑㄧㄢ ㄅㄧˇ",
            "ㄐㄧㄢ ㄅㄧˇ",
            "ㄑㄧㄢ ㄉㄧˇ",
            "ㄑㄧㄢ ㄅㄧ"
          ]
        }
      ]
    },
    {
      "id": 8,
      "name": "第八關：魔法火車站",
      "subtitle": "兩拼合音列車長",
      "icon": "🚂",
      "bossIcon": "🦉",
      "bossName": "貓頭鷹站長",
      "color": "#FD7E14",
      "bgGradient": "linear-gradient(135deg, #FFF4E6, #FFE8CC)",
      "desc": "聽老師拼讀或看圖案，把聲母車廂和韻母車廂拼在一起！",
      "questions": [
        {
          "qType": "blend_pick",
          "prompt": "🚂 聽音拼讀：聽老師把兩個注音拼起來，請問拼出哪一個國字？",
          "speakText": "跟著火車聽聽看：ㄅ，ㄚ，一聲，八！八個蘋果的八！請問是哪一個組合呢？",
          "icon": "🍎",
          "word": "🍎 8 個蘋果 → 「八」",
          "hint": "收音機聲母 ＋ 張大嘴單韻母 ＝ 八",
          "answer": "八 (ㄅㄚ)",
          "options": [
            "八 (ㄅㄚ)",
            "爸 (ㄅㄚˋ)",
            "媽 (ㄇㄚ)",
            "大 (ㄉㄚˋ)"
          ]
        },
        {
          "qType": "blend_pick",
          "prompt": "🚂 看圖拼注音：要拼出「小貓咪」的「貓」，應該用哪兩個注音符號？",
          "speakText": "小貓咪的「貓」，ㄇ、ㄠ，貓！請問要用哪兩個注音符號拼起來呢？",
          "icon": "🐱",
          "word": "🐱 貓咪 → 「貓」怎麼拼？",
          "hint": "小山洞聲母 ＋ 複韻母",
          "answer": "ㄇ ＋ ㄠ",
          "options": [
            "ㄇ ＋ ㄠ",
            "ㄇ ＋ ㄡ",
            "ㄅ ＋ ㄠ",
            "ㄈ ＋ ㄠ"
          ]
        },
        {
          "qType": "blend_pick",
          "prompt": "🚂 看圖拼注音：操場「跑步」的「跑」，正確的注音是哪一個？",
          "speakText": "操場跑步囉！跑步的「跑」，ㄆ、ㄠ、三聲，跑！請選出正確的注音！",
          "icon": "🏃",
          "word": "🏃 跑步 → 「跑」的完整注音",
          "hint": "小水盆聲母 ＋ 複韻母 ＋ 第三聲打勾",
          "answer": "ㄆㄠˇ",
          "options": [
            "ㄆㄠˇ",
            "ㄅㄠˇ",
            "ㄊㄠˇ",
            "ㄆㄡˇ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：「白鵝」的「鵝」，注音符號是哪一個？",
          "speakText": "段考選擇題：白鵝的鵝，注音符號是哪一個呢？",
          "icon": "🦢",
          "word": "🦢 單韻母辨析",
          "hint": "鵝是單韻母ㄜ，第二聲向上爬：ㄜˊ",
          "answer": "ㄜˊ（二聲）",
          "options": [
            "ㄜˊ（二聲）",
            "ㄚˊ（二聲）",
            "ㄛˊ（二聲）",
            "ㄝˊ（二聲）"
          ]
        },
        {
          "qType": "reading",
          "passage": "小金魚，水中游，\n搖搖尾巴吐泡泡。\n穿上紅色亮衣裳，\n快快樂樂游大海。",
          "prompt": "📖 讀一讀兒歌回答問題：小金魚在水裡會吐出什麼？",
          "speakText": "讀一讀兒歌回答問題：小金魚，水中游，搖搖尾巴吐泡泡。穿上紅色亮衣裳，快快樂樂游大海。請問：小金魚在水裡會吐出什麼？",
          "icon": "🐟",
          "word": "🐟 兒歌小故事：小金魚",
          "hint": "兒歌裡說：搖搖尾巴吐泡泡",
          "answer": "圓圓的泡泡",
          "options": [
            "圓圓的泡泡",
            "七彩的小石子",
            "美麗的花瓣",
            "美味的水果"
          ]
        }
      ],
      "finalQuestions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：稻田裡跳躍的綠色「青蛙」，正確的拼音是哪一個？",
          "speakText": "池塘邊的青蛙！仔細聽：青蛙！選出正確的拼音！",
          "icon": "🐸",
          "word": "🐸 青蛙",
          "hint": "青是一聲後鼻音，蛙是一聲三拼",
          "answer": "ㄑㄧㄥ ㄨㄚ",
          "options": [
            "ㄑㄧㄥ ㄨㄚ",
            "ㄑㄧㄣ ㄨㄚ",
            "ㄐㄧㄥ ㄨㄚ",
            "ㄑㄧㄥ ㄨㄚˇ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：破曉啼鳴的大「公雞」，正確的拼音是哪一個？",
          "speakText": "早起的大公雞！仔細聽：公雞！選出正確的拼音！",
          "icon": "🐓",
          "word": "🐓 公雞",
          "hint": "公是後鼻音，雞是一聲平音",
          "answer": "ㄍㄨㄥ ㄐㄧ",
          "options": [
            "ㄍㄨㄥ ㄐㄧ",
            "ㄍㄨㄥ ㄐㄧˇ",
            "ㄎㄨㄥ ㄐㄧ",
            "ㄍㄨㄥ ㄑㄧ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：湖面上優雅浮水的「白鵝」，哪一個拼音完全正確？",
          "speakText": "優雅的大白鵝！仔細聽：白鵝！選出正確的注音！",
          "icon": "🪿",
          "word": "🪿 白鵝",
          "hint": "白是第二聲二拼，鵝是第二聲單韻母",
          "answer": "ㄅㄞˊ ㄜˊ",
          "options": [
            "ㄅㄞˊ ㄜˊ",
            "ㄅㄞˊ ㄜ",
            "ㄅㄞ ㄜˊ",
            "ㄆㄞˊ ㄜˊ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：晴朗藍天飄浮的「白雲」，正確的拼音是哪一個？",
          "speakText": "藍天上的白雲！仔細聽：白雲！選出正確的拼音！",
          "icon": "☁️",
          "word": "☁️ 白雲",
          "hint": "雲是第二聲結合韻前鼻音",
          "answer": "ㄅㄞˊ ㄩㄣˊ",
          "options": [
            "ㄅㄞˊ ㄩㄣˊ",
            "ㄅㄞˊ ㄩㄥˊ",
            "ㄅㄞˊ ㄩㄣ",
            "ㄆㄞˊ ㄩㄣˊ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：荷花底下圓圓的大「荷葉」，哪一個拼音完全正確？",
          "speakText": "池塘裡圓圓的荷葉！仔細聽：荷葉！選出完全正確的拼音！",
          "icon": "🪷",
          "word": "🪷 荷葉",
          "hint": "荷是二聲，葉是四聲結合韻",
          "answer": "ㄏㄜˊ ㄧㄝˋ",
          "options": [
            "ㄏㄜˊ ㄧㄝˋ",
            "ㄏㄜˊ ㄩㄝˋ",
            "ㄏㄜ ㄧㄝˋ",
            "ㄜˊ ㄧㄝˋ"
          ]
        }
      ]
    },
    {
      "id": 9,
      "name": "第九關：水晶城堡",
      "subtitle": "結合韻與三拼大挑戰",
      "icon": "🏰",
      "bossIcon": "🧙‍♂️",
      "bossName": "水晶大法師",
      "color": "#15AABF",
      "bgGradient": "linear-gradient(135deg, #E3FAFC, #C5F6FA)",
      "desc": "挑戰「聲母＋介音＋韻母」三拼魔法，突破結合韻難關！",
      "questions": [
        {
          "qType": "blend_pick",
          "prompt": "🏰 三拼魔法：要拼出「大西瓜」的「瓜」，正確的三拼注音是？",
          "speakText": "三拼挑戰！大西瓜的「瓜」，ㄍ、ㄨ、ㄚ，瓜！請選出正確的組合！",
          "icon": "🍉",
          "word": "🍉 西瓜 → 「瓜」的三拼注音",
          "hint": "大哥哥聲母 ＋ 烏龜介音 ＋ 張大嘴單韻母",
          "answer": "ㄍㄨㄚ",
          "options": [
            "ㄍㄨㄚ",
            "ㄏㄨㄚ",
            "ㄎㄨㄚ",
            "ㄐㄧㄚ"
          ]
        },
        {
          "qType": "blend_pick",
          "prompt": "🏰 看圖選介音：「花朵」的「花」是三拼字，請問中間躲著哪一個介音？",
          "speakText": "花朵的「花」，ㄏ、ㄨ、ㄚ，花！仔細聽中間那個音：ㄨ！請問中間是哪一個介音呢？",
          "icon": "🌸",
          "word": "🌸 花朵 → 「花」中間的介音",
          "hint": "嘴巴嘟起來像小烏龜屋頂的介音符號",
          "answer": "ㄨ",
          "options": [
            "ㄨ",
            "ㄧ",
            "ㄩ",
            "ㄛ"
          ]
        },
        {
          "qType": "blend_pick",
          "prompt": "🏰 看圖選三拼：猴子愛吃「香蕉」，請問「香」的三拼注音是哪一個？",
          "speakText": "猴子愛吃香蕉！香蕉的「香」，ㄒ、ㄧ、ㄤ，香！是後鼻音，請選出正確注音！",
          "icon": "🍌",
          "word": "🍌 香蕉 → 「香」的三拼注音",
          "hint": "切開西瓜的聲母 ＋ 衣服的介音 ＋ 糖果的後鼻音韻母",
          "answer": "ㄒㄧㄤ",
          "options": [
            "ㄒㄧㄤ",
            "ㄒㄧㄢ",
            "ㄑㄧㄤ",
            "ㄕㄤ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：下列哪一組字都是「後鼻音 ㄥ」的拼音？",
          "speakText": "段考選擇題：下列哪一組字都是後鼻音ㄥ的拼音呢？",
          "icon": "💎",
          "word": "💎 前後鼻音判斷",
          "hint": "風（ㄈㄥ）和星（ㄒㄧㄥ）都是後鼻音 ㄥ",
          "answer": "風（ㄈㄥ）和星（ㄒㄧㄥ）",
          "options": [
            "風（ㄈㄥ）和星（ㄒㄧㄥ）",
            "心（ㄒㄧㄣ）和金（ㄐㄧㄣ）",
            "山（ㄕㄢ）和天（ㄊㄧㄢ）",
            "分（ㄈㄣ）和門（ㄇㄣˊ）"
          ]
        },
        {
          "qType": "reading",
          "passage": "中秋夜，月兒圓，\n全家團聚吃柚子。\n聞著陣陣桂花香，\n月餅甜甜心歡喜。",
          "prompt": "📖 讀一讀兒歌回答問題：中秋節晚上大家團聚吃什麼水果？",
          "speakText": "讀一讀兒歌回答問題：中秋夜，月兒圓，全家團聚吃柚子。聞著陣陣桂花香，月餅甜甜心歡喜。請問：中秋節晚上大家團聚吃什麼水果？",
          "icon": "🥮",
          "word": "🥮 兒歌小故事：中秋節",
          "hint": "兒歌裡說：全家團聚吃柚子",
          "answer": "香甜的柚子",
          "options": [
            "香甜的柚子",
            "紅紅的大西瓜",
            "酸酸的檸檬",
            "綠色的香蕉"
          ]
        }
      ],
      "finalQuestions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：草地上逆風飛高高的「風箏」，正確的拼音是哪一個？",
          "speakText": "天上的風箏！仔細聽：風箏！選出正確的拼音！",
          "icon": "🪁",
          "word": "🪁 風箏",
          "hint": "兩個字都是後鼻音，箏是翹舌音",
          "answer": "ㄈㄥ ㄓㄥ",
          "options": [
            "ㄈㄥ ㄓㄥ",
            "ㄈㄥ ㄗㄥ",
            "ㄏㄨㄥ ㄓㄥ",
            "ㄈㄥ ㄓㄣ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：雨後天邊七彩的「彩虹」，正確的拼音是哪一個？",
          "speakText": "七彩美麗的彩虹！仔細聽：彩虹！選出正確的拼音！",
          "icon": "🌈",
          "word": "🌈 彩虹",
          "hint": "彩是平舌音第三聲，虹是第二聲後鼻音",
          "answer": "ㄘㄞˇ ㄏㄨㄥˊ",
          "options": [
            "ㄘㄞˇ ㄏㄨㄥˊ",
            "ㄔㄞˇ ㄏㄨㄥˊ",
            "ㄘㄞ ㄏㄨㄥˊ",
            "ㄘㄞˇ ㄏㄨㄥ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：樹枝上啼叫的可愛「小鳥」，哪一個拼音完全正確？",
          "speakText": "樹上的小鳥！仔細聽：小鳥！選出正確的注音！",
          "icon": "🐦",
          "word": "🐦 小鳥",
          "hint": "鳥是鼻音聲母加上第三聲三拼",
          "answer": "ㄒㄧㄠˇ ㄋㄧㄠˇ",
          "options": [
            "ㄒㄧㄠˇ ㄋㄧㄠˇ",
            "ㄒㄧㄠˇ ㄌㄧㄠˇ",
            "ㄒㄧㄠ ㄋㄧㄠˇ",
            "ㄒㄧㄠˇ ㄋㄧㄠ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：大海邊飛翔叫喚的「海鷗」，正確的拼音是哪一個？",
          "speakText": "海邊的海鷗！仔細聽：海鷗！選出正確的拼音！",
          "icon": "🕊️",
          "word": "🕊️ 海鷗",
          "hint": "海是第三聲，鷗是第一聲複韻母",
          "answer": "ㄏㄞˇ ㄡ",
          "options": [
            "ㄏㄞˇ ㄡ",
            "ㄏㄞˇ ㄡˇ",
            "ㄏㄞ ㄡ",
            "ㄞˇ ㄡ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：向著陽光綻放的「向日葵」，哪一個拼音完全正確？",
          "speakText": "金色向日葵！仔細聽：向日葵！選出完全正確的拼音！",
          "icon": "🌻",
          "word": "🌻 向日葵",
          "hint": "向是四聲後鼻音，日是翹舌四聲，葵是二聲三拼",
          "answer": "ㄒㄧㄤˋ ㄖˋ ㄎㄨㄟˊ",
          "options": [
            "ㄒㄧㄤˋ ㄖˋ ㄎㄨㄟˊ",
            "ㄒㄧㄤˋ ㄖˋ ㄍㄨㄟˊ",
            "ㄒㄧㄤˋ ㄗˋ ㄎㄨㄟˊ",
            "ㄒㄧㄤ ㄖˋ ㄎㄨㄟˊ"
          ]
        }
      ]
    },
    {
      "id": 10,
      "name": "第十關：魔王寶藏島",
      "subtitle": "注音大魔王終極試煉 🏆",
      "icon": "👑",
      "bossIcon": "🐲",
      "bossName": "黃金注音巨龍",
      "color": "#FA5252",
      "bgGradient": "linear-gradient(135deg, #FFE3E3, #FFC9C9)",
      "desc": "集結全島所學！打敗黃金注音巨龍，奪得「注音大勇者」最高榮耀王冠！",
      "questions": [
        {
          "qType": "pic_pick",
          "prompt": "👑 魔王第 1 擊：花園裡的「蝴蝶」，請問「蝶」的注音是哪一個？",
          "speakText": "終極試煉開始！美麗的蝴蝶，請問蝴蝶的「蝶」，ㄉ、ㄧ、ㄝ、二聲，蝶！是哪一個注音？",
          "icon": "🦋",
          "word": "🦋 蝴蝶 → 「蝶」的完整注音",
          "hint": "小馬蹄聲母 ＋ 衣服介音 ＋ 微笑韻母 ＋ 二聲",
          "answer": "ㄉㄧㄝˊ",
          "options": [
            "ㄉㄧㄝˊ",
            "ㄊㄧㄝˊ",
            "ㄉㄟˊ",
            "ㄌㄧㄝˊ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "👑 魔王第 2 擊：南極的「企鵝」，請問「企」跟「鵝」分別是第幾聲？",
          "speakText": "南極的小企鵝！仔細聽聲調：「企」，往下衝；「鵝」，往上爬！請問分別是幾聲呢？",
          "icon": "🐧",
          "word": "🐧 企鵝 → 兩個字的聲調組合",
          "hint": "第一個字溜滑梯往下衝，第二個字爬山坡往上揚！",
          "answer": "四聲 與 二聲",
          "options": [
            "四聲 與 二聲",
            "一聲 與 二聲",
            "三聲 與 四聲",
            "四聲 與 三聲"
          ]
        },
        {
          "qType": "blend_pick",
          "prompt": "👑 魔王第 3 擊：「黃金巨龍」的「龍」，正確的注音是哪一個？",
          "speakText": "黃金巨龍出題了！恐龍跟巨龍的「龍」，ㄌ、ㄨ、ㄥ、二聲，龍！請選出正確注音！",
          "icon": "🐲",
          "word": "🐲 巨龍 → 「龍」的完整注音",
          "hint": "小鈴鐺聲母 ＋ 烏龜介音 ＋ 後鼻音 ＋ 二聲",
          "answer": "ㄌㄨㄥˊ",
          "options": [
            "ㄌㄨㄥˊ",
            "ㄋㄨㄥˊ",
            "ㄌㄨㄣˊ",
            "ㄖㄨㄥˊ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：「跳繩」這兩個字的注音，分別包含幾個注音符號？",
          "speakText": "段考選擇題：跳繩這兩個字的注音，分別包含幾個注音符號呢？",
          "icon": "👑",
          "word": "👑 拼音綜合考核",
          "hint": "跳是 ㄊ-ㄧ-ㄠˋ（三拼），繩是 ㄕ-ㄥˊ（雙拼）",
          "answer": "跳是三拼音，繩是雙拼音",
          "options": [
            "跳是三拼音，繩是雙拼音",
            "跳是雙拼音，繩是單音",
            "兩個字都是三拼音",
            "兩個字都是單音"
          ]
        },
        {
          "qType": "reading",
          "passage": "注音符號三十七，\n聲母韻母手牽手。\n拼出世界好故事，\n成為閱讀小博士。",
          "prompt": "📖 讀一讀兒歌回答問題：學會注音符號能幫助我們做什麼？",
          "speakText": "讀一讀兒歌回答問題：注音符號三十七，聲母韻母手牽手。拼出世界好故事，成為閱讀小博士。請問：學會注音符號能幫助我們做什麼？",
          "icon": "🏆",
          "word": "🏆 兒歌小故事：注音小博士",
          "hint": "兒歌裡說：拼出世界好故事，成為閱讀小博士",
          "answer": "拼讀故事成為閱讀博士",
          "options": [
            "拼讀故事成為閱讀博士",
            "天天在床上睡大搞",
            "只會看電視玩遊戲",
            "忘記所有的好朋友"
          ]
        }
      ],
      "finalQuestions": [
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：體育課大家一起玩的「跳繩」，正確的拼音是哪一個？",
          "speakText": "運動跳繩！仔細聽：跳繩！選出正確的拼音！",
          "icon": "🪢",
          "word": "🪢 跳繩",
          "hint": "跳是四聲三拼，繩是翹舌音第二聲後鼻音",
          "answer": "ㄊㄧㄠˋ ㄕㄥˊ",
          "options": [
            "ㄊㄧㄠˋ ㄕㄥˊ",
            "ㄊㄧㄠˋ ㄙㄥˊ",
            "ㄉㄧㄠˋ ㄕㄥˊ",
            "ㄊㄧㄠˋ ㄕㄣˊ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：花叢中翩翩起舞的「蝴蝶」，正確的拼音是哪一個？",
          "speakText": "花間飛舞的蝴蝶！仔細聽：蝴蝶！選出正確的拼音！",
          "icon": "🦋",
          "word": "🦋 蝴蝶",
          "hint": "兩個字都是第二聲往上爬",
          "answer": "ㄏㄨˊ ㄉㄧㄝˊ",
          "options": [
            "ㄏㄨˊ ㄉㄧㄝˊ",
            "ㄈㄨˊ ㄉㄧㄝˊ",
            "ㄏㄨˊ ㄉㄧㄝ",
            "ㄏㄨˊ ㄉㄧㄝˇ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "🎧 聽音選詞：公園遊樂場好玩的「溜滑梯」，哪一個拼音完全正確？",
          "speakText": "公園裡的溜滑梯！仔細聽：溜滑梯！選出正確的注音！",
          "icon": "🛝",
          "word": "🛝 溜滑梯",
          "hint": "溜是一聲，滑是二聲三拼，梯是一聲",
          "answer": "ㄌㄧㄡ ㄏㄨㄚˊ ㄊㄧ",
          "options": [
            "ㄌㄧㄡ ㄏㄨㄚˊ ㄊㄧ",
            "ㄋㄧㄡ ㄏㄨㄚˊ ㄊㄧ",
            "ㄌㄧㄡ ㄏㄨㄚ ㄊㄧ",
            "ㄌㄧㄡ ㄏㄨㄚˊ ㄉㄧ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：公園裡有荷花與小鴨的「水池」，正確的拼音是哪一個？",
          "speakText": "公園裡的大水池！仔細聽：水池！選出正確的拼音！",
          "icon": "🏞️",
          "word": "🏞️ 水池",
          "hint": "水與池都是翹舌音，水是三聲，池是二聲",
          "answer": "ㄕㄨㄟˇ ㄔˊ",
          "options": [
            "ㄕㄨㄟˇ ㄔˊ",
            "ㄕㄨㄟˇ ㄘˊ",
            "ㄙㄨㄟˇ ㄔˊ",
            "ㄙㄨㄟˇ ㄘˊ"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "👑 終極聯盟大考查：「台灣最棒」的注音拼音，哪一個完全正確？",
          "speakText": "台灣最棒！仔細聽：台灣最棒！選出完全正確的注音拼音！",
          "icon": "🏆",
          "word": "🏆 台灣最棒",
          "hint": "最是平舌音第四聲，棒是第四聲後鼻音",
          "answer": "ㄊㄞˊ ㄨㄢ ㄗㄨㄟˋ ㄅㄤˋ",
          "options": [
            "ㄊㄞˊ ㄨㄢ ㄗㄨㄟˋ ㄅㄤˋ",
            "ㄊㄞˊ ㄨㄢ ㄓㄨㄟˋ ㄅㄤˋ",
            "ㄊㄞˊ ㄨㄢ ㄗㄨㄟˋ ㄅㄢˋ",
            "ㄊㄞˊ ㄨㄢ ㄗㄨㄟˋ ㄅㄤ"
          ]
        }
      ]
    }
  ],
  "starterPokemon": [
    {
      "id": "pikachu",
      "name": "皮卡丘",
      "icon": "⚡",
      "type": "電氣系",
      "move": "十萬伏特",
      "hp": 100,
      "desc": "最忠實的電氣夥伴，臉頰兩側有儲電的紅臉頰！",
      "evolutions": [
        {
          "stage": 1,
          "name": "皮卡丘",
          "icon": "⚡",
          "move": "十萬伏特",
          "moveFx": "electric"
        },
        {
          "stage": 2,
          "name": "雷丘",
          "icon": "⚡",
          "move": "雷電拳",
          "moveFx": "electric"
        },
        {
          "stage": 3,
          "name": "阿羅拉雷丘",
          "icon": "🏄",
          "move": "終極伏特狂雷",
          "moveFx": "electric"
        }
      ]
    },
    {
      "id": "charmander",
      "name": "小火龍",
      "icon": "🔥",
      "type": "火系",
      "move": "噴射火焰",
      "hp": 100,
      "desc": "尾巴上的火焰代表牠旺盛的生命力！",
      "evolutions": [
        {
          "stage": 1,
          "name": "小火龍",
          "icon": "🔥",
          "move": "噴射火焰",
          "moveFx": "fire"
        },
        {
          "stage": 2,
          "name": "火恐龍",
          "icon": "🦖",
          "move": "大字爆炎",
          "moveFx": "fire"
        },
        {
          "stage": 3,
          "name": "噴火龍",
          "icon": "🐲",
          "move": "閃焰衝鋒",
          "moveFx": "fire"
        }
      ]
    },
    {
      "id": "squirtle",
      "name": "傑尼龜",
      "icon": "💧",
      "type": "水系",
      "move": "強力水炮",
      "hp": 100,
      "desc": "圓圓的龜殼非常堅硬，擅長從口中噴出水流！",
      "evolutions": [
        {
          "stage": 1,
          "name": "傑尼龜",
          "icon": "💧",
          "move": "強力水炮",
          "moveFx": "water"
        },
        {
          "stage": 2,
          "name": "卡咪龜",
          "icon": "🐢",
          "move": "水流尾",
          "moveFx": "water"
        },
        {
          "stage": 3,
          "name": "水箭龜",
          "icon": "🐢",
          "move": "加農水炮",
          "moveFx": "water"
        }
      ]
    },
    {
      "id": "bulbasaur",
      "name": "妙蛙種子",
      "icon": "🍃",
      "type": "草系",
      "move": "飛葉快刀",
      "hp": 100,
      "desc": "背上背著一顆神奇的植物種子，生機勃勃！",
      "evolutions": [
        {
          "stage": 1,
          "name": "妙蛙種子",
          "icon": "🍃",
          "move": "飛葉快刀",
          "moveFx": "grass"
        },
        {
          "stage": 2,
          "name": "妙蛙草",
          "icon": "🌿",
          "move": "瘋狂植物",
          "moveFx": "grass"
        },
        {
          "stage": 3,
          "name": "妙蛙花",
          "icon": "🌺",
          "move": "日光束",
          "moveFx": "grass"
        }
      ]
    },
    {
      "id": "eevee",
      "name": "伊布",
      "icon": "🌸",
      "type": "一般系",
      "move": "高速星星",
      "hp": 100,
      "desc": "擁有無限進化可能的可愛寶可夢，深受大家喜愛！",
      "evolutions": [
        {
          "stage": 1,
          "name": "伊布",
          "icon": "🌸",
          "move": "高速星星",
          "moveFx": "star"
        },
        {
          "stage": 2,
          "name": "仙子伊布",
          "icon": "🦄",
          "move": "月亮之力",
          "moveFx": "star"
        },
        {
          "stage": 3,
          "name": "太陽伊布",
          "icon": "☀️",
          "move": "精神強念",
          "moveFx": "star"
        }
      ]
    }
  ],
  "gymBadges": [
    {
      "stageId": 1,
      "name": "微風徽章",
      "icon": "🍃",
      "gym": "草之微風道館",
      "boss": "小狐狸奇奇"
    },
    {
      "stageId": 2,
      "name": "大地徽章",
      "icon": "🏔️",
      "gym": "岩石大地道館",
      "boss": "草原小獅王"
    },
    {
      "stageId": 3,
      "name": "雷電徽章",
      "icon": "⚡",
      "gym": "金黃電氣道館",
      "boss": "跳跳猴皮皮"
    },
    {
      "stageId": 4,
      "name": "水波徽章",
      "icon": "💧",
      "gym": "湛藍湖泊道館",
      "boss": "企鵝艦長"
    },
    {
      "stageId": 5,
      "name": "心靈徽章",
      "icon": "🔮",
      "gym": "紫晶魔法道館",
      "boss": "貓頭鷹學者"
    },
    {
      "stageId": 6,
      "name": "力量徽章",
      "icon": "🥊",
      "gym": "赤紅格鬥道館",
      "boss": "功夫熊貓大師"
    },
    {
      "stageId": 7,
      "name": "冰霜徽章",
      "icon": "❄️",
      "gym": "冰川雪山道館",
      "boss": "北極小白豹"
    },
    {
      "stageId": 8,
      "name": "彩虹徽章",
      "icon": "🌈",
      "gym": "彩虹花園道館",
      "boss": "彩虹獨角獸"
    },
    {
      "stageId": 9,
      "name": "火山徽章",
      "icon": "🔥",
      "gym": "烈焰熾火道館",
      "boss": "烈焰巨凰"
    },
    {
      "stageId": 10,
      "name": "冠軍大師獎盃",
      "icon": "🏆",
      "gym": "龍神四天王殿堂",
      "boss": "黃金神龍王"
    }
  ]
};

// 支援 Node.js 環境導出（與音訊合成腳本共用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ZHUYIN_DATA;
}
