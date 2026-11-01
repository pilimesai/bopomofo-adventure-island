const fs = require('fs');

const manifestCode = fs.readFileSync('js/audio_manifest.js', 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(manifestCode, sandbox);
const manifest = sandbox.window.AUDIO_MANIFEST;

const ZHUYIN_DATA = require('../js/data.js');

let totalQ = 0;
let missingManifest = 0;
let missingFile = 0;

function checkText(text, desc) {
  if (!text) return;
  if (!manifest[text]) {
    missingManifest++;
    console.log(`[MISSING MANIFEST] ${desc}: ${text}`);
    return;
  }
  const tFile = manifest[text].teacher;
  const cFile = manifest[text].cute;
  if (!fs.existsSync(tFile)) {
    missingFile++;
    console.log(`[MISSING FILE TEACHER] ${tFile} for ${text}`);
  }
  if (!fs.existsSync(cFile)) {
    missingFile++;
    console.log(`[MISSING FILE CUTE] ${cFile} for ${text}`);
  }
}

function extractTarget(q) {
  if (q.word) {
    const clean = q.word.replace(/[^\u4e00-\u9fa5]/g, '').trim();
    if (clean) return clean;
  }
  const match = (q.prompt || '').match(/「([^」]+)」/);
  if (match) {
    const clean = match[1].replace(/[^\u4e00-\u9fa5]/g, '').trim();
    if (clean) return clean;
  }
  return '';
}

function getAnswerSpeech(q) {
  const target = extractTarget(q);
  if (target && q.qType !== 'reading') {
    return `正確答案是：${target}，${q.answer}。`;
  }
  return `正確答案是：${q.answer}。`;
}

// 檢查 Adventure Stages
ZHUYIN_DATA.adventureStages.forEach(s => {
  s.questions.forEach((q, idx) => {
    totalQ++;
    checkText(q.speakText, `Stage ${s.id} Q${idx+1} Prompt`);
    checkText(getAnswerSpeech(q), `Stage ${s.id} Q${idx+1} Answer`);
  });
});

// 檢查 Final Stages
ZHUYIN_DATA.finalStages.forEach(s => {
  s.questions.forEach((q, idx) => {
    totalQ++;
    checkText(q.speakText, `Final Stage ${s.id} Q${idx+1} Prompt`);
    checkText(getAnswerSpeech(q), `Final Stage ${s.id} Q${idx+1} Answer`);
  });
});

console.log(`\n=== VERIFICATION RESULT ===`);
console.log(`Total questions checked: ${totalQ}`);
console.log(`Missing manifest entries: ${missingManifest}`);
console.log(`Missing mp3 files: ${missingFile}`);
