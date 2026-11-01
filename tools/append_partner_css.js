const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

const partnerCss = `
/* ==========================================================================
   寶可夢自選出戰與收服精靈培育系統 (Partner Switch & Nurture System)
   ========================================================================== */

/* 1. 注音收服寶可夢專屬頭像 (圓形彩環與注音符號標章) */
.symbol-pokemon-avatar {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 3.5px solid #3B82F6;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: white;
  user-select: none;
  transition: all 0.2s ease;
}
.symbol-pokemon-avatar.mini {
  width: 32px;
  height: 32px;
  border-width: 2px;
  box-shadow: none;
}
.symbol-pokemon-avatar .sym-p-icon {
  font-size: 36px;
  line-height: 1;
}
.symbol-pokemon-avatar.mini .sym-p-icon {
  font-size: 16px;
}
.symbol-pokemon-avatar .sym-p-char {
  position: absolute;
  bottom: -4px;
  right: -4px;
  background: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 12px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid currentColor;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}
.symbol-pokemon-avatar.mini .sym-p-char {
  display: none;
}

/* 對戰場地夥伴精靈放大展示 */
.poke-player-sprite .symbol-pokemon-avatar {
  width: 105px;
  height: 105px;
  border-width: 4.5px;
}
.poke-player-sprite .symbol-pokemon-avatar .sym-p-icon {
  font-size: 52px;
}
.poke-player-sprite .symbol-pokemon-avatar .sym-p-char {
  width: 28px;
  height: 28px;
  font-size: 15px;
  bottom: -5px;
  right: -5px;
}

/* 2. 培育商店「更換夥伴」按鈕 */
.shop-switch-partner-btn {
  background: #FFF1F2;
  color: #E11D48;
  border: 2px solid #FDA4AF;
  border-radius: 12px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 3px 0 #FDA4AF;
}
.shop-switch-partner-btn:hover {
  background: #FFE4E6;
  transform: translateY(-2px);
  box-shadow: 0 5px 0 #FDA4AF;
}

/* 3. 出戰夥伴選擇視窗標籤列 (Starter vs Caught Tabs) */
.partner-modal-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
  border-bottom: 2px solid #E2E8F0;
  padding-bottom: 10px;
}
.partner-tab-chip {
  background: #F1F5F9;
  border: 2px solid #CBD5E1;
  color: #475569;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.15s ease;
}
.partner-tab-chip:hover {
  background: #E2E8F0;
  color: #1E293B;
}
.partner-tab-chip.active {
  background: #EF4444;
  border-color: #DC2626;
  color: white;
  box-shadow: 0 3px 0 #B91C1C;
}

/* 4. 夥伴卡片細節強化 */
.partner-card {
  position: relative;
  overflow: hidden;
}
.partner-card .p-active-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  background: #10B981;
  color: white;
  font-size: 11px;
  font-weight: 900;
  padding: 2px 6px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}
.partner-card .p-level-tag {
  display: inline-block;
  background: #FEF3C7;
  color: #D97706;
  font-size: 11px;
  font-weight: 900;
  padding: 1px 6px;
  border-radius: 8px;
  margin-top: 3px;
}
.partner-card .p-crown-mark {
  position: absolute;
  top: 6px;
  left: 6px;
  font-size: 16px;
  filter: drop-shadow(0 2px 4px rgba(245, 158, 11, 0.4));
}

/* 5. 注音圖鑑彈出視窗派戰按鈕 */
.modal-partner-action-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.08);
}
.modal-partner-action-btn.active {
  background: #10B981 !important;
  box-shadow: 0 3px 0 #059669 !important;
}
`;

css += '\n' + partnerCss;
fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Appended partner CSS successfully');

