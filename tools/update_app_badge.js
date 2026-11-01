const fs = require('fs');

let code = fs.readFileSync('js/app.js', 'utf8');

const target = `    if (q.qType === 'reading' && q.passage) {

      if (promptTag) promptTag.textContent = '📖 段考兒歌閱讀測驗：';

      if (readingCard) readingCard.style.display = 'block';

      if (readingText) readingText.innerHTML = addZhuyinRuby(q.passage);

    } else {

      if (readingCard) readingCard.style.display = 'none';

      if (q.qType === 'choice') {

        if (promptTag) promptTag.textContent = '📝 段考觀念選擇題：';

      } else if (q.qType === 'fill_in') {

        if (promptTag) promptTag.textContent = '✏️ 語詞注音填空題：';

      } else {

        if (promptTag) promptTag.textContent = '🔴 道館考核題目：';

      }

    }`;

const replacement = `    const schoolLabel = q.school || (isFinal ? '教育部小一期末高階題' : '教育部小一段考真題');
    let typeIcon = '🔴';
    let typeName = '道館考核題';

    if (q.qType === 'reading' && q.passage) {
      typeIcon = '📖';
      typeName = '兒歌閱讀測驗';
      if (readingCard) readingCard.style.display = 'block';
      if (readingText) readingText.innerHTML = addZhuyinRuby(q.passage);
    } else {
      if (readingCard) readingCard.style.display = 'none';
      if (q.qType === 'choice') {
        typeIcon = '📝';
        typeName = '段考選擇題';
      } else if (q.qType === 'fill_in') {
        typeIcon = '✏️';
        typeName = '注音填空題';
      } else if (q.qType === 'listen_pick') {
        typeIcon = '🎧';
        typeName = '聽音選詞題';
      }
    }

    if (promptTag) {
      promptTag.innerHTML = \`
        <span class=\"exam-school-badge\" style=\"background:#EEF2FF;color:#4338CA;border:1.5px solid #C7D2FE;padding:3px 10px;border-radius:14px;font-size:13px;font-weight:900;display:inline-flex;align-items:center;gap:4px;box-shadow:0 1px 2px rgba(67,56,202,0.08);\">
          🏫 \${schoolLabel}
        </span>
        <span class=\"exam-type-badge\" style=\"background:#FEF2F2;color:#DC2626;border:1.5px solid #FECACA;padding:3px 10px;border-radius:14px;font-size:13px;font-weight:900;margin-left:6px;display:inline-flex;align-items:center;gap:4px;\">
          \${typeIcon} \${typeName}
        </span>
      \`;
    }`;

// Normalize CRLF to LF for matching
const normCode = code.replace(/\r\n/g, '\n');
const normTarget = target.replace(/\r\n/g, '\n');

if (!normCode.includes(normTarget)) {
  console.error("Target block not found in js/app.js!");
  process.exit(1);
}

const updatedCode = normCode.replace(normTarget, replacement);
fs.writeFileSync('js/app.js', updatedCode, 'utf8');
console.log("Successfully updated promptTag rendering in js/app.js!");
