const fs = require('fs');

let appJs = fs.readFileSync('js/app.js', 'utf8');

// 1. Update updatePokedexProgressUI
const oldProgressFn = `  function updatePokedexProgressUI() {
    const total = ZHUYIN_DATA.symbols.length;
    const caught = state.pokedexCaught.length;
    const pct = Math.min(100, Math.round((caught / total) * 100));

    if (dom.pokedexProgressText) {
      dom.pokedexProgressText.textContent = \`\${caught} / \${total} 隻 (\${pct}%)\`;
    }
    if (dom.pokedexBarFill) {
      dom.pokedexBarFill.style.width = \`\${pct}%\`;
    }
  }`;

const newProgressFn = `  function updatePokedexProgressUI() {
    let total = ZHUYIN_DATA.symbols.length;
    let caught = state.pokedexCaught.length;

    if (state.pokedexMode === 'gen1' && typeof GEN1_POKEMON_LIST !== 'undefined') {
      total = 151;
      caught = state.unlockAllPokemon ? 151 : (state.gen1Caught ? state.gen1Caught.length : 5);
    }

    const pct = Math.min(100, Math.round((caught / total) * 100));

    const progressEl = document.getElementById('pokedex-progress-text') || dom.pokedexProgressText;
    const barEl = document.getElementById('pokedex-bar-fill') || dom.pokedexBarFill;

    if (progressEl) {
      progressEl.textContent = \`\${caught} / \${total} 隻 (\${pct}%)\`;
    }
    if (barEl) {
      barEl.style.width = \`\${pct}%\`;
    }
  }`;

appJs = appJs.replace(
  /function updatePokedexProgressUI\(\)\s*\{[\s\S]*?dom\.pokedexBarFill\.style\.width\s*=\s*`\$\{pct\}%`;\s*\}/,
  newProgressFn
);

// 2. Add battle encounter catch for Gen 1 Pokemon in handleBattleAnswer
const battleGen1Catch = `
            // 同步收服一隻第一世代 151 寶可夢！
            if (typeof GEN1_POKEMON_LIST !== 'undefined' && state.gen1Caught && state.gen1Caught.length < 151) {
              const uncaught = GEN1_POKEMON_LIST.filter(p => !state.gen1Caught.includes(p.id));
              if (uncaught.length > 0) {
                const newCaught = uncaught[Math.floor(Math.random() * uncaught.length)];
                state.gen1Caught.push(newCaught.id);
                localStorage.setItem('zhuyin_caught_gen1', JSON.stringify(state.gen1Caught));
                updatePokedexProgressUI();
                renderGen1Pokedex();
              }
            }
`;

if (!appJs.includes('// 同步收服一隻第一世代 151 寶可夢！')) {
  appJs = appJs.replace(
    "renderGallery();\n            }",
    "renderGallery();\n            }" + battleGen1Catch
  );
}

fs.writeFileSync('js/app.js', appJs, 'utf8');
console.log('Updated updatePokedexProgressUI and battle catch in js/app.js');
