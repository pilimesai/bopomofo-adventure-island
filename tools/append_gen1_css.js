const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

const gen1Css = `
/* ==========================================================================
   🔴 初代 151 寶可夢全國圖鑑專屬樣式 (Kanto Gen 1 Pokédex 52poke Styling)
   ========================================================================== */

/* 圖鑑模式切換分頁 (Gen 1 vs 37 Symbols) */
.pokedex-mode-toggle {
  display: flex;
  gap: 12px;
  margin: 16px 0 14px 0;
  max-width: 100%;
  overflow-x: auto;
}
.pokedex-mode-btn {
  flex: 1;
  min-width: 200px;
  padding: 12px 18px;
  background: #FFFFFF;
  border: 3px solid #CBD5E1;
  border-radius: 14px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 900;
  color: #475569;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 0 #CBD5E1;
}
.pokedex-mode-btn:hover {
  transform: translateY(-2px);
  border-color: #EF4444;
  color: #DC2626;
}
.pokedex-mode-btn.active {
  background: linear-gradient(135deg, #EF4444, #DC2626);
  border-color: #991B1B;
  color: #FFFFFF;
  box-shadow: 0 4px 0 #7F1D1D;
}

/* 解鎖全部按鈕 */
.unlock-all-pokemon-btn {
  margin-left: 10px;
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 6px 12px;
  color: white;
  font-family: inherit;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.15s;
}
.unlock-all-pokemon-btn:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: scale(1.04);
}

/* 搜尋與狀態篩選工具列 */
.gen1-search-filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}
.gen1-search-box {
  flex: 1;
  min-width: 260px;
  position: relative;
  display: flex;
  align-items: center;
}
.gen1-search-box .search-icon {
  position: absolute;
  left: 14px;
  font-size: 18px;
  pointer-events: none;
}
.gen1-search-box input {
  width: 100%;
  padding: 12px 38px 12px 42px;
  border: 3px solid #CBD5E1;
  border-radius: 14px;
  font-family: inherit;
  font-size: 15px;
  font-weight: 800;
  color: #1E293B;
  outline: none;
  background: #FFFFFF;
  transition: all 0.2s;
}
.gen1-search-box input:focus {
  border-color: #EF4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}
.clear-search-btn {
  position: absolute;
  right: 12px;
  background: #E2E8F0;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 12px;
  font-weight: 900;
  color: #475569;
  cursor: pointer;
}

.gen1-status-filters {
  display: flex;
  gap: 6px;
}
.status-chip {
  padding: 8px 14px;
  border: 2px solid #CBD5E1;
  background: #FFFFFF;
  border-radius: 10px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 800;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s;
}
.status-chip:hover {
  border-color: #94A3B8;
}
.status-chip.active {
  background: #1E293B;
  border-color: #0F172A;
  color: #FFFFFF;
}

/* 151 寶可夢卡片網格 */
.gen1-pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 14px;
  margin-top: 14px;
}
@media (max-width: 600px) {
  .gen1-pokemon-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}

.gen1-card {
  background: #FFFFFF;
  border: 3px solid #E2E8F0;
  border-radius: 18px;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 10px rgba(0,0,0,0.04);
}
.gen1-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 10px 22px rgba(0,0,0,0.1);
  border-color: var(--card-theme-color, #3B82F6);
}
.gen1-card.uncaught {
  opacity: 0.65;
  filter: grayscale(85%);
  background: #F8FAFC;
}
.gen1-card.uncaught:hover {
  filter: grayscale(40%);
  opacity: 0.9;
}

.gen1-card-top {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}
.gen1-card-dex {
  font-family: monospace;
  font-size: 13px;
  font-weight: 900;
  color: #64748B;
  background: #F1F5F9;
  padding: 2px 6px;
  border-radius: 6px;
}
.gen1-card-ball {
  font-size: 14px;
}

.gen1-card-img-wrap {
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px 0;
  transition: transform 0.2s;
}
.gen1-card:hover .gen1-card-img-wrap {
  transform: scale(1.08);
}
.gen1-card-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.12));
}

.gen1-card-name-ruby {
  font-size: 16px;
  font-weight: 900;
  color: #1E293B;
  text-align: center;
  margin: 4px 0 6px 0;
  min-height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gen1-card-types {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
}
.gen1-type-badge {
  font-size: 11px;
  font-weight: 900;
  color: #FFFFFF;
  padding: 3px 8px;
  border-radius: 8px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.25);
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

/* 🔴 151 寶可夢詳細檔案彈窗 (Modal) */
.gen1-modal-card {
  max-width: 620px;
  border: 4px solid #EF4444;
  border-radius: 24px;
  padding: 22px;
}
.gen1-modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  border-bottom: 2px dashed #E2E8F0;
  padding-bottom: 12px;
}
.gen1-modal-dex {
  font-family: monospace;
  font-size: 20px;
  font-weight: 900;
  color: #DC2626;
  background: #FEF2F2;
  padding: 4px 10px;
  border-radius: 10px;
  border: 2px solid #FCA5A5;
}
.gen1-modal-title {
  margin: 0;
  font-size: 26px;
  font-weight: 900;
  color: #1E293B;
}
.gen1-modal-subnames {
  font-size: 14px;
  color: #64748B;
  font-weight: 700;
}

.gen1-modal-body {
  display: flex;
  gap: 20px;
}
@media (max-width: 640px) {
  .gen1-modal-body {
    flex-direction: column;
    align-items: center;
  }
}
.gen1-modal-visual {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.gen1-modal-img-wrap {
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, #F1F5F9 0%, #E2E8F0 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
.gen1-modal-img-wrap img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 8px 14px rgba(0,0,0,0.15));
}
.gen1-modal-speak-btn {
  width: 100%;
  background: linear-gradient(135deg, #3B82F6, #2563EB);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 12px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 3px 0 #1D4ED8;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.gen1-modal-speak-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 0 #1D4ED8;
}

.gen1-modal-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.gen1-modal-ruby-row {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F8FAFC;
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
}
.gen1-modal-ruby-row .ruby-label {
  font-size: 13px;
  font-weight: 800;
  color: #475569;
}
.gen1-modal-ruby-row .ruby-val {
  font-size: 20px;
  font-weight: 900;
  color: #DC2626;
}
.gen1-modal-types {
  display: flex;
  gap: 6px;
}
.gen1-modal-field {
  font-size: 14px;
  color: #334155;
  font-weight: 700;
}
.gen1-modal-field .f-label {
  color: #64748B;
}
.gen1-modal-desc {
  font-size: 14px;
  line-height: 1.6;
  color: #475569;
  background: #FFFBEB;
  border-left: 4px solid #F59E0B;
  padding: 8px 12px;
  border-radius: 0 10px 10px 0;
}
.gen1-set-partner-btn {
  margin-top: 6px;
  width: 100%;
  background: linear-gradient(135deg, #EF4444, #DC2626);
  color: white;
  border: none;
  border-radius: 14px;
  padding: 12px 16px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 4px 0 #991B1B;
  transition: all 0.15s;
}
.gen1-set-partner-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #991B1B;
}
`;

if (!css.includes('Kanto Gen 1 Pokédex 52poke Styling')) {
  css += '\n' + gen1Css;
  fs.writeFileSync('css/style.css', css, 'utf8');
  console.log('Appended Gen 1 Pokédex CSS to css/style.css');
}
