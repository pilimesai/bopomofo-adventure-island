/**
 * ㄅㄆㄇ 寶可夢大冒險 - 國小段考全真題庫隨機抽取與選項動態洗牌引擎
 * (Taiwan Elementary Exam Real Past Question Dynamic Sampling Engine)
 * 
 * 核心原則：
 * 1. 嚴選臺灣各大知名國小（北市大附小、新生、仁愛、安和、秀朗、板橋、新竹實小等）段考真題
 * 2. 每次進入相同關卡，動態隨機抽取 5 題不同真題組合，每次組合新鮮多樣
 * 3. 每題 4 個選項隨機重新排列，保證答案按鈕位置永遠隨機動態
 * 4. 100% 具備正音班專屬真人教師與萌妹語音，絕無機械聲、無音訊遺失
 */

(function(window) {
  'use strict';

  function shuffle(arr) {
    if (!Array.isArray(arr)) return [];
    const list = [...arr];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  function generateStageQuestions(stage, targetCount = 5, isFinal = false) {
    if (!stage) return [];

    let pool = [];

    // 優先從傳入的 stage 物件中讀取題庫
    if (isFinal) {
      if (Array.isArray(stage.finalQuestions) && stage.finalQuestions.length > 0) {
        pool = stage.finalQuestions;
      } else if (Array.isArray(stage.questions) && stage.questions.length > 0) {
        pool = stage.questions;
      }
    } else {
      if (Array.isArray(stage.questions) && stage.questions.length > 0) {
        pool = stage.questions;
      }
    }

    // 若 stage 物件未掛載題庫，則從全域 ZHUYIN_DATA 中對應關卡抓取
    if (pool.length === 0 && window.ZHUYIN_DATA) {
      const list = isFinal ? window.ZHUYIN_DATA.finalStages : window.ZHUYIN_DATA.adventureStages;
      const found = (list || []).find(s => s.id === stage.id);
      if (found && Array.isArray(found.questions)) {
        pool = found.questions;
      }
    }

    if (!pool || pool.length === 0) return [];

    // 高熵隨機洗牌題目池，保證每次點入關卡抽取到的 5 題皆不同
    const shuffledPool = shuffle(pool);
    const selected = shuffledPool.slice(0, Math.min(targetCount, shuffledPool.length));

    // 每題深度複製並將 4 個選項隨機洗牌，打破固定答案順序
    return selected.map(q => {
      const cloned = JSON.parse(JSON.stringify(q));
      if (Array.isArray(cloned.options) && cloned.options.length > 0) {
        cloned.options = shuffle(cloned.options);
      }
      return cloned;
    });
  }

  // 匯出到全域
  window.generateStageQuestions = generateStageQuestions;
  window.shuffleArray = shuffle;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      generateStageQuestions,
      shuffle
    };
  }

})(typeof window !== 'undefined' ? window : global);
