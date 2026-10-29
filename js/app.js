/**
 * ㄅㄆㄇ 快樂冒險島 - 主應用程式控制邏輯
 * 專為台灣教育部小一新生國語注音打造
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 全域狀態管理 (State)
  // ==========================================
  const state = {
    stars: parseInt(localStorage.getItem('zhuyin_stars') || '5', 10), // 送新朋友5顆見面星星
    currentSymbolIndex: 0,
    currentFilter: 'all',
    
    // 拼音小火車狀態
    train: {
      initial: 'ㄅ',
      medial: '',
      final: 'ㄚ',
      tone: 1
    },

    // 聲調模組狀態
    tone: {
      currentBase: 'ㄅㄚ',
      currentToneId: 1
    },

    // 筆順小畫家
    canvas: {
      currentChar: 'ㄅ',
      strokeColor: '#FF6B6B',
      lineWidth: 14,
      isDrawing: false,
      hasDrawn: false
    },

    // 遊戲狀態
    game: {
      currentMode: 'balloon', // 'balloon', 'memory', 'toneQuiz'
      score: 0,
      round: 0,
      maxRounds: 5,
      currentQuizItem: null,
      memoryCards: [],
      flippedCards: [],
      matchedPairs: 0
    },

    // 徽章成就追蹤
    achievements: [
      { id: 'first_step', name: '注音探險家', desc: '成功登入ㄅㄆㄇ冒險島', icon: '🏝️', unlocked: true },
      { id: 'initial_master', name: '聲母神射手', desc: '在聽音氣球中連對3題', icon: '🎯', unlocked: false },
      { id: 'spelling_ace', name: '拼音小達人', desc: '開動神奇拼音火車完成合音', icon: '🚂', unlocked: false },
      { id: 'tone_roller', name: '聲調特技王', desc: '挑戰四聲溜滑梯全部聲調', icon: '🎢', unlocked: false },
      { id: 'calligraphy_star', name: '筆順小神筆', desc: '在米字格認真描寫注音並蓋章', icon: '✍️', unlocked: false }
    ]
  };

  // ==========================================
  // DOM 元素快取
  // ==========================================
  const dom = {
    starCount: document.getElementById('global-star-count'),
    audioToggleBtn: document.getElementById('btn-audio-toggle'),
    mascotSpeech: document.getElementById('mascot-speech'),
    tabBtns: document.querySelectorAll('.tab-btn'),
    tabPanes: document.querySelectorAll('.tab-pane'),
    
    // Gallery
    filterChips: document.querySelectorAll('.filter-chip'),
    symbolGrid: document.getElementById('symbol-card-grid'),
    combinedChipsContainer: document.getElementById('combined-chips-container'),

    // Modal
    modal: document.getElementById('symbol-detail-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalChar: document.getElementById('modal-char'),
    modalCategory: document.getElementById('modal-category'),
    modalStrokesInfo: document.getElementById('modal-strokes-info'),
    modalTitle: document.getElementById('modal-title'),
    modalListenBtn: document.getElementById('modal-listen-btn'),
    modalMnemonic: document.getElementById('modal-mnemonic'),
    modalStrokeGuide: document.getElementById('modal-stroke-guide'),
    modalExamplesGrid: document.getElementById('modal-examples-grid'),
    modalPrevBtn: document.getElementById('modal-prev-btn'),
    modalNextBtn: document.getElementById('modal-next-btn'),
    modalPracticeBtn: document.getElementById('modal-practice-btn'),

    // Train
    trainInitialVal: document.getElementById('train-initial-val'),
    trainMedialVal: document.getElementById('train-medial-val'),
    trainFinalVal: document.getElementById('train-final-val'),
    trainToneVal: document.getElementById('train-tone-val'),
    trainResultChar: document.getElementById('train-result-char'),
    trainResultWord: document.getElementById('train-result-word'),
    trainResultPinyin: document.getElementById('train-result-pinyin'),
    trainPickerInitial: document.getElementById('train-picker-initial'),
    trainPickerMedial: document.getElementById('train-picker-medial'),
    trainPickerFinal: document.getElementById('train-picker-final'),
    trainPickerTone: document.getElementById('train-picker-tone'),
    btnTrainSpell: document.getElementById('btn-train-spell'),
    btnTrainRandom: document.getElementById('btn-train-random'),

    // Tone
    toneCardsRow: document.getElementById('tone-cards-row'),
    toneCurrentChar: document.getElementById('tone-current-char'),
    btnToneListen: document.getElementById('btn-tone-listen'),
    toneCurrentRhyme: document.getElementById('tone-current-rhyme'),

    // Games
    gameModeBtns: document.querySelectorAll('.mode-btn'),
    gameArena: document.getElementById('game-arena'),

    // Canvas
    strokeCanvas: document.getElementById('stroke-canvas'),
    canvasWatermark: document.getElementById('canvas-watermark'),
    canvasStrokeTip: document.getElementById('canvas-stroke-tip'),
    strokeCharPicker: document.getElementById('stroke-char-picker'),
    btnCanvasListen: document.getElementById('btn-canvas-listen'),
    btnCanvasClear: document.getElementById('btn-canvas-clear'),
    btnCanvasStamp: document.getElementById('btn-canvas-stamp'),
    colorDots: document.querySelectorAll('.color-dot'),

    // Voice Settings Modal
    btnVoiceSettings: document.getElementById('btn-voice-settings'),
    voiceModal: document.getElementById('voice-settings-modal'),
    voiceModalCloseBtn: document.getElementById('voice-modal-close-btn'),
    selectVoicePicker: document.getElementById('select-voice-picker'),
    sliderSpeechRate: document.getElementById('slider-speech-rate'),
    speechRateLabel: document.getElementById('speech-rate-label'),
    sliderSpeechPitch: document.getElementById('slider-speech-pitch'),
    speechPitchLabel: document.getElementById('speech-pitch-label'),
    btnTestVoice: document.getElementById('btn-test-voice'),
    btnSaveVoice: document.getElementById('btn-save-voice'),

    // Achievements
    achievementsList: document.getElementById('achievements-list')
  };

  // ==========================================
  // 初始化核心流程
  // ==========================================
  function init() {
    updateStarDisplay();
    setupTabNavigation();
    setupAudioToggle();
    setupVoiceSettingsModal();
    renderGallery();
    renderCombinedFinals();
    setupModalEvents();
    initBlendingTrain();
    initTonesSlider();
    initCanvasModule();
    initGameHub();
    renderAchievements();

    // 語音引擎初始化歡迎詞（親切台灣小一老師口吻）
    setTimeout(() => {
      window.audioEngine.speak('小朋友好！歡迎來到ㄅㄆㄇ冒險島，我們一起快樂學注音喔！');
    }, 600);
  }

  // ==========================================
  // 星星與獎勵管理
  // ==========================================
  function addStars(num = 1, triggerConfetti = true) {
    state.stars += num;
    localStorage.setItem('zhuyin_stars', state.stars.toString());
    updateStarDisplay();

    if (triggerConfetti && window.confetti) {
      window.confetti.trigger(50);
    }
  }

  function updateStarDisplay() {
    if (dom.starCount) {
      dom.starCount.textContent = state.stars;
    }
  }

  function unlockAchievement(id) {
    const ach = state.achievements.find(a => a.id === id);
    if (ach && !ach.unlocked) {
      ach.unlocked = true;
      renderAchievements();
      addStars(3, true);
      window.audioEngine.playFanfare();
      setMascotSpeech(`🎉 哇！太棒了！解鎖榮譽勳章：【${ach.name}】！獲得 3 顆星星！`);
    }
  }

  function setMascotSpeech(text) {
    if (dom.mascotSpeech) {
      dom.mascotSpeech.textContent = text;
      dom.mascotSpeech.style.animation = 'none';
      dom.mascotSpeech.offsetHeight; // trigger reflow
      dom.mascotSpeech.style.animation = 'pulseLight 1s';
    }
  }

  // ==========================================
  // 導航分頁切換
  // ==========================================
  function setupTabNavigation() {
    dom.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        window.audioEngine.playPop();
        const tabTarget = btn.dataset.tab;

        dom.tabBtns.forEach(b => b.classList.remove('active'));
        dom.tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPane = document.getElementById(tabTarget);
        if (targetPane) {
          targetPane.classList.add('active');
        }

        // 分頁對應吉祥物貼心提示
        const speeches = {
          'tab-gallery': '🐱 點擊任何一張注音卡片，來聽聽生活生活例詞和口訣！',
          'tab-train': '🚂 嗚嗚～小火車要開了！把聲母和韻母拼在一起吧！',
          'tab-tones': '🎢 一聲平、二聲揚、三聲拐彎、四聲降！跟著滑梯唸！',
          'tab-games': '🎈 準備好挑戰遊戲了嗎？戳破彩色氣球拿星星！',
          'tab-canvas': '✍️ 拿出手指或滑鼠，在標準米字格裡認真描寫吧！',
          'tab-achievements': '🏆 看看你蒐集了多少顆星星和亮晶晶的勳章！'
        };
        if (speeches[tabTarget]) {
          setMascotSpeech(speeches[tabTarget]);
        }
      });
    });

    // 點擊 Logo 回到第一頁
    const btnHome = document.getElementById('btn-home-logo');
    if (btnHome) {
      btnHome.addEventListener('click', () => {
        dom.tabBtns[0].click();
      });
    }

    // 點擊星星進入星光榜
    const btnStar = document.getElementById('header-star-btn');
    if (btnStar) {
      btnStar.addEventListener('click', () => {
        const achTab = Array.from(dom.tabBtns).find(b => b.dataset.tab === 'tab-achievements');
        if (achTab) achTab.click();
      });
    }
  }

  // 音效切換
  function setupAudioToggle() {
    if (!dom.audioToggleBtn) return;
    dom.audioToggleBtn.addEventListener('click', () => {
      window.audioEngine.isMuted = !window.audioEngine.isMuted;
      if (window.audioEngine.isMuted) {
        dom.audioToggleBtn.textContent = '🔇';
        dom.audioToggleBtn.title = '聲音已關閉';
        window.audioEngine.stopSpeaking();
      } else {
        dom.audioToggleBtn.textContent = '🔊';
        dom.audioToggleBtn.title = '聲音已開啟';
        window.audioEngine.playPop();
        window.audioEngine.speak('聲音已開啟！');
      }
    });
  }

  // 自然老師語音設定模組
  function setupVoiceSettingsModal() {
    if (!dom.btnVoiceSettings || !dom.voiceModal) return;

    // 開啟設定彈跳視窗
    dom.btnVoiceSettings.addEventListener('click', () => {
      window.audioEngine.playPop();
      populateVoicePicker();
      dom.sliderSpeechRate.value = window.audioEngine.speechRate;
      dom.speechRateLabel.textContent = `${window.audioEngine.speechRate}x (${window.audioEngine.speechRate < 0.8 ? '慢速清楚' : '親切教學'})`;
      dom.sliderSpeechPitch.value = window.audioEngine.speechPitch;
      dom.speechPitchLabel.textContent = `${window.audioEngine.speechPitch} (${window.audioEngine.speechPitch > 1.2 ? '輕快明亮' : '活潑溫柔'})`;

      dom.voiceModal.classList.add('open');
      dom.voiceModal.setAttribute('aria-hidden', 'false');
    });

    // 關閉視窗
    const closeVoiceModal = () => {
      dom.voiceModal.classList.remove('open');
      dom.voiceModal.setAttribute('aria-hidden', 'true');
      window.audioEngine.playPop();
    };

    if (dom.voiceModalCloseBtn) {
      dom.voiceModalCloseBtn.addEventListener('click', closeVoiceModal);
    }
    dom.voiceModal.addEventListener('click', (e) => {
      if (e.target === dom.voiceModal) closeVoiceModal();
    });

    // 滑桿動態連動
    dom.sliderSpeechRate.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      dom.speechRateLabel.textContent = `${val}x (${val < 0.8 ? '慢速清楚' : val > 1.0 ? '一般速度' : '親切教學'})`;
    });

    dom.sliderSpeechPitch.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      dom.speechPitchLabel.textContent = `${val} (${val < 1.0 ? '沉穩溫和' : val > 1.2 ? '輕快明亮' : '活潑溫柔'})`;
    });

    // 試聽按鈕
    dom.btnTestVoice.addEventListener('click', () => {
      const chosenVoiceName = dom.selectVoicePicker.value;
      const rate = parseFloat(dom.sliderSpeechRate.value);
      const pitch = parseFloat(dom.sliderSpeechPitch.value);

      window.audioEngine.setVoice(chosenVoiceName);
      window.audioEngine.setSpeechParams(rate, pitch);

      window.audioEngine.speak('小朋友好！我是雅婷老師，我們一起來快樂學注音喔！', { rate, pitch });
    });

    // 儲存設定
    dom.btnSaveVoice.addEventListener('click', () => {
      const chosenVoiceName = dom.selectVoicePicker.value;
      const rate = parseFloat(dom.sliderSpeechRate.value);
      const pitch = parseFloat(dom.sliderSpeechPitch.value);

      window.audioEngine.setVoice(chosenVoiceName);
      window.audioEngine.setSpeechParams(rate, pitch);
      window.audioEngine.playCorrect();

      closeVoiceModal();
      setMascotSpeech('🎙️ 耶！老師聲音已經設定好囉！說起話來就像學校老師一樣親切喔！');
    });
  }

  function populateVoicePicker() {
    if (!dom.selectVoicePicker) return;
    dom.selectVoicePicker.innerHTML = '';

    const voices = window.audioEngine.getAvailableTaiwanVoices();
    if (!voices || voices.length === 0) {
      const opt = document.createElement('option');
      opt.textContent = '台灣國語 (預設)';
      dom.selectVoicePicker.appendChild(opt);
      return;
    }

    // 依台灣在地腔調推薦排序：雅婷老師 (台灣真人聲) -> Google 國語 -> 志偉 -> 晨晨
    voices.sort((a, b) => {
      const score = (v) => {
        if (v.name.includes('Yating') || v.name.includes('雅婷')) return 100; // 最道地台灣國語腔調
        if (v.name.includes('Google') && (v.name.includes('臺灣') || v.name.includes('Taiwan') || v.lang === 'zh-TW')) return 90;
        if (v.name.includes('HsiaoChen') || v.name.includes('曉臻')) return 85;
        if (v.name.includes('Zhiwei') || v.name.includes('志偉')) return 80;
        if (v.name.includes('Hanhan')) return 20; // 傳統機械音
        return 50;
      };
      return score(b) - score(a);
    });

    voices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.name;

      // 友好別名標註
      let label = v.name;
      if (v.name.includes('Yating') || v.name.includes('雅婷')) {
        label = '🌸 Microsoft 雅婷老師（純台灣口音・溫柔親切・最推薦首選）';
      } else if (v.name.includes('Google') && (v.name.includes('臺灣') || v.lang === 'zh-TW')) {
        label = '🌟 Google 台灣國語（流暢自然語音）';
      } else if (v.name.includes('Zhiwei') || v.name.includes('志偉')) {
        label = '👨 Microsoft 志偉老師（親切台灣男聲）';
      } else if (v.name.includes('HsiaoChen') || v.name.includes('曉臻')) {
        label = '👧 晨晨老師（線上自然發音）';
      } else if (v.name.includes('Hanhan')) {
        label = '🤖 漢漢（傳統電腦語音）';
      }

      opt.textContent = label;
      if (window.audioEngine.taiwanVoice && window.audioEngine.taiwanVoice.name === v.name) {
        opt.selected = true;
      }
      dom.selectVoicePicker.appendChild(opt);
    });
  }

  // ==========================================
  // MODULE 1: 37注音探險圖鑑
  // ==========================================
  function renderGallery() {
    if (!dom.symbolGrid) return;
    dom.symbolGrid.innerHTML = '';

    const filtered = ZHUYIN_DATA.symbols.filter(s => {
      if (state.currentFilter === 'all') return true;
      return s.type === state.currentFilter;
    });

    filtered.forEach((sym, idx) => {
      const card = document.createElement('div');
      card.className = 'symbol-card';
      card.style.borderColor = sym.color + '44';

      card.innerHTML = `
        <div class="card-sound-badge">🔊</div>
        <div class="card-zhuyin-char" style="color:${sym.color};">${sym.char}</div>
        <div class="card-icon">${sym.icon}</div>
        <div class="card-word">${sym.word}</div>
        <div class="card-pinyin">${sym.pinyin}</div>
      `;

      card.addEventListener('click', () => {
        window.audioEngine.playPop();
        openSymbolModal(ZHUYIN_DATA.symbols.indexOf(sym));
      });

      dom.symbolGrid.appendChild(card);
    });

    // 篩選標籤點擊事件
    dom.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        window.audioEngine.playPop();
        dom.filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.currentFilter = chip.dataset.filter;
        renderGallery();
      });
    });
  }

  function renderCombinedFinals() {
    if (!dom.combinedChipsContainer) return;
    dom.combinedChipsContainer.innerHTML = '';

    ZHUYIN_DATA.combinedFinals.forEach(item => {
      const chip = document.createElement('div');
      chip.className = 'combo-chip';
      chip.innerHTML = `
        <span>${item.combo}</span>
        <span style="font-size:16px;">${item.icon}</span>
        <span style="font-size:14px;color:#868E96;font-weight:700;">(${item.word})</span>
      `;

      chip.addEventListener('click', () => {
        window.audioEngine.playPop();
        window.audioEngine.speak(`${item.combo}。${item.word}的${item.combo}。`);
      });

      dom.combinedChipsContainer.appendChild(chip);
    });
  }

  // ==========================================
  // MODAL: 注音卡片詳細視窗
  // ==========================================
  function openSymbolModal(index) {
    if (index < 0 || index >= ZHUYIN_DATA.symbols.length) return;
    state.currentSymbolIndex = index;
    const sym = ZHUYIN_DATA.symbols[index];

    dom.modalChar.textContent = sym.char;
    dom.modalChar.style.color = sym.color;
    dom.modalCategory.textContent = sym.categoryName;
    dom.modalStrokesInfo.textContent = `筆劃：${sym.strokes} 畫`;
    dom.modalTitle.textContent = `${sym.char} (${sym.pinyin})`;
    dom.modalMnemonic.textContent = sym.mnemonic;
    dom.modalStrokeGuide.textContent = sym.strokeGuide.join('，');

    // 渲染生活例詞
    dom.modalExamplesGrid.innerHTML = '';
    sym.examples.forEach(ex => {
      const exCard = document.createElement('div');
      exCard.className = 'example-card-item';
      exCard.innerHTML = `
        <div class="ex-icon">${ex.icon}</div>
        <div class="ex-word">${ex.word}</div>
        <div class="ex-zhuyin">${ex.zhuyin}</div>
      `;
      exCard.addEventListener('click', (e) => {
        e.stopPropagation();
        window.audioEngine.playPop();
        window.audioEngine.speak(`${ex.word}。${ex.zhuyin}。`);
      });
      dom.modalExamplesGrid.appendChild(exCard);
    });

    // 播放語音
    window.audioEngine.speakSymbol(sym, 'full');

    dom.modal.classList.add('open');
    dom.modal.setAttribute('aria-hidden', 'false');
  }

  function setupModalEvents() {
    dom.modalCloseBtn.addEventListener('click', () => {
      dom.modal.classList.remove('open');
      dom.modal.setAttribute('aria-hidden', 'true');
      window.audioEngine.playPop();
    });

    dom.modal.addEventListener('click', (e) => {
      if (e.target === dom.modal) {
        dom.modal.classList.remove('open');
        dom.modal.setAttribute('aria-hidden', 'true');
      }
    });

    dom.modalListenBtn.addEventListener('click', () => {
      const sym = ZHUYIN_DATA.symbols[state.currentSymbolIndex];
      window.audioEngine.speakSymbol(sym, 'full');
    });

    dom.modalPrevBtn.addEventListener('click', () => {
      window.audioEngine.playPop();
      let nextIdx = state.currentSymbolIndex - 1;
      if (nextIdx < 0) nextIdx = ZHUYIN_DATA.symbols.length - 1;
      openSymbolModal(nextIdx);
    });

    dom.modalNextBtn.addEventListener('click', () => {
      window.audioEngine.playPop();
      let nextIdx = state.currentSymbolIndex + 1;
      if (nextIdx >= ZHUYIN_DATA.symbols.length) nextIdx = 0;
      openSymbolModal(nextIdx);
    });

    dom.modalPracticeBtn.addEventListener('click', () => {
      window.audioEngine.playPop();
      const sym = ZHUYIN_DATA.symbols[state.currentSymbolIndex];
      dom.modal.classList.remove('open');
      // 切換至筆順畫布並載入此字
      const canvasTab = Array.from(dom.tabBtns).find(b => b.dataset.tab === 'tab-canvas');
      if (canvasTab) canvasTab.click();
      setCanvasCharacter(sym.char);
    });
  }

  // ==========================================
  // MODULE 2: 神奇拼音小火車
  // ==========================================
  function initBlendingTrain() {
    const initials = ['', 'ㄅ', 'ㄆ', 'ㄇ', 'ㄈ', 'ㄉ', 'ㄊ', 'ㄋ', 'ㄌ', 'ㄍ', 'ㄎ', 'ㄏ', 'ㄐ', 'ㄑ', 'ㄒ', 'ㄓ', 'ㄔ', 'ㄕ', 'ㄖ', 'ㄗ', 'ㄘ', 'ㄙ'];
    const medials = ['', 'ㄧ', 'ㄨ', 'ㄩ'];
    const finals = ['', 'ㄚ', 'ㄛ', 'ㄜ', 'ㄝ', 'ㄞ', 'ㄟ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄣ', 'ㄤ', 'ㄥ', 'ㄦ'];
    const tones = [
      { id: 1, label: '一聲 ˉ' },
      { id: 2, label: '二聲 ˊ' },
      { id: 3, label: '三聲 ˇ' },
      { id: 4, label: '四聲 ˋ' },
      { id: 0, label: '輕聲 ˙' }
    ];

    // 渲染聲母選擇鈕
    renderPickerItems(dom.trainPickerInitial, initials, state.train.initial, (val) => {
      state.train.initial = val;
      updateTrainView();
    });

    // 渲染介音選擇鈕
    renderPickerItems(dom.trainPickerMedial, medials, state.train.medial, (val) => {
      state.train.medial = val;
      updateTrainView();
    });

    // 渲染韻母選擇鈕
    renderPickerItems(dom.trainPickerFinal, finals, state.train.final, (val) => {
      state.train.final = val;
      updateTrainView();
    });

    // 渲染聲調選擇鈕
    renderTonePickerItems(dom.trainPickerTone, tones, state.train.tone, (val) => {
      state.train.tone = val;
      updateTrainView();
    });

    // 點擊拼讀按鈕
    dom.btnTrainSpell.addEventListener('click', () => {
      performTrainSpelling();
    });

    // 隨機抽題換字
    dom.btnTrainRandom.addEventListener('click', () => {
      window.audioEngine.playPop();
      const list = ZHUYIN_DATA.blendingDictionary;
      const randomEntry = list[Math.floor(Math.random() * list.length)];
      state.train.initial = randomEntry.initial;
      state.train.medial = randomEntry.medial;
      state.train.final = randomEntry.final;
      state.train.tone = randomEntry.tone;

      // 更新選中樣式
      refreshPickerSelections();
      updateTrainView();
      performTrainSpelling();
    });

    updateTrainView();
  }

  function renderPickerItems(container, list, currentVal, onSelect) {
    if (!container) return;
    container.innerHTML = '';
    list.forEach(item => {
      const btn = document.createElement('div');
      btn.className = `pick-item ${item === currentVal ? 'active' : ''}`;
      btn.textContent = item === '' ? '無' : item;
      btn.addEventListener('click', () => {
        window.audioEngine.playPop();
        container.querySelectorAll('.pick-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        onSelect(item);
      });
      container.appendChild(btn);
    });
  }

  function renderTonePickerItems(container, list, currentVal, onSelect) {
    if (!container) return;
    container.innerHTML = '';
    list.forEach(item => {
      const btn = document.createElement('div');
      btn.className = `pick-item ${item.id === currentVal ? 'active' : ''}`;
      btn.style.width = '64px';
      btn.textContent = item.label;
      btn.addEventListener('click', () => {
        window.audioEngine.playPop();
        container.querySelectorAll('.pick-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        onSelect(item.id);
      });
      container.appendChild(btn);
    });
  }

  function refreshPickerSelections() {
    const updateActive = (container, val, isTone = false) => {
      if (!container) return;
      container.querySelectorAll('.pick-item').forEach(btn => {
        if (isTone) {
          btn.classList.toggle('active', btn.textContent.includes(val === 1 ? '一聲' : val === 2 ? '二聲' : val === 3 ? '三聲' : val === 4 ? '四聲' : '輕聲'));
        } else {
          btn.classList.toggle('active', btn.textContent === (val === '' ? '無' : val));
        }
      });
    };

    updateActive(dom.trainPickerInitial, state.train.initial);
    updateActive(dom.trainPickerMedial, state.train.medial);
    updateActive(dom.trainPickerFinal, state.train.final);
    updateActive(dom.trainPickerTone, state.train.tone, true);
  }

  function updateTrainView() {
    dom.trainInitialVal.textContent = state.train.initial || '—';
    dom.trainMedialVal.textContent = state.train.medial || '—';
    dom.trainFinalVal.textContent = state.train.final || '—';

    const toneMark = state.train.tone === 1 ? 'ˉ' :
                     state.train.tone === 2 ? 'ˊ' :
                     state.train.tone === 3 ? 'ˇ' :
                     state.train.tone === 4 ? 'ˋ' : '˙';
    dom.trainToneVal.textContent = toneMark;

    // 查詢字典
    const match = ZHUYIN_DATA.blendingDictionary.find(d => 
      d.initial === state.train.initial &&
      d.medial === state.train.medial &&
      d.final === state.train.final &&
      d.tone === state.train.tone
    );

    const fullZhuyin = `${state.train.initial}${state.train.medial}${state.train.final}${toneMark === 'ˉ' ? '' : toneMark}`;

    if (match) {
      dom.trainResultChar.textContent = match.char;
      dom.trainResultWord.textContent = match.word;
      dom.trainResultPinyin.textContent = `${fullZhuyin} (${match.pinyin})`;
    } else {
      // 自由拼音組合模式
      dom.trainResultChar.textContent = fullZhuyin || 'ㄅㄚ';
      dom.trainResultWord.textContent = '🌟 自由拼讀小夥伴';
      dom.trainResultPinyin.textContent = fullZhuyin;
    }
  }

  function performTrainSpelling() {
    window.audioEngine.playTrainWhistle();
    unlockAchievement('spelling_ace');

    const match = ZHUYIN_DATA.blendingDictionary.find(d => 
      d.initial === state.train.initial &&
      d.medial === state.train.medial &&
      d.final === state.train.final &&
      d.tone === state.train.tone
    );

    const fullChar = match ? match.char : (dom.trainResultChar.textContent);
    const fullWord = match ? match.word : '';

    const toneMark = state.train.tone === 1 ? 'ˉ' :
                     state.train.tone === 2 ? 'ˊ' :
                     state.train.tone === 3 ? 'ˇ' :
                     state.train.tone === 4 ? 'ˋ' : '˙';

    setTimeout(() => {
      window.audioEngine.spellBlending(
        state.train.initial,
        state.train.medial,
        state.train.final,
        toneMark,
        state.train.tone,
        fullChar,
        fullWord
      );
    }, 400);
  }

  // ==========================================
  // MODULE 3: 四聲溜滑梯
  // ==========================================
  function initTonesSlider() {
    if (!dom.toneCardsRow) return;
    dom.toneCardsRow.innerHTML = '';

    ZHUYIN_DATA.tones.forEach(tone => {
      const card = document.createElement('div');
      card.className = `tone-card ${tone.id === state.tone.currentToneId ? 'active' : ''}`;
      card.dataset.tone = tone.id;

      card.innerHTML = `
        <div class="tone-symbol-large" style="color:${tone.color};">${tone.symbol || 'ˉ'}</div>
        <div class="tone-title">${tone.name}</div>
        <div class="tone-rhyme">${tone.rhyme}</div>
        <div class="tone-visual-path">
          <div class="tone-car-anim">🚗</div>
        </div>
      `;

      card.addEventListener('click', () => {
        window.audioEngine.playPop();
        dom.toneCardsRow.querySelectorAll('.tone-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        state.tone.currentToneId = tone.id;
        playToneExperience(tone);
      });

      dom.toneCardsRow.appendChild(card);
    });

    dom.btnToneListen.addEventListener('click', () => {
      const current = ZHUYIN_DATA.tones.find(t => t.id === state.tone.currentToneId);
      if (current) playToneExperience(current);
    });
  }

  function playToneExperience(tone) {
    unlockAchievement('tone_roller');
    dom.toneCurrentRhyme.textContent = tone.rhyme;
    
    // 計算示範字音
    const base = 'ㄅㄚ';
    const markedChar = tone.id === 1 ? 'ㄅㄚ' :
                       tone.id === 2 ? 'ㄅㄚˊ' :
                       tone.id === 3 ? 'ㄅㄚˇ' :
                       tone.id === 4 ? 'ㄅㄚˋ' : '˙ㄅㄚ';
    dom.toneCurrentChar.textContent = markedChar;

    // 播放音高溜滑梯
    window.audioEngine.playTonePitchCurve(tone.id);

    // 播放國語語音朗讀（台灣小一國語教室教學法）
    setTimeout(() => {
      const toneExplanation = 
        tone.id === 1 ? '第一聲，平平的！ㄅㄚ，八個蘋果的八！' :
        tone.id === 2 ? '第二聲，往上爬！ㄅㄚˊ，拔蘿蔔的拔！' :
        tone.id === 3 ? '第三聲，轉個彎！ㄅㄚˇ，一把傘的把！' :
        tone.id === 4 ? '第四聲，溜滑梯！ㄅㄚˋ，爸爸的爸！' :
                        '輕聲，輕輕的！ㄅㄚ˙，爸爸後面的爸！';
      window.audioEngine.speak(toneExplanation);
    }, 400);
  }

  // ==========================================
  // MODULE 4: 趣味注音小遊樂園
  // ==========================================
  function initGameHub() {
    dom.gameModeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        window.audioEngine.playPop();
        dom.gameModeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.game.currentMode = btn.dataset.game;
        startNewGame();
      });
    });

    startNewGame();
  }

  function startNewGame() {
    state.game.score = 0;
    state.game.round = 0;

    if (state.game.currentMode === 'balloon') {
      renderBalloonGame();
    } else if (state.game.currentMode === 'memory') {
      renderMemoryGame();
    } else if (state.game.currentMode === 'toneQuiz') {
      renderToneQuizGame();
    }
  }

  // --- 遊戲 1：聽音戳氣球 🎈 ---
  function renderBalloonGame() {
    if (state.game.round >= state.game.maxRounds) {
      renderGameVictory('哇！氣球戳戳樂太棒囉！');
      return;
    }

    state.game.round++;
    const question = ZHUYIN_DATA.quizItems[Math.floor(Math.random() * ZHUYIN_DATA.quizItems.length)];
    state.game.currentQuizItem = question;

    const balloonColors = ['#FF6B6B', '#4DABF7', '#51CF66', '#FF922B'];
    const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);

    dom.gameArena.innerHTML = `
      <div class="game-status-bar">
        <div class="game-prompt-large">
          <span>🎧 聽聽看喔～請選出「<strong>${question.target}</strong>」的氣球！</span>
          <button class="replay-audio-btn" id="btn-replay-game-audio" title="重聽發音">🔊</button>
        </div>
        <div class="score-badge">第 ${state.game.round} / ${state.game.maxRounds} 關 | 得分：⭐ ${state.game.score}</div>
      </div>
      <div class="balloon-grid" id="balloon-container"></div>
    `;

    const container = document.getElementById('balloon-container');
    const replayBtn = document.getElementById('btn-replay-game-audio');

    const speakTarget = () => {
      window.audioEngine.speak(`聽聽看喔！請找出，${question.target}，${question.hint}喔！`);
    };
    speakTarget();

    replayBtn.addEventListener('click', () => {
      window.audioEngine.playPop();
      speakTarget();
    });

    shuffledOptions.forEach((opt, idx) => {
      const balloon = document.createElement('div');
      balloon.className = 'balloon-item';
      balloon.style.background = balloonColors[idx % balloonColors.length];
      balloon.style.animationDelay = `${idx * 0.4}s`;
      balloon.textContent = opt;

      balloon.addEventListener('click', () => {
        if (opt === question.target) {
          // 答對了！
          window.audioEngine.playPop();
          window.audioEngine.playCorrect();
          addStars(1, true);
          state.game.score++;
          balloon.style.transform = 'scale(1.4)';
          balloon.style.opacity = '0';
          unlockAchievement('initial_master');

          setTimeout(() => {
            renderBalloonGame();
          }, 600);
        } else {
          // 答錯溫和提示
          window.audioEngine.playWrong();
          balloon.style.transform = 'translateX(-10px)';
          setTimeout(() => { balloon.style.transform = ''; }, 200);
          window.audioEngine.speak(`這個是 ${opt} 喔！再聽一次～請找出 ${question.target}`);
        }
      });

      container.appendChild(balloon);
    });
  }

  // --- 遊戲 2：翻牌記憶連連看 🃏 ---
  function renderMemoryGame() {
    // 隨機挑選 4 組符號與例圖配對
    const sampleSymbols = [...ZHUYIN_DATA.symbols].sort(() => Math.random() - 0.5).slice(0, 4);
    let cards = [];
    sampleSymbols.forEach(sym => {
      cards.push({ id: sym.char, text: sym.char, type: 'symbol', matchId: sym.char });
      cards.push({ id: sym.char + '_word', text: `${sym.icon} ${sym.word}`, type: 'word', matchId: sym.char });
    });
    cards.sort(() => Math.random() - 0.5);

    state.game.memoryCards = cards;
    state.game.flippedCards = [];
    state.game.matchedPairs = 0;

    dom.gameArena.innerHTML = `
      <div class="game-status-bar">
        <div class="game-prompt-large">
          <span>🃏 翻開卡片，幫注音符號和它的好朋友連線配對！</span>
        </div>
        <div class="score-badge">已配對：⭐ ${state.game.matchedPairs} / 4</div>
      </div>
      <div class="memory-grid" id="memory-board"></div>
    `;

    const board = document.getElementById('memory-board');
    cards.forEach((cardData, idx) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'memory-card';
      cardEl.dataset.index = idx;
      cardEl.textContent = '❓';

      cardEl.addEventListener('click', () => {
        handleMemoryCardClick(cardEl, cardData);
      });

      board.appendChild(cardEl);
    });
  }

  function handleMemoryCardClick(cardEl, cardData) {
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;
    if (state.game.flippedCards.length >= 2) return;

    window.audioEngine.playPop();
    cardEl.classList.add('flipped');
    cardEl.textContent = cardData.text;
    state.game.flippedCards.push({ el: cardEl, data: cardData });

    if (state.game.flippedCards.length === 2) {
      const [first, second] = state.game.flippedCards;
      if (first.data.matchId === second.data.matchId) {
        // 配對成功！
        window.audioEngine.playCorrect();
        first.el.classList.add('matched');
        second.el.classList.add('matched');
        state.game.matchedPairs++;
        addStars(1, true);

        const scoreBadge = dom.gameArena.querySelector('.score-badge');
        if (scoreBadge) scoreBadge.textContent = `已配對：⭐ ${state.game.matchedPairs} / 4`;

        state.game.flippedCards = [];
        if (state.game.matchedPairs === 4) {
          setTimeout(() => {
            renderGameVictory('哇！翻牌記憶大成功！好棒喔！');
          }, 600);
        }
      } else {
        // 配對失敗，翻回去
        window.audioEngine.playWrong();
        setTimeout(() => {
          first.el.classList.remove('flipped');
          second.el.classList.remove('flipped');
          first.el.textContent = '❓';
          second.el.textContent = '❓';
          state.game.flippedCards = [];
        }, 900);
      }
    }
  }

  // --- 遊戲 3：聲調聽力神射手 🎯 ---
  function renderToneQuizGame() {
    if (state.game.round >= state.game.maxRounds) {
      renderGameVictory('哇！聲調小神探挑戰成功囉！');
      return;
    }

    state.game.round++;
    const questions = [
      { word: '太陽', targetPart: '太', toneId: 4, zhuyin: 'ㄊㄞˋ', hint: '四聲溜滑梯往下衝' },
      { word: '小魚', targetPart: '魚', toneId: 2, zhuyin: 'ㄩˊ', hint: '二聲往上爬山坡' },
      { word: '小鳥', targetPart: '鳥', toneId: 3, zhuyin: 'ㄋㄧㄠˇ', hint: '三聲轉個彎' },
      { word: '媽媽', targetPart: '媽(前字)', toneId: 1, zhuyin: 'ㄇㄚ', hint: '一聲平平的一條線' },
      { word: '白鵝', targetPart: '鵝', toneId: 2, zhuyin: 'ㄜˊ', hint: '二聲往上爬山坡' },
      { word: '斑馬', targetPart: '斑', toneId: 1, zhuyin: 'ㄅㄢ', hint: '一聲平平的一條線' }
    ];
    const q = questions[Math.floor(Math.random() * questions.length)];

    dom.gameArena.innerHTML = `
      <div class="game-status-bar">
        <div class="game-prompt-large">
          <span>🎯 聽聽看喔：【${q.word}】的「${q.targetPart}」是第幾聲呢？</span>
          <button class="replay-audio-btn" id="btn-replay-tone-quiz" title="重聽發音">🔊</button>
        </div>
        <div class="score-badge">第 ${state.game.round} / ${state.game.maxRounds} 關 | 得分：⭐ ${state.game.score}</div>
      </div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin-top:20px;" id="tone-options-row"></div>
    `;

    const replayBtn = document.getElementById('btn-replay-tone-quiz');
    const optionsRow = document.getElementById('tone-options-row');

    const speakPrompt = () => {
      window.audioEngine.speak(`聽聽看喔！${q.word}的${q.targetPart}，請問是第幾聲呢？`);
    };
    speakPrompt();

    replayBtn.addEventListener('click', () => {
      window.audioEngine.playPop();
      speakPrompt();
    });

    const choices = [
      { id: 1, text: '第一聲 (平平 ˉ)' },
      { id: 2, text: '第二聲 (往上爬 ˊ)' },
      { id: 3, text: '第三聲 (轉個彎 ˇ)' },
      { id: 4, text: '第四聲 (溜滑梯 ˋ)' }
    ];

    choices.forEach(ch => {
      const btn = document.createElement('button');
      btn.className = 'secondary-action-btn';
      btn.style.fontSize = '18px';
      btn.style.padding = '14px 24px';
      btn.textContent = ch.text;

      btn.addEventListener('click', () => {
        if (ch.id === q.toneId) {
          window.audioEngine.playCorrect();
          addStars(1, true);
          state.game.score++;
          btn.style.background = '#D3F9D8';
          setTimeout(() => {
            renderToneQuizGame();
          }, 600);
        } else {
          window.audioEngine.playWrong();
          btn.style.background = '#FFE3E3';
          window.audioEngine.speak(`不對喔～再想想看！提示你：${q.hint}喔！`);
        }
      });

      optionsRow.appendChild(btn);
    });
  }

  function renderGameVictory(title) {
    window.audioEngine.playFanfare();
    if (window.confetti) window.confetti.trigger(80);

    dom.gameArena.innerHTML = `
      <div style="text-align:center;animation:fadeIn 0.4s ease;">
        <div style="font-size:72px;margin-bottom:12px;">🏆</div>
        <h2 style="font-size:32px;font-weight:900;color:#D9480F;margin-bottom:10px;">${title}</h2>
        <p style="font-size:20px;font-weight:800;color:#2B2D42;margin-bottom:24px;">哇！太厲害了！你全部挑戰成功，獲得好多閃亮亮星星喔！⭐</p>
        <button class="big-action-btn" id="btn-play-again" style="margin:0 auto;">
          <span>🔄</span>
          <span>再玩一次</span>
        </button>
      </div>
    `;

    document.getElementById('btn-play-again').addEventListener('click', () => {
      window.audioEngine.playPop();
      startNewGame();
    });
  }

  // ==========================================
  // MODULE 5: 筆順小畫家 (Stroke Canvas)
  // ==========================================
  function initCanvasModule() {
    const canvas = dom.strokeCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // 渲染注音快速挑選器
    renderCanvasCharPicker();

    // 顏色切換
    dom.colorDots.forEach(dot => {
      dot.addEventListener('click', () => {
        window.audioEngine.playPop();
        dom.colorDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        state.canvas.strokeColor = dot.dataset.color;
      });
    });

    // 聽讀音
    dom.btnCanvasListen.addEventListener('click', () => {
      const sym = ZHUYIN_DATA.symbols.find(s => s.char === state.canvas.currentChar);
      if (sym) {
        window.audioEngine.speakSymbol(sym, 'full');
      } else {
        window.audioEngine.speak(state.canvas.currentChar);
      }
    });

    // 清除畫布
    dom.btnCanvasClear.addEventListener('click', () => {
      window.audioEngine.playPop();
      clearCanvas(ctx);
    });

    // 蓋章領星星
    dom.btnCanvasStamp.addEventListener('click', () => {
      if (!state.canvas.hasDrawn) {
        window.audioEngine.speak('要先用彩色筆把注音描好，才可以蓋好棒章喔！');
        return;
      }
      unlockAchievement('calligraphy_star');
      window.audioEngine.playCorrect();
      addStars(1, true);
      setMascotSpeech(`⭐ 哇！寫得好漂亮喔！送你一顆亮晶晶的星星！`);

      // 在畫布上畫上金色讚美大星星章
      drawStarStamp(ctx, 170, 170);
    });

    // 滑鼠與觸控事件
    setupDrawingEvents(canvas, ctx);
  }

  function clearCanvas(ctx) {
    ctx.clearRect(0, 0, dom.strokeCanvas.width, dom.strokeCanvas.height);
    state.canvas.hasDrawn = false;
  }

  function drawStarStamp(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 212, 59, 0.85)';
    ctx.strokeStyle = '#E67700';
    ctx.lineWidth = 4;
    ctx.beginPath();
    let rot = Math.PI / 2 * 3;
    let step = Math.PI / 5;
    let outer = 45;
    let inner = 20;
    ctx.moveTo(x, y - outer);
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(x + Math.cos(rot) * outer, y + Math.sin(rot) * outer);
      rot += step;
      ctx.lineTo(x + Math.cos(rot) * inner, y + Math.sin(rot) * inner);
      rot += step;
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#7A4100';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('好棒', x, y);
    ctx.restore();
  }

  function setupDrawingEvents(canvas, ctx) {
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const startDraw = (e) => {
      e.preventDefault();
      state.canvas.isDrawing = true;
      state.canvas.hasDrawn = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = state.canvas.lineWidth;
      ctx.strokeStyle = state.canvas.strokeColor;
    };

    const moveDraw = (e) => {
      if (!state.canvas.isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };

    const stopDraw = () => {
      state.canvas.isDrawing = false;
      ctx.closePath();
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', moveDraw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);

    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', moveDraw, { passive: false });
    canvas.addEventListener('touchend', stopDraw);
  }

  function renderCanvasCharPicker() {
    if (!dom.strokeCharPicker) return;
    dom.strokeCharPicker.innerHTML = '';

    ZHUYIN_DATA.symbols.forEach(sym => {
      const badge = document.createElement('div');
      badge.className = `picker-badge ${sym.char === state.canvas.currentChar ? 'active' : ''}`;
      badge.textContent = sym.char;
      badge.addEventListener('click', () => {
        window.audioEngine.playPop();
        setCanvasCharacter(sym.char);
      });
      dom.strokeCharPicker.appendChild(badge);
    });
  }

  function setCanvasCharacter(char) {
    state.canvas.currentChar = char;
    dom.canvasWatermark.textContent = char;
    const sym = ZHUYIN_DATA.symbols.find(s => s.char === char);
    if (sym && dom.canvasStrokeTip) {
      dom.canvasStrokeTip.textContent = `筆順提示：${sym.strokeGuide.join('，')}（共 ${sym.strokes} 畫）`;
    }

    if (dom.strokeCharPicker) {
      dom.strokeCharPicker.querySelectorAll('.picker-badge').forEach(b => {
        b.classList.toggle('active', b.textContent === char);
      });
    }

    const ctx = dom.strokeCanvas.getContext('2d');
    clearCanvas(ctx);
  }

  // ==========================================
  // MODULE 6: 榮譽星光榜 (Achievements)
  // ==========================================
  function renderAchievements() {
    if (!dom.achievementsList) return;
    dom.achievementsList.innerHTML = '';

    state.achievements.forEach(ach => {
      const card = document.createElement('div');
      card.className = 'achieve-card';
      card.innerHTML = `
        <div class="badge-icon" style="${ach.unlocked ? '' : 'filter:grayscale(1);opacity:0.5;'}">${ach.icon}</div>
        <div class="badge-name">${ach.name}</div>
        <div class="badge-desc">${ach.desc}</div>
        <div class="badge-status ${ach.unlocked ? 'unlocked' : 'locked'}">
          ${ach.unlocked ? '✨ 已解鎖獲取' : '🔒 努力探索中'}
        </div>
      `;
      dom.achievementsList.appendChild(card);
    });
  }

  // 啟動主流程
  init();
});
