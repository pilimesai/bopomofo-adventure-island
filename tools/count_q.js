const fs = require('fs');
let code = fs.readFileSync('js/data.js', 'utf8');
code = code.replace('const ZHUYIN_DATA =', 'global.ZHUYIN_DATA =');
eval(code);
global.ZHUYIN_DATA.adventureStages.forEach(s => {
  console.log('Stage ' + s.id + ' (' + s.name + '): questions=' + (s.questions||[]).length + ', finalQuestions=' + (s.finalQuestions||[]).length);
});
