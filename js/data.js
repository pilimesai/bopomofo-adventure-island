/**
 * 台灣教育部小一國語注音符號資料庫
 * 涵蓋：
 * 1. 37個注音符號（聲母21個、介音3個、韻母13個）
 * 2. 22個常見結合韻
 * 3. 聲調口訣與說明
 * 4. 拼音拼讀庫（兩拼與三拼生活常見詞）
 * 5. 趣味記憶口訣與筆順說明
 */

const ZHUYIN_DATA = {
  // 37個注音符號
  symbols: [
    // === 聲母 (21個) ===
    {
      char: 'ㄅ',
      pinyin: 'b',
      type: 'initial', // 聲母
      categoryName: '聲母家族',
      strokes: 2,
      strokeGuide: ['一筆橫折，二筆橫'],
      mnemonic: 'ㄅ像收音機，天線豎起來 ㄅㄅㄅ',
      word: '斑馬',
      wordZhuyin: 'ㄅㄢ ㄇㄚˇ',
      icon: '🦓',
      color: '#FF6B6B',
      examples: [
        { word: '斑馬', zhuyin: 'ㄅㄢ ㄇㄚˇ', icon: '🦓' },
        { word: '爸爸', zhuyin: 'ㄅㄚˋ ˙ㄅㄚ', icon: '👨' },
        { word: '芭樂', zhuyin: 'ㄅㄚ ㄌㄜˋ', icon: '🍐' }
      ]
    },
    {
      char: 'ㄆ',
      pinyin: 'p',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 2,
      strokeGuide: ['一筆斜撇，二筆橫撇鉤'],
      mnemonic: 'ㄆ像小水盆，潑水嘩啦啦 ㄆㄆㄆ',
      word: '蘋果',
      wordZhuyin: 'ㄆㄧㄥˊ ㄍㄨㄛˇ',
      icon: '🍎',
      color: '#FF8787',
      examples: [
        { word: '蘋果', zhuyin: 'ㄆㄧㄥˊ ㄍㄨㄛˇ', icon: '🍎' },
        { word: '葡萄', zhuyin: 'ㄆㄨˊ ㄊㄠˊ', icon: '🍇' },
        { word: '朋友', zhuyin: 'ㄆㄥˊ ㄧㄡˇ', icon: '👫' }
      ]
    },
    {
      char: 'ㄇ',
      pinyin: 'm',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 2,
      strokeGuide: ['一筆豎，二筆橫折'],
      mnemonic: 'ㄇ像小山洞，鑽進山洞裡 ㄇㄇㄇ',
      word: '貓咪',
      wordZhuyin: 'ㄇㄠ ㄇㄧ',
      icon: '🐱',
      color: '#FFA94D',
      examples: [
        { word: '貓咪', zhuyin: 'ㄇㄠ ㄇㄧ', icon: '🐱' },
        { word: '帽子', zhuyin: 'ㄇㄠˋ ˙ㄗ', icon: '🧢' },
        { word: '蜜蜂', zhuyin: 'ㄇㄧˋ ㄈㄥ', icon: '🐝' }
      ]
    },
    {
      char: 'ㄈ',
      pinyin: 'f',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 2,
      strokeGuide: ['一筆橫，二筆斜撇鉤'],
      mnemonic: 'ㄈ像一把拐杖，老爺爺走路 ㄈㄈㄈ',
      word: '飛機',
      wordZhuyin: 'ㄈㄟ ㄐㄧ',
      icon: '✈️',
      color: '#FFD43B',
      examples: [
        { word: '飛機', zhuyin: 'ㄈㄟ ㄐㄧ', icon: '✈️' },
        { word: '風箏', zhuyin: 'ㄈㄥ ㄓㄥ', icon: '🪁' },
        { word: '帆船', zhuyin: 'ㄈㄢˊ ㄔㄨㄢˊ', icon: '⛵' }
      ]
    },
    {
      char: 'ㄉ',
      pinyin: 'd',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 2,
      strokeGuide: ['一筆橫折，二筆橫'],
      mnemonic: 'ㄉ像小馬蹄，得得得往前跑 ㄉㄉㄉ',
      word: '大象',
      wordZhuyin: 'ㄉㄚˋ ㄒㄧㄤˋ',
      icon: '🐘',
      color: '#69DB7C',
      examples: [
        { word: '大象', zhuyin: 'ㄉㄚˋ ㄒㄧㄤˋ', icon: '🐘' },
        { word: '豆漿', zhuyin: 'ㄉㄡˋ ㄐㄧㄤ', icon: '🥛' },
        { word: '袋鼠', zhuyin: 'ㄉㄞˋ ㄕㄨˇ', icon: '🦘' }
      ]
    },
    {
      char: 'ㄊ',
      pinyin: 't',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 3,
      strokeGuide: ['一筆橫，二筆豎，三筆橫'],
      mnemonic: 'ㄊ像一把小雨傘，下雨不怕淋 ㄊㄊㄊ',
      word: '太陽',
      wordZhuyin: 'ㄊㄞˋ ㄧㄤˊ',
      icon: '☀️',
      color: '#38D9A9',
      examples: [
        { word: '太陽', zhuyin: 'ㄊㄞˋ ㄧㄤˊ', icon: '☀️' },
        { word: '兔子', zhuyin: 'ㄊㄨˋ ˙ㄗ', icon: '🐰' },
        { word: '糖果', zhuyin: 'ㄊㄤˊ ㄍㄨㄛˇ', icon: '🍬' }
      ]
    },
    {
      char: 'ㄋ',
      pinyin: 'n',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 2,
      strokeGuide: ['一筆橫折折，二筆撇'],
      mnemonic: 'ㄋ像一尊小泥人，捏一捏真可愛 ㄋㄋㄋ',
      word: '牛奶',
      wordZhuyin: 'ㄋㄧㄡˊ ㄋㄞˇ',
      icon: '🥛',
      color: '#4DABF7',
      examples: [
        { word: '牛奶', zhuyin: 'ㄋㄧㄡˊ ㄋㄞˇ', icon: '🥛' },
        { word: '鳥兒', zhuyin: 'ㄋㄧㄠˇ ㄦˊ', icon: '🐦' },
        { word: '泥土', zhuyin: 'ㄋㄧˊ ㄊㄨˇ', icon: '🌱' }
      ]
    },
    {
      char: 'ㄌ',
      pinyin: 'l',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 2,
      strokeGuide: ['一筆橫折，二筆撇折'],
      mnemonic: 'ㄌ像掛著的小鈴鐺，丁零噹啷響 ㄌㄌㄌ',
      word: '鈴鐺',
      wordZhuyin: 'ㄌㄧㄥˊ ㄉㄤ',
      icon: '🔔',
      color: '#748FFC',
      examples: [
        { word: '鈴鐺', zhuyin: 'ㄌㄧㄥˊ ㄉㄤ', icon: '🔔' },
        { word: '老虎', zhuyin: 'ㄌㄠˇ ㄏㄨˇ', icon: '🐯' },
        { word: '蘿蔔', zhuyin: 'ㄌㄨㄛˊ ˙ㄅㄛ', icon: '🥕' }
      ]
    },
    {
      char: 'ㄍ',
      pinyin: 'g',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 2,
      strokeGuide: ['一筆撇折，二筆豎'],
      mnemonic: 'ㄍ像大哥哥，高高瘦瘦的大哥哥 ㄍㄍㄍ',
      word: '鴿子',
      wordZhuyin: 'ㄍㄜ ˙ㄗ',
      icon: '🕊️',
      color: '#9775FA',
      examples: [
        { word: '鴿子', zhuyin: 'ㄍㄜ ˙ㄗ', icon: '🕊️' },
        { word: '西瓜', zhuyin: 'ㄒㄧ ㄍㄨㄚ', icon: '🍉' },
        { word: '鋼琴', zhuyin: 'ㄍㄤ ㄑㄧㄣˊ', icon: '🎹' }
      ]
    },
    {
      char: 'ㄎ',
      pinyin: 'k',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 2,
      strokeGuide: ['一筆橫，二筆豎折'],
      mnemonic: 'ㄎ像一張開口笑，哈哈大笑真開心 ㄎㄎㄎ',
      word: '恐龍',
      wordZhuyin: 'ㄎㄨㄥˇ ㄌㄨㄥˊ',
      icon: '🦖',
      color: '#F06595',
      examples: [
        { word: '恐龍', zhuyin: 'ㄎㄨㄥˇ ㄌㄨㄥˊ', icon: '🦖' },
        { word: '蝌蚪', zhuyin: 'ㄎㄜ ㄉㄡˇ', icon: '🐸' },
        { word: '口罩', zhuyin: 'ㄎㄡˇ ㄓㄠˋ', icon: '😷' }
      ]
    },
    {
      char: 'ㄏ',
      pinyin: 'h',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 2,
      strokeGuide: ['一筆橫，二筆撇'],
      mnemonic: 'ㄏ像懸崖邊的小亭子，風景美如畫 ㄏㄏㄏ',
      word: '花朵',
      wordZhuyin: 'ㄏㄨㄚ ㄉㄨㄛˇ',
      icon: '🌸',
      color: '#FF6B6B',
      examples: [
        { word: '花朵', zhuyin: 'ㄏㄨㄚ ㄉㄨㄛˇ', icon: '🌸' },
        { word: '海豚', zhuyin: 'ㄏㄞˇ ㄊㄨㄣˊ', icon: '🐬' },
        { word: '蝴蝶', zhuyin: 'ㄏㄨˊ ㄉㄧㄝˊ', icon: '🦋' }
      ]
    },
    {
      char: 'ㄐ',
      pinyin: 'j',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 3,
      strokeGuide: ['一筆撇折，二筆豎，三筆橫'],
      mnemonic: 'ㄐ像小母雞，嘰嘰喳喳叫 ㄐㄐㄐ',
      word: '機器人',
      wordZhuyin: 'ㄐㄧ ㄑㄧˋ ㄖㄣˊ',
      icon: '🤖',
      color: '#FF922B',
      examples: [
        { word: '機器人', zhuyin: 'ㄐㄧ ㄑㄧˋ ㄖㄣˊ', icon: '🤖' },
        { word: '小雞', zhuyin: 'ㄒㄧㄠˇ ㄐㄧ', icon: '🐥' },
        { word: '積木', zhuyin: 'ㄐㄧ ㄇㄨˋ', icon: '🧱' }
      ]
    },
    {
      char: 'ㄑ',
      pinyin: 'q',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 1,
      strokeGuide: ['一筆橫折橫折彎鉤'],
      mnemonic: 'ㄑ像紅旗飄飄，迎風招展 ㄑㄑㄑ',
      word: '汽車',
      wordZhuyin: 'ㄑㄧˋ ㄔㄜ',
      icon: '🚗',
      color: '#FCC419',
      examples: [
        { word: '汽車', zhuyin: 'ㄑㄧˋ ㄔㄜ', icon: '🚗' },
        { word: '企鵝', zhuyin: 'ㄑㄧˋ ㄜˊ', icon: '🐧' },
        { word: '青蛙', zhuyin: 'ㄑㄧㄥ ㄨㄚ', icon: '🐸' }
      ]
    },
    {
      char: 'ㄒ',
      pinyin: 'x',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 3,
      strokeGuide: ['一筆橫，二筆撇，三筆豎折'],
      mnemonic: 'ㄒ像小西瓜，切開一牙牙 ㄒㄒㄒ',
      word: '西瓜',
      wordZhuyin: 'ㄒㄧ ㄍㄨㄚ',
      icon: '🍉',
      color: '#20C997',
      examples: [
        { word: '西瓜', zhuyin: 'ㄒㄧ ㄍㄨㄚ', icon: '🍉' },
        { word: '香蕉', zhuyin: 'ㄒㄧㄤ ㄐㄧㄠ', icon: '🍌' },
        { word: '小狗', zhuyin: 'ㄒㄧㄠˇ ㄍㄡˇ', icon: '🐶' }
      ]
    },
    {
      char: 'ㄓ',
      pinyin: 'zh',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 4,
      strokeGuide: ['一筆點，二筆橫，三筆撇，四筆豎折'],
      mnemonic: 'ㄓ像小蜘蛛，吐絲織網忙 ㄓㄓㄓ',
      word: '蜘蛛',
      wordZhuyin: 'ㄓ ㄓㄨ',
      icon: '🕷️',
      color: '#339AF0',
      examples: [
        { word: '蜘蛛', zhuyin: 'ㄓ ㄓㄨ', icon: '🕷️' },
        { word: '珍珠', zhuyin: 'ㄓㄣ ㄓㄨ', icon: '🦪' },
        { word: '指針', zhuyin: 'ㄓˇ ㄓㄣ', icon: '🧭' }
      ]
    },
    {
      char: 'ㄔ',
      pinyin: 'ch',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 3,
      strokeGuide: ['一筆撇，二筆撇，三筆豎'],
      mnemonic: 'ㄔ像小湯匙，吃飽飯長高高 ㄔㄔㄔ',
      word: '火車',
      wordZhuyin: 'ㄏㄨㄛˇ ㄔㄜ',
      icon: '🚂',
      color: '#5C7CFA',
      examples: [
        { word: '火車', zhuyin: 'ㄏㄨㄛˇ ㄔㄜ', icon: '🚂' },
        { word: '城堡', zhuyin: 'ㄔㄥˊ ㄅㄠˇ', icon: '🏰' },
        { word: '直尺', zhuyin: 'ㄓˊ ㄔˇ', icon: '📏' }
      ]
    },
    {
      char: 'ㄕ',
      pinyin: 'sh',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 3,
      strokeGuide: ['一筆橫折，二筆橫，三筆撇'],
      mnemonic: 'ㄕ像大獅子，森林大國王 ㄕㄕㄕ',
      word: '獅子',
      wordZhuyin: 'ㄕ ˙ㄗ',
      icon: '🦁',
      color: '#845EF7',
      examples: [
        { word: '獅子', zhuyin: 'ㄕ ˙ㄗ', icon: '🦁' },
        { word: '手錶', zhuyin: 'ㄕㄡˇ ㄅㄧㄠˇ', icon: '⌚' },
        { word: '樹木', zhuyin: 'ㄕㄨˋ ㄇㄨˋ', icon: '🌳' }
      ]
    },
    {
      char: 'ㄖ',
      pinyin: 'r',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 2,
      strokeGuide: ['一筆豎，二筆橫折豎'],
      mnemonic: 'ㄖ像溫暖紅太陽，日出東方升 ㄖㄖㄖ',
      word: '日曆',
      wordZhuyin: 'ㄖˋ ㄌㄧˋ',
      icon: '📅',
      color: '#CC5DE8',
      examples: [
        { word: '日曆', zhuyin: 'ㄖˋ ㄌㄧˋ', icon: '📅' },
        { word: '熱狗', zhuyin: 'ㄖㄜˋ ㄍㄡˇ', icon: '🌭' },
        { word: '日光', zhuyin: 'ㄖˋ ㄍㄨㄤ', icon: '☀️' }
      ]
    },
    {
      char: 'ㄗ',
      pinyin: 'z',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 2,
      strokeGuide: ['一筆橫折，二筆提折'],
      mnemonic: 'ㄗ像小鴨子游啊游，平舌輕聲唸 ㄗㄗㄗ',
      word: '足球',
      wordZhuyin: 'ㄗㄨˊ ㄑㄧㄡˊ',
      icon: '⚽',
      color: '#51CF66',
      examples: [
        { word: '足球', zhuyin: 'ㄗㄨˊ ㄑㄧㄡˊ', icon: '⚽' },
        { word: '棕熊', zhuyin: 'ㄗㄨㄥ ㄒㄩㄥ', icon: '🐻' },
        { word: '自己', zhuyin: 'ㄗˋ ㄐㄧˇ', icon: '🙋' }
      ]
    },
    {
      char: 'ㄘ',
      pinyin: 'c',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 2,
      strokeGuide: ['一筆撇折，二筆提'],
      mnemonic: 'ㄘ像刺蝟滿身刺，碰它一下縮成團 ㄘㄘㄘ',
      word: '草莓',
      wordZhuyin: 'ㄘㄠˇ ㄇㄟˊ',
      icon: '🍓',
      color: '#FF6B6B',
      examples: [
        { word: '草莓', zhuyin: 'ㄘㄠˇ ㄇㄟˊ', icon: '🍓' },
        { word: '彩虹', zhuyin: 'ㄘㄞˇ ㄏㄨㄥˊ', icon: '🌈' },
        { word: '蔥花', zhuyin: 'ㄘㄨㄥ ㄏㄨㄚ', icon: '🧅' }
      ]
    },
    {
      char: 'ㄙ',
      pinyin: 's',
      type: 'initial',
      categoryName: '聲母家族',
      strokes: 2,
      strokeGuide: ['一筆撇折，二筆點'],
      mnemonic: 'ㄙ像一條小蠶寶寶，吐出細白絲 ㄙㄙㄙ',
      word: '森林',
      wordZhuyin: 'ㄙㄣ ㄌㄧㄣˊ',
      icon: '🌲',
      color: '#22B8CF',
      examples: [
        { word: '森林', zhuyin: 'ㄙㄣ ㄌㄧㄣˊ', icon: '🌲' },
        { word: '絲巾', zhuyin: 'ㄙ ㄐㄧㄣ', icon: '🧣' },
        { word: '掃把', zhuyin: 'ㄙㄠˋ ㄅㄚˇ', icon: '🧹' }
      ]
    },

    // === 介音 (3個) ===
    {
      char: 'ㄧ',
      pinyin: 'i',
      type: 'medial', // 介音
      categoryName: '介音夥伴',
      strokes: 1,
      strokeGuide: ['一筆橫'],
      mnemonic: 'ㄧ像一根魔術棒，變出好多小星星 ㄧㄧㄧ',
      word: '衣服',
      wordZhuyin: 'ㄧ ˙ㄈㄨ',
      icon: '👕',
      color: '#FAB005',
      examples: [
        { word: '衣服', zhuyin: 'ㄧ ˙ㄈㄨ', icon: '👕' },
        { word: '醫生', zhuyin: 'ㄧ ㄕㄥ', icon: '👨‍⚕️' },
        { word: '影子', zhuyin: 'ㄧㄥˇ ˙ㄗ', icon: '👤' }
      ]
    },
    {
      char: 'ㄨ',
      pinyin: 'u',
      type: 'medial',
      categoryName: '介音夥伴',
      strokes: 2,
      strokeGuide: ['一筆撇折，二筆豎'],
      mnemonic: 'ㄨ像烏龜小房子，圓圓屋頂好遮風 ㄨㄨㄨ',
      word: '烏龜',
      wordZhuyin: 'ㄨ ㄍㄨㄟ',
      icon: '🐢',
      color: '#40C057',
      examples: [
        { word: '烏龜', zhuyin: 'ㄨ ㄍㄨㄟ', icon: '🐢' },
        { word: '圍巾', zhuyin: 'ㄨㄟˊ ㄐㄧㄣ', icon: '🧣' },
        { word: '屋頂', zhuyin: 'ㄨ ㄉㄧㄥˇ', icon: '🏠' }
      ]
    },
    {
      char: 'ㄩ',
      pinyin: 'ü',
      type: 'medial',
      categoryName: '介音夥伴',
      strokes: 2,
      strokeGuide: ['一筆豎折折，二筆豎'],
      mnemonic: 'ㄩ像一條小金魚，吐著泡泡游過來 ㄩㄩㄩ',
      word: '金魚',
      wordZhuyin: 'ㄐㄧㄣ ㄩˊ',
      icon: '🐟',
      color: '#15AABF',
      examples: [
        { word: '金魚', zhuyin: 'ㄐㄧㄣ ㄩˊ', icon: '🐟' },
        { word: '雨傘', zhuyin: 'ㄩˇ ㄙㄢˇ', icon: '☂️' },
        { word: '月亮', zhuyin: 'ㄩㄝˋ ˙ㄌㄧㄤ', icon: '🌙' }
      ]
    },

    // === 韻母 (13個) ===
    {
      char: 'ㄚ',
      pinyin: 'a',
      type: 'final', // 韻母
      categoryName: '韻母精靈',
      strokes: 2,
      strokeGuide: ['一筆橫，二筆豎折折'],
      mnemonic: 'ㄚ像小鴨呱呱叫，張大嘴巴 ㄚㄚㄚ',
      word: '鴨子',
      wordZhuyin: 'ㄧㄚ ˙ㄗ',
      icon: '🦆',
      color: '#FA5252',
      examples: [
        { word: '鴨子', zhuyin: 'ㄧㄚ ˙ㄗ', icon: '🦆' },
        { word: '阿姨', zhuyin: 'ㄚ ㄧˊ', icon: '👩' },
        { word: '啞鈴', zhuyin: 'ㄧㄚˇ ㄌㄧㄥˊ', icon: '🏋️' }
      ]
    },
    {
      char: 'ㄛ',
      pinyin: 'o',
      type: 'final',
      categoryName: '韻母精靈',
      strokes: 2,
      strokeGuide: ['一筆橫折，二筆豎折撇'],
      mnemonic: 'ㄛ像公雞啼破曉，喔喔喔叫大家起 ㄛㄛㄛ',
      word: '蝸牛',
      wordZhuyin: 'ㄍㄨㄚ ㄋㄧㄡˊ',
      icon: '🐌',
      color: '#E64980',
      examples: [
        { word: '菠菜', zhuyin: 'ㄅㄛ ㄘㄞˋ', icon: '🥬' },
        { word: '蘿蔔', zhuyin: 'ㄌㄨㄛˊ ˙ㄅㄛ', icon: '🥕' },
        { word: '公雞叫', zhuyin: 'ㄍㄨㄥ ㄐㄧ ㄐㄧㄠˋ', icon: '🐓' }
      ]
    },
    {
      char: 'ㄜ',
      pinyin: 'e',
      type: 'final',
      categoryName: '韻母精靈',
      strokes: 2,
      strokeGuide: ['一筆橫折，二筆橫'],
      mnemonic: 'ㄜ像白天鵝遊碧波，美麗脖子彎又彎 ㄜㄜㄜ',
      word: '白鵝',
      wordZhuyin: 'ㄅㄞˊ ㄜˊ',
      icon: '🦢',
      color: '#BE4BDB',
      examples: [
        { word: '白鵝', zhuyin: 'ㄅㄞˊ ㄜˊ', icon: '🦢' },
        { word: '鱷魚', zhuyin: 'ㄜˋ ㄩˊ', icon: '🐊' },
        { word: '肚子餓', zhuyin: 'ㄉㄨˋ ˙ㄗ ㄜˋ', icon: '😋' }
      ]
    },
    {
      char: 'ㄝ',
      pinyin: 'ê',
      type: 'final',
      categoryName: '韻母精靈',
      strokes: 3,
      strokeGuide: ['一筆橫折，二筆橫，三筆豎撇'],
      mnemonic: 'ㄝ像飄落的小綠葉，輕輕落在手掌心 ㄝㄝㄝ',
      word: '樹葉',
      wordZhuyin: 'ㄕㄨˋ ㄧㄝˋ',
      icon: '🍃',
      color: '#7950F2',
      examples: [
        { word: '樹葉', zhuyin: 'ㄕㄨˋ ㄧㄝˋ', icon: '🍃' },
        { word: '椰子', zhuyin: 'ㄧㄝˊ ˙ㄗ', icon: '🥥' },
        { word: '爺爺', zhuyin: 'ㄧㄝˊ ˙ㄧㄝ', icon: '👴' }
      ]
    },
    {
      char: 'ㄞ',
      pinyin: 'ai',
      type: 'final',
      categoryName: '韻母精靈',
      strokes: 3,
      strokeGuide: ['一筆橫，二筆撇，三筆豎撇'],
      mnemonic: 'ㄞ像小女孩綁辮子，乖乖可愛大家愛 ㄞㄞㄞ',
      word: '愛心',
      wordZhuyin: 'ㄞˋ ㄒㄧㄣ',
      icon: '❤️',
      color: '#4C6EF5',
      examples: [
        { word: '愛心', zhuyin: 'ㄞˋ ㄒㄧㄣ', icon: '❤️' },
        { word: '矮小', zhuyin: 'ㄞˇ ㄒㄧㄠˇ', icon: '🧒' },
        { word: '海邊', zhuyin: 'ㄏㄞˇ ㄅㄧㄢ', icon: '🏖️' }
      ]
    },
    {
      char: 'ㄟ',
      pinyin: 'ei',
      type: 'final',
      categoryName: '韻母精靈',
      strokes: 1,
      strokeGuide: ['一筆橫折斜撇'],
      mnemonic: 'ㄟ像海浪翻白浪，浪花朵朵漂過來 ㄟㄟㄟ',
      word: '貝殼',
      wordZhuyin: 'ㄅㄟˋ ㄎㄜˊ',
      icon: '🐚',
      color: '#228BE6',
      examples: [
        { word: '貝殼', zhuyin: 'ㄅㄟˋ ㄎㄜˊ', icon: '🐚' },
        { word: '黑板', zhuyin: 'ㄏㄟ ㄅㄢˇ', icon: '⬛' },
        { word: '飛鳥', zhuyin: 'ㄈㄟ ㄋㄧㄠˇ', icon: '🕊️' }
      ]
    },
    {
      char: 'ㄠ',
      pinyin: 'ao',
      type: 'final',
      categoryName: '韻母精靈',
      strokes: 3,
      strokeGuide: ['一筆撇，二筆橫折，三筆折撇'],
      mnemonic: 'ㄠ像小貓咪叫傲傲，揮動尾巴找媽媽 ㄠㄠㄠ',
      word: '貓頭鷹',
      wordZhuyin: 'ㄇㄠ ㄊㄡˊ ㄧㄥ',
      icon: '🦉',
      color: '#12B886',
      examples: [
        { word: '貓頭鷹', zhuyin: 'ㄇㄠ ㄊㄡˊ ㄧㄥ', icon: '🦉' },
        { word: '書包', zhuyin: 'ㄕㄨ ㄅㄠ', icon: '🎒' },
        { word: '外套', zhuyin: 'ㄨㄞˋ ㄊㄠˋ', icon: '🧥' }
      ]
    },
    {
      char: 'ㄡ',
      pinyin: 'ou',
      type: 'final',
      categoryName: '韻母精靈',
      strokes: 2,
      strokeGuide: ['一筆橫撇，二筆捺'],
      mnemonic: 'ㄡ像白海鷗飛藍天，展翅翱翔水面上 ㄡㄡㄡ',
      word: '海鷗',
      wordZhuyin: 'ㄏㄞˇ ㄡ',
      icon: '🕊️',
      color: '#82C91E',
      examples: [
        { word: '海鷗', zhuyin: 'ㄏㄞˇ ㄡ', icon: '🕊️' },
        { word: '猴子', zhuyin: 'ㄏㄡˊ ˙ㄗ', icon: '🐒' },
        { word: '小狗', zhuyin: 'ㄒㄧㄠˇ ㄍㄡˇ', icon: '🐶' }
      ]
    },
    {
      char: 'ㄢ',
      pinyin: 'an',
      type: 'final',
      categoryName: '韻母精靈',
      strokes: 2,
      strokeGuide: ['一筆橫，二筆撇折橫'],
      mnemonic: 'ㄢ像小馬鞍，騎士坐上好威風 ㄢㄢㄢ',
      word: '安全帽',
      wordZhuyin: 'ㄢ ㄑㄩㄢˊ ㄇㄠˋ',
      icon: '⛑️',
      color: '#FAB005',
      examples: [
        { word: '安全帽', zhuyin: 'ㄢ ㄑㄩㄢˊ ㄇㄠˋ', icon: '⛑️' },
        { word: '斑馬', zhuyin: 'ㄅㄢ ㄇㄚˇ', icon: '🦓' },
        { word: '雨傘', zhuyin: 'ㄩˇ ㄙㄢˇ', icon: '☂️' }
      ]
    },
    {
      char: 'ㄣ',
      pinyin: 'en',
      type: 'final',
      categoryName: '韻母精靈',
      strokes: 2,
      strokeGuide: ['一筆橫折，二筆橫'],
      mnemonic: 'ㄣ像小手指輕輕彎，按一下門鈴叮咚 ㄣㄣㄣ',
      word: '森林',
      wordZhuyin: 'ㄙㄣ ㄌㄧㄣˊ',
      icon: '🌲',
      color: '#FD7E14',
      examples: [
        { word: '森林', zhuyin: 'ㄙㄣ ㄌㄧㄣˊ', icon: '🌲' },
        { word: '針線', zhuyin: 'ㄓㄣ ㄒㄧㄢˋ', icon: '🪡' },
        { word: '時鐘', zhuyin: 'ㄕˊ ㄓㄨㄥ', icon: '⏰' }
      ]
    },
    {
      char: 'ㄤ',
      pinyin: 'ang',
      type: 'final',
      categoryName: '韻母精靈',
      strokes: 3,
      strokeGuide: ['一筆橫，二筆撇，三筆橫折彎鉤'],
      mnemonic: 'ㄤ像棒棒糖甜滋滋，拿在手裡樂開懷 ㄤㄤㄤ',
      word: '棒棒糖',
      wordZhuyin: 'ㄅㄤˋ ㄅㄤˋ ㄊㄤˊ',
      icon: '🍭',
      color: '#F783AC',
      examples: [
        { word: '棒棒糖', zhuyin: 'ㄅㄤˋ ㄅㄤˋ ㄊㄤˊ', icon: '🍭' },
        { word: '太陽', zhuyin: 'ㄊㄞˋ ㄧㄤˊ', icon: '☀️' },
        { word: '鋼琴', zhuyin: 'ㄍㄤ ㄑㄧㄣˊ', icon: '🎹' }
      ]
    },
    {
      char: 'ㄥ',
      pinyin: 'eng',
      type: 'final',
      categoryName: '韻母精靈',
      strokes: 2,
      strokeGuide: ['一筆橫折，二筆提折'],
      mnemonic: 'ㄥ像小蜜蜂嗡嗡嗡，飛到花叢採花蜜 ㄥㄥㄥ',
      word: '蜜蜂',
      wordZhuyin: 'ㄇㄧˋ ㄈㄥ',
      icon: '🐝',
      color: '#DA77F2',
      examples: [
        { word: '蜜蜂', zhuyin: 'ㄇㄧˋ ㄈㄥ', icon: '🐝' },
        { word: '燈籠', zhuyin: 'ㄉㄥ ㄌㄨㄥˊ', icon: '🏮' },
        { word: '風鈴', zhuyin: 'ㄈㄥ ㄌㄧㄥˊ', icon: '🎐' }
      ]
    },
    {
      char: 'ㄦ',
      pinyin: 'er',
      type: 'final',
      categoryName: '韻母精靈',
      strokes: 2,
      strokeGuide: ['一筆撇，二筆豎彎鉤'],
      mnemonic: 'ㄦ像兩隻小耳朵，聽聽媽媽說故事 ㄦㄦㄦ',
      word: '耳朵',
      wordZhuyin: 'ㄦˇ ㄉㄨㄛ˙',
      icon: '👂',
      color: '#9775FA',
      examples: [
        { word: '耳朵', zhuyin: 'ㄦˇ ㄉㄨㄛ˙', icon: '👂' },
        { word: '兒子', zhuyin: 'ㄦˊ ˙ㄗ', icon: '👦' },
        { word: '兒童', zhuyin: 'ㄦˊ ㄊㄨㄥˊ', icon: '🧒' }
      ]
    }
  ],

  // 結合韻（22個，由 ㄧ、ㄨ、ㄩ 與韻母結合）
  combinedFinals: [
    { combo: 'ㄧㄚ', pinyin: 'ia', word: '鴨子', icon: '🦆' },
    { combo: 'ㄧㄛ', pinyin: 'io', word: '小唷', icon: '🗣️' },
    { combo: 'ㄧㄝ', pinyin: 'ie', word: '爺爺', icon: '👴' },
    { combo: 'ㄧㄠ', pinyin: 'iao', word: '搖籃', icon: '🛏️' },
    { combo: 'ㄧㄡ', pinyin: 'iou', word: '游泳', icon: '🏊' },
    { combo: 'ㄧㄢ', pinyin: 'ian', word: '燕子', icon: '🐦' },
    { combo: 'ㄧㄣ', pinyin: 'in', word: '音樂', icon: '🎵' },
    { combo: 'ㄧㄤ', pinyin: 'iang', word: '小羊', icon: '🐑' },
    { combo: 'ㄧㄥ', pinyin: 'ing', word: '老鷹', icon: '🦅' },
    
    { combo: 'ㄨㄚ', pinyin: 'ua', word: '青蛙', icon: '🐸' },
    { combo: 'ㄨㄛ', pinyin: 'uo', word: '鳥窩', icon: '🪺' },
    { combo: 'ㄨㄞ', pinyin: 'uai', word: '乖乖', icon: '👶' },
    { combo: 'ㄨㄟ', pinyin: 'uei', word: '微風', icon: '🍃' },
    { combo: 'ㄨㄢ', pinyin: 'uan', word: '海灣', icon: '🌊' },
    { combo: 'ㄨㄣ', pinyin: 'uen', word: '溫暖', icon: '☀️' },
    { combo: 'ㄨㄤ', pinyin: 'uang', word: '汪汪狗', icon: '🐶' },
    { combo: 'ㄨㄥ', pinyin: 'ueng', word: '老翁', icon: '👴' },

    { combo: 'ㄩㄝ', pinyin: 'üe', word: '月亮', icon: '🌙' },
    { combo: 'ㄩㄢ', pinyin: 'üan', word: '公園', icon: '🌳' },
    { combo: 'ㄩㄣ', pinyin: 'ün', word: '白雲', icon: '☁️' },
    { combo: 'ㄩㄥ', pinyin: 'iong', word: '游泳池', icon: '🏊' }
  ],

  // 聲調資料與小口訣
  tones: [
    {
      id: 1,
      name: '第一聲 (陰平)',
      symbol: 'ˉ',
      mark: '', // 國小第一聲不標
      tuneDesc: '平平的 (高平 55)',
      rhyme: '一聲平平像地平線 🚗💨',
      color: '#4DABF7',
      example: 'ㄅㄚ (八)'
    },
    {
      id: 2,
      name: '第二聲 (陽平)',
      symbol: 'ˊ',
      mark: 'ˊ',
      tuneDesc: '向上爬 (中升 35)',
      rhyme: '二聲向上爬山坡 🚡↗',
      color: '#38D9A9',
      example: 'ㄅㄚˊ (拔)'
    },
    {
      id: 3,
      name: '第三聲 (上聲)',
      symbol: 'ˇ',
      mark: 'ˇ',
      tuneDesc: '轉個彎 (降升 214)',
      rhyme: '三聲轉個彎像雲霄飛車 🎢↷↗',
      color: '#FFA94D',
      example: 'ㄅㄚˇ (把)'
    },
    {
      id: 4,
      name: '第四聲 (去聲)',
      symbol: 'ˋ',
      mark: 'ˋ',
      tuneDesc: '溜滑梯 (全降 51)',
      rhyme: '四聲溜滑梯向下衝 🛝↘',
      color: '#FF6B6B',
      example: 'ㄅㄚˋ (爸)'
    },
    {
      id: 0,
      name: '輕聲',
      symbol: '˙',
      mark: '˙',
      tuneDesc: '輕輕的短音',
      rhyme: '輕聲飄飄像小泡泡 🎈˙',
      color: '#DA77F2',
      example: '˙ㄅㄚ (爸爸的後字)'
    }
  ],

  // 拼音小火車常見字庫與合音字典
  blendingDictionary: [
    { initial: 'ㄅ', medial: '', final: 'ㄚ', tone: 1, char: '八', word: '八個蘋果', pinyin: 'bā' },
    { initial: 'ㄅ', medial: '', final: 'ㄚ', tone: 2, char: '拔', word: '拔蘿蔔', pinyin: 'bá' },
    { initial: 'ㄅ', medial: '', final: 'ㄚ', tone: 3, char: '把', word: '一把雨傘', pinyin: 'bǎ' },
    { initial: 'ㄅ', medial: '', final: 'ㄚ', tone: 4, char: '爸', word: '爸爸', pinyin: 'bà' },
    { initial: 'ㄅ', medial: '', final: 'ㄢ', tone: 1, char: '斑', word: '斑馬', pinyin: 'bān' },
    { initial: 'ㄅ', medial: '', final: 'ㄠ', tone: 3, char: '飽', word: '吃飽了', pinyin: 'bǎo' },
    { initial: 'ㄆ', medial: '', final: 'ㄠ', tone: 3, char: '跑', word: '跑步', pinyin: 'pǎo' },
    { initial: 'ㄆ', medial: 'ㄧ', final: 'ㄥ', tone: 2, char: '平', word: '蘋果', pinyin: 'píng' },
    { initial: 'ㄇ', medial: '', final: 'ㄚ', tone: 1, char: '媽', word: '媽媽', pinyin: 'mā' },
    { initial: 'ㄇ', medial: '', final: 'ㄠ', tone: 1, char: '貓', word: '貓咪', pinyin: 'māo' },
    { initial: 'ㄈ', medial: '', final: 'ㄟ', tone: 1, char: '飛', word: '飛機', pinyin: 'fēi' },
    { initial: 'ㄉ', medial: '', final: 'ㄚ', tone: 4, char: '大', word: '大象', pinyin: 'dà' },
    { initial: 'ㄊ', medial: '', final: 'ㄞ', tone: 4, char: '太', word: '太陽', pinyin: 'tài' },
    { initial: 'ㄊ', medial: '', final: 'ㄨ', tone: 4, char: '兔', word: '兔子', pinyin: 'tù' },
    { initial: 'ㄋ', medial: 'ㄧ', final: 'ㄠ', tone: 3, char: '鳥', word: '小鳥', pinyin: 'niǎo' },
    { initial: 'ㄌ', medial: '', final: 'ㄠ', tone: 3, char: '老', word: '老虎', pinyin: 'lǎo' },
    { initial: 'ㄍ', medial: '', final: 'ㄜ', tone: 1, char: '哥', word: '哥哥', pinyin: 'gē' },
    { initial: 'ㄍ', medial: 'ㄨ', final: 'ㄚ', tone: 1, char: '瓜', word: '西瓜', pinyin: 'guā' },
    { initial: 'ㄎ', medial: '', final: 'ㄜ', tone: 3, char: '渴', word: '口渴喝水', pinyin: 'kě' },
    { initial: 'ㄏ', medial: 'ㄨ', final: 'ㄚ', tone: 1, char: '花', word: '花朵', pinyin: 'huā' },
    { initial: 'ㄐ', medial: 'ㄧ', final: '', tone: 1, char: '雞', word: '小雞', pinyin: 'jī' },
    { initial: 'ㄑ', medial: 'ㄧ', final: '', tone: 4, char: '氣', word: '生氣/氣球', pinyin: 'qì' },
    { initial: 'ㄒ', medial: 'ㄧ', final: 'ㄠ', tone: 3, char: '小', word: '小朋友', pinyin: 'xiǎo' },
    { initial: 'ㄓ', medial: '', final: 'ㄨ', tone: 1, char: '豬', word: '小豬', pinyin: 'zhū' },
    { initial: 'ㄔ', medial: '', final: 'ㄜ', tone: 1, char: '車', word: '火車', pinyin: 'chē' },
    { initial: 'ㄕ', medial: '', final: '', tone: 1, char: '獅', word: '獅子', pinyin: 'shī' },
    { initial: 'ㄕ', medial: 'ㄨ', final: '', tone: 1, char: '書', word: '看書', pinyin: 'shū' },
    { initial: 'ㄖ', medial: '', final: '', tone: 4, char: '日', word: '日曆', pinyin: 'rì' },
    { initial: 'ㄗ', medial: '', final: 'ㄨ', tone: 2, char: '足', word: '足球', pinyin: 'zú' },
    { initial: 'ㄘ', medial: '', final: 'ㄠ', tone: 3, char: '草', word: '青草', pinyin: 'cǎo' },
    { initial: 'ㄙ', medial: '', final: 'ㄣ', tone: 1, char: '森', word: '森林', pinyin: 'sēn' },
    { initial: '', medial: 'ㄧ', final: '', tone: 1, char: '衣', word: '衣服', pinyin: 'yī' },
    { initial: '', medial: 'ㄨ', final: '', tone: 1, char: '屋', word: '房屋', pinyin: 'wū' },
    { initial: '', medial: 'ㄩ', final: '', tone: 2, char: '魚', word: '小魚', pinyin: 'yú' },
    { initial: '', medial: 'ㄩ', final: 'ㄝ', tone: 4, char: '月', word: '月亮', pinyin: 'yuè' }
  ],

  // 國小一注音挑戰題目庫（三種遊戲測驗）
  quizItems: [
    {
      type: 'listen_symbol',
      target: 'ㄅ',
      speechPrompt: 'ㄅ',
      options: ['ㄅ', 'ㄉ', 'ㄆ', 'ㄇ'],
      hint: '斑馬的ㄅ，橫折、橫'
    },
    {
      type: 'listen_symbol',
      target: 'ㄆ',
      speechPrompt: 'ㄆ',
      options: ['ㄆ', 'ㄈ', 'ㄅ', 'ㄎ'],
      hint: '蘋果的ㄆ，小水盆潑水'
    },
    {
      type: 'listen_symbol',
      target: 'ㄇ',
      speechPrompt: 'ㄇ',
      options: ['ㄇ', 'ㄈ', 'ㄩ', '凵'],
      hint: '貓咪的ㄇ，小山洞'
    },
    {
      type: 'listen_symbol',
      target: 'ㄈ',
      speechPrompt: 'ㄈ',
      options: ['ㄈ', 'ㄇ', 'ㄅ', 'ㄏ'],
      hint: '飛機的ㄈ，像小拐杖'
    },
    {
      type: 'listen_symbol',
      target: 'ㄉ',
      speechPrompt: 'ㄉ',
      options: ['ㄉ', 'ㄅ', 'ㄌ', 'ㄊ'],
      hint: '大象的ㄉ，馬蹄得得得'
    },
    {
      type: 'listen_symbol',
      target: 'ㄊ',
      speechPrompt: 'ㄊ',
      options: ['ㄊ', 'ㄉ', 'ㄍ', 'ㄎ'],
      hint: '太陽的ㄊ，像一把小雨傘'
    },
    {
      type: 'listen_symbol',
      target: 'ㄋ',
      speechPrompt: 'ㄋ',
      options: ['ㄋ', 'ㄌ', 'ㄖ', 'ㄗ'],
      hint: '牛奶的ㄋ，小泥人'
    },
    {
      type: 'listen_symbol',
      target: 'ㄌ',
      speechPrompt: 'ㄌ',
      options: ['ㄌ', 'ㄋ', 'ㄉ', 'ㄎ'],
      hint: '鈴鐺的ㄌ，丁零噹啷響'
    },
    {
      type: 'listen_symbol',
      target: 'ㄍ',
      speechPrompt: 'ㄍ',
      options: ['ㄍ', 'ㄎ', 'ㄑ', 'ㄏ'],
      hint: '鴿子的ㄍ，高高大哥哥'
    },
    {
      type: 'listen_symbol',
      target: 'ㄎ',
      speechPrompt: 'ㄎ',
      options: ['ㄎ', 'ㄍ', 'ㄏ', 'ㄈ'],
      hint: '恐龍的ㄎ，開口哈哈笑'
    },
    {
      type: 'listen_symbol',
      target: 'ㄏ',
      speechPrompt: 'ㄏ',
      options: ['ㄏ', 'ㄎ', 'ㄍ', 'ㄖ'],
      hint: '花朵的ㄏ，懸崖小涼亭'
    },
    {
      type: 'listen_symbol',
      target: 'ㄐ',
      speechPrompt: 'ㄐ',
      options: ['ㄐ', 'ㄑ', 'ㄒ', 'ㄓ'],
      hint: '小雞的ㄐ，嘰嘰喳喳'
    },
    {
      type: 'listen_symbol',
      target: 'ㄑ',
      speechPrompt: 'ㄑ',
      options: ['ㄑ', 'ㄐ', 'ㄒ', 'ㄍ'],
      hint: '汽車的ㄑ，迎風小紅旗'
    },
    {
      type: 'listen_symbol',
      target: 'ㄒ',
      speechPrompt: 'ㄒ',
      options: ['ㄒ', 'ㄐ', 'ㄑ', 'ㄕ'],
      hint: '西瓜的ㄒ，切開一牙牙'
    },
    {
      type: 'listen_symbol',
      target: 'ㄓ',
      speechPrompt: 'ㄓ',
      options: ['ㄓ', 'ㄗ', 'ㄔ', 'ㄕ'],
      hint: '蜘蛛的ㄓ，翹起舌頭'
    },
    {
      type: 'listen_symbol',
      target: 'ㄔ',
      speechPrompt: 'ㄔ',
      options: ['ㄔ', 'ㄘ', 'ㄓ', 'ㄕ'],
      hint: '火車的ㄔ，小湯匙'
    },
    {
      type: 'listen_symbol',
      target: 'ㄕ',
      speechPrompt: 'ㄕ',
      options: ['ㄕ', 'ㄙ', 'ㄓ', 'ㄖ'],
      hint: '獅子的ㄕ，森林大國王'
    },
    {
      type: 'listen_symbol',
      target: 'ㄖ',
      speechPrompt: 'ㄖ',
      options: ['ㄖ', 'ㄌ', 'ㄋ', 'ㄓ'],
      hint: '日曆的ㄖ，溫暖紅太陽'
    },
    {
      type: 'listen_symbol',
      target: 'ㄗ',
      speechPrompt: 'ㄗ',
      options: ['ㄗ', 'ㄓ', 'ㄘ', 'ㄙ'],
      hint: '足球的ㄗ，平舌頭'
    },
    {
      type: 'listen_symbol',
      target: 'ㄘ',
      speechPrompt: 'ㄘ',
      options: ['ㄘ', 'ㄔ', 'ㄗ', 'ㄙ'],
      hint: '草莓的ㄘ，小刺蝟'
    },
    {
      type: 'listen_symbol',
      target: 'ㄙ',
      speechPrompt: 'ㄙ',
      options: ['ㄙ', 'ㄕ', 'ㄗ', 'ㄘ'],
      hint: '森林的ㄙ，小蠶寶寶'
    },
    {
      type: 'listen_symbol',
      target: 'ㄧ',
      speechPrompt: 'ㄧ',
      options: ['ㄧ', '一', 'ㄩ', 'ㄨ'],
      hint: '衣服的ㄧ，像魔術棒'
    },
    {
      type: 'listen_symbol',
      target: 'ㄨ',
      speechPrompt: 'ㄨ',
      options: ['ㄨ', 'ㄩ', 'ㄧ', 'ㄡ'],
      hint: '烏龜的ㄨ，圓圓小屋頂'
    },
    {
      type: 'listen_symbol',
      target: 'ㄩ',
      speechPrompt: 'ㄩ',
      options: ['ㄩ', 'ㄨ', 'ㄧ', 'ㄇ'],
      hint: '金魚的ㄩ，吐泡泡'
    }
  ],

  // ========================================================
  // 🗺️ 冒險島 10 大闖關關卡 (依據小一前十週注音進度設計)
  // ========================================================
  adventureStages: [
    {
      id: 1,
      name: '第一關：微風森林',
      subtitle: 'ㄅㄆㄇㄈ 唇音村',
      icon: '🌲',
      bossIcon: '🦊',
      bossName: '小狐狸奇奇',
      color: '#51CF66',
      bgGradient: 'linear-gradient(135deg, #D3F9D8, #B2F2BB)',
      desc: '認識最常見的唇音好朋友：ㄅ、ㄆ、ㄇ、ㄈ！',
      questions: [
        {
          qType: 'listen_pick',
          prompt: '聽老師唸：像收音機天線豎起來的「ㄅ」是哪一個？',
          speakText: '第一題！請找出，ㄅ，斑馬的ㄅ！',
          icon: '🦓',
          hint: '斑馬的 ㄅ，一筆橫折、二筆橫',
          answer: 'ㄅ',
          options: ['ㄅ', 'ㄆ', 'ㄇ', 'ㄈ']
        },
        {
          qType: 'pic_pick',
          prompt: '看圖選注音：「🍎 蘋果」的「蘋」，第一個注音是什麼？',
          speakText: '紅通通的蘋果，請問蘋的第一個注音是什麼呢？',
          icon: '🍎',
          word: '蘋果 (？ㄧㄥˊ ㄍㄨㄛˇ)',
          hint: 'ㄆ像小水盆，蘋果的ㄆ',
          answer: 'ㄆ',
          options: ['ㄆ', 'ㄅ', 'ㄈ', 'ㄉ']
        },
        {
          qType: 'listen_pick',
          prompt: '聽音挑戰：像小山洞一樣，「🐱 貓咪」的「ㄇ」是哪一個？',
          speakText: '喵～！貓咪的ㄇ，請找出像小山洞的ㄇ！',
          icon: '🐱',
          hint: 'ㄇ像小山洞，鑽進山洞裡',
          answer: 'ㄇ',
          options: ['ㄇ', 'ㄈ', 'ㄩ', 'ㄅ']
        },
        {
          qType: 'pic_pick',
          prompt: '看圖選注音：「✈️ 飛機」在天上飛，「飛」的聲母是什麼？',
          speakText: '飛機飛高高！請問飛機的飛，開頭是哪一個注音呢？',
          icon: '✈️',
          word: '飛機 (？ㄟ ㄐㄧ)',
          hint: 'ㄈ像老爺爺的拐杖',
          answer: 'ㄈ',
          options: ['ㄈ', 'ㄇ', 'ㄆ', 'ㄊ']
        },
        {
          qType: 'pic_pick',
          prompt: '守關題：「🐝 蜜蜂」嗡嗡嗡，「蜜」的聲母是哪一個？',
          speakText: '最後一題囉！小蜜蜂的蜜，開頭是哪一個注音呢？',
          icon: '🐝',
          word: '蜜蜂 (？ㄧˋ ㄈㄥ)',
          hint: '蜜蜂的蜜，是 ㄇ 喔！',
          answer: 'ㄇ',
          options: ['ㄇ', 'ㄅ', 'ㄆ', 'ㄈ']
        }
      ]
    },
    {
      id: 2,
      name: '第二關：陽光草原',
      subtitle: 'ㄉㄊㄋㄌ 舌尖營地',
      icon: '🌻',
      bossIcon: '🦁',
      bossName: '草原小獅王',
      color: '#FCC419',
      bgGradient: 'linear-gradient(135deg, #FFF3BF, #FFEC99)',
      desc: '分辨長得很像的 ㄉ、ㄊ、ㄋ、ㄌ 四兄弟！',
      questions: [
        {
          qType: 'listen_pick',
          prompt: '聽音辨字：馬蹄得得得，「🐘 大象」的「ㄉ」是哪一個？',
          speakText: '請找出，ㄉ，大象的ㄉ！小心不要跟ㄅ搞混囉！',
          icon: '🐘',
          hint: 'ㄉ的肚子在左邊，像小馬蹄',
          answer: 'ㄉ',
          options: ['ㄉ', 'ㄅ', 'ㄊ', 'ㄌ']
        },
        {
          qType: 'pic_pick',
          prompt: '看圖選注音：「🐰 兔子」跳跳跳，「兔」的聲母是什麼？',
          speakText: '可愛的小兔子！請問兔子的兔，第一個注音是什麼呢？',
          icon: '🐰',
          word: '兔子 (？ㄨˋ ˙ㄗ)',
          hint: 'ㄊ像一把小雨傘',
          answer: 'ㄊ',
          options: ['ㄊ', 'ㄉ', 'ㄋ', 'ㄌ']
        },
        {
          qType: 'listen_pick',
          prompt: '聽音挑戰：「🥛 牛奶」好營養，請找出牛奶的「ㄋ」！',
          speakText: '喝牛奶長高高！請找出牛奶的，ㄋ！',
          icon: '🥛',
          hint: 'ㄋ像小泥人，一筆橫折折、二筆撇',
          answer: 'ㄋ',
          options: ['ㄋ', 'ㄌ', 'ㄉ', 'ㄖ']
        },
        {
          qType: 'pic_pick',
          prompt: '看圖選注音：「🐯 老虎」大聲吼，「老」的聲母是什麼？',
          speakText: '大老虎來了！請問老虎的老，開頭是哪一個注音呢？',
          icon: '🐯',
          word: '老虎 (？ㄠˇ ㄏㄨˇ)',
          hint: 'ㄌ像掛著的小鈴鐺，老虎的ㄌ',
          answer: 'ㄌ',
          options: ['ㄌ', 'ㄋ', 'ㄉ', 'ㄎ']
        },
        {
          qType: 'pic_pick',
          prompt: '守關題：「☀️ 太陽」笑咪咪，「太」的完整注音是哪一個？',
          speakText: '太陽公公出來了！請問太陽的太，注音怎麼拼呢？',
          icon: '☀️',
          word: '太陽 (？ ㄧㄤˊ)',
          hint: 'ㄊ ＋ ㄞ ＋ 四聲 ˋ ＝ ㄊㄞˋ',
          answer: 'ㄊㄞˋ',
          options: ['ㄊㄞˋ', 'ㄉㄞˋ', 'ㄌㄞˋ', 'ㄋㄞˋ']
        }
      ]
    },
    {
      id: 3,
      name: '第三關：恐龍山谷',
      subtitle: 'ㄍㄎㄏ 與 ㄐㄑㄒ 峽谷',
      icon: '🌋',
      bossIcon: '🦖',
      bossName: '暴龍阿卡',
      color: '#FF922B',
      bgGradient: 'linear-gradient(135deg, #FFE8CC, #FFD8A8)',
      desc: '勇闖恐龍山谷，收服 ㄍㄎㄏ 與 ㄐㄑㄒ！',
      questions: [
        {
          qType: 'pic_pick',
          prompt: '看圖選注音：「🦖 恐龍」的「恐」，第一個注音是什麼？',
          speakText: '吼～！大恐龍出現了！請問恐龍的恐，第一個注音是什麼？',
          icon: '🦖',
          word: '恐龍 (？ㄨㄥˇ ㄌㄨㄥˊ)',
          hint: 'ㄎ像開口笑，恐龍的ㄎ',
          answer: 'ㄎ',
          options: ['ㄎ', 'ㄍ', 'ㄏ', 'ㄆ']
        },
        {
          qType: 'listen_pick',
          prompt: '聽音辨字：高高瘦瘦大哥哥，請選出「🕊️ 鴿子」的「ㄍ」！',
          speakText: '請找出，ㄍ，鴿子的ㄍ，哥哥的ㄍ！',
          icon: '🕊️',
          hint: 'ㄍ有兩條腿，一筆撇折、二筆豎',
          answer: 'ㄍ',
          options: ['ㄍ', 'ㄑ', 'ㄎ', 'ㄏ']
        },
        {
          qType: 'pic_pick',
          prompt: '看圖選注音：「🌸 花朵」真美麗，「花」的聲母是什麼？',
          speakText: '香噴噴的花朵！請問花朵的花，第一個注音是什麼呢？',
          icon: '🌸',
          word: '花朵 (？ㄨㄚ ㄉㄨㄛˇ)',
          hint: 'ㄏ像懸崖邊的小亭子',
          answer: 'ㄏ',
          options: ['ㄏ', 'ㄎ', 'ㄈ', 'ㄒ']
        },
        {
          qType: 'listen_pick',
          prompt: '聽音挑戰：小母雞嘰嘰喳喳，請找出「🤖 機器人」的「ㄐ」！',
          speakText: '請找出，ㄐ，小雞跟機器人的ㄐ！',
          icon: '🤖',
          hint: 'ㄐ像小母雞，三畫寫成',
          answer: 'ㄐ',
          options: ['ㄐ', 'ㄑ', 'ㄒ', 'ㄓ']
        },
        {
          qType: 'pic_pick',
          prompt: '守關題：「🍉 西瓜」又大又甜，「西」跟「瓜」的聲母分別是？',
          speakText: '清涼的大西瓜！請問西瓜兩個字的開頭聲母是什麼呢？',
          icon: '🍉',
          word: '西瓜 (？ㄧ ？ㄨㄚ)',
          hint: 'ㄒㄧ（西）＋ ㄍㄨㄚ（瓜）',
          answer: 'ㄒ 和 ㄍ',
          options: ['ㄒ 和 ㄍ', 'ㄐ 和 ㄎ', 'ㄑ 和 ㄏ', 'ㄕ 和 ㄍ']
        }
      ]
    },
    {
      id: 4,
      name: '第四關：翹舌神殿',
      subtitle: 'ㄓㄔㄕㄖ vs ㄗㄘㄙ 對決',
      icon: '🏛️',
      bossIcon: '🐉',
      bossName: '神殿小青龍',
      color: '#339AF0',
      bgGradient: 'linear-gradient(135deg, #E7F5FF, #D0EBFF)',
      desc: '小一最愛考！分清楚翹舌音（ㄓㄔㄕㄖ）與平舌音（ㄗㄘㄙ）！',
      questions: [
        {
          qType: 'listen_pick',
          prompt: '聽音辨別：舌頭翹起來！「🕷️ 蜘蛛」的「ㄓ」是哪一個？',
          speakText: '注意聽喔！舌頭翹起來，ㄓ，蜘蛛的ㄓ！',
          icon: '🕷️',
          hint: 'ㄓ上面有一點，總共 4 畫喔！',
          answer: 'ㄓ',
          options: ['ㄓ', 'ㄗ', 'ㄔ', 'ㄕ']
        },
        {
          qType: 'pic_pick',
          prompt: '平翹舌大考驗：「⚽ 足球」的「足」，聲母是平舌還是翹舌？',
          speakText: '踢足球囉！請問足球的足，開頭是ㄗ還是ㄓ呢？',
          icon: '⚽',
          word: '足球 (？ㄨˊ ㄑㄧㄡˊ)',
          hint: '足球是平舌音「ㄗ」喔！',
          answer: 'ㄗ',
          options: ['ㄗ', 'ㄓ', 'ㄘ', 'ㄔ']
        },
        {
          qType: 'pic_pick',
          prompt: '看圖選注音：「🚂 火車」嘟嘟嘟，「車」的注音是哪一個？',
          speakText: '火車開動了！請問火車的車，注音是ㄔㄜ還是ㄘㄜ呢？',
          icon: '🚂',
          word: '火車 (ㄏㄨㄛˇ ？)',
          hint: '車是翹舌音 ㄔ ＋ ㄜ ＝ ㄔㄜ',
          answer: 'ㄔㄜ',
          options: ['ㄔㄜ', 'ㄘㄜ', 'ㄕㄜ', 'ㄙㄜ']
        },
        {
          qType: 'listen_pick',
          prompt: '聽音挑戰：舌頭放平平，「🌲 森林」的「ㄙ」是哪一個？',
          speakText: '舌頭放平平，請找出森林的，ㄙ！不要選成獅子的ㄕ喔！',
          icon: '🌲',
          hint: 'ㄙ像小蠶寶寶，平舌音',
          answer: 'ㄙ',
          options: ['ㄙ', 'ㄕ', 'ㄘ', 'ㄖ']
        },
        {
          qType: 'pic_pick',
          prompt: '守關題：「🦁 獅子」是森林之王，「獅」的聲母是哪一個？',
          speakText: '大獅子吼叫了！請問獅子的獅，開頭聲母是哪一個呢？',
          icon: '🦁',
          word: '獅子 (？ ˙ㄗ)',
          hint: '獅子要翹舌，是「ㄕ」喔！',
          answer: 'ㄕ',
          options: ['ㄕ', 'ㄙ', 'ㄓ', 'ㄖ']
        }
      ]
    },
    {
      id: 5,
      name: '第五關：精靈湖畔',
      subtitle: 'ㄧㄨㄩ 與單韻母 ㄚㄛㄜㄝ',
      icon: '🦢',
      bossIcon: '🧚',
      bossName: '湖畔水精靈',
      color: '#20C997',
      bgGradient: 'linear-gradient(135deg, #E6FCF5, #C3FAE8)',
      desc: '認識介音三寶（ㄧ、ㄨ、ㄩ）與張大嘴巴的單韻母！',
      questions: [
        {
          qType: 'listen_pick',
          prompt: '聽音辨字：嘴巴圓圓吐泡泡，「🐠 金魚」的「ㄩ」是哪一個？',
          speakText: '小金魚游呀游！請找出金魚的，ㄩ！',
          icon: '🐠',
          hint: 'ㄩ像金魚缸，開口朝上',
          answer: 'ㄩ',
          options: ['ㄩ', 'ㄨ', 'ㄧ', 'ㄇ']
        },
        {
          qType: 'pic_pick',
          prompt: '看圖選注音：「🐢 烏龜」慢慢爬，「烏」的注音是什麼？',
          speakText: '小烏龜背著殼！請問烏龜的烏，是哪一個注音符號呢？',
          icon: '🐢',
          word: '烏龜 (？ ㄍㄨㄟ)',
          hint: '烏龜的 ㄨ，像圓圓小屋頂',
          answer: 'ㄨ',
          options: ['ㄨ', 'ㄩ', 'ㄧ', 'ㄛ']
        },
        {
          qType: 'listen_pick',
          prompt: '聽音挑戰：張大嘴巴 ㄚㄚㄚ，請選出「🦆 小鴨」的韻母「ㄚ」！',
          speakText: '張大嘴巴，ㄚ～！請選出ㄚ！',
          icon: '🦆',
          hint: 'ㄚ像小樹杈',
          answer: 'ㄚ',
          options: ['ㄚ', 'ㄛ', 'ㄜ', 'ㄝ']
        },
        {
          qType: 'pic_pick',
          prompt: '看圖選注音：「🦢 白鵝」水上游，「鵝」是哪一個韻母加上二聲？',
          speakText: '天鵝白鵝水上游，請問鵝是哪一個注音呢？',
          icon: '🦢',
          word: '白鵝 (ㄅㄞˊ ？)',
          hint: 'ㄜ ＋ 二聲 ˊ ＝ ㄜˊ',
          answer: 'ㄜˊ',
          options: ['ㄜˊ', 'ㄛˊ', 'ㄚˊ', 'ㄝˊ']
        },
        {
          qType: 'pic_pick',
          prompt: '守關題：「👕 衣服」真乾淨，「衣」是哪一個介音符號？',
          speakText: '穿新衣服囉！請問衣服的衣，是哪一個符號呢？',
          icon: '👕',
          word: '衣服 (？ ㄈㄨˊ)',
          hint: '衣服的 ㄧ',
          answer: 'ㄧ',
          options: ['ㄧ', 'ㄨ', 'ㄩ', 'ㄚ']
        }
      ]
    },
    {
      id: 6,
      name: '第六關：彩虹吊橋',
      subtitle: '複韻母與鼻韻母大考驗',
      icon: '🌈',
      bossIcon: '🦄',
      bossName: '彩虹獨角獸',
      color: '#845EF7',
      bgGradient: 'linear-gradient(135deg, #F3F0FF, #E5DBFF)',
      desc: '分辨小一最容易搞混的 ㄞ/ㄟ、ㄠ/ㄡ 以及閃電 ㄣ/ㄥ！',
      questions: [
        {
          qType: 'listen_pick',
          prompt: '聽音辨字：冬天穿棉襖，請選出「🍓 草莓」的「莓」韻母「ㄟ」！',
          speakText: '請仔細聽喔！ㄟ，飛高高的ㄟ，草莓的ㄟ！',
          icon: '🍓',
          hint: 'ㄟ是一筆橫撇、二筆捺，像溜滑梯',
          answer: 'ㄟ',
          options: ['ㄟ', 'ㄞ', 'ㄠ', 'ㄡ']
        },
        {
          qType: 'pic_pick',
          prompt: '閃電鼻音對決：「⚡ 閃電」的「閃 (ㄕㄢˇ)」，韻母是 ㄢ 還是 ㄤ？',
          speakText: '轟隆隆閃電來了！請問閃電的閃，韻母是ㄢ還是ㄤ呢？',
          icon: '⚡',
          word: '閃電 (ㄕ？ˇ ㄉㄧㄢˋ)',
          hint: '閃是前鼻音「ㄢ」喔！',
          answer: 'ㄢ',
          options: ['ㄢ', 'ㄤ', 'ㄣ', 'ㄥ']
        },
        {
          qType: 'pic_pick',
          prompt: '閃電鼻音對決：「🍬 糖果」好甜喔！「糖 (ㄊㄤˊ)」的韻母是哪一個？',
          speakText: '甜甜的糖果！請問糖果的糖，韻母是ㄢ還是ㄤ呢？',
          icon: '🍬',
          word: '糖果 (ㄊ？ˊ ㄍㄨㄛˇ)',
          hint: '糖果嘴巴張大有後鼻音，是「ㄤ」！',
          answer: 'ㄤ',
          options: ['ㄤ', 'ㄢ', 'ㄥ', 'ㄣ']
        },
        {
          qType: 'listen_pick',
          prompt: '聽音挑戰：請分清楚「ㄣ」與「ㄥ」，找出「🎐 風箏」的韻母「ㄥ」！',
          speakText: '請找出，ㄥ！蜜蜂跟風箏的ㄥ，有後鼻音喔！',
          icon: '🎐',
          hint: 'ㄥ上面是一筆橫折，下面是撇折',
          answer: 'ㄥ',
          options: ['ㄥ', 'ㄣ', 'ㄤ', 'ㄦ']
        },
        {
          qType: 'pic_pick',
          prompt: '守關題：「👂 耳朵」聽聲音，「耳」是哪一個韻母加上三聲？',
          speakText: '小耳朵聽聲音！請問耳朵的耳，是哪一個注音呢？',
          icon: '👂',
          word: '耳朵 (？ ˙ㄉㄨㄛ)',
          hint: 'ㄦ ＋ 三聲 ˇ ＝ ㄦˇ',
          answer: 'ㄦˇ',
          options: ['ㄦˇ', 'ㄜˇ', 'ㄢˇ', 'ㄡˇ']
        }
      ]
    },
    {
      id: 7,
      name: '第七關：雲霄飛車',
      subtitle: '四聲調值聽力大冒險',
      icon: '🎢',
      bossIcon: '🐼',
      bossName: '功夫貓熊阿寶',
      color: '#F06595',
      bgGradient: 'linear-gradient(135deg, #FFF0F6, #FFDEEB)',
      desc: '一聲平、二聲揚、三聲轉彎、四聲溜滑梯！成為聲調神射手！',
      questions: [
        {
          qType: 'tone_pick',
          prompt: '聲調神射手：「☀️ 太陽」的「太 (ㄊㄞˋ)」，是第幾聲？',
          speakText: '聽聽看喔！太陽的太，ㄊㄞˋ，是第幾聲呢？',
          icon: '☀️',
          word: '太陽 → 太 (ㄊㄞˋ)',
          hint: '四聲溜滑梯往下衝 ˋ',
          answer: '第四聲 ˋ',
          options: ['第一聲 ˉ', '第二聲 ˊ', '第三聲 ˇ', '第四聲 ˋ']
        },
        {
          qType: 'tone_pick',
          prompt: '聲調神射手：「🥕 拔蘿蔔」的「拔 (ㄅㄚˊ)」，是第幾聲？',
          speakText: '嘿呦嘿呦拔蘿蔔！請問拔蘿蔔的拔，ㄅㄚˊ，是第幾聲呢？',
          icon: '🥕',
          word: '拔蘿蔔 → 拔 (ㄅㄚˊ)',
          hint: '二聲往上爬山坡 ˊ',
          answer: '第二聲 ˊ',
          options: ['第一聲 ˉ', '第二聲 ˊ', '第三聲 ˇ', '第四聲 ˋ']
        },
        {
          qType: 'tone_pick',
          prompt: '聲調神射手：「🐦 小鳥」的「鳥 (ㄋㄧㄠˇ)」，是第幾聲？',
          speakText: '小鳥在唱歌！請問小鳥的鳥，ㄋㄧㄠˇ，是第幾聲呢？',
          icon: '🐦',
          word: '小鳥 → 鳥 (ㄋㄧㄠˇ)',
          hint: '三聲打勾轉個彎 ˇ',
          answer: '第三聲 ˇ',
          options: ['第一聲 ˉ', '第二聲 ˊ', '第三聲 ˇ', '第四聲 ˋ']
        },
        {
          qType: 'tone_pick',
          prompt: '聲調神射手：「🍉 西瓜」的「西 (ㄒㄧ)」，是第幾聲？',
          speakText: '甜滋滋的西瓜！請問西瓜的西，ㄒㄧ，是第幾聲呢？',
          icon: '🍉',
          word: '西瓜 → 西 (ㄒㄧ)',
          hint: '一聲平平的一條線 ˉ',
          answer: '第一聲 ˉ',
          options: ['第一聲 ˉ', '第二聲 ˊ', '第三聲 ˇ', '第四聲 ˋ']
        },
        {
          qType: 'tone_pick',
          prompt: '守關題：「👨 爸爸 (ㄅㄚˋ ˙ㄅㄚ)」後面的第二個「爸」，是什麼聲調？',
          speakText: '爸爸的後面那個字，唸得輕輕短短的，請問是什麼聲調呢？',
          icon: '👨',
          word: '爸爸 → ˙ㄅㄚ (後字)',
          hint: '上面有一個小圓點 ˙，輕輕點一下',
          answer: '輕聲 ˙',
          options: ['輕聲 ˙', '第一聲 ˉ', '第二聲 ˊ', '第四聲 ˋ']
        }
      ]
    },
    {
      id: 8,
      name: '第八關：魔法火車站',
      subtitle: '兩拼合音列車長',
      icon: '🚂',
      bossIcon: '🦉',
      bossName: '貓頭鷹站長',
      color: '#FD7E14',
      bgGradient: 'linear-gradient(135deg, #FFF4E6, #FFE8CC)',
      desc: '把聲母車廂和韻母車廂拼在一起，拼出正確的國字讀音！',
      questions: [
        {
          qType: 'blend_pick',
          prompt: '魔法拼音：「ㄅ」＋「ㄚ」＋「一聲」，合起來是什麼字？',
          speakText: '跟著火車拼拼看：ㄅ～，ㄚ～，一聲，ㄅㄚ！請問是哪一個字呢？',
          icon: '🍎',
          word: 'ㄅ ＋ ㄚ ＝ ？',
          hint: 'ㄅㄚ，八個蘋果的「八」！',
          answer: '八 (ㄅㄚ)',
          options: ['八 (ㄅㄚ)', '爸 (ㄅㄚˋ)', '媽 (ㄇㄚ)', '大 (ㄉㄚˋ)']
        },
        {
          qType: 'blend_pick',
          prompt: '看圖拼注音：要拼出「🐱 貓咪」的「貓」，應該怎麼拼？',
          speakText: '貓咪的貓，ㄇㄠ，請問要用哪兩個符號拼起來呢？',
          icon: '🐱',
          word: '貓 ＝ ？ ＋ ？',
          hint: 'ㄇ～，ㄠ～，一聲 ㄇㄠ！',
          answer: 'ㄇ ＋ ㄠ',
          options: ['ㄇ ＋ ㄠ', 'ㄇ ＋ ㄡ', 'ㄅ ＋ ㄠ', 'ㄈ ＋ ㄠ']
        },
        {
          qType: 'blend_pick',
          prompt: '看圖拼注音：要拼出「🏃 跑步」的「跑」，正確注音是？',
          speakText: '操場跑步囉！請問跑步的跑，ㄆㄠˇ，怎麼拼呢？',
          icon: '🏃',
          word: '跑 ＝ ？',
          hint: 'ㄆ ＋ ㄠ ＋ 三聲 ˇ ＝ ㄆㄠˇ',
          answer: 'ㄆㄠˇ',
          options: ['ㄆㄠˇ', 'ㄅㄠˇ', 'ㄊㄠˇ', 'ㄆㄡˇ']
        },
        {
          qType: 'blend_pick',
          prompt: '看圖拼注音：「🌱 青草」的「草」，正確的注音是哪一個？',
          speakText: '綠油油的青草！請問草地的草，注音是哪一個呢？',
          icon: '🌱',
          word: '草 ＝ ？',
          hint: '草是平舌音 ㄘ ＋ ㄠ ＋ ˇ ＝ ㄘㄠˇ',
          answer: 'ㄘㄠˇ',
          options: ['ㄘㄠˇ', 'ㄔㄠˇ', 'ㄗㄠˇ', 'ㄙㄠˇ']
        },
        {
          qType: 'blend_pick',
          prompt: '守關題：「🐘 大象」的「大」，是由哪三個部分拼成的？',
          speakText: '大象的大，ㄉㄚˋ，請問是怎麼拼出來的呢？',
          icon: '🐘',
          word: '大 ＝ ？',
          hint: 'ㄉ ＋ ㄚ ＋ 四聲 ˋ',
          answer: 'ㄉ ＋ ㄚ ＋ ˋ',
          options: ['ㄉ ＋ ㄚ ＋ ˋ', 'ㄅ ＋ ㄚ ＋ ˋ', 'ㄊ ＋ ㄚ ＋ ˋ', 'ㄉ ＋ ㄛ ＋ ˋ']
        }
      ]
    },
    {
      id: 9,
      name: '第九關：水晶城堡',
      subtitle: '結合韻與三拼大挑戰',
      icon: '🏰',
      bossIcon: '🧙‍♂️',
      bossName: '水晶大法師',
      color: '#15AABF',
      bgGradient: 'linear-gradient(135deg, #E3FAFC, #C5F6FA)',
      desc: '挑戰「聲母＋介音＋韻母」三拼魔法，突破結合韻難關！',
      questions: [
        {
          qType: 'blend_pick',
          prompt: '三拼魔法：「ㄍ」＋「ㄨ」＋「ㄚ」合起來是什麼音？',
          speakText: '三拼挑戰！ㄍ～，ㄨ～，ㄚ～，合起來是什麼呢？',
          icon: '🍉',
          word: 'ㄍ ＋ ㄨ ＋ ㄚ ＝ ？',
          hint: 'ㄍㄨㄚ，西瓜的「瓜」！',
          answer: '瓜 (ㄍㄨㄚ)',
          options: ['瓜 (ㄍㄨㄚ)', '花 (ㄏㄨㄚ)', '蛙 (ㄨㄚ)', '家 (ㄐㄧㄚ)']
        },
        {
          qType: 'blend_pick',
          prompt: '看圖選三拼：「🌸 花朵」的「花」，中間躲著哪一個介音？',
          speakText: '花朵的花，ㄏ、ㄨ、ㄚ，花！請問中間的介音是哪一個呢？',
          icon: '🌸',
          word: 'ㄏ ＋ [ ？ ] ＋ ㄚ ＝ 花',
          hint: 'ㄏ ＋ ㄨ ＋ ㄚ ＝ ㄏㄨㄚ',
          answer: 'ㄨ',
          options: ['ㄨ', 'ㄧ', 'ㄩ', 'ㄛ']
        },
        {
          qType: 'blend_pick',
          prompt: '看圖選三拼：「🍌 香蕉」的「香」，正確的三拼注音是？',
          speakText: '猴子愛吃香蕉！請問香蕉的香，注音怎麼拼呢？',
          icon: '🍌',
          word: '香 ＝ ？',
          hint: 'ㄒ ＋ ㄧ ＋ ㄤ ＝ ㄒㄧㄤ',
          answer: 'ㄒㄧㄤ',
          options: ['ㄒㄧㄤ', 'ㄒㄧㄢ', 'ㄑㄧㄤ', 'ㄕㄤ']
        },
        {
          qType: 'blend_pick',
          prompt: '結合韻挑戰：「🌙 月亮」的「月」，注音是哪一個結合韻？',
          speakText: '彎彎的月亮！請問月亮的月，注音怎麼寫呢？',
          icon: '🌙',
          word: '月亮 (？ ㄌㄧㄤˋ)',
          hint: 'ㄩ ＋ ㄝ ＋ 四聲 ˋ ＝ ㄩㄝˋ',
          answer: 'ㄩㄝˋ',
          options: ['ㄩㄝˋ', 'ㄧㄝˋ', 'ㄨㄛˋ', 'ㄩㄢˋ']
        },
        {
          qType: 'blend_pick',
          prompt: '守關題：「👟 一雙鞋」的「雙」，正確的三拼注音是？',
          speakText: '最後一題！一雙鞋子的雙，ㄕ、ㄨ、ㄤ，雙！是哪一個呢？',
          icon: '👟',
          word: '雙 ＝ ？',
          hint: '翹舌音 ㄕ ＋ ㄨ ＋ ㄤ ＝ ㄕㄨㄤ',
          answer: 'ㄕㄨㄤ',
          options: ['ㄕㄨㄤ', 'ㄙㄨㄤ', 'ㄕㄨㄢ', 'ㄒㄩㄤ']
        }
      ]
    },
    {
      id: 10,
      name: '第十關：魔王寶藏島',
      subtitle: '注音大魔王終極試煉 🏆',
      icon: '👑',
      bossIcon: '🐲',
      bossName: '黃金注音巨龍',
      color: '#FA5252',
      bgGradient: 'linear-gradient(135deg, #FFE3E3, #FFC9C9)',
      desc: '集結全島所學！打敗黃金注音巨龍，奪得「注音大勇者」最高榮耀王冠！',
      questions: [
        {
          qType: 'pic_pick',
          prompt: '魔王第 1 擊：「🦋 蝴蝶 (ㄏㄨˊ ㄉㄧㄝˊ)」的「蝶」，注音是哪一個？',
          speakText: '終極試煉開始！美麗的蝴蝶，請問蝴蝶的蝶，注音是哪一個？',
          icon: '🦋',
          word: '蝴蝶 (ㄏㄨˊ ？)',
          hint: 'ㄉ ＋ ㄧ ＋ ㄝ ＋ 二聲 ˊ ＝ ㄉㄧㄝˊ',
          answer: 'ㄉㄧㄝˊ',
          options: ['ㄉㄧㄝˊ', 'ㄊㄧㄝˊ', 'ㄉㄟˊ', 'ㄌㄧㄝˊ']
        },
        {
          qType: 'pic_pick',
          prompt: '魔王第 2 擊：「🐧 企鵝 (ㄑㄧˋ ㄜˊ)」的兩個字分別是幾聲？',
          speakText: '南極的小企鵝，ㄑㄧˋ、ㄜˊ，請問企鵝分別是第幾聲呢？',
          icon: '🐧',
          word: '企 (ㄑㄧˋ) 鵝 (ㄜˊ)',
          hint: '企是四聲 ˋ，鵝是二聲 ˊ',
          answer: '四聲 與 二聲',
          options: ['四聲 與 二聲', '一聲 與 二聲', '三聲 與 四聲', '四聲 與 三聲']
        },
        {
          qType: 'blend_pick',
          prompt: '魔王第 3 擊：「🦖 恐龍」的「龍 (ㄌㄨㄥˊ)」，正確拼音是？',
          speakText: '黃金巨龍出題了！恐龍跟巨龍的龍，ㄌ、ㄨ、ㄥ、二聲，是哪一個呢？',
          icon: '🐲',
          word: '龍 ＝ ？',
          hint: 'ㄌ ＋ ㄨ ＋ ㄥ ＋ ˊ ＝ ㄌㄨㄥˊ',
          answer: 'ㄌㄨㄥˊ',
          options: ['ㄌㄨㄥˊ', 'ㄋㄨㄥˊ', 'ㄌㄨㄣˊ', 'ㄖㄨㄥˊ']
        },
        {
          qType: 'pic_pick',
          prompt: '魔王第 4 擊：「🍓 草莓」的「草」和「🚢 帆船」的「船」，哪一個要翹舌？',
          speakText: '想一想喔！草莓的草，跟帆船的船，哪一個字舌頭要翹起來呢？',
          icon: '🚢',
          word: '草 (ㄘㄠˇ) vs 船 (ㄔㄨㄢˊ)',
          hint: '船 (ㄔㄨㄢˊ) 的開頭是翹舌音 ㄔ！',
          answer: '船 (ㄔㄨㄢˊ)',
          options: ['船 (ㄔㄨㄢˊ)', '草 (ㄘㄠˇ)', '兩個都要', '兩個都不用']
        },
        {
          qType: 'blend_pick',
          prompt: '🔥 終極必殺技：「台灣小一最棒」的「棒 (ㄅㄤˋ)」，怎麼拼？',
          speakText: '最後一擊！好棒的棒，ㄅ、ㄤ、四聲，ㄅㄤˋ！選出正確答案打敗大魔王吧！',
          icon: '🏆',
          word: '好棒的「棒」＝ ？',
          hint: 'ㄅ ＋ ㄤ ＋ 四聲 ˋ ＝ ㄅㄤˋ',
          answer: 'ㄅㄤˋ',
          options: ['ㄅㄤˋ', 'ㄆㄤˋ', 'ㄅㄢˋ', 'ㄉㄤˋ']
        }
      ]
    }
  ]
};
