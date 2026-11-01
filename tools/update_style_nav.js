const fs = require('fs');

// 1. Update css/style.css
let css = fs.readFileSync('css/style.css', 'utf8');

const oldTabBlock = `/* 主分頁切換選單 (Top Tabs) */
.tab-navigation {
  max-width: 1200px;
  margin: 16px auto 8px auto;
  padding: 0 16px;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
}
.tab-navigation::-webkit-scrollbar {
  display: none;
}

.tab-btn {
  flex: 1;
  min-width: 150px;
  background: white;
  border: none;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 16px;
  font-weight: 800;
  color: #495057;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 5px 0 #DEE2E6;
  transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}`;

const newTabBlock = `/* 主分頁切換選單 (Top Tabs) */
.tab-navigation {
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
}
.tab-navigation::-webkit-scrollbar {
  height: 4px;
}
.tab-navigation::-webkit-scrollbar-thumb {
  background: rgba(203, 213, 225, 0.7);
  border-radius: 4px;
}

.tab-btn {
  flex: 1 1 0;
  min-width: 105px;
  white-space: nowrap;
  background: white;
  border: none;
  padding: 11px 8px;
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 15px;
  font-weight: 800;
  color: #495057;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  box-shadow: 0 4px 0 #DEE2E6;
  transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  flex-shrink: 0;
}`;

const oldMediaTab = `  /* 分頁標籤欄滑動保護 */
  .tab-navigation {
    padding: 0 10px;
    gap: 8px;
  }

  .tab-btn {
    min-width: 130px;
    font-size: 14px;
    padding: 10px 14px;
  }`;

const newMediaTab = `  /* 分頁標籤欄滑動保護 */
  .tab-navigation {
    padding: 2px 10px;
    gap: 6px;
  }

  .tab-btn {
    min-width: 95px;
    font-size: 13px;
    padding: 8px 6px;
    gap: 4px;
    box-shadow: 0 3px 0 #DEE2E6;
  }
  .tab-btn .tab-icon {
    font-size: 17px;
  }`;

const norm = s => s.replace(/\r\n/g, '\n');
let normCss = norm(css);

if (normCss.includes(norm(oldTabBlock))) {
  normCss = normCss.replace(norm(oldTabBlock), norm(newTabBlock));
  console.log('Replaced main tab block');
} else {
  console.log('Could not find oldTabBlock');
}

if (normCss.includes(norm(oldMediaTab))) {
  normCss = normCss.replace(norm(oldMediaTab), norm(newMediaTab));
  console.log('Replaced media tab block');
} else {
  console.log('Could not find oldMediaTab');
}

fs.writeFileSync('css/style.css', normCss, 'utf8');

// 2. Update js/app.js to add scrollIntoView when tab clicked
let app = fs.readFileSync('js/app.js', 'utf8');
let normApp = norm(app);

const oldClickTarget = `        btn.classList.add('active');

        const targetPane = document.getElementById(tabTarget);`;

const newClickTarget = `        btn.classList.add('active');
        try {
          btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        } catch (e) {}

        const targetPane = document.getElementById(tabTarget);`;

if (normApp.includes(norm(oldClickTarget))) {
  normApp = normApp.replace(norm(oldClickTarget), norm(newClickTarget));
  console.log('Added scrollIntoView to tab click in js/app.js');
} else {
  console.log('Could not find oldClickTarget in js/app.js');
}

fs.writeFileSync('js/app.js', normApp, 'utf8');

