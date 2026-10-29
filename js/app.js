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

    // 🗺️ 闖關大冒險狀態 (Adventure Campaign)
    adventure: {
      // 紀錄每關獲得星數 { "1": 3, "2": 2, ... }
      stageStars: JSON.parse(localStorage.getItem('zhuyin_stage_progress') || '{}'),
      unlockAll: false,
      activeStage: null,
      qIndex: 0,
      hearts: 3,
      combo: 0,
      mistakes: 0,
      isAnswering: false
    },

    // 徽章成就追蹤
    achievements: [
      { id: 'first_step', name: '注音探險家', desc: '成功登入ㄅㄆㄇ冒險島', icon: '🏝️', unlocked: true },
      { id: 'stage_1_clear', name: '森林破關勇者', desc: '成功通過冒險島第一關', icon: '🌲', unlocked: false },
      { id: 'stage_5_clear', name: '神殿大冒險家', desc: '成功通過冒險島第五關', icon: '🦢', unlocked: false },
      { id: 'dragon_slayer', name: '黃金注音勇者王', desc: '擊敗第十關黃金注音巨龍！', icon: '👑', unlocked: false },
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
    playerRankIcon: document.getElementById('player-rank-icon'),
    playerRankTitle: document.getElementById('player-rank-title'),
    audioToggleBtn: document.getElementById('btn-audio-toggle'),
    mascotSpeech: document.getElementById('mascot-speech'),
    tabBtns: document.querySelectorAll('.tab-btn'),
    tabPanes: document.querySelectorAll('.tab-pane'),

    // Adventure Map & Battle
    advMapView: document.getElementById('adventure-map-view'),
    advBattleView: document.getElementById('adventure-battle-view'),
    advClearedCount: document.getElementById('adv-cleared-count'),
    advStageStars: document.getElementById('adv-stage-stars'),
    btnToggleUnlockAll: document.getElementById('btn-toggle-unlock-all'),
    advStagesGrid: document.getElementById('adventure-stages-grid'),
    btnBattleBack: document.getElementById('btn-battle-back'),
    battleStageTitle: document.getElementById('battle-stage-title'),
    battleComboBadge: document.getElementById('battle-combo-badge'),
    battleHearts: document.getElementById('battle-hearts'),
    battleProgressPill: document.getElementById('battle-progress-pill'),
    bossAvatarWrap: document.getElementById('boss-avatar-wrap'),
    bossEmoji: document.getElementById('boss-emoji'),
    bossNameTag: document.getElementById('boss-name-tag'),
    bossHpText: document.getElementById('boss-hp-text'),
    bossHpFill: document.getElementById('boss-hp-fill'),
    bossDialogue: document.getElementById('boss-dialogue'),
    battleQuestionCard: document.getElementById('battle-question-card'),
    battleQIcon: document.getElementById('battle-q-icon'),
    battleQWord: document.getElementById('battle-q-word'),
    battleQPrompt: document.getElementById('battle-q-prompt'),
    btnBattleListen: document.getElementById('btn-battle-listen'),
    btnBattleHint: document.getElementById('btn-battle-hint'),
    battleHintToast: document.getElementById('battle-hint-toast'),
    battleOptionsGrid: document.getElementById('battle-options-grid'),
    
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
    initAdventureModule();
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
      window.audioEngine.speak('小朋友好！歡迎來到ㄅㄆㄇ冒險島，快點選第一關，跟老師一起闖關打怪獸喔！');
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
    updatePlayerRankDisplay();
  }

  function updatePlayerRankDisplay() {
    if (!dom.playerRankIcon || !dom.playerRankTitle) return;
    const clearedStages = Object.keys(state.adventure.stageStars).filter(k => state.adventure.stageStars[k] > 0).length;
    const ranks = [
      { min: 0, icon: '🛡️', title: 'Lv.1 見習小勇者' },
      { min: 1, icon: '🌲', title: 'Lv.2 森林探險員' },
      { min: 3, icon: '🦖', title: 'Lv.4 恐龍馴獸師' },
      { min: 5, icon: '🦢', title: 'Lv.6 湖畔大精靈' },
      { min: 7, icon: '🚂', title: 'Lv.8 魔法列車長' },
      { min: 9, icon: '🏰', title: 'Lv.9 水晶聖騎士' },
      { min: 10, icon: '👑', title: 'Lv.10 黃金注音王' }
    ];
    let currentRank = ranks[0];
    ranks.forEach(r => {
      if (clearedStages >= r.min) currentRank = r;
    });
    dom.playerRankIcon.textContent = currentRank.icon;
    dom.playerRankTitle.textContent = currentRank.title;
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
          'tab-adventure': '🗺️ 選擇亮起來的島嶼關卡，答對題目就能發射星光魔法收服守護獸喔！',
          'tab-gallery': '🐱 點擊任何一張注音卡片，來聽聽生活例詞和口訣！',
          'tab-train': '🚂 嗚嗚～小火車要開了！把聲母和韻母拼在一起吧！',
          'tab-tones': '🎢 一聲平、二聲揚、三聲拐彎、四聲降！跟著滑梯唸！',
          'tab-games': '🎈 準備好挑戰小遊戲了嗎？戳破彩色氣球拿星星！',
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
        showAdventureMap();
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
    const updateSliderLabels = (rateVal, pitchVal) => {
      dom.speechRateLabel.textContent = `${rateVal}x (${rateVal < 0.8 ? '慢速清楚' : rateVal > 0.95 ? '輕快活潑' : '親切教學'})`;
      dom.speechPitchLabel.textContent = `${pitchVal} (${pitchVal >= 1.35 ? '🍓 超萌小女生' : pitchVal >= 1.22 ? '🎀 甜美少女' : pitchVal < 1.0 ? '溫柔姊姊' : '🌸 親切女老師'})`;
    };

    dom.sliderSpeechRate.addEventListener('input', (e) => {
      updateSliderLabels(parseFloat(e.target.value), parseFloat(dom.sliderSpeechPitch.value));
    });

    dom.sliderSpeechPitch.addEventListener('input', (e) => {
      updateSliderLabels(parseFloat(dom.sliderSpeechRate.value), parseFloat(e.target.value));
    });

    // 當切換下拉選單的角色時，立即生效並自動套用該女生角色的最佳音調與語速
    dom.selectVoicePicker.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'PERSONA::CUTE_GIRL') {
        dom.sliderSpeechRate.value = 0.92;
        dom.sliderSpeechPitch.value = 1.42;
      } else if (val === 'PERSONA::DUET' || val === 'PERSONA::SWEET_SISTER') {
        dom.sliderSpeechRate.value = 0.90;
        dom.sliderSpeechPitch.value = 1.25;
      } else {
        dom.sliderSpeechRate.value = 0.86;
        dom.sliderSpeechPitch.value = 1.12;
      }
      const rate = parseFloat(dom.sliderSpeechRate.value);
      const pitch = parseFloat(dom.sliderSpeechPitch.value);
      updateSliderLabels(rate, pitch);
      window.audioEngine.setVoice(val);
      window.audioEngine.setSpeechParams(rate, pitch);
    });

    // 試聽按鈕
    dom.btnTestVoice.addEventListener('click', () => {
      const chosenVoiceName = dom.selectVoicePicker.value;
      const rate = parseFloat(dom.sliderSpeechRate.value);
      const pitch = parseFloat(dom.sliderSpeechPitch.value);

      window.audioEngine.setVoice(chosenVoiceName);
      window.audioEngine.setSpeechParams(rate, pitch);

      if (chosenVoiceName === 'PERSONA::CUTE_GIRL') {
        window.audioEngine.speak('嗨～！我是最喜歡草莓的小莓姐姐！我們一起開開心心闖關學注音唷，耶～！', { voiceName: chosenVoiceName, rate, pitch });
      } else if (chosenVoiceName === 'PERSONA::DUET' || chosenVoiceName === 'PERSONA::SWEET_SISTER') {
        window.audioEngine.speak('哈囉小朋友！我是糖糖學姊，答對題目會送你亮晶晶的大星星喔！', { voiceName: chosenVoiceName, rate, pitch });
      } else {
        window.audioEngine.speak('小朋友好！我是雅婷老師，我們一起來快樂學注音喔！', { voiceName: chosenVoiceName, rate, pitch });
      }
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
      const roleName = chosenVoiceName === 'PERSONA::CUTE_GIRL' ? '🍓 小莓妹妹（5歲超萌小女生）' :
                       (chosenVoiceName === 'PERSONA::DUET' || chosenVoiceName === 'PERSONA::SWEET_SISTER') ? '🌻 小潔姐姐 ＆ 小萌娃（雙人律動）' : '🌸 正音班溫柔女老師';
      setMascotSpeech(`🎙️ 耶！已經切換成【${roleName}】的聲音囉！`);

      // 若目前正在闖關畫面中，立刻用新切換的聲音重念一次當前題目！
      if (state.adventure && state.adventure.currentStage) {
        const q = state.adventure.currentStage.questions[state.adventure.currentQIndex];
        if (q && q.speakText) {
          setTimeout(() => {
            window.audioEngine.speak(q.speakText);
          }, 300);
        }
      }
    });
  }

  function populateVoicePicker() {
    if (!dom.selectVoicePicker) return;
    dom.selectVoicePicker.innerHTML = '';

    const currentVoice = window.audioEngine.selectedVoiceName || 'PERSONA::DUET';

    // 1. 三大專屬真人級台灣女聲與萌娃角色（皆擁有完整獨立錄製的闖關與圖鑑語音庫！）
    const cutePersonas = [
      {
        value: 'PERSONA::DUET',
        label: '🌻 小潔姐姐 ＆ 小萌娃（三拍律動口訣＋5歲萌娃雙人跟讀 ✨激推！）'
      },
      {
        value: 'PERSONA::CUTE_GIRL',
        label: '🍓 小莓妹妹（5歲超萌可愛小女生童音獨唱 ✨新登場！）'
      },
      {
        value: 'PERSONA::TEACHER',
        label: '🌸 台灣正音班女老師（YMCA標準第一聲溫柔單人女老師 ✨）'
      }
    ];

    cutePersonas.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.value;
      opt.textContent = p.label;
      if (currentVoice === p.value || (currentVoice === 'PERSONA::SWEET_SISTER' && p.value === 'PERSONA::DUET')) {
        opt.selected = true;
      }
      dom.selectVoicePicker.appendChild(opt);
    });

    // 2. 系統內建台灣女聲清單（已全面刪除所有男聲）
    const voices = window.audioEngine.getAvailableTaiwanVoices();
    if (!voices || voices.length === 0) {
      return;
    }

    // 依台灣在地女聲推薦排序：雅婷老師 -> 曉臻/曉雨 -> Google 台灣女聲 -> 美佳
    voices.sort((a, b) => {
      const score = (v) => {
        if (v.name.includes('Yating') || v.name.includes('雅婷')) return 100;
        if (v.name.includes('HsiaoChen') || v.name.includes('曉臻')) return 95;
        if (v.name.includes('HsiaoYu') || v.name.includes('曉雨')) return 92;
        if (v.name.includes('Google') && (v.name.includes('臺灣') || v.name.includes('Taiwan') || v.lang === 'zh-TW')) return 90;
        if (v.name.includes('Meijia') || v.name.includes('美佳')) return 85;
        if (v.name.includes('Hanhan')) return 20;
        return 50;
      };
      return score(b) - score(a);
    });

    voices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.name;

      // 友好女聲別名標註（已完全移除男聲）
      let label = v.name;
      if (v.name.includes('Yating') || v.name.includes('雅婷')) {
        label = '🌸 系統內建：Microsoft 雅婷老師（純台灣口音）';
      } else if (v.name.includes('HsiaoChen') || v.name.includes('曉臻')) {
        label = '👧 系統內建：晨晨姐姐（Microsoft 曉臻）';
      } else if (v.name.includes('HsiaoYu') || v.name.includes('曉雨')) {
        label = '🌺 系統內建：小雨姐姐（Microsoft 曉雨）';
      } else if (v.name.includes('Google') && (v.name.includes('臺灣') || v.lang === 'zh-TW')) {
        label = '🌟 系統內建：Google 台灣甜美女聲';
      } else if (v.name.includes('Meijia') || v.name.includes('美佳')) {
        label = '🍎 系統內建：美佳老師（Apple 台灣女聲）';
      } else if (v.name.includes('Hanhan')) {
        label = '🌼 系統內建：涵涵老師（台灣女聲）';
      }

      opt.textContent = label;
      if (!currentVoice.startsWith('PERSONA::') && currentVoice === v.name) {
        opt.selected = true;
      }
      dom.selectVoicePicker.appendChild(opt);
    });
  }

  // ==========================================
  // MODULE 0: 🗺️ 冒險島 10 大闖關地圖與對戰系統
  // ==========================================
  function initAdventureModule() {
    if (!dom.advStagesGrid) return;

    // 檢查歷史通關紀錄以同步成就
    if (state.adventure.stageStars['1'] > 0) state.achievements.find(a => a.id === 'stage_1_clear').unlocked = true;
    if (state.adventure.stageStars['5'] > 0) state.achievements.find(a => a.id === 'stage_5_clear').unlocked = true;
    if (state.adventure.stageStars['10'] > 0) state.achievements.find(a => a.id === 'dragon_slayer').unlocked = true;

    // 自由選關切換（方便老師/家長直接跳關教學）
    if (dom.btnToggleUnlockAll) {
      dom.btnToggleUnlockAll.addEventListener('click', () => {
        window.audioEngine.playPop();
        state.adventure.unlockAll = !state.adventure.unlockAll;
        if (state.adventure.unlockAll) {
          dom.btnToggleUnlockAll.textContent = '🔓 自由選關模式：開啟中';
          dom.btnToggleUnlockAll.classList.add('unlocked-mode');
          setMascotSpeech('✨ 已開啟自由選關模式！全部 10 個關卡都可以直接點選挑戰囉！');
        } else {
          dom.btnToggleUnlockAll.textContent = '🔓 自由選關模式：關閉';
          dom.btnToggleUnlockAll.classList.remove('unlocked-mode');
          setMascotSpeech('🗺️ 恢復循序漸進闖關模式！一關一關挑戰更有成就感喔！');
        }
        renderAdventureMap();
      });
    }

    // 返回地圖按鈕
    if (dom.btnBattleBack) {
      dom.btnBattleBack.addEventListener('click', () => {
        window.audioEngine.playPop();
        window.audioEngine.stopSpeaking();
        showAdventureMap();
      });
    }

    // 再聽一次題目語音
    if (dom.btnBattleListen) {
      dom.btnBattleListen.addEventListener('click', () => {
        window.audioEngine.playPop();
        const stg = state.adventure.activeStage;
        if (!stg) return;
        const q = stg.questions[state.adventure.qIndex];
        if (q) window.audioEngine.speak(q.speakText);
      });
    }

    // 老師小提示按鈕
    if (dom.btnBattleHint) {
      dom.btnBattleHint.addEventListener('click', () => {
        window.audioEngine.playPop();
        const stg = state.adventure.activeStage;
        if (!stg) return;
        const q = stg.questions[state.adventure.qIndex];
        if (q && dom.battleHintToast) {
          dom.battleHintToast.textContent = `💡 老師提示：${q.hint}`;
          dom.battleHintToast.style.display = 'block';
          window.audioEngine.speak(`老師提示你喔：${q.hint}`);
        }
      });
    }

    renderAdventureMap();
  }

  function showAdventureMap() {
    if (dom.advMapView) dom.advMapView.style.display = 'block';
    if (dom.advBattleView) dom.advBattleView.style.display = 'none';
    renderAdventureMap();
  }

  function isStageUnlocked(stageId) {
    if (state.adventure.unlockAll) return true;
    if (stageId === 1) return true;
    // 前一關有拿到至少 1 顆星即可解鎖下一關
    return (state.adventure.stageStars[String(stageId - 1)] || 0) > 0;
  }

  function renderAdventureMap() {
    if (!dom.advStagesGrid) return;
    dom.advStagesGrid.innerHTML = '';

    const stages = ZHUYIN_DATA.adventureStages || [];
    let clearedCount = 0;
    let totalStageStars = 0;

    // 找出目前最新可挑戰但尚未通關的關卡，標記為 current-target
    let latestTargetId = 1;
    stages.forEach(s => {
      const earned = state.adventure.stageStars[String(s.id)] || 0;
      if (earned > 0) {
        clearedCount++;
        totalStageStars += earned;
        if (s.id < stages.length) latestTargetId = s.id + 1;
      }
    });

    if (dom.advClearedCount) dom.advClearedCount.textContent = `${clearedCount} / ${stages.length}`;
    if (dom.advStageStars) dom.advStageStars.textContent = `${totalStageStars} / ${stages.length * 3}`;
    updatePlayerRankDisplay();

    stages.forEach(stage => {
      const unlocked = isStageUnlocked(stage.id);
      const earnedStars = state.adventure.stageStars[String(stage.id)] || 0;
      const isCurrentTarget = unlocked && earnedStars === 0 && stage.id === latestTargetId;

      const card = document.createElement('div');
      card.className = `stage-node-card ${unlocked ? '' : 'locked'} ${isCurrentTarget ? 'current-target' : ''}`;
      if (unlocked && earnedStars > 0) {
        card.style.borderColor = stage.color;
      }

      const starStr = [1, 2, 3].map(n => (n <= earnedStars ? '⭐' : '☆')).join('');

      card.innerHTML = `
        <div>
          <div class="stage-top-row">
            <span class="stage-num-badge" style="background:${unlocked ? stage.color : '#ADB5BD'};">
              STAGE ${stage.id}
            </span>
            <span class="stage-stars-row" style="color:${earnedStars > 0 ? '#FCC419' : '#CED4DA'};">
              ${starStr}
            </span>
          </div>

          <div class="stage-main-hero">
            <div class="stage-icon-circle" style="background:${unlocked ? stage.bgGradient : '#E9ECEF'};">
              ${unlocked ? stage.icon : '🔒'}
            </div>
            <div class="stage-title-info">
              <h3>${stage.name}</h3>
              <div class="stage-sub">${stage.subtitle}</div>
            </div>
          </div>

          <div class="stage-desc-text">${stage.desc}</div>
        </div>

        <div class="stage-footer-row">
          <div class="stage-boss-tag">
            <span>${stage.bossIcon}</span>
            <span>守關：${stage.bossName}</span>
          </div>
          <button class="stage-play-btn">
            ${!unlocked ? '🔒 未解鎖' : earnedStars > 0 ? '🔄 再玩一次' : '⚔️ 開始闖關'}
          </button>
        </div>
      `;

      card.addEventListener('click', () => {
        if (!unlocked) {
          window.audioEngine.playWrong();
          window.audioEngine.speak(`要先通過第 ${stage.id - 1} 關，才能解鎖這一關喔！或是按右上角的自由選關按鈕！`);
          return;
        }
        window.audioEngine.playPop();
        startStageBattle(stage);
      });

      dom.advStagesGrid.appendChild(card);
    });
  }

  function startStageBattle(stage) {
    state.adventure.activeStage = stage;
    state.adventure.qIndex = 0;
    state.adventure.hearts = 3;
    state.adventure.combo = 0;
    state.adventure.mistakes = 0;
    state.adventure.isAnswering = false;

    if (dom.advMapView) dom.advMapView.style.display = 'none';
    if (dom.advBattleView) dom.advBattleView.style.display = 'block';

    // 確保題目卡顯示（避免上一次勝利畫面覆蓋）
    if (dom.battleQuestionCard) {
      dom.battleQuestionCard.innerHTML = `
        <div class="question-visual-row">
          <div class="question-big-icon" id="battle-q-icon">🦓</div>
          <div class="question-text-col">
            <div class="question-word-badge" id="battle-q-word" style="display:none;">斑馬</div>
            <h3 class="question-prompt-text" id="battle-q-prompt"></h3>
          </div>
        </div>
        <div class="question-helper-btns">
          <button class="q-helper-btn listen" id="btn-battle-listen">
            <span>🔊</span> 再聽老師唸一次
          </button>
          <button class="q-helper-btn hint" id="btn-battle-hint">
            <span>💡</span> 老師小提示
          </button>
        </div>
        <div class="battle-hint-toast" id="battle-hint-toast" style="display:none;"></div>
        <div class="battle-options-grid" id="battle-options-grid"></div>
      `;
      // 重新綁定動態生成的內部元素
      dom.battleQIcon = document.getElementById('battle-q-icon');
      dom.battleQWord = document.getElementById('battle-q-word');
      dom.battleQPrompt = document.getElementById('battle-q-prompt');
      dom.btnBattleListen = document.getElementById('btn-battle-listen');
      dom.btnBattleHint = document.getElementById('btn-battle-hint');
      dom.battleHintToast = document.getElementById('battle-hint-toast');
      dom.battleOptionsGrid = document.getElementById('battle-options-grid');

      dom.btnBattleListen.addEventListener('click', () => {
        window.audioEngine.playPop();
        const q = stage.questions[state.adventure.qIndex];
        if (q) window.audioEngine.speak(q.speakText);
      });
      dom.btnBattleHint.addEventListener('click', () => {
        window.audioEngine.playPop();
        const q = stage.questions[state.adventure.qIndex];
        if (q && dom.battleHintToast) {
          dom.battleHintToast.textContent = `💡 老師提示：${q.hint}`;
          dom.battleHintToast.style.display = 'block';
          window.audioEngine.speak(`老師提示你喔：${q.hint}`);
        }
      });
    }

    dom.battleStageTitle.textContent = `${stage.icon} ${stage.name}・${stage.subtitle}`;
    dom.bossEmoji.textContent = stage.bossIcon;
    dom.bossNameTag.textContent = `守關精靈：${stage.bossName}`;
    dom.bossDialogue.textContent = `「我是${stage.bossName}！答對 ${stage.questions.length} 題就能過關拿星星喔！」`;

    updateBattleHeaderUI();
    renderCurrentStageQuestion();
  }

  function updateBattleHeaderUI() {
    const stage = state.adventure.activeStage;
    if (!stage) return;

    const totalQ = stage.questions.length;
    const currentQ = Math.min(state.adventure.qIndex + 1, totalQ);
    dom.battleProgressPill.textContent = `題目 ${currentQ} / ${totalQ}`;

    // 愛心顯示
    const heartsStr = [1, 2, 3].map(n => (n <= state.adventure.hearts ? '❤️' : '🖤')).join('');
    dom.battleHearts.textContent = heartsStr;

    // 連擊顯示
    if (state.adventure.combo >= 2) {
      dom.battleComboBadge.style.display = 'inline-block';
      dom.battleComboBadge.textContent = `🔥 連擊 x${state.adventure.combo}`;
    } else {
      dom.battleComboBadge.style.display = 'none';
    }

    // 守關者血量計算
    const remainingRatio = Math.max(0, Math.round(((totalQ - state.adventure.qIndex) / totalQ) * 100));
    dom.bossHpText.textContent = `HP: ${remainingRatio}%`;
    dom.bossHpFill.style.width = `${remainingRatio}%`;
  }

  function renderCurrentStageQuestion() {
    const stage = state.adventure.activeStage;
    if (!stage) return;

    if (state.adventure.qIndex >= stage.questions.length) {
      handleStageVictory();
      return;
    }

    state.adventure.isAnswering = false;
    const q = stage.questions[state.adventure.qIndex];

    updateBattleHeaderUI();
    dom.battleQIcon.textContent = q.icon || stage.icon;
    if (q.word) {
      dom.battleQWord.style.display = 'inline-block';
      dom.battleQWord.textContent = q.word;
    } else {
      dom.battleQWord.style.display = 'none';
    }
    dom.battleQPrompt.textContent = q.prompt;
    dom.battleHintToast.style.display = 'none';

    // 隨機打亂選項順序
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    dom.battleOptionsGrid.innerHTML = '';

    shuffled.forEach(optText => {
      const btn = document.createElement('button');
      btn.className = 'battle-opt-btn';
      btn.textContent = optText;

      btn.addEventListener('click', () => {
        handleBattleAnswer(btn, optText, q);
      });

      dom.battleOptionsGrid.appendChild(btn);
    });

    // 自動朗讀題目
    setTimeout(() => {
      window.audioEngine.speak(q.speakText);
    }, 200);
  }

  function handleBattleAnswer(btn, chosenText, q) {
    if (state.adventure.isAnswering) return;
    const stage = state.adventure.activeStage;

    if (chosenText === q.answer) {
      // 答對！發動星光攻擊！
      state.adventure.isAnswering = true;
      state.adventure.combo++;
      btn.classList.add('correct-choice');

      window.audioEngine.playCorrect();
      addStars(1, false);

      // 魔王受擊動畫
      if (dom.bossAvatarWrap) {
        dom.bossAvatarWrap.classList.remove('hit-shake');
        void dom.bossAvatarWrap.offsetWidth;
        dom.bossAvatarWrap.classList.add('hit-shake');
      }

      const praises = [
        '「哇！好強的星光魔法，你答對了！」',
        '「太厲害了吧！完全正確！」',
        '「嗚哇～被你的注音閃電擊中了！」',
        '「好棒喔！耳朵超級靈敏！」'
      ];
      dom.bossDialogue.textContent = praises[state.adventure.qIndex % praises.length];

      state.adventure.qIndex++;
      updateBattleHeaderUI();

      setTimeout(() => {
        renderCurrentStageQuestion();
      }, 950);
    } else {
      // 答錯！扣除一顆愛心但溫柔提示
      btn.classList.add('wrong-choice');
      state.adventure.combo = 0;
      state.adventure.mistakes++;
      if (state.adventure.hearts > 1) {
        state.adventure.hearts--;
      }
      updateBattleHeaderUI();

      window.audioEngine.playWrong();
      dom.battleHintToast.textContent = `💡 老師提示：${q.hint}`;
      dom.battleHintToast.style.display = 'block';
      dom.bossDialogue.textContent = `「差一點點！看下面的老師小提示再選一次吧！」`;

      window.audioEngine.speak(`這題不是 ${chosenText} 喔！提示你：${q.hint}，再試一次！`);
    }
  }

  function handleStageVictory() {
    const stage = state.adventure.activeStage;
    if (!stage) return;

    // 計算星等：0失誤=3星，1~2失誤=2星，3失誤以上=1星
    const earnedStars = state.adventure.mistakes === 0 ? 3 : state.adventure.mistakes <= 2 ? 2 : 1;
    const prevStars = state.adventure.stageStars[String(stage.id)] || 0;
    if (earnedStars > prevStars) {
      state.adventure.stageStars[String(stage.id)] = earnedStars;
      localStorage.setItem('zhuyin_stage_progress', JSON.stringify(state.adventure.stageStars));
    }

    // 過關額外獎勵星星
    addStars(earnedStars * 2, true);
    window.audioEngine.playFanfare();

    // 解鎖特定關卡成就
    if (stage.id === 1) unlockAchievement('stage_1_clear');
    if (stage.id === 5) unlockAchievement('stage_5_clear');
    if (stage.id === 10) unlockAchievement('dragon_slayer');

    dom.bossDialogue.textContent = `「太佩服你了！你成功通過了${stage.name}！」`;

    const starIcons = [1, 2, 3].map(n => (n <= earnedStars ? '⭐' : '☆')).join(' ');
    const nextStage = ZHUYIN_DATA.adventureStages.find(s => s.id === stage.id + 1);

    window.audioEngine.speak(`太棒了！恭喜你通過${stage.name}，獲得 ${earnedStars} 顆過關大星星！`);

    dom.battleQuestionCard.innerHTML = `
      <div style="text-align:center;padding:20px 10px;animation:fadeIn 0.4s ease;">
        <div style="font-size:68px;margin-bottom:8px;">🎉🏆🎉</div>
        <h2 style="font-size:30px;font-weight:900;color:#D9480F;margin-bottom:8px;">
          恭喜破關！${stage.name}挑戰成功！
        </h2>
        <div style="font-size:44px;margin:12px 0;letter-spacing:8px;">
          ${starIcons}
        </div>
        <p style="font-size:18px;font-weight:800;color:#495057;margin-bottom:24px;">
          收服守關精靈【${stage.bossIcon} ${stage.bossName}】，額外獲得 <strong>+${earnedStars * 2} 顆金星星</strong>！
        </p>
        <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
          <button class="secondary-action-btn" id="btn-victory-map">
            🗺️ 返回冒險地圖
          </button>
          <button class="secondary-action-btn" id="btn-victory-retry">
            🔄 再挑戰一次
          </button>
          ${nextStage ? `
            <button class="big-action-btn" id="btn-victory-next">
              <span>➡️</span>
              <span>前進下一關：${nextStage.name}</span>
            </button>
          ` : `
            <button class="big-action-btn" id="btn-victory-allclear">
              <span>👑</span>
              <span>領取全島破關大禮！</span>
            </button>
          `}
        </div>
      </div>
    `;

    const btnMap = document.getElementById('btn-victory-map');
    const btnRetry = document.getElementById('btn-victory-retry');
    const btnNext = document.getElementById('btn-victory-next');
    const btnAllClear = document.getElementById('btn-victory-allclear');

    if (btnMap) {
      btnMap.addEventListener('click', () => {
        window.audioEngine.playPop();
        showAdventureMap();
      });
    }
    if (btnRetry) {
      btnRetry.addEventListener('click', () => {
        window.audioEngine.playPop();
        startStageBattle(stage);
      });
    }
    if (btnNext && nextStage) {
      btnNext.addEventListener('click', () => {
        window.audioEngine.playPop();
        startStageBattle(nextStage);
      });
    }
    if (btnAllClear) {
      btnAllClear.addEventListener('click', () => {
        window.audioEngine.playFanfare();
        if (window.confetti) window.confetti.trigger(120);
        window.audioEngine.speak('太了不起了！你已經把十個關卡全部破關，成為真正的注音大勇者囉！');
        showAdventureMap();
      });
    }
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
        window.audioEngine.speak(`${ex.word}，${ex.word}`);
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
    const symData = ZHUYIN_DATA.symbols.find(s => s.char === question.target);
    const visualWordHint = symData ? `${symData.icon} ${symData.word}` : '仔細聽發音';

    dom.gameArena.innerHTML = `
      <div class="game-status-bar">
        <div class="game-prompt-large">
          <span>🎧 仔細聽老師唸的聲音，戳破正確的注音氣球！（提示詞：<strong>${visualWordHint}</strong>）</span>
          <button class="replay-audio-btn" id="btn-replay-game-audio" title="重聽發音">🔊</button>
        </div>
        <div class="score-badge">第 ${state.game.round} / ${state.game.maxRounds} 關 | 得分：⭐ ${state.game.score}</div>
      </div>
      <div class="balloon-grid" id="balloon-container"></div>
    `;

    const container = document.getElementById('balloon-container');
    const replayBtn = document.getElementById('btn-replay-game-audio');

    const speakTarget = () => {
      const wordPart = symData ? `${symData.word}的，` : '';
      window.audioEngine.speak(`仔細聽喔：${question.target}，${question.target}！${wordPart}${question.target}，${question.target}！請找出正確的氣球！`);
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
