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
    coins: parseInt(localStorage.getItem('zhuyin_coins') || '60', 10),

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
    allPartnersData: JSON.parse(localStorage.getItem('zhuyin_all_partners_data') || '{}'),

    pokedexCaught: JSON.parse(localStorage.getItem('zhuyin_caught_symbols') || '["ㄅ","ㄆ","ㄇ"]'),
    gen1Caught: JSON.parse(localStorage.getItem('zhuyin_caught_gen1') || '[1, 4, 7, 25, 133]'),

    examDifficulty: localStorage.getItem('zhuyin_exam_difficulty') || 'midterm',
    pokedexMode: 'gen1',
    stones: JSON.parse(localStorage.getItem('zhuyin_evolution_stones') || 'null') || {
      thunder: 1, // ⚡ 雷之石 (預載 1 顆供玩家立即體驗皮卡丘/伊布進化)
      water: 1,   // 💧 水之石
      fire: 1,    // 🔥 火之石
      leaf: 1,    // 🌿 葉之石
      moon: 1     // 🌙 月之石
    }, // 'midterm' (期中考) 或 'final' (期末考)



    // 🗺️ 闖關道館大冒險狀態 (Gym Adventure Campaign)

    adventure: {

      stageStars: JSON.parse(localStorage.getItem('zhuyin_stage_progress_midterm') || localStorage.getItem('zhuyin_stage_progress') || '{}'),
      stageStarsFinal: JSON.parse(localStorage.getItem('zhuyin_stage_progress_final') || '{}'),

      unlockAll: false,

      activeStage: null,

      qIndex: 0,

      hearts: 3,

      combo: 0,

      mistakes: 0,
      score: 0,

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

  window.state = state;



  // ==========================================

  // DOM 元素快取

  // ==========================================

  if (typeof window !== 'undefined') window.__appState = state;

  const dom = {

    starCount: document.getElementById('global-star-count'),
    coinCount: document.getElementById('global-coin-count'),
    headerCoinBtn: document.getElementById('header-coin-btn'),

    ballCount: document.getElementById('global-ball-count'),

    playerRankIcon: document.getElementById('player-rank-icon'),

    playerRankTitle: document.getElementById('player-rank-title'),
    playerPartnerLvl: document.getElementById('player-partner-lvl'),

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

  
  // ==========================================
  // 🛍️ 寶可夢夥伴培育商店與禮物換購系統 (Nurture Shop System)
  // ==========================================
  const POKEMON_NURTURE_ITEMS = [
    {
      id: 'stone_thunder',
      stoneType: 'thunder',
      name: '⚡ 雷之石',
      icon: '⚡',
      tag: '屬性寶石',
      tagColor: '#D97706',
      tagBg: '#FEF3C7',
      price: 150,
      desc: '蘊含雷電神力的進化石！能讓【皮卡丘】進化為【雷丘】、讓【伊布】進化為【雷伊布】！',
      actionText: '換購寶石',
      sound: 'playBadgeGet'
    },
    {
      id: 'stone_water',
      stoneType: 'water',
      name: '💧 水之石',
      icon: '💧',
      tag: '屬性寶石',
      tagColor: '#2563EB',
      tagBg: '#EFF6FF',
      price: 150,
      desc: '散發水藍光澤的進化石！能讓【伊布】進化為【水伊布】、【蚊香君】進化為【蚊香泳士】、【大舌貝】進化為【刺甲貝】、【海星星】進化為【寶石海星】！',
      actionText: '換購寶石',
      sound: 'playBadgeGet'
    },
    {
      id: 'stone_fire',
      stoneType: 'fire',
      name: '🔥 火之石',
      icon: '🔥',
      tag: '屬性寶石',
      tagColor: '#DC2626',
      tagBg: '#FEF2F2',
      price: 150,
      desc: '如火焰般燃燒的進化石！能讓【伊布】進化為【火伊布】、【六尾】進化為【九尾】、【卡蒂狗】進化為【風速狗】！',
      actionText: '換購寶石',
      sound: 'playBadgeGet'
    },
    {
      id: 'stone_leaf',
      stoneType: 'leaf',
      name: '🌿 葉之石',
      icon: '🌿',
      tag: '屬性寶石',
      tagColor: '#059669',
      tagBg: '#ECFDF5',
      price: 150,
      desc: '描繪著植物葉片的進化石！能讓【臭臭花】進化為【霸王花】、【口呆花】進化為【大食花】、【蛋蛋】進化為【椰蛋樹】！',
      actionText: '換購寶石',
      sound: 'playBadgeGet'
    },
    {
      id: 'stone_moon',
      stoneType: 'moon',
      name: '🌙 月之石',
      icon: '🌙',
      tag: '屬性寶石',
      tagColor: '#7C3AED',
      tagBg: '#F5F3FF',
      price: 150,
      desc: '泛著夜空月影光芒的寶石！能讓【皮皮】進化為【皮可西】、【胖丁】進化為【胖可丁】、【尼多娜】進化為【尼多后】、【尼多力諾】進化為【尼多王】！',
      actionText: '換購寶石',
      sound: 'playBadgeGet'
    },
    {
      id: 'master_candy',
      name: '終極滿級金色糖果',
      icon: '🌟',
      tag: '👑 滿級突破',
      tagColor: '#B45309',
      tagBg: '#FEF3C7',
      price: 100,
      exp: 999999,
      desc: '傳說中散發七彩金光的極致糖果！餵食夥伴瞬間直升滿級 Lv.100，完成終極訓練並在圖鑑銘刻金色皇冠標誌！',
      actionText: '直達滿級',
      sound: 'playBadgeGet'
    },
    {
      id: 'rare_candy',
      name: '神奇經驗糖果',
      icon: '🍬',
      tag: '⭐ 快速升級',
      tagColor: '#3B82F6',
      tagBg: '#EFF6FF',
      price: 50,
      exp: 60,
      desc: '寶可夢最愛的星形糖果，餵食夥伴一口氣獲得 +60 點經驗值，加速升級與突破！',
      actionText: '換購餵食',
      sound: 'playPowerUp'
    },
    {
      id: 'hearty_cake',
      name: '元氣愛心蛋糕',
      icon: '🍰',
      tag: '💖 滿腹大補',
      tagColor: '#EC4899',
      tagBg: '#FDF2F8',
      price: 100,
      exp: 150,
      desc: '甜點名師烘焙的元氣愛心蛋糕，餵食夥伴直接吸收 +150 點超量經驗，等級大幅飛升！',
      actionText: '換購餵食',
      sound: 'playPowerUp'
    },
    {
      id: 'evolution_stone',
      name: '屬性神奇進化石',
      icon: '⚡',
      tag: '💥 突破進化',
      tagColor: '#D97706',
      tagBg: '#FFFBEB',
      price: 180,
      exp: 300,
      desc: '凝聚自然元素神力的石頭！餵食注入 +300 點巨量經驗，達到門檻將引發震撼大進化！',
      actionText: '激發進化',
      sound: 'playBadgeGet'
    },
    {
      id: 'berry_box',
      name: '甜甜蜜莓果盒',
      icon: '🍓',
      tag: '🌱 平價美味',
      tagColor: '#059669',
      tagBg: '#ECFDF5',
      price: 30,
      exp: 35,
      desc: '樹果森林摘採的甜美莓果拼盤，一口氣獲得 +35 經驗值並大幅提升夥伴親密度！',
      actionText: '換購餵食',
      sound: 'playPop'
    },
    {
      id: 'rainbow_jelly',
      name: '彩虹能量果凍',
      icon: '🌈',
      tag: '✨ 元氣滿分',
      tagColor: '#7C3AED',
      tagBg: '#F5F3FF',
      price: 130,
      exp: 200,
      desc: '閃耀七彩光芒的晶瑩果凍，瞬間充填充沛體力，餵食夥伴獲得 +200 點高額經驗！',
      actionText: '換購餵食',
      sound: 'playPowerUp'
    },
    {
      id: 'champion_crown',
      name: '王者冠軍王冠',
      icon: '👑',
      tag: '🏆 榮耀光環',
      tagColor: '#DC2626',
      tagBg: '#FEF2F2',
      price: 250,
      type: 'crown',
      desc: '象徵道館最強王者的榮耀禮物！配戴後頭頂發光，答對題目金幣翻倍（每題 +20 幣）！',
      actionText: '榮耀配戴',
      sound: 'playBadgeGet'
    }
  ];

  function updateCoinsDisplay() {
    const coinEl = document.getElementById('global-coin-count');
    const walletEl = document.getElementById('shop-wallet-amount');
    if (coinEl) {
      coinEl.textContent = state.coins || 0;
      if (coinEl.parentElement) {
        coinEl.parentElement.classList.remove('coin-bump');
        void coinEl.parentElement.offsetWidth; // reflow
        coinEl.parentElement.classList.add('coin-bump');
      }
    }
    if (walletEl) walletEl.textContent = state.coins || 0;
  }

  function addCoins(amount, showFloat = true) {
    state.coins = Math.max(0, (state.coins || 0) + amount);
    localStorage.setItem('zhuyin_coins', state.coins.toString());
    updateCoinsDisplay();

    if (showFloat && amount > 0) {
      showFloatingCoinsReward(amount);
    }
  }

  function showFloatingCoinsReward(amount) {
    const badge = document.createElement('div');
    badge.className = 'floating-coin-badge';
    badge.innerHTML = `+${amount} 💰 金幣`;
    badge.style.left = '50%';
    badge.style.top = '40%';
    document.body.appendChild(badge);
    setTimeout(() => {
      badge.remove();
    }, 1200);
  }

  function renderNurtureShop() {
    const partner = getCurrentPartnerInfo();
    const baseStarter = (ZHUYIN_DATA.starterPokemon || []).find(p => p.id === state.partner) || (ZHUYIN_DATA.starterPokemon && ZHUYIN_DATA.starterPokemon[0]) || { name: '皮卡丘' };

    const avatarEl = document.getElementById('shop-partner-avatar');
    const nameEl = document.getElementById('shop-partner-name');
    const levelEl = document.getElementById('shop-partner-level');
    const crownBadge = document.getElementById('shop-crown-badge');
    const expText = document.getElementById('shop-exp-text');
    const expFill = document.getElementById('shop-exp-fill');
    const evoTargetEl = document.getElementById('shop-evolution-target');
    const statusDescEl = document.getElementById('shop-partner-status-desc');
    const walletEl = document.getElementById('shop-wallet-amount');

    if (avatarEl) avatarEl.innerHTML = getPokemonAvatarHtml(partner);
    if (nameEl) nameEl.innerHTML = formatZhuyinDisplay(partner.name);

    // 🔴 檢查當前夥伴是否擁有「屬性寶石」進化需求（如皮卡丘雷之石、伊布分支進化等）
    const stoneBannerWrap = document.getElementById('shop-partner-stone-evo-wrap') || (() => {
      const wrap = document.createElement('div');
      wrap.id = 'shop-partner-stone-evo-wrap';
      const metaBox = document.querySelector('.nurture-partner-meta');
      if (metaBox) metaBox.appendChild(wrap);
      return wrap;
    })();

    if (stoneBannerWrap && typeof GEN1_POKEMON_LIST !== 'undefined') {
      let g1P = null;
      if (state.partner.startsWith('gen1_')) {
        g1P = GEN1_POKEMON_LIST.find(p => p.id === parseInt(state.partner.replace('gen1_', '')));
      } else if (state.partner === 'pikachu') g1P = GEN1_POKEMON_LIST.find(p => p.id === 25);
      else if (state.partner === 'eevee') g1P = GEN1_POKEMON_LIST.find(p => p.id === 133);

      if (g1P && g1P.evolution) {
        if (g1P.evolution.method === 'stone') {
          const sType = g1P.evolution.stone;
          const sCount = (state.stones && state.stones[sType]) || 0;
          const targetEvo = GEN1_POKEMON_LIST.find(p => p.id === g1P.evolution.evolvesToId);
          stoneBannerWrap.innerHTML = `
            <div style="margin-top:14px;background:#FFFBEB;border:2px solid #F59E0B;border-radius:14px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:26px;">⚡</span>
                <div>
                  <div style="font-weight:900;color:#92400E;font-size:15px;">💎 屬性寶石進化：需要【${g1P.evolution.stoneName}】</div>
                  <div style="font-size:13px;color:#B45309;margin-top:2px;">擁有數量：<strong style="color:#DC2626;font-size:15px;">${sCount}</strong> 顆</div>
                </div>
              </div>
              <button class="btn-use-stone" style="background:#F59E0B;color:#FFF;border:none;padding:8px 18px;border-radius:20px;font-weight:900;cursor:pointer;box-shadow:0 3px 0 #D97706;transition:transform 0.15s;" onclick="window.useEvolutionStoneOnPartner('${sType}', ${g1P.evolution.evolvesToId})">
                ⚡ 使用【${g1P.evolution.stoneName}】進化為【${targetEvo ? targetEvo.name : g1P.evolution.evolvesToName}】！
              </button>
            </div>
          `;
        } else if (g1P.evolution.method === 'branch_stone' && g1P.evolution.branches) {
          stoneBannerWrap.innerHTML = `
            <div style="margin-top:14px;background:#F8FAFC;border:2px solid #CBD5E1;border-radius:16px;padding:14px 18px;">
              <div style="font-weight:900;color:#1E293B;font-size:15px;margin-bottom:10px;display:flex;align-items:center;gap:6px;">
                <span>🦊</span> <strong>伊布多元屬性寶石分支進化</strong>（三大形態自由選擇）：
              </div>
              <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:10px;">
                ${g1P.evolution.branches.map(b => {
                  const bCount = (state.stones && state.stones[b.stone]) || 0;
                  const bColors = { water: '#3B82F6', thunder: '#F59E0B', fire: '#EF4444' };
                  const bIcons = { water: '💧', thunder: '⚡', fire: '🔥' };
                  return `
                    <button class="btn-use-stone" style="background:${bColors[b.stone] || '#3B82F6'};color:#FFF;border:none;padding:10px;border-radius:14px;font-weight:900;cursor:pointer;box-shadow:0 3px 0 rgba(0,0,0,0.2);display:flex;flex-direction:column;align-items:center;gap:4px;" onclick="window.useEvolutionStoneOnPartner('${b.stone}', ${b.evolvesToId})">
                      <span>${bIcons[b.stone]} ${b.stoneName} (${bCount}顆)</span>
                      <span style="font-size:12px;opacity:0.95;">進化為【${b.evolvesToName}】</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        } else {
          stoneBannerWrap.innerHTML = '';
        }
      } else {
        stoneBannerWrap.innerHTML = '';
      }
    }
    if (levelEl) {
      if (partner.level >= MAX_PARTNER_LEVEL) {
        levelEl.innerHTML = `<span style="color:#F59E0B;font-weight:900;">👑 滿級 Lv.100</span> <span style="font-size:12px;background:#FEF3C7;color:#B45309;padding:2px 8px;border-radius:10px;font-weight:900;border:1px solid #FCD34D;">終極訓練完成</span>`;
      } else {
        levelEl.textContent = `Lv.${partner.level}`;
      }
    }
    if (crownBadge) crownBadge.style.display = (state.partnerData && state.partnerData.crown) ? 'inline-flex' : 'none';

    if (partner.level >= MAX_PARTNER_LEVEL) {
      if (expFill) {
        expFill.style.width = '100%';
        expFill.style.background = 'linear-gradient(90deg, #F59E0B, #FBBF24)';
      }
      if (expText) expText.textContent = `EXP MAX / 100% (滿級終極訓練完成)`;
    } else {
      const pct = Math.min(100, Math.round((partner.exp / (partner.maxExp || 100)) * 100));
      if (expFill) {
        expFill.style.width = `${pct}%`;
        expFill.style.background = '';
      }
      if (expText) expText.textContent = `${partner.exp} / ${partner.maxExp} EXP`;
    }

    if (walletEl) walletEl.textContent = state.coins || 0;

    // 進化目標提示
    if (evoTargetEl) {
      // 🔴 檢查是否為需屬性寶石進化的寶可夢（如皮卡丘、伊布、六尾、卡蒂狗等）
      const g1Partner = (typeof GEN1_POKEMON_LIST !== 'undefined' && partner.gen1Id)
        ? GEN1_POKEMON_LIST.find(p => p.id === partner.gen1Id)
        : null;
      const isStoneEvo = g1Partner && g1Partner.evolution && (g1Partner.evolution.method === 'stone' || g1Partner.evolution.method === 'branch_stone');

      if (isStoneEvo) {
        if (g1Partner.evolution.method === 'stone') {
          const sCount = (state.stones && state.stones[g1Partner.evolution.stone]) || 0;
          evoTargetEl.innerHTML = `💎 需要使用【${g1Partner.evolution.stoneName}】才能進化為【${g1Partner.evolution.evolvesToName}】！（目前擁有 ${sCount} 顆，可至下方換購）`;
        } else if (g1Partner.evolution.method === 'branch_stone') {
          evoTargetEl.innerHTML = `💎 擁有三種屬性寶石分支進化形態（水之石/雷之石/火之石，可至下方換購）！`;
        }
      } else {
        const nextEvo1 = (partner.stageNames && partner.stageNames[1]) ? partner.stageNames[1] : ((baseStarter.evolutions && baseStarter.evolutions[1]) ? baseStarter.evolutions[1].name : '下一階形態');
        const nextEvo2 = (partner.stageNames && partner.stageNames[2]) ? partner.stageNames[2] : ((baseStarter.evolutions && baseStarter.evolutions[2]) ? baseStarter.evolutions[2].name : '最終究極形態');

        if (partner.stageIdx === 0 && nextEvo1 !== partner.name) {
          const neededLv = Math.max(1, 16 - partner.level);
          evoTargetEl.innerHTML = `🌟 達成 <strong>Lv.16</strong> 即將進化為：【${nextEvo1}】！（還差 ${neededLv} 級）`;
        } else if (partner.stageIdx === 1 && nextEvo2 !== partner.name) {
          const neededLv = Math.max(1, 36 - partner.level);
          evoTargetEl.innerHTML = `🌟 達成 <strong>Lv.36</strong> 即將究極進化為：【${nextEvo2}】！（還差 ${neededLv} 級）`;
        } else {
          evoTargetEl.innerHTML = `👑 恭喜！【${partner.name}】已達到目前可培育的最高型態！`;
        }
      }
    }

    if (statusDescEl) {
      if (partner.level >= 36) {
        statusDescEl.textContent = `⚡ 戰力巔峰！神獸級的氣勢，隨時可以在道館中施展最強奧義【${partner.move}】！`;
      } else if (partner.level >= 16) {
        statusDescEl.textContent = `🔥 實力強勁！正朝著最終究極進化全速前進，多吃經驗糖果即可突破！`;
      } else {
        statusDescEl.textContent = `🌱 活潑健康！準備好接受美味甜點與神奇糖果的培育了嗎？`;
      }
    }

    // 渲染商品清單
    const catalogTitleEl = document.getElementById('shop-catalog-title');
    if (catalogTitleEl) {
      catalogTitleEl.innerHTML = '🎁 ' + formatZhuyinDisplay('寶可夢培育禮物與神奇道具');
    }

    const gridEl = document.getElementById('shop-items-grid');
    if (!gridEl) return;
    gridEl.innerHTML = '';

    const btnShopSwitch = document.getElementById('btn-shop-switch-partner');
    if (btnShopSwitch && !btnShopSwitch.dataset.bound) {
      btnShopSwitch.dataset.bound = 'true';
      btnShopSwitch.addEventListener('click', () => {
        window.audioEngine.playPop();
        openPartnerModal();
      });
    }

    POKEMON_NURTURE_ITEMS.forEach(item => {
      const card = document.createElement('div');
      card.className = 'shop-item-card';

      const isCrown = (item.type === 'crown');
      const hasCrown = Boolean(state.partnerData && state.partnerData.crown);
      const canAfford = (state.coins >= item.price);

      let btnClass = 'shop-item-btn';
      let btnText = '';
      let btnDisabled = false;

      if (isCrown && hasCrown) {
        btnClass += ' owned-crown';
        btnText = '👑 已戴上王冠（點我取下）';
        btnDisabled = false;
      } else if (isCrown && !hasCrown && (state.partnerData && state.partnerData.ownedCrown)) {
        btnClass += ' can-buy';
        btnText = '👑 點我重新戴上王冠';
        btnDisabled = false;
      } else if (!canAfford) {
        btnClass += ' cant-buy';
        btnText = `💰 金幣不足 (${item.price}幣)`;
        btnDisabled = true;
      } else {
        btnClass += ' can-buy';
        btnText = `💰 ${item.price} ${item.actionText}`;
      }

      card.innerHTML = `
        <div class="shop-item-top">
          <span class="shop-item-badge" style="background:${item.tagBg};color:${item.tagColor};border:1.5px solid ${item.tagColor};">${item.tag}</span>
          <span class="shop-item-price-pill">💰 ${item.price} 幣</span>
        </div>
        <div class="shop-item-body">
          <div class="shop-item-icon-box">${item.icon}</div>
          <div class="shop-item-info">
            <h4>${(() => {
              const cleanItemName = item.name.replace(/^[^\u4e00-\u9fa5\w\s]+\s*/, '');
              const itemEmojiMatch = item.name.match(/^[^\u4e00-\u9fa5\w\s]+/);
              const itemEmoji = itemEmojiMatch ? itemEmojiMatch[0] : (item.icon || '');
              return (itemEmoji ? '<span class="shop-item-emoji" style="margin-right:4px;">' + itemEmoji + '</span> ' : '') + formatZhuyinDisplay(cleanItemName);
            })()}</h4>
            <p>${item.desc}</p>
          </div>
        </div>
        <button class="${btnClass}" ${btnDisabled ? 'disabled' : ''}>
          ${btnText}
        </button>
      `;

      if (!btnDisabled) {
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
          buyAndUseShopItem(item);
        });
      }

      gridEl.appendChild(card);
    });
  }

  function buyAndUseShopItem(item) {
    if (state.coins < item.price) {
      window.audioEngine.playWrong();
      setMascotSpeech(`💰 金幣不足喔！快去挑戰道館獲得 100 分賺取更多金幣吧！`);
      return;
    }

    // 扣除金幣
    state.coins -= item.price;
    localStorage.setItem('zhuyin_coins', state.coins.toString());
    updateCoinsDisplay();

    const partner = getCurrentPartnerInfo();

    if (item.type === 'crown') {
      const alreadyOwned = Boolean(state.partnerData.ownedCrown || state.partnerData.crown);
      state.partnerData.ownedCrown = true;

      // 如果已經擁有，點擊為「取下／戴上」自由切換
      if (alreadyOwned) {
        state.partnerData.crown = !state.partnerData.crown;
        // 退回金幣（因為只是切換佩戴，不重複扣幣）
        state.coins += item.price;
        localStorage.setItem('zhuyin_coins', state.coins.toString());
        updateCoinsDisplay();
      } else {
        state.partnerData.crown = true;
      }

      localStorage.setItem('zhuyin_partner_data', JSON.stringify(state.partnerData));
      const allData = getAllPartnersData();
      allData[state.partner] = { ...state.partnerData };
      saveAllPartnersData(allData);

      if (state.partnerData.crown) {
        window.audioEngine.playBadgeGet();
        if (window.confetti) window.confetti.trigger(100);
        setMascotSpeech(`👑 哇！【${partner.name}】戴上了金光閃閃的【王者冠軍王冠】！頭頂閃耀金冠與星光，答題金幣翻倍！`);
        window.audioEngine.speak(`太帥氣了！${partner.name}戴上了王者冠軍之冠！`);
      } else {
        window.audioEngine.playPop();
        setMascotSpeech(`👑 已將【${partner.name}】的冠軍王冠收回！隨時可在商店點擊重新戴上。`);
      }
      renderNurtureShop();
      updateTrainerHeaderUI();
    if (typeof ensureStartersInGen1Caught === 'function') {
          ensureStartersInGen1Caught();
    validateCurrentPartnerCaught();
    }
      return;
    } else {
      // 餵食經驗道具
      const avatarEl = document.getElementById('shop-partner-avatar');
      const heartFloater = document.getElementById('shop-heart-floater');

      if (avatarEl) {
        avatarEl.classList.remove('feed-jump-anim');
        void avatarEl.offsetWidth; // reflow
        avatarEl.classList.add('feed-jump-anim');
      }

      if (heartFloater) {
        heartFloater.textContent = item.icon === '🍓' ? '🍓' : '💖';
        heartFloater.classList.remove('heart-float-anim');
        void heartFloater.offsetWidth;
        heartFloater.classList.add('heart-float-anim');
      }

      if (window.audioEngine.playPowerUp) window.audioEngine.playPowerUp(); else window.audioEngine.playPop();
      addPartnerExp(item.exp);
    if (item.stoneType) {
      state.stones[item.stoneType] = (state.stones[item.stoneType] || 0) + 1;
      localStorage.setItem('zhuyin_evolution_stones', JSON.stringify(state.stones));
      setMascotSpeech(`✨ 獲得了【${item.name}】！目前擁有 ${state.stones[item.stoneType]} 顆！快給夥伴進化吧！`);
      renderNurtureShop();
    }

      const updatedPartner = getCurrentPartnerInfo();
      setMascotSpeech(`😋 好吃好吃！【${updatedPartner.name}】享用了【${item.name}】，親密度大幅上升，獲得了 +${item.exp} 經驗值！`);
    }

    renderNurtureShop();
    updateTrainerHeaderUI();
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
    }
  }



  /**
   * 🔴 屬性寶石進化系統（皮卡丘雷之石進化、伊布多屬性分支進化等）
   */
  function useEvolutionStoneOnPartner(stoneType, targetPokemonId) {
    if (!state.stones || !state.stones[stoneType] || state.stones[stoneType] <= 0) {
      if (window.audioEngine && window.audioEngine.playWrong) window.audioEngine.playWrong();
      const stoneNames = { thunder: '雷之石', water: '水之石', fire: '火之石', leaf: '葉之石', moon: '月之石' };
      alert('你目前沒有【' + (stoneNames[stoneType] || '屬性寶石') + '】！可以從下方培育商店用金幣換購喔！');
      const shopItem = document.getElementById('shop-item-stone_' + stoneType);
      if (shopItem) shopItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const targetP = typeof GEN1_POKEMON_LIST !== 'undefined' ? GEN1_POKEMON_LIST.find(p => p.id === targetPokemonId) : null;
    if (!targetP) return;

    // 扣除 1 顆寶石
    state.stones[stoneType]--;
    localStorage.setItem('zhuyin_evolution_stones', JSON.stringify(state.stones));

    const oldPartner = getCurrentPartnerInfo();

    // 登錄至 151 寶可夢大圖鑑
    if (!state.gen1Caught.includes(targetP.id)) {
      state.gen1Caught.push(targetP.id);
      localStorage.setItem('zhuyin_caught_gen1', JSON.stringify(state.gen1Caught));
    }

    // 更改主要夥伴
    state.partner = 'gen1_' + targetP.id;
    localStorage.setItem('zhuyin_main_partner', state.partner);
    localStorage.setItem('zhuyin_partner', state.partner);

    // 播放音效與慶祝
    if (window.audioEngine) {
      if (window.audioEngine.playBadgeGet) window.audioEngine.playBadgeGet();
      setTimeout(() => { if (window.audioEngine.playPokeCaught) window.audioEngine.playPokeCaught(); }, 500);
    }
    if (window.confetti && window.confetti.trigger) window.confetti.trigger(160);

    const stoneNames = { thunder: '雷之石', water: '水之石', fire: '火之石', leaf: '葉之石', moon: '月之石' };
    setMascotSpeech('✨ 哇！夥伴吸收了【' + stoneNames[stoneType] + '】的強大力量，成功進化為【' + targetP.name + '】！能力大幅提升！');

    // 彈出華麗進化祝賀彈窗
    if (typeof showEvolutionModal === 'function') {
      showEvolutionModal(oldPartner, targetP);
    }

    updateTrainerHeaderUI();
    renderNurtureShop();
    if (typeof renderGen1Pokedex === 'function') renderGen1Pokedex();
    if (typeof updatePokedexProgressUI === 'function') updatePokedexProgressUI();
  }

  function init() {
    // 🔴 自動校正：皮卡丘需要雷之石才能進化為雷丘，若未用雷之石誤變雷丘，立即修復回皮卡丘
    if (state.partner === 'gen1_26' || state.partner === 'raichu') {
      state.partner = 'pikachu';
      localStorage.setItem('zhuyin_partner', 'pikachu');
      localStorage.setItem('zhuyin_main_partner', 'pikachu');
    }

    // 🔊 全局使用者手勢音訊解鎖器（解決 iOS/Android/Chrome 瀏覽器語音暫停與自動播放限制）
    const unlockAudioEngine = () => {
      if (window.audioEngine) {
        window.audioEngine.ensureAudioContext();
        if (window.speechSynthesis && window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }
    };
    document.addEventListener('touchstart', unlockAudioEngine, { passive: true });
    document.addEventListener('click', unlockAudioEngine, { passive: true });

    // 確保未創角或無紀錄時，出戰夥伴徹底回歸最初階形態（皮卡丘 Lv.1，絕非進化的雷丘）
    if (!localStorage.getItem('zhuyin_profile')) {
      state.partner = 'pikachu';
      state.partnerData = {
        level: 1,
        exp: 0,
        maxExp: 100,
        stage: 0
      };
      localStorage.setItem('zhuyin_partner', 'pikachu');
      localStorage.setItem('zhuyin_partner_data', JSON.stringify(state.partnerData));
    }

    initCharacterModule();

    updateStarDisplay();
        updateCoinsDisplay();

    // 🔴 嚴格資料庫清理：野生對戰僅能收服 79 隻未進化初階寶可夢，其餘 72 隻進化型態必須由玩家親自升級或使用寶石進化！
    const BASE_POKEMON_SET = new Set(BASE_POKEMON_IDS);
    if (!state.unlockAllPokemon && Array.isArray(state.gen1Caught)) {
      const legitEvolvedIds = new Set();
      const currentPartnerInfo = (typeof getCurrentPartnerInfo === 'function') ? getCurrentPartnerInfo() : null;
      if (currentPartnerInfo && currentPartnerInfo.gen1Id && !BASE_POKEMON_SET.has(currentPartnerInfo.gen1Id)) {
        legitEvolvedIds.add(currentPartnerInfo.gen1Id);
      }
      const allPartners = (typeof getAllPartnersData === 'function') ? getAllPartnersData() : {};
      Object.keys(allPartners).forEach(key => {
        if (key.startsWith('gen1_')) {
          const pid = parseInt(key.replace('gen1_', ''), 10);
          if (!isNaN(pid)) legitEvolvedIds.add(pid);
        }
      });
      // 檢查御三家升級
      const pData = (state.partner && typeof getPartnerData === 'function') ? getPartnerData(state.partner) : (state.partnerData || {});
      const pLevel = pData.level || 1;
      if (state.partner === 'charmander') {
        if (pLevel >= 16) legitEvolvedIds.add(5);
        if (pLevel >= 36) legitEvolvedIds.add(6);
      } else if (state.partner === 'squirtle') {
        if (pLevel >= 16) legitEvolvedIds.add(8);
        if (pLevel >= 36) legitEvolvedIds.add(9);
      } else if (state.partner === 'bulbasaur') {
        if (pLevel >= 16) legitEvolvedIds.add(2);
        if (pLevel >= 36) legitEvolvedIds.add(3);
      }

      state.gen1Caught = state.gen1Caught.filter(id => BASE_POKEMON_SET.has(id) || legitEvolvedIds.has(id));
      localStorage.setItem('zhuyin_caught_gen1', JSON.stringify(state.gen1Caught));
    }

    updateTrainerHeaderUI();
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
    }

    updatePokedexProgressUI();

    setupPartnerModal();

    renderGymBadges();

    setupTabNavigation();

    setupAudioToggle();

    setupVoiceSettingsModal();

    initAdventureModule();

    initGen1Pokedex();
    renderGen1Pokedex();
    // renderGallery(); (removed)

    // renderCombinedFinals(); (removed)

    setupModalEvents();

    // initBlendingTrain(); (removed)

    // initTonesSlider(); (removed)

    // initCanvasModule(); (removed)

    // initGameHub(); (removed)

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

  // ==========================================
  // 🎒 夥伴獨立培育與自選出戰系統模組 (Individual Nurture & Partner Switch)
  // ==========================================

  function getAllPartnersData() {
    try {
      return JSON.parse(localStorage.getItem('zhuyin_all_partners_data') || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveAllPartnersData(data) {
    try {
      localStorage.setItem('zhuyin_all_partners_data', JSON.stringify(data));
    } catch (e) {}
  }

  function getPartnerData(partnerId) {
    const id = partnerId || state.partner || 'pikachu';
    const all = getAllPartnersData();
    if (all[id]) {
      return all[id];
    }
    if (id === state.partner && state.partnerData) {
      all[id] = { ...state.partnerData };
      saveAllPartnersData(all);
      return all[id];
    }
    const def = { level: 1, exp: 0, maxExp: 100, stage: 0, crown: false };
    all[id] = def;
    saveAllPartnersData(all);
    return def;
  }

  function switchActivePartner(newPartnerId) {
    if (!newPartnerId) return;
    const currentId = state.partner;
    const all = getAllPartnersData();
    if (currentId && state.partnerData) {
      all[currentId] = { ...state.partnerData };
    }

    state.partner = newPartnerId;
    localStorage.setItem('zhuyin_partner', newPartnerId);

    if (!all[newPartnerId]) {
      all[newPartnerId] = { level: 1, exp: 0, maxExp: 100, stage: 0, crown: false };
    }
    state.partnerData = all[newPartnerId];
    saveAllPartnersData(all);
    localStorage.setItem('zhuyin_partner_data', JSON.stringify(state.partnerData));

    updateTrainerHeaderUI();
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
    }
    renderNurtureShop();
    return getCurrentPartnerInfo();
  }

  function getFxForType(typeStr = '') {
    if (typeStr.includes('火')) return 'fire';
    if (typeStr.includes('水') || typeStr.includes('冰')) return 'water';
    if (typeStr.includes('草') || typeStr.includes('蟲')) return 'grass';
    if (typeStr.includes('超') || typeStr.includes('星') || typeStr.includes('幽') || typeStr.includes('妖')) return 'star';
    return 'electric';
  }

  function getPokemonAvatarHtml(partner, sizeClass = '') {
    if (!partner) return '';
    const hasCrown = Boolean(partner.crown);

    let innerContent = '';
    if (partner.image) {
      innerContent = `<img src="${partner.image}" alt="${partner.name || '寶可夢'}" class="pokemon-avatar-img ${hasCrown ? 'crowned-pokemon-img' : ''} ${sizeClass}" />`;
    } else {
      const bg = partner.color || '#3B82F6';
      innerContent = `<div class="symbol-pokemon-avatar ${sizeClass}" style="border-color:${bg};background:radial-gradient(circle, ${bg}28 0%, ${bg}08 70%);">
        <span class="sym-p-icon">${partner.icon || '⚡'}</span>
        ${partner.char ? `<span class="sym-p-char" style="color:${bg};border-color:${bg};">${partner.char}</span>` : ''}
      </div>`;
    }

    if (!hasCrown) {
      return innerContent;
    }

    // 👑 戴上王者冠軍金冠 (Champion Crown) 的造型特效！
    return `
      <div class="crowned-avatar-container ${sizeClass}">
        <div class="champion-crown-graphic" title="👑 戴上王者冠軍王冠">
          <svg viewBox="0 0 100 70" class="svg-champion-crown">
            <defs>
              <linearGradient id="crownGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFF9C4"/>
                <stop offset="30%" stop-color="#FFD700"/>
                <stop offset="70%" stop-color="#F59E0B"/>
                <stop offset="100%" stop-color="#B45309"/>
              </linearGradient>
            </defs>
            <path d="M 8 58 L 92 58 L 86 24 L 68 38 L 50 12 L 32 38 L 14 24 Z" fill="url(#crownGoldGrad)" stroke="#B45309" stroke-width="2.5" stroke-linejoin="round"/>
            <rect x="10" y="54" width="80" height="10" rx="3" fill="#D97706" stroke="#78350F" stroke-width="1.5"/>
            <circle cx="24" cy="59" r="3" fill="#EF4444"/>
            <circle cx="37" cy="59" r="2.5" fill="#3B82F6"/>
            <circle cx="50" cy="59" r="3.5" fill="#10B981"/>
            <circle cx="63" cy="59" r="2.5" fill="#3B82F6"/>
            <circle cx="76" cy="59" r="3" fill="#EF4444"/>
            <circle cx="14" cy="22" r="3.5" fill="#EF4444" stroke="#B45309" stroke-width="1"/>
            <circle cx="50" cy="10" r="5" fill="#FDE047" stroke="#B45309" stroke-width="1.5"/>
            <circle cx="86" cy="22" r="3.5" fill="#EF4444" stroke="#B45309" stroke-width="1"/>
          </svg>
        </div>
        <span class="crown-sparkle sp-1">✨</span>
        <span class="crown-sparkle sp-2">🌟</span>
        <div class="crowned-halo-aura"></div>
        ${innerContent}
      </div>
    `;
  }

  function getCurrentPartnerInfo() {
    let sym = null;
    const partnerId = state.partner || 'pikachu';
    if (partnerId.startsWith('sym_') || (ZHUYIN_DATA.symbols && ZHUYIN_DATA.symbols.some(s => s.char === partnerId))) {
      const char = partnerId.startsWith('sym_') ? partnerId.replace('sym_', '') : partnerId;
      sym = ZHUYIN_DATA.symbols.find(s => s.char === char);
    }

    const partnerData = getPartnerData(partnerId);
    const level = partnerData.level || 1;
    const stageIdx = level >= 36 ? 2 : level >= 16 ? 1 : 0;

    if (sym) {
      const stageNames = [
        sym.pokeName,
        `超能・${sym.pokeName}`,
        `究極神獸・${sym.pokeName}`
      ];
      const stageIcons = [
        sym.icon,
        `${sym.icon}✨`,
        `👑${sym.icon}`
      ];
      const moveFx = getFxForType(sym.pokeType || '');
      const moves = [
        `${sym.word || sym.char}字突擊`,
        `${sym.pokeType || '光波'}大爆發`,
        `究極${sym.char}神奧義破`
      ];

      return {
        id: `sym_${sym.char}`,
        char: sym.char,
        isSymbol: true,
        baseName: sym.pokeName,
        name: stageNames[stageIdx],
        stageNames: stageNames,
        icon: stageIcons[stageIdx],
        image: null,
        color: sym.color || '#3B82F6',
        move: moves[stageIdx],
        moveFx: moveFx,
        type: sym.pokeType || '一般系',
        typeIcon: sym.pokeTypeIcon || '⚡',
        level: level,
        exp: partnerData.exp || 0,
        maxExp: partnerData.maxExp || 100,
        stageIdx: stageIdx,
        crown: Boolean(partnerData.crown)
      };
    }

    
    // 檢查是否為第一世代 151 寶可夢
    if (typeof GEN1_POKEMON_LIST !== 'undefined') {
      let g1Base = null;
      if (partnerId.startsWith('gen1_')) {
        const pid = parseInt(partnerId.replace('gen1_', ''));
        g1Base = GEN1_POKEMON_LIST.find(p => p.id === pid);
      } else if (!isNaN(parseInt(partnerId)) && parseInt(partnerId) >= 1 && parseInt(partnerId) <= 151) {
        g1Base = GEN1_POKEMON_LIST.find(p => p.id === parseInt(partnerId));
      } else if (partnerId === 'bulbasaur') g1Base = GEN1_POKEMON_LIST.find(p => p.id === 1);
      else if (partnerId === 'charmander') g1Base = GEN1_POKEMON_LIST.find(p => p.id === 4);
      else if (partnerId === 'squirtle') g1Base = GEN1_POKEMON_LIST.find(p => p.id === 7);
      else if (partnerId === 'pikachu') g1Base = GEN1_POKEMON_LIST.find(p => p.id === 25);
      else if (partnerId === 'eevee') g1Base = GEN1_POKEMON_LIST.find(p => p.id === 133);

      if (g1Base && !sym) {
        // 依據等級計算進化
                let currentEvo = g1Base;
        // 🔴 只有一般自然升級的寶可夢（如御三家）才隨等級自動進化；
        // 需「屬性寶石」進化的寶可夢（如皮卡丘、伊布等）必須使用對應寶石進化！
        const isStoneEvo = g1Base.evolution && (g1Base.evolution.method === 'stone' || g1Base.evolution.method === 'branch_stone');
        if (g1Base.evolution && !isStoneEvo && level >= (g1Base.evolution.reqLevel || 999)) {
          const nextP = GEN1_POKEMON_LIST.find(p => p.id === g1Base.evolution.evolvesToId);
          if (nextP) {
            currentEvo = nextP;
            // 三階進化（例如妙蛙草 -> 妙蛙花）
            const nextIsStone = nextP.evolution && (nextP.evolution.method === 'stone' || nextP.evolution.method === 'branch_stone');
            if (nextP.evolution && !nextIsStone && level >= (nextP.evolution.reqLevel || 999)) {
              const finalP = GEN1_POKEMON_LIST.find(p => p.id === nextP.evolution.evolvesToId);
              if (finalP) currentEvo = finalP;
            }
          }
        }

        return {
          id: 'gen1_' + g1Base.id,
          gen1Id: currentEvo.id,
          char: null,
          isSymbol: false,
          isGen1: true,
          dexNo: currentEvo.dexNo,
          baseName: g1Base.name,
          name: currentEvo.name,
          stageNames: isStoneEvo ? [g1Base.name, g1Base.name, g1Base.name] : [g1Base.name, (g1Base.evolution ? g1Base.evolution.evolvesToName : g1Base.name)],
          icon: currentEvo.icon || '⚡',
          image: 'assets/pokemon/gen1/' + currentEvo.id + '.png',
          move: currentEvo.move,
          moveFx: getFxForType(currentEvo.primaryType),
          type: currentEvo.types.join('/'),
          typeIcon: currentEvo.icon,
          level: level,
          exp: partnerData.exp || 0,
          maxExp: partnerData.maxExp || 100,
          stageIdx: stageIdx,
          crown: Boolean(partnerData.crown)
        };
      }
    }

    const base = (ZHUYIN_DATA.starterPokemon && ZHUYIN_DATA.starterPokemon.find(p => p.id === partnerId)) || (ZHUYIN_DATA.starterPokemon && ZHUYIN_DATA.starterPokemon[0]) || { name: '皮卡丘', icon: '⚡', type: '電氣系', move: '十萬伏特' };
    const evo = (base.evolutions && base.evolutions[stageIdx]) ? base.evolutions[stageIdx] : {
      name: base.name,
      icon: base.icon,
      image: base.image,
      move: base.move,
      moveFx: 'electric'
    };

    return {
      id: base.id,
      char: null,
      isSymbol: false,
      baseName: base.name,
      name: evo.name,
      stageNames: (base.evolutions || []).map(e => e.name),
      icon: evo.icon,
      image: evo.image || base.image,
      move: evo.move,
      moveFx: evo.moveFx || 'electric',
      type: base.type,
      typeIcon: '⚡',
      level: level,
      exp: partnerData.exp || 0,
      maxExp: partnerData.maxExp || 100,
      stageIdx: stageIdx,
      crown: Boolean(partnerData.crown)
    };
  }

  /**

   * ⚡ 增加夥伴經驗值並處理升級與神奇進化

   */


  // ==========================================
  // 👑 寶可夢滿級 (Lv.100) 與終極訓練認證模組 (Max Level & Final Training System)
  // ==========================================
  const MAX_PARTNER_LEVEL = 100;

  function isPokemonMaxTrained(pokemonId) {
    if (!pokemonId) return false;
    const pid = parseInt(pokemonId, 10);

    // 1. 檢查當前出戰夥伴
    const currentInfo = (typeof getCurrentPartnerInfo === 'function') ? getCurrentPartnerInfo() : null;
    if (currentInfo) {
      const isCurrentThis = (currentInfo.gen1Id === pid || currentInfo.id === ('gen1_' + pid) || (pid === 25 && state.partner === 'pikachu') || (pid === 133 && state.partner === 'eevee'));
      if (isCurrentThis && state.partnerData && state.partnerData.level >= MAX_PARTNER_LEVEL) {
        return true;
      }
    }

    // 2. 檢查獨立培育資料庫
    const allPartners = (typeof getAllPartnersData === 'function') ? getAllPartnersData() : {};
    if (allPartners['gen1_' + pid] && allPartners['gen1_' + pid].level >= MAX_PARTNER_LEVEL) {
      return true;
    }

    const STARTER_ID_MAP = {
      1: 'bulbasaur', 2: 'bulbasaur', 3: 'bulbasaur',
      4: 'charmander', 5: 'charmander', 6: 'charmander',
      7: 'squirtle', 8: 'squirtle', 9: 'squirtle',
      25: 'pikachu', 26: 'pikachu',
      133: 'eevee', 134: 'eevee', 135: 'eevee', 136: 'eevee'
    };
    if (STARTER_ID_MAP[pid] && allPartners[STARTER_ID_MAP[pid]] && allPartners[STARTER_ID_MAP[pid]].level >= MAX_PARTNER_LEVEL) {
      return true;
    }

    if (allPartners[pokemonId] && allPartners[pokemonId].level >= MAX_PARTNER_LEVEL) {
      return true;
    }

    // 3. 檢查終極訓練完成持久化列表
    try {
      const maxList = JSON.parse(localStorage.getItem('zhuyin_max_trained_pokemon') || '[]');
      if (maxList.includes(pid)) return true;
    } catch (e) {}

    return false;
  }

  function markPokemonMaxTrained(pokemonId) {
    if (!pokemonId) return;
    const pid = parseInt(pokemonId, 10);
    try {
      const maxList = JSON.parse(localStorage.getItem('zhuyin_max_trained_pokemon') || '[]');
      if (!maxList.includes(pid)) {
        maxList.push(pid);
        localStorage.setItem('zhuyin_max_trained_pokemon', JSON.stringify(maxList));
      }
    } catch (e) {}
  }
  window.isPokemonMaxTrained = isPokemonMaxTrained;
  window.markPokemonMaxTrained = markPokemonMaxTrained;

  function addPartnerExp(amount) {
    const oldLevel = state.partnerData.level || 1;
    if (oldLevel >= MAX_PARTNER_LEVEL) {
      state.partnerData.level = MAX_PARTNER_LEVEL;
      state.partnerData.exp = state.partnerData.maxExp;
      localStorage.setItem('zhuyin_partner_data', JSON.stringify(state.partnerData));
      const allData = getAllPartnersData();
      allData[state.partner] = { ...state.partnerData };
      saveAllPartnersData(allData);
      return;
    }

    state.partnerData.exp += amount;
    let leveledUp = false;
    let evolved = false;
    const oldPartner = getCurrentPartnerInfo();

    while (state.partnerData.exp >= state.partnerData.maxExp && state.partnerData.level < MAX_PARTNER_LEVEL) {
      state.partnerData.exp -= state.partnerData.maxExp;
      state.partnerData.level++;
      state.partnerData.maxExp = 60 + state.partnerData.level * 25;
      leveledUp = true;
      if (state.partnerData.level >= MAX_PARTNER_LEVEL) {
        state.partnerData.level = MAX_PARTNER_LEVEL;
        state.partnerData.exp = state.partnerData.maxExp;
        break;
      }
    }



        const newPartner = getCurrentPartnerInfo();

    // 👑 檢查是否達到滿級 Lv.100 完成終極訓練！
    const reachedMaxLevel = (oldLevel < MAX_PARTNER_LEVEL && state.partnerData.level >= MAX_PARTNER_LEVEL);
    if (reachedMaxLevel) {
      if (newPartner.gen1Id) markPokemonMaxTrained(newPartner.gen1Id);
      markPokemonMaxTrained(state.partner);

      if (window.audioEngine && window.audioEngine.playBadgeGet) {
        window.audioEngine.playBadgeGet();
      }
      if (window.confetti && window.confetti.trigger) {
        window.confetti.trigger(220);
      }
      setMascotSpeech(`👑 狂賀！！【${newPartner.name}】突破極限達到滿級 Lv.100！完成了終極訓練！在寶可夢圖鑑上已榮獲【👑 終極訓練完成】專屬金色榮譽標誌！`);
      if (window.audioEngine && window.audioEngine.speak) {
        setTimeout(() => {
          window.audioEngine.speak(`太厲害了！${newPartner.name}完成終極訓練，達到滿級一百級！`);
        }, 500);
      }
      if (typeof renderGen1Pokedex === 'function') renderGen1Pokedex();
    }

    // 🔴 檢查是否達成進化（Gen1 寶可夢比對 gen1Id，注音符號比對 stageIdx）
    // 嚴格規定：凡是需要「屬性寶石」進化的寶可夢（如皮卡丘、伊布、六尾等），絕對不隨升級自動進化！
    const g1BasePokemon = (typeof GEN1_POKEMON_LIST !== 'undefined' && oldPartner.gen1Id)
      ? GEN1_POKEMON_LIST.find(p => p.id === oldPartner.gen1Id)
      : null;
    const isStoneEvoPartner = g1BasePokemon && g1BasePokemon.evolution && (g1BasePokemon.evolution.method === 'stone' || g1BasePokemon.evolution.method === 'branch_stone');

    if (!isStoneEvoPartner && newPartner.gen1Id && oldPartner.gen1Id && newPartner.gen1Id !== oldPartner.gen1Id) {
      evolved = true;
      // 自動解鎖並將進化後的寶可夢登錄進 151 大圖鑑
      if (!state.gen1Caught.includes(newPartner.gen1Id)) {
        state.gen1Caught.push(newPartner.gen1Id);
        state.gen1Caught.sort((a, b) => a - b);
        localStorage.setItem('zhuyin_caught_gen1', JSON.stringify(state.gen1Caught));
      }
      // 同步夥伴設定為已進化的形態
      if (typeof state.partner === 'string' && state.partner.startsWith('gen1_')) {
        state.partner = 'gen1_' + newPartner.gen1Id;
        localStorage.setItem('zhuyin_partner', state.partner);
        localStorage.setItem('zhuyin_main_partner', state.partner);
      }
    } else if (newPartner.isSymbol && newPartner.stageIdx > (state.partnerData.stage || 0)) {
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
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
    }



        if (evolved) {

      showEvolutionModal(oldPartner, newPartner);
      if (typeof updatePokedexProgressUI === 'function') updatePokedexProgressUI();
      if (typeof renderGen1Pokedex === 'function') renderGen1Pokedex();
      if (typeof renderNurtureShop === 'function') renderNurtureShop();

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
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
    }

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

    if (dom.playerPartnerLvl) {
      if ((partnerObj.level || 1) >= MAX_PARTNER_LEVEL) {
        dom.playerPartnerLvl.innerHTML = `Lv.100 👑`;
        dom.playerPartnerLvl.style.background = 'linear-gradient(135deg, #F59E0B, #EA580C)';
      } else {
        dom.playerPartnerLvl.textContent = `Lv.${partnerObj.level || 1}`;
        dom.playerPartnerLvl.style.background = '#F59E0B';
      }
    }

    if (dom.playerRankTitle) {
      if (typeof formatZhuyinDisplay === 'function') {
        dom.playerRankTitle.innerHTML = formatZhuyinDisplay(partnerObj.name);
      } else {
        dom.playerRankTitle.textContent = partnerObj.name;
      }
    }

    if (dom.ballCount) dom.ballCount.textContent = state.balls;

    if (dom.starCount) dom.starCount.textContent = state.stars;
    if (dom.coinCount) dom.coinCount.textContent = state.coins || 0;

  }



    // ==========================================
  // 🌟 探險家角色系統與重創角色管理模組 (Character System & Reset)
  // ==========================================
  const CHARACTER_PRESETS = [
    {
      id: 'char_boy',
      name: '小宏',
      avatar: '👦',
      color: '#3B82F6',
      title: '熱血小勇者',
      desc: '充滿勇氣，立志收服全島注音精靈！'
    },
    {
      id: 'char_girl',
      name: '小美',
      avatar: '👧',
      color: '#EC4899',
      title: '活潑探險家',
      desc: '觀察力第一名，最喜歡可愛的寶可夢！'
    },
    {
      id: 'char_wizard',
      name: '星兒',
      avatar: '🧙‍♂️',
      color: '#8B5CF6',
      title: '拼音小魔法師',
      desc: '運用注音星光魔法，每題都發射必殺技！'
    },
    {
      id: 'char_hero',
      name: '安安',
      avatar: '🦸‍♀️',
      color: '#F59E0B',
      title: '守護小英雌',
      desc: '充滿正義感，保護冒險島上的小夥伴！'
    },
    {
      id: 'char_dino',
      name: '阿龍',
      avatar: '🦖',
      color: '#10B981',
      title: '巨龍馴獸師',
      desc: '元氣滿滿，跟隨龍王守護者展開對決！'
    },
    {
      id: 'char_star',
      name: '小晴',
      avatar: '🦄',
      color: '#6366F1',
      title: '夢幻精靈使',
      desc: '細心又聰明，立志考取 100 分滿分！'
    }
  ];

  let selectedCharacterPreset = CHARACTER_PRESETS[0];
  let selectedStarterPokemon = null;

  function initCharacterModule() {
    state.profile = JSON.parse(localStorage.getItem('zhuyin_profile') || 'null');

    // 綁定頂部導航角色徽章點擊
    const btnProfile = document.getElementById('btn-character-profile');
    if (btnProfile) {
      btnProfile.addEventListener('click', () => {
        window.audioEngine.playPop();
        openCharacterProfileModal();
      });
    }

    // 關閉按鈕
    const createCloseBtn = document.getElementById('char-create-close-btn');
    if (createCloseBtn) {
      createCloseBtn.addEventListener('click', closeCharacterCreationModal);
    }

    const profileCloseBtn = document.getElementById('char-profile-close-btn');
    if (profileCloseBtn) {
      profileCloseBtn.addEventListener('click', closeCharacterProfileModal);
    }

    // 修改角色按鈕
    const btnEdit = document.getElementById('btn-edit-char-profile');
    if (btnEdit) {
      btnEdit.addEventListener('click', () => {
        window.audioEngine.playPop();
        closeCharacterProfileModal();
        openCharacterCreationModal(true, true);
      });
    }

    // 重創角色與重置流程
    const btnTriggerReset = document.getElementById('btn-trigger-reset-game');
    if (btnTriggerReset) {
      btnTriggerReset.addEventListener('click', () => {
        window.audioEngine.playPop();
        openResetConfirmModal();
      });
    }

    const btnCancelReset = document.getElementById('btn-cancel-reset');
    if (btnCancelReset) {
      btnCancelReset.addEventListener('click', () => {
        window.audioEngine.playPop();
        closeResetConfirmModal();
      });
    }

    const btnConfirmReset = document.getElementById('btn-confirm-reset-game');
    if (btnConfirmReset) {
      btnConfirmReset.addEventListener('click', () => {
        executeResetAndRecreate();
      });
    }

    // 快速選名標籤
    const quickChips = document.querySelectorAll('.quick-chip-btn');
    quickChips.forEach(chip => {
      chip.addEventListener('click', () => {
        window.audioEngine.playPop();
        const input = document.getElementById('char-name-input');
        if (input) {
          input.value = chip.dataset.name || '';
          input.focus();
        }
      });
    });

    // 確認創建角色
    const btnConfirmChar = document.getElementById('btn-confirm-char');
    if (btnConfirmChar) {
      btnConfirmChar.addEventListener('click', handleSaveCharacterProfile);
    }

    // 首次進入遊戲若無角色，強制跳出創角選單
    if (!state.profile) {
      openCharacterCreationModal(false, false);
    } else {
      updateCharacterHeaderUI();
    }
  }

  function updateCharacterHeaderUI() {
    if (!state.profile) return;
    const avatarEl = document.getElementById('header-char-avatar');
    const nameEl = document.getElementById('header-char-name');
    const titleEl = document.getElementById('header-char-title');

    if (avatarEl) avatarEl.textContent = state.profile.avatar || '👦';
    if (nameEl) nameEl.textContent = state.profile.name || '探險家';
    if (titleEl) titleEl.textContent = state.profile.title || '小勇者';
  }

  function openCharacterCreationModal(canClose = true, isEditing = false) {
    const modal = document.getElementById('char-create-modal');
    if (!modal) return;

    const titleEl = document.getElementById('char-modal-title');
    const descEl = document.getElementById('char-modal-desc');
    const closeBtn = document.getElementById('char-create-close-btn');
    const confirmBtnText = document.getElementById('btn-confirm-char-text');
    const nameInput = document.getElementById('char-name-input');

    if (titleEl) titleEl.textContent = isEditing ? '✏️ 修改探險家角色資料' : '🌟 創建你的注音探險家角色';
    if (descEl) descEl.textContent = isEditing ? '挑選喜歡的新外觀或更換大名：' : '選擇你最喜歡的角色形象，輸入你的大名，開始ㄅㄆㄇ挑戰吧！';
    if (closeBtn) closeBtn.style.display = canClose ? 'block' : 'none';
    if (confirmBtnText) confirmBtnText.textContent = isEditing ? '儲存修改' : '開始冒險！進入注音島';

    // 預設選取當前角色或第一個預設
    if (state.profile && isEditing) {
      const match = CHARACTER_PRESETS.find(p => p.avatar === state.profile.avatar) || CHARACTER_PRESETS[0];
      selectedCharacterPreset = match;
      if (nameInput) nameInput.value = state.profile.name || '';
    } else {
      selectedCharacterPreset = CHARACTER_PRESETS[0];
      if (nameInput) nameInput.value = selectedCharacterPreset.name;
    }

    selectedStarterPokemon = (ZHUYIN_DATA.starterPokemon ? ZHUYIN_DATA.starterPokemon.find(p => p.id === state.partner) : null) || (ZHUYIN_DATA.starterPokemon ? ZHUYIN_DATA.starterPokemon[0] : null);
    renderCharacterPresetCards();
    renderStarterPokemonCards();
    modal.classList.add('open');
  }

  function closeCharacterCreationModal() {
    const modal = document.getElementById('char-create-modal');
    if (modal) modal.classList.remove('open');
  }

  function renderCharacterPresetCards() {
    const grid = document.getElementById('char-preset-grid');
    if (!grid) return;
    grid.innerHTML = '';

    CHARACTER_PRESETS.forEach(preset => {
      const isSelected = selectedCharacterPreset && selectedCharacterPreset.id === preset.id;
      const card = document.createElement('div');
      card.className = `char-select-card ${isSelected ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="char-card-avatar">${preset.avatar}</div>
        <div class="char-card-name">${preset.name}</div>
        <div class="char-card-title">${preset.title}</div>
      `;

      card.addEventListener('click', () => {
        window.audioEngine.playPop();
        selectedCharacterPreset = preset;
        renderCharacterPresetCards();
        const input = document.getElementById('char-name-input');
        if (input && (!input.value || CHARACTER_PRESETS.some(p => p.name === input.value))) {
          input.value = preset.name;
        }
      });

      grid.appendChild(card);
    });
  }

  function renderStarterPokemonCards() {
    const grid = document.getElementById('starter-preset-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const starters = ZHUYIN_DATA.starterPokemon || [];
    starters.forEach(starter => {
      const isSelected = selectedStarterPokemon && selectedStarterPokemon.id === starter.id;
      const card = document.createElement('div');
      card.className = `starter-select-card ${isSelected ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="starter-card-icon">${starter.icon}</div>
        <div class="starter-card-name">${formatZhuyinDisplay(starter.name)}</div>
        <div class="starter-card-tag">Lv.1 初階</div>
      `;

      card.addEventListener('click', () => {
        window.audioEngine.playPop();
        selectedStarterPokemon = starter;
        renderStarterPokemonCards();
      });

      grid.appendChild(card);
    });
  }

  function handleSaveCharacterProfile() {
    const input = document.getElementById('char-name-input');
    const entered = (input ? input.value : '').trim();
    const finalName = entered.length > 0 ? entered : (selectedCharacterPreset ? selectedCharacterPreset.name : '小勇者');
    const preset = selectedCharacterPreset || CHARACTER_PRESETS[0];

    const isNew = !state.profile;
    state.profile = {
      id: preset.id,
      name: finalName,
      avatar: preset.avatar,
      title: preset.title,
      color: preset.color,
      desc: preset.desc,
      updatedAt: Date.now()
    };

    localStorage.setItem('zhuyin_profile', JSON.stringify(state.profile));

    // 新創角色時，夥伴必定回歸選取的最初階形態 Lv.1（經驗歸零，絕非進化形態）
    if (isNew) {
      const starterId = selectedStarterPokemon ? selectedStarterPokemon.id : 'pikachu';
      state.partner = starterId;
      state.partnerData = {
        level: 1,
        exp: 0,
        maxExp: 100,
        stage: 0
      };
      localStorage.setItem('zhuyin_partner', starterId);
      localStorage.setItem('zhuyin_partner_data', JSON.stringify(state.partnerData));
    }

    updateCharacterHeaderUI();
    updateTrainerHeaderUI();
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
    }
    closeCharacterCreationModal();

    window.audioEngine.playFanfare();
    if (window.confetti) window.confetti.trigger(80);

    setMascotSpeech(`⚡ 皮卡！探險家【${state.profile.name}】歡迎加入冒險！點擊島嶼道館開始挑戰吧！`);
    if (isNew) {
      window.audioEngine.speak(`太棒了！歡迎你，${state.profile.name}！一起展開ㄅㄆㄇ冒險之旅吧！`);
    } else {
      window.audioEngine.speak(`資料已更新，探險家${state.profile.name}，繼續加油！`);
    }
  }

  function openCharacterProfileModal() {
    if (!state.profile) {
      openCharacterCreationModal(false, false);
      return;
    }

    const modal = document.getElementById('char-profile-modal');
    if (!modal) return;

    const avatarEl = document.getElementById('profile-display-avatar');
    const nameEl = document.getElementById('profile-display-name');
    const titleEl = document.getElementById('profile-display-title');
    const descEl = document.getElementById('profile-display-desc');

    if (avatarEl) avatarEl.textContent = state.profile.avatar || '👦';
    if (nameEl) nameEl.textContent = state.profile.name || '探險家';
    if (titleEl) titleEl.textContent = state.profile.title || '小勇者';
    if (descEl) descEl.textContent = state.profile.desc || '充滿勇氣，立志成為注音寶可夢大師！';

    // 戰績更新
    const clearedStagesCount = Object.keys(state.adventure.stageStars || {}).filter(k => (state.adventure.stageStars[k] || 0) > 0).length;
    const badgesCount = (ZHUYIN_DATA.gymBadges || []).filter(b => (state.adventure.stageStars[String(b.stageId)] || 0) > 0).length;

    const stagesEl = document.getElementById('profile-stat-stages');
    const starsEl = document.getElementById('profile-stat-stars');
    const badgesEl = document.getElementById('profile-stat-badges');
    const dexEl = document.getElementById('profile-stat-dex');

    if (stagesEl) stagesEl.textContent = `${clearedStagesCount} / 10 座`;
    if (starsEl) starsEl.textContent = `${state.stars || 0} 顆`;
    if (badgesEl) badgesEl.textContent = `${badgesCount} / 10 枚`;
    if (dexEl) dexEl.textContent = `${(state.pokedexCaught || []).length} / 37 隻`;

    modal.classList.add('open');
  }

  function closeCharacterProfileModal() {
    const modal = document.getElementById('char-profile-modal');
    if (modal) modal.classList.remove('open');
  }

  function openResetConfirmModal() {
    const modal = document.getElementById('char-reset-confirm-modal');
    if (modal) modal.classList.add('open');
  }

  function closeResetConfirmModal() {
    const modal = document.getElementById('char-reset-confirm-modal');
    if (modal) modal.classList.remove('open');
  }

  function executeResetAndRecreate() {
    closeResetConfirmModal();
    closeCharacterProfileModal();

    // 清空所有儲存紀錄，讓遊戲完全重來
    localStorage.removeItem('zhuyin_profile');
    localStorage.removeItem('zhuyin_stage_progress');
    localStorage.removeItem('zhuyin_caught_symbols');
    localStorage.removeItem('zhuyin_stars');
    localStorage.removeItem('zhuyin_balls');
    localStorage.removeItem('zhuyin_partner');
    localStorage.removeItem('zhuyin_partner_data');
    localStorage.removeItem('zhuyin_trainer_bag');

    // 重設記憶體中狀態
    state.profile = null;
    state.adventure.stageStars = {};
    state.adventure.score = 0;
    state.adventure.mistakes = 0;
    state.adventure.combo = 0;
    state.pokedexCaught = [];
    state.stars = 5;
    state.balls = 20;
    state.coins = 60;
    localStorage.setItem('zhuyin_coins', '60');

    // ⚡ 徹底重設出戰夥伴回歸第 1 級幼年初始形態（皮卡丘 Lv.1，經驗 0，絕非進化的雷丘）
    state.partner = 'pikachu';
    state.partnerData = {
      level: 1,
      exp: 0,
      maxExp: 100,
      stage: 0
    };
    state.allPartnersData = {};
    localStorage.removeItem('zhuyin_all_partners_data');
    localStorage.setItem('zhuyin_partner', 'pikachu');
    localStorage.setItem('zhuyin_partner_data', JSON.stringify(state.partnerData));

    // 回到地圖畫面並重繪介面
    showAdventureMap();
    renderAdventureMap();
    renderGallery();
    renderGymBadges();
    updateTrainerHeaderUI();
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
    }
    updatePokedexProgressUI();
    updateStarDisplay();

    window.audioEngine.playBadgeGet();
    window.audioEngine.speak('遊戲進度已全數重置！請為你的新探險家挑選角色並輸入名字！');

    // 開啟創角畫面引導建立新角色
    openCharacterCreationModal(false, false);
  }

function openCurrentPartnerDetailModal() {
    window.audioEngine.playPop();
    const partnerInfo = getCurrentPartnerInfo();
    let g1P = null;
    if (typeof GEN1_POKEMON_LIST !== 'undefined') {
      if (partnerInfo && partnerInfo.gen1Id) {
        g1P = GEN1_POKEMON_LIST.find(p => p.id === partnerInfo.gen1Id);
      }
      if (!g1P && partnerInfo && partnerInfo.name) {
        g1P = GEN1_POKEMON_LIST.find(p => p.name === partnerInfo.name || p.name === partnerInfo.baseName);
      }
      if (!g1P) {
        const pid = (typeof state.partner === 'string' && state.partner.startsWith('gen1_'))
          ? parseInt(state.partner.replace('gen1_', ''), 10)
          : 133;
        g1P = GEN1_POKEMON_LIST.find(p => p.id === pid) || GEN1_POKEMON_LIST[0];
      }
    }

    if (g1P && typeof openGen1DetailModal === 'function') {
      openGen1DetailModal(g1P, true);
    } else {
      openPartnerModal();
    }
  }
  window.openCurrentPartnerDetailModal = openCurrentPartnerDetailModal;

  function setupPartnerModal() {
    if (dom.playerLevelBadge) {
      dom.playerLevelBadge.addEventListener('click', (e) => {
        e.stopPropagation();
        openCurrentPartnerDetailModal();
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

        const partnerObj = getCurrentPartnerInfo(); const p = partnerObj;

        if (p) {

          setMascotSpeech(`⚡ 太棒了！【${p.name}】成為你的出戰夥伴！必殺技是【${p.move}】！`);

          window.audioEngine.speak(`太棒了！就決定是${p.name}了！`);

        }

      });

    }

  }



  let partnerModalCurrentTab = 'starters';

  function openPartnerModal() {
    if (!dom.partnerModal || !dom.partnerPickerList) return;

    const tabStarters = document.getElementById('tab-chip-starters');
    const tabCaught = document.getElementById('tab-chip-caught');
    const countEl = document.getElementById('partner-modal-caught-count');

    if (countEl) countEl.textContent = (state.pokedexCaught || []).length;

    if (tabStarters && !tabStarters.dataset.bound) {
      tabStarters.dataset.bound = 'true';
      tabStarters.addEventListener('click', () => {
        partnerModalCurrentTab = 'starters';
        tabStarters.classList.add('active');
        if (tabCaught) tabCaught.classList.remove('active');
        renderPartnerPickerCards();
      });
    }

    if (tabCaught && !tabCaught.dataset.bound) {
      tabCaught.dataset.bound = 'true';
      tabCaught.addEventListener('click', () => {
        partnerModalCurrentTab = 'caught';
        tabCaught.classList.add('active');
        if (tabStarters) tabStarters.classList.remove('active');
        renderPartnerPickerCards();
      });
    }

    if (state.partner && (state.partner.startsWith('sym_') || (ZHUYIN_DATA.symbols && ZHUYIN_DATA.symbols.some(s => s.char === state.partner)))) {
      partnerModalCurrentTab = 'caught';
      if (tabCaught) tabCaught.classList.add('active');
      if (tabStarters) tabStarters.classList.remove('active');
    } else {
      partnerModalCurrentTab = 'starters';
      if (tabStarters) tabStarters.classList.add('active');
      if (tabCaught) tabCaught.classList.remove('active');
    }

    renderPartnerPickerCards();

    dom.partnerModal.classList.add('active');
    dom.partnerModal.setAttribute('aria-hidden', 'false');
  }

  function renderPartnerPickerCards() {
    if (!dom.partnerPickerList) return;
    dom.partnerPickerList.innerHTML = '';

    
    if (partnerModalCurrentTab === 'gen1' && typeof GEN1_POKEMON_LIST !== 'undefined') {
      GEN1_POKEMON_LIST.forEach(p => {
        const isCaught = state.unlockAllPokemon || state.gen1Caught.includes(p.id);
        const partnerId = 'gen1_' + p.id;
        const pData = getPartnerData(partnerId);
        const isCurrent = (state.partner === partnerId || (p.id === 25 && state.partner === 'pikachu') || (p.id === 4 && state.partner === 'charmander') || (p.id === 7 && state.partner === 'squirtle') || (p.id === 1 && state.partner === 'bulbasaur') || (p.id === 133 && state.partner === 'eevee'));

        const card = document.createElement('div');
        card.className = 'partner-select-card ' + (isCurrent ? 'current-active' : '') + (isCaught ? '' : ' locked-pokemon');
        card.innerHTML = `
          <div class="p-card-header">
            <span class="p-type-tag">${p.dexNo} ${p.types.join('/')}</span>
            ${isCurrent ? '<span class="p-active-badge">⚡ 出戰中</span>' : (isCaught ? '<span style="font-size:12px;color:#10B981;font-weight:900;">✓ 已收服</span>' : '<span style="font-size:12px;color:#94A3B8;font-weight:900;">🔒 未收服</span>')}
          </div>
          <div class="p-sprite-wrap">
            <img src="assets/pokemon/gen1/${p.id}.png" alt="${p.name}" class="pokemon-avatar-img" onerror="this.onerror=null;this.src='${p.image}';" />
          </div>
          <div class="p-name">${formatZhuyinDisplay(p.name, p.zhuyin)}</div>
          <div class="p-level">${(pData.level || 1) >= 100 ? '<span style="color:#D97706;font-weight:900;">👑 Lv.100 滿級 (終極訓練完成)</span>' : 'Lv.' + (pData.level || 1)} · 招式：${p.move}</div>
        `;

        card.addEventListener('click', () => {
          if (!isCaught && !state.unlockAllPokemon) {
            window.audioEngine.speak('這是未收服的第一代寶可夢，快前往道館挑戰收服牠吧！');
            return;
          }
          window.audioEngine.playPokeCaught();
          state.partner = partnerId;
          localStorage.setItem('zhuyin_main_partner', state.partner);
          updateTrainerHeaderUI();
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
    }
          renderNurtureShop();
          renderPartnerSelectorList();
          if (window.confetti) window.confetti.trigger(70);
          setMascotSpeech('⚡ 已切換出戰夥伴為【' + p.name + '】！');
        });

        listEl.appendChild(card);
      });
      return;
    }

    if (partnerModalCurrentTab === 'starters') {
      ZHUYIN_DATA.starterPokemon.forEach(p => {
        const pData = getPartnerData(p.id);
        // 皮卡丘與伊布需屬性寶石才能進化，御三家（小火龍、傑尼龜、妙蛙種子）才隨等級自然進化
        const isStoneStarter = (p.id === 'pikachu' || p.id === 'eevee');
        const stageIdx = isStoneStarter ? 0 : (pData.level >= 36 ? 2 : pData.level >= 16 ? 1 : 0);
        const evo = { ...((p.evolutions && p.evolutions[stageIdx]) ? p.evolutions[stageIdx] : p), crown: Boolean(pData.crown) };
        const isCurrent = (state.partner === p.id);

        const card = document.createElement('div');
        card.className = `partner-card ${isCurrent ? 'selected' : ''}`;
        card.innerHTML = `
          ${isCurrent ? '<span class="p-active-badge">出戰中</span>' : ''}
          ${pData.crown ? '<span class="p-crown-mark">👑</span>' : ''}
          <div class="p-icon">${getPokemonAvatarHtml(evo)}</div>
          <div class="p-name">${formatZhuyinDisplay(evo.name)}</div>
          <div class="p-type">${p.type}</div>
          <span class="p-level-tag" style="${(pData.level || 1) >= 100 ? 'background:linear-gradient(135deg,#F59E0B,#EA580C);color:#FFF;font-weight:900;' : ''}">${(pData.level || 1) >= 100 ? '👑 Lv.100 滿級' : 'Lv.' + (pData.level || 1)}</span>
          <div style="font-size:11px;color:#D97706;font-weight:800;margin-top:4px;">絕招：${evo.move}</div>
        `;

        card.addEventListener('click', () => {
          window.audioEngine.playPop();
          switchActivePartner(p.id);
          renderPartnerPickerCards();
        });

        dom.partnerPickerList.appendChild(card);
      });
    } else {
      const caughtList = (state.pokedexCaught || []);
      if (caughtList.length === 0) {
        dom.partnerPickerList.innerHTML = `
          <div style="grid-column: 1 / -1; text-align:center; padding: 30px 10px; color:#64748B;">
            <div style="font-size:40px;margin-bottom:8px;">🔒</div>
            <strong style="font-size:16px;color:#334155;">尚未收服任何野生注音寶可夢</strong>
            <p style="font-size:13px;margin-top:4px;">前往道館完成段考題目並答對，就能用寶貝球收服牠們出戰培育喔！</p>
          </div>
        `;
        return;
      }

      caughtList.forEach(char => {
        const sym = ZHUYIN_DATA.symbols.find(s => s.char === char);
        if (!sym) return;

        const partnerId = `sym_${sym.char}`;
        const pData = getPartnerData(partnerId);
        const stageIdx = pData.level >= 36 ? 2 : pData.level >= 16 ? 1 : 0;
        const stageNames = [sym.pokeName, `超能・${sym.pokeName}`, `究極神獸・${sym.pokeName}`];
        const isCurrent = (state.partner === partnerId || state.partner === sym.char);

        const card = document.createElement('div');
        card.className = `partner-card ${isCurrent ? 'selected' : ''}`;
        card.innerHTML = `
          ${isCurrent ? '<span class="p-active-badge">出戰中</span>' : ''}
          ${pData.crown ? '<span class="p-crown-mark">👑</span>' : ''}
          <div class="p-icon">
            <div class="symbol-pokemon-avatar" style="border-color:${sym.color};background:radial-gradient(circle, ${sym.color}28 0%, ${sym.color}08 70%);">
              <span class="sym-p-icon">${sym.icon}</span>
              <span class="sym-p-char" style="color:${sym.color};border-color:${sym.color};">${sym.char}</span>
            </div>
          </div>
          <div class="p-name">${formatZhuyinDisplay(stageNames[stageIdx])}</div>
          <div class="p-type">${sym.pokeTypeIcon || '⚡'} ${sym.pokeType || '一般系'}</div>
          <span class="p-level-tag" style="${(pData.level || 1) >= 100 ? 'background:linear-gradient(135deg,#F59E0B,#EA580C);color:#FFF;font-weight:900;' : ''}">${(pData.level || 1) >= 100 ? '👑 Lv.100 滿級' : 'Lv.' + (pData.level || 1)}</span>
          <div style="font-size:11px;color:#D97706;font-weight:800;margin-top:4px;">絕招：${sym.word || sym.char}突擊</div>
        `;

        card.addEventListener('click', () => {
          window.audioEngine.playPop();
          switchActivePartner(partnerId);
          renderPartnerPickerCards();
        });

        dom.partnerPickerList.appendChild(card);
      });
    }
  }



  function closePartnerModal() {

    if (!dom.partnerModal) return;

    dom.partnerModal.classList.remove('active');

    dom.partnerModal.setAttribute('aria-hidden', 'true');

  }



    function updatePokedexProgressUI() {
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
    }
    const count = state.unlockAllPokemon ? 151 : (state.gen1Caught ? state.gen1Caught.length : 5);
    const total = 151;
    const pct = Math.min(100, Math.round((count / total) * 100));

    if (dom.pokedexProgressText) {
      dom.pokedexProgressText.textContent = `${count} / ${total} 隻`;
    }
    if (dom.pokedexBarFill) {
      dom.pokedexBarFill.style.width = `${pct}%`;
    }
  }



  function renderGymBadges() {
    if (!dom.gymBadgeGrid) return;

    const activeCabinet = state.badgeCabinetView || (state.examDifficulty === 'final' ? 'final' : 'midterm');
    const isFinalCabinet = (activeCabinet === 'final');

    const btnMidterm = document.getElementById('btn-cabinet-midterm');
    const btnFinal = document.getElementById('btn-cabinet-final');
    const titleEl = document.getElementById('badge-case-title');
    const countEl = document.getElementById('badge-count-text');

    if (btnMidterm && btnFinal) {
      btnMidterm.classList.toggle('active', !isFinalCabinet);
      btnFinal.classList.toggle('active', isFinalCabinet);

      btnMidterm.onclick = () => {
        window.audioEngine.playPop();
        state.badgeCabinetView = 'midterm';
        renderGymBadges();
      };
      btnFinal.onclick = () => {
        window.audioEngine.playPop();
        state.badgeCabinetView = 'final';
        renderGymBadges();
      };
    }

    if (titleEl) {
      titleEl.innerHTML = isFinalCabinet 
        ? '🦅 訓練家至尊神話秘境徽章展示盒 (Mythical Badges)'
        : '🏛️ 訓練家關東經典道館徽章展示盒 (Gym Badges)';
    }

    const badges = isFinalCabinet ? (ZHUYIN_DATA.finalBadges || []) : (ZHUYIN_DATA.gymBadges || []);
    const starsObj = isFinalCabinet ? (state.adventure.stageStarsFinal || {}) : (state.adventure.stageStars || {});

    dom.gymBadgeGrid.innerHTML = '';
    let obtainedCount = 0;

    badges.forEach(badge => {
      const isCleared = (starsObj[String(badge.stageId)] || 0) > 0;
      if (isCleared) obtainedCount++;

      const slot = document.createElement('div');
      slot.className = `gym-badge-slot ${isCleared ? 'obtained' : ''}`;
      slot.title = `${badge.name} (${badge.gym}・${isFinalCabinet ? '尊者' : '館主'}：${badge.boss})`;
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
          setMascotSpeech(`🏅 這是你通過第${badge.stageId}關獲得的【${badge.name}】！太帥了！`);
          window.audioEngine.speak(`恭喜你！這是通過第${badge.stageId}關獲得的${badge.name}！`);
        } else {
          window.audioEngine.playWrong();
          setMascotSpeech(`🔒 前往闖關地圖，挑戰第${badge.stageId}關【${badge.gym}】就能獲得這個徽章！`);
        }
      });

      dom.gymBadgeGrid.appendChild(slot);
    });

    if (countEl) countEl.textContent = `已獲得：${obtainedCount} / ${badges.length} 枚`;
  }
  function updateStarDisplay() {
    if (dom.starCount) {
      dom.starCount.textContent = state.stars;
    }
    updateTrainerHeaderUI();
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
    }
  }

  function updatePlayerRankDisplay() {
    updateTrainerHeaderUI();
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
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

  function switchTab(tabTarget) {
    dom.tabBtns.forEach(b => {
      if (b.dataset.tab === tabTarget) {
        b.classList.add('active');
        try {
          b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } catch (e) {}
      } else {
        b.classList.remove('active');
      }
    });

    dom.tabPanes.forEach(p => {
      p.classList.toggle('active', p.id === tabTarget);
    });

    if (tabTarget === 'tab-shop') {
      renderNurtureShop();
    }
    if (tabTarget === 'tab-gallery') {
      updatePokedexProgressUI();
      renderGen1Pokedex();
    }

    // 吉祥物鼓勵語音或提示
    const speeches = {
      'tab-adventure': '🗺️ 準備好前往道館闖關了嗎？點擊任何道館即可出發！',
      'tab-gallery': '🔴 歡迎來到 151 隻初代寶可夢注音圖鑑！每過一關都能解鎖收服！',
      'tab-achievements': '🏆 查看你辛苦獲得的道館榮譽徽章吧！',
      'tab-shop': '🛍️ 歡迎來到培育商店！用闖關獲得的金幣餵食夥伴、換購皇冠吧！'
    };

    if (speeches[tabTarget]) {
      setMascotSpeech(speeches[tabTarget]);
    }
  }
  window.switchToTab = switchTab;

  function setupTabNavigation() {
    dom.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        window.audioEngine.playPop();
        switchTab(btn.dataset.tab);
      });
    });

    // 點擊 Logo 回到首頁
    const btnHome = document.getElementById('btn-home-logo');
    if (btnHome) {
      btnHome.addEventListener('click', () => {
        switchTab('tab-adventure');
        showAdventureMap();
      });
    }

    // 冒險金幣培育商店快捷按鈕（直接前往培育商店）
    const btnCoin = document.getElementById('header-coin-btn');
    if (btnCoin) {
      btnCoin.addEventListener('click', () => {
        window.audioEngine.playPop();
        switchTab('tab-shop');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 榮譽星光榜快捷按鈕（直接查看道館徽章盒）
    const btnStar = document.getElementById('header-star-btn');
    if (btnStar) {
      btnStar.addEventListener('click', () => {
        window.audioEngine.playPop();
        switchTab('tab-achievements');
        window.scrollTo({ top: 0, behavior: 'smooth' });
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


  // =========================================================================
  // 👨‍👩‍👧 家長防護解鎖算術驗證系統 (Parental Math Gate System)
  // =========================================================================
  let currentParentGateAns = null;
  let onParentGateSuccessCallback = null;

  function generateParentGateMathQuestion() {
    const types = ['mul', 'add', 'sub'];
    const chosenType = types[Math.floor(Math.random() * types.length)];
    let a, b, op, ans;

    if (chosenType === 'mul') {
      // 九九乘法（小一尚未學乘法，大人可直接心算）
      a = Math.floor(Math.random() * 4) + 6; // 6, 7, 8, 9
      b = Math.floor(Math.random() * 6) + 4; // 4, 5, 6, 7, 8, 9
      op = '×';
      ans = a * b;
    } else if (chosenType === 'add') {
      // 二位數進位加法（小一尚未學進位加法）
      a = Math.floor(Math.random() * 42) + 27; // 27..68
      b = Math.floor(Math.random() * 32) + 18; // 18..49
      // 確保個位數相加 >= 10 產生進位
      if ((a % 10) + (b % 10) < 10) {
        a = Math.floor(a / 10) * 10 + (Math.floor(Math.random() * 4) + 6);
        b = Math.floor(b / 10) * 10 + (Math.floor(Math.random() * 4) + 6);
      }
      op = '+';
      ans = a + b;
    } else {
      // 二位數退位減法（小一尚未學借位減法）
      const aTens = Math.floor(Math.random() * 5) + 5; // 5..9
      const aUnits = Math.floor(Math.random() * 5); // 0..4
      const bTens = Math.floor(Math.random() * 3) + 1; // 1..3
      const bUnits = Math.floor(Math.random() * 4) + 6; // 6..9
      a = aTens * 10 + aUnits;
      b = bTens * 10 + bUnits;
      op = '-';
      ans = a - b;
    }

    return { a, b, op, ans, text: `${a} ${op} ${b} = ？` };
  }

  function showParentMathGateModal(onSuccess) {
    const modal = document.getElementById('parent-math-gate-modal');
    if (!modal) {
      if (onSuccess) onSuccess();
      return;
    }

    onParentGateSuccessCallback = onSuccess;
    const qObj = generateParentGateMathQuestion();
    currentParentGateAns = qObj.ans;

    const eqEl = document.getElementById('parent-gate-equation');
    const inputEl = document.getElementById('parent-gate-input');
    const errorEl = document.getElementById('parent-gate-error');

    if (eqEl) eqEl.textContent = qObj.text;
    if (inputEl) {
      inputEl.value = '';
    }
    if (errorEl) {
      errorEl.style.display = 'none';
      errorEl.textContent = '';
    }

    modal.style.display = 'flex';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
      if (inputEl) inputEl.focus();
    }, 120);
  }

  function verifyParentGateAnswer() {
    const inputEl = document.getElementById('parent-gate-input');
    const errorEl = document.getElementById('parent-gate-error');
    const modal = document.getElementById('parent-math-gate-modal');
    const cardEl = modal ? modal.querySelector('.modal-card') : null;

    if (!inputEl) return;
    const rawVal = inputEl.value.trim();
    if (!rawVal) {
      if (window.audioEngine && window.audioEngine.playWrong) window.audioEngine.playWrong();
      if (errorEl) {
        errorEl.textContent = '⚠️ 請先輸入計算後的數字答案喔！';
        errorEl.style.display = 'block';
      }
      inputEl.focus();
      return;
    }

    const val = parseInt(rawVal, 10);
    if (val === currentParentGateAns) {
      // 驗證成功！
      if (window.audioEngine && window.audioEngine.playBadgeGet) {
        window.audioEngine.playBadgeGet();
      } else if (window.audioEngine && window.audioEngine.playPop) {
        window.audioEngine.playPop();
      }
      const cb = onParentGateSuccessCallback;
      closeParentMathGateModal();
      if (typeof cb === 'function') {
        cb();
      }
    } else {
      // 答案錯誤：晃動卡片、更換新題目防止亂猜
      if (window.audioEngine && window.audioEngine.playWrong) window.audioEngine.playWrong();
      if (cardEl) {
        cardEl.classList.remove('shake-anim');
        void cardEl.offsetWidth;
        cardEl.classList.add('shake-anim');
      }

      const newQ = generateParentGateMathQuestion();
      currentParentGateAns = newQ.ans;
      const eqEl = document.getElementById('parent-gate-equation');
      if (eqEl) eqEl.textContent = newQ.text;

      if (errorEl) {
        errorEl.textContent = '❌ 答案不正確！為防亂猜已更換新算術題，請重新計算。';
        errorEl.style.display = 'block';
      }
      inputEl.value = '';
      inputEl.focus();
    }
  }

  function closeParentMathGateModal() {
    const modal = document.getElementById('parent-math-gate-modal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    onParentGateSuccessCallback = null;
  }

  function initParentGateEvents() {
    const btnConfirm = document.getElementById('btn-parent-gate-confirm');
    const btnCancel = document.getElementById('btn-parent-gate-cancel');
    const btnRefresh = document.getElementById('btn-parent-gate-refresh');
    const btnClose = document.getElementById('btn-parent-gate-close');
    const inputEl = document.getElementById('parent-gate-input');
    const modal = document.getElementById('parent-math-gate-modal');

    if (btnConfirm && !btnConfirm.dataset.bound) {
      btnConfirm.dataset.bound = 'true';
      btnConfirm.addEventListener('click', verifyParentGateAnswer);
    }
    if (btnCancel && !btnCancel.dataset.bound) {
      btnCancel.dataset.bound = 'true';
      btnCancel.addEventListener('click', () => {
        window.audioEngine.playPop();
        closeParentMathGateModal();
      });
    }
    if (btnClose && !btnClose.dataset.bound) {
      btnClose.dataset.bound = 'true';
      btnClose.addEventListener('click', () => {
        window.audioEngine.playPop();
        closeParentMathGateModal();
      });
    }
    if (btnRefresh && !btnRefresh.dataset.bound) {
      btnRefresh.dataset.bound = 'true';
      btnRefresh.addEventListener('click', () => {
        window.audioEngine.playPop();
        const newQ = generateParentGateMathQuestion();
        currentParentGateAns = newQ.ans;
        const eqEl = document.getElementById('parent-gate-equation');
        if (eqEl) eqEl.textContent = newQ.text;
        const errorEl = document.getElementById('parent-gate-error');
        if (errorEl) errorEl.style.display = 'none';
        if (inputEl) {
          inputEl.value = '';
          inputEl.focus();
        }
      });
    }
    if (inputEl && !inputEl.dataset.bound) {
      inputEl.dataset.bound = 'true';
      inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          verifyParentGateAnswer();
        }
      });
    }
    if (modal && !modal.dataset.bound) {
      modal.dataset.bound = 'true';
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeParentMathGateModal();
        }
      });
    }
  }

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
        state.badgeCabinetView = 'midterm';
        localStorage.setItem('zhuyin_exam_difficulty', 'midterm');
        updateDiffButtons();
        setMascotSpeech('🏛️ 已切換至【小一段考真題 1:1 原卷】！經典 10 大關東道館！');
        window.audioEngine.speak('已切換為小一段考真題關東道館！');
        renderAdventureMap();
        renderGymBadges();
      });

    }



    if (dom.btnDiffFinal) {

      dom.btnDiffFinal.addEventListener('click', () => {
        window.audioEngine.playPop();
        state.examDifficulty = 'final';
        state.badgeCabinetView = 'final';
        localStorage.setItem('zhuyin_exam_difficulty', 'final');
        updateDiffButtons();
        setMascotSpeech('🦅 已切換至【期末考高難・神話秘境十重天】！傳奇神獸出沒，專屬十神徽章！');
        window.audioEngine.speak('已切換為期末考高難神話秘境！');
        renderAdventureMap();
        renderGymBadges();
      });

    }



    updateDiffButtons();



    // 自由選關切換（家長防護算術題驗證，避免小孩自行跳關）
    initParentGateEvents();

    if (dom.btnToggleUnlockAll) {
      dom.btnToggleUnlockAll.addEventListener('click', () => {
        window.audioEngine.playPop();

        // 若目前尚未開啟自由選關，要開啟時需先由家長算術題解鎖
        if (!state.adventure.unlockAll) {
          showParentMathGateModal(() => {
            state.adventure.unlockAll = true;
            dom.btnToggleUnlockAll.textContent = '🔓 自由選關模式：開啟中';
            dom.btnToggleUnlockAll.classList.add('unlocked-mode');
            setMascotSpeech('✨ 家長驗證成功！已開啟自由選關模式！全部 10 個關卡都可以直接挑戰囉！');
            renderAdventureMap();
          });
        } else {
          // 若目前已開啟，點擊直接關閉並鎖回循序闖關
          state.adventure.unlockAll = false;
          dom.btnToggleUnlockAll.textContent = '🔓 自由選關模式：關閉';
          dom.btnToggleUnlockAll.classList.remove('unlocked-mode');
          setMascotSpeech('🗺️ 恢復循序漸進闖關模式！一關一關挑戰更有成就感！');
          renderAdventureMap();
        }
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



  function getCurrentAdventureStages() {
    return state.examDifficulty === 'final' ? (ZHUYIN_DATA.finalStages || ZHUYIN_DATA.adventureStages) : ZHUYIN_DATA.adventureStages;
  }

  function getCurrentGymBadges() {
    return state.examDifficulty === 'final' ? (ZHUYIN_DATA.finalBadges || ZHUYIN_DATA.gymBadges) : ZHUYIN_DATA.gymBadges;
  }

  function getCurrentStageStars() {
    return state.examDifficulty === 'final' ? (state.adventure.stageStarsFinal || {}) : (state.adventure.stageStars || {});
  }

  function saveCurrentStageStars() {
    if (state.examDifficulty === 'final') {
      localStorage.setItem('zhuyin_stage_progress_final', JSON.stringify(state.adventure.stageStarsFinal || {}));
    } else {
      localStorage.setItem('zhuyin_stage_progress', JSON.stringify(state.adventure.stageStars || {}));
      localStorage.setItem('zhuyin_stage_progress_midterm', JSON.stringify(state.adventure.stageStars || {}));
    }
  }

  function isStageUnlocked(stageId) {
    if (state.adventure.unlockAll) return true;
    if (stageId === 1) return true;
    const starsObj = getCurrentStageStars();
    return (starsObj[String(stageId - 1)] || 0) > 0;
  }



    const STAGE_MAP_COORDS = {
    1: { x: 120, y: 120, left: '12%', top: '18.5%' },
    2: { x: 350, y: 100, left: '35%', top: '15.4%' },
    3: { x: 620, y: 110, left: '62%', top: '16.9%' },
    4: { x: 860, y: 160, left: '86%', top: '24.6%' },
    5: { x: 760, y: 320, left: '76%', top: '49.2%' },
    6: { x: 480, y: 290, left: '48%', top: '44.6%' },
    7: { x: 180, y: 340, left: '18%', top: '52.3%' },
    8: { x: 140, y: 520, left: '14%', top: '80.0%' },
    9: { x: 460, y: 540, left: '46%', top: '83.1%' },
    10: { x: 840, y: 530, left: '84%', top: '81.5%' }
  };

  const ROAD_SEGMENTS = [
    "M 120,120 C 230,110 280,100 350,100", // 1 -> 2
    "C 440,100 530,105 620,110",           // 2 -> 3
    "C 720,115 800,120 860,160",           // 3 -> 4
    "C 920,200 860,280 760,320",           // 4 -> 5
    "C 670,340 570,280 480,290",           // 5 -> 6
    "C 380,300 270,320 180,340",           // 6 -> 7
    "C 90,360 80,470 140,520",             // 7 -> 8
    "C 240,560 360,530 460,540",           // 8 -> 9
    "C 580,550 720,540 840,530"            // 9 -> 10
  ];

  let isTrainerMoving = false;

  function updateMapTrainerVisuals() {
    const avatarEl = document.getElementById('map-trainer-avatar');
    const petEl = document.getElementById('map-trainer-partner');
    if (!avatarEl || !petEl) return;

    const charAvatar = (state.profile && state.profile.avatar) ? state.profile.avatar : '👦';
    avatarEl.textContent = charAvatar;

    const partner = (typeof getCurrentPartnerInfo === 'function') ? getCurrentPartnerInfo() : null;
    if (partner && partner.icon) {
      petEl.textContent = partner.icon;
    } else {
      petEl.textContent = '⚡';
    }
  }

  function moveTrainerToStage(stage, onArrive) {
    if (isTrainerMoving) return;
    const marker = document.getElementById('map-trainer-marker');
    const bubble = document.getElementById('trainer-bubble-cloud');
    const duo = document.getElementById('trainer-sprite-duo');

    if (!marker) {
      if (onArrive) onArrive();
      return;
    }

    const targetCoords = STAGE_MAP_COORDS[stage.id] || STAGE_MAP_COORDS[1];
    const currentLeft = parseFloat(marker.style.left) || 12;
    const targetLeft = parseFloat(targetCoords.left);

    // 面向移動方向
    if (duo) {
      if (targetLeft < currentLeft) {
        duo.style.transform = 'scaleX(-1)';
      } else {
        duo.style.transform = 'scaleX(1)';
      }
    }

    // 若本來就已經在此關卡，小跳躍直接進入
    if (Math.abs(targetLeft - currentLeft) < 1.5 && Math.abs(parseFloat(marker.style.top) - parseFloat(targetCoords.top)) < 1.5) {
      if (bubble) {
        bubble.textContent = `進入【${stage.name}】對決！`;
        bubble.classList.add('visible');
      }
      window.audioEngine.playPop();
      setTimeout(() => {
        if (bubble) bubble.classList.remove('visible');
        if (onArrive) onArrive();
      }, 350);
      return;
    }

    // 啟動跑步移動
    isTrainerMoving = true;
    marker.classList.add('is-walking');
    if (bubble) {
      bubble.textContent = `出發！前往【${stage.name}】！`;
      bubble.classList.add('visible');
    }
    window.audioEngine.playPop();

    // 移動到目標座標
    marker.style.left = targetCoords.left;
    marker.style.top = targetCoords.top;
    state.adventure.trainerStageId = stage.id;
    localStorage.setItem('zhuyin_trainer_stage', stage.id.toString());

    setTimeout(() => {
      marker.classList.remove('is-walking');
      if (bubble) {
        bubble.textContent = `抵達道館！`;
      }
      if (window.audioEngine.playBadgeGet) {
        window.audioEngine.playBadgeGet();
      }
      if (window.confetti) window.confetti.trigger(35);

      setTimeout(() => {
        isTrainerMoving = false;
        if (bubble) bubble.classList.remove('visible');
        if (onArrive) onArrive();
      }, 400);
    }, 900);
  }

  function renderAdventureMap() {
    const isFinal = (state.examDifficulty === 'final');
    const stages = getCurrentAdventureStages();
    const starsObj = getCurrentStageStars();
    const badges = getCurrentGymBadges();

    // 🌌 切換神話秘境星空模式視覺主題
    const mapContainer = document.getElementById('adventure-map-view');
    if (mapContainer) {
      if (isFinal) {
        mapContainer.classList.add('final-map-mode');
      } else {
        mapContainer.classList.remove('final-map-mode');
      }
    }

    // 🎯 動態更新頂部橫幅文案與徽章說明
    const heroTitle = document.querySelector('.adventure-hero-banner .hero-left h2');
    const heroDesc = document.querySelector('.adventure-hero-banner .hero-left p');
    if (heroTitle) {
      heroTitle.innerHTML = isFinal 
        ? '🦅 期末考高難・神話秘境十重天 <span style="font-size:14px;background:#7E22CE;color:#FFF;padding:2px 8px;border-radius:10px;font-weight:900;margin-left:6px;">傳奇神獸出沒</span>'
        : '🗺️ ㄅㄆㄇ 寶可夢道館巡迴大挑戰 <span style="font-size:14px;background:#059669;color:#FFF;padding:2px 8px;border-radius:10px;font-weight:900;margin-left:6px;">1:1 段考真題</span>';
    }
    if (heroDesc) {
      heroDesc.textContent = isFinal
        ? '深入十重神話秘境！降伏急凍鳥、閃電鳥、火焰鳥與究極超夢，收集 10 大至尊神話徽章與稀有神獸！'
        : '挑戰 10 大屬性道館館主，收集 10 枚道館徽章，用寶貝球收服 37 隻野生注音寶可夢！';
    }

    let clearedCount = 0;
    let totalStageStars = 0;
    let latestTargetId = 1;

    stages.forEach(s => {
      const earned = starsObj[String(s.id)] || 0;
      if (earned > 0) {
        clearedCount++;
        totalStageStars += earned;
        if (s.id < stages.length) latestTargetId = s.id + 1;
      }
    });

    if (dom.advClearedCount) dom.advClearedCount.textContent = `${clearedCount} / ${stages.length}`;
    if (dom.advStageStars) dom.advStageStars.textContent = `${totalStageStars} / ${stages.length * 3}`;

    updateTrainerHeaderUI();
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
    }
    renderGymBadges();

    // 1. 渲染大地圖道路的高亮金色/紫色已通關路段
    const activeRoadSvg = document.getElementById('svg-road-active');
    if (activeRoadSvg) {
      let activePathD = '';
      for (let i = 1; i <= clearedCount && i < stages.length; i++) {
        activePathD += (activePathD ? ' ' : '') + ROAD_SEGMENTS[i - 1];
      }
      activeRoadSvg.setAttribute('d', activePathD);
    }

    // 2. 訓練師初始定位 (若有紀錄則定位在紀錄處，否則定位在當前挑戰關卡)
    updateMapTrainerVisuals();
    const trainerMarker = document.getElementById('map-trainer-marker');
    if (trainerMarker && !isTrainerMoving) {
      const savedStageId = parseInt(localStorage.getItem(isFinal ? 'zhuyin_trainer_stage_final' : 'zhuyin_trainer_stage') || String(latestTargetId), 10);
      const initialStageId = Math.min(Math.max(1, savedStageId), stages.length);
      const initialCoords = STAGE_MAP_COORDS[initialStageId] || STAGE_MAP_COORDS[1];
      trainerMarker.style.left = initialCoords.left;
      trainerMarker.style.top = initialCoords.top;
      state.adventure.trainerStageId = initialStageId;
    }

    // 3. 渲染大地圖 10 個道館/秘境節點地標
    const landmarksLayer = document.getElementById('map-landmarks-layer');
    if (landmarksLayer) {
      landmarksLayer.innerHTML = '';
      stages.forEach(stage => {
        const coords = STAGE_MAP_COORDS[stage.id] || { left: '50%', top: '50%' };
        const unlocked = isStageUnlocked(stage.id);
        const earnedStars = starsObj[String(stage.id)] || 0;
        const isCurrentTarget = unlocked && earnedStars === 0 && stage.id === latestTargetId;
        const badge = badges.find(b => b.stageId === stage.id);
        const starStr = [1, 2, 3].map(n => (n <= earnedStars ? '⭐' : '☆')).join('');

        const node = document.createElement('div');
        node.className = `map-landmark-node ${unlocked ? 'unlocked' : 'locked'} ${earnedStars > 0 ? 'cleared' : ''} ${isCurrentTarget ? 'current-target' : ''}`;
        node.style.left = coords.left;
        node.style.top = coords.top;
        node.title = `${stage.name}（${isFinal ? '秘境尊者' : '館主'}：${stage.bossName}）`;

        node.innerHTML = `
          <div class="landmark-badge-top" style="background:${unlocked ? stage.color : '#94A3B8'};">
            ${isFinal ? '秘境' : '道館'} ${stage.id}
          </div>
          <div class="landmark-icon-bubble" style="background:${unlocked ? stage.bgGradient : '#E2E8F0'}; border-color:${unlocked ? stage.color : '#CBD5E1'};">
            <span class="landmark-emoji">${unlocked ? stage.icon : '🔒'}</span>
            ${isCurrentTarget ? '<div class="landmark-beacon-ring"></div>' : ''}
            ${earnedStars > 0 ? '<span class="landmark-cleared-star">⭐</span>' : ''}
            ${earnedStars === 3 ? '<span class="landmark-crown-star">👑</span>' : ''}
          </div>
          <div class="landmark-title-plate">
            <strong class="landmark-name">${badge ? badge.gym : stage.name}</strong>
            <div class="landmark-stars-row" style="color:${earnedStars > 0 ? '#F59E0B' : '#CBD5E1'};">
              ${starStr}
            </div>
          </div>
          <div class="landmark-boss-tag" style="border-color:${unlocked ? stage.color : '#CBD5E1'};">
            <span>${stage.bossIcon}</span>
            <span>${stage.bossName}</span>
          </div>
        `;

        node.addEventListener('click', () => {
          if (isTrainerMoving) return;
          if (!unlocked) {
            window.audioEngine.playWrong();
            const bubble = document.getElementById('trainer-bubble-cloud');
            if (bubble) {
              bubble.textContent = isFinal ? '要先通過前面的秘境喔！' : '要先通過前面的道館喔！';
              bubble.classList.add('visible');
              setTimeout(() => bubble.classList.remove('visible'), 1600);
            }
            window.audioEngine.speak(isFinal ? '要先通過前面的秘境，才能挑戰這一座神話秘境！也可以開啟自由選關！' : '要先通過前面的道館，才能挑戰這一座道館！也可以開啟自由選關！');
            return;
          }

          moveTrainerToStage(stage, () => {
            startStageBattle(stage);
          });
        });

        landmarksLayer.appendChild(node);
      });
    }

    // 4. 同步渲染備用清單檢視 (Card Grid)
    if (dom.advStagesGrid) {
      dom.advStagesGrid.innerHTML = '';
      stages.forEach(stage => {
        const unlocked = isStageUnlocked(stage.id);
        const earnedStars = starsObj[String(stage.id)] || 0;
        const isCurrentTarget = unlocked && earnedStars === 0 && stage.id === latestTargetId;
        const badge = badges.find(b => b.stageId === stage.id);
        const starStr = [1, 2, 3].map(n => (n <= earnedStars ? '⭐' : '☆')).join('');

        const card = document.createElement('div');
        card.className = `stage-node-card ${unlocked ? '' : 'locked'} ${isCurrentTarget ? 'current-target' : ''}`;
        if (unlocked && earnedStars > 0) {
          card.style.borderColor = stage.color;
        }

        card.innerHTML = `
          <div class="stage-node-header" style="background:${unlocked ? stage.bgGradient : '#F1F5F9'};">
            <div class="stage-top-row">
              <div style="display:flex;align-items:center;gap:6px;">
                <span class="stage-num-badge" style="background:${unlocked ? stage.color : '#ADB5BD'};">
                  ${isFinal ? '秘境' : '道館'} ${stage.id}
                </span>
                <span class="battle-diff-badge ${isFinal ? 'final' : 'midterm'}" style="font-size:11px;padding:2px 8px;">
                  ${isFinal ? '🦅 期末高難神話' : '🏛️ 小一段考 1:1 原卷'}
                </span>
              </div>
              <span class="stage-stars-row" style="color:${earnedStars > 0 ? '#FCC419' : '#CED4DA'};">
                ${starStr}
              </span>
            </div>
            <div class="stage-boss-preview">
              <span class="boss-emoji">${unlocked ? stage.icon : '🔒'}</span>
              <div class="stage-boss-info">
                <h3>${stage.name}</h3>
                <p>${stage.subtitle}</p>
              </div>
            </div>
          </div>
          <div class="stage-node-body">
            <div class="stage-boss-row">
              <span style="font-size:12px;color:#868E96;font-weight:700;">${isFinal ? '秘境尊者：' : '駐守館主：'}</span>
              <strong style="color:${stage.color};font-size:13px;">${stage.bossName}</strong>
              <span style="font-size:11px;background:#F1F3F5;color:#495057;padding:1px 6px;border-radius:4px;font-weight:700;">
                ${stage.bossType}
              </span>
            </div>
            <div class="stage-badge-preview">
              <span>🏅 徽章：</span>
              <strong>${badge ? badge.name : '榮譽徽章'}</strong>
            </div>
            <button class="stage-enter-btn" ${unlocked ? '' : 'disabled'} style="background:${unlocked ? stage.color : '#CED4DA'};">
              ${unlocked ? (earnedStars > 0 ? '🔄 再次挑戰' : '⚔️ 前往挑戰') : '🔒 尚未解鎖'}
            </button>
          </div>
        `;

        card.addEventListener('click', () => {
          if (!unlocked) {
            window.audioEngine.playWrong();
            window.audioEngine.speak(isFinal ? '要先通過前面的秘境，才能挑戰這一座神話秘境！也可以開啟自由選關！' : '要先通過前面的道館，才能挑戰這一座道館！也可以開啟自由選關！');
            return;
          }
          window.audioEngine.playPop();
          startStageBattle(stage);
        });

        dom.advStagesGrid.appendChild(card);
      });
    }
  }
  function assignOpponentPokemonToQuestions(stage, questions, isFinal) {
    if (typeof GEN1_POKEMON_LIST === 'undefined' || !questions || questions.length === 0) return;

    const usedIds = new Set();
    const stageId = stage.id || 1;
    const caughtList = state.gen1Caught || [];

    // 🦅 期末考高難秘境專屬：極罕見、傳說神獸與史詩幼年寶可夢池 (全部嚴格保證最初階形態)
    const FINAL_STAGE_EXCLUSIVE_POOL = {
      1: [131, 143, 113, 123, 127, 128, 115, 133, 137, 138],
      2: [143, 131, 113, 123, 127, 128, 115, 133, 137, 140],
      3: [147, 131, 143, 142, 138, 140, 125, 126, 122, 129],
      4: [142, 138, 140, 147, 131, 143, 125, 126, 122, 137],
      5: [132, 147, 142, 131, 143, 113, 125, 126, 127, 128],
      6: [126, 125, 147, 142, 131, 143, 132, 138, 140, 113],
      7: [144, 145, 146, 147, 142, 143, 131, 132, 125, 126],
      8: [145, 144, 146, 147, 142, 143, 131, 132, 125, 126],
      9: [146, 144, 145, 150, 151, 147, 142, 143, 131, 132],
      10: [150, 151, 144, 145, 146, 147, 142, 143, 131, 132]
    };

    questions.forEach((q, i) => {
      const isBossQ = (i === questions.length - 1);
      let chosenId = null;

      if (isFinal) {
        // 期末考高難：Boss題必定出戰對應關卡之神話Boss
        if (isBossQ && stage.bossId && BASE_POKEMON_IDS.includes(stage.bossId)) {
          chosenId = stage.bossId;
        } else if (isBossQ && stage.id === 3) {
          chosenId = 147; // 逆鱗神龍：史詩迷你龍！
        }

        if (!chosenId) {
          const pool = (FINAL_STAGE_EXCLUSIVE_POOL[stageId] || FINAL_STAGE_EXCLUSIVE_POOL[1]).filter(id => BASE_POKEMON_IDS.includes(id));
          const uncaught = pool.filter(id => !caughtList.includes(id) && !usedIds.has(id));
          if (uncaught.length > 0) {
            chosenId = uncaught[Math.floor(Math.random() * uncaught.length)];
          } else {
            const unused = pool.filter(id => !usedIds.has(id));
            chosenId = (unused.length > 0 ? unused : pool)[Math.floor(Math.random() * (unused.length > 0 ? unused.length : pool.length))];
          }
        }
      } else {
        // 段考真題模式：經典關東梯隊分佈
        let targetTier = 1;
        if (stageId <= 2) {
          targetTier = isBossQ ? 3 : (i >= 3 ? 2 : 1);
        } else if (stageId <= 4) {
          targetTier = isBossQ ? 3 : (i >= 2 ? 3 : 2);
        } else if (stageId <= 6) {
          targetTier = isBossQ ? 4 : (i >= 2 ? 3 : 2);
        } else if (stageId <= 8) {
          targetTier = isBossQ ? 4 : (i >= 2 ? 4 : 3);
        } else if (stageId === 9) {
          targetTier = isBossQ ? 5 : (i >= 2 ? 4 : 4);
        } else {
          targetTier = isBossQ ? 5 : (i >= 2 ? 5 : 4);
        }

        if (isBossQ && stage.bossId && !usedIds.has(stage.bossId) && BASE_POKEMON_IDS.includes(stage.bossId)) {
          if (!caughtList.includes(stage.bossId)) {
            chosenId = stage.bossId;
          }
        }

        if (!chosenId) {
          const tierPool = POKEMON_RARITY_TIERS[targetTier] || POKEMON_RARITY_TIERS[1];
          const uncaughtInTier = tierPool.filter(id => !caughtList.includes(id) && !usedIds.has(id));

          if (uncaughtInTier.length > 0) {
            chosenId = uncaughtInTier[Math.floor(Math.random() * uncaughtInTier.length)];
          } else {
            let anyUncaught = [];
            for (let t = targetTier; t >= 1; t--) {
              const pList = POKEMON_RARITY_TIERS[t].filter(id => !caughtList.includes(id) && !usedIds.has(id));
              if (pList.length > 0) { anyUncaught = pList; break; }
            }
            if (anyUncaught.length === 0) {
              for (let t = targetTier + 1; t <= 5; t++) {
                const pList = POKEMON_RARITY_TIERS[t].filter(id => !caughtList.includes(id) && !usedIds.has(id));
                if (pList.length > 0) { anyUncaught = pList; break; }
              }
            }
            if (anyUncaught.length > 0) {
              chosenId = anyUncaught[Math.floor(Math.random() * anyUncaught.length)];
            } else {
              const unusedInTier = tierPool.filter(id => !usedIds.has(id));
              const finalCandidates = unusedInTier.length > 0 ? unusedInTier : tierPool;
              chosenId = finalCandidates[Math.floor(Math.random() * finalCandidates.length)];
            }
          }
        }
      }

      usedIds.add(chosenId);
      const pObj = GEN1_POKEMON_LIST.find(p => p.id === chosenId) || GEN1_POKEMON_LIST[0];
      q.oppPokemon = pObj;
      q.isShiny = (Math.random() < 0.12);
    });
  }
  function startStageBattle(stage) {

    state.adventure.activeStage = stage;

    state.adventure.qIndex = 0;

    state.adventure.score = 0; // 每關計分初始化為 0 分

    state.adventure.hearts = 3;

    state.adventure.combo = 0;

    state.adventure.mistakes = 0;

    state.adventure.isAnswering = false;



    // 依據選擇的段考難度與題目生成器進行「題目無限隨機變化，但關卡難度嚴格固定」
    const isFinal = state.examDifficulty === 'final';
    let selectedQuestions = [];
    if (typeof generateStageQuestions === 'function') {
      selectedQuestions = generateStageQuestions(stage, 5, isFinal);
    } else {
      const rawPool = (isFinal && stage.finalQuestions && stage.finalQuestions.length > 0)
        ? stage.finalQuestions
        : (stage.questions || []);
      const shuffledPool = [...rawPool].sort(() => Math.random() - 0.5);
      selectedQuestions = shuffledPool.slice(0, 5);
    }

    state.adventure.activeQuestions = selectedQuestions;



    if (dom.advMapView) dom.advMapView.style.display = 'none';

    if (dom.advBattleView) dom.advBattleView.style.display = 'block';



    // 🔴 依照各題目難度挑選對戰對手寶可夢（題目/關卡越困難，遭遇的寶可夢越稀有！）
    assignOpponentPokemonToQuestions(stage, selectedQuestions, isFinal);
    const firstOpp = selectedQuestions[0] ? selectedQuestions[0].oppPokemon : null;
    state.adventure.currentOpponentPokemon = firstOpp;
    state.adventure.caughtInCurrentBattle = [];

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

            <div class="battle-score-pill" id="battle-score-pill" style="background:#FEF3C7;color:#92400E;padding:4px 12px;border-radius:16px;font-weight:900;border:2px solid #F59E0B;display:inline-flex;align-items:center;gap:4px;font-size:14px;">
              💯 得分：<span id="battle-score-num">0</span> / 100 分
            </div>

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

            <!-- 右上方：對手/野生寶可夢真實立繪 -->
            <div class="poke-opponent-zone" id="poke-opp-zone">
              <div class="poke-opponent-plate">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <strong style="font-size:16px;color:#1F2937;" id="poke-opp-name">野生的【${firstOpp ? formatZhuyinDisplay(firstOpp.name, firstOpp.zhuyin) : '寶可夢'}】 <span class="opp-dex-badge">${firstOpp ? firstOpp.dexNo : ''}</span></strong>
                  <span style="font-size:12px;background:#E0E7FF;color:#4338CA;padding:2px 8px;border-radius:10px;font-weight:900;" id="poke-opp-level">Lv.${stage.id * 4 + (isFinal ? 8 : 0)}</span>
                </div>
                <div style="font-size:12px;font-weight:800;margin-top:2px;" id="poke-opp-type">${firstOpp ? firstOpp.types.map(t => `<span class="battle-type-pill" style="background:${firstOpp.color || '#3B82F6'};">${firstOpp.icon || '⚡'} ${t}系</span>`).join(' ') : '⚡ 電氣系'}</div>
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
              <div class="poke-opponent-sprite" id="poke-opp-sprite" style="border-color:${firstOpp ? (firstOpp.color || '#4CAF50') : '#4CAF50'};">
                ${firstOpp ? `<img src="assets/pokemon/gen1/${firstOpp.id}.png" alt="${firstOpp.name}" class="pokemon-opponent-img" onerror="this.onerror=null;this.src='${firstOpp.image}';" />` : '🐾'}
              </div>
            </div>



            <!-- 左下方：我方出戰寶可夢 -->

            <div class="poke-player-zone">

              <div class="poke-player-sprite" id="poke-player-sprite" title="點擊換出戰夥伴！">

                ${getPokemonAvatarHtml(partnerObj)}

              </div>

              <div class="poke-player-plate">

                <div style="display:flex;justify-content:space-between;align-items:center;">

                  <strong style="font-size:16px;color:#1F2937;" id="poke-player-name">${formatZhuyinDisplay(partnerObj.name)}</strong>

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

            <h3 class="question-prompt-text" id="battle-q-prompt" style="font-size:24px;line-height:1.6;margin:0;"></h3>

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

          if (q && q.speakText) {

            btnListen.classList.add('reading-now');

            btnListen.innerHTML = '<span>🔊</span> 正在為你朗讀題目...';

            window.audioEngine.speak(q.speakText, {

              onEnd: () => {

                const btn = document.getElementById('btn-poke-listen');

                if (btn) {

                  btn.classList.remove('reading-now');

                  btn.innerHTML = '<span>🔊</span> 聽老師清晰朗讀題目';

                }

              }

            });

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

    const scoreNum = document.getElementById('battle-score-num');
    if (scoreNum) scoreNum.textContent = state.adventure.score || 0;



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
    const prevGrid = document.getElementById('battle-options-grid');
    if (prevGrid) prevGrid.classList.remove('options-locked');
    const wrongFb = document.getElementById('battle-wrong-feedback');
    if (wrongFb) wrongFb.style.display = 'none';

    const q = questions[state.adventure.qIndex];
    const isFinal = (state.examDifficulty === 'final');



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



    // 🔴 載入本題專屬對手寶可夢立繪、屬性與名稱（題目越難，對應寶可夢越稀有！）
    const opp = q.oppPokemon || state.adventure.currentOpponentPokemon || (typeof GEN1_POKEMON_LIST !== 'undefined' ? GEN1_POKEMON_LIST[0] : null);
    state.adventure.currentOpponentPokemon = opp;

    const oppName = document.getElementById('poke-opp-name');
    const oppType = document.getElementById('poke-opp-type');
    const oppLevel = document.getElementById('poke-opp-level');
    const promptText = document.getElementById('battle-q-prompt');

    if (opp && oppSprite) {
      oppSprite.classList.remove('pokemon-fleeing-away');
      oppSprite.innerHTML = `
        <img src="assets/pokemon/gen1/${opp.id}.png" alt="${opp.name}" class="pokemon-opponent-img ${q.isShiny ? 'shiny-glow' : ''}" onerror="this.onerror=null;this.src='${opp.image}';" />
        ${q.isShiny ? '<span class="shiny-star-badge" style="position:absolute;top:-4px;right:-4px;background:#F59E0B;color:#FFF;font-size:10px;padding:2px 6px;border-radius:10px;font-weight:900;box-shadow:0 2px 4px rgba(0,0,0,0.2);">✨ 閃光</span>' : ''}
      `;
      oppSprite.style.borderColor = opp.color || '#3B82F6';
      oppSprite.style.background = `radial-gradient(circle, #FFFFFF 35%, ${(opp.color || '#3B82F6')}25 100%)`;
    }

    if (opp && oppName) {
      const isBossQ = (state.adventure.qIndex === questions.length - 1);
      const prefix = q.isShiny ? '✨ 稀有閃光' : (isBossQ ? '👑 道館守護' : '野生的');
      oppName.innerHTML = `${prefix}【${formatZhuyinDisplay(opp.name, opp.zhuyin)}】 <span class="opp-dex-badge">${opp.dexNo}</span>`;
    }

    if (opp && oppType) {
      oppType.innerHTML = opp.types.map(t => `<span class="battle-type-pill" style="background:${opp.color || '#3B82F6'};">${opp.icon || '⚡'} ${t}系</span>`).join(' ');
    }

    if (oppLevel) {
      const baseLvl = stage.id * 4 + state.adventure.qIndex * 2 + (isFinal ? 8 : 0);
      oppLevel.textContent = `Lv.${Math.min(99, baseLvl)}`;
    }



    const promptTag = document.getElementById('poke-battle-prompt-tag');

    const readingCard = document.getElementById('battle-reading-card');

    const readingText = document.getElementById('reading-passage-text');



    if (q.qType === 'reading' && q.passage) {

      if (promptTag) promptTag.textContent = '📖 段考兒歌閱讀測驗：';

      if (readingCard) readingCard.style.display = 'block';

      if (readingText) readingText.innerHTML = addZhuyinRuby(q.passage);

    } else {

      if (readingCard) readingCard.style.display = 'none';

      if (q.qType === 'choice') {

        if (promptTag) promptTag.textContent = '📝 段考觀念選擇題：';

      } else if (q.qType === 'fill_in') {

        if (promptTag) promptTag.textContent = '✏️ 語詞注音填空題：';

      } else {

        if (promptTag) promptTag.textContent = '🔴 道館考核題目：';

      }

    }



    // 題目文字絕不標註注音，避免直接洩漏答案；由正音班老師清晰語音朗讀

    let safePrompt = q.prompt || '';

    if (q.qType === 'choice' || q.qType === 'reading' || q.qType === 'fill_in') {

      safePrompt = q.prompt;

    } else {

      safePrompt = safePrompt.replace(/[ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ]/g, '❓');

    }

    if (promptText) promptText.textContent = safePrompt;

    



    // 依據國小段考真實 7 大題型動態渲染專屬交互介面

    const shuffled = [...q.options].sort(() => Math.random() - 0.5);

    const optionsGrid = document.getElementById('battle-options-grid');

    if (optionsGrid) {

      optionsGrid.innerHTML = '';

      renderAuthenticExamInteraction(optionsGrid, q, stage, shuffled, handleBattleAnswer, safePrompt);

    }



    // 🔴 每換一題，自動開始念題目！
    const btnListen = document.getElementById('btn-poke-listen');

    if (btnListen) {

      btnListen.classList.add('reading-now');

      btnListen.innerHTML = '<span>🔊</span> 正在為你朗讀題目...';

    }

    if (window._stageQSpeechTimeout) {
      clearTimeout(window._stageQSpeechTimeout);
      window._stageQSpeechTimeout = null;
    }

    // 延遲 220ms 等候切題動畫與新題 DOM 渲染平穩就緒後，100% 由頭清晰自動朗讀考題！
    window._stageQSpeechTimeout = setTimeout(() => {
      window._stageQSpeechTimeout = null;
      if (q && q.speakText) {

        window.audioEngine.speak(q.speakText, {

          onEnd: () => {

            const btn = document.getElementById('btn-poke-listen');

            if (btn) {

              btn.classList.remove('reading-now');

              btn.innerHTML = '<span>🔊</span> 聽老師清晰朗讀題目';

            }

          }

        });

      } else {

        const btn = document.getElementById('btn-poke-listen');

        if (btn) {

          btn.classList.remove('reading-now');

          btn.innerHTML = '<span>🔊</span> 聽老師清晰朗讀題目';

        }

      }

    }, 220);

  }







// =========================================================================

  // 台灣教育部小一國語注音自動標音引擎 (Grade 1 Zhuyin Ruby Auto-Annotator)

  // 包含 1,200+ 常用國小生字與兒歌/閱讀測驗專用語詞，提供教育部標準注音與聲調

  // =========================================================================

  const TAIWAN_ZHUYIN_PHRASES = {"出戰夥伴": ["ㄔㄨ","ㄓㄢˋ","ㄏㄨㄛˇ","ㄅㄢˋ"], "夥伴": ["ㄏㄨㄛˇ","ㄅㄢˋ"], "雷之石": ["ㄌㄟˊ","ㄓ","ㄕˊ"], "水之石": ["ㄕㄨㄟˇ","ㄓ","ㄕˊ"], "火之石": ["ㄏㄨㄛˇ","ㄓ","ㄕˊ"], "葉之石": ["ㄧㄝˋ","ㄓ","ㄕˊ"], "月之石": ["ㄩㄝˋ","ㄓ","ㄕˊ"], "終極滿級金色糖果": ["ㄓㄨㄥ","ㄐㄧˊ","ㄇㄢˇ","ㄐㄧˊ","ㄐㄧㄣ","ㄙㄜˋ","ㄊㄤˊ","ㄍㄨㄛˇ"], "終極訓練完成": ["ㄓㄨㄥ","ㄐㄧˊ","ㄒㄩㄣˋ","ㄌㄧㄢˋ","ㄨㄢˊ","ㄔㄥˊ"], "終極訓練": ["ㄓㄨㄥ","ㄐㄧˊ","ㄒㄩㄣˋ","ㄌㄧㄢˋ"], "神奇經驗糖果": ["ㄕㄣˊ","ㄑㄧˊ","ㄐㄧㄥ","ㄧㄢˋ","ㄊㄤˊ","ㄍㄨㄛˇ"], "元氣愛心蛋糕": ["ㄩㄢˊ","ㄑㄧˋ","ㄞˋ","ㄒㄧㄣ","ㄉㄢˋ","ㄍㄠ"], "屬性神奇進化石": ["ㄕㄨˇ","ㄒㄧㄥˋ","ㄕㄣˊ","ㄑㄧˊ","ㄐㄧㄣˋ","ㄏㄨㄚˋ","ㄕˊ"], "甜甜蜜莓果盒": ["ㄊㄧㄢˊ","ㄊㄧㄢˊ","ㄇㄧˋ","ㄇㄟˊ","ㄍㄨㄛˇ","ㄏㄜˊ"], "彩虹能量果凍": ["ㄘㄞˇ","ㄏㄨㄥˊ","ㄋㄥˊ","ㄌㄧㄤˋ","ㄍㄨㄛˇ","ㄉㄨㄥˋ"], "王者冠軍王冠": ["ㄨㄤˊ","ㄓㄜˇ","ㄍㄨㄢ","ㄐㄩㄣ","ㄨㄤˊ","ㄍㄨㄢ"], "寶可夢培育商店": ["ㄆㄟˊ","ㄩˋ","ㄕㄤ","ㄉㄧㄢˋ"], "培育禮物": ["ㄆㄟˊ","ㄩˋ","ㄌㄧˇ","ㄨˋ"], "神奇道具": ["ㄕㄣˊ","ㄑㄧˊ","ㄉㄠˋ","ㄐㄩˋ"], "屬性寶石": ["ㄕㄨˇ","ㄒㄧㄥˋ","ㄅㄠˇ","ㄕˊ"], "蛋糕": ["ㄉㄢˋ","ㄍㄠ"], "商店": ["ㄕㄤ","ㄉㄧㄢˋ"], "禮物": ["ㄌㄧˇ","ㄨˋ"], "道具": ["ㄉㄠˋ","ㄐㄩˋ"], "王冠": ["ㄨㄤˊ","ㄍㄨㄢ"], "果凍": ["ㄍㄨㄛˇ","ㄉㄨㄥˋ"], "糖果": ["ㄊㄤˊ","ㄍㄨㄛˇ"], "金幣": ["ㄐㄧㄣ","ㄅㄧˋ"], "音樂": ["ㄧㄣ", "ㄩㄝˋ"], "快樂": ["ㄎㄨㄞˋ", "ㄌㄜˋ"], "睡覺": ["ㄕㄨㄟˋ", "ㄐㄧㄠˋ"], "覺得": ["ㄐㄩㄝˊ", "˙ㄉㄜ"], "長頸鹿": ["ㄔㄤˊ", "ㄐㄧㄥˇ", "ㄌㄨˋ"], "長大": ["ㄓㄤˇ", "ㄉㄚˋ"], "游泳": ["ㄧㄡˊ", "ㄩㄥˇ"], "白鵝": ["ㄅㄞˊ", "ㄜˊ"], "我們": ["ㄨㄛˇ", "˙ㄇㄣ"], "筷子": ["ㄎㄨㄞˋ", "˙ㄗ"], "桌子": ["ㄓㄨㄛ", "˙ㄗ"], "鴨子": ["ㄧㄚ", "˙ㄗ"], "椅子": ["ㄧˇ", "˙ㄗ"], "帽子": ["ㄇㄠˋ", "˙ㄗ"], "褲子": ["ㄎㄨˋ", "˙ㄗ"], "什麼": ["ㄕㄣˊ", "˙ㄇㄜ"], "怎麼": ["ㄗㄣˇ", "˙ㄇㄜ"], "那麼": ["ㄋㄚˋ", "˙ㄇㄜ"], "這麼": ["ㄓㄜˋ", "˙ㄇㄜ"], "安和國小": ["ㄢ", "ㄏㄜˊ", "ㄍㄨㄛˊ", "ㄒㄧㄠˇ"], "兒歌": ["ㄦˊ", "ㄍㄜ"], "閱讀測驗": ["ㄩㄝˋ", "ㄉㄨˊ", "ㄘㄜˋ", "ㄧㄢˋ"], "妙蛙種子": ["ㄇㄧㄠˋ", "ㄨㄚ", "ㄓㄨㄥˇ", "˙ㄗ"], "妙蛙草": ["ㄇㄧㄠˋ", "ㄨㄚ", "ㄘㄠˇ"], "妙蛙花": ["ㄇㄧㄠˋ", "ㄨㄚ", "ㄏㄨㄚ"], "小火龍": ["ㄒㄧㄠˇ", "ㄏㄨㄛˇ", "ㄌㄨㄥˊ"], "火恐龍": ["ㄏㄨㄛˇ", "ㄎㄨㄥˇ", "ㄌㄨㄥˊ"], "噴火龍": ["ㄆㄣ", "ㄏㄨㄛˇ", "ㄌㄨㄥˊ"], "傑尼龜": ["ㄐㄧㄝˊ", "ㄋㄧˊ", "ㄍㄨㄟ"], "卡咪龜": ["ㄎㄚˇ", "ㄇㄧ", "ㄍㄨㄟ"], "水箭龜": ["ㄕㄨㄟˇ", "ㄐㄧㄢˋ", "ㄍㄨㄟ"], "綠毛蟲": ["ㄌㄩˋ", "ㄇㄠˊ", "ㄔㄨㄥˊ"], "鐵甲蛹": ["ㄊㄧㄝˇ", "ㄐㄧㄚˇ", "ㄩㄥˇ"], "巴大蝶": ["ㄅㄚ", "ㄉㄚˋ", "ㄉㄧㄝˊ"], "獨角蟲": ["ㄉㄨˊ", "ㄐㄧㄠˇ", "ㄔㄨㄥˊ"], "鐵殼蛹": ["ㄊㄧㄝˇ", "ㄎㄜˊ", "ㄩㄥˇ"], "大針蜂": ["ㄉㄚˋ", "ㄓㄣ", "ㄈㄥ"], "波波": ["ㄅㄛ", "ㄅㄛ"], "比比鳥": ["ㄅㄧˇ", "ㄅㄧˇ", "ㄋㄧㄠˇ"], "大比鳥": ["ㄉㄚˋ", "ㄅㄧˇ", "ㄋㄧㄠˇ"], "小拉達": ["ㄒㄧㄠˇ", "ㄌㄚ", "ㄉㄚˊ"], "拉達": ["ㄌㄚ", "ㄉㄚˊ"], "烈雀": ["ㄌㄧㄝˋ", "ㄑㄩㄝˋ"], "大嘴雀": ["ㄉㄚˋ", "ㄗㄨㄟˇ", "ㄑㄩㄝˋ"], "阿柏蛇": ["ㄚ", "ㄅㄛˊ", "ㄕㄜˊ"], "阿柏怪": ["ㄚ", "ㄅㄛˊ", "ㄍㄨㄞˋ"], "皮卡丘": ["ㄆㄧˊ", "ㄎㄚˇ", "ㄑㄧㄡ"], "雷丘": ["ㄌㄟˊ", "ㄑㄧㄡ"], "穿山鼠": ["ㄔㄨㄢ", "ㄕㄢ", "ㄕㄨˇ"], "穿山王": ["ㄔㄨㄢ", "ㄕㄢ", "ㄨㄤˊ"], "尼多蘭": ["ㄋㄧˊ", "ㄉㄨㄛ", "ㄌㄢˊ"], "尼多娜": ["ㄋㄧˊ", "ㄉㄨㄛ", "ㄋㄚˋ"], "尼多后": ["ㄋㄧˊ", "ㄉㄨㄛ", "ㄏㄡˋ"], "尼多朗": ["ㄋㄧˊ", "ㄉㄨㄛ", "ㄌㄤˇ"], "尼多力諾": ["ㄋㄧˊ", "ㄉㄨㄛ", "ㄌㄧˋ", "ㄋㄨㄛˋ"], "尼多王": ["ㄋㄧˊ", "ㄉㄨㄛ", "ㄨㄤˊ"], "皮皮": ["ㄆㄧˊ", "ㄆㄧˊ"], "皮可西": ["ㄆㄧˊ", "ㄎㄜˇ", "ㄒㄧ"], "六尾": ["ㄌㄧㄡˋ", "ㄨㄟˇ"], "九尾": ["ㄐㄧㄡˇ", "ㄨㄟˇ"], "胖丁": ["ㄆㄤˋ", "ㄉㄧㄥ"], "胖可丁": ["ㄆㄤˋ", "ㄎㄜˇ", "ㄉㄧㄥ"], "超音蝠": ["ㄔㄠ", "ㄧㄣ", "ㄈㄨˊ"], "大嘴蝠": ["ㄉㄚˋ", "ㄗㄨㄟˇ", "ㄈㄨˊ"], "走路草": ["ㄗㄡˇ", "ㄌㄨˋ", "ㄘㄠˇ"], "臭臭花": ["ㄔㄡˋ", "ㄔㄡˋ", "ㄏㄨㄚ"], "霸王花": ["ㄅㄚˋ", "ㄨㄤˊ", "ㄏㄨㄚ"], "派拉斯": ["ㄆㄞˋ", "ㄌㄚ", "ㄙ"], "派拉斯特": ["ㄆㄞˋ", "ㄌㄚ", "ㄙ", "ㄊㄜˋ"], "毛球": ["ㄇㄠˊ", "ㄑㄧㄡˊ"], "摩魯蛾": ["ㄇㄛˊ", "ㄌㄨˇ", "ㄜˊ"], "地鼠": ["ㄉㄧˋ", "ㄕㄨˇ"], "三地鼠": ["ㄙㄢ", "ㄉㄧˋ", "ㄕㄨˇ"], "喵喵": ["ㄇㄧㄠ", "ㄇㄧㄠ"], "貓老大": ["ㄇㄠ", "ㄌㄠˇ", "ㄉㄚˋ"], "可達鴨": ["ㄎㄜˇ", "ㄉㄚˊ", "ㄧㄚ"], "哥達鴨": ["ㄍㄜ", "ㄉㄚˊ", "ㄧㄚ"], "猴怪": ["ㄏㄡˊ", "ㄍㄨㄞˋ"], "火爆猴": ["ㄏㄨㄛˇ", "ㄅㄠˋ", "ㄏㄡˊ"], "卡蒂狗": ["ㄎㄚˇ", "ㄉㄧˋ", "ㄍㄡˇ"], "風速狗": ["ㄈㄥ", "ㄙㄨˋ", "ㄍㄡˇ"], "蚊香蝌蚪": ["ㄨㄣˊ", "ㄒㄧㄤ", "ㄎㄜ", "ㄉㄡˇ"], "蚊香君": ["ㄨㄣˊ", "ㄒㄧㄤ", "ㄐㄩㄣ"], "蚊香泳士": ["ㄨㄣˊ", "ㄒㄧㄤ", "ㄩㄥˇ", "ㄕˋ"], "凱西": ["ㄎㄞˇ", "ㄒㄧ"], "勇基拉": ["ㄩㄥˇ", "ㄐㄧ", "ㄌㄚ"], "胡地": ["ㄏㄨˊ", "ㄉㄧˋ"], "腕力": ["ㄨㄢˋ", "ㄌㄧˋ"], "豪力": ["ㄏㄠˊ", "ㄌㄧˋ"], "怪力": ["ㄍㄨㄞˋ", "ㄌㄧˋ"], "喇叭芽": ["ㄌㄚˇ", "ㄅㄚ", "ㄧㄚˊ"], "口呆花": ["ㄎㄡˇ", "ㄉㄞ", "ㄏㄨㄚ"], "大食花": ["ㄉㄚˋ", "ㄕˊ", "ㄏㄨㄚ"], "瑪瑙水母": ["ㄇㄚˇ", "ㄋㄠˇ", "ㄕㄨㄟˇ", "ㄇㄨˇ"], "毒刺水母": ["ㄉㄨˊ", "ㄘˋ", "ㄕㄨㄟˇ", "ㄇㄨˇ"], "小拳石": ["ㄒㄧㄠˇ", "ㄑㄩㄢˊ", "ㄕˊ"], "隆隆石": ["ㄌㄨㄥˊ", "ㄌㄨㄥˊ", "ㄕˊ"], "隆隆岩": ["ㄌㄨㄥˊ", "ㄌㄨㄥˊ", "ㄧㄢˊ"], "小火馬": ["ㄒㄧㄠˇ", "ㄏㄨㄛˇ", "ㄇㄚˇ"], "烈焰馬": ["ㄌㄧㄝˋ", "ㄧㄢˋ", "ㄇㄚˇ"], "呆呆獸": ["ㄉㄞ", "ㄉㄞ", "ㄕㄡˋ"], "呆殼獸": ["ㄉㄞ", "ㄎㄜˊ", "ㄕㄡˋ"], "小磁怪": ["ㄒㄧㄠˇ", "ㄘˊ", "ㄍㄨㄞˋ"], "三合一磁怪": ["ㄙㄢ", "ㄏㄜˊ", "ㄧ", "ㄘˊ", "ㄍㄨㄞˋ"], "大蔥鴨": ["ㄉㄚˋ", "ㄘㄨㄥ", "ㄧㄚ"], "嘟嘟": ["ㄉㄨ", "ㄉㄨ"], "嘟嘟利": ["ㄉㄨ", "ㄉㄨ", "ㄌㄧˋ"], "小海獅": ["ㄒㄧㄠˇ", "ㄏㄞˇ", "ㄕ"], "白海獅": ["ㄅㄞˊ", "ㄏㄞˇ", "ㄕ"], "臭泥": ["ㄔㄡˋ", "ㄋㄧˊ"], "臭臭泥": ["ㄔㄡˋ", "ㄔㄡˋ", "ㄋㄧˊ"], "大舌貝": ["ㄉㄚˋ", "ㄕㄜˊ", "ㄅㄟˋ"], "刺甲貝": ["ㄘˋ", "ㄐㄧㄚˇ", "ㄅㄟˋ"], "鬼斯": ["ㄍㄨㄟˇ", "ㄙ"], "鬼斯通": ["ㄍㄨㄟˇ", "ㄙ", "ㄊㄨㄥ"], "耿鬼": ["ㄍㄥˇ", "ㄍㄨㄟˇ"], "大岩蛇": ["ㄉㄚˋ", "ㄧㄢˊ", "ㄕㄜˊ"], "催眠貘": ["ㄘㄨㄟ", "ㄇㄧㄢˊ", "ㄇㄛˋ"], "引夢貘人": ["ㄧㄣˇ", "ㄇㄥˋ", "ㄇㄛˋ", "ㄖㄣˊ"], "大鉗蟹": ["ㄉㄚˋ", "ㄑㄧㄢˊ", "ㄒㄧㄝˋ"], "巨鉗蟹": ["ㄐㄩˋ", "ㄑㄧㄢˊ", "ㄒㄧㄝˋ"], "霹靂電球": ["ㄆㄧ", "ㄌㄧˋ", "ㄉㄧㄢˋ", "ㄑㄧㄡˊ"], "頑皮雷彈": ["ㄨㄢˊ", "ㄆㄧˊ", "ㄌㄟˊ", "ㄉㄢˋ"], "蛋蛋": ["ㄉㄢˋ", "ㄉㄢˋ"], "椰蛋樹": ["ㄧㄝ", "ㄉㄢˋ", "ㄕㄨˋ"], "卡拉卡拉": ["ㄎㄚˇ", "ㄌㄚ", "ㄎㄚˇ", "ㄌㄚ"], "嘎啦嘎啦": ["ㄍㄚ", "ㄌㄚ", "ㄍㄚ", "ㄌㄚ"], "飛腿郎": ["ㄈㄟ", "ㄊㄨㄟˇ", "ㄌㄤˊ"], "快拳郎": ["ㄎㄨㄞˋ", "ㄑㄩㄢˊ", "ㄌㄤˊ"], "大舌頭": ["ㄉㄚˋ", "ㄕㄜˊ", "˙ㄊㄡ"], "瓦斯彈": ["ㄨㄚˇ", "ㄙ", "ㄉㄢˋ"], "雙彈瓦斯": ["ㄕㄨㄤ", "ㄉㄢˋ", "ㄨㄚˇ", "ㄙ"], "獨角犀牛": ["ㄉㄨˊ", "ㄐㄧㄠˇ", "ㄒㄧ", "ㄋㄧㄡˊ"], "鑽角犀獸": ["ㄗㄨㄢ", "ㄐㄧㄠˇ", "ㄒㄧ", "ㄕㄡˋ"], "吉利蛋": ["ㄐㄧˊ", "ㄌㄧˋ", "ㄉㄢˋ"], "蔓藤怪": ["ㄇㄢˋ", "ㄊㄥˊ", "ㄍㄨㄞˋ"], "袋獸": ["ㄉㄞˋ", "ㄕㄡˋ"], "墨海馬": ["ㄇㄛˋ", "ㄏㄞˇ", "ㄇㄚˇ"], "海刺龍": ["ㄏㄞˇ", "ㄘˋ", "ㄌㄨㄥˊ"], "角金魚": ["ㄐㄧㄠˇ", "ㄐㄧㄣ", "ㄩˊ"], "金魚王": ["ㄐㄧㄣ", "ㄩˊ", "ㄨㄤˊ"], "海星星": ["ㄏㄞˇ", "ㄒㄧㄥ", "ㄒㄧㄥ"], "寶石海星": ["ㄅㄠˇ", "ㄕˊ", "ㄏㄞˇ", "ㄒㄧㄥ"], "魔牆人偶": ["ㄇㄛˊ", "ㄑㄧㄤˊ", "ㄖㄣˊ", "ㄡˇ"], "飛天螳螂": ["ㄈㄟ", "ㄊㄧㄢ", "ㄊㄤˊ", "ㄌㄤˊ"], "迷唇姐": ["ㄇㄧˊ", "ㄔㄨㄣˊ", "ㄐㄧㄝˇ"], "電擊獸": ["ㄉㄧㄢˋ", "ㄐㄧˊ", "ㄕㄡˋ"], "鴨嘴火獸": ["ㄧㄚ", "ㄗㄨㄟˇ", "ㄏㄨㄛˇ", "ㄕㄡˋ"], "凱羅斯": ["ㄎㄞˇ", "ㄌㄨㄛˊ", "ㄙ"], "肯泰羅": ["ㄎㄣˇ", "ㄊㄞˋ", "ㄌㄨㄛˊ"], "鯉魚王": ["ㄌㄧˇ", "ㄩˊ", "ㄨㄤˊ"], "暴鯉龍": ["ㄅㄠˋ", "ㄌㄧˇ", "ㄌㄨㄥˊ"], "拉普拉斯": ["ㄌㄚ", "ㄆㄨˇ", "ㄌㄚ", "ㄙ"], "百變怪": ["ㄅㄞˇ", "ㄅㄧㄢˋ", "ㄍㄨㄞˋ"], "伊布": ["ㄧ", "ㄅㄨˋ"], "水伊布": ["ㄕㄨㄟˇ", "ㄧ", "ㄅㄨˋ"], "雷伊布": ["ㄌㄟˊ", "ㄧ", "ㄅㄨˋ"], "火伊布": ["ㄏㄨㄛˇ", "ㄧ", "ㄅㄨˋ"], "多邊獸": ["ㄉㄨㄛ", "ㄅㄧㄢ", "ㄕㄡˋ"], "菊石獸": ["ㄐㄩˊ", "ㄕˊ", "ㄕㄡˋ"], "多刺菊石獸": ["ㄉㄨㄛ", "ㄘˋ", "ㄐㄩˊ", "ㄕˊ", "ㄕㄡˋ"], "化石盔": ["ㄏㄨㄚˋ", "ㄕˊ", "ㄎㄨㄟ"], "鐮刀盔": ["ㄌㄧㄢˊ", "ㄉㄠ", "ㄎㄨㄟ"], "化石翼龍": ["ㄏㄨㄚˋ", "ㄕˊ", "ㄧˋ", "ㄌㄨㄥˊ"], "卡比獸": ["ㄎㄚˇ", "ㄅㄧˇ", "ㄕㄡˋ"], "急凍鳥": ["ㄐㄧˊ", "ㄉㄨㄥˋ", "ㄋㄧㄠˇ"], "閃電鳥": ["ㄕㄢˇ", "ㄉㄧㄢˋ", "ㄋㄧㄠˇ"], "火焰鳥": ["ㄏㄨㄛˇ", "ㄧㄢˋ", "ㄋㄧㄠˇ"], "迷你龍": ["ㄇㄧˊ", "ㄋㄧˇ", "ㄌㄨㄥˊ"], "哈克龍": ["ㄏㄚ", "ㄎㄜˋ", "ㄌㄨㄥˊ"], "快龍": ["ㄎㄨㄞˋ", "ㄌㄨㄥˊ"], "超夢": ["ㄔㄠ", "ㄇㄥˋ"], "夢幻": ["ㄇㄥˋ", "ㄏㄨㄢˋ"]};

  const TAIWAN_ZHUYIN_DICT = {"糕": "ㄍㄠ", "培": "ㄆㄟˊ", "商": "ㄕㄤ", "店": "ㄉㄧㄢˋ", "禮": "ㄌㄧˇ", "幣": "ㄅㄧˋ", "購": "ㄍㄡˋ", "激": "ㄐㄧ", "戴": "ㄉㄞˋ", "盒": "ㄏㄜˊ", "之": "ㄓ", "莓": "ㄇㄟˊ", "凍": "ㄉㄨㄥˋ", "冠": "ㄍㄨㄢ", "一": "ㄧ", "丁": "ㄉㄧㄥ", "七": "ㄑㄧ", "三": "ㄙㄢ", "上": "ㄕㄤˋ", "下": "ㄒㄧㄚˋ", "不": "ㄅㄨˋ", "世": "ㄕˋ", "丘": "ㄑㄧㄡ", "丟": "ㄉㄧㄡ", "並": "ㄅㄧㄥˋ", "中": "ㄓㄨㄥ", "串": "ㄔㄨㄢˋ", "主": "ㄓㄨˇ", "之": "ㄓ", "乖": "ㄍㄨㄞ", "九": "ㄐㄧㄡˇ", "也": "ㄧㄝˇ", "了": "˙ㄌㄜ", "事": "ㄕˋ", "二": "ㄦˋ", "互": "ㄏㄨˋ", "五": "ㄨˇ", "交": "ㄐㄧㄠ", "亭": "ㄊㄧㄥˊ", "亮": "ㄌㄧㄤˋ", "人": "ㄖㄣˊ", "什": "ㄕㄣˊ", "介": "ㄐㄧㄝˋ", "仔": "ㄗㄞˇ", "他": "ㄊㄚ", "仙": "ㄒㄧㄢ", "代": "ㄉㄞˋ", "令": "ㄌㄧㄥˋ", "以": "ㄧˇ", "件": "ㄐㄧㄢˋ", "任": "ㄖㄣˋ", "企": "ㄑㄧˇ", "伊": "ㄧ", "伏": "ㄈㄨˊ", "伴": "ㄅㄢˋ", "伸": "ㄕㄣ", "位": "ㄨㄟˋ", "低": "ㄉㄧ", "何": "ㄏㄜˊ", "作": "ㄗㄨㄛˋ", "你": "ㄋㄧˇ", "佳": "ㄐㄧㄚ", "使": "ㄕˇ", "來": "ㄌㄞˊ", "例": "ㄌㄧˋ", "供": "ㄍㄨㄥ", "依": "ㄧ", "便": "ㄅㄧㄢˋ", "係": "ㄒㄧˋ", "保": "ㄅㄠˇ", "修": "ㄒㄧㄡ", "個": "˙ㄍㄜ", "倍": "ㄅㄟˋ", "們": "˙ㄇㄣ", "候": "ㄏㄡˋ", "值": "ㄓˊ", "做": "ㄗㄨㄛˋ", "健": "ㄐㄧㄢˋ", "側": "ㄘㄜˋ", "偷": "ㄊㄡ", "傑": "ㄐㄧㄝˊ", "傘": "ㄙㄢˇ", "備": "ㄅㄟˋ", "傲": "ㄠˋ", "傷": "ㄕㄤ", "僅": "ㄐㄧㄣˇ", "像": "ㄒㄧㄤˋ", "優": "ㄧㄡ", "儲": "ㄔㄨˇ", "元": "ㄩㄢˊ", "兄": "ㄒㄩㄥ", "先": "ㄒㄧㄢ", "光": "ㄍㄨㄤ", "兒": "ㄦˊ", "兔": "ㄊㄨˋ", "入": "ㄖㄨˋ", "內": "ㄋㄟˋ", "全": "ㄑㄩㄢˊ", "兩": "ㄌㄧㄤˇ", "八": "ㄅㄚ", "公": "ㄍㄨㄥ", "六": "ㄌㄧㄡˋ", "共": "ㄍㄨㄥˋ", "具": "ㄐㄩˋ", "典": "ㄉㄧㄢˇ", "冊": "ㄘㄜˋ", "再": "ㄗㄞˋ", "冒": "ㄇㄠˋ", "冠": "ㄍㄨㄢ", "冬": "ㄉㄨㄥ", "冰": "ㄅㄧㄥ", "冷": "ㄌㄥˇ", "凰": "ㄏㄨㄤˊ", "凵": "ㄑㄧㄢˇ", "出": "ㄔㄨ", "刀": "ㄉㄠ", "分": "ㄈㄣ", "切": "ㄑㄧㄝˋ", "列": "ㄌㄧㄝˋ", "初": "ㄔㄨ", "判": "ㄆㄢˋ", "別": "ㄅㄧㄝˊ", "到": "ㄉㄠˋ", "制": "ㄓˋ", "刺": "ㄘˋ", "刻": "ㄎㄜˋ", "則": "ㄗㄜˊ", "削": "ㄒㄩㄝ", "前": "ㄑㄧㄢˊ", "剛": "ㄍㄤ", "剩": "ㄕㄥˋ", "劃": "ㄏㄨㄚˋ", "力": "ㄌㄧˋ", "功": "ㄍㄨㄥ", "加": "ㄐㄧㄚ", "助": "ㄓㄨˋ", "努": "ㄋㄨˇ", "勃": "ㄅㄛˊ", "勇": "ㄩㄥˇ", "動": "ㄉㄨㄥˋ", "勞": "ㄌㄠˊ", "勤": "ㄑㄧㄣˊ", "勳": "ㄒㄩㄣ", "勵": "ㄌㄧˋ", "勾": "ㄍㄡ", "包": "ㄅㄠ", "化": "ㄏㄨㄚˋ", "北": "ㄅㄟˇ", "匙": "˙ㄕ", "匹": "ㄆㄧˇ", "區": "ㄑㄩ", "十": "ㄕˊ", "千": "ㄑㄧㄢ", "升": "ㄕㄥ", "午": "ㄨˇ", "半": "ㄅㄢˋ", "博": "ㄅㄛˊ", "卡": "ㄎㄚˇ", "印": "ㄧㄣˋ", "即": "ㄐㄧˊ", "卷": "ㄐㄩㄢˇ", "原": "ㄩㄢˊ", "厲": "ㄌㄧˋ", "去": "ㄑㄩˋ", "又": "ㄧㄡˋ", "友": "ㄧㄡˇ", "反": "ㄈㄢˇ", "取": "ㄑㄩˇ", "受": "ㄕㄡˋ", "叢": "ㄘㄨㄥˊ", "口": "ㄎㄡˇ", "古": "ㄍㄨˇ", "句": "ㄐㄩˋ", "只": "ㄓˇ", "叫": "ㄐㄧㄠˋ", "叮": "ㄉㄧㄥ", "可": "ㄎㄜˇ", "台": "ㄊㄞˊ", "史": "ㄕˇ", "右": "ㄧㄡˋ", "吃": "ㄔ", "各": "ㄍㄜˋ", "合": "ㄏㄜˊ", "吉": "ㄐㄧˊ", "同": "ㄊㄨㄥˊ", "名": "ㄇㄧㄥˊ", "吐": "ㄊㄨˇ", "向": "ㄒㄧㄤˋ", "吧": "˙ㄅㄚ", "含": "ㄏㄢˊ", "吸": "ㄒㄧ", "吼": "ㄏㄡˇ", "呀": "˙ㄧㄚ", "呆": "ㄉㄞ", "呈": "ㄔㄥˊ", "告": "ㄍㄠˋ", "呢": "˙ㄋㄜ", "呱": "ㄍㄨ", "味": "ㄨㄟˋ", "命": "ㄇㄧㄥˋ", "和": "ㄏㄢˋ", "咕": "ㄍㄨ", "咚": "ㄉㄨㄥ", "咪": "ㄇㄧ", "品": "ㄆㄧㄣˇ", "哇": "˙ㄨㄚ", "哈": "ㄏㄚ", "哎": "ㄞ", "員": "ㄩㄢˊ", "哥": "ㄍㄜ", "哪": "ㄋㄚˇ", "哭": "ㄎㄨ", "唱": "ㄔㄤˋ", "唷": "ㄧㄛ", "唸": "ㄋㄧㄢˋ", "啊": "˙ㄚ", "問": "ㄨㄣˋ", "啞": "ㄧㄚˇ", "啟": "ㄑㄧˇ", "啦": "ㄌㄚ", "啪": "ㄆㄚ", "啷": "ㄌㄤ", "啼": "ㄊㄧˊ", "喔": "ㄛ", "喜": "ㄒㄧˇ", "喝": "ㄏㄜ", "單": "ㄉㄢ", "喳": "ㄓㄚ", "喵": "ㄇㄧㄠ", "嗎": "˙ㄇㄚ", "嗚": "ㄨ", "嗡": "ㄨㄥ", "嗨": "ㄏㄞ", "嘟": "ㄉㄨ", "嘩": "ㄏㄨㄚ", "嘰": "ㄐㄧ", "嘴": "ㄗㄨㄟˇ", "嘶": "ㄙ", "器": "ㄑㄧˋ", "噴": "ㄆㄣ", "噹": "ㄉㄤ", "嚴": "ㄧㄢˊ", "囉": "ㄌㄨㄛ", "四": "ㄙˋ", "回": "ㄏㄨㄟˊ", "圈": "ㄑㄩㄢ", "國": "ㄍㄨㄛˊ", "圍": "ㄨㄟˊ", "園": "ㄩㄢˊ", "圓": "ㄩㄢˊ", "圖": "ㄊㄨˊ", "團": "ㄊㄨㄢˊ", "土": "ㄊㄨˇ", "在": "ㄗㄞˋ", "地": "ㄉㄧˋ", "坐": "ㄗㄨㄛˋ", "坡": "ㄆㄛ", "型": "ㄒㄧㄥˊ", "城": "ㄔㄥˊ", "域": "ㄩˋ", "執": "ㄓˊ", "堂": "ㄊㄤˊ", "堅": "ㄐㄧㄢ", "堆": "ㄉㄨㄟ", "堡": "ㄅㄠˇ", "場": "ㄔㄤˇ", "塊": "ㄎㄨㄞˋ", "塘": "ㄊㄤˊ", "填": "ㄊㄧㄢˊ", "境": "ㄐㄧㄥˋ", "增": "ㄗㄥ", "壞": "ㄏㄨㄞˋ", "士": "ㄕˋ", "壺": "ㄏㄨˊ", "夏": "ㄒㄧㄚˋ", "外": "ㄨㄞˋ", "多": "ㄉㄨㄛ", "夜": "ㄧㄝˋ", "夢": "ㄇㄥˋ", "夥": "ㄏㄨㄛˇ", "大": "ㄉㄚˋ", "天": "ㄊㄧㄢ", "太": "ㄊㄞˋ", "夫": "ㄈㄨ", "失": "ㄕ", "奇": "ㄑㄧˊ", "奏": "ㄗㄡˋ", "奔": "ㄅㄣ", "套": "ㄊㄠˋ", "女": "ㄋㄩˇ", "奶": "ㄋㄞˇ", "她": "ㄊㄚ", "好": "ㄏㄠˇ", "如": "ㄖㄨˊ", "妖": "ㄧㄠ", "妙": "ㄇㄧㄠˋ", "妹": "ㄇㄟˋ", "姊": "ㄗˇ", "始": "ㄕˇ", "姐": "ㄐㄧㄝˇ", "姨": "ㄧˊ", "威": "ㄨㄟ", "婆": "ㄆㄛˊ", "媽": "ㄇㄚ", "子": "˙ㄗ", "字": "ㄗˋ", "存": "ㄘㄨㄣˊ", "季": "ㄐㄧˋ", "孩": "ㄏㄞˊ", "學": "ㄒㄩㄝˊ", "它": "ㄊㄚ", "守": "ㄕㄡˇ", "安": "ㄢ", "完": "ㄨㄢˊ", "定": "ㄉㄧㄥˋ", "客": "ㄎㄜˋ", "室": "ㄕˋ", "宮": "ㄍㄨㄥ", "害": "ㄏㄞˋ", "家": "ㄐㄧㄚ", "容": "ㄖㄨㄥˊ", "密": "ㄇㄧˋ", "富": "ㄈㄨˋ", "寒": "ㄏㄢˊ", "察": "ㄔㄚˊ", "實": "ㄕˊ", "寫": "ㄒㄧㄝˇ", "寵": "ㄔㄨㄥˇ", "寶": "ㄅㄠˇ", "射": "ㄕㄜˋ", "將": "ㄐㄧㄤ", "專": "ㄓㄨㄢ", "尊": "ㄗㄨㄣ", "尋": "ㄒㄩㄣˊ", "對": "ㄉㄨㄟˋ", "導": "ㄉㄠˇ", "小": "ㄒㄧㄠˇ", "少": "ㄕㄠˇ", "尖": "ㄐㄧㄢ", "就": "ㄐㄧㄡˋ", "尺": "ㄔˇ", "尼": "ㄋㄧˊ", "尾": "ㄨㄟˇ", "屋": "ㄨ", "展": "ㄓㄢˇ", "層": "ㄘㄥˊ", "屬": "ㄕㄨˇ", "山": "ㄕㄢ", "岩": "ㄧㄢˊ", "島": "ㄉㄠˇ", "崖": "ㄧㄚˊ", "嶼": "ㄩˇ", "川": "ㄔㄨㄢ", "巡": "ㄒㄩㄣˊ", "工": "ㄍㄨㄥ", "左": "ㄗㄨㄛˇ", "巨": "ㄐㄩˋ", "巫": "ㄨ", "己": "ㄐㄧˇ", "已": "ㄧˇ", "巴": "ㄅㄚ", "巾": "ㄐㄧㄣ", "市": "ㄕˋ", "布": "ㄅㄨˋ", "帆": "ㄈㄢ", "帥": "ㄕㄨㄞˋ", "師": "ㄕ", "常": "ㄔㄤˊ", "帽": "ㄇㄠˋ", "幅": "ㄈㄨˊ", "幕": "ㄇㄨˋ", "幟": "ㄓˋ", "幫": "ㄅㄤ", "平": "ㄆㄧㄥˊ", "年": "ㄋㄧㄢˊ", "幻": "ㄏㄨㄢˋ", "幼": "ㄧㄡˋ", "幾": "ㄐㄧˇ", "床": "ㄔㄨㄤˊ", "序": "ㄒㄩˋ", "底": "ㄉㄧˇ", "度": "ㄉㄨˋ", "座": "ㄗㄨㄛˋ", "庫": "ㄎㄨˋ", "康": "ㄎㄤ", "廂": "ㄒㄧㄤ", "建": "ㄐㄧㄢˋ", "弊": "ㄅㄧˋ", "式": "ㄕˋ", "引": "ㄧㄣˇ", "弟": "ㄉㄧˋ", "張": "ㄓㄤ", "強": "ㄑㄧㄤˊ", "彈": "ㄉㄢˋ", "彎": "ㄨㄢ", "彙": "ㄏㄨㄟˋ", "彩": "ㄘㄞˇ", "影": "ㄧㄥˇ", "往": "ㄨㄤˇ", "很": "ㄏㄣˇ", "後": "ㄏㄡˋ", "得": "˙ㄉㄜ", "從": "ㄘㄨㄥˊ", "復": "ㄈㄨˋ", "循": "ㄒㄩㄣˊ", "微": "ㄨㄟ", "徵": "ㄓㄥ", "徽": "ㄏㄨㄟ", "心": "ㄒㄧㄣ", "必": "ㄅㄧˋ", "忘": "ㄨㄤˋ", "忙": "ㄇㄤˊ", "忠": "ㄓㄨㄥ", "快": "ㄎㄨㄞˋ", "念": "ㄋㄧㄢˋ", "怎": "ㄗㄣˇ", "怕": "ㄆㄚˋ", "性": "ㄒㄧㄥˋ", "怪": "ㄍㄨㄞˋ", "恐": "ㄎㄨㄥˇ", "恢": "ㄏㄨㄟ", "恭": "ㄍㄨㄥ", "情": "ㄑㄧㄥˊ", "想": "ㄒㄧㄤˇ", "意": "ㄧˋ", "愛": "ㄞˋ", "感": "ㄍㄢˇ", "態": "ㄊㄞˋ", "慢": "ㄇㄢˋ", "慶": "ㄑㄧㄥˋ", "憶": "ㄧˋ", "應": "ㄧㄥ", "懶": "ㄌㄢˇ", "懷": "ㄏㄨㄞˊ", "懸": "ㄒㄩㄢˊ", "成": "ㄔㄥˊ", "我": "ㄨㄛˇ", "或": "ㄏㄨㄛˋ", "戰": "ㄓㄢˋ", "戲": "ㄒㄧˋ", "戳": "ㄔㄨㄛ", "戴": "ㄉㄞˋ", "戶": "ㄏㄨˋ", "房": "ㄈㄤˊ", "所": "ㄙㄨㄛˇ", "手": "ㄕㄡˇ", "才": "ㄘㄞˊ", "打": "ㄉㄚˇ", "找": "ㄓㄠˇ", "技": "ㄐㄧˋ", "把": "ㄅㄚˇ", "抓": "ㄓㄨㄚ", "折": "ㄓㄜˊ", "抽": "ㄔㄡ", "拇": "ㄇㄨˇ", "拉": "ㄌㄚ", "拋": "ㄆㄠ", "拐": "ㄍㄨㄞˇ", "拔": "ㄅㄚˊ", "招": "ㄓㄠ", "括": "ㄎㄨㄛˋ", "拳": "ㄑㄩㄢˊ", "拼": "ㄆㄧㄣ", "拿": "ㄋㄚˊ", "指": "ㄓˇ", "按": "ㄢˋ", "挑": "ㄊㄧㄠ", "捉": "ㄓㄨㄛ", "捏": "ㄋㄧㄝ", "捕": "ㄅㄨˇ", "捺": "ㄋㄚˋ", "掃": "ㄙㄠˇ", "掉": "ㄉㄧㄠˋ", "掌": "ㄓㄤˇ", "掙": "ㄓㄥ", "掛": "ㄍㄨㄚˋ", "採": "ㄘㄞˇ", "探": "ㄊㄢˋ", "接": "ㄐㄧㄝ", "控": "ㄎㄨㄥˋ", "推": "ㄊㄨㄟ", "描": "ㄇㄧㄠˊ", "提": "ㄊㄧˊ", "揚": "ㄧㄤˊ", "換": "ㄏㄨㄢˋ", "揮": "ㄏㄨㄟ", "援": "ㄩㄢˊ", "搖": "ㄧㄠˊ", "搞": "ㄍㄠˇ", "撇": "ㄆㄧㄝ", "撐": "ㄔㄥ", "撤": "ㄔㄜˋ", "播": "ㄅㄛ", "撲": "ㄆㄨ", "撼": "ㄏㄢˋ", "擁": "ㄩㄥ", "擅": "ㄕㄢˋ", "擇": "ㄗㄜˊ", "擊": "ㄐㄧˊ", "操": "ㄘㄠ", "擎": "ㄑㄧㄥˊ", "據": "ㄐㄩˋ", "擦": "ㄘㄚ", "擺": "ㄅㄞˇ", "支": "ㄓ", "收": "ㄕㄡ", "攻": "ㄍㄨㄥ", "放": "ㄈㄤˋ", "故": "ㄍㄨˋ", "效": "ㄒㄧㄠˋ", "敗": "ㄅㄞˋ", "教": "ㄐㄧㄠˋ", "散": "ㄙㄢˋ", "整": "ㄓㄥˇ", "數": "ㄕㄨˋ", "文": "ㄨㄣˊ", "斑": "ㄅㄢ", "料": "ㄌㄧㄠˋ", "斜": "ㄒㄧㄝˊ", "新": "ㄒㄧㄣ", "斷": "ㄉㄨㄢˋ", "方": "ㄈㄤ", "旋": "ㄒㄩㄢˊ", "族": "ㄗㄨˊ", "旗": "ㄑㄧˊ", "日": "ㄖˋ", "早": "ㄗㄠˇ", "旺": "ㄨㄤˋ", "昂": "ㄤˊ", "明": "ㄇㄧㄥˊ", "易": "ㄧˋ", "星": "ㄒㄧㄥ", "春": "ㄔㄨㄣ", "是": "ㄕˋ", "時": "ㄕˊ", "晃": "ㄏㄨㄤˇ", "晚": "ㄨㄢˇ", "晨": "ㄔㄣˊ", "景": "ㄐㄧㄥˇ", "晰": "ㄒㄧ", "晴": "ㄑㄧㄥˊ", "晶": "ㄐㄧㄥ", "暑": "ㄕㄨˇ", "暖": "ㄋㄨㄢˇ", "暴": "ㄅㄠˋ", "曆": "ㄌㄧˋ", "曉": "ㄒㄧㄠˇ", "更": "ㄍㄥˋ", "書": "ㄕㄨ", "最": "ㄗㄨㄟˋ", "會": "ㄏㄨㄟˋ", "月": "ㄩㄝˋ", "有": "ㄧㄡˇ", "朋": "ㄆㄥˊ", "服": "ㄈㄨˊ", "朗": "ㄌㄤˇ", "朝": "ㄔㄠˊ", "期": "ㄑㄧ", "木": "ㄇㄨˋ", "未": "ㄨㄟˋ", "末": "ㄇㄛˋ", "本": "ㄅㄣˇ", "朵": "ㄉㄨㄛˇ", "杖": "ㄓㄤˋ", "束": "ㄕㄨˋ", "杯": "ㄅㄟ", "東": "ㄉㄨㄥ", "松": "ㄙㄨㄥ", "板": "ㄅㄢˇ", "析": "ㄒㄧ", "林": "ㄌㄧㄣˊ", "枚": "ㄇㄟˊ", "果": "ㄍㄨㄛˇ", "枝": "ㄓ", "柑": "ㄍㄢ", "染": "ㄖㄢˇ", "柔": "ㄖㄡˊ", "柚": "ㄧㄡˋ", "查": "ㄔㄚˊ", "校": "ㄒㄧㄠˋ", "核": "ㄏㄜˊ", "根": "ㄍㄣ", "格": "ㄍㄜˊ", "桂": "ㄍㄨㄟˋ", "案": "ㄢˋ", "桌": "ㄓㄨㄛ", "桿": "ㄍㄢˇ", "梅": "ㄇㄟˊ", "條": "ㄊㄧㄠˊ", "梯": "ㄊㄧ", "棒": "ㄅㄤˋ", "棕": "ㄗㄨㄥ", "森": "ㄙㄣ", "椅": "ㄧˇ", "植": "ㄓˊ", "椰": "ㄧㄝ", "楚": "ㄔㄨˇ", "極": "ㄐㄧˊ", "榜": "ㄅㄤˇ", "榮": "ㄖㄨㄥˊ", "構": "ㄍㄡˋ", "槽": "ㄘㄠˊ", "樂": "ㄌㄜˋ", "標": "ㄅㄧㄠ", "模": "ㄇㄛˊ", "樣": "ㄧㄤˋ", "樹": "ㄕㄨˋ", "橋": "ㄑㄧㄠˊ", "橘": "ㄐㄩˊ", "橙": "ㄔㄥˊ", "機": "ㄐㄧ", "橡": "ㄒㄧㄤˋ", "橫": "ㄏㄥˊ", "檢": "ㄐㄧㄢˇ", "檬": "ㄇㄥˊ", "檯": "ㄊㄞˊ", "檸": "ㄋㄧㄥˊ", "次": "ㄘˋ", "款": "ㄎㄨㄢˇ", "歌": "ㄍㄜ", "歡": "ㄏㄨㄢ", "止": "ㄓˇ", "正": "ㄓㄥˋ", "此": "ㄘˇ", "步": "ㄅㄨˋ", "武": "ㄨˇ", "歷": "ㄌㄧˋ", "段": "ㄉㄨㄢˋ", "殺": "ㄕㄚ", "殼": "ㄎㄜˊ", "殿": "ㄉㄧㄢˋ", "母": "ㄇㄨˇ", "每": "ㄇㄟˇ", "比": "ㄅㄧˇ", "毛": "ㄇㄠˊ", "民": "ㄇㄧㄣˊ", "氣": "ㄑㄧˋ", "水": "ㄕㄨㄟˇ", "汁": "ㄓ", "求": "ㄑㄧㄡˊ", "池": "ㄔˊ", "汪": "ㄨㄤ", "決": "ㄐㄩㄝˊ", "汽": "ㄑㄧˋ", "沒": "ㄇㄟˊ", "沙": "ㄕㄚ", "河": "ㄏㄜˊ", "油": "ㄧㄡˊ", "泊": "ㄆㄛ", "法": "ㄈㄚˇ", "泡": "ㄆㄠˋ", "波": "ㄅㄛ", "泥": "ㄋㄧˊ", "注": "ㄓㄨˋ", "泰": "ㄊㄞˋ", "泳": "ㄩㄥˇ", "洋": "ㄧㄤˊ", "洗": "ㄒㄧˇ", "洞": "ㄉㄨㄥˋ", "洩": "ㄒㄧㄝˋ", "活": "ㄏㄨㄛˊ", "流": "ㄌㄧㄡˊ", "浪": "ㄌㄤˋ", "浮": "ㄈㄨˊ", "海": "ㄏㄞˇ", "消": "ㄒㄧㄠ", "涼": "ㄌㄧㄤˊ", "淋": "ㄌㄧㄣˊ", "深": "ㄕㄣ", "混": "ㄏㄨㄣˋ", "清": "ㄑㄧㄥ", "測": "ㄘㄜˋ", "渲": "ㄒㄩㄢˋ", "渴": "ㄎㄜˇ", "游": "ㄧㄡˊ", "湖": "ㄏㄨˊ", "湛": "ㄓㄢˋ", "湯": "ㄊㄤ", "準": "ㄓㄨㄣˇ", "溜": "ㄌㄧㄡ", "溪": "ㄒㄧ", "溫": "ㄨㄣ", "滋": "ㄗ", "滑": "ㄏㄨㄚˊ", "滴": "ㄉㄧ", "滾": "ㄍㄨㄣˇ", "滿": "ㄇㄢˇ", "漂": "ㄆㄧㄠ", "漆": "ㄑㄧ", "漏": "ㄌㄡˋ", "演": "ㄧㄢˇ", "漸": "ㄐㄧㄢˋ", "漿": "ㄐㄧㄤ", "潑": "ㄆㄛ", "潤": "ㄖㄨㄣˋ", "濾": "ㄌㄩˋ", "灣": "ㄨㄢ", "火": "ㄏㄨㄛˇ", "灰": "ㄏㄨㄟ", "炎": "ㄧㄢˊ", "炮": "ㄆㄠˋ", "為": "ㄨㄟˋ", "烈": "ㄌㄧㄝˋ", "烏": "ㄨ", "無": "ㄨˊ", "焰": "ㄧㄢˋ", "然": "ㄖㄢˊ", "煉": "ㄌㄧㄢˋ", "照": "ㄓㄠˋ", "熊": "ㄒㄩㄥˊ", "熱": "ㄖㄜˋ", "熾": "ㄔˋ", "燈": "ㄉㄥ", "燕": "ㄧㄢˋ", "營": "ㄧㄥˊ", "爆": "ㄅㄠˋ", "爪": "ㄓㄠˇ", "爬": "ㄆㄚˊ", "父": "ㄈㄨˋ", "爸": "ㄅㄚˋ", "爺": "ㄧㄝˊ", "爽": "ㄕㄨㄤˇ", "片": "ㄆㄧㄢˋ", "牌": "ㄆㄞˊ", "牙": "ㄧㄚˊ", "牛": "ㄋㄧㄡˊ", "牠": "ㄊㄚ", "物": "ㄨˋ", "特": "ㄊㄜˋ", "牽": "ㄑㄧㄢ", "犬": "ㄑㄩㄢˇ", "狀": "ㄓㄨㄤˋ", "狂": "ㄎㄨㄤˊ", "狐": "ㄏㄨˊ", "狗": "ㄍㄡˇ", "狸": "ㄌㄧˊ", "猴": "ㄏㄡˊ", "獅": "ㄕ", "獎": "ㄐㄧㄤˇ", "獨": "ㄉㄨˊ", "獲": "ㄏㄨㄛˋ", "獵": "ㄌㄧㄝˋ", "獸": "ㄕㄡˋ", "率": "ㄌㄩˋ", "王": "ㄨㄤˊ", "玩": "ㄨㄢˊ", "珍": "ㄓㄣ", "珠": "ㄓㄨ", "班": "ㄅㄢ", "現": "ㄒㄧㄢˋ", "球": "ㄑㄧㄡˊ", "理": "ㄌㄧˇ", "琴": "ㄑㄧㄣˊ", "環": "ㄏㄨㄢˊ", "瓜": "ㄍㄨㄚ", "瓣": "ㄅㄢˋ", "甜": "ㄊㄧㄢˊ", "生": "ㄕㄥ", "產": "ㄔㄢˇ", "用": "ㄩㄥˋ", "田": "ㄊㄧㄢˊ", "由": "ㄧㄡˊ", "甲": "ㄐㄧㄚˇ", "男": "ㄋㄢˊ", "界": "ㄐㄧㄝˋ", "畔": "ㄆㄢˋ", "留": "ㄌㄧㄡˊ", "畫": "ㄏㄨㄚˋ", "當": "ㄉㄤ", "瘋": "ㄈㄥ", "瘦": "ㄕㄡˋ", "登": "ㄉㄥ", "發": "ㄈㄚ", "白": "ㄅㄞˊ", "百": "ㄅㄞˇ", "的": "˙ㄉㄜ", "皮": "ㄆㄧˊ", "盃": "ㄅㄟ", "盆": "ㄆㄣˊ", "盒": "ㄏㄜˊ", "盛": "ㄕㄥˋ", "盟": "ㄇㄥˊ", "盤": "ㄆㄢˊ", "目": "ㄇㄨˋ", "盲": "ㄇㄤˊ", "直": "ㄓˊ", "看": "ㄎㄢˋ", "真": "ㄓㄣ", "睡": "ㄕㄨㄟˋ", "瞇": "ㄇㄧ", "知": "ㄓ", "短": "ㄉㄨㄢˇ", "矮": "ㄞˇ", "石": "ㄕˊ", "破": "ㄆㄛˋ", "硬": "ㄧㄥˋ", "碧": "ㄅㄧˋ", "碰": "ㄆㄥˋ", "確": "ㄑㄩㄝˋ", "磅": "ㄅㄤˋ", "示": "ㄕˋ", "祕": "ㄇㄧˋ", "祝": "ㄓㄨˋ", "神": "ㄕㄣˊ", "祥": "ㄒㄧㄤˊ", "禾": "ㄏㄜˊ", "秋": "ㄑㄧㄡ", "科": "ㄎㄜ", "秒": "ㄇㄧㄠˇ", "秘": "ㄇㄧˋ", "移": "ㄧˊ", "稀": "ㄒㄧ", "程": "ㄔㄥˊ", "種": "ㄓㄨㄥˇ", "稱": "ㄔㄥ", "稻": "ㄉㄠˋ", "積": "ㄐㄧ", "空": "ㄎㄨㄥ", "穿": "ㄔㄨㄢ", "突": "ㄊㄨ", "窗": "ㄔㄨㄤ", "窩": "ㄨㄛ", "立": "ㄌㄧˋ", "站": "ㄓㄢˋ", "章": "ㄓㄤ", "童": "ㄊㄨㄥˊ", "竹": "ㄓㄨˊ", "笑": "ㄒㄧㄠˋ", "符": "ㄈㄨˊ", "第": "ㄉㄧˋ", "筆": "ㄅㄧˇ", "等": "ㄉㄥˇ", "答": "ㄉㄚˊ", "筷": "ㄎㄨㄞˋ", "箏": "ㄓㄥ", "算": "ㄙㄨㄢˋ", "管": "ㄍㄨㄢˇ", "箭": "ㄐㄧㄢˋ", "箱": "ㄒㄧㄤ", "節": "ㄐㄧㄝˊ", "範": "ㄈㄢˋ", "篩": "ㄕㄞ", "籃": "ㄌㄢˊ", "籠": "ㄌㄨㄥˊ", "籤": "ㄑㄧㄢ", "米": "ㄇㄧˇ", "精": "ㄐㄧㄥ", "糖": "ㄊㄤˊ", "系": "ㄒㄧˋ", "紀": "ㄐㄧˋ", "紅": "ㄏㄨㄥˊ", "紋": "ㄨㄣˊ", "紙": "ㄓˇ", "級": "ㄐㄧˊ", "素": "ㄙㄨˋ", "索": "ㄙㄨㄛˇ", "紫": "ㄗˇ", "累": "ㄌㄟˋ", "細": "ㄒㄧˋ", "紹": "ㄕㄠˋ", "終": "ㄓㄨㄥ", "組": "ㄗㄨˇ", "結": "ㄐㄧㄝˊ", "絕": "ㄐㄩㄝˊ", "給": "ㄍㄟˇ", "統": "ㄊㄨㄥˇ", "絲": "ㄙ", "綁": "ㄅㄤˇ", "經": "ㄐㄧㄥ", "綜": "ㄗㄨㄥ", "綠": "ㄌㄩˋ", "網": "ㄨㄤˇ", "綻": "ㄓㄢˋ", "線": "ㄒㄧㄢˋ", "練": "ㄌㄧㄢˋ", "縮": "ㄙㄨㄛ", "織": "ㄓ", "繩": "ㄕㄥˊ", "繼": "ㄐㄧˋ", "續": "ㄒㄩˋ", "罩": "ㄓㄠˋ", "羅": "ㄌㄨㄛˊ", "羊": "ㄧㄤˊ", "美": "ㄇㄟˇ", "義": "ㄧˋ", "翁": "ㄨㄥ", "翅": "ㄔˋ", "習": "ㄒㄧˊ", "翔": "ㄒㄧㄤˊ", "翠": "ㄘㄨㄟˋ", "翩": "ㄆㄧㄢ", "翱": "ㄠˊ", "翹": "ㄑㄧㄠˋ", "翻": "ㄈㄢ", "耀": "ㄧㄠˋ", "老": "ㄌㄠˇ", "考": "ㄎㄠˇ", "者": "ㄓㄜˇ", "耳": "ㄦˇ", "耶": "ㄧㄝˊ", "聖": "ㄕㄥˋ", "聚": "ㄐㄩˋ", "聞": "ㄨㄣˊ", "聯": "ㄌㄧㄢˊ", "聲": "ㄕㄥ", "聽": "ㄊㄧㄥ", "肚": "ㄉㄨˋ", "肩": "ㄐㄧㄢ", "育": "ㄩˋ", "背": "ㄅㄟˋ", "能": "ㄋㄥˊ", "脖": "ㄅㄛˊ", "脫": "ㄊㄨㄛ", "腕": "ㄨㄢˋ", "腳": "ㄐㄧㄠˇ", "臉": "ㄌㄧㄢˇ", "自": "ㄗˋ", "至": "ㄓˋ", "臺": "ㄊㄞˊ", "與": "ㄩˇ", "興": "ㄒㄧㄥˋ", "舌": "ㄕㄜˊ", "舞": "ㄨˇ", "航": "ㄏㄤˊ", "般": "ㄅㄢ", "船": "ㄔㄨㄢˊ", "艦": "ㄐㄧㄢˋ", "色": "ㄙㄜˋ", "芒": "ㄇㄤˊ", "芭": "ㄅㄚ", "花": "ㄏㄨㄚ", "若": "ㄖㄨㄛˋ", "苦": "ㄎㄨˇ", "茶": "ㄔㄚˊ", "草": "ㄘㄠˇ", "荷": "ㄏㄜˊ", "莓": "ㄇㄟˊ", "菜": "ㄘㄞˋ", "菠": "ㄅㄛ", "萄": "ㄊㄠˊ", "萌": "ㄇㄥˊ", "萬": "ㄨㄢˋ", "落": "ㄌㄨㄛˋ", "葉": "ㄧㄝˋ", "著": "˙ㄓㄜ", "葡": "ㄆㄨˊ", "葵": "ㄎㄨㄟˊ", "蒐": "ㄙㄡ", "蓋": "ㄍㄞˋ", "蔔": "ㄅㄛˊ", "蔥": "ㄘㄨㄥ", "蔬": "ㄕㄨ", "蕉": "ㄐㄧㄠ", "薄": "ㄅㄠˊ", "薦": "ㄐㄧㄢˋ", "藍": "ㄌㄢˊ", "藥": "ㄧㄠˋ", "蘋": "ㄆㄧㄥˊ", "蘭": "ㄌㄢˊ", "蘿": "ㄌㄨㄛˊ", "虎": "ㄏㄨˇ", "處": "ㄔㄨˋ", "虛": "ㄒㄩ", "號": "ㄏㄠˋ", "虹": "ㄏㄨㄥˊ", "蚪": "ㄉㄡˇ", "蛇": "ㄕㄜˊ", "蛋": "ㄉㄢˋ", "蛙": "ㄨㄚ", "蛛": "ㄓㄨ", "蜂": "ㄈㄥ", "蜓": "ㄊㄧㄥˊ", "蜘": "ㄓ", "蜜": "ㄇㄧˋ", "蜻": "ㄑㄧㄥ", "蝌": "ㄎㄜ", "蝟": "ㄨㄟˋ", "蝠": "ㄈㄨˊ", "蝦": "ㄒㄧㄚ", "蝴": "ㄏㄨˊ", "蝶": "ㄉㄧㄝˊ", "蝸": "ㄨㄛ", "螃": "ㄆㄤˊ", "螞": "ㄇㄚˇ", "螢": "ㄧㄥˊ", "蟬": "ㄔㄢˊ", "蟲": "ㄔㄨㄥˊ", "蟹": "ㄒㄧㄝˋ", "蟻": "ㄧˇ", "蠶": "ㄘㄢˊ", "血": "ㄒㄩㄝˋ", "行": "ㄒㄧㄥˊ", "術": "ㄕㄨˋ", "衝": "ㄔㄨㄥ", "衣": "ㄧ", "表": "ㄅㄧㄠˇ", "袋": "ㄉㄞˋ", "袍": "ㄆㄠˊ", "補": "ㄅㄨˇ", "裝": "ㄓㄨㄤ", "裡": "ㄌㄧˇ", "裳": "˙ㄕㄤ", "製": "ㄓˋ", "褲": "ㄎㄨˋ", "襪": "ㄨㄚˋ", "西": "ㄒㄧ", "要": "ㄧㄠˋ", "見": "ㄐㄧㄢˋ", "規": "ㄍㄨㄟ", "視": "ㄕˋ", "親": "ㄑㄧㄣ", "覺": "ㄐㄧㄠˋ", "觀": "ㄍㄨㄢ", "角": "ㄐㄧㄠˇ", "解": "ㄐㄧㄝˇ", "觸": "ㄔㄨˋ", "計": "ㄐㄧˋ", "訊": "ㄒㄩㄣˋ", "訓": "ㄒㄩㄣˋ", "記": "ㄐㄧˋ", "訣": "ㄐㄩㄝˊ", "設": "ㄕㄜˋ", "詞": "ㄘˊ", "詢": "ㄒㄩㄣˊ", "試": "ㄕˋ", "話": "ㄏㄨㄚˋ", "該": "ㄍㄞ", "詳": "ㄒㄧㄤˊ", "認": "ㄖㄣˋ", "誕": "ㄉㄢˋ", "語": "ㄩˇ", "誠": "ㄔㄥˊ", "誤": "ㄨˋ", "說": "ㄕㄨㄛ", "誰": "ㄕㄨㄟˊ", "課": "ㄎㄜˋ", "調": "ㄉㄧㄠˋ", "請": "ㄑㄧㄥˇ", "謝": "ㄒㄧㄝˋ", "識": "ㄕˊ", "護": "ㄏㄨˋ", "譽": "ㄩˋ", "讀": "ㄉㄨˊ", "變": "ㄅㄧㄢˋ", "讚": "ㄗㄢˋ", "豆": "ㄉㄡˋ", "豎": "ㄕㄨˋ", "豐": "ㄈㄥ", "豚": "ㄊㄨㄣˊ", "象": "ㄒㄧㄤˋ", "豬": "ㄓㄨ", "豹": "ㄅㄠˋ", "貓": "ㄇㄠ", "貝": "ㄅㄟˋ", "貼": "ㄊㄧㄝ", "資": "ㄗ", "賞": "ㄕㄤˇ", "賽": "ㄙㄞˋ", "赤": "ㄔˋ", "走": "ㄗㄡˇ", "起": "ㄑㄧˇ", "超": "ㄔㄠ", "趣": "ㄑㄩˋ", "足": "ㄗㄨˊ", "跑": "ㄆㄠˇ", "跟": "ㄍㄣ", "路": "ㄌㄨˋ", "跳": "ㄊㄧㄠˋ", "踏": "ㄊㄚˋ", "蹄": "ㄊㄧˊ", "蹤": "ㄗㄨㄥ", "蹦": "ㄅㄥˋ", "躍": "ㄩㄝˋ", "身": "ㄕㄣ", "車": "ㄔㄜ", "軌": "ㄍㄨㄟˇ", "軍": "ㄐㄩㄣ", "較": "ㄐㄧㄠˋ", "載": "ㄗㄞˋ", "輕": "ㄑㄧㄥ", "輯": "ㄐㄧˊ", "轉": "ㄓㄨㄢˇ", "辛": "ㄒㄧㄣ", "辨": "ㄅㄧㄢˋ", "辮": "ㄅㄧㄢˋ", "農": "ㄋㄨㄥˊ", "迎": "ㄧㄥˊ", "近": "ㄐㄧㄣˋ", "返": "ㄈㄢˇ", "迪": "ㄉㄧˊ", "迴": "ㄏㄨㄟˊ", "迸": "ㄅㄥˋ", "追": "ㄓㄨㄟ", "退": "ㄊㄨㄟˋ", "送": "ㄙㄨㄥˋ", "逆": "ㄋㄧˋ", "這": "ㄓㄜˋ", "通": "ㄊㄨㄥ", "速": "ㄙㄨˋ", "造": "ㄗㄠˋ", "連": "ㄌㄧㄢˊ", "進": "ㄐㄧㄣˋ", "遊": "ㄧㄡˊ", "運": "ㄩㄣˋ", "過": "ㄍㄨㄛˋ", "道": "ㄉㄠˋ", "達": "ㄉㄚˊ", "適": "ㄕˋ", "遮": "ㄓㄜ", "選": "ㄒㄩㄢˇ", "邊": "ㄅㄧㄢ", "邏": "ㄌㄨㄛˊ", "那": "ㄋㄚˋ", "部": "ㄅㄨˋ", "都": "ㄉㄡ", "配": "ㄆㄟˋ", "酸": "ㄙㄨㄢ", "醒": "ㄒㄧㄥˇ", "醫": "ㄧ", "釀": "ㄋㄧㄤˋ", "重": "ㄓㄨㄥˋ", "野": "ㄧㄝˇ", "量": "ㄌㄧㄤˋ", "金": "ㄐㄧㄣ", "針": "ㄓㄣ", "鈕": "ㄋㄧㄡˇ", "鈴": "ㄌㄧㄥˊ", "鉛": "ㄑㄧㄢ", "鉤": "ㄍㄡ", "鋒": "ㄈㄥ", "鋼": "ㄍㄤ", "錄": "ㄌㄨˋ", "錐": "ㄓㄨㄟ", "錯": "ㄘㄨㄛˋ", "錶": "ㄅㄧㄠˇ", "鎖": "ㄙㄨㄛˇ", "鏡": "ㄐㄧㄥˋ", "鐘": "ㄓㄨㄥ", "鐵": "ㄊㄧㄝˇ", "鐺": "ㄉㄤ", "鑑": "ㄐㄧㄢˋ", "鑽": "ㄗㄨㄢ", "長": "ㄔㄤˊ", "門": "ㄇㄣˊ", "閃": "ㄕㄢˇ", "閉": "ㄅㄧˋ", "開": "ㄎㄞ", "間": "ㄐㄧㄢ", "閱": "ㄩㄝˋ", "闖": "ㄔㄨㄤˇ", "關": "ㄍㄨㄢ", "防": "ㄈㄤˊ", "阿": "ㄚ", "陌": "ㄇㄛˋ", "降": "ㄐㄧㄤˋ", "限": "ㄒㄧㄢˋ", "陣": "ㄓㄣˋ", "除": "ㄔㄨˊ", "陪": "ㄆㄟˊ", "陰": "ㄧㄣ", "陽": "ㄧㄤˊ", "隨": "ㄙㄨㄟˊ", "險": "ㄒㄧㄢˇ", "隻": "ㄓ", "雀": "ㄑㄩㄝˋ", "雅": "ㄧㄚˇ", "集": "ㄐㄧˊ", "雙": "ㄕㄨㄤ", "雞": "ㄐㄧ", "難": "ㄋㄢˊ", "雨": "ㄩˇ", "雪": "ㄒㄩㄝˇ", "雲": "ㄩㄣˊ", "零": "ㄌㄧㄥˊ", "雷": "ㄌㄟˊ", "電": "ㄉㄧㄢˋ", "需": "ㄒㄩ", "霄": "ㄒㄧㄠ", "霜": "ㄕㄨㄤ", "靈": "ㄌㄧㄥˊ", "青": "ㄑㄧㄥ", "非": "ㄈㄟ", "面": "ㄇㄧㄢˋ", "革": "ㄍㄜˊ", "鞋": "ㄒㄧㄝˊ", "鞍": "ㄢ", "音": "ㄧㄣ", "韻": "ㄩㄣˋ", "響": "ㄒㄧㄤˇ", "頁": "ㄧㄝˋ", "頂": "ㄉㄧㄥˇ", "項": "ㄒㄧㄤˋ", "順": "ㄕㄨㄣˋ", "領": "ㄌㄧㄥˇ", "頭": "˙ㄊㄡ", "頰": "ㄐㄧㄚˊ", "頸": "ㄐㄧㄥˇ", "顆": "ㄎㄜ", "題": "ㄊㄧˊ", "顏": "ㄧㄢˊ", "類": "ㄌㄟˋ", "顯": "ㄒㄧㄢˇ", "風": "ㄈㄥ", "飄": "ㄆㄧㄠ", "飛": "ㄈㄟ", "食": "ㄕˊ", "飯": "ㄈㄢˋ", "飽": "ㄅㄠˇ", "餅": "ㄅㄧㄥˇ", "養": "ㄧㄤˇ", "餐": "ㄘㄢ", "餓": "ㄜˋ", "餘": "ㄩˊ", "館": "ㄍㄨㄢˇ", "首": "ㄕㄡˇ", "香": "ㄒㄧㄤ", "馬": "ㄇㄚˇ", "馴": "ㄒㄩㄣˊ", "騎": "ㄑㄧˊ", "驗": "ㄧㄢˋ", "骨": "ㄍㄨˇ", "體": "ㄊㄧˇ", "高": "ㄍㄠ", "鬍": "ㄏㄨˊ", "鬚": "ㄒㄩ", "鬥": "ㄉㄡˋ", "魔": "ㄇㄛˊ", "魚": "ㄩˊ", "鱷": "ㄜˋ", "鳥": "ㄋㄧㄠˇ", "鳴": "ㄇㄧㄥˊ", "鴨": "ㄧㄚ", "鴿": "ㄍㄜ", "鵝": "ㄜˊ", "鷗": "ㄡ", "鷹": "ㄧㄥ", "鹿": "ㄌㄨˋ", "麗": "ㄌㄧˋ", "麼": "˙ㄇㄜ", "黃": "ㄏㄨㄤˊ", "黑": "ㄏㄟ", "點": "ㄉㄧㄢˇ", "鼠": "ㄕㄨˇ", "鼻": "ㄅㄧˊ", "齒": "ㄔˇ", "龍": "ㄌㄨㄥˊ", "龜": "ㄍㄨㄟ", "碗": "ㄨㄢˇ", "臂": "ㄅㄧˋ", "乾": "ㄍㄢ", "蛹": "ㄩㄥˇ", "柏": "ㄅㄛˊ", "娜": "ㄋㄚˋ", "后": "ㄏㄡˋ", "諾": "ㄋㄨㄛˋ", "胖": "ㄆㄤˋ", "臭": "ㄔㄡˋ", "霸": "ㄅㄚˋ", "派": "ㄆㄞˋ", "斯": "ㄙ", "摩": "ㄇㄛˊ", "魯": "ㄌㄨˇ", "蛾": "ㄜˊ", "蒂": "ㄉㄧˋ", "蚊": "ㄨㄣˊ", "君": "ㄐㄩㄣ", "凱": "ㄎㄞˇ", "基": "ㄐㄧ", "胡": "ㄏㄨˊ", "豪": "ㄏㄠˊ", "喇": "ㄌㄚˇ", "叭": "ㄅㄚ", "芽": "ㄧㄚˊ", "瑪": "ㄇㄚˇ", "瑙": "ㄋㄠˇ", "毒": "ㄉㄨˊ", "隆": "ㄌㄨㄥˊ", "磁": "ㄘˊ", "利": "ㄌㄧˋ", "鬼": "ㄍㄨㄟˇ", "耿": "ㄍㄥˇ", "催": "ㄘㄨㄟ", "眠": "ㄇㄧㄢˊ", "貘": "ㄇㄛˋ", "鉗": "ㄑㄧㄢˊ", "霹": "ㄆㄧ", "靂": "ㄌㄧˋ", "頑": "ㄨㄢˊ", "嘎": "ㄍㄚ", "腿": "ㄊㄨㄟˇ", "郎": "ㄌㄤˊ", "瓦": "ㄨㄚˇ", "犀": "ㄒㄧ", "蔓": "ㄇㄢˋ", "藤": "ㄊㄥˊ", "墨": "ㄇㄛˋ", "牆": "ㄑㄧㄤˊ", "偶": "ㄡˇ", "螳": "ㄊㄤˊ", "螂": "ㄌㄤˊ", "迷": "ㄇㄧˊ", "唇": "ㄔㄨㄣˊ", "肯": "ㄎㄣˇ", "鯉": "ㄌㄧˇ", "普": "ㄆㄨˇ", "菊": "ㄐㄩˊ", "盔": "ㄎㄨㄟ", "鐮": "ㄌㄧㄢˊ", "翼": "ㄧˋ", "急": "ㄐㄧˊ", "凍": "ㄉㄨㄥˋ", "克": "ㄎㄜˋ"};



  // 台灣教育部官方注音符號構成要素與直式注音渲染核心
  const BPMF_INITIALS = 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙ';
  const BPMF_MEDIALS = 'ㄧㄨㄩ';
  const BPMF_FINALS = 'ㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ';
  const BPMF_ALL = BPMF_INITIALS + BPMF_MEDIALS + BPMF_FINALS;

  function parseSingleSyllable(raw) {
    let s = (raw || '').trim();
    let tone = '';
    let isLight = false;
    if (s.startsWith('˙') || s.startsWith('·')) {
      tone = '˙';
      isLight = true;
      s = s.substring(1);
    } else if (s.endsWith('˙') || s.endsWith('·')) {
      tone = '˙';
      isLight = true;
      s = s.substring(0, s.length - 1);
    } else {
      for (const t of ['ˊ', 'ˇ', 'ˋ']) {
        if (s.includes(t)) {
          tone = t;
          s = s.replace(t, '');
          break;
        }
      }
    }

    const chars = [];
    for (const ch of s) {
      if (BPMF_ALL.includes(ch)) chars.push(ch);
    }

    return { chars, tone, isLight, raw };
  }

  function renderSingleVerticalZhuyin(rawSyllable) {
    const { chars, tone, isLight } = parseSingleSyllable(rawSyllable);
    if (chars.length === 0) return rawSyllable;

    const toneClass = isLight ? 'has-tone-light' : (tone ? 'has-tone-side' : 'no-tone');
    let toneNum = '';
    if (tone === 'ˊ') toneNum = '2';
    else if (tone === 'ˇ') toneNum = '3';
    else if (tone === 'ˋ') toneNum = '4';

    let html = `<span class="zy-vertical-syllable ${toneClass}">`;
    if (isLight) {
      html += '<span class="zy-tone zy-tone-light">˙</span>';
    }
    html += '<span class="zy-chars-col">';
    for (const c of chars) {
      html += `<span class="zy-char">${c}</span>`;
    }
    html += '</span>';
    if (tone && !isLight) {
      html += `<span class="zy-tone zy-tone-side tone-${toneNum}">${tone}</span>`;
    }
    html += '</span>';
    return html;
  }

  function renderZhuyinWord(text) {
    if (!text || typeof text !== 'string') return '';
    const parts = text.trim().split(/\s+/);
    return '<span class="zy-word-vertical">' + parts.map(renderSingleVerticalZhuyin).join('') + '</span>';
  }

  function renderHanziCharPair(char, zhuyin) {
    if (!zhuyin) {
      return `<span class="zy-hanzi-lone">${char}</span>`;
    }
    return `<span class="zy-hanzi-pair"><span class="zy-hanzi">${char}</span>${renderSingleVerticalZhuyin(zhuyin)}</span>`;
  }

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
            result += renderHanziCharPair(sub4[k], pys[k]);
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
            result += renderHanziCharPair(sub3[k], pys[k]);
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
            result += renderHanziCharPair(sub2[k], pys[k]);
          }
          i += 2;
          continue;
        }
      }
      // 4. 單字查表匹配
      const ch = text[i];
      if (TAIWAN_ZHUYIN_DICT[ch]) {
        result += renderHanziCharPair(ch, TAIWAN_ZHUYIN_DICT[ch]);
      } else if (ch === '\n') {
        result += '<br>';
      } else {
        result += `<span class="zy-punct">${ch}</span>`;
      }
      i++;
    }
    return result;
  }

  // 通用直式注音渲染器：支援精確注音字串、寶可夢圖鑑專屬注音與一般國字注音
  function formatZhuyinDisplay(text, explicitZhuyin) {
    if (!text || typeof text !== 'string') return '';
    const s = text.trim();

    // 1. 優先精準對齊：若直接提供注音（或寶可夢官方注音）
    let zhuyinStr = explicitZhuyin;
    if (!zhuyinStr && typeof GEN1_POKEMON_LIST !== 'undefined') {
      const pMatch = GEN1_POKEMON_LIST.find(p => p.name === s);
      if (pMatch && pMatch.zhuyin) {
        zhuyinStr = pMatch.zhuyin;
      }
    }

    if (zhuyinStr && typeof zhuyinStr === 'string') {
      const syllables = zhuyinStr.trim().split(/\s+/).filter(Boolean);
      if (syllables.length === s.length) {
        let res = '';
        for (let k = 0; k < s.length; k++) {
          res += renderHanziCharPair(s[k], syllables[k]);
        }
        return res;
      }
    }

    if (/[\u4e00-\u9fa5]/.test(s)) {
      return addZhuyinRuby(s);
    }
    if (/[ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ]/.test(s)) {
      return renderZhuyinWord(s);
    }
    return s;
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

            <span class="exam-check-pic-label">${q.word || ''}</span>

          </div>

          <div style="font-size:15px;font-weight:900;color:#475569;">👇 請在正確的注音括號中打「✔」：</div>

          <div class="exam-check-options-row" id="exam-check-row"></div>

        `;

        const row = container.querySelector ? container.querySelector('#exam-check-row') : null;
        if (row)

        shuffled.forEach(optText => {

          const card = document.createElement('button');

          card.className = 'exam-check-card'; card.dataset.ansText = optText;

          card.innerHTML = `

            <span class="check-box-bracket">( <span class="check-mark-sym">&nbsp;&nbsp;</span> )</span>

            <span class="check-opt-zhuyin">${formatZhuyinDisplay(optText)}</span>

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

        const row = container.querySelector ? container.querySelector('#exam-circle-row') : null;
        if (row)

        shuffled.forEach(optText => {

          const card = document.createElement('button');

          card.className = 'exam-circle-card'; card.dataset.ansText = optText;

          card.innerHTML = `

            <span class="circle-card-text">${formatZhuyinDisplay(optText)}</span>

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

              <span class="peg-text">${formatZhuyinDisplay(sourceText)}</span>

              <span class="peg-dot">●</span>

            </div>

          </div>

          <div style="font-size:28px;color:#3B82F6;font-weight:900;">➔ 連向 ➔</div>

          <div class="connect-right-col" id="connect-right-col"></div>

        `;

        const rightCol = container.querySelector('#connect-right-col');

        shuffled.forEach(optText => {

          const peg = document.createElement('button');

          peg.className = 'connect-peg target-peg'; peg.dataset.ansText = optText;

          peg.innerHTML = `

            <span class="peg-dot">●</span>

            <span class="peg-text">${formatZhuyinDisplay(optText)}</span>

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

              <div class="fill-box">${formatZhuyinDisplay(targetWord)}</div>

            </div>

          </div>

          <div style="font-size:15px;font-weight:900;color:#475569;">👇 點選正確注音推進空格中：</div>

          <div class="exam-fill-candidates-row" id="exam-fill-row"></div>

        `;

        const candidatesRow = container.querySelector('#exam-fill-row');

        shuffled.forEach(optText => {

          const tile = document.createElement('button');

          tile.className = 'fill-candidate-tile'; tile.dataset.ansText = optText;

          tile.innerHTML = formatZhuyinDisplay(optText);

          tile.addEventListener('click', () => {

            const slot = document.getElementById('target-fill-slot');

            if (slot) {

              slot.innerHTML = formatZhuyinDisplay(optText);

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

            <div class="formula-block">${formatZhuyinDisplay(partA)}</div>

            <span class="formula-symbol">＋</span>

            <div class="formula-block">${formatZhuyinDisplay(partB)}</div>

            <span class="formula-symbol">＝</span>

            <div class="formula-block result-slot" id="combine-res-slot">❓</div>

          </div>

          <div style="font-size:15px;font-weight:900;color:#475569;">👇 點選拼出的完整組合：</div>

          <div class="exam-combine-options-row" id="combine-options-row"></div>

        `;

        const optRow = container.querySelector('#combine-options-row');

        shuffled.forEach(optText => {

          const btn = document.createElement('button');

          btn.className = 'combine-opt-btn'; btn.dataset.ansText = optText;

          btn.innerHTML = formatZhuyinDisplay(optText);

          btn.addEventListener('click', () => {

            const slot = document.getElementById('combine-res-slot');

            if (slot) slot.innerHTML = formatZhuyinDisplay(optText);

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

              ${(q.prompt || '').replace(/【[^】]+】/, '')}

              <span class="tone-target-highlight" id="tone-target-box">【 ${targetChar || '標調目標'} 】</span>

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

          stampBtn.className = 'tone-stamp-btn'; stampBtn.dataset.ansText = optText;

          const mark = toneMarksMap[optText] || '？';

          stampBtn.innerHTML = `

            <span class="stamp-mark">${mark}</span>

            <span class="stamp-name">${optText}</span>

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

          btn.className = `battle-opt-btn ${optText.length > 3 ? 'long-text' : ''}`; btn.dataset.ansText = optText;

          btn.innerHTML = formatZhuyinDisplay(optText);

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

          btn.className = `battle-opt-btn ${optText.length > 3 ? 'long-text' : ''}`; btn.dataset.ansText = optText;

          btn.innerHTML = formatZhuyinDisplay(optText);

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
    state.adventure.isAnswering = true; // 鎖定不可重選！

    const optionsGrid = document.getElementById('battle-options-grid');
    if (optionsGrid) optionsGrid.classList.add('options-locked');

    const stage = state.adventure.activeStage;
    const isShiny = state.adventure.isCurrentShiny;
    const questions = state.adventure.activeQuestions || (stage ? stage.questions : []);
    const pointsPerQ = Math.round(100 / (questions.length || 5));

    if (chosenText === q.answer) {
      // 答對！發動夥伴大絕招突擊動畫並丟出寶貝球收服！
      state.adventure.combo++;
      state.adventure.score = (state.adventure.score || 0) + pointsPerQ;
      if (state.adventure.qIndex === questions.length - 1 && state.adventure.mistakes === 0) {
        state.adventure.score = 100;
      }
      updateBattleHeaderUI();

      // 💰 答對獲得金幣獎勵（若擁有王者冠軍之冠則翻倍）
      const hasCrown = Boolean(state.partnerData && state.partnerData.crown);
      const coinGain = hasCrown ? 20 : 10;
      addCoins(coinGain, true);

      if (btn) btn.classList.add('correct-choice');

      const partnerObj = getCurrentPartnerInfo();

      // 1. 夥伴大招攻擊
      executePlayerAttack(partnerObj, q, () => {
        const flyingBall = document.getElementById('flying-pokeball');
        const oppSprite = document.getElementById('poke-opp-sprite');
        const stadium = document.getElementById('pokemon-battle-field');

        if (flyingBall) {
          flyingBall.className = 'flying-pokeball throw-arc';
        }
        window.audioEngine.playPokeThrow();

        // 0.35秒後：球到達並開啟捕捉光束
        setTimeout(() => {
          if (flyingBall) flyingBall.className = 'flying-pokeball ball-open';
          window.audioEngine.playPokeBeam();

          if (stadium) {
            const oldBeam = document.getElementById('capture-beam-cone');
            if (oldBeam) oldBeam.remove();
            const beamEl = document.createElement('div');
            beamEl.id = 'capture-beam-cone';
            beamEl.className = 'capture-beam-cone';
            stadium.appendChild(beamEl);
          }

          if (oppSprite) oppSprite.classList.add('animal-sucked-in');

          // 0.45秒後：動物收服完成，收起光束
          setTimeout(() => {
            const beam = document.getElementById('capture-beam-cone');
            if (beam) beam.remove();

            window.audioEngine.playPokeCaught();
            if (window.confetti) window.confetti.trigger(isShiny ? 90 : 50);

            // 🔴 成功收服對戰寶可夢！登錄至 151 寶可夢大圖鑑！
            const opp = q.oppPokemon || state.adventure.currentOpponentPokemon;
            let isNewlyCaught = false;
            if (opp && typeof GEN1_POKEMON_LIST !== 'undefined') {
              if (!state.gen1Caught.includes(opp.id)) {
                state.gen1Caught.push(opp.id);
                localStorage.setItem('zhuyin_caught_gen1', JSON.stringify(state.gen1Caught));
                isNewlyCaught = true;
                updatePokedexProgressUI();
                renderGen1Pokedex();
              }
              if (!state.adventure.caughtInCurrentBattle) state.adventure.caughtInCurrentBattle = [];
              state.adventure.caughtInCurrentBattle.push(opp);
            }

            const starBonus = isShiny ? 2 : 1;
            addStars(starBonus, false);
            addPartnerExp(30);
            state.balls = Math.min(99, state.balls + (isShiny ? 3 : 1));
            localStorage.setItem('zhuyin_balls', state.balls.toString());

            updateTrainerHeaderUI();
            if (typeof ensureStartersInGen1Caught === 'function') {
              ensureStartersInGen1Caught();
            }

            const oppNameEl = document.getElementById('poke-opp-name');
            if (oppNameEl && opp) {
              oppNameEl.innerHTML = `<span style="color:#10B981;font-weight:900;">🎉 成功收服：【${opp.name}】(${opp.dexNo})！</span>`;
            }
            setMascotSpeech(isNewlyCaught
              ? `🎉 太強了！答對並成功收服了【${opp ? opp.name : '寶可夢'}】！已登錄 151 寶可夢大圖鑑！（${state.gen1Caught.length}/151 隻）`
              : (isShiny
                ? `✨ 太神了！收服了稀有閃光【${opp ? opp.name : '寶可夢'}】！獲得雙倍星星與精靈球！`
                : `⚡ 答對了！成功收服【${opp ? opp.name : '寶可夢'}】！獲得戰鬥經驗與精靈球！`
              )
            );

            state.adventure.qIndex++;
            updateBattleHeaderUI();

            // 0.55秒後無縫切換到下一題並自動念題目
            setTimeout(() => {
              if (flyingBall) flyingBall.className = 'flying-pokeball';
              if (oppSprite) {
                oppSprite.classList.remove('animal-sucked-in');
                oppSprite.style.opacity = '1';
                oppSprite.style.transform = '';
                oppSprite.style.filter = '';
              }
              const grid = document.getElementById('battle-options-grid');
              if (grid) grid.classList.remove('options-locked');
              renderCurrentStageQuestion();
            }, 550);
          }, 450);
        }, 350);
      });

    } else {
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

      // 💨 野生寶可夢掙脫逃跑動畫與音效
      const opp = q.oppPokemon || state.adventure.currentOpponentPokemon || (typeof GEN1_POKEMON_LIST !== 'undefined' ? GEN1_POKEMON_LIST[0] : null);
      const oppSprite = document.getElementById('poke-opp-sprite');
      if (oppSprite) {
        oppSprite.classList.add('pokemon-fleeing-away');
      }
      if (window.audioEngine.playPokeFlee) {
        setTimeout(() => {
          window.audioEngine.playPokeFlee();
        }, 120);
      }
      const oppNameEl = document.getElementById('poke-opp-name');
      if (oppNameEl && opp) {
        oppNameEl.innerHTML = `<span style="color:#DC2626;">💨 沒抓到！野生的【${opp.name}】掙脫逃跑了！</span>`;
      }

      function extractTarget(qObj) {
        if (qObj.word) {
          const clean = qObj.word.replace(/[^\u4e00-\u9fa5]/g, '').trim();
          if (clean) return clean;
        }
        const match = (qObj.prompt || '').match(/「([^」]+)」/);
        if (match) {
          const clean = match[1].replace(/[^\u4e00-\u9fa5]/g, '').trim();
          if (clean) return clean;
        }
        return '';
      }

      const targetWord = extractTarget(q);
      const answerSpeech = targetWord
        ? `正確答案是：${targetWord}，${q.answer}。`
        : `正確答案是：${q.answer}。`;

      setMascotSpeech(`「哎呀！野生的【${opp ? opp.name : '寶可夢'}】趁機逃跑了！本題正確答案是【${q.answer}】${targetWord ? `(${targetWord})` : ''}，聽聽正確發音，準備好請前往下一題繼續冒險！」`);

      // 延遲 0.4 秒等逃跑與答錯提示音結束，清晰朗讀真人正確答案發音
      setTimeout(() => {
        window.audioEngine.speak(answerSpeech);
      }, 400);

      // 畫面停住：建立「野生寶可夢逃跑覆盤與前往下一題」控制面板
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
        const oppImgUrl = opp ? (opp.localImage || `assets/pokemon/gen1/${opp.id}.png`) : 'assets/pokemon/gen1/1.png';
        const oppNameStr = opp ? opp.name : '寶可夢';

        feedbackEl.innerHTML = `
          <div class="wrong-answer-review-card pokemon-fled-mode">
            <div class="fled-pokemon-banner">
              <div class="fled-pokemon-avatar-box">
                <img src="${oppImgUrl}" alt="${oppNameStr}" onerror="this.onerror=null;this.src='${opp ? opp.image : ''}';" />
                <span class="fled-smoke-puff">💨</span>
              </div>
              <div class="fled-pokemon-info">
                <div class="fled-pokemon-title">💨 沒抓到！野生的【${oppNameStr}】逃跑了！</div>
                <div class="fled-pokemon-desc">寶可夢掙脫球溜回草叢了～不要灰心，把正確發音記起來，下一隻一定能抓到！</div>
              </div>
            </div>

            <div class="wrong-review-header">
              <span class="wrong-cross-icon">❌</span>
              <div class="wrong-review-text">
                <strong style="font-size:16px;color:#DC2626;">本題正確發音學習覆盤：</strong>
                <div style="font-size:17px;color:#1E293B;font-weight:900;margin-top:4px;">
                  正確答案是：<span class="correct-highlight-val">【${q.answer}】${targetWord ? `(${targetWord})` : ''}</span>
                </div>
              </div>
            </div>

            <div class="wrong-review-actions">
              <button class="review-replay-audio-btn" id="btn-replay-correct-audio" type="button">
                <span>🔊</span> 再聽一次正確答案
              </button>
              <button class="review-next-q-btn" id="btn-next-question-manual" type="button">
                <span>👉</span> ${nextBtnText} <span>${nextBtnIcon}</span>
              </button>
            </div>
          </div>
        `;

        const btnReplay = document.getElementById('btn-replay-correct-audio');
        if (btnReplay) {
          btnReplay.addEventListener('click', () => {
            window.audioEngine.playPop();
            window.audioEngine.stopSpeaking();
            setTimeout(() => {
              window.audioEngine.speak(answerSpeech);
            }, 100);
          });
        }

        const btnNext = document.getElementById('btn-next-question-manual');
        if (btnNext) {
          btnNext.addEventListener('click', () => {
            window.audioEngine.playPop();
            window.audioEngine.stopSpeaking(); // 確保停止上一題殘留語音
            feedbackEl.style.display = 'none';
            if (oppSprite) oppSprite.classList.remove('pokemon-fleeing-away');
            state.adventure.qIndex++;
            updateBattleHeaderUI();
            if (optionsGrid) optionsGrid.classList.remove('options-locked');
            renderCurrentStageQuestion();
          });
        }
      }
    }
  }

  function handleStageVictory() {
    const stage = state.adventure.activeStage;
    if (!stage) return;

    // 100分才算過關！
    const isPass = (state.adventure.score === 100);
    const badges = getCurrentGymBadges();
    const badge = badges.find(b => b.stageId === stage.id);
    const qCard = document.getElementById('battle-question-card');

    if (isPass) {
      // 滿分 100 分通關！
      const earnedStars = 3;
      const isFinal = (state.examDifficulty === 'final');
      if (isFinal) {
        state.adventure.stageStarsFinal[String(stage.id)] = 3;
      } else {
        state.adventure.stageStars[String(stage.id)] = 3;
      }
      saveCurrentStageStars();

      addStars(6, true);
      state.balls = Math.min(99, state.balls + 9);
      localStorage.setItem('zhuyin_balls', state.balls.toString());
      addCoins(150, false); // 💯 滿分通關金幣大獎勵！
      updateTrainerHeaderUI();
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
    }

      window.audioEngine.playBadgeGet();
      if (window.confetti) window.confetti.trigger(120);

      renderGymBadges();

            // 🔴 收服野生對手寶可夢至 151 寶可夢大圖鑑！
      const opp = state.adventure.currentOpponentPokemon;
      let isNewlyCaught = false;
      if (opp && !state.gen1Caught.includes(opp.id)) {
        state.gen1Caught.push(opp.id);
        localStorage.setItem('zhuyin_caught_gen1', JSON.stringify(state.gen1Caught));
        isNewlyCaught = true;
        updatePokedexProgressUI();
      }

      if (stage.id === 1) unlockAchievement('stage_1_clear');
      if (stage.id === 5) unlockAchievement('stage_5_clear');
      if (stage.id === 10) unlockAchievement('dragon_slayer');

      const stages = getCurrentAdventureStages();
      const nextStage = stages.find(s => s.id === stage.id + 1);

      window.audioEngine.speak(`太棒了！恭喜你擊敗${stage.bossName}，獲得${badge ? badge.name : '榮譽徽章'}！`);

      if (qCard) {
        qCard.innerHTML = `
          <div style="text-align:center;padding:20px 12px;animation:fadeIn 0.4s ease;">
            <div style="font-size:62px;margin-bottom:8px;">${badge ? badge.icon : '🏅'}</div>
            <div style="display:inline-block;background:#D1FAE5;color:#065F46;font-size:18px;font-weight:900;padding:6px 16px;border-radius:20px;margin-bottom:10px;border:2px solid #10B981;">
              💯 滿分 100 分・考核大成功！
            </div>
            <h2 style="font-size:26px;font-weight:900;color:#DC2626;margin-bottom:6px;">
              道館挑戰大成功！榮獲【${badge ? badge.name : '榮譽徽章'}】！
            </h2>
            <div style="font-size:38px;margin:10px 0;letter-spacing:8px;">
              ⭐⭐⭐
            </div>
            <p style="font-size:16px;font-weight:800;color:#475569;margin-bottom:14px;">
              擊敗道館館主【${stage.bossIcon} ${stage.bossName}】，獲得 <strong>+6 顆金星星</strong>、<strong>+9 顆寶貝球</strong> 與 <strong style="color:#D97706;">+150 💰 冒險金幣</strong>！
            </p>
            <!-- 🔴 成功收服寶可夢成果展示卡 -->
            <div class="caught-banner-card" style="margin:14px auto;max-width:480px;background:linear-gradient(135deg, #FEF2F2, #FFFBEB);border:3px solid #EF4444;border-radius:18px;padding:16px 20px;box-shadow:0 6px 0 #DC2626;animation:fadeIn 0.5s ease;">
              <div style="font-size:16px;color:#DC2626;font-weight:900;margin-bottom:8px;display:flex;align-items:center;justify-content:center;gap:6px;">
                <span>🔴</span> <strong>本場道館挑戰收服的寶可夢：</strong>
              </div>
              <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:8px;">
                ${(state.adventure.caughtInCurrentBattle && state.adventure.caughtInCurrentBattle.length > 0 ? state.adventure.caughtInCurrentBattle : (opp ? [opp] : [])).map(p => `
                  <div style="background:#FFFFFF;border:2px solid ${p.color || '#CBD5E1'};border-radius:12px;padding:6px 10px;display:flex;flex-direction:column;align-items:center;min-width:70px;box-shadow:0 2px 5px rgba(0,0,0,0.06);">
                    <img src="assets/pokemon/gen1/${p.id}.png" alt="${p.name}" style="width:46px;height:46px;object-fit:contain;" onerror="this.onerror=null;this.src='${p.image}';" />
                    <span style="font-size:12px;font-weight:900;color:#1E293B;margin-top:2px;">${formatZhuyinDisplay(p.name, p.zhuyin)}</span>
                    <span style="font-size:10px;color:#64748B;">${p.dexNo}</span>
                  </div>
                `).join('')}
              </div>
              <div style="font-size:13px;color:#4B5563;font-weight:800;border-top:1px dashed #FCA5A5;padding-top:8px;">
                目前 151 寶可夢大圖鑑收集：<strong style="color:#DC2626;font-size:15px;">${state.gen1Caught.length} / 151 隻</strong>
              </div>
            </div>

            <!-- 🎁 道館神秘大寶箱 -->
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
              <button class="big-action-btn" id="btn-victory-shop" style="background:#F59E0B;border-color:#D97706;box-shadow:0 6px 0 #B45309;">
                <span>🛍️</span>
                <span>前往培育商店升級夥伴</span>
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
            addCoins(100, true); // 🎁 神秘大寶箱金幣獎勵！
            addPartnerExp(100);
            updateTrainerHeaderUI();
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
    }

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
                <span style="background:#FFFBEB;border:2px solid #F59E0B;color:#B45309;padding:6px 14px;border-radius:12px;font-weight:900;font-size:15px;">💰 冒險金幣 +100</span>
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
        const btnVictoryShop = document.getElementById('btn-victory-shop');
        if (btnVictoryShop) {
          btnVictoryShop.addEventListener('click', () => {
            window.audioEngine.playPop();
            const shopTab = Array.from(dom.tabBtns).find(b => b.dataset.tab === 'tab-shop');
            if (shopTab) {
              shopTab.click();
            }
          });
        }
      }
    } else {
      // 未達 100 分，闖關失敗！
      window.audioEngine.playWrong();
      window.audioEngine.speak('這題不對，別灰心，看老師提示再試一次！');

      if (qCard) {
        qCard.innerHTML = `
          <div style="text-align:center;padding:24px 16px;animation:fadeIn 0.4s ease;">
            <div style="font-size:62px;margin-bottom:8px;">📝</div>
            <div style="display:inline-block;background:#FEE2E2;color:#991B1B;font-size:18px;font-weight:900;padding:6px 18px;border-radius:20px;margin-bottom:10px;border:2px solid #EF4444;">
              ❌ 未達 100 分・闖關未通過
            </div>
            <h2 style="font-size:26px;font-weight:900;color:#1F2937;margin-bottom:8px;">
              本次道館考核得分：<span style="color:#DC2626;font-size:36px;font-weight:900;">${state.adventure.score}</span> / 100 分
            </h2>
            <p style="font-size:16px;font-weight:800;color:#4B5563;max-width:480px;margin:0 auto 18px;line-height:1.6;">
              國小一年級注音道館標準：每題 20 分，必須 <strong>5 題全對獲得 100 分滿分</strong> 才能榮獲榮譽徽章並解鎖下一關喔！
            </p>

            <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-top:20px;">
              <button class="big-action-btn" id="btn-victory-retry" style="background:#2563EB;border-color:#1D4ED8;color:#FFFFFF;box-shadow:0 6px 0 #1E40AF;">
                <span>🔄</span>
                <span>重新挑戰滿分 (100分)</span>
              </button>
              <button class="secondary-action-btn" id="btn-victory-map">
                🗺️ 返回道館地圖
              </button>
            </div>
          </div>
        `;

        const btnRetry = document.getElementById('btn-victory-retry');
        if (btnRetry) {
          btnRetry.addEventListener('click', () => {
            window.audioEngine.playPop();
            startStageBattle(stage);
          });
        }
        const btnMap = document.getElementById('btn-victory-map');
        if (btnMap) {
          btnMap.addEventListener('click', () => {
            window.audioEngine.playPop();
            showAdventureMap();
          });
        }
      }
    }
  }

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



    // 🔴 設為出戰主力夥伴／培育快捷入口
    const partnerBox = document.getElementById('modal-partner-box');
    const partnerBtn = document.getElementById('modal-btn-set-partner');
    const partnerBoxIcon = document.getElementById('modal-partner-box-icon');
    const partnerBoxTitle = document.getElementById('modal-partner-box-title');
    const partnerBoxDesc = document.getElementById('modal-partner-box-desc');

    const isCaught = (state.pokedexCaught || []).includes(sym.char);
    const partnerId = `sym_${sym.char}`;
    const isCurrent = (state.partner === partnerId || state.partner === sym.char);
    const pData = getPartnerData(partnerId);

    if (partnerBox) {
      if (isCaught) {
        partnerBox.style.display = 'flex';
        if (partnerBoxIcon) partnerBoxIcon.textContent = sym.icon;
        if (partnerBoxTitle) partnerBoxTitle.textContent = `【${sym.pokeName}】（Lv.${pData.level || 1}）`;

        if (isCurrent) {
          if (partnerBoxDesc) partnerBoxDesc.textContent = `目前出戰的主力夥伴！隨時前往培育商店餵食甜點升級`;
          if (partnerBtn) {
            partnerBtn.textContent = '🛍️ 前往培育商店';
            partnerBtn.classList.add('active');
            partnerBtn.onclick = () => {
              dom.modalCloseBtn.click();
              const shopTab = Array.from(dom.tabBtns).find(b => b.dataset.tab === 'tab-shop');
              if (shopTab) shopTab.click();
            };
          }
        } else {
          if (partnerBoxDesc) partnerBoxDesc.textContent = `換成主力寵物，前往道館戰鬥與商店培育升級`;
          if (partnerBtn) {
            partnerBtn.textContent = '⚡ 派牠出戰！';
            partnerBtn.classList.remove('active');
            partnerBtn.onclick = () => {
              window.audioEngine.playFanfare();
              if (window.confetti) window.confetti.trigger(60);
              switchActivePartner(partnerId);
              setMascotSpeech(`⚡ 太棒了！已將【${sym.pokeName}】取出設為出戰主力夥伴！快去培育商店升級培育牠吧！`);
              openSymbolModal(index);
            };
          }
        }
      } else {
        partnerBox.style.display = 'none';
      }
    }

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
    if (!dom.trainPickerInitial) return;

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



    // 播放國語語音朗讀（台灣小一國語教室真人教師標準聲調，絕無電子機器音）
    const toneExplanation = 
      tone.id === 1 ? '第一聲，平平的！ㄅㄚ，八個蘋果的八！' :
      tone.id === 2 ? '第二聲，往上爬！ㄅㄚˊ，拔蘿蔔的拔！' :
      tone.id === 3 ? '第三聲，轉個彎！ㄅㄚˇ，一把傘的把！' :
      tone.id === 4 ? '第四聲，溜滑梯！ㄅㄚˋ，爸爸的爸！' :
                      '輕聲，輕輕的！ㄅㄚ˙，爸爸後面的爸！';
    window.audioEngine.speak(toneExplanation);
  }

  // ==========================================
  // MODULE 4: 趣味注音小遊樂園

  // ==========================================

  function initGameHub() {
    if (!dom.gameArena) return;

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
    if (!dom.gameArena) return;

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

  window.handleStageVictory = handleStageVictory;
  window.renderNurtureShop = renderNurtureShop;
  window.addCoins = addCoins;
  window.startStageBattle = startStageBattle;
  window.initGen1Pokedex = initGen1Pokedex;
  window.renderGen1Pokedex = renderGen1Pokedex;
  window.openGen1DetailModal = openGen1DetailModal;
  window.showParentMathGateModal = showParentMathGateModal;
  window.getCurrentPartnerInfo = getCurrentPartnerInfo;
  window.useEvolutionStoneOnPartner = useEvolutionStoneOnPartner;





  // =========================================================================
  // 🔴 52poke 初代 151 寶可夢大圖鑑系統 (Kanto Gen 1 Pokédex Module)
  // =========================================================================

  function getPartnerGen1Id(partnerId) {
    if (!partnerId) return 25;
    if (typeof partnerId === 'string' && partnerId.startsWith('gen1_')) {
      const n = parseInt(partnerId.replace('gen1_', ''), 10);
      return isNaN(n) ? null : n;
    }
    const STARTER_MAP = {
      'bulbasaur': 1,
      'charmander': 4,
      'squirtle': 7,
      'pikachu': 25,
      'eevee': 133
    };
    return STARTER_MAP[partnerId] || null;
  }

  function isCurrentPartnerPokemon(pId) {
    if (state.partner === 'gen1_' + pId) return true;
    const pData = (state.partner && typeof getPartnerData === 'function') ? getPartnerData(state.partner) : (state.partnerData || {});
    const pLevel = pData.level || 1;
        if (state.partner === 'pikachu') {
      return pId === 25;
    }
    if (state.partner === 'charmander') {
      if (pLevel >= 36) return pId === 6;
      if (pLevel >= 16) return pId === 5;
      return pId === 4;
    }
    if (state.partner === 'squirtle') {
      if (pLevel >= 36) return pId === 9;
      if (pLevel >= 16) return pId === 8;
      return pId === 7;
    }
    if (state.partner === 'bulbasaur') {
      if (pLevel >= 36) return pId === 3;
      if (pLevel >= 16) return pId === 2;
      return pId === 1;
    }
        if (state.partner === 'eevee') {
      return pId === 133;
    }
    const partnerInfo = (typeof getCurrentPartnerInfo === 'function') ? getCurrentPartnerInfo() : null;
    if (partnerInfo && partnerInfo.gen1Id === pId) return true;
    return false;
  }

    function validateCurrentPartnerCaught() {
    ensureStartersInGen1Caught();
    if (typeof state.partner === 'string' && state.partner.startsWith('gen1_')) {
      const pid = parseInt(state.partner.replace('gen1_', ''), 10);
      const isStarter = [1, 4, 7, 25, 133].includes(pid);
      if (!isStarter && !state.unlockAllPokemon && !(state.gen1Caught && state.gen1Caught.includes(pid))) {
        // 尚未收服，不能出戰，安全回退至初始夥伴伊布
        state.partner = 'eevee';
        localStorage.setItem('zhuyin_main_partner', 'eevee');
        localStorage.setItem('zhuyin_partner', 'eevee');
        updateTrainerHeaderUI();
      }
    }
  }

  function ensureStartersInGen1Caught() {
    if (!Array.isArray(state.gen1Caught)) {
      try {
        state.gen1Caught = JSON.parse(localStorage.getItem('zhuyin_caught_gen1') || '[]');
      } catch (e) {
        state.gen1Caught = [];
      }
    }
    // 5 大初始配備寶可夢必入圖鑑 (妙蛙種子#1, 小火龍#4, 傑尼龜#7, 皮卡丘#25, 伊布#133)
    const starters = [1, 4, 7, 25, 133];
    starters.forEach(id => {
      if (!state.gen1Caught.includes(id)) {
        state.gen1Caught.push(id);
      }
    });

    // 當前出戰夥伴及其進化形態必入圖鑑
    const currentId = getPartnerGen1Id(state.partner);
    if (currentId && !state.gen1Caught.includes(currentId)) {
      state.gen1Caught.push(currentId);
    }
    const pData = (state.partner && typeof getPartnerData === 'function') ? getPartnerData(state.partner) : (state.partnerData || {});
    const pLevel = pData.level || 1;
    if (state.partner === 'charmander') {
      if (pLevel >= 16 && !state.gen1Caught.includes(5)) state.gen1Caught.push(5);
      if (pLevel >= 36 && !state.gen1Caught.includes(6)) state.gen1Caught.push(6);
    } else if (state.partner === 'squirtle') {
      if (pLevel >= 16 && !state.gen1Caught.includes(8)) state.gen1Caught.push(8);
      if (pLevel >= 36 && !state.gen1Caught.includes(9)) state.gen1Caught.push(9);
    } else if (state.partner === 'bulbasaur') {
      if (pLevel >= 16 && !state.gen1Caught.includes(2)) state.gen1Caught.push(2);
      if (pLevel >= 36 && !state.gen1Caught.includes(3)) state.gen1Caught.push(3);
    }

    state.gen1Caught.sort((a, b) => a - b);
    localStorage.setItem('zhuyin_caught_gen1', JSON.stringify(state.gen1Caught));
  }

  function initGen1Pokedex() {
    ensureStartersInGen1Caught();
    // 綁定圖鑑模式切換按鈕 (151 寶可夢 vs 37 注音符號)
    const btnModeGen1 = document.getElementById('btn-mode-gen1');
    const btnModeSymbols = document.getElementById('btn-mode-symbols');
    const viewGen1 = document.getElementById('view-gen1-pokedex');
    const viewSymbols = document.getElementById('view-symbols-pokedex');

    if (btnModeGen1 && btnModeSymbols) {
      btnModeGen1.addEventListener('click', () => {
        window.audioEngine.playPop();
        state.pokedexMode = 'gen1';
        btnModeGen1.classList.add('active');
        btnModeSymbols.classList.remove('active');
        if (viewGen1) viewGen1.style.display = 'block';
        if (viewSymbols) viewSymbols.style.display = 'none';
        updatePokedexProgressUI();
        renderGen1Pokedex();
      });

      btnModeSymbols.addEventListener('click', () => {
        window.audioEngine.playPop();
        state.pokedexMode = 'symbols';
        btnModeSymbols.classList.add('active');
        btnModeGen1.classList.remove('active');
        if (viewGen1) viewGen1.style.display = 'none';
        if (viewSymbols) viewSymbols.style.display = 'block';
        updatePokedexProgressUI();
        renderGallery();
      });
    }

    // 自由解鎖全 151 隻按鈕
    const btnUnlockPoke = document.getElementById('btn-toggle-unlock-pokemon');
    if (btnUnlockPoke) {
      const updateUnlockBtn = () => {
        if (state.unlockAllPokemon) {
          btnUnlockPoke.textContent = '🔒 恢復正常收服模式';
          btnUnlockPoke.style.background = '#10B981';
        } else {
          btnUnlockPoke.textContent = '🔓 自由解鎖全 151 隻';
          btnUnlockPoke.style.background = 'rgba(255,255,255,0.25)';
        }
      };
      updateUnlockBtn();

      btnUnlockPoke.addEventListener('click', () => {
        window.audioEngine.playPop();
        if (!state.unlockAllPokemon) {
          // 家長算術門檻防跳過挑戰
          openParentMathGateModal(() => {
            state.unlockAllPokemon = true;
            localStorage.setItem('zhuyin_unlock_all_pokemon', 'true');
            updateUnlockBtn();
            updatePokedexProgressUI();
            renderGen1Pokedex();
            if (window.confetti) window.confetti.trigger(80);
            setMascotSpeech('🌟 家長驗證通過！已開啟【全 151 隻寶可夢自由檢閱模式】！');
          });
        } else {
          state.unlockAllPokemon = false;
          localStorage.setItem('zhuyin_unlock_all_pokemon', 'false');
          validateCurrentPartnerCaught();
          updateUnlockBtn();
          updatePokedexProgressUI();
          renderGen1Pokedex();
          setMascotSpeech('🔒 已切換回一般道館闖關收服模式！未收服的寶可夢需在道館挑戰獲勝後才可派牠出戰！');
        }
      });
    }

    // 搜尋框輸入事件
    const searchInput = document.getElementById('gen1-search-input');
    const clearBtn = document.getElementById('btn-clear-gen1-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.gen1SearchQuery = e.target.value.trim().toLowerCase();
        if (clearBtn) clearBtn.style.display = state.gen1SearchQuery ? 'block' : 'none';
        renderGen1Pokedex();
      });
    }
    if (clearBtn && searchInput) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        state.gen1SearchQuery = '';
        clearBtn.style.display = 'none';
        renderGen1Pokedex();
      });
    }

    // 狀態篩選按鈕 (全部 / 已收服 / 未收服)
    const statusChips = document.querySelectorAll('.gen1-status-filters .status-chip');
    statusChips.forEach(chip => {
      chip.addEventListener('click', () => {
        window.audioEngine.playPop();
        statusChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.gen1StatusFilter = chip.dataset.statusFilter;
        renderGen1Pokedex();
      });
    });

    // 屬性篩選按鈕
    const typeChips = document.querySelectorAll('#gen1-type-filter-bar .filter-chip');
    typeChips.forEach(chip => {
      chip.addEventListener('click', () => {
        window.audioEngine.playPop();
        typeChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.gen1TypeFilter = chip.dataset.typeFilter;
        renderGen1Pokedex();
      });
    });

    // 詳細檔案彈窗關閉事件
    const modalCloseBtn = document.getElementById('gen1-modal-close');
    const modalOverlay = document.getElementById('gen1-pokemon-modal');
    if (modalCloseBtn && modalOverlay) {
      modalCloseBtn.addEventListener('click', () => {
        window.audioEngine.playPop();
        stopPokemonIntroAudio();
        modalOverlay.style.display = 'none';
      });
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          stopPokemonIntroAudio();
          modalOverlay.style.display = 'none';
        }
      });
    }
  }

  function renderGen1Pokedex() {
    const grid = document.getElementById('gen1-pokemon-grid');
    if (!grid || typeof GEN1_POKEMON_LIST === 'undefined') return;
    grid.innerHTML = '';

    ensureStartersInGen1Caught();

    const query = state.gen1SearchQuery || '';
    const statusFilter = state.gen1StatusFilter || 'all';
    const typeFilter = state.gen1TypeFilter || 'all';

    const filtered = GEN1_POKEMON_LIST.filter(p => {
      const isCaught = state.unlockAllPokemon || (state.gen1Caught && state.gen1Caught.includes(p.id));

      // 狀態篩選
      const isMaxTrained = isPokemonMaxTrained(p.id);
      if (statusFilter === 'caught' && !isCaught) return false;
      if (statusFilter === 'uncaught' && isCaught) return false;
      if (statusFilter === 'maxtrained' && !isMaxTrained) return false;

      // 屬性篩選
      if (typeFilter !== 'all' && !p.types.includes(typeFilter)) return false;

      // 搜尋關鍵字
      if (query) {
        const matchesName = p.name.includes(query);
        const matchesZhuyin = (p.zhuyin || '').replace(/\s+/g, '').includes(query.replace(/\s+/g, ''));
        const matchesEn = p.enName.toLowerCase().includes(query);
        const matchesJp = p.jpName.includes(query);
        const matchesDex = p.dexNo.toLowerCase().includes(query) || p.id.toString() === query;
        if (!matchesName && !matchesZhuyin && !matchesEn && !matchesJp && !matchesDex) {
          return false;
        }
      }

      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px 10px;color:#94A3B8;font-size:16px;font-weight:900;">🔍 找不到符合條件的寶可夢，換個關鍵字搜尋看看吧！</div>';
      return;
    }

    filtered.forEach(p => {
      const isCaught = state.unlockAllPokemon || (state.gen1Caught && state.gen1Caught.includes(p.id));
      const isCurrent = isCurrentPartnerPokemon(p.id);
      const isStarter = [1, 4, 7, 25, 133].includes(p.id);
      const isMaxTrained = isPokemonMaxTrained(p.id);

      const card = document.createElement('div');
      card.className = 'gen1-card ' + (isCaught ? 'caught' : 'uncaught') + (isCurrent ? ' current-partner-card' : '') + (isMaxTrained ? ' max-trained-card' : '');
      card.style.setProperty('--card-theme-color', isMaxTrained ? '#F59E0B' : (p.color || '#3B82F6'));

      const typesHtml = p.types.map(t => {
        return '<span class="gen1-type-badge" style="background:' + (p.color || '#3B82F6') + ';">' + (p.icon || '⚡') + ' ' + t + '</span>';
      }).join('');

      card.innerHTML = `
        ${isMaxTrained ? '<div class="gen1-max-trained-badge" title="🌟 終極訓練完成！滿級 Lv.100 極限達成！"><span class="badge-crown">👑</span> 終極訓練完成</div>' : ''}
        ${isCurrent ? '<div class="gen1-active-partner-badge" style="' + (isMaxTrained ? 'top:-11px;right:6px;' : '') + '">⚡ 出戰中</div>' : ''}
        <div class="gen1-card-top">
          <span class="gen1-card-dex">${p.dexNo}</span>
          <div style="display:flex;align-items:center;gap:4px;">
            ${isMaxTrained ? '<span class="gen1-max-lvl-pill">Lv.100 滿級</span>' : ''}
            ${isStarter ? '<span class="gen1-starter-badge">🌱 初始夥伴</span>' : ''}
            <span class="gen1-card-ball">${isCaught ? '🔴' : '⚪'}</span>
          </div>
        </div>
        <div class="gen1-card-img-wrap ${isMaxTrained ? 'max-trained-img-wrap' : ''}">
          <img src="assets/pokemon/gen1/${p.id}.png" alt="${p.name}" class="gen1-card-img" loading="lazy" onerror="this.onerror=null;this.src='${p.image}';" />
          ${isMaxTrained ? '<span class="max-trained-corner-crown">👑</span>' : ''}
        </div>
        <div class="gen1-card-name-ruby${(p.name && p.name.length >= 5) ? ' len-5' : ((p.name && p.name.length === 4) ? ' len-4' : '')}">
          ${formatZhuyinDisplay(p.name, p.zhuyin)}
        </div>
        <div class="gen1-card-types">
          ${typesHtml}
        </div>
      `;

      card.addEventListener('click', () => {
        window.audioEngine.playPop();
        openGen1DetailModal(p, isCaught);
      });

      grid.appendChild(card);
    });
  }

  let activeGen1PokemonAudio = null;

  function stopPokemonIntroAudio() {
    if (activeGen1PokemonAudio) {
      try {
        activeGen1PokemonAudio.pause();
        activeGen1PokemonAudio.currentTime = 0;
        activeGen1PokemonAudio.onended = null;
        activeGen1PokemonAudio.onerror = null;
        activeGen1PokemonAudio.src = '';
      } catch (e) {}
      activeGen1PokemonAudio = null;
    }
    if (window.audioEngine) {
      window.audioEngine.stopSpeaking();
    }
  }

  function getPokemonSpeechText(targetP) {
    if (!targetP) return '';
    const name = targetP.name;
    const typesStr = (targetP.types || []).map(t => t + '屬性').join('與');
    let evoStr = '';

    if (targetP.evolution) {
      if (targetP.evolution.method === 'stone') {
        evoStr = '需要使用' + targetP.evolution.stoneName + '進化為【' + targetP.evolution.evolvesToName + '】。';
      } else if (targetP.evolution.method === 'branch_stone') {
        evoStr = '可以使用水之石進化為水伊布、雷之石進化為雷伊布、或火之石進化為火伊布。';
      } else if (targetP.evolution.reqLevel) {
        evoStr = '達成 ' + targetP.evolution.reqLevel + ' 級進化為【' + targetP.evolution.evolvesToName + '】。';
      } else {
        evoStr = '可進化為【' + targetP.evolution.evolvesToName + '】。';
      }
    } else {
      const isEvolved = typeof GEN1_POKEMON_LIST !== 'undefined' && GEN1_POKEMON_LIST.some(other => {
        if (other.evolution) {
          if (other.evolution.evolvesToId === targetP.id) return true;
          if (other.evolution.branches && other.evolution.branches.some(b => b.evolvesToId === targetP.id)) return true;
        }
        return false;
      });
      if (isEvolved) {
        evoStr = '已為該形態最終階段。';
      } else {
        evoStr = '無進化型態。';
      }
    }

    return name + '，' + typesStr + '。' + evoStr;
  }

  function openGen1DetailModal(p, isCaught) {
    const modal = document.getElementById('gen1-pokemon-modal');
    if (!modal) return;

    const dexEl = document.getElementById('gen1-modal-dex');
    const titleEl = document.getElementById('gen1-modal-title');
    const subnamesEl = document.getElementById('gen1-modal-subnames');
    const imgEl = document.getElementById('gen1-modal-img');
    const rubyEl = document.getElementById('gen1-modal-ruby');
    const typesEl = document.getElementById('gen1-modal-types');
    const moveEl = document.getElementById('gen1-modal-move');
    const evoEl = document.getElementById('gen1-modal-evolution');
    const descEl = document.getElementById('gen1-modal-desc');
    const btnSpeak = document.getElementById('gen1-modal-btn-speak');
    const btnSetPartner = document.getElementById('gen1-btn-set-partner');

    if (dexEl) dexEl.textContent = p.dexNo;
    if (titleEl) titleEl.innerHTML = formatZhuyinDisplay(p.name, p.zhuyin);
    if (subnamesEl) subnamesEl.textContent = p.enName + ' (' + p.jpName + ')';
    if (imgEl) {
      imgEl.src = 'assets/pokemon/gen1/' + p.id + '.png';
      imgEl.onerror = () => { imgEl.src = p.image; };
    }
    if (rubyEl) rubyEl.innerHTML = formatZhuyinDisplay(p.name, p.zhuyin);
    if (typesEl) {
      typesEl.innerHTML = p.types.map(t => '<span class="gen1-type-badge" style="background:' + (p.color || '#3B82F6') + ';font-size:13px;padding:4px 10px;">' + (p.icon || '⚡') + ' ' + t + '屬性</span>').join('');
    }
    if (moveEl) moveEl.textContent = p.move || '十萬伏特';
    if (evoEl) {
      if (p.evolution) {
        if (p.evolution.method === 'stone') {
          const sCount = (state.stones && state.stones[p.evolution.stone]) || 0;
          evoEl.innerHTML = `💎 需要【${formatZhuyinDisplay(p.evolution.stoneName)}】進化為：【${formatZhuyinDisplay(p.evolution.evolvesToName)}】<span style="margin-left:8px;font-size:13px;color:#D97706;font-weight:900;">(目前擁有: ${sCount}顆)</span>`;
        } else if (p.evolution.method === 'branch_stone' && p.evolution.branches) {
          evoEl.innerHTML = `💎 屬性寶石多元分支進化：<div style="margin-top:4px;font-size:13px;display:flex;flex-wrap:wrap;gap:6px;">` +
            p.evolution.branches.map(b => {
              const bCount = (state.stones && state.stones[b.stone]) || 0;
              return `<span style="background:#F1F5F9;padding:2px 8px;border-radius:10px;border:1px solid #CBD5E1;">${formatZhuyinDisplay(b.stoneName)} (${bCount}顆) ➔ 【${formatZhuyinDisplay(b.evolvesToName)}】</span>`;
            }).join('') + `</div>`;
        } else {
          evoEl.innerHTML = '達成 Lv.' + p.evolution.reqLevel + ' 進化為：【' + formatZhuyinDisplay(p.evolution.evolvesToName) + '】';
        }
      } else {
        evoEl.textContent = '✨ 已為該形態最終階段（或無進化）';
      }
    }
    if (descEl) descEl.textContent = p.desc;

    // 🔴 嚴格驗證是否已收服：初始5大夥伴、已在道館收服、或全解鎖模式
    const actuallyCaught = Boolean(
      state.unlockAllPokemon ||
      (state.gen1Caught && state.gen1Caught.includes(p.id)) ||
      [1, 4, 7, 25, 133].includes(p.id) ||
      (isCaught === true)
    );

    // 未收服時，在圖片與頂部標記鎖定狀態
    if (imgEl) {
      if (actuallyCaught) {
        imgEl.style.filter = 'drop-shadow(0 8px 14px rgba(0,0,0,0.15))';
        imgEl.style.opacity = '1';
      } else {
        imgEl.style.filter = 'grayscale(85%) opacity(0.75)';
        imgEl.style.opacity = '0.75';
      }
    }

    const isMaxTrained = isPokemonMaxTrained(p.id);

    if (titleEl) {
      let statusPills = actuallyCaught 
        ? ' <span style="font-size:13px;background:#10B981;color:#FFFFFF;padding:2px 8px;border-radius:10px;vertical-align:middle;font-weight:900;">✓ 已收服</span>'
        : ' <span style="font-size:13px;background:#94A3B8;color:#FFFFFF;padding:2px 8px;border-radius:10px;vertical-align:middle;font-weight:900;">🔒 尚未收服</span>';
      if (isMaxTrained) {
        statusPills += ' <span class="modal-max-trained-pill">👑 終極訓練完成 (滿級)</span>';
      }
      titleEl.innerHTML = formatZhuyinDisplay(p.name, p.zhuyin) + statusPills;
    }

    // 🔴 渲染主力夥伴培育與等級數值卡片（僅限已收服時顯示）
    const partnerCard = document.getElementById('gen1-modal-partner-card');
    const partnerLvlEl = document.getElementById('gen1-modal-partner-level-badge');
    const partnerExpText = document.getElementById('gen1-modal-partner-exp-text');
    const partnerExpFill = document.getElementById('gen1-modal-partner-exp-fill');
    const partnerCrown = document.getElementById('gen1-modal-partner-crown');

    const isCurrent = isCurrentPartnerPokemon(p.id);
    const allPartners = (typeof getAllPartnersData === 'function') ? getAllPartnersData() : {};
    let matchedPartnerData = null;
    if (isCurrent) {
      matchedPartnerData = (state.partner && typeof getPartnerData === 'function') ? getPartnerData(state.partner) : (state.partnerData || {});
    } else if (actuallyCaught && allPartners['gen1_' + p.id]) {
      matchedPartnerData = allPartners['gen1_' + p.id];
    } else if (actuallyCaught) {
      const STARTER_ID_MAP = { 1: 'bulbasaur', 2: 'bulbasaur', 3: 'bulbasaur', 4: 'charmander', 5: 'charmander', 6: 'charmander', 7: 'squirtle', 8: 'squirtle', 9: 'squirtle', 25: 'pikachu', 26: 'pikachu', 133: 'eevee' };
      if (STARTER_ID_MAP[p.id] && allPartners[STARTER_ID_MAP[p.id]]) {
        matchedPartnerData = allPartners[STARTER_ID_MAP[p.id]];
      }
    }

    if (partnerCard) {
      if (actuallyCaught && (isCurrent || matchedPartnerData)) {
        partnerCard.style.display = 'block';
        const pLevel = (matchedPartnerData && matchedPartnerData.level) || 1;
        const pExp = (matchedPartnerData && matchedPartnerData.exp) || 0;
        const pMaxExp = (matchedPartnerData && matchedPartnerData.maxExp) || (pLevel * 100);
        const expPct = Math.min(100, Math.round((pExp / Math.max(1, pMaxExp)) * 100));

        if (partnerLvlEl) {
          if (pLevel >= MAX_PARTNER_LEVEL || isMaxTrained) {
            partnerLvlEl.innerHTML = isCurrent
              ? `🏆 當前出戰主力・滿級 Lv.100 (終極訓練完成！)`
              : `👑 終極訓練完成・滿級 Lv.100 極限巔峰！`;
          } else {
            partnerLvlEl.innerHTML = isCurrent 
              ? `⭐ 當前出戰夥伴・等級 Lv.${pLevel}` 
              : `🎖️ 已收服夥伴檔案・等級 Lv.${pLevel}`;
          }
        }
        if (pLevel >= MAX_PARTNER_LEVEL || isMaxTrained) {
          if (partnerExpText) partnerExpText.textContent = `EXP MAX / 100% (終極巔峰境界)`;
          if (partnerExpFill) {
            partnerExpFill.style.width = '100%';
            partnerExpFill.style.background = 'linear-gradient(90deg, #F59E0B, #FBBF24, #EF4444)';
          }
          let certEl = document.getElementById('gen1-max-cert-box');
          if (!certEl) {
            certEl = document.createElement('div');
            certEl.id = 'gen1-max-cert-box';
            certEl.className = 'gen1-max-trained-cert-box';
            partnerCard.appendChild(certEl);
          }
          certEl.style.display = 'flex';
          certEl.innerHTML = `
            <div class="cert-crown-icon">👑</div>
            <div class="cert-body">
              <div class="cert-title">🌟 榮譽認證：此寶可夢已完成「終極訓練」！</div>
              <div class="cert-desc">已成功培育至最高等級 Lv.100，各項招式與戰力皆達極致巔峰，為道館最強終極主力！</div>
            </div>
          `;
        } else {
          const certEl = document.getElementById('gen1-max-cert-box');
          if (certEl) certEl.style.display = 'none';
        }
        if (partnerExpText) {
          partnerExpText.textContent = `EXP ${pExp} / ${pMaxExp} (${expPct}%)`;
        }
        if (partnerExpFill) {
          partnerExpFill.style.width = `${expPct}%`;
        }
        if (partnerCrown) {
          partnerCrown.style.display = (matchedPartnerData && matchedPartnerData.crown) ? 'inline' : 'none';
        }
      } else {
        partnerCard.style.display = 'none';
      }
    }

        // 🔴 點圖鑑播放動畫寵物專屬叫聲（皮卡皮卡、胖丁唱歌等）與標準語音（徹底杜絕回音與重疊）
    const playPokemonIntro = () => {
      stopPokemonIntroAudio();

      const introSrc = 'assets/audio/pokemon/poke_' + p.id + '.mp3';
      const introAudio = new Audio(introSrc);
      activeGen1PokemonAudio = introAudio;

      introAudio.onended = () => {
        if (activeGen1PokemonAudio === introAudio) {
          activeGen1PokemonAudio = null;
        }
      };

      introAudio.play().catch((err) => {
        // 點擊中斷造成的 AbortError 靜默忽略，絕不啟動背景雙重 TTS 造成回聲 (Echo)
        if (err && (err.name === 'AbortError' || err.code === 20)) {
          return;
        }
        console.warn('音檔播放受阻：', err);
      });
    };

    // 朗讀按鈕
    if (btnSpeak) {
      btnSpeak.onclick = () => {
        window.audioEngine.playPop();
        playPokemonIntro();
      };
    }

    // 前往 151 大圖鑑快捷按鈕
    const btnSwitchPokedex = document.getElementById('gen1-btn-switch-pokedex');
    if (btnSwitchPokedex) {
      btnSwitchPokedex.onclick = () => {
        window.audioEngine.playPop();
        stopPokemonIntroAudio();
        modal.style.display = 'none';
        if (typeof switchTab === 'function') {
          switchTab('tab-gallery');
        }
      };
    }

    // 🔴 設為主力夥伴按鈕：未收服怪獸絕對不可派牠出戰！
    // 前往培育商店按鈕
    const btnNurture = document.getElementById('gen1-btn-nurture');
    if (btnNurture) {
      if (actuallyCaught) {
        btnNurture.style.display = 'inline-flex';
        btnNurture.onclick = () => {
          window.audioEngine.playPop();
          stopPokemonIntroAudio();
          modal.style.display = 'none';
          if (typeof switchTab === 'function') {
            switchTab('tab-shop');
          }
        };
      } else {
        btnNurture.style.display = 'none';
      }
    }

    // 🔴 設為主力夥伴／更換出戰夥伴按鈕
    if (btnSetPartner) {
      if (!actuallyCaught) {
        btnSetPartner.innerHTML = '<span>🔒</span> 尚未收服！闖關挑戰獲勝後才能派牠出戰';
        btnSetPartner.classList.remove('active');
        btnSetPartner.style.background = '#94A3B8';
        btnSetPartner.style.color = '#FFFFFF';
        btnSetPartner.style.cursor = 'not-allowed';
        btnSetPartner.onclick = () => {
          window.audioEngine.playWrong();
          setMascotSpeech('🔒【' + p.name + '】尚未收服！請前往道館挑戰中答對題目捕捉牠，收服後才能派牠出戰喔！');
        };
      } else if (isCurrent) {
        const pData = (state.partner && typeof getPartnerData === 'function') ? getPartnerData(state.partner) : (state.partnerData || {});
        btnSetPartner.innerHTML = '<span>🔄</span> 更換出戰夥伴（目前主力：Lv.' + (pData.level || 1) + '）';
        btnSetPartner.classList.remove('active');
        btnSetPartner.style.background = '#6366F1';
        btnSetPartner.style.color = '#FFFFFF';
        btnSetPartner.style.cursor = 'pointer';
        btnSetPartner.onclick = () => {
          window.audioEngine.playPop();
          stopPokemonIntroAudio();
          modal.style.display = 'none';
          if (typeof openPartnerModal === 'function') {
            openPartnerModal();
          }
        };
      } else {
        btnSetPartner.innerHTML = '<span>⚡</span> 派牠出戰！設為主力與培育夥伴';
        btnSetPartner.classList.remove('active');
        btnSetPartner.style.background = '#EF4444';
        btnSetPartner.style.color = '#FFFFFF';
        btnSetPartner.style.cursor = 'pointer';
        btnSetPartner.onclick = () => {
          window.audioEngine.playPokeCaught();
          stopPokemonIntroAudio();
          state.partner = 'gen1_' + p.id;
          localStorage.setItem('zhuyin_main_partner', state.partner);
          localStorage.setItem('zhuyin_partner', state.partner);

          updateTrainerHeaderUI();
          renderNurtureShop();
          renderGen1Pokedex();
          updatePokedexProgressUI();
          modal.style.display = 'none';

          if (window.confetti) window.confetti.trigger(100);
          setMascotSpeech('⚡ 太棒了！【' + p.name + '】已成為你的出戰主力夥伴！一起前往道館冒險吧！');
        };
      }
    }

    modal.style.display = 'flex';

    // 🔴 點開圖鑑時自動念出名字、屬性、進化條件！
    playPokemonIntro();
  }

  init();

});
