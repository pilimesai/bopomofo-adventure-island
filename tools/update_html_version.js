const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/\?v=\d+/g, '?v=45');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html to v=45');
