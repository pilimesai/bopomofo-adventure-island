const fs = require('fs');

// 1. Append CSS to css/style.css
const cssToAdd = `
/* ==========================================================================
   答錯暫停覆盤與手動下一題 (Wrong Answer Review & Manual Next Question)
   ========================================================================== */
.wrong-answer-review-card {
  margin-top: 18px;
  background: #FFF5F5;
  border: 3px solid #EF4444;
  border-radius: 18px;
  padding: 16px 20px;
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.15);
  animation: wrongCardSlideIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

@keyframes wrongCardSlideIn {
  0% { opacity: 0; transform: translateY(12px) scale(0.97); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.wrong-review-header {
  display: flex;
  align-items: center;
  gap: 14px;
}

.wrong-cross-icon {
  font-size: 32px;
  background: #FEE2E2;
  border: 2px solid #FCA5A5;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.correct-highlight-val {
  color: #059669;
  background: #D1FAE5;
  padding: 2px 10px;
  border-radius: 10px;
  border: 2px solid #34D399;
  display: inline-block;
  margin-left: 4px;
}

.wrong-review-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.review-replay-audio-btn {
  background: #EFF6FF;
  color: #1D4ED8;
  border: 2.5px solid #93C5FD;
  border-radius: 14px;
  padding: 10px 18px;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 0 #BFDBFE;
  transition: all 0.15s ease;
}
.review-replay-audio-btn:hover {
  background: #DBEAFE;
  transform: translateY(-2px);
}

.review-next-q-btn {
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
  border: none;
  border-radius: 14px;
  padding: 11px 26px;
  font-size: 17px;
  font-weight: 900;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 5px 0 #047857;
  transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: pulseNextBtn 1.8s infinite ease-in-out;
}
.review-next-q-btn:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 7px 0 #047857;
}

@keyframes pulseNextBtn {
  0%, 100% { box-shadow: 0 5px 0 #047857, 0 0 0 rgba(16, 185, 129, 0); }
  50% { box-shadow: 0 5px 0 #047857, 0 0 16px rgba(16, 185, 129, 0.55); }
}

/* 高亮正確選項 (Correct Choice Highlight in Grid) */
.correct-choice-highlight {
  border-color: #10B981 !important;
  background: #ECFDF5 !important;
  box-shadow: 0 0 0 3px #34D399, 0 6px 16px rgba(16, 185, 129, 0.25) !important;
  position: relative !important;
  transform: scale(1.02) !important;
  animation: correctGlow 1.5s infinite alternate ease-in-out !important;
}

@keyframes correctGlow {
  0% { box-shadow: 0 0 0 3px #34D399, 0 4px 10px rgba(16, 185, 129, 0.2); }
  100% { box-shadow: 0 0 0 4px #10B981, 0 8px 20px rgba(16, 185, 129, 0.45); }
}
`;

let css = fs.readFileSync('css/style.css', 'utf8');
css += '\n' + cssToAdd;
fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Appended CSS to css/style.css');

// 2. Update js/app.js
let app = fs.readFileSync('js/app.js', 'utf8');

// Hide wrongFeedback in renderCurrentStageQuestion
const oldResetAnswering = `    state.adventure.isAnswering = false;
    const prevGrid = document.getElementById('battle-options-grid');
    if (prevGrid) prevGrid.classList.remove('options-locked');`;

const newResetAnswering = `    state.adventure.isAnswering = false;
    const prevGrid = document.getElementById('battle-options-grid');
    if (prevGrid) prevGrid.classList.remove('options-locked');
    const wrongFb = document.getElementById('battle-wrong-feedback');
    if (wrongFb) wrongFb.style.display = 'none';`;

if (app.includes(oldResetAnswering)) {
  app = app.replace(oldResetAnswering, newResetAnswering);
  console.log('Added wrongFb reset to renderCurrentStageQuestion');
} else {
  console.log('Could not find oldResetAnswering');
}

// Replace wrong answer branch in handleBattleAnswer
const oldWrongBranchStart = '    } else {\n      // 答錯！';
const oldWrongBranchEnd = '      setTimeout(() => {\n        state.adventure.qIndex++;\n        updateBattleHeaderUI();\n        const grid = document.getElementById(\'battle-options-grid\');\n        if (grid) grid.classList.remove(\'options-locked\');\n        renderCurrentStageQuestion();\n      }, 1300);\n    }';

