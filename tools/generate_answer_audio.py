import asyncio
import hashlib
import json
import os
import subprocess
import edge_tts

node_code = """
global.window = {};
require('./js/data.js');

function extractTarget(q) {
  if (q.word) {
    const clean = q.word.replace(/[^\\u4e00-\\u9fa5]/g, '').trim();
    if (clean) return clean;
  }
  const match = (q.prompt || '').match(/「([^」]+)」/);
  if (match) {
    const clean = match[1].replace(/[^\\u4e00-\\u9fa5]/g, '').trim();
    if (clean) return clean;
  }
  return '';
}

function getAnswerSpeech(q) {
  const target = extractTarget(q);
  if (target) {
    return '正確答案是：' + target + '，' + q.answer + '。';
  }
  return '正確答案是：' + q.answer + '。';
}

const list = [];
window.ZHUYIN_DATA.adventureStages.forEach(s => s.questions.forEach(q => {
  list.push(getAnswerSpeech(q));
}));
if (window.ZHUYIN_DATA.questionPools) {
  Object.keys(window.ZHUYIN_DATA.questionPools).forEach(k => {
    window.ZHUYIN_DATA.questionPools[k].forEach(q => list.push(getAnswerSpeech(q)));
  });
}
console.log(JSON.stringify(Array.from(new Set(list))));
"""

res = subprocess.check_output(['node', '-e', node_code], encoding='utf-8')
unique_speeches = json.loads(res.strip())
print(f"Total unique answer speech strings to generate: {len(unique_speeches)}")

def get_hash(text):
    return hashlib.md5(text.encode('utf-8')).hexdigest()[:12]

async def generate_all():
    os.makedirs('assets/audio', exist_ok=True)
    new_teacher_map = {}
    new_cute_map = {}

    sem = asyncio.Semaphore(6)

    async def gen_one(text):
        h = get_hash(text)
        v_file = f"assets/audio/v_{h}.mp3"
        cute_file = f"assets/audio/cute_{h}.mp3"
        new_teacher_map[text] = v_file
        new_cute_map[text] = cute_file

        async with sem:
            if not os.path.exists(v_file):
                try:
                    c = edge_tts.Communicate(text, 'zh-TW-HsiaoChenNeural', rate='-8%')
                    await c.save(v_file)
                except Exception as e:
                    print(f"Error v_ {text}: {e}")

            if not os.path.exists(cute_file):
                try:
                    c = edge_tts.Communicate(text, 'zh-TW-HsiaoYuNeural', pitch='+25Hz', rate='+2%')
                    await c.save(cute_file)
                except Exception as e:
                    print(f"Error cute_ {text}: {e}")

    tasks = [gen_one(txt) for txt in unique_speeches]
    await asyncio.gather(*tasks)
    print("All audio files generated successfully!")

    with open('tools/new_audio_maps.json', 'w', encoding='utf-8') as f:
        json.dump({'teacher': new_teacher_map, 'cute': new_cute_map}, f, ensure_ascii=False)

    update_node = """
    const fs = require('fs');
    global.window = {};
    require('./js/audio_manifest.js');

    const teacherMap = window.AUDIO_MANIFEST || {};
    const cuteMap = window.AUDIO_CUTE_MANIFEST || {};

    const maps = JSON.parse(fs.readFileSync('tools/new_audio_maps.json', 'utf8'));
    Object.assign(teacherMap, maps.teacher);
    Object.assign(cuteMap, maps.cute);

    const out = 'window.AUDIO_MANIFEST = ' + JSON.stringify(teacherMap, null, 2) + ';\\n\\n' +
                'window.AUDIO_CUTE_MANIFEST = ' + JSON.stringify(cuteMap, null, 2) + ';\\n';

    fs.writeFileSync('js/audio_manifest.js', out, 'utf8');
    console.log('Successfully updated js/audio_manifest.js!');
    """
    subprocess.check_call(['node', '-e', update_node])

if __name__ == '__main__':
    asyncio.run(generate_all())
