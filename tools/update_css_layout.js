const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Update tab-navigation styling
const oldTabNav = `.tab-navigation {
  max-width: 1240px;
  margin: 14px auto 10px auto;
  padding: 4px 16px;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(203, 213, 225, 0.6) transparent;
}`;

const newTabNav = `.tab-navigation {
  max-width: 1240px;
  margin: 12px auto 10px auto;
  padding: 4px 14px 6px 14px;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(203, 213, 225, 0.6) transparent;
  scroll-padding-right: 24px;
}
.tab-navigation::after {
  content: '';
  display: block;
  flex: 0 0 24px;
  height: 1px;
}`;

if (css.includes(oldTabNav)) {
  css = css.replace(oldTabNav, newTabNav);
  console.log('Replaced oldTabNav');
} else {
  console.log('oldTabNav not found verbatim, appending after pseudo-element');
  css = css.replace(/\.tab-navigation\s*\{([^}]+)\}/, (match, p1) => {
    return `.tab-navigation {${p1}\n  scroll-padding-right: 24px;\n}\n.tab-navigation::after {\n  content: '';\n  display: block;\n  flex: 0 0 24px;\n  height: 1px;\n}`;
  });
}

// 2. Fix max-width: 768px tab-btn min-width override
css = css.replace(
  /\.tab-btn\s*\{\s*min-width:\s*120px;\s*font-size:\s*14px;\s*padding:\s*10px 12px;\s*\}/g,
  `.tab-btn {
    min-width: 84px !important;
    font-size: 13px !important;
    padding: 8px 8px !important;
    gap: 4px !important;
  }`
);

// 3. Fix poke-battle-actions layout to prevent button clipping
const oldActions = `/* 經典對戰指令列 (Pokémon Command Menu) */
.poke-battle-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
}`;

const newActions = `/* 經典對戰指令列 (Pokémon Command Menu) - 防切割破版彈性排版 */
.poke-battle-actions {
  display: flex !important;
  flex-direction: row !important;
  align-items: stretch !important;
  gap: 10px !important;
  margin-top: 14px !important;
  width: 100% !important;
}
.poke-cmd-btn.listen-btn {
  flex: 1 1 auto !important;
  min-width: 0 !important;
}
.poke-cmd-btn.run-btn {
  flex: 0 0 auto !important;
  min-width: auto !important;
  white-space: nowrap !important;
  padding: 10px 14px !important;
}
@media (max-width: 600px) {
  .poke-battle-actions {
    flex-direction: column !important;
    gap: 8px !important;
  }
  .poke-cmd-btn.listen-btn,
  .poke-cmd-btn.run-btn {
    width: 100% !important;
  }
}`;

if (css.includes(oldActions)) {
  css = css.replace(oldActions, newActions);
  console.log('Replaced oldActions');
}

// Remove any overriding grid-template-columns for poke-battle-actions in media queries
css = css.replace(
  /\.poke-battle-actions\s*\{\s*grid-template-columns:\s*repeat\(2,\s*1fr\)[^}]*\}/g,
  `/* poke-battle-actions responsive handled above */`
);

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('css/style.css updated successfully!');
