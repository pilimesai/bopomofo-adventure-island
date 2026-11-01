const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. In tab-shop: add button next to partner name
const oldShopNameRow = `<div class="nurture-name-row">
                <h2 id="shop-partner-name">皮卡丘</h2>
                <span class="nurture-level-badge" id="shop-partner-level">Lv.1</span>
                <span class="nurture-crown-badge" id="shop-crown-badge" style="display:none;">👑 冠軍之冠</span>
              </div>`;

const newShopNameRow = `<div class="nurture-name-row">
                <h2 id="shop-partner-name">皮卡丘</h2>
                <span class="nurture-level-badge" id="shop-partner-level">Lv.1</span>
                <span class="nurture-crown-badge" id="shop-crown-badge" style="display:none;">👑 冠軍之冠</span>
                <button class="shop-switch-partner-btn" id="btn-shop-switch-partner" title="從已收服寶可夢或初代御三家中更換培育夥伴">
                  🔄 更換出戰／培育夥伴
                </button>
              </div>`;

// 2. In symbol-modal: add partner action box before modal-nav-actions
const oldModalNav = `<!-- 上一個 / 下一個切換 -->
      <div class="modal-nav-actions">`;

const newModalNav = `<!-- 🔴 設為出戰主力夥伴／培育快捷入口 -->
      <div class="modal-partner-box" id="modal-partner-box" style="margin:14px 0;padding:12px 16px;background:#FEF2F2;border-radius:14px;border:2px dashed #EF4444;display:flex;align-items:center;justify-content:space-between;gap:10px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:26px;" id="modal-partner-box-icon">🦓</span>
          <div>
            <div style="font-size:14px;font-weight:900;color:#991B1B;" id="modal-partner-box-title">取出這隻寶可夢出戰！</div>
            <div style="font-size:12px;color:#B91C1C;font-weight:700;" id="modal-partner-box-desc">換成主力寵物，前往道館戰鬥與商店培育升級</div>
          </div>
        </div>
        <button class="modal-partner-action-btn" id="modal-btn-set-partner" style="background:#EF4444;color:white;border:none;padding:8px 16px;border-radius:10px;font-weight:900;font-size:14px;cursor:pointer;box-shadow:0 3px 0 #B91C1C;white-space:nowrap;transition:all 0.15s;">
          ⚡ 派牠出戰！
        </button>
      </div>

      <!-- 上一個 / 下一個切換 -->
      <div class="modal-nav-actions">`;

// 3. In partner-modal: add tabs and caught count
const oldPartnerModalHeader = `<div class="partner-selector-grid" id="partner-picker-list">`;

const newPartnerModalHeader = `<div class="partner-modal-tabs" id="partner-modal-tabs">
        <button class="partner-tab-chip active" id="tab-chip-starters" type="button">⭐ 初代御三家夥伴</button>
        <button class="partner-tab-chip" id="tab-chip-caught" type="button">🔴 已收服注音寶可夢 (<span id="partner-modal-caught-count">0</span>)</button>
      </div>

      <div class="partner-selector-grid" id="partner-picker-list" style="max-height:360px;overflow-y:auto;padding:6px;">`;

const norm = s => s.replace(/\r\n/g, '\n');
let normHtml = norm(html);

if (normHtml.includes(norm(oldShopNameRow))) {
  normHtml = normHtml.replace(norm(oldShopNameRow), norm(newShopNameRow));
  console.log('Updated shop name row');
} else {
  console.log('Could not find oldShopNameRow');
}

if (normHtml.includes(norm(oldModalNav))) {
  normHtml = normHtml.replace(norm(oldModalNav), norm(newModalNav));
  console.log('Updated symbol modal with partner box');
} else {
  console.log('Could not find oldModalNav');
}

if (normHtml.includes(norm(oldPartnerModalHeader))) {
  normHtml = normHtml.replace(norm(oldPartnerModalHeader), norm(newPartnerModalHeader));
  console.log('Updated partner modal header with tabs');
} else {
  console.log('Could not find oldPartnerModalHeader');
}

// bump cache version to 42
normHtml = normHtml.replace(/\?v=41/g, '?v=42');

fs.writeFileSync('index.html', normHtml, 'utf8');
console.log('Done updating index.html');

