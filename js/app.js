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

    // 🔴 寶可夢訓練家狀態 (Pokémon Trainer State)
    balls: parseInt(localStorage.getItem('zhuyin_balls') || '20', 10),
    partner: localStorage.getItem('zhuyin_partner') || 'pikachu',
    pokedexCaught: JSON.parse(localStorage.getItem('zhuyin_caught_symbols') || '["ㄅ","ㄆ","ㄇ"]'),
    examDifficulty: localStorage.getItem('zhuyin_exam_difficulty') || 'midterm', // 'midterm' (期中考) 或 'final' (期末考)

    // 🗺️ 闖關道館大冒險狀態 (Gym Adventure Campaign)
    adventure: {
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
    ballCount: document.getElementById('global-ball-count'),
    playerRankIcon: document.getElementById('player-rank-icon'),
    playerRankTitle: document.getElementById('player-rank-title'),
    playerLevelBadge: document.getElementById('player-level-badge'),
    pokedexProgressText: document.getElementById('pokedex-progress-text'),
    pokedexBarFill: document.getElementById('pokedex-bar-fill'),
    gymBadgeGrid: document.getElementById('gym-badge-grid'),
    badgeCountText: document.getElementById('badge-count-text'),
    partnerModal: document.getElementById('partner-modal'),
    partnerPickerList: document.getElementById('partner-picker-list'),
    partnerModalCloseBtn: document.getElementById('partner-modal-close-btn'),
    btnConfirmPartner: document.getElementById('btn-confirm-partner'),
    btnDiffMidterm: document.getElementById('btn-diff-midterm'),
    btnDiffFinal: document.getElementById('btn-diff-final'),
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
    updateTrainerHeaderUI();
    updatePokedexProgressUI();
    setupPartnerModal();
    renderGymBadges();
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

    // 語音引擎初始化歡迎詞（寶可夢主題風格）
    setTimeout(() => {
      window.audioEngine.speak('訓練家你好！歡迎來到ㄅㄆㄇ寶可夢大冒險，準備好收服注音寶可夢了嗎？');
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

  function updateTrainerHeaderUI() {
    const partnerObj = ZHUYIN_DATA.starterPokemon.find(p => p.id === state.partner) || ZHUYIN_DATA.starterPokemon[0];
    const trainerLv = Math.floor(state.stars / 3) + 1;
    if (dom.playerRankIcon) dom.playerRankIcon.textContent = partnerObj.icon;
    if (dom.playerRankTitle) dom.playerRankTitle.textContent = `夥伴：${partnerObj.name} Lv.${trainerLv}`;
    if (dom.ballCount) dom.ballCount.textContent = state.balls;
    if (dom.starCount) dom.starCount.textContent = state.stars;
  }

  function setupPartnerModal() {
    if (dom.playerLevelBadge) {
      dom.playerLevelBadge.addEventListener('click', () => {
        window.audioEngine.playPop();
        openPartnerModal();
      });
    }

    if (dom.partnerModalCloseBtn) {
      dom.partnerModalCloseBtn.addEventListener('click', closePartnerModal);
    }

    if (dom.partnerModal) {
      dom.partnerModal.addEventListener('click', (e) => {
        if (e.target === dom.partnerModal) closePartnerModal();
      });
    }

    if (dom.btnConfirmPartner) {
      dom.btnConfirmPartner.addEventListener('click', () => {
        window.audioEngine.playFanfare();
        closePartnerModal();
        const p = ZHUYIN_DATA.starterPokemon.find(item => item.id === state.partner);
        if (p) {
          setMascotSpeech(`⚡ 太棒了！【${p.name}】成為你的出戰夥伴！必殺技是【${p.move}】！`);
          window.audioEngine.speak(`太棒了！就決定是${p.name}了！`);
        }
      });
    }
  }

  function openPartnerModal() {
    if (!dom.partnerModal || !dom.partnerPickerList) return;
    dom.partnerPickerList.innerHTML = '';

    ZHUYIN_DATA.starterPokemon.forEach(p => {
      const card = document.createElement('div');
      card.className = `partner-card ${state.partner === p.id ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="p-icon">${p.icon}</div>
        <div class="p-name">${p.name}</div>
        <div class="p-type">${p.type}</div>
        <div style="font-size:11px;color:#D97706;font-weight:800;margin-top:4px;">絕招：${p.move}</div>
      `;

      card.addEventListener('click', () => {
        window.audioEngine.playPop();
        state.partner = p.id;
        localStorage.setItem('zhuyin_partner', p.id);
        document.querySelectorAll('.partner-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        updateTrainerHeaderUI();
      });

      dom.partnerPickerList.appendChild(card);
    });

    dom.partnerModal.classList.add('active');
    dom.partnerModal.setAttribute('aria-hidden', 'false');
  }

  function closePartnerModal() {
    if (!dom.partnerModal) return;
    dom.partnerModal.classList.remove('active');
    dom.partnerModal.setAttribute('aria-hidden', 'true');
  }

  function updatePokedexProgressUI() {
    const total = ZHUYIN_DATA.symbols.length;
    const caught = state.pokedexCaught.length;
    const pct = Math.min(100, Math.round((caught / total) * 100));

    if (dom.pokedexProgressText) {
      dom.pokedexProgressText.textContent = `${caught} / ${total} 隻 (${pct}%)`;
    }
    if (dom.pokedexBarFill) {
      dom.pokedexBarFill.style.width = `${pct}%`;
    }
  }

  function renderGymBadges() {
    if (!dom.gymBadgeGrid) return;
    dom.gymBadgeGrid.innerHTML = '';

    let obtainedCount = 0;
    ZHUYIN_DATA.gymBadges.forEach(badge => {
      const isCleared = (state.adventure.stageStars[String(badge.stageId)] || 0) > 0;
      if (isCleared) obtainedCount++;

      const slot = document.createElement('div');
      slot.className = `gym-badge-slot ${isCleared ? 'obtained' : ''}`;
      slot.title = `${badge.name} (${badge.gym}・館主：${badge.boss})`;
      slot.innerHTML = `
        <div class="badge-img">${badge.icon}</div>
        <div class="badge-text">${badge.name}</div>
        <div style="font-size:11px;color:${isCleared ? '#F59E0B' : '#94A3B8'};font-weight:800;margin-top:2px;">
          ${isCleared ? '✨ 已獲得' : '🔒 未挑戰'}
        </div>
      `;

      slot.addEventListener('click', () => {
        if (isCleared) {
          window.audioEngine.playPokeSuperEffective();
          setMascotSpeech(`🏅 這是你通過第${badge.stageId}道館獲得的【${badge.name}】！太帥了！`);
          window.audioEngine.speak(`恭喜你！這是通過第${badge.stageId}道館獲得的${badge.name}！`);
        } else {
          window.audioEngine.playWrong();
          setMascotSpeech(`🔒 前往道館闖關地圖，挑戰第${badge.stageId}道館【${badge.gym}】就能獲得這個徽章！`);
          window.audioEngine.speak(`挑戰第${badge.stageId}道館就能獲得這個徽章！加油！`);
        }
      });

      dom.gymBadgeGrid.appendChild(slot);
    });

    if (dom.badgeCountText) {
      dom.badgeCountText.textContent = `已獲得：${obtainedCount} / 10 枚`;
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
          'tab-adventure': '🗺️ 選擇亮起來的島嶼關卡，答對題目就能發射星光魔法收服守護獸！',
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

    // 當切換下拉選單的角色時，立即生效並自動套用該角色的最佳音調與語速
    dom.selectVoicePicker.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'PERSONA::CUTE_GIRL') {
        dom.sliderSpeechRate.value = 0.92;
        dom.sliderSpeechPitch.value = 1.42;
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
        window.audioEngine.speak('嗨～！我是最喜歡草莓的小梅姐姐！我們一起開開心心闖關學注音，耶～！', { voiceName: chosenVoiceName, rate, pitch });
      } else {
        window.audioEngine.speak('小朋友好！我是正音班女老師，我們一起來快樂學注音！', { voiceName: chosenVoiceName, rate, pitch });
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
      const roleName = chosenVoiceName === 'PERSONA::CUTE_GIRL' ? '🍓 小梅姐姐（超萌小女生）' : '🌸 台灣正音班女老師';
      setMascotSpeech(`🎙️ 耶！已經切換成【${roleName}】的聲音！`);

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

    const currentVoice = window.audioEngine.selectedVoiceName || 'PERSONA::TEACHER';

    // 依使用者需求：僅保留「🌸 台灣正音班女老師」與「🍓 小梅姐姐」
    const personas = [
      {
        value: 'PERSONA::TEACHER',
        label: '🌸 台灣正音班女老師（標準第一聲清楚教學）'
      },
      {
        value: 'PERSONA::CUTE_GIRL',
        label: '🍓 小梅姐姐（超萌可愛小女生）'
      }
    ];

    personas.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.value;
      opt.textContent = p.label;
      if (currentVoice === p.value) {
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

    // 🎯 難度切換：期中考難度 (首冊符號辨識) vs 期末考難度 (綜合拼讀段考)
    const updateDiffButtons = () => {
      if (dom.btnDiffMidterm && dom.btnDiffFinal) {
        if (state.examDifficulty === 'final') {
          dom.btnDiffMidterm.classList.remove('active');
          dom.btnDiffFinal.classList.add('active');
        } else {
          dom.btnDiffFinal.classList.remove('active');
          dom.btnDiffMidterm.classList.add('active');
        }
      }
    };

    if (dom.btnDiffMidterm) {
      dom.btnDiffMidterm.addEventListener('click', () => {
        window.audioEngine.playPop();
        state.examDifficulty = 'midterm';
        localStorage.setItem('zhuyin_exam_difficulty', 'midterm');
        updateDiffButtons();
        setMascotSpeech('🐣 已切換至【期中考難度】！專注於首冊 37 注音符號形音與基礎聲調辨識！');
        window.audioEngine.speak('已切換為期中考難度！');
        renderAdventureMap();
      });
    }

    if (dom.btnDiffFinal) {
      dom.btnDiffFinal.addEventListener('click', () => {
        window.audioEngine.playPop();
        state.examDifficulty = 'final';
        localStorage.setItem('zhuyin_exam_difficulty', 'final');
        updateDiffButtons();
        setMascotSpeech('🦅 已切換至【期末考難度】！考查二拼三拼結合韻與完整生活語詞拼讀段考題！');
        window.audioEngine.speak('已切換為期末考難度！');
        renderAdventureMap();
      });
    }

    updateDiffButtons();

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
          setMascotSpeech('🗺️ 恢復循序漸進闖關模式！一關一關挑戰更有成就感！');
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
          window.audioEngine.speak(`老師提示你：${q.hint}`);
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
    updateTrainerHeaderUI();
    renderGymBadges();

    stages.forEach(stage => {
      const unlocked = isStageUnlocked(stage.id);
      const earnedStars = state.adventure.stageStars[String(stage.id)] || 0;
      const isCurrentTarget = unlocked && earnedStars === 0 && stage.id === latestTargetId;
      const badge = (ZHUYIN_DATA.gymBadges || []).find(b => b.stageId === stage.id);

      const card = document.createElement('div');
      card.className = `stage-node-card ${unlocked ? '' : 'locked'} ${isCurrentTarget ? 'current-target' : ''}`;
      if (unlocked && earnedStars > 0) {
        card.style.borderColor = stage.color;
      }

      const starStr = [1, 2, 3].map(n => (n <= earnedStars ? '⭐' : '☆')).join('');

      card.innerHTML = `
        <div>
          <div class="stage-top-row">
            <div style="display:flex;align-items:center;gap:6px;">
              <span class="stage-num-badge" style="background:${unlocked ? stage.color : '#ADB5BD'};">
                道館 ${stage.id}
              </span>
              <span class="battle-diff-badge ${state.examDifficulty === 'final' ? 'final' : 'midterm'}" style="font-size:11px;padding:2px 8px;">
                ${state.examDifficulty === 'final' ? '🦅 期末段考題' : '🐣 期中首冊題'}
              </span>
            </div>
            <span class="stage-stars-row" style="color:${earnedStars > 0 ? '#FCC419' : '#CED4DA'};">
              ${starStr}
            </span>
          </div>

          <div class="stage-main-hero">
            <div class="stage-icon-circle" style="background:${unlocked ? stage.bgGradient : '#E9ECEF'};">
              ${unlocked ? stage.icon : '🔒'}
            </div>
            <div class="stage-title-info">
              <h3>${badge ? badge.gym : stage.name}</h3>
              <div class="stage-sub">${stage.subtitle}</div>
            </div>
          </div>

          <div class="stage-desc-text">${stage.desc}</div>
        </div>

        <div class="stage-footer-row">
          <div class="stage-boss-tag">
            <span>${stage.bossIcon}</span>
            <span>館主：${stage.bossName}</span>
            ${badge ? `<span style="margin-left:6px;font-size:12px;color:${earnedStars > 0 ? '#F59E0B' : '#94A3B8'};font-weight:900;">[${badge.name}]</span>` : ''}
          </div>
          <button class="stage-play-btn">
            ${!unlocked ? '🔒 未解鎖' : earnedStars > 0 ? '🔄 再次挑戰' : '🔴 進入道館挑戰'}
          </button>
        </div>
      `;

      card.addEventListener('click', () => {
        if (!unlocked) {
          window.audioEngine.playWrong();
          window.audioEngine.speak('要先通過前面的道館，才能挑戰這一座道館！也可以開啟自由選關！');
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

    // 依據選擇的段考難度載入題目
    const isFinal = state.examDifficulty === 'final';
    const stageQuestions = (isFinal && stage.finalQuestions && stage.finalQuestions.length > 0)
      ? stage.finalQuestions
      : stage.questions;
    state.adventure.activeQuestions = stageQuestions;

    if (dom.advMapView) dom.advMapView.style.display = 'none';
    if (dom.advBattleView) dom.advBattleView.style.display = 'block';

    const partnerObj = ZHUYIN_DATA.starterPokemon.find(p => p.id === state.partner) || ZHUYIN_DATA.starterPokemon[0];
    const badge = (ZHUYIN_DATA.gymBadges || []).find(b => b.stageId === stage.id);

    // 建立經典寶可夢對戰舞台結構
    if (dom.advBattleView) {
      dom.advBattleView.innerHTML = `
        <div class="battle-top-bar">
          <button class="battle-back-btn" id="btn-battle-back">
            ⬅️ 返回道館地圖
          </button>
          <div class="battle-stage-title" id="battle-stage-title">
            ${stage.icon} ${badge ? badge.gym : stage.name}・${stage.subtitle} <span class="battle-diff-badge ${isFinal ? 'final' : 'midterm'}" style="margin-left:8px;">${isFinal ? '🦅 期末考難度' : '🐣 期中考難度'}</span>
          </div>
          <div class="battle-status-right">
            <div class="battle-combo-badge" id="battle-combo-badge" style="display:none;">
              🔥 連擊 x2
            </div>
            <div class="battle-hearts" id="battle-hearts" title="剩餘愛心">
              ❤️❤️❤️
            </div>
            <div class="battle-progress-pill" id="battle-progress-pill">
              關卡進度 1 / ${stageQuestions.length}
            </div>
          </div>
        </div>

        <!-- 🔴 經典寶可夢對戰舞台 (Pokémon Battle Stadium) -->
        <div class="pokemon-battle-field" id="pokemon-battle-field">
          <!-- 拋球動畫層 -->
          <div class="pokeball-throw-overlay" id="pokeball-overlay">
            <div class="flying-pokeball" id="flying-pokeball"></div>
          </div>

          <div class="pokemon-stadium-platforms">
            <!-- 右上方：對手/野生注音寶可夢 -->
            <div class="poke-opponent-zone">
              <div class="poke-opponent-plate">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <strong style="font-size:16px;color:#1F2937;" id="poke-opp-name">野生的注音精靈</strong>
                  <span style="font-size:12px;background:#E0E7FF;color:#4338CA;padding:2px 8px;border-radius:10px;font-weight:900;" id="poke-opp-level">Lv.3</span>
                </div>
                <div style="font-size:12px;color:#059669;font-weight:800;margin-top:2px;" id="poke-opp-type">⚡ 電氣系</div>
                <div class="poke-hp-wrapper">
                  <div class="poke-hp-label">
                    <span>HP</span>
                    <span id="poke-opp-hp-text">100%</span>
                  </div>
                  <div class="poke-hp-track">
                    <div class="poke-hp-bar" id="poke-opp-hp-fill" style="width:100%;"></div>
                  </div>
                </div>
              </div>
              <div class="poke-opponent-sprite" id="poke-opp-sprite">
                ${stage.questions[0].icon || stage.icon}
              </div>
            </div>

            <!-- 左下方：我方出戰寶可夢 -->
            <div class="poke-player-zone">
              <div class="poke-player-sprite" id="poke-player-sprite" title="點擊換出戰夥伴！">
                ${partnerObj.icon}
              </div>
              <div class="poke-player-plate">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <strong style="font-size:16px;color:#1F2937;" id="poke-player-name">${partnerObj.name}</strong>
                  <span style="font-size:12px;background:#FEF3C7;color:#D97706;padding:2px 8px;border-radius:10px;font-weight:900;" id="poke-player-level">Lv.${Math.floor(state.stars / 3) + 5}</span>
                </div>
                <div style="font-size:12px;color:#D97706;font-weight:800;margin-top:2px;">絕招：${partnerObj.move}</div>
                <div class="poke-hp-wrapper">
                  <div class="poke-hp-label">
                    <span>HP</span>
                    <span id="poke-player-hp-text">100 / 100</span>
                  </div>
                  <div class="poke-hp-track">
                    <div class="poke-hp-bar" id="poke-player-hp-fill" style="width:100%;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 對決題目與操作指令卡 -->
        <div class="battle-question-card" id="battle-question-card">
          <div style="background:#FFFFFF;border:3px solid #374151;border-radius:16px;padding:16px 20px;margin-bottom:16px;box-shadow:0 4px 0 #1F2937;">
            <div style="font-size:14px;color:#DC2626;font-weight:900;margin-bottom:4px;" id="poke-battle-prompt-tag">🔴 道館考核題目：</div>
            <h3 class="question-prompt-text" id="battle-q-prompt" style="font-size:20px;margin:0;"></h3>
          </div>

          <!-- 4 個經典寶可夢對戰指令 -->
          <div class="poke-battle-actions">
            <button class="poke-cmd-btn catch-btn" id="btn-poke-catch">
              <span>🔴</span> 投擲精靈球收服
            </button>
            <button class="poke-cmd-btn listen-btn" id="btn-poke-listen">
              <span>🔊</span> 聽老師發音
            </button>
            <button class="poke-cmd-btn hint-btn" id="btn-poke-hint">
              <span>💡</span> 圖鑑秘笈提示
            </button>
            <button class="poke-cmd-btn run-btn" id="btn-poke-run">
              <span>🏃</span> 撤退回地圖
            </button>
          </div>

          <div class="battle-hint-toast" id="battle-hint-toast" style="display:none;margin-top:14px;"></div>

          <div style="font-size:15px;font-weight:900;color:#374151;margin:16px 0 8px 0;">
            ⚡ 選擇你的收服攻擊招式：
          </div>
          <!-- 4個大選項按鈕 -->
          <div class="battle-options-grid" id="battle-options-grid"></div>
        </div>
      `;

      // 重新綁定事件
      const btnBack = document.getElementById('btn-battle-back');
      if (btnBack) {
        btnBack.addEventListener('click', () => {
          window.audioEngine.playPop();
          showAdventureMap();
        });
      }

      const btnRun = document.getElementById('btn-poke-run');
      if (btnRun) {
        btnRun.addEventListener('click', () => {
          window.audioEngine.playPop();
          showAdventureMap();
        });
      }

      const btnListen = document.getElementById('btn-poke-listen');
      if (btnListen) {
        btnListen.addEventListener('click', () => {
          window.audioEngine.playPop();
          const q = (state.adventure.activeQuestions || stage.questions)[state.adventure.qIndex];
          if (q) window.audioEngine.speak(q.speakText);
        });
      }

      const btnHint = document.getElementById('btn-poke-hint');
      if (btnHint) {
        btnHint.addEventListener('click', () => {
          window.audioEngine.playPop();
          const q = (state.adventure.activeQuestions || stage.questions)[state.adventure.qIndex];
          const toast = document.getElementById('battle-hint-toast');
          if (q && toast) {
            toast.textContent = `💡 大木博士提示：${q.hint}`;
            toast.style.display = 'block';
            window.audioEngine.speak(`老師提示你：${q.hint}`);
          }
        });
      }

      const playerSprite = document.getElementById('poke-player-sprite');
      if (playerSprite) {
        playerSprite.addEventListener('click', () => {
          window.audioEngine.playPop();
          openPartnerModal();
        });
      }

      const btnCatch = document.getElementById('btn-poke-catch');
      if (btnCatch) {
        btnCatch.addEventListener('click', () => {
          window.audioEngine.playPokeThrow();
          const q = (state.adventure.activeQuestions || stage.questions)[state.adventure.qIndex];
          if (q) window.audioEngine.speak('準備投擲寶貝球！請仔細聽老師的發音！');
        });
      }
    }

    updateBattleHeaderUI();
    renderCurrentStageQuestion();
  }

  function updateBattleHeaderUI() {
    const stage = state.adventure.activeStage;
    const questions = state.adventure.activeQuestions || (stage ? stage.questions : []);
    if (!stage || !questions) return;

    const totalQ = questions.length;
    const currentQ = Math.min(state.adventure.qIndex + 1, totalQ);
    const pill = document.getElementById('battle-progress-pill');
    if (pill) pill.textContent = `道館考核 ${currentQ} / ${totalQ}`;

    const heartsEl = document.getElementById('battle-hearts');
    if (heartsEl) {
      const heartsStr = [1, 2, 3].map(n => (n <= state.adventure.hearts ? '❤️' : '🖤')).join('');
      heartsEl.textContent = heartsStr;
    }

    const comboEl = document.getElementById('battle-combo-badge');
    if (comboEl) {
      if (state.adventure.combo >= 2) {
        comboEl.style.display = 'inline-block';
        comboEl.textContent = `🔥 連擊 x${state.adventure.combo}`;
      } else {
        comboEl.style.display = 'none';
      }
    }

    // 守關者血量比例
    const remainingRatio = Math.max(0, Math.round(((totalQ - state.adventure.qIndex) / totalQ) * 100));
    const oppHpText = document.getElementById('poke-opp-hp-text');
    const oppHpFill = document.getElementById('poke-opp-hp-fill');
    if (oppHpText) oppHpText.textContent = `${remainingRatio}%`;
    if (oppHpFill) {
      oppHpFill.style.width = `${remainingRatio}%`;
      oppHpFill.className = `poke-hp-bar ${remainingRatio < 30 ? 'low' : remainingRatio < 60 ? 'mid' : ''}`;
    }

    // 玩家夥伴血量比例
    const playerHpFill = document.getElementById('poke-player-hp-fill');
    const playerHpText = document.getElementById('poke-player-hp-text');
    const playerHpPct = Math.round((state.adventure.hearts / 3) * 100);
    if (playerHpFill) {
      playerHpFill.style.width = `${playerHpPct}%`;
      playerHpFill.className = `poke-hp-bar ${playerHpPct < 35 ? 'low' : playerHpPct < 70 ? 'mid' : ''}`;
    }
    if (playerHpText) playerHpText.textContent = `${playerHpPct} / 100`;
  }

  function renderCurrentStageQuestion() {
    const stage = state.adventure.activeStage;
    const questions = state.adventure.activeQuestions || (stage ? stage.questions : []);
    if (!stage || !questions) return;

    if (state.adventure.qIndex >= questions.length) {
      handleStageVictory();
      return;
    }

    state.adventure.isAnswering = false;
    const q = questions[state.adventure.qIndex];

    updateBattleHeaderUI();

    // 查詢目標注音的寶可夢資訊
    const sym = ZHUYIN_DATA.symbols.find(s => s.char === q.answer);
    const oppSprite = document.getElementById('poke-opp-sprite');
    const oppName = document.getElementById('poke-opp-name');
    const oppType = document.getElementById('poke-opp-type');
    const oppLevel = document.getElementById('poke-opp-level');
    const promptText = document.getElementById('battle-q-prompt');
    const toast = document.getElementById('battle-hint-toast');

    if (oppSprite) oppSprite.textContent = q.icon || (sym ? sym.icon : stage.icon);
    // 嚴格防止洩漏答案：答題前對手名稱絕不顯示注音符號！
    if (oppName) oppName.textContent = '野生的【神秘注音精靈】';
    if (oppType) oppType.textContent = sym ? `${sym.pokeTypeIcon} ${sym.pokeType}` : `🌟 屬性：綜合考核`;
    if (oppLevel) oppLevel.textContent = `Lv.${stage.id * 3 + state.adventure.qIndex + 1}`;
    // 確保題目文字絕不出現注音答案
    const safePrompt = (q.prompt || '').replace(/[ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ]/g, '❓');
    if (promptText) promptText.textContent = safePrompt;
    if (toast) toast.style.display = 'none';

    // 隨機打亂選項順序
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    const optionsGrid = document.getElementById('battle-options-grid');
    if (optionsGrid) {
      optionsGrid.innerHTML = '';
      shuffled.forEach(optText => {
        const btn = document.createElement('button');
        btn.className = 'battle-opt-btn';
        btn.textContent = optText;

        btn.addEventListener('click', () => {
          handleBattleAnswer(btn, optText, q);
        });

        optionsGrid.appendChild(btn);
      });
    }

    // 自動朗讀題目
    setTimeout(() => {
      window.audioEngine.speak(q.speakText);
    }, 250);
  }

  function handleBattleAnswer(btn, chosenText, q) {
    if (state.adventure.isAnswering) return;
    const stage = state.adventure.activeStage;

    if (chosenText === q.answer) {
      // 答對！發動效果絕佳攻擊並丟出寶貝球收服！
      state.adventure.isAnswering = true;
      state.adventure.combo++;
      btn.classList.add('correct-choice');

      // 招式擊中與拋球音效
      window.audioEngine.playPokeSuperEffective();
      window.audioEngine.playPokeThrow();

      const flyingBall = document.getElementById('flying-pokeball');
      const oppSprite = document.getElementById('poke-opp-sprite');

      // 命中抖動
      if (oppSprite) {
        oppSprite.style.animation = 'bossShake 0.45s ease';
      }

      // 拋物線丟出寶貝球
      if (flyingBall) {
        flyingBall.className = 'flying-pokeball throw-arc';
      }

      // 0.75秒後落地搖晃
      setTimeout(() => {
        if (flyingBall) {
          flyingBall.className = 'flying-pokeball wobble';
        }
        window.audioEngine.playPokeShake();

        setTimeout(() => {
          window.audioEngine.playPokeShake();
        }, 500);

        setTimeout(() => {
          window.audioEngine.playPokeShake();
        }, 1000);

        // 1.6秒後成功收服！
        setTimeout(() => {
          window.audioEngine.playPokeCaught();
          if (window.confetti) window.confetti.trigger(40);

          // 收服至注音圖鑑
          if (!state.pokedexCaught.includes(q.answer) && ZHUYIN_DATA.symbols.some(s => s.char === q.answer)) {
            state.pokedexCaught.push(q.answer);
            localStorage.setItem('zhuyin_caught_symbols', JSON.stringify(state.pokedexCaught));
            updatePokedexProgressUI();
            renderGallery();
          }

          // 獎勵星星與寶貝球
          addStars(1, false);
          state.balls = Math.min(99, state.balls + 1);
          localStorage.setItem('zhuyin_balls', state.balls.toString());
          updateTrainerHeaderUI();

          const oppNameEl = document.getElementById('poke-opp-name');
          if (oppNameEl) oppNameEl.textContent = sym ? `收服成功：【${sym.char}】${sym.pokeName}` : `收服成功！`;
          setMascotSpeech(`✨ 叮！太棒了！成功收服【${q.answer}】！圖鑑已登錄！`);

          state.adventure.qIndex++;
          updateBattleHeaderUI();

          setTimeout(() => {
            if (flyingBall) flyingBall.className = 'flying-pokeball';
            renderCurrentStageQuestion();
          }, 1100);
        }, 1600);
      }, 750);

    } else {
      // 答錯！精靈掙脫並反擊！
      btn.classList.add('wrong-choice');
      state.adventure.combo = 0;
      state.adventure.mistakes++;
      if (state.adventure.hearts > 1) {
        state.adventure.hearts--;
      }
      updateBattleHeaderUI();

      window.audioEngine.playWrong();
      const toast = document.getElementById('battle-hint-toast');
      if (toast) {
        toast.textContent = `💡 大木博士秘笈：${q.hint}`;
        toast.style.display = 'block';
      }

      setMascotSpeech(`「哎呀！野生精靈掙脫了！再聽一次老師的小提示吧！」`);
      window.audioEngine.speak('這題不對，別灰心，看老師提示再試一次！');
    }
  }

  function handleStageVictory() {
    const stage = state.adventure.activeStage;
    if (!stage) return;

    const earnedStars = state.adventure.mistakes === 0 ? 3 : state.adventure.mistakes <= 2 ? 2 : 1;
    const prevStars = state.adventure.stageStars[String(stage.id)] || 0;
    if (earnedStars > prevStars) {
      state.adventure.stageStars[String(stage.id)] = earnedStars;
      localStorage.setItem('zhuyin_stage_progress', JSON.stringify(state.adventure.stageStars));
    }

    // 獎勵星星與大量寶貝球
    addStars(earnedStars * 2, true);
    state.balls = Math.min(99, state.balls + earnedStars * 3);
    localStorage.setItem('zhuyin_balls', state.balls.toString());
    updateTrainerHeaderUI();

    const badge = (ZHUYIN_DATA.gymBadges || []).find(b => b.stageId === stage.id);
    window.audioEngine.playBadgeGet();

    renderGymBadges();

    // 解鎖特定關卡成就
    if (stage.id === 1) unlockAchievement('stage_1_clear');
    if (stage.id === 5) unlockAchievement('stage_5_clear');
    if (stage.id === 10) unlockAchievement('dragon_slayer');

    const starIcons = [1, 2, 3].map(n => (n <= earnedStars ? '⭐' : '☆')).join(' ');
    const nextStage = ZHUYIN_DATA.adventureStages.find(s => s.id === stage.id + 1);

    window.audioEngine.speak(`太棒了！恭喜你擊敗${stage.bossName}，獲得${badge ? badge.name : '榮譽徽章'}！`);

    const qCard = document.getElementById('battle-question-card');
    if (qCard) {
      qCard.innerHTML = `
        <div style="text-align:center;padding:24px 12px;animation:fadeIn 0.4s ease;">
          <div style="font-size:68px;margin-bottom:8px;">${badge ? badge.icon : '🏅'}</div>
          <h2 style="font-size:28px;font-weight:900;color:#DC2626;margin-bottom:6px;">
            道館挑戰大成功！榮獲【${badge ? badge.name : '榮譽徽章'}】！
          </h2>
          <div style="font-size:40px;margin:10px 0;letter-spacing:8px;">
            ${starIcons}
          </div>
          <p style="font-size:17px;font-weight:800;color:#475569;margin-bottom:20px;">
            擊敗道館館主【${stage.bossIcon} ${stage.bossName}】，獲得 <strong>+${earnedStars * 2} 顆金星星</strong> 與 <strong>+${earnedStars * 3} 顆寶貝球</strong>！
          </p>
          <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;">
            <button class="secondary-action-btn" id="btn-victory-map">
              🗺️ 返回道館地圖
            </button>
            <button class="secondary-action-btn" id="btn-victory-retry">
              🔄 再次挑戰
            </button>
            ${nextStage ? `
              <button class="big-action-btn" id="btn-victory-next">
                <span>➡️</span>
                <span>前進下一道館：${nextStage.name}</span>
              </button>
            ` : `
              <button class="big-action-btn" id="btn-victory-allclear">
                <span>👑</span>
                <span>成為注音寶可夢大師！</span>
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
          if (window.confetti) window.confetti.trigger(150);
          window.audioEngine.speak('太了不起了！你已經收服了全部十座道館，榮獲注音寶可夢大師稱號！');
          showAdventureMap();
        });
      }
    }
  }

  // ==========================================
  // MODULE 1: 🔴 37注音寶可夢大圖鑑 (Pokédex)
  // ==========================================
  function renderGallery() {
    if (!dom.symbolGrid) return;
    dom.symbolGrid.innerHTML = '';

    const filtered = ZHUYIN_DATA.symbols.filter(s => {
      if (state.currentFilter === 'all') return true;
      return s.type === state.currentFilter;
    });

    filtered.forEach((sym) => {
      const isCaught = state.pokedexCaught.includes(sym.char);

      const card = document.createElement('div');
      card.className = `symbol-card ${isCaught ? 'caught' : 'uncaught'}`;
      if (isCaught) {
        card.style.borderColor = sym.color;
      }

      card.innerHTML = `
        <div class="poke-badge">${sym.dexNo || 'No.???'}</div>
        <div class="poke-caught-ball">${isCaught ? '🔴' : '⚪'}</div>
        <div class="card-zhuyin-char" style="color:${isCaught ? sym.color : '#94A3B8'};">
          ${sym.char}
        </div>
        <div class="card-icon">${sym.icon}</div>
        <div class="card-word" style="font-weight:900;">
          ${isCaught ? sym.pokeName : '??? (未收服)'}
        </div>
        <div class="card-pinyin">
          ${isCaught ? `${sym.pokeTypeIcon || '⚡'} ${sym.pokeType || '一般系'}` : '前往道館收服'}
        </div>
      `;

      card.addEventListener('click', () => {
        window.audioEngine.playPop();
        if (isCaught) {
          openSymbolModal(ZHUYIN_DATA.symbols.indexOf(sym));
        } else {
          window.audioEngine.speak('這是神秘注音寶可夢，快前往道館挑戰收服牠吧！');
          setMascotSpeech(`🔒 這是【${sym.char}】神秘注音寶可夢，快去道館挑戰收服牠點亮圖鑑！`);
        }
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

    updatePokedexProgressUI();
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
    dom.modalCategory.textContent = `${sym.dexNo || 'No.???'} ${sym.pokeName || ''}・${sym.pokeTypeIcon || '⚡'} ${sym.pokeType || sym.categoryName}`;
    dom.modalStrokesInfo.textContent = `筆劃：${sym.strokes} 畫`;
    dom.modalTitle.textContent = `${sym.char} (${sym.pinyin})・${sym.pokeName || ''}`;
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
      window.audioEngine.speak(`仔細聽：${question.target}，${question.target}！${wordPart}${question.target}，${question.target}！請找出正確的氣球！`);
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
          window.audioEngine.speak('這個不對，再聽一次！');
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
            renderGameVictory('哇！翻牌記憶大成功！好棒！');
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
          <span>🎯 聽聽看：【${q.word}】的「${q.targetPart}」是第幾聲呢？</span>
          <button class="replay-audio-btn" id="btn-replay-tone-quiz" title="重聽發音">🔊</button>
        </div>
        <div class="score-badge">第 ${state.game.round} / ${state.game.maxRounds} 關 | 得分：⭐ ${state.game.score}</div>
      </div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin-top:20px;" id="tone-options-row"></div>
    `;

    const replayBtn = document.getElementById('btn-replay-tone-quiz');
    const optionsRow = document.getElementById('tone-options-row');

    const speakPrompt = () => {
      window.audioEngine.speak(`聽聽看！${q.word}的${q.targetPart}，請問是第幾聲呢？`);
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
          window.audioEngine.speak('不對，再想想看！');
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
        <p style="font-size:20px;font-weight:800;color:#2B2D42;margin-bottom:24px;">哇！太厲害了！你全部挑戰成功，獲得好多閃亮亮星星！⭐</p>
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
        window.audioEngine.speak('要先用彩色筆把注音描好，才可以蓋好棒章！');
        return;
      }
      unlockAchievement('calligraphy_star');
      window.audioEngine.playCorrect();
      addStars(1, true);
      setMascotSpeech(`⭐ 哇！寫得好漂亮！送你一顆亮晶晶的星星！`);

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
