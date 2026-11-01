with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

old_block = """    // 依據選擇的段考難度與考古題大題庫池進行「動態隨機抽題」

    const isFinal = state.examDifficulty === 'final';

    const rawPool = (isFinal && stage.finalQuestions && stage.finalQuestions.length > 0)

      ? stage.finalQuestions

      : (stage.questions || []);



    // 隨機洗牌演算法（Fisher-Yates Shuffle），每次進入道館隨機抽取 5~6 題

    const shuffledPool = [...rawPool].sort(() => Math.random() - 0.5);

    // 每關抽取 5 題考核（每題20分，滿分100分）
    const targetCount = 5;

    const selectedQuestions = shuffledPool.slice(0, targetCount);



    state.adventure.activeQuestions = selectedQuestions;"""

new_block = """    // 依據選擇的段考難度與題目生成器進行「題目無限隨機變化，但關卡難度嚴格固定」
    const isFinal = state.examDifficulty === 'final';
    let selectedQuestions = [];
    if (typeof generateStageQuestions === 'function') {
      selectedQuestions = generateStageQuestions(stage, 5, isFinal);
    } else {
      const rawPool = (isFinal && stage.finalQuestions && stage.finalQuestions.length > 0)
        ? stage.finalQuestions
        : (stage.questions || []);
      const shuffledPool = [...rawPool].sort(() => Math.random() - 0.5);
      selectedQuestions = shuffledPool.slice(0, 5);
    }

    state.adventure.activeQuestions = selectedQuestions;"""

assert old_block in text, "old_block not found in js/app.js"
text = text.replace(old_block, new_block)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Successfully updated startStageBattle in js/app.js")
