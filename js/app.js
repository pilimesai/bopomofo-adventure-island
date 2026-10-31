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
    // 🎒 冒險家道具背包 (Trainer Bag)
    bag: JSON.parse(localStorage.getItem('zhuyin_trainer_bag') || 'null') || {
      greatBall: 3,
      masterBall: 1,
      potion: 3,
      loupe: 3
    },

    // ⚡ 夥伴經驗值與神奇等級 (Partner EXP & Evolution)
    partnerData: JSON.parse(localStorage.getItem('zhuyin_partner_data') || 'null') || {
      level: 1,
      exp: 0,
      maxExp: 100,
      stage: 0
    },
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

  /**
   * 🌟 取得當前夥伴的最新進化型態與能力
   */
  function getPokemonAvatarHtml(partner, sizeClass = '') {
    if (partner.image) {
      return `<img src="${partner.image}" alt="${partner.name}" class="pokemon-avatar-img ${sizeClass}" />`;
    }
    return partner.icon;
  }

  function getCurrentPartnerInfo() {
    const base = ZHUYIN_DATA.starterPokemon.find(p => p.id === state.partner) || ZHUYIN_DATA.starterPokemon[0];
    const level = state.partnerData.level || 1;
    const stageIdx = level >= 7 ? 2 : level >= 3 ? 1 : 0;
    const evo = (base.evolutions && base.evolutions[stageIdx]) ? base.evolutions[stageIdx] : {
      name: base.name,
      icon: base.icon,
      image: base.image,
      move: base.move,
      moveFx: 'electric'
    };
    return {
      id: base.id,
      baseName: base.name,
      name: evo.name,
      icon: evo.icon,
      image: evo.image || base.image,
      move: evo.move,
      moveFx: evo.moveFx || 'electric',
      type: base.type,
      level: level,
      exp: state.partnerData.exp || 0,
      maxExp: state.partnerData.maxExp || 100,
      stageIdx: stageIdx
    };
  }

  /**
   * ⚡ 增加夥伴經驗值並處理升級與神奇進化
   */
  function addPartnerExp(amount) {
    state.partnerData.exp += amount;
    let leveledUp = false;
    let evolved = false;
    const oldPartner = getCurrentPartnerInfo();

    while (state.partnerData.exp >= state.partnerData.maxExp) {
      state.partnerData.exp -= state.partnerData.maxExp;
      state.partnerData.level++;
      state.partnerData.maxExp = Math.round(state.partnerData.maxExp * 1.25);
      leveledUp = true;
    }

    const newPartner = getCurrentPartnerInfo();
    if (newPartner.stageIdx > (state.partnerData.stage || 0)) {
      state.partnerData.stage = newPartner.stageIdx;
      evolved = true;
    }

    localStorage.setItem('zhuyin_partner_data', JSON.stringify(state.partnerData));

    // 更新對戰界面夥伴血條/經驗值
    const expFill = document.getElementById('poke-player-exp-fill');
    const expText = document.getElementById('poke-player-exp-text');
    const lvEl = document.getElementById('poke-player-level');
    const nameEl = document.getElementById('poke-player-name');
    const spriteEl = document.getElementById('poke-player-sprite');
    const moveEl = document.getElementById('poke-player-move');

    if (expFill) {
      const pct = Math.min(100, Math.round((state.partnerData.exp / state.partnerData.maxExp) * 100));
      expFill.style.width = `${pct}%`;
    }
    if (expText) expText.textContent = `${state.partnerData.exp} / ${state.partnerData.maxExp}`;
    if (lvEl) lvEl.textContent = `Lv.${state.partnerData.level}`;
    if (nameEl) nameEl.textContent = newPartner.name;
    if (spriteEl) spriteEl.innerHTML = getPokemonAvatarHtml(newPartner);
    if (moveEl) moveEl.textContent = `絕招：${newPartner.move}`;

    updateTrainerHeaderUI();

    if (evolved) {
      showEvolutionModal(oldPartner, newPartner);
    } else if (leveledUp) {
      window.audioEngine.playLevelUp();
      setMascotSpeech(`🎉 太棒了！【${newPartner.name}】等級提升到 Lv.${state.partnerData.level} 了！`);
    }
  }

  /**
   * 🌟 夥伴神奇進化全螢幕慶祝彈窗
   */
  function showEvolutionModal(oldPartner, newPartner) {
    window.audioEngine.playFanfare();
    if (window.confetti) window.confetti.trigger(120);

    const modal = document.createElement('div');
    modal.className = 'evolution-modal-overlay';
    modal.innerHTML = `
      <div class="evolution-card">
        <h3 style="font-size:22px;color:#FDE047;margin:0 0 8px 0;font-weight:900;">
          🌟 什麼！？夥伴的樣子...！？
        </h3>
        <div class="evolution-sprite-stage" id="evolution-sprite">
          ${getPokemonAvatarHtml(newPartner)}
        </div>
        <h2 style="font-size:28px;color:#FFFFFF;margin:8px 0 12px 0;font-weight:900;">
          恭喜！你的夥伴成功進化成【${newPartner.name}】了！
        </h2>
        <p style="font-size:16px;color:#FDE047;font-weight:800;margin-bottom:16px;">
          🔥 新絕招解鎖：【${newPartner.move}】！戰鬥威力大幅提升！
        </p>
        <button class="big-action-btn" id="btn-close-evolution" style="margin:0 auto;">
          <span>💖</span>
          <span>太棒了！一起繼續探險！</span>
        </button>
      </div>
    `;
    document.body.appendChild(modal);

    const btnClose = modal.querySelector('#btn-close-evolution');
    if (btnClose) {
      btnClose.addEventListener('click', () => {
        window.audioEngine.playPop();
        modal.remove();
        updateTrainerHeaderUI();
      });
    }
  }

  /**
   * ⚡ 執行玩家夥伴大招突擊動畫與戰鬥飄字
   */
  function executePlayerAttack(partnerObj, q, callback) {
    const fxContainer = document.getElementById('attack-fx-container');
    const playerSprite = document.getElementById('poke-player-sprite');
    const oppSprite = document.getElementById('poke-opp-sprite');

    if (playerSprite) {
      playerSprite.classList.add('player-attack-dash');
      setTimeout(() => playerSprite.classList.remove('player-attack-dash'), 550);
    }

    if (fxContainer) {
      fxContainer.innerHTML = '';
      const banner = document.createElement('div');
      banner.className = 'move-banner';
      banner.textContent = `⚡ ${partnerObj.name}「${partnerObj.move}」！`;
      fxContainer.appendChild(banner);

      const fxType = partnerObj.moveFx || 'electric';
      const fxClass = fxType === 'fire' ? 'fx-fire-ball' :
                      fxType === 'water' ? 'fx-water-wave' :
                      fxType === 'grass' ? 'fx-razor-leaf' :
                      fxType === 'star' ? 'fx-swift-star' : 'fx-electric-bolt';
      const iconChar = fxType === 'fire' ? '🔥' :
                       fxType === 'water' ? '🌊' :
                       fxType === 'grass' ? '🍃' :
                       fxType === 'star' ? '⭐' : '⚡';

      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const fxEl = document.createElement('div');
          fxEl.className = fxClass;
          fxEl.textContent = iconChar;
          fxEl.style.animationDelay = `${i * 0.08}s`;
          fxContainer.appendChild(fxEl);
        }, i * 90);
      }
    }

    window.audioEngine.playPokeAttack(partnerObj.moveFx);

    setTimeout(() => {
      if (oppSprite) {
        oppSprite.style.animation = 'bossShake 0.45s ease';
        const damagePop = document.createElement('div');
        const isCrit = state.adventure.combo >= 2 || Math.random() < 0.35;
        damagePop.className = `combat-damage-pop ${isCrit ? 'crit' : ''}`;
        damagePop.textContent = isCrit ? '🔥 爆擊 CRITICAL! -150 HP!' : '💥 效果絕佳！ -100 HP!';
        oppSprite.parentElement.appendChild(damagePop);
        setTimeout(() => damagePop.remove(), 1250);
      }
      window.audioEngine.playPokeSuperEffective();

      addPartnerExp(25);

      if (callback) callback();
    }, 500);
  }

  function updateTrainerHeaderUI() {
    const partnerObj = getCurrentPartnerInfo();
    if (dom.playerRankIcon) {
      if (partnerObj.image) {
        dom.playerRankIcon.innerHTML = `<img src="${partnerObj.image}" alt="${partnerObj.name}" class="badge-pokemon-icon-img" />`;
      } else {
        dom.playerRankIcon.textContent = partnerObj.icon;
      }
    }
    if (dom.playerRankTitle) dom.playerRankTitle.textContent = `夥伴：${partnerObj.name} Lv.${partnerObj.level}`;
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

    const currentLevel = state.partnerData.level || 1;
    const stageIdx = currentLevel >= 7 ? 2 : currentLevel >= 3 ? 1 : 0;

    ZHUYIN_DATA.starterPokemon.forEach(p => {
      const evo = (p.evolutions && p.evolutions[stageIdx]) ? p.evolutions[stageIdx] : p;
      const card = document.createElement('div');
      card.className = `partner-card ${state.partner === p.id ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="p-icon">${getPokemonAvatarHtml(evo)}</div>
        <div class="p-name">${evo.name}</div>
        <div class="p-type">${p.type}</div>
        <div style="font-size:11px;color:#D97706;font-weight:800;margin-top:4px;">絕招：${evo.move}</div>
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
      dom.sliderSpeechPitch.value = window.audioEngine.speechPitch;
      updateSliderLabels(window.audioEngine.speechRate, window.audioEngine.speechPitch);

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
        setMascotSpeech('🏛️ 已切換至【小一期中段考真題】！100% 原卷完整收錄！');
        window.audioEngine.speak('已切換為小一段考真題！');
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
                ${state.examDifficulty === 'final' ? '🦅 期末段考題' : '🏛️ 小一段考 1:1 原卷'}
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

    // 依據選擇的段考難度與考古題大題庫池進行「動態隨機抽題」
    const isFinal = state.examDifficulty === 'final';
    const rawPool = (isFinal && stage.finalQuestions && stage.finalQuestions.length > 0)
      ? stage.finalQuestions
      : (stage.questions || []);

    // 隨機洗牌演算法（Fisher-Yates Shuffle），每次進入道館隨機抽取 5~6 題
    const shuffledPool = [...rawPool].sort(() => Math.random() - 0.5);
    const targetCount = stage.id === 10 ? Math.min(4, shuffledPool.length) : Math.min(6, shuffledPool.length);
    const selectedQuestions = shuffledPool.slice(0, targetCount);

    state.adventure.activeQuestions = selectedQuestions;

    if (dom.advMapView) dom.advMapView.style.display = 'none';
    if (dom.advBattleView) dom.advBattleView.style.display = 'block';

    const partnerObj = getCurrentPartnerInfo();
    const badge = (ZHUYIN_DATA.gymBadges || []).find(b => b.stageId === stage.id);

    // 建立經典寶可夢對戰舞台結構
    if (dom.advBattleView) {
      dom.advBattleView.innerHTML = `
        <div class="battle-top-bar">
          <button class="battle-back-btn" id="btn-battle-back">
            ⬅️ 返回道館地圖
          </button>
          <div class="battle-stage-title" id="battle-stage-title">
            ${stage.icon} ${badge ? badge.gym : stage.name}・${stage.subtitle} <span class="battle-diff-badge ${isFinal ? 'final' : 'midterm'}" style="margin-left:8px;">${isFinal ? '🦅 期末考難度' : '🏛️ 小一段考真題'}</span>
          </div>
          <div class="battle-status-right">
            <div class="battle-combo-badge" id="battle-combo-badge" style="display:none;">
              🔥 連擊 x2
            </div>
            <div class="battle-hearts" id="battle-hearts" title="剩餘愛心">
              ❤️❤️❤️
            </div>
            <div class="battle-progress-pill" id="battle-progress-pill">
              道館考核 1 / ${selectedQuestions.length}
            </div>
          </div>
        </div>

        <!-- 🔴 經典寶可夢對戰舞台 (Pokémon Battle Stadium) -->
        <div class="pokemon-battle-field" id="pokemon-battle-field">
          <!-- 招式特效層 -->
          <div class="attack-fx-container" id="attack-fx-container"></div>
          <!-- 拋球動畫層 -->
          <div class="pokeball-throw-overlay" id="pokeball-overlay">
            <div class="flying-pokeball" id="flying-pokeball"></div>
          </div>

          <div class="pokemon-stadium-platforms">
            <!-- 右上方：對手/野生注音寶可夢 -->
            <div class="poke-opponent-zone" id="poke-opp-zone">
              <div class="poke-opponent-plate">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <strong style="font-size:16px;color:#1F2937;" id="poke-opp-name">野生的【神秘注音精靈】</strong>
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
                ${getPokemonAvatarHtml(partnerObj)}
              </div>
              <div class="poke-player-plate">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <strong style="font-size:16px;color:#1F2937;" id="poke-player-name">${partnerObj.name}</strong>
                  <span style="font-size:12px;background:#FEF3C7;color:#D97706;padding:2px 8px;border-radius:10px;font-weight:900;" id="poke-player-level">Lv.${partnerObj.level}</span>
                </div>
                <div style="font-size:12px;color:#D97706;font-weight:800;margin-top:2px;" id="poke-player-move">絕招：${partnerObj.move}</div>
                <div class="poke-hp-wrapper">
                  <div class="poke-hp-label">
                    <span>HP</span>
                    <span id="poke-player-hp-text">100 / 100</span>
                  </div>
                  <div class="poke-hp-track">
                    <div class="poke-hp-bar" id="poke-player-hp-fill" style="width:100%;"></div>
                  </div>
                </div>
                <div class="poke-exp-wrapper">
                  <div class="poke-exp-label">
                    <span>EXP</span>
                    <span id="poke-player-exp-text">${partnerObj.exp} / ${partnerObj.maxExp}</span>
                  </div>
                  <div class="poke-exp-track">
                    <div class="poke-exp-bar" id="poke-player-exp-fill" style="width:${Math.round((partnerObj.exp / partnerObj.maxExp) * 100)}%;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 對決題目與操作指令卡 -->
        <div class="battle-question-card" id="battle-question-card">
          <div style="background:#FFFFFF;border:3px solid #374151;border-radius:16px;padding:16px 20px;margin-bottom:14px;box-shadow:0 4px 0 #1F2937;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
              <div style="font-size:14px;color:#DC2626;font-weight:900;" id="poke-battle-prompt-tag">🔴 道館考核題目：</div>
              <span id="poke-shiny-badge" class="shiny-tag-badge" style="display:none;">✨ 稀有閃光神獸 ✨</span>
            </div>
            <!-- 📖 閱讀測驗故事小天地 -->
            <div id="battle-reading-card" class="reading-passage-card" style="display:none;">
              <div class="reading-passage-badge">📖 兒歌短文：</div>
              <div class="reading-passage-text" id="reading-passage-text"></div>
            </div>
            <h3 class="question-prompt-text" id="battle-q-prompt" style="font-size:20px;margin:0;"></h3>
          </div>

          <!-- 3 個清晰考核指令 (已全面移除提示與作弊道具) -->
          <div class="poke-battle-actions">
            
            <button class="poke-cmd-btn listen-btn" id="btn-poke-listen">
              <span>🔊</span> 聽老師清晰朗讀題目
            </button>
            <button class="poke-cmd-btn run-btn" id="btn-poke-run">
              <span>🏃</span> 撤退回地圖
            </button>
          </div>

          <div style="font-size:15px;font-weight:900;color:#374151;margin:14px 0 8px 0;">
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
      const playerSprite = document.getElementById('poke-player-sprite');
      if (playerSprite) {
        playerSprite.addEventListener('click', () => {
          window.audioEngine.playPop();
          openPartnerModal();
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

    // 22% 機率突發稀有閃光神獸
    const isShiny = Math.random() < 0.22;
    state.adventure.isCurrentShiny = isShiny;

    const oppZone = document.getElementById('poke-opp-zone');
    const oppSprite = document.getElementById('poke-opp-sprite');
    const shinyBadge = document.getElementById('poke-shiny-badge');

    // 確保每道新題目動物精靈恢復正常立體狀態
    if (oppSprite) {
      oppSprite.classList.remove('animal-sucked-in');
      oppSprite.style.opacity = '1';
      oppSprite.style.transform = '';
      oppSprite.style.filter = '';
    }

    const flyingBall = document.getElementById('flying-pokeball');
    if (flyingBall) flyingBall.className = 'flying-pokeball';

    const oldBeam = document.getElementById('capture-beam-cone');
    if (oldBeam) oldBeam.remove();

    if (oppZone) {
      if (isShiny) {
        oppZone.classList.add('is-shiny-pokemon');
      } else {
        oppZone.classList.remove('is-shiny-pokemon');
      }
    }
    if (shinyBadge) {
      shinyBadge.style.display = isShiny ? 'inline-block' : 'none';
    }

    // 查詢目標注音的寶可夢資訊
    const sym = ZHUYIN_DATA.symbols.find(s => s.char === q.answer);
    const oppName = document.getElementById('poke-opp-name');
    const oppType = document.getElementById('poke-opp-type');
    const oppLevel = document.getElementById('poke-opp-level');
    const promptText = document.getElementById('battle-q-prompt');

    if (oppSprite) oppSprite.textContent = q.icon || (sym ? sym.icon : stage.icon);
    // 嚴格防止洩漏答案：答題前對手名稱絕不顯示注音符號！
    if (oppName) oppName.textContent = isShiny ? '✨ 稀有閃光【神秘注音精靈】 ✨' : '野生的【神秘注音精靈】';
    if (oppType) oppType.textContent = sym ? `${sym.pokeTypeIcon} ${sym.pokeType}` : `🌟 屬性：綜合考核`;
    if (oppLevel) oppLevel.textContent = `Lv.${stage.id * 3 + state.adventure.qIndex + 1}`;

    const promptTag = document.getElementById('poke-battle-prompt-tag');
    const readingCard = document.getElementById('battle-reading-card');
    const readingText = document.getElementById('reading-passage-text');

    if (q.qType === 'reading' && q.passage) {
      if (promptTag) promptTag.innerHTML = '📖 ' + addZhuyinRuby('段考兒歌閱讀測驗') + '：';
      if (readingCard) readingCard.style.display = 'block';
      if (readingText) readingText.innerHTML = addZhuyinRuby(q.passage);
    } else {
      if (readingCard) readingCard.style.display = 'none';
      if (q.qType === 'choice') {
        if (promptTag) promptTag.innerHTML = '📝 ' + addZhuyinRuby('段考觀念選擇題') + '：';
      } else if (q.qType === 'fill_in') {
        if (promptTag) promptTag.innerHTML = '✏️ ' + addZhuyinRuby('語詞注音填空題') + '：';
      } else {
        if (promptTag) promptTag.innerHTML = '🔴 ' + addZhuyinRuby('道館考核題目') + '：';
      }
    }

    // 確保題目文字絕不出現注音答案（填空題保留已知字注音與【 ？ 】提示，僅過濾正解）
    let safePrompt = q.prompt || '';
    if (q.qType === 'choice' || q.qType === 'reading' || q.qType === 'fill_in') {
      // 選擇題、閱讀測驗與填空題已設計為標準考卷題型，直接呈現題意，不盲目將整段文字的注音打上問號
      safePrompt = q.prompt;
    } else {
      safePrompt = safePrompt.replace(/[ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ]/g, '❓');
    }
    if (promptText) promptText.innerHTML = addZhuyinRuby(safePrompt);
    

    // 依據國小段考真實 7 大題型動態渲染專屬交互介面
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    const optionsGrid = document.getElementById('battle-options-grid');
    if (optionsGrid) {
      optionsGrid.innerHTML = '';
      renderAuthenticExamInteraction(optionsGrid, q, stage, shuffled, handleBattleAnswer, safePrompt);
    }

    // 自動朗讀題目
    setTimeout(() => {
      window.audioEngine.speak(q.speakText);
    }, 250);
  }



// =========================================================================
  // 台灣教育部小一國語注音自動標音引擎 (Grade 1 Zhuyin Ruby Auto-Annotator)
  // 包含 1,200+ 常用國小生字與兒歌/閱讀測驗專用語詞，提供教育部標準注音與聲調
  // =========================================================================
  const TAIWAN_ZHUYIN_PHRASES = {"音樂": ["ㄧㄣ", "ㄩㄝˋ"], "快樂": ["ㄎㄨㄞˋ", "ㄌㄜˋ"], "睡覺": ["ㄕㄨㄟˋ", "ㄐㄧㄠˋ"], "覺得": ["ㄐㄩㄝˊ", "˙ㄉㄜ"], "長頸鹿": ["ㄔㄤˊ", "ㄐㄧㄥˇ", "ㄌㄨˋ"], "長大": ["ㄓㄤˇ", "ㄉㄚˋ"], "游泳": ["ㄧㄡˊ", "ㄩㄥˇ"], "白鵝": ["ㄅㄞˊ", "ㄜˊ"], "我們": ["ㄨㄛˇ", "˙ㄇㄣ"], "筷子": ["ㄎㄨㄞˋ", "˙ㄗ"], "桌子": ["ㄓㄨㄛ", "˙ㄗ"], "鴨子": ["ㄧㄚ", "˙ㄗ"], "椅子": ["ㄧˇ", "˙ㄗ"], "帽子": ["ㄇㄠˋ", "˙ㄗ"], "褲子": ["ㄎㄨˋ", "˙ㄗ"], "什麼": ["ㄕㄣˊ", "˙ㄇㄜ"], "怎麼": ["ㄗㄣˇ", "˙ㄇㄜ"], "那麼": ["ㄋㄚˋ", "˙ㄇㄜ"], "這麼": ["ㄓㄜˋ", "˙ㄇㄜ"], "安和國小": ["ㄢ", "ㄏㄜˊ", "ㄍㄨㄛˊ", "ㄒㄧㄠˇ"], "兒歌": ["ㄦˊ", "ㄍㄜ"], "閱讀測驗": ["ㄩㄝˋ", "ㄉㄨˊ", "ㄘㄜˋ", "ㄧㄢˋ"]};
  const TAIWAN_ZHUYIN_DICT = {"一": "ㄧ", "丁": "ㄉㄧㄥ", "七": "ㄑㄧ", "三": "ㄙㄢ", "上": "ㄕㄤˋ", "下": "ㄒㄧㄚˋ", "不": "ㄅㄨˋ", "世": "ㄕˋ", "丘": "ㄑㄧㄡ", "丟": "ㄉㄧㄡ", "並": "ㄅㄧㄥˋ", "中": "ㄓㄨㄥ", "串": "ㄔㄨㄢˋ", "主": "ㄓㄨˇ", "之": "ㄓ", "乖": "ㄍㄨㄞ", "九": "ㄐㄧㄡˇ", "也": "ㄧㄝˇ", "了": "˙ㄌㄜ", "事": "ㄕˋ", "二": "ㄦˋ", "互": "ㄏㄨˋ", "五": "ㄨˇ", "交": "ㄐㄧㄠ", "亭": "ㄊㄧㄥˊ", "亮": "ㄌㄧㄤˋ", "人": "ㄖㄣˊ", "什": "ㄕㄣˊ", "介": "ㄐㄧㄝˋ", "仔": "ㄗㄞˇ", "他": "ㄊㄚ", "仙": "ㄒㄧㄢ", "代": "ㄉㄞˋ", "令": "ㄌㄧㄥˋ", "以": "ㄧˇ", "件": "ㄐㄧㄢˋ", "任": "ㄖㄣˋ", "企": "ㄑㄧˇ", "伊": "ㄧ", "伏": "ㄈㄨˊ", "伴": "ㄅㄢˋ", "伸": "ㄕㄣ", "位": "ㄨㄟˋ", "低": "ㄉㄧ", "何": "ㄏㄜˊ", "作": "ㄗㄨㄛˋ", "你": "ㄋㄧˇ", "佳": "ㄐㄧㄚ", "使": "ㄕˇ", "來": "ㄌㄞˊ", "例": "ㄌㄧˋ", "供": "ㄍㄨㄥ", "依": "ㄧ", "便": "ㄅㄧㄢˋ", "係": "ㄒㄧˋ", "保": "ㄅㄠˇ", "修": "ㄒㄧㄡ", "個": "˙ㄍㄜ", "倍": "ㄅㄟˋ", "們": "˙ㄇㄣ", "候": "ㄏㄡˋ", "值": "ㄓˊ", "做": "ㄗㄨㄛˋ", "健": "ㄐㄧㄢˋ", "側": "ㄘㄜˋ", "偷": "ㄊㄡ", "傑": "ㄐㄧㄝˊ", "傘": "ㄙㄢˇ", "備": "ㄅㄟˋ", "傲": "ㄠˋ", "傷": "ㄕㄤ", "僅": "ㄐㄧㄣˇ", "像": "ㄒㄧㄤˋ", "優": "ㄧㄡ", "儲": "ㄔㄨˇ", "元": "ㄩㄢˊ", "兄": "ㄒㄩㄥ", "先": "ㄒㄧㄢ", "光": "ㄍㄨㄤ", "兒": "ㄦˊ", "兔": "ㄊㄨˋ", "入": "ㄖㄨˋ", "內": "ㄋㄟˋ", "全": "ㄑㄩㄢˊ", "兩": "ㄌㄧㄤˇ", "八": "ㄅㄚ", "公": "ㄍㄨㄥ", "六": "ㄌㄧㄡˋ", "共": "ㄍㄨㄥˋ", "具": "ㄐㄩˋ", "典": "ㄉㄧㄢˇ", "冊": "ㄘㄜˋ", "再": "ㄗㄞˋ", "冒": "ㄇㄠˋ", "冠": "ㄍㄨㄢ", "冬": "ㄉㄨㄥ", "冰": "ㄅㄧㄥ", "冷": "ㄌㄥˇ", "凰": "ㄏㄨㄤˊ", "凵": "ㄑㄧㄢˇ", "出": "ㄔㄨ", "刀": "ㄉㄠ", "分": "ㄈㄣ", "切": "ㄑㄧㄝˋ", "列": "ㄌㄧㄝˋ", "初": "ㄔㄨ", "判": "ㄆㄢˋ", "別": "ㄅㄧㄝˊ", "到": "ㄉㄠˋ", "制": "ㄓˋ", "刺": "ㄘˋ", "刻": "ㄎㄜˋ", "則": "ㄗㄜˊ", "削": "ㄒㄩㄝ", "前": "ㄑㄧㄢˊ", "剛": "ㄍㄤ", "剩": "ㄕㄥˋ", "劃": "ㄏㄨㄚˋ", "力": "ㄌㄧˋ", "功": "ㄍㄨㄥ", "加": "ㄐㄧㄚ", "助": "ㄓㄨˋ", "努": "ㄋㄨˇ", "勃": "ㄅㄛˊ", "勇": "ㄩㄥˇ", "動": "ㄉㄨㄥˋ", "勞": "ㄌㄠˊ", "勤": "ㄑㄧㄣˊ", "勳": "ㄒㄩㄣ", "勵": "ㄌㄧˋ", "勾": "ㄍㄡ", "包": "ㄅㄠ", "化": "ㄏㄨㄚˋ", "北": "ㄅㄟˇ", "匙": "˙ㄕ", "匹": "ㄆㄧˇ", "區": "ㄑㄩ", "十": "ㄕˊ", "千": "ㄑㄧㄢ", "升": "ㄕㄥ", "午": "ㄨˇ", "半": "ㄅㄢˋ", "博": "ㄅㄛˊ", "卡": "ㄎㄚˇ", "印": "ㄧㄣˋ", "即": "ㄐㄧˊ", "卷": "ㄐㄩㄢˇ", "原": "ㄩㄢˊ", "厲": "ㄌㄧˋ", "去": "ㄑㄩˋ", "又": "ㄧㄡˋ", "友": "ㄧㄡˇ", "反": "ㄈㄢˇ", "取": "ㄑㄩˇ", "受": "ㄕㄡˋ", "叢": "ㄘㄨㄥˊ", "口": "ㄎㄡˇ", "古": "ㄍㄨˇ", "句": "ㄐㄩˋ", "只": "ㄓˇ", "叫": "ㄐㄧㄠˋ", "叮": "ㄉㄧㄥ", "可": "ㄎㄜˇ", "台": "ㄊㄞˊ", "史": "ㄕˇ", "右": "ㄧㄡˋ", "吃": "ㄔ", "各": "ㄍㄜˋ", "合": "ㄏㄜˊ", "吉": "ㄐㄧˊ", "同": "ㄊㄨㄥˊ", "名": "ㄇㄧㄥˊ", "吐": "ㄊㄨˇ", "向": "ㄒㄧㄤˋ", "吧": "˙ㄅㄚ", "含": "ㄏㄢˊ", "吸": "ㄒㄧ", "吼": "ㄏㄡˇ", "呀": "˙ㄧㄚ", "呆": "ㄉㄞ", "呈": "ㄔㄥˊ", "告": "ㄍㄠˋ", "呢": "˙ㄋㄜ", "呱": "ㄍㄨ", "味": "ㄨㄟˋ", "命": "ㄇㄧㄥˋ", "和": "ㄏㄢˋ", "咕": "ㄍㄨ", "咚": "ㄉㄨㄥ", "咪": "ㄇㄧ", "品": "ㄆㄧㄣˇ", "哇": "˙ㄨㄚ", "哈": "ㄏㄚ", "哎": "ㄞ", "員": "ㄩㄢˊ", "哥": "ㄍㄜ", "哪": "ㄋㄚˇ", "哭": "ㄎㄨ", "唱": "ㄔㄤˋ", "唷": "ㄧㄛ", "唸": "ㄋㄧㄢˋ", "啊": "˙ㄚ", "問": "ㄨㄣˋ", "啞": "ㄧㄚˇ", "啟": "ㄑㄧˇ", "啦": "˙ㄌㄚ", "啪": "ㄆㄚ", "啷": "ㄌㄤ", "啼": "ㄊㄧˊ", "喔": "ㄛ", "喜": "ㄒㄧˇ", "喝": "ㄏㄜ", "單": "ㄉㄢ", "喳": "ㄓㄚ", "喵": "ㄇㄧㄠ", "嗎": "˙ㄇㄚ", "嗚": "ㄨ", "嗡": "ㄨㄥ", "嗨": "ㄏㄞ", "嘟": "ㄉㄨ", "嘩": "ㄏㄨㄚ", "嘰": "ㄐㄧ", "嘴": "ㄗㄨㄟˇ", "嘶": "ㄙ", "器": "ㄑㄧˋ", "噴": "ㄆㄣ", "噹": "ㄉㄤ", "嚴": "ㄧㄢˊ", "囉": "ㄌㄨㄛ", "四": "ㄙˋ", "回": "ㄏㄨㄟˊ", "圈": "ㄑㄩㄢ", "國": "ㄍㄨㄛˊ", "圍": "ㄨㄟˊ", "園": "ㄩㄢˊ", "圓": "ㄩㄢˊ", "圖": "ㄊㄨˊ", "團": "ㄊㄨㄢˊ", "土": "ㄊㄨˇ", "在": "ㄗㄞˋ", "地": "˙ㄉㄜ", "坐": "ㄗㄨㄛˋ", "坡": "ㄆㄛ", "型": "ㄒㄧㄥˊ", "城": "ㄔㄥˊ", "域": "ㄩˋ", "執": "ㄓˊ", "堂": "ㄊㄤˊ", "堅": "ㄐㄧㄢ", "堆": "ㄉㄨㄟ", "堡": "ㄅㄠˇ", "場": "ㄔㄤˇ", "塊": "ㄎㄨㄞˋ", "塘": "ㄊㄤˊ", "填": "ㄊㄧㄢˊ", "境": "ㄐㄧㄥˋ", "增": "ㄗㄥ", "壞": "ㄏㄨㄞˋ", "士": "ㄕˋ", "壺": "ㄏㄨˊ", "夏": "ㄒㄧㄚˋ", "外": "ㄨㄞˋ", "多": "ㄉㄨㄛ", "夜": "ㄧㄝˋ", "夢": "ㄇㄥˋ", "夥": "ㄏㄨㄛˇ", "大": "ㄉㄚˋ", "天": "ㄊㄧㄢ", "太": "ㄊㄞˋ", "夫": "ㄈㄨ", "失": "ㄕ", "奇": "ㄑㄧˊ", "奏": "ㄗㄡˋ", "奔": "ㄅㄣ", "套": "ㄊㄠˋ", "女": "ㄋㄩˇ", "奶": "ㄋㄞˇ", "她": "ㄊㄚ", "好": "ㄏㄠˇ", "如": "ㄖㄨˊ", "妖": "ㄧㄠ", "妙": "ㄇㄧㄠˋ", "妹": "ㄇㄟˋ", "姊": "ㄗˇ", "始": "ㄕˇ", "姐": "ㄐㄧㄝˇ", "姨": "ㄧˊ", "威": "ㄨㄟ", "婆": "ㄆㄛˊ", "媽": "ㄇㄚ", "子": "˙ㄗ", "字": "ㄗˋ", "存": "ㄘㄨㄣˊ", "季": "ㄐㄧˋ", "孩": "ㄏㄞˊ", "學": "ㄒㄩㄝˊ", "它": "ㄊㄚ", "守": "ㄕㄡˇ", "安": "ㄢ", "完": "ㄨㄢˊ", "定": "ㄉㄧㄥˋ", "客": "ㄎㄜˋ", "室": "ㄕˋ", "宮": "ㄍㄨㄥ", "害": "ㄏㄞˋ", "家": "ㄐㄧㄚ", "容": "ㄖㄨㄥˊ", "密": "ㄇㄧˋ", "富": "ㄈㄨˋ", "寒": "ㄏㄢˊ", "察": "ㄔㄚˊ", "實": "ㄕˊ", "寫": "ㄒㄧㄝˇ", "寵": "ㄔㄨㄥˇ", "寶": "ㄅㄠˇ", "射": "ㄕㄜˋ", "將": "ㄐㄧㄤ", "專": "ㄓㄨㄢ", "尊": "ㄗㄨㄣ", "尋": "ㄒㄩㄣˊ", "對": "ㄉㄨㄟˋ", "導": "ㄉㄠˇ", "小": "ㄒㄧㄠˇ", "少": "ㄕㄠˇ", "尖": "ㄐㄧㄢ", "就": "ㄐㄧㄡˋ", "尺": "ㄔˇ", "尼": "ㄋㄧˊ", "尾": "ㄨㄟˇ", "屋": "ㄨ", "展": "ㄓㄢˇ", "層": "ㄘㄥˊ", "屬": "ㄕㄨˇ", "山": "ㄕㄢ", "岩": "ㄧㄢˊ", "島": "ㄉㄠˇ", "崖": "ㄧㄚˊ", "嶼": "ㄩˇ", "川": "ㄔㄨㄢ", "巡": "ㄒㄩㄣˊ", "工": "ㄍㄨㄥ", "左": "ㄗㄨㄛˇ", "巨": "ㄐㄩˋ", "巫": "ㄨ", "己": "ㄐㄧˇ", "已": "ㄧˇ", "巴": "ㄅㄚ", "巾": "ㄐㄧㄣ", "市": "ㄕˋ", "布": "ㄅㄨˋ", "帆": "ㄈㄢ", "帥": "ㄕㄨㄞˋ", "師": "ㄕ", "常": "ㄔㄤˊ", "帽": "ㄇㄠˋ", "幅": "ㄈㄨˊ", "幕": "ㄇㄨˋ", "幟": "ㄓˋ", "幫": "ㄅㄤ", "平": "ㄆㄧㄥˊ", "年": "ㄋㄧㄢˊ", "幻": "ㄏㄨㄢˋ", "幼": "ㄧㄡˋ", "幾": "ㄐㄧˇ", "床": "ㄔㄨㄤˊ", "序": "ㄒㄩˋ", "底": "ㄉㄧˇ", "度": "ㄉㄨˋ", "座": "ㄗㄨㄛˋ", "庫": "ㄎㄨˋ", "康": "ㄎㄤ", "廂": "ㄒㄧㄤ", "建": "ㄐㄧㄢˋ", "弊": "ㄅㄧˋ", "式": "ㄕˋ", "引": "ㄧㄣˇ", "弟": "ㄉㄧˋ", "張": "ㄓㄤ", "強": "ㄑㄧㄤˊ", "彈": "ㄉㄢˋ", "彎": "ㄨㄢ", "彙": "ㄏㄨㄟˋ", "彩": "ㄘㄞˇ", "影": "ㄧㄥˇ", "往": "ㄨㄤˇ", "很": "ㄏㄣˇ", "後": "ㄏㄡˋ", "得": "˙ㄉㄜ", "從": "ㄘㄨㄥˊ", "復": "ㄈㄨˋ", "循": "ㄒㄩㄣˊ", "微": "ㄨㄟ", "徵": "ㄓㄥ", "徽": "ㄏㄨㄟ", "心": "ㄒㄧㄣ", "必": "ㄅㄧˋ", "忘": "ㄨㄤˋ", "忙": "ㄇㄤˊ", "忠": "ㄓㄨㄥ", "快": "ㄎㄨㄞˋ", "念": "ㄋㄧㄢˋ", "怎": "ㄗㄣˇ", "怕": "ㄆㄚˋ", "性": "ㄒㄧㄥˋ", "怪": "ㄍㄨㄞˋ", "恐": "ㄎㄨㄥˇ", "恢": "ㄏㄨㄟ", "恭": "ㄍㄨㄥ", "情": "ㄑㄧㄥˊ", "想": "ㄒㄧㄤˇ", "意": "ㄧˋ", "愛": "ㄞˋ", "感": "ㄍㄢˇ", "態": "ㄊㄞˋ", "慢": "ㄇㄢˋ", "慶": "ㄑㄧㄥˋ", "憶": "ㄧˋ", "應": "ㄧㄥ", "懶": "ㄌㄢˇ", "懷": "ㄏㄨㄞˊ", "懸": "ㄒㄩㄢˊ", "成": "ㄔㄥˊ", "我": "ㄨㄛˇ", "或": "ㄏㄨㄛˋ", "戰": "ㄓㄢˋ", "戲": "ㄒㄧˋ", "戳": "ㄔㄨㄛ", "戴": "ㄉㄞˋ", "戶": "ㄏㄨˋ", "房": "ㄈㄤˊ", "所": "ㄙㄨㄛˇ", "手": "ㄕㄡˇ", "才": "ㄘㄞˊ", "打": "ㄉㄚˇ", "找": "ㄓㄠˇ", "技": "ㄐㄧˋ", "把": "ㄅㄚˇ", "抓": "ㄓㄨㄚ", "折": "ㄓㄜˊ", "抽": "ㄔㄡ", "拇": "ㄇㄨˇ", "拉": "ㄌㄚ", "拋": "ㄆㄠ", "拐": "ㄍㄨㄞˇ", "拔": "ㄅㄚˊ", "招": "ㄓㄠ", "括": "ㄎㄨㄛˋ", "拳": "ㄑㄩㄢˊ", "拼": "ㄆㄧㄣ", "拿": "ㄋㄚˊ", "指": "ㄓˇ", "按": "ㄢˋ", "挑": "ㄊㄧㄠ", "捉": "ㄓㄨㄛ", "捏": "ㄋㄧㄝ", "捕": "ㄅㄨˇ", "捺": "ㄋㄚˋ", "掃": "ㄙㄠˇ", "掉": "ㄉㄧㄠˋ", "掌": "ㄓㄤˇ", "掙": "ㄓㄥ", "掛": "ㄍㄨㄚˋ", "採": "ㄘㄞˇ", "探": "ㄊㄢˋ", "接": "ㄐㄧㄝ", "控": "ㄎㄨㄥˋ", "推": "ㄊㄨㄟ", "描": "ㄇㄧㄠˊ", "提": "ㄊㄧˊ", "揚": "ㄧㄤˊ", "換": "ㄏㄨㄢˋ", "揮": "ㄏㄨㄟ", "援": "ㄩㄢˊ", "搖": "ㄧㄠˊ", "搞": "ㄍㄠˇ", "撇": "ㄆㄧㄝ", "撐": "ㄔㄥ", "撤": "ㄔㄜˋ", "播": "ㄅㄛ", "撲": "ㄆㄨ", "撼": "ㄏㄢˋ", "擁": "ㄩㄥ", "擅": "ㄕㄢˋ", "擇": "ㄗㄜˊ", "擊": "ㄐㄧ", "操": "ㄘㄠ", "擎": "ㄑㄧㄥˊ", "據": "ㄐㄩˋ", "擦": "ㄘㄚ", "擺": "ㄅㄞˇ", "支": "ㄓ", "收": "ㄕㄡ", "攻": "ㄍㄨㄥ", "放": "ㄈㄤˋ", "故": "ㄍㄨˋ", "效": "ㄒㄧㄠˋ", "敗": "ㄅㄞˋ", "教": "ㄐㄧㄠˋ", "散": "ㄙㄢˋ", "整": "ㄓㄥˇ", "數": "ㄕㄨˋ", "文": "ㄨㄣˊ", "斑": "ㄅㄢ", "料": "ㄌㄧㄠˋ", "斜": "ㄒㄧㄝˊ", "新": "ㄒㄧㄣ", "斷": "ㄉㄨㄢˋ", "方": "ㄈㄤ", "旋": "ㄒㄩㄢˊ", "族": "ㄗㄨˊ", "旗": "ㄑㄧˊ", "日": "ㄖˋ", "早": "ㄗㄠˇ", "旺": "ㄨㄤˋ", "昂": "ㄤˊ", "明": "ㄇㄧㄥˊ", "易": "ㄧˋ", "星": "ㄒㄧㄥ", "春": "ㄔㄨㄣ", "是": "ㄕˋ", "時": "ㄕˊ", "晃": "ㄏㄨㄤˇ", "晚": "ㄨㄢˇ", "晨": "ㄔㄣˊ", "景": "ㄐㄧㄥˇ", "晰": "ㄒㄧ", "晴": "ㄑㄧㄥˊ", "晶": "ㄐㄧㄥ", "暑": "ㄕㄨˇ", "暖": "ㄋㄨㄢˇ", "暴": "ㄅㄠˋ", "曆": "ㄌㄧˋ", "曉": "ㄒㄧㄠˇ", "更": "ㄍㄥˋ", "書": "ㄕㄨ", "最": "ㄗㄨㄟˋ", "會": "ㄏㄨㄟˋ", "月": "ㄩㄝˋ", "有": "ㄧㄡˇ", "朋": "ㄆㄥˊ", "服": "ㄈㄨˊ", "朗": "ㄌㄤˇ", "朝": "ㄔㄠˊ", "期": "ㄑㄧ", "木": "ㄇㄨˋ", "未": "ㄨㄟˋ", "末": "ㄇㄛˋ", "本": "ㄅㄣˇ", "朵": "ㄉㄨㄛˇ", "杖": "ㄓㄤˋ", "束": "ㄕㄨˋ", "杯": "ㄅㄟ", "東": "ㄉㄨㄥ", "松": "ㄙㄨㄥ", "板": "ㄅㄢˇ", "析": "ㄒㄧ", "林": "ㄌㄧㄣˊ", "枚": "ㄇㄟˊ", "果": "ㄍㄨㄛˇ", "枝": "ㄓ", "柑": "ㄍㄢ", "染": "ㄖㄢˇ", "柔": "ㄖㄡˊ", "柚": "ㄧㄡˋ", "查": "ㄔㄚˊ", "校": "ㄒㄧㄠˋ", "核": "ㄏㄜˊ", "根": "ㄍㄣ", "格": "ㄍㄜˊ", "桂": "ㄍㄨㄟˋ", "案": "ㄢˋ", "桌": "ㄓㄨㄛ", "桿": "ㄍㄢˇ", "梅": "ㄇㄟˊ", "條": "ㄊㄧㄠˊ", "梯": "ㄊㄧ", "棒": "ㄅㄤˋ", "棕": "ㄗㄨㄥ", "森": "ㄙㄣ", "椅": "ㄧˇ", "植": "ㄓˊ", "椰": "ㄧㄝ", "楚": "ㄔㄨˇ", "極": "ㄐㄧˊ", "榜": "ㄅㄤˇ", "榮": "ㄖㄨㄥˊ", "構": "ㄍㄡˋ", "槽": "ㄘㄠˊ", "樂": "ㄌㄜˋ", "標": "ㄅㄧㄠ", "模": "ㄇㄛˊ", "樣": "ㄧㄤˋ", "樹": "ㄕㄨˋ", "橋": "ㄑㄧㄠˊ", "橘": "ㄐㄩˊ", "橙": "ㄔㄥˊ", "機": "ㄐㄧ", "橡": "ㄒㄧㄤˋ", "橫": "ㄏㄥˊ", "檢": "ㄐㄧㄢˇ", "檬": "ㄇㄥˊ", "檯": "ㄊㄞˊ", "檸": "ㄋㄧㄥˊ", "次": "ㄘˋ", "款": "ㄎㄨㄢˇ", "歌": "ㄍㄜ", "歡": "ㄏㄨㄢ", "止": "ㄓˇ", "正": "ㄓㄥˋ", "此": "ㄘˇ", "步": "ㄅㄨˋ", "武": "ㄨˇ", "歷": "ㄌㄧˋ", "段": "ㄉㄨㄢˋ", "殺": "ㄕㄚ", "殼": "ㄎㄜˊ", "殿": "ㄉㄧㄢˋ", "母": "ㄇㄨˇ", "每": "ㄇㄟˇ", "比": "ㄅㄧˇ", "毛": "ㄇㄠˊ", "民": "ㄇㄧㄣˊ", "氣": "ㄑㄧˋ", "水": "ㄕㄨㄟˇ", "汁": "ㄓ", "求": "ㄑㄧㄡˊ", "池": "ㄔˊ", "汪": "ㄨㄤ", "決": "ㄐㄩㄝˊ", "汽": "ㄑㄧˋ", "沒": "ㄇㄟˊ", "沙": "ㄕㄚ", "河": "ㄏㄜˊ", "油": "ㄧㄡˊ", "泊": "ㄆㄛ", "法": "ㄈㄚˇ", "泡": "ㄆㄠˋ", "波": "ㄅㄛ", "泥": "ㄋㄧˊ", "注": "ㄓㄨˋ", "泰": "ㄊㄞˋ", "泳": "ㄩㄥˇ", "洋": "ㄧㄤˊ", "洗": "ㄒㄧˇ", "洞": "ㄉㄨㄥˋ", "洩": "ㄒㄧㄝˋ", "活": "ㄏㄨㄛˊ", "流": "ㄌㄧㄡˊ", "浪": "ㄌㄤˋ", "浮": "ㄈㄨˊ", "海": "ㄏㄞˇ", "消": "ㄒㄧㄠ", "涼": "ㄌㄧㄤˊ", "淋": "ㄌㄧㄣˊ", "深": "ㄕㄣ", "混": "ㄏㄨㄣˋ", "清": "ㄑㄧㄥ", "測": "ㄘㄜˋ", "渲": "ㄒㄩㄢˋ", "渴": "ㄎㄜˇ", "游": "ㄧㄡˊ", "湖": "ㄏㄨˊ", "湛": "ㄓㄢˋ", "湯": "ㄊㄤ", "準": "ㄓㄨㄣˇ", "溜": "ㄌㄧㄡ", "溪": "ㄒㄧ", "溫": "ㄨㄣ", "滋": "ㄗ", "滑": "ㄏㄨㄚˊ", "滴": "ㄉㄧ", "滾": "ㄍㄨㄣˇ", "滿": "ㄇㄢˇ", "漂": "ㄆㄧㄠ", "漆": "ㄑㄧ", "漏": "ㄌㄡˋ", "演": "ㄧㄢˇ", "漸": "ㄐㄧㄢˋ", "漿": "ㄐㄧㄤ", "潑": "ㄆㄛ", "潤": "ㄖㄨㄣˋ", "濾": "ㄌㄩˋ", "灣": "ㄨㄢ", "火": "ㄏㄨㄛˇ", "灰": "ㄏㄨㄟ", "炎": "ㄧㄢˊ", "炮": "ㄆㄠˋ", "為": "ㄨㄟˋ", "烈": "ㄌㄧㄝˋ", "烏": "ㄨ", "無": "ㄨˊ", "焰": "ㄧㄢˋ", "然": "ㄖㄢˊ", "煉": "ㄌㄧㄢˋ", "照": "ㄓㄠˋ", "熊": "ㄒㄩㄥˊ", "熱": "ㄖㄜˋ", "熾": "ㄔˋ", "燈": "ㄉㄥ", "燕": "ㄧㄢˋ", "營": "ㄧㄥˊ", "爆": "ㄅㄠˋ", "爪": "ㄓㄠˇ", "爬": "ㄆㄚˊ", "父": "ㄈㄨˋ", "爸": "ㄅㄚˋ", "爺": "ㄧㄝˊ", "爽": "ㄕㄨㄤˇ", "片": "ㄆㄧㄢˋ", "牌": "ㄆㄞˊ", "牙": "ㄧㄚˊ", "牛": "ㄋㄧㄡˊ", "牠": "ㄊㄚ", "物": "ㄨˋ", "特": "ㄊㄜˋ", "牽": "ㄑㄧㄢ", "犬": "ㄑㄩㄢˇ", "狀": "ㄓㄨㄤˋ", "狂": "ㄎㄨㄤˊ", "狐": "ㄏㄨˊ", "狗": "ㄍㄡˇ", "狸": "ㄌㄧˊ", "猴": "ㄏㄡˊ", "獅": "ㄕ", "獎": "ㄐㄧㄤˇ", "獨": "ㄉㄨˊ", "獲": "ㄏㄨㄛˋ", "獵": "ㄌㄧㄝˋ", "獸": "ㄕㄡˋ", "率": "ㄌㄩˋ", "王": "ㄨㄤˊ", "玩": "ㄨㄢˊ", "珍": "ㄓㄣ", "珠": "ㄓㄨ", "班": "ㄅㄢ", "現": "ㄒㄧㄢˋ", "球": "ㄑㄧㄡˊ", "理": "ㄌㄧˇ", "琴": "ㄑㄧㄣˊ", "環": "ㄏㄨㄢˊ", "瓜": "ㄍㄨㄚ", "瓣": "ㄅㄢˋ", "甜": "ㄊㄧㄢˊ", "生": "ㄕㄥ", "產": "ㄔㄢˇ", "用": "ㄩㄥˋ", "田": "ㄊㄧㄢˊ", "由": "ㄧㄡˊ", "甲": "ㄐㄧㄚˇ", "男": "ㄋㄢˊ", "界": "ㄐㄧㄝˋ", "畔": "ㄆㄢˋ", "留": "ㄌㄧㄡˊ", "畫": "ㄏㄨㄚˋ", "當": "ㄉㄤ", "瘋": "ㄈㄥ", "瘦": "ㄕㄡˋ", "登": "ㄉㄥ", "發": "ㄈㄚ", "白": "ㄅㄞˊ", "百": "ㄅㄞˇ", "的": "˙ㄉㄜ", "皮": "ㄆㄧˊ", "盃": "ㄅㄟ", "盆": "ㄆㄣˊ", "盒": "ㄏㄜˊ", "盛": "ㄕㄥˋ", "盟": "ㄇㄥˊ", "盤": "ㄆㄢˊ", "目": "ㄇㄨˋ", "盲": "ㄇㄤˊ", "直": "ㄓˊ", "看": "ㄎㄢˋ", "真": "ㄓㄣ", "睡": "ㄕㄨㄟˋ", "瞇": "ㄇㄧ", "知": "ㄓ", "短": "ㄉㄨㄢˇ", "矮": "ㄞˇ", "石": "ㄕˊ", "破": "ㄆㄛˋ", "硬": "ㄧㄥˋ", "碧": "ㄅㄧˋ", "碰": "ㄆㄥˋ", "確": "ㄑㄩㄝˋ", "磅": "ㄅㄤˋ", "示": "ㄕˋ", "祕": "ㄇㄧˋ", "祝": "ㄓㄨˋ", "神": "ㄕㄣˊ", "祥": "ㄒㄧㄤˊ", "禾": "ㄏㄜˊ", "秋": "ㄑㄧㄡ", "科": "ㄎㄜ", "秒": "ㄇㄧㄠˇ", "秘": "ㄇㄧˋ", "移": "ㄧˊ", "稀": "ㄒㄧ", "程": "ㄔㄥˊ", "種": "ㄓㄨㄥˇ", "稱": "ㄔㄥ", "稻": "ㄉㄠˋ", "積": "ㄐㄧ", "空": "ㄎㄨㄥ", "穿": "ㄔㄨㄢ", "突": "ㄊㄨ", "窗": "ㄔㄨㄤ", "窩": "ㄨㄛ", "立": "ㄌㄧˋ", "站": "ㄓㄢˋ", "章": "ㄓㄤ", "童": "ㄊㄨㄥˊ", "竹": "ㄓㄨˊ", "笑": "ㄒㄧㄠˋ", "符": "ㄈㄨˊ", "第": "ㄉㄧˋ", "筆": "ㄅㄧˇ", "等": "ㄉㄥˇ", "答": "ㄉㄚˊ", "筷": "ㄎㄨㄞˋ", "箏": "ㄓㄥ", "算": "ㄙㄨㄢˋ", "管": "ㄍㄨㄢˇ", "箭": "ㄐㄧㄢˋ", "箱": "ㄒㄧㄤ", "節": "ㄐㄧㄝˊ", "範": "ㄈㄢˋ", "篩": "ㄕㄞ", "籃": "ㄌㄢˊ", "籠": "ㄌㄨㄥˊ", "籤": "ㄑㄧㄢ", "米": "ㄇㄧˇ", "精": "ㄐㄧㄥ", "糖": "ㄊㄤˊ", "系": "ㄒㄧˋ", "紀": "ㄐㄧˋ", "紅": "ㄏㄨㄥˊ", "紋": "ㄨㄣˊ", "紙": "ㄓˇ", "級": "ㄐㄧˊ", "素": "ㄙㄨˋ", "索": "ㄙㄨㄛˇ", "紫": "ㄗˇ", "累": "ㄌㄟˋ", "細": "ㄒㄧˋ", "紹": "ㄕㄠˋ", "終": "ㄓㄨㄥ", "組": "ㄗㄨˇ", "結": "ㄐㄧㄝˊ", "絕": "ㄐㄩㄝˊ", "給": "ㄍㄟˇ", "統": "ㄊㄨㄥˇ", "絲": "ㄙ", "綁": "ㄅㄤˇ", "經": "ㄐㄧㄥ", "綜": "ㄗㄨㄥ", "綠": "ㄌㄩˋ", "網": "ㄨㄤˇ", "綻": "ㄓㄢˋ", "線": "ㄒㄧㄢˋ", "練": "ㄌㄧㄢˋ", "縮": "ㄙㄨㄛ", "織": "ㄓ", "繩": "ㄕㄥˊ", "繼": "ㄐㄧˋ", "續": "ㄒㄩˋ", "罩": "ㄓㄠˋ", "羅": "ㄌㄨㄛˊ", "羊": "ㄧㄤˊ", "美": "ㄇㄟˇ", "義": "ㄧˋ", "翁": "ㄨㄥ", "翅": "ㄔˋ", "習": "ㄒㄧˊ", "翔": "ㄒㄧㄤˊ", "翠": "ㄘㄨㄟˋ", "翩": "ㄆㄧㄢ", "翱": "ㄠˊ", "翹": "ㄑㄧㄠˋ", "翻": "ㄈㄢ", "耀": "ㄧㄠˋ", "老": "ㄌㄠˇ", "考": "ㄎㄠˇ", "者": "ㄓㄜˇ", "耳": "ㄦˇ", "耶": "ㄧㄝˊ", "聖": "ㄕㄥˋ", "聚": "ㄐㄩˋ", "聞": "ㄨㄣˊ", "聯": "ㄌㄧㄢˊ", "聲": "ㄕㄥ", "聽": "ㄊㄧㄥ", "肚": "ㄉㄨˋ", "肩": "ㄐㄧㄢ", "育": "ㄩˋ", "背": "ㄅㄟˋ", "能": "ㄋㄥˊ", "脖": "ㄅㄛˊ", "脫": "ㄊㄨㄛ", "腕": "ㄨㄢˋ", "腳": "ㄐㄧㄠˇ", "臉": "ㄌㄧㄢˇ", "自": "ㄗˋ", "至": "ㄓˋ", "臺": "ㄊㄞˊ", "與": "ㄩˇ", "興": "ㄒㄧㄥˋ", "舌": "ㄕㄜˊ", "舞": "ㄨˇ", "航": "ㄏㄤˊ", "般": "ㄅㄢ", "船": "ㄔㄨㄢˊ", "艦": "ㄐㄧㄢˋ", "色": "ㄙㄜˋ", "芒": "ㄇㄤˊ", "芭": "ㄅㄚ", "花": "ㄏㄨㄚ", "若": "ㄖㄨㄛˋ", "苦": "ㄎㄨˇ", "茶": "ㄔㄚˊ", "草": "ㄘㄠˇ", "荷": "ㄏㄜˊ", "莓": "ㄇㄟˊ", "菜": "ㄘㄞˋ", "菠": "ㄅㄛ", "萄": "ㄊㄠˊ", "萌": "ㄇㄥˊ", "萬": "ㄨㄢˋ", "落": "ㄌㄨㄛˋ", "葉": "ㄧㄝˋ", "著": "˙ㄓㄜ", "葡": "ㄆㄨˊ", "葵": "ㄎㄨㄟˊ", "蒐": "ㄙㄡ", "蓋": "ㄍㄞˋ", "蔔": "ㄅㄛˊ", "蔥": "ㄘㄨㄥ", "蔬": "ㄕㄨ", "蕉": "ㄐㄧㄠ", "薄": "ㄅㄠˊ", "薦": "ㄐㄧㄢˋ", "藍": "ㄌㄢˊ", "藥": "ㄧㄠˋ", "蘋": "ㄆㄧㄥˊ", "蘭": "ㄌㄢˊ", "蘿": "ㄌㄨㄛˊ", "虎": "ㄏㄨˇ", "處": "ㄔㄨˋ", "虛": "ㄒㄩ", "號": "ㄏㄠˋ", "虹": "ㄏㄨㄥˊ", "蚪": "ㄉㄡˇ", "蛇": "ㄕㄜˊ", "蛋": "ㄉㄢˋ", "蛙": "ㄨㄚ", "蛛": "ㄓㄨ", "蜂": "ㄈㄥ", "蜓": "ㄊㄧㄥˊ", "蜘": "ㄓ", "蜜": "ㄇㄧˋ", "蜻": "ㄑㄧㄥ", "蝌": "ㄎㄜ", "蝟": "ㄨㄟˋ", "蝠": "ㄈㄨˊ", "蝦": "ㄒㄧㄚ", "蝴": "ㄏㄨˊ", "蝶": "ㄉㄧㄝˊ", "蝸": "ㄨㄛ", "螃": "ㄆㄤˊ", "螞": "ㄇㄚˇ", "螢": "ㄧㄥˊ", "蟬": "ㄔㄢˊ", "蟲": "ㄔㄨㄥˊ", "蟹": "ㄒㄧㄝˋ", "蟻": "ㄧˇ", "蠶": "ㄘㄢˊ", "血": "ㄒㄩㄝˋ", "行": "ㄒㄧㄥˊ", "術": "ㄕㄨˋ", "衝": "ㄔㄨㄥ", "衣": "ㄧ", "表": "ㄅㄧㄠˇ", "袋": "ㄉㄞˋ", "袍": "ㄆㄠˊ", "補": "ㄅㄨˇ", "裝": "ㄓㄨㄤ", "裡": "ㄌㄧˇ", "裳": "˙ㄕㄤ", "製": "ㄓˋ", "褲": "ㄎㄨˋ", "襪": "ㄨㄚˋ", "西": "ㄒㄧ", "要": "ㄧㄠˋ", "見": "ㄐㄧㄢˋ", "規": "ㄍㄨㄟ", "視": "ㄕˋ", "親": "ㄑㄧㄣ", "覺": "ㄐㄧㄠˋ", "觀": "ㄍㄨㄢ", "角": "ㄐㄧㄠˇ", "解": "ㄐㄧㄝˇ", "觸": "ㄔㄨˋ", "計": "ㄐㄧˋ", "訊": "ㄒㄩㄣˋ", "訓": "ㄒㄩㄣˋ", "記": "ㄐㄧˋ", "訣": "ㄐㄩㄝˊ", "設": "ㄕㄜˋ", "詞": "ㄘˊ", "詢": "ㄒㄩㄣˊ", "試": "ㄕˋ", "話": "ㄏㄨㄚˋ", "該": "ㄍㄞ", "詳": "ㄒㄧㄤˊ", "認": "ㄖㄣˋ", "誕": "ㄉㄢˋ", "語": "ㄩˇ", "誠": "ㄔㄥˊ", "誤": "ㄨˋ", "說": "ㄕㄨㄛ", "誰": "ㄕㄨㄟˊ", "課": "ㄎㄜˋ", "調": "ㄉㄧㄠˋ", "請": "ㄑㄧㄥˇ", "謝": "ㄒㄧㄝˋ", "識": "ㄕˊ", "護": "ㄏㄨˋ", "譽": "ㄩˋ", "讀": "ㄉㄨˊ", "變": "ㄅㄧㄢˋ", "讚": "ㄗㄢˋ", "豆": "ㄉㄡˋ", "豎": "ㄕㄨˋ", "豐": "ㄈㄥ", "豚": "ㄊㄨㄣˊ", "象": "ㄒㄧㄤˋ", "豬": "ㄓㄨ", "豹": "ㄅㄠˋ", "貓": "ㄇㄠ", "貝": "ㄅㄟˋ", "貼": "ㄊㄧㄝ", "資": "ㄗ", "賞": "ㄕㄤˇ", "賽": "ㄙㄞˋ", "赤": "ㄔˋ", "走": "ㄗㄡˇ", "起": "ㄑㄧˇ", "超": "ㄔㄠ", "趣": "ㄑㄩˋ", "足": "ㄗㄨˊ", "跑": "ㄆㄠˇ", "跟": "ㄍㄣ", "路": "ㄌㄨˋ", "跳": "ㄊㄧㄠˋ", "踏": "ㄊㄚˋ", "蹄": "ㄊㄧˊ", "蹤": "ㄗㄨㄥ", "蹦": "ㄅㄥˋ", "躍": "ㄩㄝˋ", "身": "ㄕㄣ", "車": "ㄔㄜ", "軌": "ㄍㄨㄟˇ", "軍": "ㄐㄩㄣ", "較": "ㄐㄧㄠˋ", "載": "ㄗㄞˋ", "輕": "ㄑㄧㄥ", "輯": "ㄐㄧˊ", "轉": "ㄓㄨㄢˇ", "辛": "ㄒㄧㄣ", "辨": "ㄅㄧㄢˋ", "辮": "ㄅㄧㄢˋ", "農": "ㄋㄨㄥˊ", "迎": "ㄧㄥˊ", "近": "ㄐㄧㄣˋ", "返": "ㄈㄢˇ", "迪": "ㄉㄧˊ", "迴": "ㄏㄨㄟˊ", "迸": "ㄅㄥˋ", "追": "ㄓㄨㄟ", "退": "ㄊㄨㄟˋ", "送": "ㄙㄨㄥˋ", "逆": "ㄋㄧˋ", "這": "ㄓㄜˋ", "通": "ㄊㄨㄥ", "速": "ㄙㄨˋ", "造": "ㄗㄠˋ", "連": "ㄌㄧㄢˊ", "進": "ㄐㄧㄣˋ", "遊": "ㄧㄡˊ", "運": "ㄩㄣˋ", "過": "ㄍㄨㄛˋ", "道": "ㄉㄠˋ", "達": "ㄉㄚˊ", "適": "ㄕˋ", "遮": "ㄓㄜ", "選": "ㄒㄩㄢˇ", "邊": "ㄅㄧㄢ", "邏": "ㄌㄨㄛˊ", "那": "ㄋㄚˋ", "部": "ㄅㄨˋ", "都": "ㄉㄡ", "配": "ㄆㄟˋ", "酸": "ㄙㄨㄢ", "醒": "ㄒㄧㄥˇ", "醫": "ㄧ", "釀": "ㄋㄧㄤˋ", "重": "ㄓㄨㄥˋ", "野": "ㄧㄝˇ", "量": "ㄌㄧㄤˋ", "金": "ㄐㄧㄣ", "針": "ㄓㄣ", "鈕": "ㄋㄧㄡˇ", "鈴": "ㄌㄧㄥˊ", "鉛": "ㄑㄧㄢ", "鉤": "ㄍㄡ", "鋒": "ㄈㄥ", "鋼": "ㄍㄤ", "錄": "ㄌㄨˋ", "錐": "ㄓㄨㄟ", "錯": "ㄘㄨㄛˋ", "錶": "ㄅㄧㄠˇ", "鎖": "ㄙㄨㄛˇ", "鏡": "ㄐㄧㄥˋ", "鐘": "ㄓㄨㄥ", "鐵": "ㄊㄧㄝˇ", "鐺": "ㄉㄤ", "鑑": "ㄐㄧㄢˋ", "鑽": "ㄗㄨㄢ", "長": "ㄔㄤˊ", "門": "ㄇㄣˊ", "閃": "ㄕㄢˇ", "閉": "ㄅㄧˋ", "開": "ㄎㄞ", "間": "ㄐㄧㄢ", "閱": "ㄩㄝˋ", "闖": "ㄔㄨㄤˇ", "關": "ㄍㄨㄢ", "防": "ㄈㄤˊ", "阿": "ㄚ", "陌": "ㄇㄛˋ", "降": "ㄐㄧㄤˋ", "限": "ㄒㄧㄢˋ", "陣": "ㄓㄣˋ", "除": "ㄔㄨˊ", "陪": "ㄆㄟˊ", "陰": "ㄧㄣ", "陽": "ㄧㄤˊ", "隨": "ㄙㄨㄟˊ", "險": "ㄒㄧㄢˇ", "隻": "ㄓ", "雀": "ㄑㄩㄝˋ", "雅": "ㄧㄚˇ", "集": "ㄐㄧˊ", "雙": "ㄕㄨㄤ", "雞": "ㄐㄧ", "難": "ㄋㄢˊ", "雨": "ㄩˇ", "雪": "ㄒㄩㄝˇ", "雲": "ㄩㄣˊ", "零": "ㄌㄧㄥˊ", "雷": "ㄌㄟˊ", "電": "ㄉㄧㄢˋ", "需": "ㄒㄩ", "霄": "ㄒㄧㄠ", "霜": "ㄕㄨㄤ", "靈": "ㄌㄧㄥˊ", "青": "ㄑㄧㄥ", "非": "ㄈㄟ", "面": "ㄇㄧㄢˋ", "革": "ㄍㄜˊ", "鞋": "ㄒㄧㄝˊ", "鞍": "ㄢ", "音": "ㄧㄣ", "韻": "ㄩㄣˋ", "響": "ㄒㄧㄤˇ", "頁": "ㄧㄝˋ", "頂": "ㄉㄧㄥˇ", "項": "ㄒㄧㄤˋ", "順": "ㄕㄨㄣˋ", "領": "ㄌㄧㄥˇ", "頭": "ㄊㄡˊ", "頰": "ㄐㄧㄚˊ", "頸": "ㄐㄧㄥˇ", "顆": "ㄎㄜ", "題": "ㄊㄧˊ", "顏": "ㄧㄢˊ", "類": "ㄌㄟˋ", "顯": "ㄒㄧㄢˇ", "風": "ㄈㄥ", "飄": "ㄆㄧㄠ", "飛": "ㄈㄟ", "食": "ㄕˊ", "飯": "ㄈㄢˋ", "飽": "ㄅㄠˇ", "餅": "ㄅㄧㄥˇ", "養": "ㄧㄤˇ", "餐": "ㄘㄢ", "餓": "ㄜˋ", "餘": "ㄩˊ", "館": "ㄍㄨㄢˇ", "首": "ㄕㄡˇ", "香": "ㄒㄧㄤ", "馬": "ㄇㄚˇ", "馴": "ㄒㄩㄣˊ", "騎": "ㄑㄧˊ", "驗": "ㄧㄢˋ", "骨": "ㄍㄨˇ", "體": "ㄊㄧˇ", "高": "ㄍㄠ", "鬍": "ㄏㄨˊ", "鬚": "ㄒㄩ", "鬥": "ㄉㄡˋ", "魔": "ㄇㄛˊ", "魚": "ㄩˊ", "鱷": "ㄜˋ", "鳥": "ㄋㄧㄠˇ", "鳴": "ㄇㄧㄥˊ", "鴨": "ㄧㄚ", "鴿": "ㄍㄜ", "鵝": "ㄜˊ", "鷗": "ㄡ", "鷹": "ㄧㄥ", "鹿": "ㄌㄨˋ", "麗": "ㄌㄧˋ", "麼": "˙ㄇㄜ", "黃": "ㄏㄨㄤˊ", "黑": "ㄏㄟ", "點": "ㄉㄧㄢˇ", "鼠": "ㄕㄨˇ", "鼻": "ㄅㄧˊ", "齒": "ㄔˇ", "龍": "ㄌㄨㄥˊ", "龜": "ㄍㄨㄟ"};

  function addZhuyinRuby(text) {
    if (!text || typeof text !== 'string') return '';
    let result = '';
    let i = 0;
    const n = text.length;

    while (i < n) {
      // 1. 優先匹配 4 字詞語
      if (i + 4 <= n) {
        const sub4 = text.substring(i, i + 4);
        if (TAIWAN_ZHUYIN_PHRASES[sub4]) {
          const pys = TAIWAN_ZHUYIN_PHRASES[sub4];
          for (let k = 0; k < 4; k++) {
            result += `<ruby class="zhuyin-ruby"><span class="rb">${sub4[k]}</span><rt>${pys[k]}</rt></ruby>`;
          }
          i += 4;
          continue;
        }
      }
      // 2. 優先匹配 3 字詞語
      if (i + 3 <= n) {
        const sub3 = text.substring(i, i + 3);
        if (TAIWAN_ZHUYIN_PHRASES[sub3]) {
          const pys = TAIWAN_ZHUYIN_PHRASES[sub3];
          for (let k = 0; k < 3; k++) {
            result += `<ruby class="zhuyin-ruby"><span class="rb">${sub3[k]}</span><rt>${pys[k]}</rt></ruby>`;
          }
          i += 3;
          continue;
        }
      }
      // 3. 優先匹配 2 字詞語
      if (i + 2 <= n) {
        const sub2 = text.substring(i, i + 2);
        if (TAIWAN_ZHUYIN_PHRASES[sub2]) {
          const pys = TAIWAN_ZHUYIN_PHRASES[sub2];
          for (let k = 0; k < 2; k++) {
            result += `<ruby class="zhuyin-ruby"><span class="rb">${sub2[k]}</span><rt>${pys[k]}</rt></ruby>`;
          }
          i += 2;
          continue;
        }
      }
      // 4. 單字查表匹配
      const ch = text[i];
      if (TAIWAN_ZHUYIN_DICT[ch]) {
        result += `<ruby class="zhuyin-ruby"><span class="rb">${ch}</span><rt>${TAIWAN_ZHUYIN_DICT[ch]}</rt></ruby>`;
      } else {
        result += ch;
      }
      i++;
    }
    return result;
  }

  // =========================================================================
  // 國小正式段考 7 大真實題型專屬互動渲染器 (Authentic Exam Interaction Renderer)
  // =========================================================================
  function detectExamFormat(q, stage) {
    if (q.examFormat) return q.examFormat;
    const p = q.prompt || '';
    if (p.includes('看圖選注音') || p.includes('看圖選音')) return 'check';
    if (p.includes('圈出正確注音') || p.includes('圈出正確語詞')) return 'circle';
    if (p.includes('連連看')) return 'connect';
    if (p.includes('看圖填拼音') || p.includes('看圖填一填')) return 'fill';
    if (p.includes('拼音造詞') || (p.includes('聲母') && p.includes('加上'))) return 'combine';
    if (p.includes('句子聲調') || p.includes('第幾聲')) return 'tone';
    if (q.qType === 'reading' || q.passage || p.includes('兒歌') || p.includes('故事')) return 'reading';
    return 'standard';
  }

  function renderAuthenticExamInteraction(optionsGrid, q, stage, shuffled, onAnswer, safePrompt) {
    const format = detectExamFormat(q, stage);

    switch (format) {
      case 'check': {
        // 1. 【看圖選注音·對的打 ✔】
        const container = document.createElement('div');
        container.className = 'exam-check-container';
        container.innerHTML = `
          <div class="exam-check-pic-wrapper">
            <span class="exam-check-pic-emoji">${q.icon || '🐊'}</span>
            <span class="exam-check-pic-label">${addZhuyinRuby(q.word || '')}</span>
          </div>
          <div style="font-size:15px;font-weight:900;color:#475569;">👇 請在正確的注音括號中打「✔」：</div>
          <div class="exam-check-options-row" id="exam-check-row"></div>
        `;
        const row = container.querySelector('#exam-check-row');
        shuffled.forEach(optText => {
          const card = document.createElement('button');
          card.className = 'exam-check-card';
          card.innerHTML = `
            <span class="check-box-bracket">( <span class="check-mark-sym">&nbsp;&nbsp;</span> )</span>
            <span class="check-opt-zhuyin">${optText}</span>
          `;
          card.addEventListener('click', () => {
            card.classList.add('checked-active');
            const sym = card.querySelector('.check-mark-sym');
            if (sym) sym.textContent = '✔';
            window.audioEngine.playPop();
            onAnswer(card, optText, q);
          });
          row.appendChild(card);
        });
        optionsGrid.appendChild(container);
        break;
      }

      case 'circle': {
        // 2. 【圈出正確的注音·紅筆圈詞 ⭕】
        const container = document.createElement('div');
        container.className = 'exam-circle-container';
        container.innerHTML = `
          <div class="exam-circle-header">
            <span style="font-size:24px;">${q.icon || '✏️'}</span>
            <span>請用紅筆圈出完全正確的注音：</span>
          </div>
          <div class="exam-circle-choices-row" id="exam-circle-row"></div>
        `;
        const row = container.querySelector('#exam-circle-row');
        shuffled.forEach(optText => {
          const card = document.createElement('button');
          card.className = 'exam-circle-card';
          card.innerHTML = `
            <span class="circle-card-text">${addZhuyinRuby(optText)}</span>
            <svg class="red-circle-stroke" viewBox="0 0 160 80">
              <ellipse cx="80" cy="40" rx="74" ry="34" />
            </svg>
          `;
          card.addEventListener('click', () => {
            card.classList.add('circled-active');
            window.audioEngine.playPop();
            onAnswer(card, optText, q);
          });
          row.appendChild(card);
        });
        optionsGrid.appendChild(container);
        break;
      }

      case 'connect': {
        // 3. 【連連看·拉線配對 ➔】
        const container = document.createElement('div');
        container.className = 'exam-connect-container';

        let sourceText = q.word || '連連看';
        if (sourceText.includes('→')) sourceText = sourceText.split('→')[0].trim();

        container.innerHTML = `
          <div class="connect-left-col">
            <div class="connect-peg source-peg">
              <span class="peg-text">${addZhuyinRuby(sourceText)}</span>
              <span class="peg-dot">●</span>
            </div>
          </div>
          <div style="font-size:28px;color:#3B82F6;font-weight:900;">➔ 連向 ➔</div>
          <div class="connect-right-col" id="connect-right-col"></div>
        `;
        const rightCol = container.querySelector('#connect-right-col');
        shuffled.forEach(optText => {
          const peg = document.createElement('button');
          peg.className = 'connect-peg target-peg';
          peg.innerHTML = `
            <span class="peg-dot">●</span>
            <span class="peg-text">${addZhuyinRuby(optText)}</span>
          `;
          peg.addEventListener('click', () => {
            peg.classList.add('connected');
            window.audioEngine.playPop();
            onAnswer(peg, optText, q);
          });
          rightCol.appendChild(peg);
        });
        optionsGrid.appendChild(container);
        break;
      }

      case 'fill': {
        // 4. 【看圖填一填·九宮格填字 ❓】
        const container = document.createElement('div');
        container.className = 'exam-fill-container';

        let targetWord = q.word || '';
        container.innerHTML = `
          <div class="exam-fill-target-card">
            <span class="fill-pic-icon">${q.icon || '🖼️'}</span>
            <div class="fill-slots-row">
              <div class="fill-box empty-slot" id="target-fill-slot">❓</div>
              <div class="fill-box">${addZhuyinRuby(targetWord)}</div>
            </div>
          </div>
          <div style="font-size:15px;font-weight:900;color:#475569;">👇 點選正確注音推進空格中：</div>
          <div class="exam-fill-candidates-row" id="exam-fill-row"></div>
        `;
        const candidatesRow = container.querySelector('#exam-fill-row');
        shuffled.forEach(optText => {
          const tile = document.createElement('button');
          tile.className = 'fill-candidate-tile';
          tile.textContent = optText;
          tile.addEventListener('click', () => {
            const slot = document.getElementById('target-fill-slot');
            if (slot) {
              slot.textContent = optText;
              slot.classList.remove('empty-slot');
              slot.style.background = '#D1FAE5';
              slot.style.borderColor = '#10B981';
            }
            window.audioEngine.playPop();
            onAnswer(tile, optText, q);
          });
          candidatesRow.appendChild(tile);
        });
        optionsGrid.appendChild(container);
        break;
      }

      case 'combine': {
        // 5. 【先拼音再造詞·加法合成板 ＋】
        const container = document.createElement('div');
        container.className = 'exam-combine-container';

        let p = q.prompt || '';
        let partA = '聲母', partB = '韻母';
        const m = p.match(/「([ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ])」[\s\S]*?「([ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ]+)」/);
        if (m) {
          partA = m[1];
          partB = m[2];
        }

        container.innerHTML = `
          <div class="combine-formula-board">
            <div class="formula-block">${partA}</div>
            <span class="formula-symbol">＋</span>
            <div class="formula-block">${partB}</div>
            <span class="formula-symbol">＝</span>
            <div class="formula-block result-slot" id="combine-res-slot">❓</div>
          </div>
          <div style="font-size:15px;font-weight:900;color:#475569;">👇 點選拼出的完整組合：</div>
          <div class="exam-combine-options-row" id="combine-options-row"></div>
        `;
        const optRow = container.querySelector('#combine-options-row');
        shuffled.forEach(optText => {
          const btn = document.createElement('button');
          btn.className = 'combine-opt-btn';
          btn.innerHTML = addZhuyinRuby(optText);
          btn.addEventListener('click', () => {
            const slot = document.getElementById('combine-res-slot');
            if (slot) slot.textContent = optText;
            window.audioEngine.playPop();
            onAnswer(btn, optText, q);
          });
          optRow.appendChild(btn);
        });
        optionsGrid.appendChild(container);
        break;
      }

      case 'tone': {
        // 6. 【填上聲調符號·蓋聲調印章 🔘】
        const container = document.createElement('div');
        container.className = 'exam-tone-container';

        let targetChar = '';
        const m = (q.prompt || '').match(/「([^」]+)」是第幾聲/);
        if (m) targetChar = m[1];

        container.innerHTML = `
          <div class="tone-sentence-card">
            <span class="sentence-icon">${q.icon || '🎶'}</span>
            <div class="sentence-text-display">
              ${addZhuyinRuby((q.prompt || '').replace(/【[^】]+】/, ''))}
              <span class="tone-target-highlight" id="tone-target-box">【 ${addZhuyinRuby(targetChar || '標調目標')} 】</span>
            </div>
          </div>
          <div style="font-size:15px;font-weight:900;color:#475569;">🔘 選擇要蓋上的聲調印章：</div>
          <div class="stamps-grid" id="tone-stamps-grid"></div>
        `;
        const stampsGrid = container.querySelector('#tone-stamps-grid');
        const toneMarksMap = {
          '第一聲': 'ˉ',
          '第二聲': 'ˊ',
          '第三聲': 'ˇ',
          '第四聲': 'ˋ',
          '輕聲': '˙'
        };
        shuffled.forEach(optText => {
          const stampBtn = document.createElement('button');
          stampBtn.className = 'tone-stamp-btn';
          const mark = toneMarksMap[optText] || '？';
          stampBtn.innerHTML = `
            <span class="stamp-mark">${mark}</span>
            <span class="stamp-name">${addZhuyinRuby(optText)}</span>
          `;
          stampBtn.addEventListener('click', () => {
            const box = document.getElementById('tone-target-box');
            if (box) {
              box.textContent = `【 ${targetChar} ${mark} 】`;
              box.style.background = '#FCA5A5';
              box.style.color = '#991B1B';
            }
            window.audioEngine.playPop();
            onAnswer(stampBtn, optText, q);
          });
          stampsGrid.appendChild(stampBtn);
        });
        optionsGrid.appendChild(container);
        break;
      }

      case 'reading': {
        // 7. 【兒歌閱讀測驗·課文賞析 📜】
        const container = document.createElement('div');
        container.className = 'exam-reading-container';
        container.innerHTML = `
          <div style="font-size:16px;font-weight:900;color:#B45309;margin-bottom:12px;text-align:center;">
            👇 請從上方兒歌短文中找尋答案，點選正確招式：
          </div>
          <div class="reading-options-row" id="reading-options-row"></div>
        `;
        const optRow = container.querySelector('#reading-options-row');
        shuffled.forEach(optText => {
          const btn = document.createElement('button');
          btn.className = `battle-opt-btn ${optText.length > 3 ? 'long-text' : ''}`;
          btn.innerHTML = addZhuyinRuby(optText);
          btn.addEventListener('click', () => {
            window.audioEngine.playPop();
            onAnswer(btn, optText, q);
          });
          optRow.appendChild(btn);
        });
        optionsGrid.appendChild(container);
        break;
      }

      default: {
        // 標準招式選項
        shuffled.forEach(optText => {
          const btn = document.createElement('button');
          btn.className = `battle-opt-btn ${optText.length > 3 ? 'long-text' : ''}`;
          btn.innerHTML = addZhuyinRuby(optText);
          btn.addEventListener('click', () => {
            onAnswer(btn, optText, q);
          });
          optionsGrid.appendChild(btn);
        });
        break;
      }
    }
  }


  function handleBattleAnswer(btn, chosenText, q) {
    if (state.adventure.isAnswering) return;
    const stage = state.adventure.activeStage;
    const isShiny = state.adventure.isCurrentShiny;

    if (chosenText === q.answer) {
      // 答對！發動夥伴大絕招突擊動畫並丟出寶貝球收服！
      state.adventure.isAnswering = true;
      state.adventure.combo++;
      if (btn) btn.classList.add('correct-choice');

      const partnerObj = getCurrentPartnerInfo();

      // 1. 夥伴大招動畫衝擊
      executePlayerAttack(partnerObj, q, () => {
        // 2. 拋球與收服流程
        const flyingBall = document.getElementById('flying-pokeball');
        const oppSprite = document.getElementById('poke-opp-sprite');
        const stadium = document.getElementById('pokemon-battle-field');

        if (flyingBall) {
          flyingBall.className = 'flying-pokeball throw-arc';
        }
        window.audioEngine.playPokeThrow();

        // 0.65秒後：球到達野生動物前方空中，開啟並射出紅色捕捉吸入光束！
        setTimeout(() => {
          if (flyingBall) {
            flyingBall.className = 'flying-pokeball ball-open';
          }
          window.audioEngine.playPokeBeam();

          // 產生紅色能量光錐
          if (stadium) {
            const oldBeam = document.getElementById('capture-beam-cone');
            if (oldBeam) oldBeam.remove();
            const beamEl = document.createElement('div');
            beamEl.id = 'capture-beam-cone';
            beamEl.className = 'capture-beam-cone';
            stadium.appendChild(beamEl);
          }

          // 🐾 重磅亮點：野生動物化作紅色能量、旋轉縮小吸入寶貝球！
          if (oppSprite) {
            oppSprite.classList.add('animal-sucked-in');
          }

          // 0.65秒後：動物完全吸入球心！光束消失，寶貝球啪一聲合上並掉落到地面草皮！
          setTimeout(() => {
            const beam = document.getElementById('capture-beam-cone');
            if (beam) beam.remove();

            if (flyingBall) {
              flyingBall.className = 'flying-pokeball ball-drop';
            }

            // 0.45秒後：寶貝球掉落在地面草皮，開始左右晃動三次！
            setTimeout(() => {
              if (flyingBall) {
                flyingBall.className = 'flying-pokeball ball-wobble-ground';
              }
              window.audioEngine.playPokeShake();

              setTimeout(() => window.audioEngine.playPokeShake(), 500);
              setTimeout(() => window.audioEngine.playPokeShake(), 1000);

              // 1.6秒後成功收服！金色光芒迸發
              setTimeout(() => {
                window.audioEngine.playPokeCaught();
                if (window.confetti) window.confetti.trigger(isShiny ? 90 : 50);

                // 收服至注音圖鑑
                if (!state.pokedexCaught.includes(q.answer) && ZHUYIN_DATA.symbols.some(s => s.char === q.answer)) {
                  state.pokedexCaught.push(q.answer);
                  localStorage.setItem('zhuyin_caught_symbols', JSON.stringify(state.pokedexCaught));
                  updatePokedexProgressUI();
                  renderGallery();
                }

                // 獎勵星星與寶貝球 (閃光神獸雙倍獎勵)
                const starBonus = isShiny ? 2 : 1;
                addStars(starBonus, false);
                state.balls = Math.min(99, state.balls + (isShiny ? 3 : 1));
                localStorage.setItem('zhuyin_balls', state.balls.toString());

                updateTrainerHeaderUI();

                const oppNameEl = document.getElementById('poke-opp-name');
                const sym = ZHUYIN_DATA.symbols.find(s => s.char === q.answer);
                if (oppNameEl) {
                  oppNameEl.textContent = sym ? `收服成功：【${sym.char}】${sym.pokeName}` : `收服成功！`;
                }
                setMascotSpeech(isShiny
                  ? `✨ 太神了！收服了【稀有閃光精靈】！獲得雙倍星星與精靈球！`
                  : `✨ 叮！太棒了！成功收服【${q.answer}】！圖鑑已登錄！`
                );

                state.adventure.qIndex++;
                updateBattleHeaderUI();

                setTimeout(() => {
                  if (flyingBall) flyingBall.className = 'flying-pokeball';
                  if (oppSprite) {
                    oppSprite.classList.remove('animal-sucked-in');
                    oppSprite.style.opacity = '1';
                    oppSprite.style.transform = '';
                    oppSprite.style.filter = '';
                  }
                  renderCurrentStageQuestion();
                }, 1200);
              }, 1600);
            }, 450);
          }, 650);
        }, 650);
      });

    } else {
      // 答錯！精靈掙脫並反擊！
      if (btn) btn.classList.add('wrong-choice');
      state.adventure.combo = 0;
      state.adventure.mistakes++;
      if (state.adventure.hearts > 1) {
        state.adventure.hearts--;
      }
      updateBattleHeaderUI();

      window.audioEngine.playWrong();
      setMascotSpeech('「哎呀！野生精靈掙脫了！再仔細聽一次題目發音吧！」');
      window.audioEngine.speak('這個不對，再聽一次！');
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
        <div style="text-align:center;padding:20px 12px;animation:fadeIn 0.4s ease;">
          <div style="font-size:62px;margin-bottom:8px;">${badge ? badge.icon : '🏅'}</div>
          <h2 style="font-size:26px;font-weight:900;color:#DC2626;margin-bottom:6px;">
            道館挑戰大成功！榮獲【${badge ? badge.name : '榮譽徽章'}】！
          </h2>
          <div style="font-size:38px;margin:10px 0;letter-spacing:8px;">
            ${starIcons}
          </div>
          <p style="font-size:16px;font-weight:800;color:#475569;margin-bottom:14px;">
            擊敗道館館主【${stage.bossIcon} ${stage.bossName}】，獲得 <strong>+${earnedStars * 2} 顆金星星</strong> 與 <strong>+${earnedStars * 3} 顆寶貝球</strong>！
          </p>

          <!-- 🎁 道館神秘大寶箱 (點擊開啟爆出神裝與補給) -->
          <div class="mystery-chest-box" id="mystery-chest-box">
            <div class="mystery-chest-icon" id="chest-icon">🎁</div>
            <h3 style="font-size:18px;color:#B45309;font-weight:900;margin:6px 0;" id="chest-title">
              點擊開啟【${badge ? badge.name : '道館'}神祕大寶箱】！
            </h3>
            <p style="font-size:14px;color:#78350F;font-weight:700;margin:0;" id="chest-desc">
              內含大師球、超級球、傷藥與探險夥伴經驗值！
            </p>
            <div id="chest-rewards-row" style="display:none;margin-top:12px;gap:8px;justify-content:center;flex-wrap:wrap;"></div>
          </div>

          <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-top:18px;">
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

      // 寶箱點擊解鎖豐富獎勵
      const chestBox = document.getElementById('mystery-chest-box');
      if (chestBox) {
        chestBox.addEventListener('click', () => {
          if (chestBox.dataset.opened) return;
          chestBox.dataset.opened = 'true';
          window.audioEngine.playChestOpen();
          if (window.confetti) window.confetti.trigger(80);

          addStars(3, false);
          state.balls = Math.min(99, state.balls + 5);
          localStorage.setItem('zhuyin_balls', state.balls.toString());
          addPartnerExp(100);
          updateTrainerHeaderUI();

          const chestIcon = document.getElementById('chest-icon');
          const chestTitle = document.getElementById('chest-title');
          const chestDesc = document.getElementById('chest-desc');
          const rewardsRow = document.getElementById('chest-rewards-row');

          if (chestIcon) chestIcon.textContent = '🎉';
          if (chestTitle) chestTitle.textContent = '🎊 獲得道館過關大獎賞！';
          if (chestDesc) chestDesc.textContent = '冒險星星與精靈球已全數發放！';
          if (rewardsRow) {
            rewardsRow.style.display = 'flex';
            rewardsRow.innerHTML = `
              <span style="background:#FEF3C7;border:2px solid #F59E0B;color:#78350F;padding:6px 14px;border-radius:12px;font-weight:900;font-size:15px;">⭐ 過關星星 +3</span>
              <span style="background:#FEE2E2;border:2px solid #EF4444;color:#B91C1C;padding:6px 14px;border-radius:12px;font-weight:900;font-size:15px;">🔴 精靈球 +5</span>
              <span style="background:#EFF6FF;border:2px solid #3B82F6;color:#1D4ED8;padding:6px 14px;border-radius:12px;font-weight:900;font-size:15px;">⚡ 夥伴親密度經驗 +100</span>
            `;
          }
        });
      }

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
    
    dom.gameArena.innerHTML = `
      <div class="game-status-bar">
        <div class="game-prompt-large">
          <span>🎧 仔細聽老師唸的聲音，戳破正確的注音氣球！</span>
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
      { word: '太陽', targetPart: '太', toneId: 4, zhuyin: 'ㄊㄞˋ' },
      { word: '小魚', targetPart: '魚', toneId: 2, zhuyin: 'ㄩˊ' },
      { word: '小鳥', targetPart: '鳥', toneId: 3, zhuyin: 'ㄋㄧㄠˇ' },
      { word: '媽媽', targetPart: '媽(前字)', toneId: 1, zhuyin: 'ㄇㄚ' },
      { word: '白鵝', targetPart: '鵝', toneId: 2, zhuyin: 'ㄜˊ' },
      { word: '斑馬', targetPart: '斑', toneId: 1, zhuyin: 'ㄅㄢ' }
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
      { id: 1, text: '第一聲' },
      { id: 2, text: '第二聲' },
      { id: 3, text: '第三聲' },
      { id: 4, text: '第四聲' }
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
