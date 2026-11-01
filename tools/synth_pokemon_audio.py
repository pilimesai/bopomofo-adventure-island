import asyncio
import edge_tts
import json
import os

os.makedirs('assets/audio/pokemon', exist_ok=True)

with open('tools/gen1_pokemon_full.json', 'r', encoding='utf-8') as f:
    pokemon_list = json.load(f)

VOICE = 'zh-TW-HsiaoChenNeural'
sem = asyncio.Semaphore(8)

async def synth(p):
    pid = p['id']
    dest = f"assets/audio/pokemon/poke_{pid}.mp3"
    if os.path.exists(dest) and os.path.getsize(dest) > 500:
        return pid, True

    name = p['name']
    types_str = "與".join([t + "屬性" for t in p['types']])
    text = f"編號{pid}，{name}，{types_str}。"

    async with sem:
        try:
            comm = edge_tts.Communicate(text, VOICE)
            await comm.save(dest)
            return pid, True
        except Exception as e:
            print(f"Error {pid}: {e}")
            return pid, False

async def main():
    print(f"Synthesizing audio for {len(pokemon_list)} Gen 1 Pokemon...")
    tasks = [synth(p) for p in pokemon_list]
    results = await asyncio.gather(*tasks)
    ok = sum(1 for _, s in results if s)
    print(f"Finished: {ok} / {len(pokemon_list)} audios generated!")

asyncio.run(main())
