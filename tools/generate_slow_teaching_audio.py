import os
import re
import json
import asyncio
import hashlib
import edge_tts

def get_hash(text):
    return hashlib.md5(text.encode('utf-8')).hexdigest()[:12]

def extract_target(q):
    if q.get('word'):
        clean = re.sub(r'[^\u4e00-\u9fa5]', '', q['word']).strip()
        if clean:
            return clean
    match = re.search(r'「([^」]+)」', q.get('prompt', ''))
    if match:
        clean = re.sub(r'[^\u4e00-\u9fa5]', '', match.group(1)).strip()
        if clean:
            return clean
    return ''

def format_slow_zhuyin(ans):
    if not ans:
        return ''
    parts = [p for p in ans.split() if p]
    return '，　'.join(parts)

def get_teaching_speech(q):
    if q.get('qType') == 'reading':
        return f"正確答案是：{q['answer']}。"
    target = extract_target(q)
    slow_ans = format_slow_zhuyin(q.get('answer', ''))
    if target:
        return f"正確答案是：{target}。注音念作：{slow_ans}。"
    return f"正確答案是：{slow_ans}。"

async def main():
    print("Reading data.js and audio_manifest.js...")
    with open('js/audio_manifest.js', 'r', encoding='utf-8') as f:
        manifest_text = f.read()

    m = re.search(r'window\.AUDIO_MANIFEST\s*=\s*(\{[\s\S]*?\});', manifest_text)
    if not m:
        raise ValueError("Could not parse AUDIO_MANIFEST")
    manifest = json.loads(m.group(1))

    # Import data.js via node
    import subprocess
    out = subprocess.check_output(['node', '-e', """
    global.window = {};
    require('./js/data.js');
    console.log(JSON.stringify({
      adventureStages: window.ZHUYIN_DATA.adventureStages,
      finalStages: window.ZHUYIN_DATA.finalStages
    }));
    """], encoding='utf-8')
    data = json.loads(out.strip())

    teaching_speeches = set()
    for s in data['adventureStages']:
        for q in s['questions']:
            sp = get_teaching_speech(q)
            teaching_speeches.add(sp)
    for s in data['finalStages']:
        for q in s['questions']:
            sp = get_teaching_speech(q)
            teaching_speeches.add(sp)

    print(f"Total unique teaching speech strings to synthesize: {len(teaching_speeches)}")
    sample = list(teaching_speeches)[:5]
    for s in sample:
        print("  Sample:", s)

    os.makedirs('assets/audio', exist_ok=True)
    to_gen_teacher = []
    to_gen_cute = []

    for sp in teaching_speeches:
        h = get_hash(sp)
        v_file = f"assets/audio/v_{h}.mp3"
        cute_file = f"assets/audio/cute_{h}.mp3"

        if not os.path.exists(v_file):
            to_gen_teacher.append((sp, v_file))
        if not os.path.exists(cute_file):
            to_gen_cute.append((sp, cute_file))

        manifest[sp] = {
            "teacher": v_file,
            "cute": cute_file
        }

    print(f"Teacher audio to synthesize: {len(to_gen_teacher)}, Cute audio: {len(to_gen_cute)}")

    sem = asyncio.Semaphore(8)

    async def synth(text, path, voice, rate):
        async with sem:
            try:
                c = edge_tts.Communicate(text, voice, rate=rate)
                await c.save(path)
            except Exception as e:
                print(f"Error {path}: {e}")

    tasks = []
    # 慢速教學：老師聲音設為 -28% 超清晰慢速注音示範發音
    for sp, p in to_gen_teacher:
        tasks.append(synth(sp, p, 'zh-TW-HsiaoChenNeural', '-28%'))
    # 萌妹聲音設為 -20%
    for sp, p in to_gen_cute:
        tasks.append(synth(sp, p, 'zh-TW-HsiaoYuNeural', '-20%'))

    if tasks:
        print(f"Synthesizing {len(tasks)} audio files with edge-tts...")
        await asyncio.gather(*tasks)
        print("Synthesis complete!")

    # Write manifest back
    print("Writing js/audio_manifest.js...")
    output = "window.AUDIO_MANIFEST = " + json.dumps(manifest, ensure_ascii=False, indent=2) + ";\n"
    with open('js/audio_manifest.js', 'w', encoding='utf-8') as f:
        f.write(output)
    print("Done!")

if __name__ == '__main__':
    asyncio.run(main())
