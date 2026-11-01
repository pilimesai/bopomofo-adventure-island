const fs = require('fs');

// 1. Update js/app.js
let appJs = fs.readFileSync('js/app.js', 'utf8');

// Update stageIdx level threshold from 7 / 3 to 36 / 16
appJs = appJs.replace(
  /const stageIdx = level >= 7 \? 2 : level >= 3 \? 1 : 0;/g,
  'const stageIdx = level >= 36 ? 2 : level >= 16 ? 1 : 0;'
);
appJs = appJs.replace(
  /const stageIdx = pData\.level >= 7 \? 2 : pData\.level >= 3 \? 1 : 0;/g,
  'const stageIdx = pData.level >= 36 ? 2 : pData.level >= 16 ? 1 : 0;'
);

// Update shop level requirement text
appJs = appJs.replace(
  "const neededLv = Math.max(1, 3 - partner.level);\n        evoTargetEl.innerHTML = `🌟 達成 <strong>Lv.3</strong> 即將進化為：【${nextEvo1}】！（還差 ${neededLv} 級）`;",
  "const neededLv = Math.max(1, 16 - partner.level);\n        evoTargetEl.innerHTML = `🌟 達成 <strong>Lv.16</strong> 即將進化為：【${nextEvo1}】！（還差 ${neededLv} 級）`;"
);
appJs = appJs.replace(
  "const neededLv = Math.max(1, 7 - partner.level);\n        evoTargetEl.innerHTML = `🌟 達成 <strong>Lv.7</strong> 即將究極進化為：【${nextEvo2}】！（還差 ${neededLv} 級）`;",
  "const neededLv = Math.max(1, 36 - partner.level);\n        evoTargetEl.innerHTML = `🌟 達成 <strong>Lv.36</strong> 即將究極進化為：【${nextEvo2}】！（還差 ${neededLv} 級）`;"
);

// Update status description checks
appJs = appJs.replace(
  "if (partner.level >= 7) {\n        statusDescEl.textContent = `⚡ 戰力巔峰！神獸級的氣勢，隨時可以在道館中施展最強奧義【${partner.move}】！`;\n      } else if (partner.level >= 3) {",
  "if (partner.level >= 36) {\n        statusDescEl.textContent = `⚡ 戰力巔峰！神獸級的氣勢，隨時可以在道館中施展最強奧義【${partner.move}】！`;\n      } else if (partner.level >= 16) {"
);

// Update EXP curve in addPartnerExp
appJs = appJs.replace(
  "state.partnerData.maxExp = Math.round(state.partnerData.maxExp * 1.25);",
  "state.partnerData.maxExp = 60 + state.partnerData.level * 25;"
);

// In handleBattleAnswer on correct answer: add +30 partner EXP
if (!appJs.includes('addPartnerExp(30);')) {
  appJs = appJs.replace(
    "const starBonus = isShiny ? 2 : 1;\n            addStars(starBonus, false);",
    "const starBonus = isShiny ? 2 : 1;\n            addStars(starBonus, false);\n            addPartnerExp(30);"
  );
}

// In tab click: center active tab smoothly
appJs = appJs.replace(
  "btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });",
  "btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });"
);

fs.writeFileSync('js/app.js', appJs, 'utf8');
console.log('js/app.js updated successfully!');
