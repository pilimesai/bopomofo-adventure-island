const fs = require('fs');

// 1. Update css/style.css
let css = fs.readFileSync('css/style.css', 'utf8');

// Ensure poke-player-sprite does not clip the crown
css = css.replace(
  /\.poke-player-sprite\s*\{([^}]+)\}/,
  (match, p1) => {
    return `.poke-player-sprite {${p1.replace('overflow: hidden;', 'overflow: visible !important;')}}`;
  }
);
css = css.replace(
  /\.nurture-avatar-stage\s*\{([^}]+)\}/,
  (match, p1) => {
    return `.nurture-avatar-stage {${p1}\n  overflow: visible !important;\n}`;
  }
);

const crownCss = `
/* ==========================================================================
   👑 戴上王者冠軍王冠 (Champion Crown Graphic & Sparkles)
   ========================================================================== */
.crowned-avatar-container {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: visible !important;
}

/* 皇冠圖標浮動定位在頭頂 */
.champion-crown-graphic {
  position: absolute !important;
  top: -16px !important;
  left: 50% !important;
  transform: translateX(-50%) rotate(-4deg) !important;
  width: 46px !important;
  height: 32px !important;
  z-index: 12 !important;
  pointer-events: none !important;
  filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35)) !important;
  animation: crownFloat 2s ease-in-out infinite alternate !important;
}

.svg-champion-crown {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
}

/* 在培育商店大頭貼中的大皇冠 */
.nurture-partner-avatar .champion-crown-graphic,
.poke-player-sprite .champion-crown-graphic {
  top: -22px !important;
  width: 56px !important;
  height: 40px !important;
}

/* 在夥伴切換清單中的小皇冠 */
.partner-select-card .champion-crown-graphic {
  top: -12px !important;
  width: 32px !important;
  height: 22px !important;
}

/* 皇冠閃耀金星 */
.crown-sparkle {
  position: absolute !important;
  pointer-events: none !important;
  z-index: 13 !important;
  user-select: none !important;
  filter: drop-shadow(0 0 4px #F59E0B) !important;
}
.crown-sparkle.sp-1 {
  top: -12px !important;
  right: -4px !important;
  font-size: 16px !important;
  animation: sparkleAnim 1.6s ease-in-out infinite alternate !important;
}
.crown-sparkle.sp-2 {
  top: 4px !important;
  left: -8px !important;
  font-size: 14px !important;
  animation: sparkleAnim 1.9s 0.6s ease-in-out infinite alternate !important;
}

/* 冠軍金色光環光芒 */
.crowned-halo-aura {
  position: absolute !important;
  inset: -6px !important;
  border-radius: 50% !important;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.42) 0%, rgba(245, 158, 11, 0) 70%) !important;
  pointer-events: none !important;
  z-index: 1 !important;
  animation: haloPulse 2.4s ease-in-out infinite !important;
}

.crowned-pokemon-img {
  filter: drop-shadow(0 6px 14px rgba(245, 158, 11, 0.55)) drop-shadow(0 2px 4px rgba(0,0,0,0.2)) !important;
  position: relative !important;
  z-index: 2 !important;
}

@keyframes crownFloat {
  0% { transform: translateX(-50%) rotate(-4deg) translateY(0); }
  100% { transform: translateX(-50%) rotate(2deg) translateY(-4px); }
}

@keyframes sparkleAnim {
  0% { transform: scale(0.7) rotate(0deg); opacity: 0.5; }
  100% { transform: scale(1.25) rotate(25deg); opacity: 1; }
}

@keyframes haloPulse {
  0%, 100% { transform: scale(0.96); opacity: 0.6; }
  50% { transform: scale(1.1); opacity: 1; }
}
`;

if (!css.includes('戴上王者冠軍王冠 (Champion Crown Graphic)')) {
  css += '\n' + crownCss;
  fs.writeFileSync('css/style.css', css, 'utf8');
  console.log('Updated css/style.css with crown styles');
}

// 2. Update js/app.js
let appJs = fs.readFileSync('js/app.js', 'utf8');

// Replace getPokemonAvatarHtml
const oldAvatarFn = `  function getPokemonAvatarHtml(partner, sizeClass = '') {
    if (partner.image) {
      return \`<img src="\${partner.image}" alt="\${partner.name}" class="pokemon-avatar-img \${sizeClass}" />\`;
    }
    const bg = partner.color || '#3B82F6';
    return \`<div class="symbol-pokemon-avatar \${sizeClass}" style="border-color:\${bg};background:radial-gradient(circle, \${bg}28 0%, \${bg}08 70%);">
      <span class="sym-p-icon">\${partner.icon || '⚡'}</span>
      \${partner.char ? \`<span class="sym-p-char" style="color:\${bg};border-color:\${bg};">\${partner.char}</span>\` : ''}
    </div>\`;
  }`;