const newWrongBranch = `    } else {
      // 答錯！錯了不能重選，畫面先停住，高亮顯示正確答案並朗讀發音，點擊下一題才繼續！
      state.adventure.combo = 0;
      state.adventure.mistakes++;
      if (state.adventure.hearts > 1) {
        state.adventure.hearts--;
      }
      updateBattleHeaderUI();

      if (btn) btn.classList.add('wrong-choice');

      // 自動高亮正確答案選項給小朋友學習正解
      if (optionsGrid) {
        const allCandidates = optionsGrid.querySelectorAll('button, .exam-check-card, .exam-circle-card, .fill-candidate-tile, .combine-opt-btn, .tone-stamp-btn, .connect-peg');
        allCandidates.forEach(el => {
          const txt = (el.dataset.ansText || el.textContent || '').trim();
          if (txt === q.answer || txt.startsWith(q.answer) || txt.includes(q.answer)) {
            el.classList.add('reveal-correct');
            el.classList.add('correct-choice-highlight');
          }
        });
      }

      window.audioEngine.playWrong();

      function extractTarget(qObj) {
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

      setMascotSpeech(\`「哎呀選錯了！本題 0 分。正確答案是【\${q.answer}】\${targetWord ? \`(\${targetWord})\` : ''}，聽聽正確發音，準備好請點選下方『前往下一題』！」\`);

      // 稍微延遲 0.28 秒，清晰朗讀真人正確答案發音
      setTimeout(() => {
        window.audioEngine.speak(answerSpeech);
      }, 280);

      // 畫面停住：建立「學習覆盤與前往下一題」控制面板
      let feedbackEl = document.getElementById('battle-wrong-feedback');
      if (!feedbackEl && optionsGrid) {
        feedbackEl = document.createElement('div');
        feedbackEl.id = 'battle-wrong-feedback';
        optionsGrid.parentNode.appendChild(feedbackEl);
      }

      const isLastQ = (state.adventure.qIndex >= questions.length - 1);
      const nextBtnText = isLastQ ? '點我查看本關考核成績' : '點我前往下一題';
      const nextBtnIcon = isLastQ ? '🏆' : '➡️';

      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.innerHTML = \`
          <div class="wrong-answer-review-card">
            <div class="wrong-review-header">
              <span class="wrong-cross-icon">❌</span>
              <div class="wrong-review-text">
                <strong style="font-size:17px;color:#DC2626;">這題答錯囉！不要灰心！</strong>
                <div style="font-size:16px;color:#1E293B;font-weight:900;margin-top:4px;">
                  正確答案是：<span class="correct-highlight-val">【\${q.answer}】\${targetWord ? \`(\${targetWord})\` : ''}</span>
                </div>
              </div>
            </div>
            <div class="wrong-review-actions">
              <button class="review-replay-audio-btn" id="btn-replay-correct-audio" type="button">
                <span>🔊</span> 再聽一次正確答案
              </button>
              <button class="review-next-q-btn" id="btn-next-question-manual" type="button">
                <span>👉</span> \${nextBtnText} <span>\${nextBtnIcon}</span>
              </button>
            </div>
          </div>
        \`;

        const btnReplay = document.getElementById('btn-replay-correct-audio');
        if (btnReplay) {
          btnReplay.addEventListener('click', () => {
            window.audioEngine.playPop();
            window.audioEngine.speak(answerSpeech);
          });
        }

        const btnNext = document.getElementById('btn-next-question-manual');
        if (btnNext) {
          btnNext.addEventListener('click', () => {
            window.audioEngine.playPop();
            feedbackEl.style.display = 'none';
            state.adventure.qIndex++;
            updateBattleHeaderUI();
            if (optionsGrid) optionsGrid.classList.remove('options-locked');
            renderCurrentStageQuestion();
          });
        }
      }
    }`;

const wStart = app.indexOf(oldWrongBranchStart);
const wEnd = app.indexOf(oldWrongBranchEnd, wStart);
if (wStart !== -1 && wEnd !== -1) {
  app = app.substring(0, wStart) + newWrongBranch + app.substring(wEnd + oldWrongBranchEnd.length);
  console.log('Replaced wrong answer branch in handleBattleAnswer');
} else {
  console.log('Could not find wrong answer branch:', wStart, wEnd);
}

fs.writeFileSync('js/app.js', app, 'utf8');

// 3. Bump index.html to v=43
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\?v=42/g, '?v=43');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Bumped index.html to v=43');
