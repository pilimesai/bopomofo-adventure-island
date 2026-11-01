const fs = require('fs');

let appJs = fs.readFileSync('js/app.js', 'utf8');

// 1. Add state initialization for Gen 1 caught
const gen1StateInit = `
    // 初代 151 寶可夢圖鑑收服進度
    gen1Caught: JSON.parse(localStorage.getItem('zhuyin_caught_gen1') || '[1, 4, 7, 25, 133]'),
    unlockAllPokemon: localStorage.getItem('zhuyin_unlock_all_pokemon') === 'true',
    pokedexMode: 'gen1', // 'gen1' or 'symbols'
    gen1SearchQuery: '',
    gen1StatusFilter: 'all',
    gen1TypeFilter: 'all',
`;

if (!appJs.includes('gen1Caught:')) {
  appJs = appJs.replace(
    "pokedexCaught: JSON.parse(localStorage.getItem('zhuyin_caught_symbols') || '[]'),",
    "pokedexCaught: JSON.parse(localStorage.getItem('zhuyin_caught_symbols') || '[]')," + gen1StateInit
  );
}

// 2. Enhance getCurrentPartnerInfo to support any Gen 1 Pokemon
const gen1PartnerLookup = `
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
        if (g1Base.evolution && level >= g1Base.evolution.reqLevel) {
          const nextP = GEN1_POKEMON_LIST.find(p => p.id === g1Base.evolution.evolvesToId);
          if (nextP) {
            currentEvo = nextP;
            // 檢查二階進化 (如妙蛙花、噴火龍、水箭龜等)
            if (nextP.evolution && level >= nextP.evolution.reqLevel) {
              const finalP = GEN1_POKEMON_LIST.find(p => p.id === nextP.evolution.evolvesToId);
              if (finalP) currentEvo = finalP;
            }
          }
        }

        return {
          id: 'gen1_' + g1Base.id,
          char: null,
          isSymbol: false,
          isGen1: true,
          dexNo: currentEvo.dexNo,
          baseName: g1Base.name,
          name: currentEvo.name,
          stageNames: [g1Base.name, (g1Base.evolution ? g1Base.evolution.evolvesToName : g1Base.name)],
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
`;

if (!appJs.includes('// 檢查是否為第一世代 151 寶可夢')) {
  appJs = appJs.replace(
    "const base = (ZHUYIN_DATA.starterPokemon && ZHUYIN_DATA.starterPokemon.find(p => p.id === partnerId))",
    gen1PartnerLookup + "\n    const base = (ZHUYIN_DATA.starterPokemon && ZHUYIN_DATA.starterPokemon.find(p => p.id === partnerId))"
  );
}

