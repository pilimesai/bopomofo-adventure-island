import urllib.request
import re
import json

url = 'https://wiki.52poke.com/zh-hant/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E5%85%A8%E5%9B%BD%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
with urllib.request.urlopen(req, timeout=15) as resp:
    html = resp.read().decode('utf-8')

print("Page length:", len(html))

# Extract all rows
# <td class="rdexn-id">#0001
pattern = re.compile(
    r'<td class="rdexn-id">#0*(\d{1,4})\s*</td>[\s\S]*?'
    r'<td class="rdexn-name"><a[^>]*>([^<]+)</a>[\s\S]*?'
    r'<td class="rdexn-jpname">([^<]+)</td>[\s\S]*?'
    r'<td class="rdexn-enname">([^<]+)</td>[\s\S]*?'
    r'<td[^>]*class="[^"]*rdexn-type1"[^>]*><a[^>]*>([^<]+)</a></td>'
    r'(?:[\s\S]*?<td[^>]*class="[^"]*rdexn-type2"[^>]*><a[^>]*>([^<]+)</a></td>)?'
)

matches = pattern.findall(html)
print(f"Total matches found: {len(matches)}")

pokemon_151 = []
seen = set()

for dex_id, name, jpname, enname, type1, type2 in matches:
    id_num = int(dex_id)
    if id_num < 1 or id_num > 151:
        continue
    if id_num in seen:
        continue
    seen.add(id_num)
    
    types = [type1.strip()]
    if type2 and type2.strip() and type2.strip() != type1.strip():
        types.append(type2.strip())
        
    pokemon_151.append({
        'id': id_num,
        'dexNo': f"#{id_num:03d}",
        'name': name.strip(),
        'jpName': jpname.strip(),
        'enName': enname.strip(),
        'types': types,
        'primaryType': types[0],
        'secondaryType': types[1] if len(types) > 1 else None
    })

pokemon_151.sort(key=lambda p: p['id'])
print(f"Extracted {len(pokemon_151)} Gen 1 Pokemon!")

# Verify 1 to 151
missing = [i for i in range(1, 152) if i not in seen]
if missing:
    print("Missing IDs:", missing)
else:
    print("All 151 Gen 1 Pokemon extracted without gaps!")
    print("First 3:", pokemon_151[:3])
    print("Last 3:", pokemon_151[-3:])

with open('tools/gen1_pokemon.json', 'w', encoding='utf-8') as f:
    json.dump(pokemon_151, f, ensure_ascii=False, indent=2)

print("Saved to tools/gen1_pokemon.json")
