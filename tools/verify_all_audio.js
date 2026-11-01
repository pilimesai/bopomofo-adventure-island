const fs = require('fs');

const manifestCode = fs.readFileSync('js/audio_manifest.js', 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(manifestCode, sandbox);
const manifest = sandbox.window.AUDIO_MANIFEST;

const ZHUYIN_DATA = require('../js/data.js');

function resolveAudioUrl(entry, isCute = false) {
  if (!entry) return null;
  if (typeof entry === 'object') {
    if (isCute && entry.cute) return entry.cute;
    if (entry.teacher) return entry.teacher;
    if (entry.cute) return entry.cute;
    return null;
  }
  if (typeof entry === 'string') {
    if (isCute && entry.includes('/v_')) {
      return entry.replace('/v_', '/cute_');
    }
    return entry;
  }
  return null;
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

function formatSlowZhuyin(ans) {
  if (!ans) return '';
  const parts = ans.split(/\s+/).filter(Boolean);
  return parts.join('，　');
}

function getTeachingSpeech(q) {
  if (q.qType === 'reading') return `正確答案是：${q.answer}。`;
  const t = extractTarget(q);
  const slow = formatSlowZhuyin(q.answer);
  if (t) return `正確答案是：${t}。注音念作：${slow}。`;
  return `正確答案是：${slow}。`;
}

let totalQuestions = 0;
let missingPromptFiles = 0;
let missingAnswerFiles = 0;

function checkText(text, label) {
  const entry = manifest[text];
  if (!entry) {
    console.log(`[MISSING IN MANIFEST] ${label}: "${text}"`);
    return false;
  }
  const teacherUrl = resolveAudioUrl(entry, false);
  const cuteUrl = resolveAudioUrl(entry, true);

  if (!teacherUrl || !fs.existsSync(teacherUrl)) {
    console.log(`[MISSING TEACHER FILE] ${label}: ${teacherUrl}`);
    return false;
  }
  if (!cuteUrl || !fs.existsSync(cuteUrl)) {
    console.log(`[MISSING CUTE FILE] ${label}: ${cuteUrl}`);
    return false;
  }
  return true;
}

[...ZHUYIN_DATA.adventureStages, ...ZHUYIN_DATA.finalStages].forEach(s => {
  s.questions.forEach((q, idx) => {
    totalQuestions++;
    if (!checkText(q.speakText, `Stage ${s.id} Q${idx+1} Prompt`)) {
      missingPromptFiles++;
    }
    const teaching = getTeachingSpeech(q);
    if (!checkText(teaching, `Stage ${s.id} Q${idx+1} Teaching Answer`)) {
      missingAnswerFiles++;
    }
  });
});

console.log("\n==========================================");
console.log(`Verified total questions: ${totalQuestions}`);
console.log(`Missing prompt audio files: ${missingPromptFiles}`);
console.log(`Missing teaching answer audio files: ${missingAnswerFiles}`);
console.log("==========================================");