// 3. Add Gen 1 Pokédex rendering & event handlers
const gen1AppLogic = `
  // =========================================================================
  // 🔴 52poke 初代 151 寶可夢大圖鑑系統 (Kanto Gen 1 Pokédex Module)
  // =========================================================================

  function initGen1Pokedex() {
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
        state.unlockAllPokemon = !state.unlockAllPokemon;
        localStorage.setItem('zhuyin_unlock_all_pokemon', state.unlockAllPokemon.toString());
        updateUnlockBtn();
        updatePokedexProgressUI();
        renderGen1Pokedex();
        if (state.unlockAllPokemon) {
          if (window.confetti) window.confetti.trigger(80);
          setMascotSpeech('🌟 已開啟【全 151 隻寶可夢自由探索模式】！可以隨意查看並派出任何神獸出戰！');
        } else {
          setMascotSpeech('🔒 已切換回一般道館闖關收服模式！');
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
        modalOverlay.style.display = 'none';
      });
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          modalOverlay.style.display = 'none';
        }
      });
    }
  }

  function renderGen1Pokedex() {
    const grid = document.getElementById('gen1-pokemon-grid');
    if (!grid || typeof GEN1_POKEMON_LIST === 'undefined') return;
    grid.innerHTML = '';

    const query = state.gen1SearchQuery || '';
    const statusFilter = state.gen1StatusFilter || 'all';
    const typeFilter = state.gen1TypeFilter || 'all';

    const filtered = GEN1_POKEMON_LIST.filter(p => {
      const isCaught = state.unlockAllPokemon || state.gen1Caught.includes(p.id);

      // 狀態篩選
      if (statusFilter === 'caught' && !isCaught) return false;
      if (statusFilter === 'uncaught' && isCaught) return false;

      // 屬性篩選
      if (typeFilter !== 'all' && !p.types.includes(typeFilter)) return false;

      // 搜尋關鍵字
      if (query) {
        const matchesName = p.name.includes(query);
        const matchesZhuyin = (p.zhuyin || '').replace(/\\s+/g, '').includes(query.replace(/\\s+/g, ''));
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
      const isCaught = state.unlockAllPokemon || state.gen1Caught.includes(p.id);
      const card = document.createElement('div');
      card.className = 'gen1-card ' + (isCaught ? 'caught' : 'uncaught');
      card.style.setProperty('--card-theme-color', p.color || '#3B82F6');

      const typesHtml = p.types.map(t => {
        return '<span class="gen1-type-badge" style="background:' + (p.color || '#3B82F6') + ';">' + (p.icon || '⚡') + ' ' + t + '</span>';
      }).join('');

      card.innerHTML = \`
        <div class="gen1-card-top">
          <span class="gen1-card-dex">\${p.dexNo}</span>
          <span class="gen1-card-ball">\${isCaught ? '🔴' : '⚪'}</span>
        </div>
        <div class="gen1-card-img-wrap">
          <img src="assets/pokemon/gen1/\${p.id}.png" alt="\${p.name}" class="gen1-card-img" loading="lazy" onerror="this.onerror=null;this.src='\${p.image}';" />
        </div>
        <div class="gen1-card-name-ruby">
          \${formatZhuyinDisplay(p.name)}
        </div>
        <div class="gen1-card-types">
          \${typesHtml}
        </div>
      \`;

      card.addEventListener('click', () => {
        window.audioEngine.playPop();
        openGen1DetailModal(p, isCaught);
      });

      grid.appendChild(card);
    });
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
    if (titleEl) titleEl.textContent = p.name;
    if (subnamesEl) subnamesEl.textContent = p.enName + ' (' + p.jpName + ')';
    if (imgEl) {
      imgEl.src = 'assets/pokemon/gen1/' + p.id + '.png';
      imgEl.onerror = () => { imgEl.src = p.image; };
    }
    if (rubyEl) rubyEl.innerHTML = formatZhuyinDisplay(p.name);
    if (typesEl) {
      typesEl.innerHTML = p.types.map(t => '<span class="gen1-type-badge" style="background:' + (p.color || '#3B82F6') + ';font-size:13px;padding:4px 10px;">' + (p.icon || '⚡') + ' ' + t + '屬性</span>').join('');
    }
    if (moveEl) moveEl.textContent = p.move || '十萬伏特';
    if (evoEl) {
      if (p.evolution) {
        evoEl.textContent = '達成 Lv.' + p.evolution.reqLevel + ' 進化為：【' + p.evolution.evolvesToName + '】';
      } else {
        evoEl.textContent = '✨ 已為該形態最終階段（或無進化）';
      }
    }
    if (descEl) descEl.textContent = p.desc;

    // 朗讀按鈕
    if (btnSpeak) {
      btnSpeak.onclick = () => {
        window.audioEngine.playPop();
        // 優先播放預錄音檔
        const audioSrc = 'assets/audio/pokemon/poke_' + p.id + '.mp3';
        const a = new Audio(audioSrc);
        a.play().catch(() => {
          const speech = '編號' + p.id + '，' + p.name + '，' + p.types.join('與') + '屬性。';
          window.audioEngine.speak(speech);
        });
      };
    }

    // 設為主力夥伴按鈕
    if (btnSetPartner) {
      btnSetPartner.onclick = () => {
        window.audioEngine.playPokeCaught();
        state.partner = 'gen1_' + p.id;
        localStorage.setItem('zhuyin_main_partner', state.partner);
        
        // 確保在已收服清單中
        if (!state.gen1Caught.includes(p.id)) {
          state.gen1Caught.push(p.id);
          localStorage.setItem('zhuyin_caught_gen1', JSON.stringify(state.gen1Caught));
        }

        updateTrainerHeaderUI();
        renderNurtureShop();
        modal.style.display = 'none';

        if (window.confetti) window.confetti.trigger(100);
        setMascotSpeech('⚡ 太棒了！【' + p.name + '】已成為你的出戰主力夥伴！一起前往道館冒險吧！');
      };
    }

    modal.style.display = 'flex';
  }
`;

if (!appJs.includes('initGen1Pokedex')) {
  appJs += '\n' + gen1AppLogic;
}

