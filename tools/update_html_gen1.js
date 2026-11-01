const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add script tag for gen1_pokemon.js
if (!html.includes('js/gen1_pokemon.js')) {
  html = html.replace(
    '<script src="js/data.js?v=45"></script>',
    '<script src="js/data.js?v=46"></script>\n  <script src="js/gen1_pokemon.js?v=46"></script>'
  );
  html = html.replace(/\?v=45/g, '?v=46');
}

// 2. Update tab-gallery
const oldGalleryStart = `<section class="tab-pane" id="tab-gallery">`;
const oldGalleryEnd = `</section>`;
const galleryIdx = html.indexOf(oldGalleryStart);
const galleryEndIdx = html.indexOf(oldGalleryEnd, galleryIdx);

const newGalleryContent = `<section class="tab-pane" id="tab-gallery">
      <!-- 🔴 寶可夢大圖鑑收集條 (Pokédex Progress) -->
      <div class="pokedex-banner">
        <div class="pokedex-title">
          <h2>🔴 52poke 寶可夢大圖鑑 (關都地區 第一世代 No.001 - No.151)</h2>
          <p style="font-size:14px;opacity:0.9;font-weight:700;margin-top:4px;">
            參考神奇寶貝百科 (52poke.com) 官方全國圖鑑！收服第一代 151 隻經典寶可夢，點亮圖鑑並派牠出戰培育！
          </p>
        </div>
        <div class="pokedex-progress-box">
          <div class="pokedex-progress-stat">
            <span>收服進度：</span>
            <strong id="pokedex-progress-text" style="color:#FDE047;">5 / 151 隻</strong>
          </div>
          <div class="pokedex-bar-track">
            <div class="pokedex-bar-fill" id="pokedex-bar-fill" style="width:3%;"></div>
          </div>
          <button class="unlock-all-pokemon-btn" id="btn-toggle-unlock-pokemon" title="自由探索模式：一鍵解鎖全 151 隻寶可夢！">
            🔓 自由解鎖全 151 隻
          </button>
        </div>
      </div>

      <!-- 圖鑑模式切換分頁 (雙圖鑑自由切換) -->
      <div class="pokedex-mode-toggle">
        <button class="pokedex-mode-btn active" id="btn-mode-gen1" data-mode="gen1">
          <span>🔴</span> 第一世代 151 寶可夢大圖鑑
        </button>
        <button class="pokedex-mode-btn" id="btn-mode-symbols" data-mode="symbols">
          <span>🔤</span> 37 個國小注音符號圖鑑
        </button>
      </div>

      <!-- 視圖 1：初代 151 寶可夢圖鑑 -->
      <div id="view-gen1-pokedex" class="pokedex-view-section">
        <!-- 搜尋與快速篩選工具列 -->
        <div class="gen1-search-filter-bar">
          <div class="gen1-search-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="gen1-search-input" placeholder="搜尋寶可夢名稱、注音、編號（例：皮卡丘、ㄆㄧˊ、#025）..." autocomplete="off" />
            <button class="clear-search-btn" id="btn-clear-gen1-search" style="display:none;">✕</button>
          </div>
          <div class="gen1-status-filters">
            <button class="status-chip active" data-status-filter="all">全部 (151)</button>
            <button class="status-chip" data-status-filter="caught">已收服</button>
            <button class="status-chip" data-status-filter="uncaught">未收服</button>
          </div>
        </div>

        <!-- 屬性篩選列 -->
        <div class="gallery-filter-bar gen1-types-bar" id="gen1-type-filter-bar">
          <button class="filter-chip active" data-type-filter="all">🌟 全部屬性</button>
          <button class="filter-chip" data-type-filter="草">🌿 草系</button>
          <button class="filter-chip" data-type-filter="火">🔥 火系</button>
          <button class="filter-chip" data-type-filter="水">🌊 水系</button>
          <button class="filter-chip" data-type-filter="電">⚡ 電系</button>
          <button class="filter-chip" data-type-filter="蟲">🐛 蟲系</button>
          <button class="filter-chip" data-type-filter="一般">⚪ 一般系</button>
          <button class="filter-chip" data-type-filter="毒">☠️ 毒系</button>
          <button class="filter-chip" data-type-filter="地面">🏜️ 地面系</button>
          <button class="filter-chip" data-type-filter="飛行">🕊️ 飛行系</button>
          <button class="filter-chip" data-type-filter="超能力">🔮 超能力系</button>
          <button class="filter-chip" data-type-filter="格鬥">🥊 格鬥系</button>
          <button class="filter-chip" data-type-filter="岩石">🪨 岩石系</button>
          <button class="filter-chip" data-type-filter="幽靈">👻 幽靈系</button>
          <button class="filter-chip" data-type-filter="龍">🐉 龍系</button>
          <button class="filter-chip" data-type-filter="冰">❄️ 冰系</button>
        </div>

        <!-- 151 寶可夢卡片網格 -->
        <div class="gen1-pokemon-grid" id="gen1-pokemon-grid">
          <!-- 由 JS 動態生成 151 張寶可夢卡片 -->
        </div>
      </div>

      <!-- 視圖 2：37 個注音符號圖鑑 -->
      <div id="view-symbols-pokedex" class="pokedex-view-section" style="display:none;">
        <div class="gallery-filter-bar">
          <button class="filter-chip active" data-filter="all">🌟 全部注音 (37隻)</button>
          <button class="filter-chip" data-filter="initial">⚡ 聲母精靈 (21隻)</button>
          <button class="filter-chip" data-filter="medial">🤝 介音夥伴 (3隻)</button>
          <button class="filter-chip" data-filter="final">🧚 韻母小仙 (13隻)</button>
        </div>
        <div class="symbol-grid" id="symbol-card-grid"></div>
        <div class="combined-banner">
          <h3>🏰 結合韻神奇城堡 (22個結合韻)</h3>
          <p style="color:#15AABF;margin-bottom:14px;font-weight:700;">由介音（ㄧ、ㄨ、ㄩ）與韻母手牽手合體的好朋友！點擊聽發音：</p>
          <div class="combined-chips" id="combined-chips-container"></div>
        </div>
      </div>
    </section>`;

