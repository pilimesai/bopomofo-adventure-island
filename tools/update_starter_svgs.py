import re

path = 'js/data.js'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace images using regex
replacements = [
    (r'("name":\s*"阿羅拉雷丘"[\s\S]*?"image":\s*)"assets/pokemon/raichu\.svg"', r'\1"assets/pokemon/alolan_raichu.svg"'),
    (r'("name":\s*"火恐龍"[\s\S]*?"image":\s*)"assets/pokemon/charmander\.svg"', r'\1"assets/pokemon/charmeleon.svg"'),
    (r'("name":\s*"噴火龍"[\s\S]*?"image":\s*)"assets/pokemon/charmander\.svg"', r'\1"assets/pokemon/charizard.svg"'),
    (r'("name":\s*"卡咪龜"[\s\S]*?"image":\s*)"assets/pokemon/squirtle\.svg"', r'\1"assets/pokemon/wartortle.svg"'),
    (r'("name":\s*"水箭龜"[\s\S]*?"image":\s*)"assets/pokemon/squirtle\.svg"', r'\1"assets/pokemon/blastoise.svg"'),
    (r'("name":\s*"妙蛙草"[\s\S]*?"image":\s*)"assets/pokemon/bulbasaur\.svg"', r'\1"assets/pokemon/ivysaur.svg"'),
    (r'("name":\s*"妙蛙花"[\s\S]*?"image":\s*)"assets/pokemon/bulbasaur\.svg"', r'\1"assets/pokemon/venusaur.svg"'),
    (r'("name":\s*"仙子伊布"[\s\S]*?"image":\s*)"assets/pokemon/eevee\.svg"', r'\1"assets/pokemon/sylveon.svg"'),
    (r'("name":\s*"太陽伊布"[\s\S]*?"image":\s*)"assets/pokemon/eevee\.svg"', r'\1"assets/pokemon/espeon.svg"'),
]

for pat, repl in replacements:
    match = re.search(pat, text)
    if match:
        text = re.sub(pat, repl, text, count=1)
        print(f"Matched and replaced: {pat[:30]}")
    else:
        print(f"FAILED to match: {pat[:30]}")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Finished updating data.js with regex.")
