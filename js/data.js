/**
 * 台灣教育部小一國語注音符號資料庫
 * 包含37個注音符號的完整定義、發音特徵、聲調規則、結合韻與闖關關卡題庫
 * 100% 完整收錄：新北市土城區安和國民小學一一一學年度第一學期第一次定期考查試題（國語科一年級）
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
      "name": "第1關：看圖選音道館",
      "subtitle": "安和國小真題·第一大題",
      "icon": "🌲",
      "bossIcon": "🦊",
      "bossName": "小狐狸奇奇",
      "color": "#51CF66",
      "bgGradient": "linear-gradient(135deg, #D3F9D8, #B2F2BB)",
      "desc": "新北安和國小段考真題第一大題：看圖片，選出完全正確的注音符號！",
      "questions": [
        {
          "prompt": "【安和國小真題·看圖選注音】看圖片「🐊 鱷魚」，選出正確的注音：",
          "speakText": "看圖片，大鱷魚，選出正確的注音：",
          "icon": "🐊",
          "word": "🐊 鱷魚",
          "qType": "choice",
          "answer": "ㄜˋ",
          "options": [
            "ㄜˋ",
            "ㄌㄧˋ"
          ]
        },
        {
          "prompt": "【安和國小真題·看圖選注音】看圖片「🎵 音符」，選出正確的注音：",
          "speakText": "看圖片，音樂的音符，選出正確的注音：",
          "icon": "🎵",
          "word": "🎵 音符",
          "qType": "choice",
          "answer": "ㄧㄣ",
          "options": [
            "ㄧㄣ",
            "ㄌㄧㄥˊ"
          ]
        },
        {
          "prompt": "【安和國小真題·看圖選注音】看圖片「🦗 蟬」，選出正確的注音：",
          "speakText": "看圖片，樹上的蟬，選出正確的注音：",
          "icon": "🦗",
          "word": "🦗 蟬",
          "qType": "choice",
          "answer": "ㄔㄢˊ",
          "options": [
            "ㄔㄢˊ",
            "ㄘㄢˊ"
          ]
        },
        {
          "prompt": "【安和國小真題·看圖選注音】看圖片「🐜 螞蟻」，選出正確的注音：",
          "speakText": "看圖片，小螞蟻，選出正確的注音：",
          "icon": "🐜",
          "word": "🐜 螞蟻",
          "qType": "choice",
          "answer": "ㄇㄚˇ",
          "options": [
            "ㄇㄚˇ",
            "ㄋㄧˇ"
          ]
        },
        {
          "prompt": "【安和國小真題·看圖選注音】看圖片「🕊️ 白鴿」，選出正確的注音：",
          "speakText": "看圖片，天空中飛翔的白鴿，選出正確的注音：",
          "icon": "🕊️",
          "word": "🕊️ 白鴿",
          "qType": "choice",
          "answer": "ㄅㄞˊ ㄍㄜ",
          "options": [
            "ㄅㄞˊ ㄍㄜ",
            "ㄆㄞˊ ㄍㄜ"
          ]
        },
        {
          "prompt": "【安和國小真題·看圖選注音】看圖片「🦕 恐龍」，選出正確的注音：",
          "speakText": "看圖片，大恐龍，選出正確的注音：",
          "icon": "🦕",
          "word": "🦕 恐龍",
          "qType": "choice",
          "answer": "ㄎㄨㄥˇ ㄌㄨㄥˊ",
          "options": [
            "ㄎㄨㄥˇ ㄌㄨㄥˊ",
            "ㄊㄨㄥˊ ㄌㄨㄥˊ"
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
          "answer": "ㄅㄢ ㄇㄚˇ",
          "options": [
            "ㄅㄢ ㄇㄚˇ",
            "ㄅㄤ ㄇㄚˇ",
            "ㄅㄢ ㄇㄚˊ",
            "ㄉㄢ ㄇㄚˇ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：紅通通的「蘋果」，正確的拼音是哪一個？",
          "speakText": "好甜的蘋果！仔細聽：蘋果！請問哪一個拼音完全正確？",
          "icon": "🍎",
          "word": "🍎 蘋果",
          "answer": "ㄆㄧㄥˊ ㄍㄨㄛˇ",
          "options": [
            "ㄆㄧㄥˊ ㄍㄨㄛˇ",
            "ㄆㄧㄣˊ ㄍㄨㄛˇ",
            "ㄆㄧㄥˇ ㄍㄨㄛˇ",
            "ㄅㄧㄥˊ ㄍㄨㄛˇ"
          ]
        },
        {
          "qType": "fill_in",
          "prompt": "✏️ 語詞注音填空題：「飛機」在天上飛，拼音是「【 ？ 】 ㄐㄧ」，空格應填入哪一個注音？",
          "speakText": "大飛機飛上天！仔細聽：飛機！選出完全正確的拼音！",
          "icon": "✈️",
          "word": "✈️ 飛機 → 注音填空",
          "answer": "ㄈㄟ",
          "options": [
            "ㄈㄟ",
            "ㄏㄨㄟ",
            "ㄈㄝ",
            "ㄏㄟ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：「斑馬」的「斑」，是哪一個聲調？",
          "speakText": "段考選擇題：斑馬的斑，是哪一個聲調呢？",
          "icon": "🦓",
          "word": "🦓 斑馬 → 聲調判斷",
          "answer": "第一聲",
          "options": [
            "第一聲",
            "第二聲",
            "第三聲",
            "第四聲"
          ]
        },
        {
          "qType": "reading",
          "passage": "小白兔，穿白袍，\n長長耳朵豎得高。\n愛吃蘿蔔愛吃草，\n走起路來蹦蹦跳。",
          "prompt": "📖 讀一讀兒歌回答問題：小白兔最喜歡吃什麼？",
          "speakText": "讀一讀兒歌回答問題：小白兔，穿白袍，長長耳朵豎得高。愛吃蘿蔔愛吃草，走起路來蹦蹦跳。請問：小白兔最喜歡吃什麼？",
          "icon": "🐇",
          "word": "🐇 兒歌小故事：小白兔",
          "answer": "蘿蔔和青草",
          "options": [
            "蘿蔔和青草",
            "蘋果和香蕉",
            "小魚和小蝦",
            "香甜的西瓜"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：嗡嗡嗡採花蜜的「蜜蜂」，哪一個拼音完全正確？",
          "speakText": "勤勞的蜜蜂！仔細聽：蜜蜂！選出完全正確的注音！",
          "icon": "🐝",
          "word": "🐝 蜜蜂",
          "answer": "ㄇㄧˋ ㄈㄥ",
          "options": [
            "ㄇㄧˋ ㄈㄥ",
            "ㄇㄧˋ ㄈㄣ",
            "ㄇㄧˋ ㄏㄨㄥ",
            "ㄋㄧˋ ㄈㄥ"
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "第2關：辨音圈選道館",
      "subtitle": "安和國小真題·第二大題(上)",
      "icon": "🌻",
      "bossIcon": "🦁",
      "bossName": "草原小獅王",
      "color": "#FCC419",
      "bgGradient": "linear-gradient(135deg, #FFF3BF, #FFEC99)",
      "desc": "新北安和國小段考真題第二大題：比較兩個注音，圈出完全正確的答案！",
      "questions": [
        {
          "prompt": "【安和國小真題·圈出正確注音】「🥚 雞蛋」，哪一個注音完全正確？",
          "speakText": "營養好吃的雞蛋，哪一個注音完全正確呢？",
          "icon": "🥚",
          "word": "🥚 雞蛋",
          "qType": "choice",
          "answer": "ㄐㄧ ㄉㄢˋ",
          "options": [
            "ㄐㄧ ㄉㄢˋ",
            "ㄐㄧ ㄉㄤˋ"
          ]
        },
        {
          "prompt": "【安和國小真題·圈出正確注音】「🎒 書包」，哪一個注音完全正確？",
          "speakText": "每天背去上學的書包，哪一個注音完全正確呢？",
          "icon": "🎒",
          "word": "🎒 書包",
          "qType": "choice",
          "answer": "ㄕㄨ ㄅㄠ",
          "options": [
            "ㄕㄨ ㄅㄠ",
            "ㄕㄨ ㄉㄠ"
          ]
        },
        {
          "prompt": "【安和國小真題·圈出正確注音】「🤝 開會」，哪一個注音完全正確？",
          "speakText": "大家聚在一起開會，哪一個注音完全正確呢？",
          "icon": "🤝",
          "word": "🤝 開會",
          "qType": "choice",
          "answer": "ㄎㄞ ㄏㄨㄟˋ",
          "options": [
            "ㄎㄞ ㄏㄨㄟˋ",
            "ㄎㄞ ㄈㄟˋ"
          ]
        },
        {
          "prompt": "【安和國小真題·圈出正確注音】「🦒 長頸鹿」，哪一個注音完全正確？",
          "speakText": "脖子長長的長頸鹿，哪一個注音完全正確呢？",
          "icon": "🦒",
          "word": "🦒 長頸鹿",
          "qType": "choice",
          "answer": "ㄔㄤˊ ㄐㄧㄥˇ ㄌㄨˋ",
          "options": [
            "ㄔㄤˊ ㄐㄧㄥˇ ㄌㄨˋ",
            "ㄘㄤˊ ㄐㄧㄥˇ ㄌㄨˋ"
          ]
        },
        {
          "prompt": "【安和國小真題·圈出正確注音】「🌸 花朵」，哪一個注音完全正確？",
          "speakText": "花園裡美麗的花朵，哪一個注音完全正確呢？",
          "icon": "🌸",
          "word": "🌸 花朵",
          "qType": "choice",
          "answer": "ㄏㄨㄚ ㄉㄨㄛˇ",
          "options": [
            "ㄏㄨㄚ ㄉㄨㄛˇ",
            "ㄏㄨㄚ ㄍㄨㄛˇ"
          ]
        },
        {
          "prompt": "【安和國小真題·圈出正確注音】「🪿 白鵝」，哪一個注音完全正確？",
          "speakText": "池塘裡游水的白鵝，哪一個注音完全正確呢？",
          "icon": "🪿",
          "word": "🪿 白鵝",
          "qType": "choice",
          "answer": "ㄅㄞˊ ㄜˊ",
          "options": [
            "ㄅㄞˊ ㄜˊ",
            "ㄅㄞˊ ㄜ"
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
          "answer": "ㄉㄚˋ ㄒㄧㄤˋ",
          "options": [
            "ㄉㄚˋ ㄒㄧㄤˋ",
            "ㄉㄚˋ ㄒㄧㄢˋ",
            "ㄉㄚˋ ㄕㄤˋ",
            "ㄅㄚˋ ㄒㄧㄤˋ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：蹦蹦跳跳的「兔子」，正確的拼音是哪一個？",
          "speakText": "可愛的兔子！仔細聽：兔子！選出正確的拼音！",
          "icon": "🐰",
          "word": "🐰 兔子",
          "answer": "ㄊㄨˋ ˙ㄗ",
          "options": [
            "ㄊㄨˋ ˙ㄗ",
            "ㄊㄨˋ ˙ㄓ",
            "ㄊㄨˋ ㄗ",
            "ㄉㄨˋ ˙ㄗ"
          ]
        },
        {
          "qType": "fill_in",
          "prompt": "✏️ 語詞注音填空題：百獸之王「老虎」，拼音是「【 ？ 】 ㄏㄨˇ」，空格應填入哪一個注音？",
          "speakText": "威武的大老虎！仔細聽：老虎！選出正確的拼音！",
          "icon": "🐯",
          "word": "🐯 老虎 → 注音填空",
          "answer": "ㄌㄠˇ",
          "options": [
            "ㄌㄠˇ",
            "ㄋㄠˇ",
            "ㄌㄠ",
            "ㄌㄠˊ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：下列哪一個語詞的開頭，是舌尖音「ㄉ」？",
          "speakText": "段考選擇題：下列哪一個語詞的開頭，是舌尖音ㄉ呢？",
          "icon": "🐘",
          "word": "🐘 聲母分類判斷",
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
          "answer": "太陽公公",
          "options": [
            "太陽公公",
            "月亮姐姐",
            "天上的白雲",
            "水裡的小鴨"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：甜甜好吃的「糖果」，哪一個拼音完全正確？",
          "speakText": "甜甜的糖果！仔細聽：糖果！選出正確的拼音！",
          "icon": "🍬",
          "word": "🍬 糖果",
          "answer": "ㄊㄤˊ ㄍㄨㄛˇ",
          "options": [
            "ㄊㄤˊ ㄍㄨㄛˇ",
            "ㄊㄢˊ ㄍㄨㄛˇ",
            "ㄊㄤˊ ㄍㄜˇ",
            "ㄉㄤˊ ㄍㄨㄛˇ"
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "第3關：正音除錯道館",
      "subtitle": "安和國小真題·第二大題(下)",
      "icon": "🌋",
      "bossIcon": "🦖",
      "bossName": "暴龍阿卡",
      "color": "#FF922B",
      "bgGradient": "linear-gradient(135deg, #FFE8CC, #FFD8A8)",
      "desc": "新北安和國小段考真題第二大題：分辨平翹舌音、前後鼻音與易混聲調！",
      "questions": [
        {
          "prompt": "【安和國小真題·圈出正確注音】「👫 我們」，哪一個注音完全正確？",
          "speakText": "大家都是好朋友的我們，哪一個注音完全正確呢？",
          "icon": "👫",
          "word": "👫 我們",
          "qType": "choice",
          "answer": "ㄨㄛˇ ˙ㄇㄣ",
          "options": [
            "ㄨㄛˇ ˙ㄇㄣ",
            "ㄨㄛˇ ㄇㄣˊ"
          ]
        },
        {
          "prompt": "【安和國小真題·圈出正確注音】「🍎 水果」，哪一個注音完全正確？",
          "speakText": "營養又好吃的水果，哪一個注音完全正確呢？",
          "icon": "🍎",
          "word": "🍎 水果",
          "qType": "choice",
          "answer": "ㄕㄨㄟˇ ㄍㄨㄛˇ",
          "options": [
            "ㄕㄨㄟˇ ㄍㄨㄛˇ",
            "ㄙㄨㄟˇ ㄍㄨㄛˇ"
          ]
        },
        {
          "prompt": "【安和國小真題·圈出正確注音】「🐦 小鳥」，哪一個注音完全正確？",
          "speakText": "枝頭上唱歌的小鳥，哪一個注音完全正確呢？",
          "icon": "🐦",
          "word": "🐦 小鳥",
          "qType": "choice",
          "answer": "ㄒㄧㄠˇ ㄋㄧㄠˇ",
          "options": [
            "ㄒㄧㄠˇ ㄋㄧㄠˇ",
            "ㄒㄧㄠˇ ㄌㄧㄠˇ"
          ]
        },
        {
          "prompt": "【安和國小真題·圈出正確注音】「☀️ 陽光」，哪一個注音完全正確？",
          "speakText": "天上溫暖照耀的陽光，哪一個注音完全正確呢？",
          "icon": "☀️",
          "word": "☀️ 陽光",
          "qType": "choice",
          "answer": "ㄧㄤˊ ㄍㄨㄤ",
          "options": [
            "ㄧㄤˊ ㄍㄨㄤ",
            "ㄧㄤˊ ㄍㄤ"
          ]
        },
        {
          "prompt": "【安和國小真題·圈出正確注音】「😴 睡覺」，哪一個注音完全正確？",
          "speakText": "小朋友晚上要早點睡覺，哪一個注音完全正確呢？",
          "icon": "😴",
          "word": "😴 睡覺",
          "qType": "choice",
          "answer": "ㄕㄨㄟˋ ㄐㄧㄠˋ",
          "options": [
            "ㄕㄨㄟˋ ㄐㄧㄠˋ",
            "ㄙㄨㄟˋ ㄐㄧㄠˋ"
          ]
        },
        {
          "prompt": "【安和國小真題·圈出正確注音】「👞 皮革」，哪一個注音完全正確？",
          "speakText": "製作皮鞋的皮革，哪一個注音完全正確呢？",
          "icon": "👞",
          "word": "👞 皮革",
          "qType": "choice",
          "answer": "ㄆㄧˊ ㄍㄜˊ",
          "options": [
            "ㄆㄧˊ ㄍㄜˊ",
            "ㄆㄧˊ ㄅㄠ"
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
          "answer": "ㄎㄨㄥˇ ㄌㄨㄥˊ",
          "options": [
            "ㄎㄨㄥˇ ㄌㄨㄥˊ",
            "ㄎㄨㄥˇ ㄋㄨㄥˊ",
            "ㄎㄨㄥˇ ㄌㄨㄣˊ",
            "ㄍㄨㄥˇ ㄌㄨㄥˊ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：搖尾巴的寵物「小狗」，正確的拼音是哪一個？",
          "speakText": "忠誠的小狗！仔細聽：小狗！選出正確的拼音！",
          "icon": "🐶",
          "word": "🐶 小狗",
          "answer": "ㄒㄧㄠˇ ㄍㄡˇ",
          "options": [
            "ㄒㄧㄠˇ ㄍㄡˇ",
            "ㄒㄧㄠˇ ㄎㄡˇ",
            "ㄒㄧㄡˇ ㄍㄠˇ",
            "ㄒㄧㄠˇ ㄍㄡˊ"
          ]
        },
        {
          "qType": "fill_in",
          "prompt": "✏️ 語詞注音填空題：調皮的「猴子」，拼音是「【 ？ 】 ˙ㄗ」，空格應填入哪一個注音？",
          "speakText": "調皮的猴子！仔細聽：猴子！選出正確的拼音！",
          "icon": "🐵",
          "word": "🐵 猴子 → 注音填空",
          "answer": "ㄏㄡˊ",
          "options": [
            "ㄏㄡˊ",
            "ㄏㄠˊ",
            "ㄎㄡˊ",
            "ㄏㄡ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：下列哪一個是「三拼音」（聲母 + 介音 + 韻母）？",
          "speakText": "段考選擇題：下列哪一個是三拼音呢？",
          "icon": "🌸",
          "word": "🌸 拼音結構判斷",
          "answer": "花",
          "options": [
            "花",
            "馬",
            "哥",
            "喝"
          ]
        },
        {
          "qType": "reading",
          "passage": "小蜜蜂，嗡嗡嗡，\n飛到花叢採花蜜。\n不怕辛苦不怕累，\n釀出蜂蜜甜如蜜。",
          "prompt": "📖 讀一讀兒歌回答問題：小蜜蜂飛到哪裡採花蜜？",
          "speakText": "讀一讀兒歌回答問題：小蜜蜂，嗡嗡嗡，飛到花叢採花蜜。不怕辛苦不怕累，釀出蜂蜜甜如蜜。請問：小蜜蜂飛到哪裡採花蜜？",
          "icon": "🐝",
          "word": "🐝 兒歌小故事：小蜜蜂",
          "answer": "花叢中",
          "options": [
            "花叢中",
            "大樹下",
            "小溪邊",
            "草地上"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：早起啼叫的「公雞」，哪一個拼音完全正確？",
          "speakText": "早起的大公雞！仔細聽：公雞！選出完全正確的注音！",
          "icon": "🐓",
          "word": "🐓 公雞",
          "answer": "ㄍㄨㄥ ㄐㄧ",
          "options": [
            "ㄍㄨㄥ ㄐㄧ",
            "ㄍㄨㄣ ㄐㄧ",
            "ㄎㄨㄥ ㄐㄧ",
            "ㄍㄨㄥ ㄑㄧ"
          ]
        }
      ]
    },
    {
      "id": 4,
      "name": "第4關：拼音連線道館",
      "subtitle": "安和國小真題·第三大題(上)",
      "icon": "🏛️",
      "bossIcon": "🐉",
      "bossName": "神殿小青龍",
      "color": "#339AF0",
      "bgGradient": "linear-gradient(135deg, #E7F5FF, #D0EBFF)",
      "desc": "新北安和國小段考真題第三大題：將前後字音正確連成完整語詞！",
      "questions": [
        {
          "prompt": "【安和國小真題·連連看】美麗的家園「臺灣」，「ㄊㄞˊ」應該連到哪一個注音？",
          "speakText": "美麗的家園台灣，台應該連到哪一個注音呢？",
          "icon": "🏞️",
          "word": "🏞️ 臺灣",
          "qType": "choice",
          "answer": "ㄨㄢ",
          "options": [
            "ㄨㄢ",
            "ㄉㄡˇ",
            "ㄉㄥ",
            "ㄑㄧㄡˊ"
          ]
        },
        {
          "prompt": "【安和國小真題·連連看】水裡游的「蝌蚪」，「ㄎㄜ」應該連到哪一個注音？",
          "speakText": "水裡游的蝌蚪，蝌應該連到哪一個注音呢？",
          "icon": "🐸",
          "word": "🐸 蝌蚪",
          "qType": "choice",
          "answer": "ㄉㄡˇ",
          "options": [
            "ㄉㄡˇ",
            "ㄨㄢ",
            "ㄏㄨㄚ",
            "ㄕㄠˋ"
          ]
        },
        {
          "prompt": "【安和國小真題·連連看】寫字照亮的「檯燈」，「ㄊㄞˊ」應該連到哪一個注音？",
          "speakText": "寫字照亮的檯燈，台應該連到哪一個注音呢？",
          "icon": "💡",
          "word": "💡 檯燈",
          "qType": "choice",
          "answer": "ㄉㄥ",
          "options": [
            "ㄉㄥ",
            "ㄉㄡˇ",
            "ㄨㄢ",
            "ㄑㄧㄡˊ"
          ]
        },
        {
          "prompt": "【安和國小真題·連連看】空中飄著的「氣球」，「ㄑㄧˋ」應該連到哪一個注音？",
          "speakText": "空中飄著的氣球，氣應該連到哪一個注音呢？",
          "icon": "🎈",
          "word": "🎈 氣球",
          "qType": "choice",
          "answer": "ㄑㄧㄡˊ",
          "options": [
            "ㄑㄧㄡˊ",
            "ㄏㄨㄚ",
            "ㄕㄠˋ",
            "ㄉㄥ"
          ]
        },
        {
          "prompt": "【安和國小真題·連連看】池塘盛開的「荷花」，「ㄏㄜˊ」應該連到哪一個注音？",
          "speakText": "池塘盛開的荷花，荷應該連到哪一個注音呢？",
          "icon": "🪷",
          "word": "🪷 荷花",
          "qType": "choice",
          "answer": "ㄏㄨㄚ",
          "options": [
            "ㄏㄨㄚ",
            "ㄕㄠˋ",
            "ㄑㄧㄡˊ",
            "ㄉㄡˇ"
          ]
        },
        {
          "prompt": "【安和國小真題·連連看】跟大家說明的「介紹」，「ㄐㄧㄝˋ」應該連到哪一個注音？",
          "speakText": "跟大家說明的介紹，介應該連到哪一個注音呢？",
          "icon": "🙋",
          "word": "🙋 介紹",
          "qType": "choice",
          "answer": "ㄕㄠˋ",
          "options": [
            "ㄕㄠˋ",
            "ㄏㄨㄚ",
            "ㄑㄧㄡˊ",
            "ㄉㄥ"
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
          "answer": "ㄒㄧ ㄍㄨㄚ",
          "options": [
            "ㄒㄧ ㄍㄨㄚ",
            "ㄙ ㄍㄨㄚ",
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
          "answer": "ㄑㄧˋ ㄜˊ",
          "options": [
            "ㄑㄧˋ ㄜˊ",
            "ㄑㄧˋ ㄜˇ",
            "ㄑㄧˋ ㄛˊ",
            "ㄐㄧˋ ㄜˊ"
          ]
        },
        {
          "qType": "fill_in",
          "prompt": "✏️ 語詞注音填空題：可愛的「小熊」，拼音是「ㄒㄧㄠˇ 【 ？ 】」，空格應填入哪一個注音？",
          "speakText": "可愛的小熊！仔細聽：小熊！選出正確的拼音！",
          "icon": "🐻",
          "word": "🐻 小熊 → 注音填空",
          "answer": "ㄒㄩㄥˊ",
          "options": [
            "ㄒㄩㄥˊ",
            "ㄒㄩㄣˊ",
            "ㄕㄨㄥˊ",
            "ㄒㄩㄥ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：「西瓜」這兩個字的聲調分別是幾聲？",
          "speakText": "段考選擇題：西瓜這兩個字的聲調分別是幾聲呢？",
          "icon": "🍉",
          "word": "🍉 聲調連續判斷",
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
          "answer": "一把小傘",
          "options": [
            "一把小傘",
            "一條小船",
            "一張大床",
            "一個皮球"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：黃色彎彎的水果「香蕉」，哪一個拼音完全正確？",
          "speakText": "甜甜的香蕉！仔細聽：香蕉！選出完全正確的拼音！",
          "icon": "🍌",
          "word": "🍌 香蕉",
          "answer": "ㄒㄧㄤ ㄐㄧㄠ",
          "options": [
            "ㄒㄧㄤ ㄐㄧㄠ",
            "ㄒㄧㄢ ㄐㄧㄠ",
            "ㄒㄧㄤ ㄐㄠ",
            "ㄒㄧㄤ ㄑㄧㄠ"
          ]
        }
      ]
    },
    {
      "id": 5,
      "name": "第5關：語詞配對道館",
      "subtitle": "安和國小真題·第三大題(下)",
      "icon": "🦢",
      "bossIcon": "🧚",
      "bossName": "湖畔水精靈",
      "color": "#20C997",
      "bgGradient": "linear-gradient(135deg, #E6FCF5, #C3FAE8)",
      "desc": "新北安和國小段考真題第三大題：將注音符號與正確國語詞彙配對！",
      "questions": [
        {
          "prompt": "【安和國小真題·連連看】「ㄎㄨㄞˋ ˙ㄗ」，是指哪一個生活物品？",
          "speakText": "注音筷子，是指哪一個生活物品呢？",
          "icon": "🥢",
          "word": "🥢 筷子",
          "qType": "choice",
          "answer": "筷子",
          "options": [
            "筷子",
            "我們",
            "一片",
            "開關"
          ]
        },
        {
          "prompt": "【安和國小真題·連連看】「ㄨㄛˇ ˙ㄇㄣ」，是指哪一個詞彙？",
          "speakText": "注音我們，是指哪一個詞彙呢？",
          "icon": "👫",
          "word": "👫 我們",
          "qType": "choice",
          "answer": "我們",
          "options": [
            "我們",
            "筷子",
            "拇指",
            "四季"
          ]
        },
        {
          "prompt": "【安和國小真題·連連看】「ㄧ ㄆㄧㄢˋ」，是指哪一個詞彙？",
          "speakText": "注音一片，是指哪一個詞彙呢？",
          "icon": "🍃",
          "word": "🍃 一片",
          "qType": "choice",
          "answer": "一片",
          "options": [
            "一片",
            "開關",
            "拇指",
            "四季"
          ]
        },
        {
          "prompt": "【安和國小真題·連連看】「ㄎㄞ ㄍㄨㄢ」，是指哪一個物品？",
          "speakText": "注音開關，是指哪一個物品呢？",
          "icon": "🔌",
          "word": "🔌 開關",
          "qType": "choice",
          "answer": "開關",
          "options": [
            "開關",
            "一片",
            "筷子",
            "我們"
          ]
        },
        {
          "prompt": "【安和國小真題·連連看】「ㄇㄨˇ ㄓ」，是指哪一個身體部位？",
          "speakText": "注音拇指，是指哪一個身體部位呢？",
          "icon": "👍",
          "word": "👍 拇指",
          "qType": "choice",
          "answer": "拇指",
          "options": [
            "拇指",
            "四季",
            "我們",
            "開關"
          ]
        },
        {
          "prompt": "【安和國小真題·連連看】「ㄙˋ ㄐㄧˋ」，是指哪一個詞彙？",
          "speakText": "注音四季，是指哪一個詞彙呢？",
          "icon": "🍂",
          "word": "🍂 四季",
          "qType": "choice",
          "answer": "四季",
          "options": [
            "四季",
            "拇指",
            "一片",
            "筷子"
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
          "answer": "ㄕ ˙ㄗ",
          "options": [
            "ㄕ ˙ㄗ",
            "ㄙ ˙ㄗ",
            "ㄕ ˙ㄓ",
            "ㄕ ㄗ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：鐵軌上跑的「火車」，正確的拼音是哪一個？",
          "speakText": "嘟嘟火車！仔細聽：火車！選出正確的拼音！",
          "icon": "🚂",
          "word": "🚂 火車",
          "answer": "ㄏㄨㄛˇ ㄔㄜ",
          "options": [
            "ㄏㄨㄛˇ ㄔㄜ",
            "ㄏㄨㄛˇ ㄘㄜ",
            "ㄏㄛˇ ㄔㄜ",
            "ㄏㄨㄛˊ ㄔㄜ"
          ]
        },
        {
          "qType": "fill_in",
          "prompt": "✏️ 語詞注音填空題：溫暖的「太陽」，拼音是「ㄊㄞˋ 【 ？ 】」，空格應填入哪一個注音？",
          "speakText": "暖洋洋的太陽！仔細聽：太陽！選出正確的拼音！",
          "icon": "☀️",
          "word": "☀️ 太陽 → 注音填空",
          "answer": "ㄧㄤˊ",
          "options": [
            "ㄧㄤˊ",
            "ㄧㄢˊ",
            "ㄧㄤˇ",
            "ㄧㄤ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：下列哪一個字是翹舌音「ㄕ」開頭？",
          "speakText": "段考選擇題：下列哪一個字是翹舌音ㄕ開頭呢？",
          "icon": "🌳",
          "word": "🌳 翹舌音聲母辨析",
          "answer": "樹木",
          "options": [
            "樹木",
            "雨傘",
            "森林",
            "毛巾"
          ]
        },
        {
          "qType": "reading",
          "passage": "小花貓，照鏡子，\n鬍鬚翹翹真神氣。\n伸出爪子喵喵叫，\n鏡裡也有小花貓。",
          "prompt": "📖 讀一讀兒歌回答問題：鏡子裡面看到的是誰？",
          "speakText": "讀一讀兒歌回答問題：小花貓，照鏡子，鬍鬚翹翹真神氣。伸出爪子喵喵叫，鏡裡也有小花貓。請問：鏡子裡面看到的是誰？",
          "icon": "🐱",
          "word": "🐱 兒歌小故事：小花貓",
          "answer": "小花貓自己",
          "options": [
            "小花貓自己",
            "一隻小黑狗",
            "可愛的小鳥",
            "美麗的蝴蝶"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：泡茶熱水用的「茶壺」，哪一個拼音完全正確？",
          "speakText": "泡好茶的茶壺！仔細聽：茶壺！選出完全正確的拼音！",
          "icon": "🫖",
          "word": "🫖 茶壺",
          "answer": "ㄔㄚˊ ㄏㄨˊ",
          "options": [
            "ㄔㄚˊ ㄏㄨˊ",
            "ㄘㄚˊ ㄏㄨˊ",
            "ㄔㄚˊ ㄈㄨˊ",
            "ㄔㄚˇ ㄏㄨˊ"
          ]
        }
      ]
    },
    {
      "id": 6,
      "name": "第6關：看圖填拼音館",
      "subtitle": "安和國小真題·第四大題(上)",
      "icon": "🌈",
      "bossIcon": "🦄",
      "bossName": "彩虹獨角獸",
      "color": "#845EF7",
      "bgGradient": "linear-gradient(135deg, #F3F0FF, #E5DBFF)",
      "desc": "新北安和國小段考真題第四大題：看著圖片，選出完全正確的注音拼音！",
      "questions": [
        {
          "prompt": "【安和國小真題·看圖填拼音】看圖片「⛄ 雪人」，「雪」的注音符號是什麼？",
          "speakText": "冬天堆的雪人，雪的注音符號是什麼呢？",
          "icon": "⛄",
          "word": "⛄ 雪人",
          "qType": "fill_in",
          "answer": "ㄒㄩㄝˇ",
          "options": [
            "ㄒㄩㄝˇ",
            "ㄒㄧㄝˇ",
            "ㄕㄩㄝˇ",
            "ㄒㄩㄝ"
          ]
        },
        {
          "prompt": "【安和國小真題·看圖填拼音】看圖片「☂️ 雨傘」，「傘」的注音符號是什麼？",
          "speakText": "下雨天撐的雨傘，傘的注音符號是什麼呢？",
          "icon": "☂️",
          "word": "☂️ 雨傘",
          "qType": "fill_in",
          "answer": "ㄙㄢˇ",
          "options": [
            "ㄙㄢˇ",
            "ㄕㄢˇ",
            "ㄙㄢ",
            "ㄘㄢˇ"
          ]
        },
        {
          "prompt": "【安和國小真題·看圖填拼音】看圖片「🐸 青蛙」，「青」的注音符號是什麼？",
          "speakText": "池塘邊跳跳叫的青蛙，青的注音符號是什麼呢？",
          "icon": "🐸",
          "word": "🐸 青蛙",
          "qType": "fill_in",
          "answer": "ㄑㄧㄥ",
          "options": [
            "ㄑㄧㄥ",
            "ㄑㄧㄣ",
            "ㄐㄧㄥ",
            "ㄑㄧㄥˊ"
          ]
        },
        {
          "prompt": "【安和國小真題·看圖填拼音】看圖片「🦀 螃蟹」，「蟹」的注音符號是什麼？",
          "speakText": "海邊爬行的大螃蟹，蟹的注音符號是什麼呢？",
          "icon": "🦀",
          "word": "🦀 螃蟹",
          "qType": "fill_in",
          "answer": "ㄒㄧㄝˋ",
          "options": [
            "ㄒㄧㄝˋ",
            "ㄒㄧㄝ",
            "ㄐㄧㄝˋ",
            "ㄑㄧㄝˋ"
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
          "answer": "ㄩˇ ㄙㄢˇ",
          "options": [
            "ㄩˇ ㄙㄢˇ",
            "ㄩˇ ㄕㄢˇ",
            "ㄩˇ ㄙㄤˇ",
            "ㄧˇ ㄙㄢˇ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：酸甜紅潤的「草莓」，正確的拼音是哪一個？",
          "speakText": "甜美紅草莓！仔細聽：草莓！選出正確的拼音！",
          "icon": "🍓",
          "word": "🍓 草莓",
          "answer": "ㄘㄠˇ ㄇㄟˊ",
          "options": [
            "ㄘㄠˇ ㄇㄟˊ",
            "ㄔㄠˇ ㄇㄟˊ",
            "ㄘㄡˇ ㄇㄟˊ",
            "ㄘㄠˇ ㄇㄝˊ"
          ]
        },
        {
          "qType": "fill_in",
          "prompt": "✏️ 語詞注音填空題：快樂騎「自行車」，拼音是「【 ？ 】 ㄒㄧㄥˊ ㄔㄜ」，空格應填入哪一個注音？",
          "speakText": "快樂騎自行車！仔細聽：自行車！選出正確的拼音！",
          "icon": "🚲",
          "word": "🚲 自行車 → 注音填空",
          "answer": "ㄗˋ",
          "options": [
            "ㄗˋ",
            "ㄓˋ",
            "ㄘˋ",
            "ㄗ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：「草莓」的「草」，正確的聲調是哪一個？",
          "speakText": "段考選擇題：草莓的草，正確的聲調是哪一個呢？",
          "icon": "🍓",
          "word": "🍓 聲調符號判斷",
          "answer": "第三聲",
          "options": [
            "第三聲",
            "第一聲",
            "第二聲",
            "第四聲"
          ]
        },
        {
          "qType": "reading",
          "passage": "小黃狗，看家門，\n搖搖尾巴迎客人。\n生人走近汪汪叫，\n保護主人最忠心。",
          "prompt": "📖 讀一讀兒歌回答問題：小黃狗看到陌生人會怎麼做？",
          "speakText": "讀一讀兒歌回答問題：小黃狗，看家門，搖搖尾巴迎客人。生人走近汪汪叫，保護主人最忠心。請問：小黃狗看到陌生人會怎麼做？",
          "icon": "🐕",
          "word": "🐕 兒歌小故事：小黃狗",
          "answer": "汪汪叫保護主人",
          "options": [
            "汪汪叫保護主人",
            "跑去睡大覺",
            "跳到沙發上",
            "出門散步去"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：一串串圓圓甜甜的「紫葡萄」，哪一個拼音完全正確？",
          "speakText": "甜甜的紫葡萄！仔細聽：紫葡萄！選出完全正確的注音！",
          "icon": "🍇",
          "word": "🍇 紫葡萄",
          "answer": "ㄗˇ ㄆㄨˊ ˙ㄊㄠ",
          "options": [
            "ㄗˇ ㄆㄨˊ ˙ㄊㄠ",
            "ㄓˇ ㄆㄨˊ ˙ㄊㄠ",
            "ㄗˇ ㄆㄨˊ ㄊㄠˊ",
            "ㄗˇ ㄆㄨˊ ˙ㄊㄡ"
          ]
        }
      ]
    },
    {
      "id": 7,
      "name": "第7關：拼音拼寫道館",
      "subtitle": "安和國小真題·第四大題(下)",
      "icon": "🎢",
      "bossIcon": "🐼",
      "bossName": "功夫貓熊阿寶",
      "color": "#F06595",
      "bgGradient": "linear-gradient(135deg, #FFF0F6, #FFDEEB)",
      "desc": "新北安和國小段考真題第四大題：觀察動物與物品，精確填出拼音！",
      "questions": [
        {
          "prompt": "【安和國小真題·看圖填拼音】看圖片「🐼 貓熊」，「熊」的注音符號是什麼？",
          "speakText": "圓滾滾可愛的貓熊，熊的注音符號是什麼呢？",
          "icon": "🐼",
          "word": "🐼 貓熊",
          "qType": "fill_in",
          "answer": "ㄒㄩㄥˊ",
          "options": [
            "ㄒㄩㄥˊ",
            "ㄒㄧㄨㄥˊ",
            "ㄕㄨㄥˊ",
            "ㄒㄩㄥ"
          ]
        },
        {
          "prompt": "【安和國小真題·看圖填拼音】看圖片「🐬 海豚」，「豚」的注音符號是什麼？",
          "speakText": "大海裡躍出水面的海豚，豚的注音符號是什麼呢？",
          "icon": "🐬",
          "word": "🐬 海豚",
          "qType": "fill_in",
          "answer": "ㄊㄨㄣˊ",
          "options": [
            "ㄊㄨㄣˊ",
            "ㄉㄨㄣˊ",
            "ㄊㄥˊ",
            "ㄊㄨㄣ"
          ]
        },
        {
          "prompt": "【安和國小真題·看圖填拼音】看圖片「🧙‍♀️ 巫婆」，「巫」的注音符號是什麼？",
          "speakText": "故事裡騎掃把的巫婆，巫的注音符號是什麼呢？",
          "icon": "🧙‍♀️",
          "word": "🧙‍♀️ 巫婆",
          "qType": "fill_in",
          "answer": "ㄨ",
          "options": [
            "ㄨ",
            "ㄩ",
            "ㄨˊ",
            "ㄨˋ"
          ]
        },
        {
          "prompt": "【安和國小真題·看圖填拼音】看圖片「🪁 風箏」，「箏」的注音符號是什麼？",
          "speakText": "草原上迎風飛舞的風箏，箏的注音符號是什麼呢？",
          "icon": "🪁",
          "word": "🪁 風箏",
          "qType": "fill_in",
          "answer": "ㄓㄥ",
          "options": [
            "ㄓㄥ",
            "ㄗㄥ",
            "ㄓㄣ",
            "ㄓㄥˋ"
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
          "answer": "ㄩㄝˋ ˙ㄌㄧㄤ",
          "options": [
            "ㄩㄝˋ ˙ㄌㄧㄤ",
            "ㄧㄝˋ ˙ㄌㄧㄤ",
            "ㄩㄝˋ ˙ㄌㄧㄢ",
            "ㄩㄝˋ ㄌㄧㄤˋ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：池塘裡呱呱游的「小鴨」，正確的拼音是哪一個？",
          "speakText": "池塘裡的小鴨！仔細聽：小鴨！選出正確的拼音！",
          "icon": "🦆",
          "word": "🦆 小鴨",
          "answer": "ㄒㄧㄠˇ ㄧㄚ",
          "options": [
            "ㄒㄧㄠˇ ㄧㄚ",
            "ㄒㄧㄠˇ ㄨㄚ",
            "ㄒㄧㄡˇ ㄧㄚ",
            "ㄒㄧㄠˊ ㄧㄚ"
          ]
        },
        {
          "qType": "fill_in",
          "prompt": "✏️ 語詞注音填空題：慢慢爬的「蝸牛」，拼音是「ㄍㄨㄚ 【 ？ 】」，空格應填入哪一個注音？",
          "speakText": "慢慢爬的蝸牛！仔細聽：蝸牛！選出正確的拼音！",
          "icon": "🐌",
          "word": "🐌 蝸牛 → 注音填空",
          "answer": "ㄋㄧㄡˊ",
          "options": [
            "ㄋㄧㄡˊ",
            "ㄌㄧㄡˊ",
            "ㄋㄧㄠˊ",
            "ㄋㄧㄡ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：在注音拼音中，下列哪一個是「介音」？",
          "speakText": "段考選擇題：在注音拼音中，下列哪一個是介音呢？",
          "icon": "🌉",
          "word": "🌉 介音三人組判斷",
          "answer": "ㄨ",
          "options": [
            "ㄨ",
            "ㄅ",
            "ㄍ",
            "ㄇ"
          ]
        },
        {
          "qType": "reading",
          "passage": "彩虹橋，天邊掛，\n紅橙黃綠青藍紫。\n雨過天晴照大地，\n美麗天空笑瞇瞇。",
          "prompt": "📖 讀一讀兒歌回答問題：彩虹通常什麼時候出現在天空？",
          "speakText": "讀一讀兒歌回答問題：彩虹橋，天邊掛，紅橙黃綠青藍紫。雨過天晴照大地，美麗天空笑瞇瞇。請問：彩虹通常什麼時候出現在天空？",
          "icon": "🌈",
          "word": "🌈 兒歌小故事：彩虹橋",
          "answer": "雨過天晴的時候",
          "options": [
            "雨過天晴的時候",
            "寒冷的冬天早晨",
            "漆黑的大半夜",
            "狂風暴雨的時候"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：寫字畫畫用的工具「鉛筆」，哪一個拼音完全正確？",
          "speakText": "削尖尖的鉛筆！仔細聽：鉛筆！選出完全正確的拼音！",
          "icon": "✏️",
          "word": "✏️ 鉛筆",
          "answer": "ㄑㄧㄢ ㄅㄧˇ",
          "options": [
            "ㄑㄧㄢ ㄅㄧˇ",
            "ㄑㄧㄤ ㄅㄧˇ",
            "ㄐㄧㄢ ㄅㄧˇ",
            "ㄑㄧㄢ ㄉㄧˇ"
          ]
        }
      ]
    },
    {
      "id": 8,
      "name": "第8關：拼音造詞道館",
      "subtitle": "安和國小真題·第五大題",
      "icon": "🚂",
      "bossIcon": "🦉",
      "bossName": "貓頭鷹站長",
      "color": "#FD7E14",
      "bgGradient": "linear-gradient(135deg, #FFF4E6, #FFE8CC)",
      "desc": "新北安和國小段考真題第五大題：聲母與介音、韻母的拼音組合大考驗！",
      "questions": [
        {
          "prompt": "【安和國小真題·拼音造詞】聲母「ㄇ」加上韻母「ㄛ」，會拼出哪一個注音？",
          "speakText": "聲母ㄇ加上韻母ㄛ，會拼出哪一個注音呢？",
          "icon": "🎁",
          "word": "ㄇ + ㄛ",
          "qType": "fill_in",
          "answer": "ㄇㄛ",
          "options": [
            "ㄇㄛ",
            "ㄇㄜ",
            "ㄇㄡ",
            "ㄅㄛ"
          ]
        },
        {
          "prompt": "【安和國小真題·拼音造詞】聲母「ㄉ」加上介音與韻母「ㄨㄛ」，會拼出哪一個注音？",
          "speakText": "聲母ㄉ加上介音韻母ㄨㄛ，會拼出哪一個注音呢？",
          "icon": "🌸",
          "word": "ㄉ + ㄨㄛ",
          "qType": "fill_in",
          "answer": "ㄉㄨㄛ",
          "options": [
            "ㄉㄨㄛ",
            "ㄉㄛ",
            "ㄊㄨㄛ",
            "ㄉㄨ"
          ]
        },
        {
          "prompt": "【安和國小真題·拼音造詞】聲母「ㄆ」加上韻母「ㄠ」，會拼出哪一個注音？",
          "speakText": "聲母ㄆ加上韻母ㄠ，會拼出哪一個注音呢？",
          "icon": "🏃",
          "word": "ㄆ + ㄠ",
          "qType": "fill_in",
          "answer": "ㄆㄠ",
          "options": [
            "ㄆㄠ",
            "ㄆㄛ",
            "ㄆㄡ",
            "ㄊㄠ"
          ]
        },
        {
          "prompt": "【安和國小真題·拼音造詞】聲母「ㄌ」加上介音與韻母「ㄧㄠ」，會拼出哪一個注音？",
          "speakText": "聲母ㄌ加上介音韻母ㄧㄠ，會拼出哪一個注音呢？",
          "icon": "💬",
          "word": "ㄌ + ㄧㄠ",
          "qType": "fill_in",
          "answer": "ㄌㄧㄠ",
          "options": [
            "ㄌㄧㄠ",
            "ㄋㄧㄠ",
            "ㄌㄠ",
            "ㄌㄧㄡ"
          ]
        },
        {
          "prompt": "【安和國小真題·拼音造詞】聲母「ㄈ」加上韻母「ㄟ」，會拼出哪一個注音？",
          "speakText": "聲母ㄈ加上韻母ㄟ，會拼出哪一個注音呢？",
          "icon": "✈️",
          "word": "ㄈ + ㄟ",
          "qType": "fill_in",
          "answer": "ㄈㄟ",
          "options": [
            "ㄈㄟ",
            "ㄏㄨㄟ",
            "ㄈㄝ",
            "ㄅㄟ"
          ]
        },
        {
          "prompt": "【安和國小真題·拼音造詞】聲母「ㄋ」加上介音與韻母「ㄧㄡ」，會拼出「牛奶」的哪一個注音？",
          "speakText": "聲母ㄋ加上介音韻母ㄧㄡ，會拼出哪一個注音呢？",
          "icon": "🥛",
          "word": "ㄋ + ㄧㄡ",
          "qType": "fill_in",
          "answer": "ㄋㄧㄡ",
          "options": [
            "ㄋㄧㄡ",
            "ㄌㄧㄡ",
            "ㄋㄧㄡˊ",
            "ㄇㄧㄡ"
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
          "answer": "ㄑㄧㄥ ㄨㄚ",
          "options": [
            "ㄑㄧㄥ ㄨㄚ",
            "ㄑㄧㄣ ㄨㄚ",
            "ㄑㄧㄥ ㄚ",
            "ㄐㄧㄥ ㄨㄚ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：破曉啼鳴的大「公雞」，正確的拼音是哪一個？",
          "speakText": "早起的大公雞！仔細聽：公雞！選出正確的拼音！",
          "icon": "🐓",
          "word": "🐓 公雞",
          "answer": "ㄍㄨㄥ ㄐㄧ",
          "options": [
            "ㄍㄨㄥ ㄐㄧ",
            "ㄍㄨㄣ ㄐㄧ",
            "ㄎㄨㄥ ㄐㄧ",
            "ㄍㄨㄥ ㄑㄧ"
          ]
        },
        {
          "qType": "fill_in",
          "prompt": "✏️ 語詞注音填空題：藍天上的「白雲」，拼音是「ㄅㄞˊ 【 ？ 】」，空格應填入哪一個注音？",
          "speakText": "藍天上的白雲！仔細聽：白雲！選出正確的拼音！",
          "icon": "☁️",
          "word": "☁️ 白雲 → 注音填空",
          "answer": "ㄩㄣˊ",
          "options": [
            "ㄩㄣˊ",
            "ㄩㄥˊ",
            "ㄩㄣˇ",
            "ㄩㄣ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：「白鵝」的「鵝」，注音符號是哪一個？",
          "speakText": "段考選擇題：白鵝的鵝，注音符號是哪一個呢？",
          "icon": "🦢",
          "word": "🦢 單韻母辨析",
          "answer": "ㄜˊ",
          "options": [
            "ㄜˊ",
            "ㄚˊ",
            "ㄛˊ",
            "ㄝˊ"
          ]
        },
        {
          "qType": "reading",
          "passage": "小金魚，水中游，\n搖搖尾巴吐泡泡。\n穿上紅色亮衣裳，\n快快樂樂游大海。",
          "prompt": "📖 讀一讀兒歌回答問題：小金魚在水裡會吐出什麼？",
          "speakText": "讀一讀兒歌回答問題：小金魚，水中游，搖搖尾巴吐泡泡。穿上紅色亮衣裳，快快樂樂游大海。請問：小金魚在水裡會吐出什麼？",
          "icon": "🐟",
          "word": "🐟 兒歌小故事：小金魚",
          "answer": "圓圓的泡泡",
          "options": [
            "圓圓的泡泡",
            "七彩的小石子",
            "美麗的花瓣",
            "美味的水果"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：荷花底下圓圓的大「荷葉」，哪一個拼音完全正確？",
          "speakText": "池塘裡圓圓的荷葉！仔細聽：荷葉！選出完全正確的拼音！",
          "icon": "🪷",
          "word": "🪷 荷葉",
          "answer": "ㄏㄜˊ ㄧㄝˋ",
          "options": [
            "ㄏㄜˊ ㄧㄝˋ",
            "ㄏㄜˊ ㄩㄝˋ",
            "ㄏㄛˊ ㄧㄝˋ",
            "ㄏㄜˇ ㄧㄝˋ"
          ]
        }
      ]
    },
    {
      "id": 9,
      "name": "第9關：句子標調道館",
      "subtitle": "安和國小真題·第六大題",
      "icon": "🏰",
      "bossIcon": "🧙‍♂️",
      "bossName": "水晶大法師",
      "color": "#15AABF",
      "bgGradient": "linear-gradient(135deg, #E3FAFC, #C5F6FA)",
      "desc": "新北安和國小段考真題第六大題：在完整句子情境中判斷字音的標準聲調！",
      "questions": [
        {
          "prompt": "【安和國小真題·句子聲調】句子「美麗的公園裡」，「麗」是第幾聲？",
          "speakText": "美麗的公園裡的麗，請問是第幾聲呢？",
          "icon": "🌳",
          "word": "🌳 美麗",
          "qType": "choice",
          "answer": "第四聲",
          "options": [
            "第四聲",
            "第一聲",
            "第二聲",
            "第三聲"
          ]
        },
        {
          "prompt": "【安和國小真題·句子聲調】句子「有小鳥在唱歌」，「歌」是第幾聲？",
          "speakText": "小鳥在唱歌的歌，請問是第幾聲呢？",
          "icon": "🎶",
          "word": "🎶 唱歌",
          "qType": "choice",
          "answer": "第一聲",
          "options": [
            "第一聲",
            "第二聲",
            "第三聲",
            "第四聲"
          ]
        },
        {
          "prompt": "【安和國小真題·句子聲調】句子「白鵝游過來」，「鵝」是第幾聲？",
          "speakText": "白鵝游過來的鵝，請問是第幾聲呢？",
          "icon": "🪿",
          "word": "🪿 白鵝",
          "qType": "choice",
          "answer": "第二聲",
          "options": [
            "第二聲",
            "第一聲",
            "第三聲",
            "第四聲"
          ]
        },
        {
          "prompt": "【安和國小真題·句子聲調】句子「說：你好！」，「好」是第幾聲？",
          "speakText": "說你好的好，請問是第幾聲呢？",
          "icon": "👋",
          "word": "👋 你好",
          "qType": "choice",
          "answer": "第三聲",
          "options": [
            "第三聲",
            "第一聲",
            "第二聲",
            "第四聲"
          ]
        },
        {
          "prompt": "【安和國小真題·句子聲調】句子「快樂的下午」，「快」是第幾聲？",
          "speakText": "快樂的下午的快，請問是第幾聲呢？",
          "icon": "😄",
          "word": "😄 快樂",
          "qType": "choice",
          "answer": "第四聲",
          "options": [
            "第四聲",
            "第一聲",
            "第二聲",
            "第三聲"
          ]
        },
        {
          "prompt": "【安和國小真題·句子聲調】句子「我們一起玩沙」，「沙」是第幾聲？",
          "speakText": "我們一起玩沙的沙，請問是第幾聲呢？",
          "icon": "🏖️",
          "word": "🏖️ 玩沙",
          "qType": "choice",
          "answer": "第一聲",
          "options": [
            "第一聲",
            "第二聲",
            "第三聲",
            "第四聲"
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
          "answer": "ㄈㄥ ㄓㄥ",
          "options": [
            "ㄈㄥ ㄓㄥ",
            "ㄈㄥ ㄗㄥ",
            "ㄈㄥ ㄓㄣ",
            "ㄈㄣ ㄓㄥ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：雨後天邊七彩的「彩虹」，正確的拼音是哪一個？",
          "speakText": "七彩美麗的彩虹！仔細聽：彩虹！選出正確的拼音！",
          "icon": "🌈",
          "word": "🌈 彩虹",
          "answer": "ㄘㄞˇ ㄏㄨㄥˊ",
          "options": [
            "ㄘㄞˇ ㄏㄨㄥˊ",
            "ㄔㄞˇ ㄏㄨㄥˊ",
            "ㄘㄞˇ ㄏㄨㄣˊ",
            "ㄘㄞˇ ㄏㄨㄥˇ"
          ]
        },
        {
          "qType": "fill_in",
          "prompt": "✏️ 語詞注音填空題：海邊飛翔的「海鷗」，拼音是「ㄏㄞˇ 【 ？ 】」，空格應填入哪一個注音？",
          "speakText": "海邊的海鷗！仔細聽：海鷗！選出正確的拼音！",
          "icon": "🕊️",
          "word": "🕊️ 海鷗 → 注音填空",
          "answer": "ㄡ",
          "options": [
            "ㄡ",
            "ㄠ",
            "ㄡˇ",
            "ㄡˋ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：下列哪一組字都是「後鼻音 ㄥ」的拼音？",
          "speakText": "段考選擇題：下列哪一組字都是後鼻音ㄥ的拼音呢？",
          "icon": "💎",
          "word": "💎 前後鼻音判斷",
          "answer": "風 和 星",
          "options": [
            "風 和 星",
            "心 和 金",
            "山 和 天",
            "分 和 門"
          ]
        },
        {
          "qType": "reading",
          "passage": "中秋夜，月兒圓，\n全家團聚吃柚子。\n聞著陣陣桂花香，\n月餅甜甜心歡喜。",
          "prompt": "📖 讀一讀兒歌回答問題：中秋節晚上大家團聚吃什麼水果？",
          "speakText": "讀一讀兒歌回答問題：中秋夜，月兒圓，全家團聚吃柚子。聞著陣陣桂花香，月餅甜甜心歡喜。請問：中秋節晚上大家團聚吃什麼水果？",
          "icon": "🥮",
          "word": "🥮 兒歌小故事：中秋節",
          "answer": "香甜的柚子",
          "options": [
            "香甜的柚子",
            "紅紅的大西瓜",
            "酸酸的檸檬",
            "綠色的香蕉"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "⚔️ 守關題：向著陽光綻放的「向日葵」，哪一個拼音完全正確？",
          "speakText": "金色向日葵！仔細聽：向日葵！選出完全正確的拼音！",
          "icon": "🌻",
          "word": "🌻 向日葵",
          "answer": "ㄒㄧㄤˋ ㄖˋ ㄎㄨㄟˊ",
          "options": [
            "ㄒㄧㄤˋ ㄖˋ ㄎㄨㄟˊ",
            "ㄒㄧㄢˋ ㄖˋ ㄎㄨㄟˊ",
            "ㄒㄧㄤˋ ㄖˋ ㄍㄨㄟˊ",
            "ㄒㄧㄤˋ ㄗˋ ㄎㄨㄟˊ"
          ]
        }
      ]
    },
    {
      "id": 10,
      "name": "第10關：兒歌閱讀殿堂",
      "subtitle": "安和國小真題·第七大題",
      "icon": "👑",
      "bossIcon": "🐲",
      "bossName": "黃金注音巨龍",
      "color": "#FA5252",
      "bgGradient": "linear-gradient(135deg, #FFE3E3, #FFC9C9)",
      "desc": "新北安和國小段考真題第七大題：讀一讀白鵝兒歌，回答閱讀理解與聲調問題！",
      "questions": [
        {
          "prompt": "【安和國小真題·兒歌閱讀測驗】兒歌中的白鵝在做什麼？",
          "speakText": "讀兒歌：白鵝美，白鵝爽，一朵一朵白鵝爽爽游。請問：兒歌中的白鵝在做什麼呢？",
          "icon": "🏊",
          "word": "🏊 兒歌閱讀",
          "qType": "reading",
          "passage": "白鵝美，白鵝爽，一朵一朵白鵝爽爽游，火火火，火火火，一朵一朵白鵝爽爽游。",
          "answer": "游泳",
          "options": [
            "游泳",
            "睡覺",
            "唱歌",
            "跳舞"
          ]
        },
        {
          "prompt": "【安和國小真題·兒歌閱讀測驗】從「白鵝爽爽游」可以看出白鵝的心情怎麼樣？",
          "speakText": "兒歌中說白鵝爽爽游，可以看出白鵝的心情怎麼樣呢？",
          "icon": "😊",
          "word": "😊 兒歌閱讀",
          "qType": "reading",
          "passage": "白鵝美，白鵝爽，一朵一朵白鵝爽爽游，火火火，火火火，一朵一朵白鵝爽爽游。",
          "answer": "快樂",
          "options": [
            "快樂",
            "難過",
            "生氣",
            "害怕"
          ]
        },
        {
          "prompt": "【安和國小真題·兒歌閱讀測驗】兒歌句子「白鵝美，白鵝爽」，「美」是第幾聲？",
          "speakText": "兒歌句子白鵝美的美，請問是第幾聲呢？",
          "icon": "✨",
          "word": "✨ 兒歌聲調",
          "qType": "choice",
          "passage": "白鵝美，白鵝爽，一朵一朵白鵝爽爽游，火火火，火火火，一朵一朵白鵝爽爽游。",
          "answer": "第三聲",
          "options": [
            "第三聲",
            "第一聲",
            "第二聲",
            "第四聲"
          ]
        },
        {
          "prompt": "【安和國小真題·兒歌閱讀測驗】兒歌句子「一朵一朵白鵝爽爽游」，「游」是第幾聲？",
          "speakText": "兒歌句子爽爽游的游，請問是第幾聲呢？",
          "icon": "🌊",
          "word": "🌊 兒歌聲調",
          "qType": "choice",
          "passage": "白鵝美，白鵝爽，一朵一朵白鵝爽爽游，火火火，火火火，一朵一朵白鵝爽爽游。",
          "answer": "第二聲",
          "options": [
            "第二聲",
            "第一聲",
            "第三聲",
            "第四聲"
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
          "answer": "ㄊㄧㄠˋ ㄕㄥˊ",
          "options": [
            "ㄊㄧㄠˋ ㄕㄥˊ",
            "ㄊㄧㄠˋ ㄙㄥˊ",
            "ㄊㄧㄠˋ ㄕㄣˊ",
            "ㄊㄠˋ ㄕㄥˊ"
          ]
        },
        {
          "qType": "pic_pick",
          "prompt": "🖼️ 看圖選詞：花叢中翩翩起舞的「蝴蝶」，正確的拼音是哪一個？",
          "speakText": "花間飛舞的蝴蝶！仔細聽：蝴蝶！選出正確的拼音！",
          "icon": "🦋",
          "word": "🦋 蝴蝶",
          "answer": "ㄏㄨˊ ㄉㄧㄝˊ",
          "options": [
            "ㄏㄨˊ ㄉㄧㄝˊ",
            "ㄈㄨˊ ㄉㄧㄝˊ",
            "ㄏㄨˊ ㄉㄧㄝˇ",
            "ㄏㄨˊ ㄉㄜˊ"
          ]
        },
        {
          "qType": "fill_in",
          "prompt": "✏️ 語詞注音填空題：公園裡的「水池」，拼音是「ㄕㄨㄟˇ 【 ？ 】」，空格應填入哪一個注音？",
          "speakText": "公園裡的大水池！仔細聽：水池！選出正確的拼音！",
          "icon": "🏞️",
          "word": "🏞️ 水池 → 注音填空",
          "answer": "ㄔˊ",
          "options": [
            "ㄔˊ",
            "ㄘˊ",
            "ㄔˇ",
            "ㄔ"
          ]
        },
        {
          "qType": "choice",
          "prompt": "📝 段考觀念選擇題：「跳繩」這兩個字的注音，分別包含幾個注音符號？",
          "speakText": "段考選擇題：跳繩這兩個字的注音，分別包含幾個注音符號呢？",
          "icon": "👑",
          "word": "👑 拼音綜合考核",
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
          "answer": "拼讀故事成為閱讀博士",
          "options": [
            "拼讀故事成為閱讀博士",
            "天天在床上睡大搞",
            "只會看電視玩遊戲",
            "忘記所有的好朋友"
          ]
        },
        {
          "qType": "listen_pick",
          "prompt": "👑 終極聯盟大考查：「台灣最棒」的注音拼音，哪一個完全正確？",
          "speakText": "台灣最棒！仔細聽：台灣最棒！選出完全正確的注音拼音！",
          "icon": "🏆",
          "word": "🏆 台灣最棒",
          "answer": "ㄊㄞˊ ㄨㄢ ㄗㄨㄟˋ ㄅㄤˋ",
          "options": [
            "ㄊㄞˊ ㄨㄢ ㄗㄨㄟˋ ㄅㄤˋ",
            "ㄊㄞˊ ㄨㄢ ㄓㄨㄟˋ ㄅㄤˋ",
            "ㄊㄞˊ ㄨㄢ ㄗㄨㄟˋ ㄅㄢˋ",
            "ㄊㄞˊ ㄨㄢ ㄗㄟˋ ㄅㄤˋ"
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
          "moveFx": "electric",
          "image": "assets/pokemon/pikachu.svg"
        },
        {
          "stage": 2,
          "name": "雷丘",
          "icon": "⚡",
          "move": "雷電拳",
          "moveFx": "electric",
          "image": "assets/pokemon/raichu.svg"
        },
        {
          "stage": 3,
          "name": "阿羅拉雷丘",
          "icon": "🏄",
          "move": "終極伏特狂雷",
          "moveFx": "electric",
          "image": "assets/pokemon/raichu.svg"
        }
      ],
      "image": "assets/pokemon/pikachu.svg"
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
          "moveFx": "fire",
          "image": "assets/pokemon/charmander.svg"
        },
        {
          "stage": 2,
          "name": "火恐龍",
          "icon": "🦖",
          "move": "大字爆炎",
          "moveFx": "fire",
          "image": "assets/pokemon/charmander.svg"
        },
        {
          "stage": 3,
          "name": "噴火龍",
          "icon": "🐲",
          "move": "閃焰衝鋒",
          "moveFx": "fire",
          "image": "assets/pokemon/charmander.svg"
        }
      ],
      "image": "assets/pokemon/charmander.svg"
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
          "moveFx": "water",
          "image": "assets/pokemon/squirtle.svg"
        },
        {
          "stage": 2,
          "name": "卡咪龜",
          "icon": "🐢",
          "move": "水流尾",
          "moveFx": "water",
          "image": "assets/pokemon/squirtle.svg"
        },
        {
          "stage": 3,
          "name": "水箭龜",
          "icon": "🐢",
          "move": "加農水炮",
          "moveFx": "water",
          "image": "assets/pokemon/squirtle.svg"
        }
      ],
      "image": "assets/pokemon/squirtle.svg"
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
          "moveFx": "grass",
          "image": "assets/pokemon/bulbasaur.svg"
        },
        {
          "stage": 2,
          "name": "妙蛙草",
          "icon": "🌿",
          "move": "瘋狂植物",
          "moveFx": "grass",
          "image": "assets/pokemon/bulbasaur.svg"
        },
        {
          "stage": 3,
          "name": "妙蛙花",
          "icon": "🌺",
          "move": "日光束",
          "moveFx": "grass",
          "image": "assets/pokemon/bulbasaur.svg"
        }
      ],
      "image": "assets/pokemon/bulbasaur.svg"
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
          "moveFx": "star",
          "image": "assets/pokemon/eevee.svg"
        },
        {
          "stage": 2,
          "name": "仙子伊布",
          "icon": "🦄",
          "move": "月亮之力",
          "moveFx": "star",
          "image": "assets/pokemon/eevee.svg"
        },
        {
          "stage": 3,
          "name": "太陽伊布",
          "icon": "☀️",
          "move": "精神強念",
          "moveFx": "star",
          "image": "assets/pokemon/eevee.svg"
        }
      ],
      "image": "assets/pokemon/eevee.svg"
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
