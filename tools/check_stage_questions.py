import json, re

with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# find ZHUYIN_DATA object
# remove `const ZHUYIN_DATA = `
m = re.search(r'const ZHUYIN_DATA\s*=\s*(\{[\s\S]*?\});?\s*if', text)
if m:
    data = json.loads(m.group(1))
    stages = data.get('adventureStages', [])
    for s in stages:
        q_count = len(s.get('questions', []))
        fq_count = len(s.get('finalQuestions', []))
        print(f"Stage {s['id']}: {s['name']} | questions: {q_count}, finalQuestions: {fq_count}")
else:
    print("Could not match ZHUYIN_DATA regex")
