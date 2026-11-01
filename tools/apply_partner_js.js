const fs = require('fs');

let content = fs.readFileSync('js/app.js', 'utf8');

// 1. Add allPartnersData to state
content = content.replace(
  "partner: localStorage.getItem('zhuyin_partner') || 'pikachu',",
  "partner: localStorage.getItem('zhuyin_partner') || 'pikachu',\n    allPartnersData: JSON.parse(localStorage.getItem('zhuyin_all_partners_data') || '{}'),"
);

// 2. Replace lines from getPokemonAvatarHtml to getCurrentPartnerInfo
const avatarTargetStart = '  function getPokemonAvatarHtml(partner, sizeClass = \'\') {';
const avatarTargetEnd = '    };\n\n  }\n\n\n\n  /**';

const newPartnerModule = `  // ==========================================
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
    if (partner.image) {
      return \`<img src="\${partner.image}" alt="\${partner.name}" class="pokemon-avatar-img \${sizeClass}" />\`;
    }
    const bg = partner.color || '#3B82F6';
    return \`<div class="symbol-pokemon-avatar \${sizeClass}" style="border-color:\${bg};background:radial-gradient(circle, \${bg}28 0%, \${bg}08 70%);">
      <span class="sym-p-icon">\${partner.icon || '⚡'}</span>
      \${partner.char ? \`<span class="sym-p-char" style="color:\${bg};border-color:\${bg};">\${partner.char}</span>\` : ''}
    </div>\`;
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
    const stageIdx = level >= 7 ? 2 : level >= 3 ? 1 : 0;

    if (sym) {
      const stageNames = [
        sym.pokeName,
        \`超能・\${sym.pokeName}\`,
        \`究極神獸・\${sym.pokeName}\`
      ];
      const stageIcons = [
        sym.icon,
        \`\${sym.icon}✨\`,
        \`👑\${sym.icon}\`
      ];
      const moveFx = getFxForType(sym.pokeType || '');
      const moves = [
        \`\${sym.word || sym.char}字突擊\`,
        \`\${sym.pokeType || '光波'}大爆發\`,
        \`究極\${sym.char}神奧義破\`
      ];

      return {
        id: \`sym_\${sym.char}\`,
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
  }\n\n  /**`;

const startIdx = content.indexOf(avatarTargetStart);
const endIdx = content.indexOf(avatarTargetEnd, startIdx);
if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + newPartnerModule + content.substring(endIdx + avatarTargetEnd.length);
  console.log('Replaced getCurrentPartnerInfo block');
} else {
  console.log('Could not find avatar block:', startIdx, endIdx);
}

// 3. Replace openPartnerModal block
const openPartnerStart = '  function openPartnerModal() {';
const openPartnerEnd = "    dom.partnerModal.setAttribute('aria-hidden', 'false');\n\n  }";

const newOpenPartner = `  let partnerModalCurrentTab = 'starters';

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

    if (partnerModalCurrentTab === 'starters') {
      ZHUYIN_DATA.starterPokemon.forEach(p => {
        const pData = getPartnerData(p.id);
        const stageIdx = pData.level >= 7 ? 2 : pData.level >= 3 ? 1 : 0;
        const evo = (p.evolutions && p.evolutions[stageIdx]) ? p.evolutions[stageIdx] : p;
        const isCurrent = (state.partner === p.id);

        const card = document.createElement('div');
        card.className = \`partner-card \${isCurrent ? 'selected' : ''}\`;
        card.innerHTML = \`
          \${isCurrent ? '<span class="p-active-badge">出戰中</span>' : ''}
          \${pData.crown ? '<span class="p-crown-mark">👑</span>' : ''}
          <div class="p-icon">\${getPokemonAvatarHtml(evo)}</div>
          <div class="p-name">\${evo.name}</div>
          <div class="p-type">\${p.type}</div>
          <span class="p-level-tag">Lv.\${pData.level || 1}</span>
          <div style="font-size:11px;color:#D97706;font-weight:800;margin-top:4px;">絕招：\${evo.move}</div>
        \`;

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
        dom.partnerPickerList.innerHTML = \`
          <div style="grid-column: 1 / -1; text-align:center; padding: 30px 10px; color:#64748B;">
            <div style="font-size:40px;margin-bottom:8px;">🔒</div>
            <strong style="font-size:16px;color:#334155;">尚未收服任何野生注音寶可夢</strong>
            <p style="font-size:13px;margin-top:4px;">前往道館完成段考題目並答對，就能用寶貝球收服牠們出戰培育喔！</p>
          </div>
        \`;
        return;
      }

      caughtList.forEach(char => {
        const sym = ZHUYIN_DATA.symbols.find(s => s.char === char);
        if (!sym) return;

        const partnerId = \`sym_\${sym.char}\`;
        const pData = getPartnerData(partnerId);
        const stageIdx = pData.level >= 7 ? 2 : pData.level >= 3 ? 1 : 0;
        const stageNames = [sym.pokeName, \`超能・\${sym.pokeName}\`, \`究極神獸・\${sym.pokeName}\`];
        const isCurrent = (state.partner === partnerId || state.partner === sym.char);

        const card = document.createElement('div');
        card.className = \`partner-card \${isCurrent ? 'selected' : ''}\`;
        card.innerHTML = \`
          \${isCurrent ? '<span class="p-active-badge">出戰中</span>' : ''}
          \${pData.crown ? '<span class="p-crown-mark">👑</span>' : ''}
          <div class="p-icon">
            <div class="symbol-pokemon-avatar" style="border-color:\${sym.color};background:radial-gradient(circle, \${sym.color}28 0%, \${sym.color}08 70%);">
              <span class="sym-p-icon">\${sym.icon}</span>
              <span class="sym-p-char" style="color:\${sym.color};border-color:\${sym.color};">\${sym.char}</span>
            </div>
          </div>
          <div class="p-name">\${stageNames[stageIdx]}</div>
          <div class="p-type">\${sym.pokeTypeIcon || '⚡'} \${sym.pokeType || '一般系'}</div>
          <span class="p-level-tag">Lv.\${pData.level || 1}</span>
          <div style="font-size:11px;color:#D97706;font-weight:800;margin-top:4px;">絕招：\${sym.word || sym.char}突擊</div>
        \`;

        card.addEventListener('click', () => {
          window.audioEngine.playPop();
          switchActivePartner(partnerId);
          renderPartnerPickerCards();
        });

        dom.partnerPickerList.appendChild(card);
      });
    }
  }`;