html = html.substring(0, galleryIdx) + newGalleryContent + html.substring(galleryEndIdx + oldGalleryEnd.length);

// 3. Add Partner modal tab for Gen 1
html = html.replace(
  `<button class="partner-tab-chip active" id="tab-chip-starters" type="button">⭐ 初代御三家夥伴</button>`,
  `<button class="partner-tab-chip active" id="tab-chip-gen1" type="button">🔴 第一代 151 寶可夢</button>\n        <button class="partner-tab-chip" id="tab-chip-starters" type="button">⭐ 初代御三家夥伴</button>`
);

// 4. Add Gen 1 Detail Modal before closing body
const gen1ModalHtml = `
  <!-- ========================================================
       🔴 151 寶可夢詳細檔案彈窗 (Gen 1 Pokemon Detail Modal)
       ======================================================== -->
  <div class="modal-backdrop" id="gen1-pokemon-modal" style="display:none;" aria-hidden="true">
    <div class="modal-card gen1-modal-card">
      <button class="modal-close-btn" id="gen1-modal-close" aria-label="關閉檔案">✕</button>
      <div class="gen1-modal-header">
        <span class="gen1-modal-dex" id="gen1-modal-dex">#001</span>
        <div class="gen1-modal-names">
          <h2 class="gen1-modal-title" id="gen1-modal-title">妙蛙種子</h2>
          <div class="gen1-modal-subnames" id="gen1-modal-subnames">Bulbasaur (フシギダネ)</div>
        </div>
      </div>
      <div class="gen1-modal-body">
        <div class="gen1-modal-visual">
          <div class="gen1-modal-img-wrap" id="gen1-modal-img-wrap">
            <img src="" alt="" id="gen1-modal-img" />
          </div>
          <button class="gen1-modal-speak-btn" id="gen1-modal-btn-speak" type="button">
            <span>🔊</span> 聽老師清晰朗讀名字與注音
          </button>
        </div>
        <div class="gen1-modal-info">
          <div class="gen1-modal-ruby-row">
            <span class="ruby-label">教育部標準直式注音：</span>
            <div class="ruby-val" id="gen1-modal-ruby"></div>
          </div>
          <div class="gen1-modal-types" id="gen1-modal-types"></div>
          <div class="gen1-modal-field">
            <span class="f-label">⚔️ 代表招式：</span>
            <strong class="f-val" id="gen1-modal-move">藤鞭</strong>
          </div>
          <div class="gen1-modal-field">
            <span class="f-label">🧬 進化條件：</span>
            <span class="f-val" id="gen1-modal-evolution">Lv.16 進化為妙蛙草</span>
          </div>
          <div class="gen1-modal-desc" id="gen1-modal-desc"></div>
          <div class="gen1-modal-action-row">
            <button class="gen1-set-partner-btn" id="gen1-btn-set-partner" type="button">
              ⚡ 派牠出戰！設為主力與培育夥伴
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

if (!html.includes('id="gen1-pokemon-modal"')) {
  html = html.replace('</body>', gen1ModalHtml + '\n</body>');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html with Gen 1 Pokédex UI!');