const newAvatarFn = `  function getPokemonAvatarHtml(partner, sizeClass = '') {
    if (!partner) return '';
    const hasCrown = Boolean(partner.crown);

    let innerContent = '';
    if (partner.image) {
      innerContent = \`<img src="\${partner.image}" alt="\${partner.name || '寶可夢'}" class="pokemon-avatar-img \${hasCrown ? 'crowned-pokemon-img' : ''} \${sizeClass}" />\`;
    } else {
      const bg = partner.color || '#3B82F6';
      innerContent = \`<div class="symbol-pokemon-avatar \${sizeClass}" style="border-color:\${bg};background:radial-gradient(circle, \${bg}28 0%, \${bg}08 70%);">
        <span class="sym-p-icon">\${partner.icon || '⚡'}</span>
        \${partner.char ? \`<span class="sym-p-char" style="color:\${bg};border-color:\${bg};">\${partner.char}</span>\` : ''}
      </div>\`;
    }

    if (!hasCrown) {
      return innerContent;
    }

    // 👑 戴上王者冠軍金冠 (Champion Crown) 的造型特效！
    return \`
      <div class="crowned-avatar-container \${sizeClass}">
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
        \${innerContent}
      </div>
    \`;
  }`;

appJs = appJs.replace(oldAvatarFn, newAvatarFn);

// 3. Update shop crown button text and toggle support
appJs = appJs.replace(
  `      if (isCrown && hasCrown) {
        btnClass += ' owned-crown';
        btnText = '✨ 已配戴王者之冠';
        btnDisabled = true;
      }`,
  `      if (isCrown && hasCrown) {
        btnClass += ' owned-crown';
        btnText = '👑 已戴上王冠（點我取下）';
        btnDisabled = false;
      } else if (isCrown && !hasCrown && (state.partnerData && state.partnerData.ownedCrown)) {
        btnClass += ' can-buy';
        btnText = '👑 點我重新戴上王冠';
        btnDisabled = false;
      }`
);

// In buyAndUseShopItem, handle crown toggle
const oldCrownBuy = `    if (item.type === 'crown') {
      state.partnerData.crown = true;
      localStorage.setItem('zhuyin_partner_data', JSON.stringify(state.partnerData));
    const allData = getAllPartnersData();
    allData[state.partner] = { ...state.partnerData };
    saveAllPartnersData(allData);

      window.audioEngine.playBadgeGet();
      if (window.confetti) window.confetti.trigger(100);

      setMascotSpeech(\`👑 哇！【\${partner.name}】配戴了【王者冠軍王冠】！頭頂閃耀黃金光芒，每次答對題目金幣獎勵翻倍！\`);
      window.audioEngine.speak(\`太帥氣了！\${partner.name}戴上了王者冠軍王冠，答題獲得金幣翻倍！\`);
    }`;

const newCrownBuy = `    if (item.type === 'crown') {
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
        setMascotSpeech(\`👑 哇！【\${partner.name}】戴上了金光閃閃的【王者冠軍王冠】！頭頂閃耀金冠與星光，答題金幣翻倍！\`);
        window.audioEngine.speak(\`太帥氣了！\${partner.name}戴上了王者冠軍之冠！\`);
      } else {
        window.audioEngine.playPop();
        setMascotSpeech(\`👑 已將【\${partner.name}】的冠軍王冠收回！隨時可在商店點擊重新戴上。\`);
      }
      renderNurtureShop();
      updateTrainerHeaderUI();
      return;
    }`;

appJs = appJs.replace(oldCrownBuy, newCrownBuy);

// In openPartnerModal, pass crown state to evo so it displays crowned in selector list
appJs = appJs.replace(
  "const evo = (p.evolutions && p.evolutions[stageIdx]) ? p.evolutions[stageIdx] : p;",
  "const evo = { ...((p.evolutions && p.evolutions[stageIdx]) ? p.evolutions[stageIdx] : p), crown: Boolean(pData.crown) };"
);

fs.writeFileSync('js/app.js', appJs, 'utf8');
console.log('Updated js/app.js with crown avatar rendering and shop toggling!');