// 4. Update updatePokedexProgressUI for Gen 1
appJs = appJs.replace(
  "const total = ZHUYIN_DATA.symbols.length;\n    const caught = state.pokedexCaught.length;\n    if (text) text.textContent = `${caught} / ${total} 隻`;\n    if (fill) fill.style.width = `${(caught / total) * 100}%`;",
  `if (state.pokedexMode === 'gen1' && typeof GEN1_POKEMON_LIST !== 'undefined') {
      const total = 151;
      const caught = state.unlockAllPokemon ? 151 : (state.gen1Caught ? state.gen1Caught.length : 5);
      if (text) text.textContent = caught + ' / 151 隻';
      if (fill) fill.style.width = ((caught / total) * 100) + '%';
    } else {
      const total = ZHUYIN_DATA.symbols.length;
      const caught = state.pokedexCaught.length;
      if (text) text.textContent = caught + ' / ' + total + ' 隻';
      if (fill) fill.style.width = ((caught / total) * 100) + '%';
    }`
);

// 5. In DOMContentLoaded, call initGen1Pokedex() and renderGen1Pokedex()
if (!appJs.includes('initGen1Pokedex();')) {
  appJs = appJs.replace(
    "renderGallery();",
    "initGen1Pokedex();\n    renderGen1Pokedex();\n    renderGallery();"
  );
}

// 6. In openPartnerModal, support tab-chip-gen1
const partnerModalGen1Tab = `
    const tabChipGen1 = document.getElementById('tab-chip-gen1');
    if (tabChipGen1) {
      tabChipGen1.addEventListener('click', () => {
        window.audioEngine.playPop();
        partnerModalCurrentTab = 'gen1';
        tabChipGen1.classList.add('active');
        if (tabChipStarters) tabChipStarters.classList.remove('active');
        if (tabChipCaught) tabChipCaught.classList.remove('active');
        renderPartnerSelectorList();
      });
    }
`;

if (!appJs.includes('tabChipGen1')) {
  appJs = appJs.replace(
    "const tabChipStarters = document.getElementById('tab-chip-starters');",
    partnerModalGen1Tab + "\n    const tabChipStarters = document.getElementById('tab-chip-starters');"
  );
}

// In renderPartnerSelectorList, handle 'gen1' tab:
const renderGen1PartnerList = `
    if (partnerModalCurrentTab === 'gen1' && typeof GEN1_POKEMON_LIST !== 'undefined') {
      GEN1_POKEMON_LIST.forEach(p => {
        const isCaught = state.unlockAllPokemon || state.gen1Caught.includes(p.id);
        const partnerId = 'gen1_' + p.id;
        const pData = getPartnerData(partnerId);
        const isCurrent = (state.partner === partnerId || (p.id === 25 && state.partner === 'pikachu') || (p.id === 4 && state.partner === 'charmander') || (p.id === 7 && state.partner === 'squirtle') || (p.id === 1 && state.partner === 'bulbasaur') || (p.id === 133 && state.partner === 'eevee'));

        const card = document.createElement('div');
        card.className = 'partner-select-card ' + (isCurrent ? 'current-active' : '') + (isCaught ? '' : ' locked-pokemon');
        card.innerHTML = \`
          <div class="p-card-header">
            <span class="p-type-tag">\${p.dexNo} \${p.types.join('/')}</span>
            \${isCurrent ? '<span class="p-active-badge">⚡ 出戰中</span>' : (isCaught ? '<span style="font-size:12px;color:#10B981;font-weight:900;">✓ 已收服</span>' : '<span style="font-size:12px;color:#94A3B8;font-weight:900;">🔒 未收服</span>')}
          </div>
          <div class="p-sprite-wrap">
            <img src="assets/pokemon/gen1/\${p.id}.png" alt="\${p.name}" class="pokemon-avatar-img" onerror="this.onerror=null;this.src='\${p.image}';" />
          </div>
          <div class="p-name">\${p.name}</div>
          <div class="p-level">Lv.\${pData.level || 1} · 招式：\${p.move}</div>
        \`;

        card.addEventListener('click', () => {
          if (!isCaught && !state.unlockAllPokemon) {
            window.audioEngine.speak('這是未收服的第一代寶可夢，快前往道館挑戰收服牠吧！');
            return;
          }
          window.audioEngine.playPokeCaught();
          state.partner = partnerId;
          localStorage.setItem('zhuyin_main_partner', state.partner);
          updateTrainerHeaderUI();
          renderNurtureShop();
          renderPartnerSelectorList();
          if (window.confetti) window.confetti.trigger(70);
          setMascotSpeech('⚡ 已切換出戰夥伴為【' + p.name + '】！');
        });

        listEl.appendChild(card);
      });
      return;
    }
`;

if (!appJs.includes("partnerModalCurrentTab === 'gen1'")) {
  appJs = appJs.replace(
    "if (partnerModalCurrentTab === 'starters') {",
    renderGen1PartnerList + "\n    if (partnerModalCurrentTab === 'starters') {"
  );
}

fs.writeFileSync('js/app.js', appJs, 'utf8');
console.log('Updated js/app.js with Gen 1 Pokédex and partner switching!');
