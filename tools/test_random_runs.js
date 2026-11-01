const { generateStageQuestions } = require('../js/question_generator.js');
const ZHUYIN_DATA = require('../js/data.js');

global.window = { ZHUYIN_DATA };

console.log("=== Testing Stage 1 (10 consecutive runs) ===");
const stage1 = ZHUYIN_DATA.adventureStages[0];
for (let run = 1; run <= 5; run++) {
  const qs = generateStageQuestions(stage1, 5, false);
  const words = qs.map(q => q.word || q.prompt.slice(0, 8)).join(', ');
  const schools = qs.map(q => q.school ? q.school.slice(0, 6) : 'none').join(', ');
  console.log(`Run ${run}: [${words}]`);
  console.log(`       Schools: [${schools}]`);
}

console.log("\n=== Testing Final Stage 1 (5 consecutive runs) ===");
const final1 = ZHUYIN_DATA.finalStages[0];
for (let run = 1; run <= 5; run++) {
  const qs = generateStageQuestions(final1, 5, true);
  const words = qs.map(q => q.word || q.prompt.slice(0, 8)).join(', ');
  console.log(`Final Run ${run}: [${words}]`);
}
