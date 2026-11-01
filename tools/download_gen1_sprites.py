import os
import urllib.request
import json
from concurrent.futures import ThreadPoolExecutor

os.makedirs('assets/pokemon/gen1', exist_ok=True)

with open('tools/gen1_pokemon_52poke.json', 'r', encoding='utf-8') as f:
    pokemon_list = json.load(f)

def download_one(p):
    pid = p['id']
    dest = f"assets/pokemon/gen1/{pid}.png"
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        return pid, True, 'already exists'
    url = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{pid}.png"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            with open(dest, 'wb') as f:
                f.write(data)
        return pid, True, f"{len(data)} bytes"
    except Exception as e:
        return pid, False, str(e)

print(f"Starting parallel download of {len(pokemon_list)} official artworks...")
with ThreadPoolExecutor(max_workers=16) as executor:
    results = list(executor.map(download_one, pokemon_list))

successes = [r for r in results if r[1]]
failures = [r for r in results if not r[1]]
print(f"Download complete: {len(successes)} succeeded, {len(failures)} failed")
if failures:
    print("Failures:", failures)
