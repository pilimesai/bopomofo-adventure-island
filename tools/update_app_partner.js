const fs = require('fs');

let app = fs.readFileSync('js/app.js', 'utf8');

// 1. In state definition: add allPartnersData
const oldStatePartner = `    partnerData: JSON.parse(localStorage.getItem('zhuyin_partner_data') || 'null') || {
      level: 1,
      exp: 0,
      maxExp: 100,
      stage: 0
    },
    partner: localStorage.getItem('zhuyin_partner') || 'pikachu',`;

const newStatePartner = `    partnerData: JSON.parse(localStorage.getItem('zhuyin_partner_data') || 'null') || {
      level: 1,
      exp: 0,
      maxExp: 100,
      stage: 0
    },
    partner: localStorage.getItem('zhuyin_partner') || 'pikachu',
    allPartnersData: JSON.parse(localStorage.getItem('zhuyin_all_partners_data') || '{}'),`;

// 2. Replace getPokemonAvatarHtml and getCurrentPartnerInfo block
const oldPartnerBlock = `  function getPokemonAvatarHtml(partner, sizeClass = '') {
    if (partner.image) {
      return \`<img src="\${partner.image}" alt="\${partner.name}" class="pokemon-avatar-img \${sizeClass}" />\`;
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
  }`;

const newPartnerBlock = `  // ==========================================
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

    const base = ZHUYIN_DATA.starterPokemon.find(p => p.id === partnerId) || ZHUYIN_DATA.starterPokemon[0];
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
  }`;

// 3. Update addPartnerExp to sync allPartnersData
const oldAddPartnerExp = `    localStorage.setItem('zhuyin_partner_data', JSON.stringify(state.partnerData));`;
const newAddPartnerExp = `    localStorage.setItem('zhuyin_partner_data', JSON.stringify(state.partnerData));
    const allData = getAllPartnersData();
    allData[state.partner] = { ...state.partnerData };
    saveAllPartnersData(allData);`;

// 4. Update openPartnerModal and setupPartnerModal
const oldSetupPartner = `  function setupPartnerModal() {
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
          setMascotSpeech(\`⚡ 太棒了！【\${p.name}】成為你的出戰夥伴！必殺技是【\${p.move}】！\`);
          window.audioEngine.speak(\`太棒了！就決定是\${p.name}了！\`);
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
      card.className = \`partner-card \${state.partner === p.id ? 'selected' : ''}\`;
      card.innerHTML = \`
        <div class="p-icon">\${getPokemonAvatarHtml(evo)}</div>
        <div class="p-name">\${evo.name}</div>
        <div class="p-type">\${p.type}</div>
        <div style="font-size:11px;color:#D97706;font-weight:800;margin-top:4px;">絕招：\${evo.move}</div>
      \`;

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
  }`;

