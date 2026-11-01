import asyncio
import edge_tts
import json
import re
import os
import sys

# Set stdout encoding
sys.stdout.reconfigure(encoding='utf-8')

VOICE = 'zh-TW-HsiaoChenNeural'
OUTPUT_DIR = 'assets/audio/pokemon'
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Read GEN1_POKEMON_LIST from js/gen1_pokemon.js
with open('js/gen1_pokemon.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JSON array
m = re.search(r'const GEN1_POKEMON_LIST = (\[[\s\S]*?\]);', content)
if not m:
    print('Failed to find GEN1_POKEMON_LIST in js/gen1_pokemon.js')
    sys.exit(1)

pokemon_list = json.loads(m.group(1))

def get_speech_text(p):
    name = p['name']
    types_str = "與".join([t + "屬性" for t in p['types']])
    evo_str = ""

    evo = p.get('evolution')
    if evo:
        method = evo.get('method', 'level')
        if method == 'stone':
            evo_str = f"需要使用{evo.get('stoneName')}進化為{evo.get('evolvesToName')}。"
        elif method == 'branch_stone':
            evo_str = "可以使用水之石、雷之石、或火之石進化為水精靈、雷精靈、或火精靈。"
        elif evo.get('reqLevel'):
            evo_str = f"達成 {evo.get('reqLevel')} 級進化為{evo.get('evolvesToName')}。"
        else:
            evo_str = f"可進化為{evo.get('evolvesToName')}。"
    else:
        # Check if evolved from something
        is_evolved = any(
            (other.get('evolution') and (
                other['evolution'].get('evolvesToId') == p['id'] or
                any(b.get('evolvesToId') == p['id'] for b in other['evolution'].get('branches', []))
            ))
            for other in pokemon_list
        )
        if is_evolved:
            evo_str = "已為該形態最終階段。"
        else:
            evo_str = "無進化型態。"

    return f"{name}，{types_str}。{evo_str}"

sem = asyncio.Semaphore(10)

async def synth(p):
    pid = p['id']
    dest = os.path.join(OUTPUT_DIR, f"poke_{pid}.mp3")
    text = get_speech_text(p)

    async with sem:
        try:
            comm = edge_tts.Communicate(text, VOICE)
            await comm.save(dest)
            return pid, True, text
        except Exception as e:
            print(f"Error for #{pid} {p['name']}: {e}")
            return pid, False, text

async def main():
    print(f"Synthesizing new audio for {len(pokemon_list)} Pokémon (Name + Types + Evolution)...")
    tasks = [synth(p) for p in pokemon_list]
    results = await asyncio.gather(*tasks)
    success = sum(1 for _, ok, _ in results if ok)
    print(f"Successfully generated {success}/{len(pokemon_list)} Pokémon intro audio files!")

if __name__ == '__main__':
    asyncio.run(main())