const pStart = content.indexOf(openPartnerStart);
const pEnd = content.indexOf(openPartnerEnd, pStart);
if (pStart !== -1 && pEnd !== -1) {
  content = content.substring(0, pStart) + newOpenPartner + content.substring(pEnd + openPartnerEnd.length);
  console.log('Replaced openPartnerModal block');
} else {
  console.log('Could not find openPartnerModal block:', pStart, pEnd);
}

// 4. Update btnConfirmPartner inside setupPartnerModal
content = content.replace(
  'const p = ZHUYIN_DATA.starterPokemon.find(item => item.id === state.partner);',
  'const partnerObj = getCurrentPartnerInfo(); const p = partnerObj;'
);

// 5. In openSymbolModal: add partner box interaction
const symbolSpeak = '    // 播放語音\n\n    window.audioEngine.speakSymbol(sym, \'full\');';
const newSymbolPartner = `    // 🔴 設為出戰主力夥伴／培育快捷入口
    const partnerBox = document.getElementById('modal-partner-box');
    const partnerBtn = document.getElementById('modal-btn-set-partner');
    const partnerBoxIcon = document.getElementById('modal-partner-box-icon');
    const partnerBoxTitle = document.getElementById('modal-partner-box-title');
    const partnerBoxDesc = document.getElementById('modal-partner-box-desc');

    const isCaught = (state.pokedexCaught || []).includes(sym.char);
    const partnerId = \`sym_\${sym.char}\`;
    const isCurrent = (state.partner === partnerId || state.partner === sym.char);
    const pData = getPartnerData(partnerId);

    if (partnerBox) {
      if (isCaught) {
        partnerBox.style.display = 'flex';
        if (partnerBoxIcon) partnerBoxIcon.textContent = sym.icon;
        if (partnerBoxTitle) partnerBoxTitle.textContent = \`【\${sym.pokeName}】（Lv.\${pData.level || 1}）\`;

        if (isCurrent) {
          if (partnerBoxDesc) partnerBoxDesc.textContent = \`目前出戰的主力夥伴！隨時前往培育商店餵食甜點升級\`;
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
          if (partnerBoxDesc) partnerBoxDesc.textContent = \`換成主力寵物，前往道館戰鬥與商店培育升級\`;
          if (partnerBtn) {
            partnerBtn.textContent = '⚡ 派牠出戰！';
            partnerBtn.classList.remove('active');
            partnerBtn.onclick = () => {
              window.audioEngine.playFanfare();
              if (window.confetti) window.confetti.trigger(60);
              switchActivePartner(partnerId);
              setMascotSpeech(\`⚡ 太棒了！已將【\${sym.pokeName}】取出設為出戰主力夥伴！快去培育商店升級培育牠吧！\`);
              openSymbolModal(index);
            };
          }
        }
      } else {
        partnerBox.style.display = 'none';
      }
    }

    // 播放語音

    window.audioEngine.speakSymbol(sym, 'full');`;

if (content.includes(symbolSpeak)) {
  content = content.replace(symbolSpeak, newSymbolPartner);
  console.log('Updated openSymbolModal with partner box');
} else {
  console.log('Could not find symbolSpeak');
}

fs.writeFileSync('js/app.js', content, 'utf8');
console.log('Successfully written js/app.js');

