// Test question generator logic
const VOCAB_LIST = [
  { word: "鱷魚", icon: "🐊", pinyin: "ㄜˋ ㄩˊ", initial: "ㄜ", final: "ㄜ", tone: 4 },
  { word: "斑馬", icon: "🦓", pinyin: "ㄅㄢ ㄇㄚˇ", initial: "ㄅ", final: "ㄢ", tone: 1 },
  { word: "蘋果", icon: "🍎", pinyin: "ㄆㄧㄥˊ ㄍㄨㄛˇ", initial: "ㄆ", final: "ㄥ", tone: 2, combo: "ㄧㄥ" },
  { word: "貓咪", icon: "🐱", pinyin: "ㄇㄠ ㄇㄧ", initial: "ㄇ", final: "ㄠ", tone: 1 },
  { word: "飛機", icon: "✈️", pinyin: "ㄈㄟ ㄐㄧ", initial: "ㄈ", final: "ㄟ", tone: 1 },
  { word: "蛋糕", icon: "🎂", pinyin: "ㄉㄢˋ ㄍㄠ", initial: "ㄉ", final: "ㄢ", tone: 4 },
  { word: "兔子", icon: "🐰", pinyin: "ㄊㄨˋ ˙ㄗ", initial: "ㄊ", final: "ㄨ", tone: 4 },
  { word: "小鳥", icon: "🐦", pinyin: "ㄋㄧㄠˇ", initial: "ㄋ", final: "ㄠ", tone: 3, combo: "ㄧㄠ" },
  { word: "老虎", icon: "🐯", pinyin: "ㄌㄠˇ ㄏㄨˇ", initial: "ㄌ", final: "ㄠ", tone: 3 },
  { word: "西瓜", icon: "🍉", pinyin: "ㄒㄧ ㄍㄨㄚ", initial: "ㄒ", final: "ㄚ", tone: 1, combo: "ㄨㄚ" },
  { word: "月亮", icon: "🌙", pinyin: "ㄩㄝˋ ㄌㄧㄤˋ", initial: "ㄩ", final: "ㄝ", tone: 4, combo: "ㄩㄝ" },
  { word: "太陽", icon: "☀️", pinyin: "ㄊㄞˋ ㄧㄤˊ", initial: "ㄊ", final: "ㄞ", tone: 4, combo: "ㄧㄤ" }
];

console.log("Sample vocab items:", VOCAB_LIST.length);
