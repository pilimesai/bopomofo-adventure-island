const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const map = [
  ['<span>道館闖關挑戰</span>', '<span>道館闖關</span>'],
  ['<span>寶可夢大圖鑑</span>', '<span>注音圖鑑</span>'],
  ['<span>神奇拼音火車</span>', '<span>拼音火車</span>'],
  ['<span>四聲溜滑梯</span>', '<span>四聲滑梯</span>'],
  ['<span>寶可夢遊樂園</span>', '<span>遊樂天地</span>'],
  ['<span>筆順修煉場</span>', '<span>筆順修煉</span>'],
  ['<span>道館徽章館</span>', '<span>道館徽章</span>'],
  ['<span>寶可夢培育商店</span>', '<span>培育商店</span>'],
  ['?v=40', '?v=41']
];

for (const [from, to] of map) {
  if (html.includes(from)) {
    html = html.replace(from, to);
    console.log('Replaced', from, '->', to);
  } else {
    console.log('Not found:', from);
  }
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done updating index.html');

