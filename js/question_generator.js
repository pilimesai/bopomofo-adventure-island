/**
 * ㄅㄆㄇ 寶可夢大冒險 - 動態智慧題庫生成引擎
 * (Procedural Elementary Question Generator Engine)
 * 
 * 核心原則：
 * 1. 關卡難度與教學目標固定（依照小一第一學期教育部段考標準指標）
 * 2. 每次進入關卡題目動態隨機抽取並產生，題目無限變化且不重複
 * 3. 選項位置自動洗牌，答案絕不固定
 */

(function(window) {
  'use strict';

  // 小一課本標準高頻語詞庫（含注音、聲母、韻母、聲調、結合韻）
  const ELEMENTARY_VOCAB_BANK = [
    { word: "鱷魚", icon: "🐊", firstZhuyin: "ㄜˋ", fullZhuyin: "ㄜˋ ㄩˊ", initial: "ㄜ", final: "ㄜ", tone: 4, sentence: "綠色的大鱷魚在河裡游泳。" },
    { word: "斑馬", icon: "🦓", firstZhuyin: "ㄅㄢ", fullZhuyin: "ㄅㄢ ㄇㄚˇ", initial: "ㄅ", final: "ㄢ", tone: 1, sentence: "黑白相間的斑馬在草原上跑步。" },
    { word: "蘋果", icon: "🍎", firstZhuyin: "ㄆㄧㄥˊ", fullZhuyin: "ㄆㄧㄥˊ ㄍㄨㄛˇ", initial: "ㄆ", final: "ㄥ", combo: "ㄧㄥ", tone: 2, sentence: "紅紅的蘋果甜又香。" },
    { word: "貓咪", icon: "🐱", firstZhuyin: "ㄇㄠ", fullZhuyin: "ㄇㄠ ㄇㄧ", initial: "ㄇ", final: "ㄠ", tone: 1, sentence: "可愛的貓咪喜歡曬太陽。" },
    { word: "飛機", icon: "✈️", firstZhuyin: "ㄈㄟ", fullZhuyin: "ㄈㄟ ㄐㄧ", initial: "ㄈ", final: "ㄟ", tone: 1, sentence: "巨大的飛機飛上藍藍的天空。" },
    { word: "蛋糕", icon: "🎂", firstZhuyin: "ㄉㄢˋ", fullZhuyin: "ㄉㄢˋ ㄍㄠ", initial: "ㄉ", final: "ㄢ", tone: 4, sentence: "生日快樂，我們一起吃草莓蛋糕。" },
    { word: "兔子", icon: "🐰", firstZhuyin: "ㄊㄨˋ", fullZhuyin: "ㄊㄨˋ ˙ㄗ", initial: "ㄊ", final: "ㄨ", tone: 4, sentence: "小白兔的耳朵長又長。" },
    { word: "小鳥", icon: "🐦", firstZhuyin: "ㄋㄧㄠˇ", fullZhuyin: "ㄋㄧㄠˇ", initial: "ㄋ", final: "ㄠ", combo: "ㄧㄠ", tone: 3, sentence: "樹枝上的小鳥快樂地唱歌。" },
    { word: "老虎", icon: "🐯", firstZhuyin: "ㄌㄠˇ", fullZhuyin: "ㄌㄠˇ ㄏㄨˇ", initial: "ㄌ", final: "ㄠ", tone: 3, sentence: "威風的老虎是森林之王。" },
    { word: "西瓜", icon: "🍉", firstZhuyin: "ㄒㄧ", fullZhuyin: "ㄒㄧ ㄍㄨㄚ", initial: "ㄒ", final: "ㄧ", combo: "ㄨㄚ", tone: 1, sentence: "夏天的西瓜冰涼又消暑。" },
    { word: "月亮", icon: "🌙", firstZhuyin: "ㄩㄝˋ", fullZhuyin: "ㄩㄝˋ ㄌㄧㄤˋ", initial: "ㄩ", final: "ㄝ", combo: "ㄩㄝ", tone: 4, sentence: "圓圓的月亮掛在夜空。" },
    { word: "太陽", icon: "☀️", firstZhuyin: "ㄊㄞˋ", fullZhuyin: "ㄊㄞˋ ㄧㄤˊ", initial: "ㄊ", final: "ㄞ", combo: "ㄧㄤ", tone: 4, sentence: "溫暖的太陽帶來光明。" },
    { word: "香蕉", icon: "🍌", firstZhuyin: "ㄒㄧㄤ", fullZhuyin: "ㄒㄧㄤ ㄐㄧㄠ", initial: "ㄒ", final: "ㄤ", combo: "ㄧㄤ", tone: 1, sentence: "黃澄澄的香蕉甜滋滋。" },
    { word: "葡萄", icon: "🍇", firstZhuyin: "ㄆㄨˊ", fullZhuyin: "ㄆㄨˊ ㄊㄠˊ", initial: "ㄆ", final: "ㄨ", tone: 2, sentence: "紫色的葡萄一串串真好吃。" },
    { word: "草莓", icon: "🍓", firstZhuyin: "ㄘㄠˇ", fullZhuyin: "ㄘㄠˇ ㄇㄟˊ", initial: "ㄘ", final: "ㄠ", tone: 3, sentence: "鮮紅的草莓酸酸甜甜。" },
    { word: "鉛筆", icon: "✏️", firstZhuyin: "ㄑㄧㄢ", fullZhuyin: "ㄑㄧㄢ ㄅㄧˇ", initial: "ㄑ", final: "ㄢ", combo: "ㄧㄢ", tone: 1, sentence: "我用鉛筆認真寫作業。" },
    { word: "書包", icon: "🎒", firstZhuyin: "ㄕㄨ", fullZhuyin: "ㄕㄨ ㄅㄠ", initial: "ㄕ", final: "ㄨ", tone: 1, sentence: "背起書包開開心心上學去。" },
    { word: "桌子", icon: "🪑", firstZhuyin: "ㄓㄨㄛ", fullZhuyin: "ㄓㄨㄛ ˙ㄗ", initial: "ㄓ", final: "ㄛ", combo: "ㄨㄛ", tone: 1, sentence: "書桌擦得乾乾淨淨。" },
    { word: "溜滑梯", icon: "🛝", firstZhuyin: "ㄌㄧㄡ", fullZhuyin: "ㄌㄧㄡ ㄏㄨㄚˊ ㄊㄧ", initial: "ㄌ", final: "ㄡ", combo: "ㄧㄡ", tone: 1, sentence: "公園裡的溜滑梯真好玩。" },
    { word: "風箏", icon: "🪁", firstZhuyin: "ㄈㄥ", fullZhuyin: "ㄈㄥ ㄓㄥ", initial: "ㄈ", final: "ㄥ", tone: 1, sentence: "微風輕輕吹，風箏飛得高。" },
    { word: "金魚", icon: "🐠", firstZhuyin: "ㄐㄧㄣ", fullZhuyin: "ㄐㄧㄣ ㄩˊ", initial: "ㄐ", final: "ㄣ", combo: "ㄧㄣ", tone: 1, sentence: "魚缸裡的小金魚游來游去。" },
    { word: "青蛙", icon: "🐸", firstZhuyin: "ㄑㄧㄥ", fullZhuyin: "ㄑㄧㄥ ㄨㄚ", initial: "ㄑ", final: "ㄥ", combo: "ㄧㄥ", tone: 1, sentence: "池塘邊的青蛙呱呱叫。" },
    { word: "蜜蜂", icon: "🐝", firstZhuyin: "ㄇㄧˋ", fullZhuyin: "ㄇㄧˋ ㄈㄥ", initial: "ㄇ", final: "ㄧ", tone: 4, sentence: "勤勞的小蜜蜂採花蜜。" },
    { word: "蝴蝶", icon: "🦋", firstZhuyin: "ㄏㄨˊ", fullZhuyin: "ㄏㄨˊ ㄉㄧㄝˊ", initial: "ㄏ", final: "ㄨ", tone: 2, sentence: "美麗的花蝴蝶在花叢中跳舞。" },
    { word: "長頸鹿", icon: "🦒", firstZhuyin: "ㄔㄤˊ", fullZhuyin: "ㄔㄤˊ ㄐㄧㄥˇ ㄌㄨˋ", initial: "ㄔ", final: "ㄤ", tone: 2, sentence: "長頸鹿伸長脖子吃樹葉。" },
    { word: "大象", icon: "🐘", firstZhuyin: "ㄉㄚˋ", fullZhuyin: "ㄉㄚˋ ㄒㄧㄤˋ", initial: "ㄉ", final: "ㄚ", combo: "ㄧㄤ", tone: 4, sentence: "大象有長長的大鼻子。" },
    { word: "雨傘", icon: "☂️", firstZhuyin: "ㄩˇ", fullZhuyin: "ㄩˇ ㄙㄢˇ", initial: "ㄩ", final: "ㄩ", tone: 3, sentence: "下雨天出門記得撐雨傘。" },
    { word: "手錶", icon: "⌚", firstZhuyin: "ㄕㄡˇ", fullZhuyin: "ㄕㄡˇ ㄅㄧㄠˇ", initial: "ㄕ", final: "ㄡ", combo: "ㄧㄠ", tone: 3, sentence: "手錶滴答滴答走個不停。" },
    { word: "牙刷", icon: "🪥", firstZhuyin: "ㄧㄚˊ", fullZhuyin: "ㄧㄚˊ ㄕㄨㄚ", initial: "ㄧ", final: "ㄚ", combo: "ㄨㄚ", tone: 2, sentence: "每天早晚用牙刷刷牙。" },
    { word: "麵包", icon: "🍞", firstZhuyin: "ㄇㄧㄢˋ", fullZhuyin: "ㄇㄧㄢˋ ㄅㄠ", initial: "ㄇ", final: "ㄢ", combo: "ㄧㄢ", tone: 4, sentence: "剛出爐的麵包香噴噴。" },
    { word: "布丁", icon: "🍮", firstZhuyin: "ㄅㄨˋ", fullZhuyin: "ㄅㄨˋ ㄉㄧㄥ", initial: "ㄅ", final: "ㄨ", combo: "ㄧㄥ", tone: 4, sentence: "軟軟綿綿的雞蛋布丁真滑嫩。" },
    { word: "番茄", icon: "🍅", firstZhuyin: "ㄈㄢ", fullZhuyin: "ㄈㄢ ㄑㄧㄝˊ", initial: "ㄈ", final: "ㄢ", combo: "ㄧㄝ", tone: 1, sentence: "多吃新鮮紅番茄有益健康。" },
    { word: "玉米", icon: "🌽", firstZhuyin: "ㄩˋ", fullZhuyin: "ㄩˋ ㄇㄧˇ", initial: "ㄩ", final: "ㄩ", tone: 4, sentence: "金黃色的玉米又甜又脆。" },
    { word: "胡蘿蔔", icon: "🥕", firstZhuyin: "ㄏㄨˊ", fullZhuyin: "ㄏㄨˊ ㄌㄨㄛˊ ˙ㄅㄛ", initial: "ㄏ", final: "ㄨ", tone: 2, sentence: "小兔子最喜歡吃紅蘿蔔。" },
    { word: "向日葵", icon: "🌻", firstZhuyin: "ㄒㄧㄤˋ", fullZhuyin: "ㄒㄧㄤˋ ㄖˋ ㄎㄨㄟˊ", initial: "ㄒ", final: "ㄤ", combo: "ㄨㄟ", tone: 4, sentence: "金黃色的向日葵向著太陽盛開。" },
    { word: "彩虹", icon: "🌈", firstZhuyin: "ㄘㄞˇ", fullZhuyin: "ㄘㄞˇ ㄏㄨㄥˊ", initial: "ㄘ", final: "ㄞ", combo: "ㄨㄥ", tone: 3, sentence: "雨過天晴，空中出現美麗的彩虹。" },
    { word: "火車", icon: "🚂", firstZhuyin: "ㄏㄨㄛˇ", fullZhuyin: "ㄏㄨㄛˇ ㄔㄜ", initial: "ㄏ", final: "ㄛ", combo: "ㄨㄛ", tone: 3, sentence: "嗚嗚～火車開進了車站。" },
    { word: "輪船", icon: "🚢", firstZhuyin: "ㄌㄨㄣˊ", fullZhuyin: "ㄌㄨㄣˊ ㄔㄨㄢˊ", initial: "ㄌ", final: "ㄣ", combo: "ㄨㄢ", tone: 2, sentence: "大輪船航行在藍藍的海面上。" },
    { word: "足球", icon: "⚽", firstZhuyin: "ㄗㄨˊ", fullZhuyin: "ㄗㄨˊ ㄑㄧㄡˊ", initial: "ㄗ", final: "ㄨ", combo: "ㄧㄡ", tone: 2, sentence: "下課時我們到操場踢足球。" },
    { word: "鋼琴", icon: "🎹", firstZhuyin: "ㄍㄤ", fullZhuyin: "ㄍㄤ ㄑㄧㄣˊ", initial: "ㄍ", final: "ㄤ", combo: "ㄧㄣ", tone: 1, sentence: "鋼琴流瀉出動聽的音符。" },
    { word: "氣球", icon: "🎈", firstZhuyin: "ㄑㄧˋ", fullZhuyin: "ㄑㄧˋ ㄑㄧㄡˊ", initial: "ㄑ", final: "ㄧ", combo: "ㄧㄡ", tone: 4, sentence: "五彩繽紛的彩色氣球隨風飄揚。" },
    { word: "冰淇淋", icon: "🍦", firstZhuyin: "ㄅㄧㄥ", fullZhuyin: "ㄅㄧㄥ ㄑㄧˊ ㄌㄧㄣˊ", initial: "ㄅ", final: "ㄥ", combo: "ㄧㄥ", tone: 1, sentence: "夏天吃一口冰淇淋真是太棒了。" },
    { word: "棒棒糖", icon: "🍭", firstZhuyin: "ㄅㄤˋ", fullZhuyin: "ㄅㄤˋ ㄅㄤˋ ㄊㄤˊ", initial: "ㄅ", final: "ㄤ", tone: 4, sentence: "甜甜的棒棒糖是小朋友的最愛。" },
    { word: "牛奶", icon: "🥛", firstZhuyin: "ㄋㄧㄡˊ", fullZhuyin: "ㄋㄧㄡˊ ㄋㄞˇ", initial: "ㄋ", final: "ㄡ", combo: "ㄧㄡ", tone: 2, sentence: "每天早上一杯熱牛奶長高高。" },
    { word: "水餃", icon: "🥟", firstZhuyin: "ㄕㄨㄟˇ", fullZhuyin: "ㄕㄨㄟˇ ㄐㄧㄠˇ", initial: "ㄕ", final: "ㄟ", combo: "ㄨㄟ", tone: 3, sentence: "白白胖胖的水餃像個大元寶。" },
    { word: "獅子", icon: "🦁", firstZhuyin: "ㄕ", fullZhuyin: "ㄕ ˙ㄗ", initial: "ㄕ", final: "ㄧ", tone: 1, sentence: "大草原上的獅子吼叫聲很驚人。" },
    { word: "猴子", icon: "🐒", firstZhuyin: "ㄏㄡˊ", fullZhuyin: "ㄏㄡˊ ˙ㄗ", initial: "ㄏ", final: "ㄡ", tone: 2, sentence: "調皮的猴子在樹上靈活跳躍。" },
    { word: "企鵝", icon: "🐧", firstZhuyin: "ㄑㄧˋ", fullZhuyin: "ㄑㄧˋ ㄜˊ", initial: "ㄑ", final: "ㄧ", tone: 4, sentence: "搖搖擺擺的企鵝住在冰天雪地。" },
    { word: "海豚", icon: "🐬", firstZhuyin: "ㄏㄞˇ", fullZhuyin: "ㄏㄞˇ ㄊㄨㄣˊ", initial: "ㄏ", final: "ㄞ", combo: "ㄨㄣ", tone: 3, sentence: "聰明的小海豚在大海裡躍出水面。" },
    { word: "松鼠", icon: "🐿️", firstZhuyin: "ㄙㄨㄥ", fullZhuyin: "ㄙㄨㄥ ㄕㄨˇ", initial: "ㄙ", final: "ㄥ", combo: "ㄨㄥ", tone: 1, sentence: "小松鼠用雙手捧著好吃的松果。" }
  ];

  const INITIALS = ['ㄅ', 'ㄆ', 'ㄇ', 'ㄈ', 'ㄉ', 'ㄊ', 'ㄋ', 'ㄌ', 'ㄍ', 'ㄎ', 'ㄏ', 'ㄐ', 'ㄑ', 'ㄒ', 'ㄓ', 'ㄔ', 'ㄕ', 'ㄖ', 'ㄗ', 'ㄘ', 'ㄙ'];
  const FINALS = ['ㄚ', 'ㄛ', 'ㄜ', 'ㄝ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ', 'ㄦ'];
  const MEDIALS = ['ㄧ', 'ㄨ', 'ㄩ'];
  const COMBOS = ['ㄧㄚ', 'ㄧㄛ', 'ㄧㄝ', 'ㄧㄞ', 'ㄧㄠ', 'ㄧㄡ', 'ㄧㄢ', 'ㄧㄣ', 'ㄧㄤ', 'ㄧㄥ', 'ㄨㄚ', 'ㄨㄛ', 'ㄨㄞ', 'ㄨㄟ', 'ㄨㄢ', 'ㄨㄣ', 'ㄨㄤ', 'ㄨㄥ', 'ㄩㄝ', 'ㄩㄢ', 'ㄩㄣ', 'ㄩㄥ'];

  // 洗牌輔助函式
  function shuffle(arr) {
    const res = [...arr];
    for (let i = res.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [res[i], res[j]] = [res[j], res[i]];
    }
    return res;
  }

  // 隨機自候選清單抽取 N 個不同元素
  function pickRandomN(list, n, exclude = []) {
    const pool = list.filter(item => !exclude.includes(item));
    return shuffle(pool).slice(0, n);
  }

  // =========================================================================
  // 10 大道館動態題庫生成器（各關難度固定，題目無限隨機衍生）
  // =========================================================================

  // 第 1 關：看圖選音（聲母辨識）
  function genStage1Question() {
    const item = shuffle(ELEMENTARY_VOCAB_BANK)[0];
    const correct = item.initial;
    const distractors = pickRandomN(INITIALS, 3, [correct]);
    const options = shuffle([correct, ...distractors]);
    return {
      prompt: `【看圖選聲母】圖片上的「${item.icon} ${item.word}」，第一個聲母是什麼？`,
      speakText: `圖片上的${item.word}，第一個聲母是什麼呢？`,
      icon: item.icon,
      word: `${item.icon} ${item.word}`,
      qType: "choice",
      answer: correct,
      options: options
    };
  }

  // 第 2 關：辨音圈選（前鼻音 ㄣ / 後鼻音 ㄥ、ㄢ / ㄤ、ㄛ / ㄡ 等易混淆韻母）
  function genStage2Question() {
    const item = shuffle(ELEMENTARY_VOCAB_BANK.filter(i => i.final))[0];
    const correct = item.final;
    let pool = FINALS;
    if (correct === 'ㄣ' || correct === 'ㄥ') pool = ['ㄣ', 'ㄥ', 'ㄢ', 'ㄤ'];
    else if (correct === 'ㄢ' || correct === 'ㄤ') pool = ['ㄢ', 'ㄤ', 'ㄣ', 'ㄥ'];
    else if (correct === 'ㄛ' || correct === 'ㄡ') pool = ['ㄛ', 'ㄡ', 'ㄜ', 'ㄝ'];
    const distractors = pickRandomN(pool, 3, [correct]);
    const options = shuffle([correct, ...distractors]);
    return {
      prompt: `【辨音圈選】「${item.icon} ${item.word}」的「${item.word[0]}」，主要韻母是哪一個？`,
      speakText: `請問${item.word}的${item.word[0]}，主要韻母是哪一個呢？`,
      icon: item.icon,
      word: `${item.icon} ${item.word}`,
      qType: "choice",
      answer: correct,
      options: options
    };
  }

  // 第 3 關：正音除錯（聲調：一聲平、二聲揚、三聲拐彎、四聲降、輕聲點）
  function genStage3Question() {
    const item = shuffle(ELEMENTARY_VOCAB_BANK)[0];
    const toneMap = { 1: "一聲 ˉ", 2: "二聲 ˊ", 3: "三聲 ˇ", 4: "四聲 ˋ", 0: "輕聲 ˙" };
    const correctTone = toneMap[item.tone] || "一聲 ˉ";
    const allTones = Object.values(toneMap);
    const distractors = pickRandomN(allTones, 3, [correctTone]);
    const options = shuffle([correctTone, ...distractors]);
    return {
      prompt: `【正音除錯·聲調判斷】「${item.icon} ${item.word}」的「${item.word[0]}」，聲調是第幾聲？`,
      speakText: `請問${item.word}的第一個字，聲調是第幾聲？`,
      icon: item.icon,
      word: `${item.icon} ${item.word}`,
      qType: "choice",
      answer: correctTone,
      options: options
    };
  }

  // 第 4 關：二拼連線（聲母 + 韻母快速拼讀）
  function genStage4Question() {
    const item = shuffle(ELEMENTARY_VOCAB_BANK.filter(i => i.initial && i.final))[0];
    const correct = `${item.initial}${item.final}`;
    const wrong1 = `${shuffle(INITIALS.filter(x => x !== item.initial))[0]}${item.final}`;
    const wrong2 = `${item.initial}${shuffle(FINALS.filter(y => y !== item.final))[0]}`;
    const wrong3 = `${shuffle(INITIALS.filter(x => x !== item.initial))[0]}${shuffle(FINALS.filter(y => y !== item.final))[0]}`;
    const options = shuffle([correct, wrong1, wrong2, wrong3]);
    return {
      prompt: `【二拼連線】聲母「${item.initial}」加上韻母「${item.final}」，拼起來讀作什麼？`,
      speakText: `聲母${item.initial}加上韻母${item.final}，拼起來讀作什麼呢？`,
      icon: item.icon,
      word: `二拼法：${item.initial} + ${item.final}`,
      qType: "choice",
      answer: correct,
      options: options
    };
  }

  // 第 5 關：語詞配對（結合韻合體探險：ㄧㄚ, ㄧㄠ, ㄨㄢ, ㄩㄝ等）
  function genStage5Question() {
    const item = shuffle(ELEMENTARY_VOCAB_BANK.filter(i => i.combo))[0];
    const correct = item.combo;
    const distractors = pickRandomN(COMBOS, 3, [correct]);
    const options = shuffle([correct, ...distractors]);
    return {
      prompt: `【結合韻合體】「${item.icon} ${item.word}」包含了哪一個神奇結合韻？`,
      speakText: `請問${item.word}包含了哪一個結合韻呢？`,
      icon: item.icon,
      word: `${item.icon} ${item.word}`,
      qType: "choice",
      answer: correct,
      options: options
    };
  }

  // 第 6 關：看圖填拼音（完整注音拼寫判讀）
  function genStage6Question() {
    const item = shuffle(ELEMENTARY_VOCAB_BANK)[0];
    const correct = item.fullZhuyin;
    // 產生三種干擾選項（錯聲調、錯韻母或錯聲母）
    const parts = item.fullZhuyin.split(' ');
    const wrong1 = parts.map((p, idx) => idx === 0 ? p.replace(/[ˊˇˋ˙]/, '') + 'ˊ' : p).join(' ');
    const wrong2 = parts.map((p, idx) => idx === parts.length - 1 ? p.replace(/[ˊˇˋ˙]/, '') + 'ˋ' : p).join(' ');
    const wrong3 = parts.map((p, idx) => idx === 0 ? p + 'ㄥ' : p).join(' ');
    const options = shuffle([correct, wrong1, wrong2, wrong3].filter((v, i, a) => a.indexOf(v) === i));
    while (options.length < 4) {
      options.push(`${item.firstZhuyin} ˙${options.length}`);
    }
    return {
      prompt: `【看圖填拼音】圖片中的「${item.icon} ${item.word}」，完整注音怎麼拼？`,
      speakText: `圖片中的${item.word}，完整注音怎麼拼呢？`,
      icon: item.icon,
      word: `${item.icon} ${item.word}`,
      qType: "choice",
      answer: correct,
      options: shuffle(options)
    };
  }

  // 第 7 關：缺空拼寫（缺聲母、介音或韻母填空）
  function genStage7Question() {
    const item = shuffle(ELEMENTARY_VOCAB_BANK.filter(i => i.initial && i.firstZhuyin))[0];
    const correct = item.initial;
    const blankZhuyin = item.firstZhuyin.replace(item.initial, '( ? )');
    const distractors = pickRandomN(INITIALS, 3, [correct]);
    const options = shuffle([correct, ...distractors]);
    return {
      prompt: `【缺空拼寫】「${item.icon} ${item.word}」的第一字注音是「${blankZhuyin}」，括號中該填哪個聲母？`,
      speakText: `${item.word}的注音缺了聲母，括號中該填哪一個符號呢？`,
      icon: item.icon,
      word: `${item.icon} ${item.word}`,
      qType: "choice",
      answer: correct,
      options: options
    };
  }

  // 第 8 關：小一生活語詞造詞拼音
  function genStage8Question() {
    const item = shuffle(ELEMENTARY_VOCAB_BANK)[0];
    const correct = item.word;
    const otherWords = pickRandomN(ELEMENTARY_VOCAB_BANK.map(x => x.word), 3, [correct]);
    const options = shuffle([correct, ...otherWords]);
    return {
      prompt: `【語詞造詞】讀出注音「${item.fullZhuyin}」，對應的是哪一個生活語詞？`,
      speakText: `讀出注音${item.word}，對應的是哪一個生活語詞呢？`,
      icon: item.icon,
      word: item.fullZhuyin,
      qType: "choice",
      answer: correct,
      options: options
    };
  }

  // 第 9 關：句子標調與語境閱讀
  function genStage9Question() {
    const item = shuffle(ELEMENTARY_VOCAB_BANK.filter(i => i.sentence))[0];
    const toneMap = { 1: "一聲 ˉ", 2: "二聲 ˊ", 3: "三聲 ˇ", 4: "四聲 ˋ", 0: "輕聲 ˙" };
    const correct = toneMap[item.tone] || "一聲 ˉ";
    const allTones = Object.values(toneMap);
    const distractors = pickRandomN(allTones, 3, [correct]);
    const options = shuffle([correct, ...distractors]);
    return {
      prompt: `【句子閱讀標調】在句子「${item.sentence}」中，語詞「${item.word}」的第一個字是幾聲？`,
      speakText: `讀一讀句子：${item.sentence}。請問${item.word}的第一個字是幾聲？`,
      icon: item.icon,
      word: item.sentence,
      qType: "choice",
      answer: correct,
      options: options
    };
  }

  // 第 10 關：兒歌童詩閱讀殿堂
  const POEM_BANK = [
    {
      title: "《小青蛙》",
      lines: "小青蛙，呱呱呱，跳下水，抓害蟲，池塘是我快樂的家。",
      icon: "🐸",
      q: "詩歌中的小青蛙在哪裡抓害蟲？",
      answer: "池塘水裡",
      options: ["池塘水裡", "高高樹上", "美麗天空", "客廳沙發"]
    },
    {
      title: "《小蜜蜂》",
      lines: "小蜜蜂，嗡嗡嗡，飛到西，飛到東，採花蜜，做工真勤奮。",
      icon: "🐝",
      q: "小蜜蜂每天飛來飛去是為了做什麼？",
      answer: "採花蜜做工",
      options: ["採花蜜做工", "偷睡大覺", "到處搗蛋", "看電視"]
    },
    {
      title: "《圓圓的月亮》",
      lines: "夜空掛著大月亮，像個白白大月餅，照得大地亮堂堂。",
      icon: "🌙",
      q: "這首童詩把天上的月亮比喻成什麼？",
      answer: "大月餅",
      options: ["大月餅", "足球", "香蕉", "溜溜球"]
    },
    {
      title: "《春天的花》",
      lines: "春風吹，花兒開，紅的花，黃的花，引得蝴蝶翩翩來。",
      icon: "🌸",
      q: "春風吹拂後，是誰被盛開的花兒吸引過來？",
      answer: "翩翩美麗的花蝴蝶",
      options: ["翩翩美麗的花蝴蝶", "兇猛的老虎", "大白鯊", "噴火龍"]
    },
    {
      title: "《神奇的小火車》",
      lines: "嗚嗚嗚，小火車，載著聲母和韻母，手拉手，拼出好朋友。",
      icon: "🚂",
      q: "神奇小火車上載著誰手拉手拼出好朋友？",
      answer: "聲母和韻母",
      options: ["聲母和韻母", "大石塊", "爛泥巴", "廢紙箱"]
    }
  ];

  function genStage10Question() {
    const poem = shuffle(POEM_BANK)[0];
    return {
      prompt: `【兒歌童詩閱讀】讀一讀童詩${poem.title}：「${poem.lines}」，回答問題：${poem.q}`,
      speakText: `讀一讀童詩${poem.title}。${poem.q}`,
      icon: poem.icon,
      word: poem.title,
      qType: "choice",
      answer: poem.answer,
      options: shuffle(poem.options)
    };
  }

  // 關卡與生成器對應表
  const GENERATORS = {
    1: genStage1Question,
    2: genStage2Question,
    3: genStage3Question,
    4: genStage4Question,
    5: genStage5Question,
    6: genStage6Question,
    7: genStage7Question,
    8: genStage8Question,
    9: genStage9Question,
    10: genStage10Question
  };

  /**
   * 對外主要接口：為指定關卡動態生成隨機題目組
   * 題目會隨機變化，但嚴格維持該關卡的難度與學習範圍
   * 
   * @param {Object} stage 關卡資料物件
   * @param {number} targetCount 目標題數（預設 5 題）
   * @param {boolean} isFinal 是否為期末難度
   * @returns {Array} 5 題隨機且洗牌過的考核題目
   */
  function generateStageQuestions(stage, targetCount = 5, isFinal = false) {
    if (!stage) return [];

    const generator = GENERATORS[stage.id] || genStage1Question;
    const staticPool = (isFinal && stage.finalQuestions && stage.finalQuestions.length > 0)
      ? stage.finalQuestions
      : (stage.questions || []);

    const result = [];
    const usedWords = new Set();

    // 1. 先從靜態段考真題池中隨機抽取 2~3 題（保留官方真題的嚴謹性）
    const shuffledStatic = shuffle(staticPool);
    for (const q of shuffledStatic) {
      if (result.length >= Math.min(3, targetCount)) break;
      const key = q.word || q.prompt;
      if (!usedWords.has(key)) {
        // 洗牌選項順序，保證答案位置每次隨機
        const clonedQ = { ...q, options: shuffle(q.options) };
        result.push(clonedQ);
        usedWords.add(key);
      }
    }

    // 2. 不足的題數由動態題庫引擎即時生成（題目永遠隨機變化且新鮮）
    let attempts = 0;
    while (result.length < targetCount && attempts < 50) {
      attempts++;
      const dynQ = generator();
      const key = dynQ.word || dynQ.prompt;
      if (!usedWords.has(key)) {
        result.push(dynQ);
        usedWords.add(key);
      }
    }

    // 3. 全體題目再進行一次隨機順序洗牌
    return shuffle(result).slice(0, targetCount);
  }

  // 匯出到全域
  window.generateStageQuestions = generateStageQuestions;
  window.ELEMENTARY_VOCAB_BANK = ELEMENTARY_VOCAB_BANK;

})(window);
