const fs = require('fs');
const ZHUYIN_DATA = require('../js/data.js');

// 確保 finalStages 的 finalQuestions 與 questions 一致 (15 題)
ZHUYIN_DATA.finalStages.forEach(s => {
  s.finalQuestions = JSON.parse(JSON.stringify(s.questions));
});

// 確保 adventureStages 的 finalQuestions 也指向對應 finalStages 的 15 題
ZHUYIN_DATA.adventureStages.forEach((s, idx) => {
  const matchingFinal = ZHUYIN_DATA.finalStages[idx];
  if (matchingFinal) {
    s.finalQuestions = JSON.parse(JSON.stringify(matchingFinal.questions));
  }
});

const fileContent = `/**
 * ㄅㄆㄇ 寶可夢大冒險 - 國小段考全真題庫與教學系統數據庫
 * (Taiwan Elementary Exam Real Past Question Database)
 */

const ZHUYIN_DATA = ${JSON.stringify(ZHUYIN_DATA, null, 2)};

if (typeof window !== 'undefined') {
  window.ZHUYIN_DATA = ZHUYIN_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ZHUYIN_DATA;
}
`;

fs.writeFileSync('js/data.js', fileContent, 'utf8');
console.log('Synchronized finalQuestions across all stages in js/data.js!');
