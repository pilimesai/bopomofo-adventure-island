const fs = require('fs');

let code = fs.readFileSync('js/app.js', 'utf8');

const oldTarget = `      function extractTarget(qObj) {
        if (qObj.word) {
          const clean = qObj.word.replace(/[^\\u4e00-\\u9fa5]/g, '').trim();
          if (clean) return clean;
        }
        const match = (qObj.prompt || '').match(/「([^」]+)」/);
        if (match) {
          const clean = match[1].replace(/[^\\u4e00-\\u9fa5]/g, '').trim();
          if (clean) return clean;
        }
        return '';
      }

      const targetWord = extractTarget(q);
      const answerSpeech = targetWord
        ? \`正確答案是：\${targetWord}，\${q.answer}。\`
        : \`正確答案是：\${q.answer}。\`;

      setMascotSpeech(\`「哎呀！野生的【\${opp ? opp.name : '寶可夢'}】趁機逃跑了！本題正確答案是【\${q.answer}】\${targetWord ? \`(\${targetWord})\` : ''}，聽聽正確發音，準備好請前往下一題繼續冒險！」\`);

      // 延遲 0.4 秒等逃跑與答錯提示音結束，清晰朗讀真人正確答案發音
      setTimeout(() => {
        window.audioEngine.speak(answerSpeech);
      }, 400);`;

const newTarget = `      function extractTarget(qObj) {
        if (qObj.word) {
          const clean = qObj.word.replace(/[^\\u4e00-\\u9fa5]/g, '').trim();
          if (clean) return clean;
        }
        const match = (qObj.prompt || '').match(/「([^」]+)」/);
        if (match) {
          const clean = match[1].replace(/[^\\u4e00-\\u9fa5]/g, '').trim();
          if (clean) return clean;
        }
        return '';
      }

      function formatSlowZhuyinTeaching(ans) {
        if (!ans) return '';
        const parts = ans.split(/\\s+/).filter(Boolean);
        return parts.join('，　');
      }

      const targetWord = extractTarget(q);
      const slowAns = formatSlowZhuyinTeaching(q.answer);
      const answerSpeech = (q.qType === 'reading')
        ? \`正確答案是：\${q.answer}。\`
        : (targetWord
            ? \`正確答案是：\${targetWord}。注音念作：\${slowAns}。\`
            : \`正確答案是：\${slowAns}。\`);

      setMascotSpeech(\`「哎呀！野生的【\${opp ? opp.name : '寶可夢'}】趁機逃跑了！本題正確答案是【\${q.answer}】\${targetWord ? \`(\${targetWord})\` : ''}，老師正在慢速示範正確拼音教學，聽清楚後前往下一題繼續挑戰！」\`);

      // 延遲 0.4 秒等逃跑與答錯提示音結束，由正音班老師清晰慢速教學發音
      setTimeout(() => {
        window.audioEngine.speak(answerSpeech, { rate: 0.88 });
      }, 400);`;

const oldBtnReplay = `        const btnReplay = document.getElementById('btn-replay-correct-audio');
        if (btnReplay) {
          btnReplay.addEventListener('click', () => {
            window.audioEngine.playPop();
            window.audioEngine.stopSpeaking();
            setTimeout(() => {
              window.audioEngine.speak(answerSpeech);
            }, 100);
          });
        }`;

const newBtnReplay = `        const btnReplay = document.getElementById('btn-replay-correct-audio');
        if (btnReplay) {
          btnReplay.addEventListener('click', () => {
            window.audioEngine.playPop();
            window.audioEngine.stopSpeaking();
            setTimeout(() => {
              window.audioEngine.speak(answerSpeech, { rate: 0.88 });
            }, 100);
          });
        }`;

let norm = code.replace(/\r\n/g, '\n');
if (!norm.includes(oldTarget.replace(/\r\n/g, '\n'))) {
  console.error("Target block not found in js/app.js!");
  process.exit(1);
}

norm = norm.replace(oldTarget.replace(/\r\n/g, '\n'), newTarget);
norm = norm.replace(oldBtnReplay.replace(/\r\n/g, '\n'), newBtnReplay);
norm = norm.replace('再聽一次正確答案', '再聽老師慢速示範發音');

fs.writeFileSync('js/app.js', norm, 'utf8');
console.log('Successfully updated js/app.js with slow teaching speech!');