const newSetupPartner = `  let partnerModalCurrentTab = 'starters';

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
        const partnerObj = getCurrentPartnerInfo();
        if (partnerObj) {
          setMascotSpeech(\`⚡ 太棒了！【\${partnerObj.name}】成為你的出戰夥伴！必殺技是【\${partnerObj.move}】！\`);
          window.audioEngine.speak(\`太棒了！就決定是\${partnerObj.name}了！\`);
        }
      });
    }
  }

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

    if (state.partner && (state.partner.startsWith('sym_') || ZHUYIN_DATA.symbols.some(s => s.char === state.partner))) {
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

// 5. In openSymbolModal: add partner box interaction
const oldOpenSymbolEnd = `    // 播放語音
    window.audioEngine.speakSymbol(sym, 'full');

    dom.modal.classList.add('open');
    dom.modal.setAttribute('aria-hidden', 'false');
  }`;

const newOpenSymbolEnd = `    // 🔴 設為出戰主力夥伴／培育快捷入口
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
    window.audioEngine.speakSymbol(sym, 'full');

    dom.modal.classList.add('open');
    dom.modal.setAttribute('aria-hidden', 'false');
  }`;

// 6. In renderNurtureShop: wire switch button and evolution target
const oldShopEvo = `      if (partner.stageIdx === 0) {
        const evoName = (baseStarter.evolutions && baseStarter.evolutions[1]) ? baseStarter.evolutions[1].name : '下一階形態';
        const neededLv = Math.max(1, 3 - partner.level);
        evoTargetEl.innerHTML = \`🌟 達成 <strong>Lv.3</strong> 即將進化為：【\${evoName}】！（還差 \${neededLv} 級）\`;
      } else if (partner.stageIdx === 1) {
        const evoName = (baseStarter.evolutions && baseStarter.evolutions[2]) ? baseStarter.evolutions[2].name : '最終究極形態';
        const neededLv = Math.max(1, 7 - partner.level);
        evoTargetEl.innerHTML = \`🌟 達成 <strong>Lv.7</strong> 即將究極進化為：【\${evoName}】！（還差 \${neededLv} 級）\`;
      } else {
        evoTargetEl.innerHTML = \`👑 恭喜！【\${partner.name}】已達到全島最強的究極最終形態！\`;
      }`;

const newShopEvo = `      const nextEvo1 = (partner.stageNames && partner.stageNames[1]) ? partner.stageNames[1] : ((baseStarter.evolutions && baseStarter.evolutions[1]) ? baseStarter.evolutions[1].name : '下一階形態');
      const nextEvo2 = (partner.stageNames && partner.stageNames[2]) ? partner.stageNames[2] : ((baseStarter.evolutions && baseStarter.evolutions[2]) ? baseStarter.evolutions[2].name : '最終究極形態');

      if (partner.stageIdx === 0) {
        const neededLv = Math.max(1, 3 - partner.level);
        evoTargetEl.innerHTML = \`🌟 達成 <strong>Lv.3</strong> 即將進化為：【\${nextEvo1}】！（還差 \${neededLv} 級）\`;
      } else if (partner.stageIdx === 1) {
        const neededLv = Math.max(1, 7 - partner.level);
        evoTargetEl.innerHTML = \`🌟 達成 <strong>Lv.7</strong> 即將究極進化為：【\${nextEvo2}】！（還差 \${neededLv} 級）\`;
      } else {
        evoTargetEl.innerHTML = \`👑 恭喜！【\${partner.name}】已達到全島最強的究極最終形態！\`;
      }`;

const norm = s => s.replace(/\r\n/g, '\n');
let normApp = norm(app);

if (normApp.includes(norm(oldStatePartner))) {
  normApp = normApp.replace(norm(oldStatePartner), norm(newStatePartner));
  console.log('Updated state partner definition');
} else {
  console.log('Could not find oldStatePartner');
}

if (normApp.includes(norm(oldPartnerBlock))) {
  normApp = normApp.replace(norm(oldPartnerBlock), norm(newPartnerBlock));
  console.log('Updated partner avatar and info block');
} else {
  console.log('Could not find oldPartnerBlock');
}

if (normApp.includes(norm(oldAddPartnerExp))) {
  normApp = normApp.replace(norm(oldAddPartnerExp), norm(newAddPartnerExp));
  console.log('Updated addPartnerExp to sync allPartnersData');
} else {
  console.log('Could not find oldAddPartnerExp');
}

if (normApp.includes(norm(oldSetupPartner))) {
  normApp = normApp.replace(norm(oldSetupPartner), norm(newSetupPartner));
  console.log('Updated setupPartnerModal and openPartnerModal');
} else {
  console.log('Could not find oldSetupPartner');
}

if (normApp.includes(norm(oldOpenSymbolEnd))) {
  normApp = normApp.replace(norm(oldOpenSymbolEnd), norm(newOpenSymbolEnd));
  console.log('Updated openSymbolModal with partner box');
} else {
  console.log('Could not find oldOpenSymbolEnd');
}

if (normApp.includes(norm(oldShopEvo))) {
  normApp = normApp.replace(norm(oldShopEvo), norm(newShopEvo));
  console.log('Updated renderNurtureShop evolution targets');
} else {
  console.log('Could not find oldShopEvo');
}

// In renderNurtureShop: wire up btn-shop-switch-partner
const oldRenderShopEnd = `    POKEMON_NURTURE_ITEMS.forEach(item => {`;
const newRenderShopEnd = `    const btnShopSwitch = document.getElementById('btn-shop-switch-partner');
    if (btnShopSwitch && !btnShopSwitch.dataset.bound) {
      btnShopSwitch.dataset.bound = 'true';
      btnShopSwitch.addEventListener('click', () => {
        window.audioEngine.playPop();
        openPartnerModal();
      });
    }

    POKEMON_NURTURE_ITEMS.forEach(item => {`;

if (normApp.includes(norm(oldRenderShopEnd))) {
  normApp = normApp.replace(norm(oldRenderShopEnd), norm(newRenderShopEnd));
  console.log('Wired btn-shop-switch-partner');
} else {
  console.log('Could not find oldRenderShopEnd');
}

// In resetCharacterProgress: also reset allPartnersData
const oldResetBlock = `    state.partner = 'pikachu';
    state.partnerData = {
      level: 1,
      exp: 0,
      maxExp: 100,
      stage: 0
    };
    localStorage.setItem('zhuyin_partner', 'pikachu');
    localStorage.setItem('zhuyin_partner_data', JSON.stringify(state.partnerData));`;

const newResetBlock = `    state.partner = 'pikachu';
    state.partnerData = {
      level: 1,
      exp: 0,
      maxExp: 100,
      stage: 0
    };
    state.allPartnersData = {};
    localStorage.removeItem('zhuyin_all_partners_data');
    localStorage.setItem('zhuyin_partner', 'pikachu');
    localStorage.setItem('zhuyin_partner_data', JSON.stringify(state.partnerData));`;

if (normApp.includes(norm(oldResetBlock))) {
  normApp = normApp.replace(norm(oldResetBlock), norm(newResetBlock));
  console.log('Updated character reset to clean allPartnersData');
} else {
  console.log('Could not find oldResetBlock');
}

fs.writeFileSync('js/app.js', normApp, 'utf8');
console.log('Done updating js/app.js');

