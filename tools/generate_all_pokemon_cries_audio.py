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

m = re.search(r'const GEN1_POKEMON_LIST = (\[[\s\S]*?\]);', content)
if not m:
    print('Failed to find GEN1_POKEMON_LIST in js/gen1_pokemon.js')
    sys.exit(1)

pokemon_list = json.loads(m.group(1))

def get_speech_text(p):
    pid = p['id']
    name = p['name']
    types_str = "與".join(f"{t}屬性" for t in p.get('types', []))

    evo = p.get('evolution')
    if evo:
        if evo.get('method') == 'stone':
            evo_str = f"達成滿級一百級並使用{evo.get('stoneName')}進化為{evo.get('evolvesToName')}。"
        elif evo.get('method') == 'branch_stone':
            evo_str = "達成滿級一百級，可使用水之石、雷之石、或火之石進化。"
        elif evo.get('reqLevel') == 50:
            evo_str = f"達成五十級進化為{evo.get('evolvesToName')}。"
        elif evo.get('reqLevel') == 100:
            evo_str = f"達成最終滿級一百級進化為{evo.get('evolvesToName')}。"
        elif evo.get('reqLevel'):
            evo_str = f"達成 {evo.get('reqLevel')} 級進化為{evo.get('evolvesToName')}。"
        else:
            evo_str = f"可進化為{evo.get('evolvesToName')}。"
    else:
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

sem = asyncio.Semaphore(12)

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
    print(f"Synthesizing clear teacher intro audios for all {len(pokemon_list)} Pokémon...")
    tasks = [synth(p) for p in pokemon_list]
    results = await asyncio.gather(*tasks)
    success = sum(1 for _, ok, _ in results if ok)
    print(f"Successfully generated {success}/{len(pokemon_list)} Pokémon intro audio files!")

if __name__ == '__main__':
    asyncio.run(main())
