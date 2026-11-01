import re
import json

with open('tools/52poke_gen1.html', 'r', encoding='utf-8') as f:
    html = f.read()

type_colors = {
    '一般': '#94A3B8',
    '火': '#EF4444',
    '水': '#3B82F6',
    '電氣': '#F59E0B',
    '草': '#10B981',
    '冰': '#06B6D4',
    '格鬥': '#B91C1C',
    '毒': '#8B5CF6',
    '地面': '#D97706',
    '飛行': '#60A5FA',
    '超能力': '#EC4899',
    '蟲': '#84CC16',
    '岩石': '#78716C',
    '幽靈': '#6366F1',
    '龍': '#4F46E5',
    '鋼': '#64748B',
    '妖精': '#F472B6'
}

type_icons = {
    '一般': '⚪',
    '火': '🔥',
    '水': '🌊',
    '電氣': '⚡',
    '草': '🌿',
    '冰': '❄️',
    '格鬥': '🥊',
    '毒': '☠️',
    '地面': '🏜️',
    '飛行': '🕊️',
    '超能力': '🔮',
    '蟲': '🐛',
    '岩石': '🪨',
    '幽靈': '👻',
    '龍': '🐉',
    '鋼': '⚙️',
    '妖精': '🎀'
}

pokemon_151 = []
seen = set()

# Split by <tr>
rows = html.split('<tr')
for row in rows:
    id_m = re.search(r'class="rdexn-id">#0*(\d{1,4})', row)
    if not id_m:
        continue
    id_num = int(id_m.group(1))
    if id_num < 1 or id_num > 151 or id_num in seen:
        continue

    name_m = re.search(r'class="rdexn-name"><a[^>]*>([^<]+)</a>', row)
    jp_m = re.search(r'class="rdexn-jpname">([^<]+)</td>', row)
    en_m = re.search(r'class="rdexn-enname">([^<]+)</td>', row)
    t1_m = re.search(r'class="[^"]*rdexn-type1"[^>]*><a[^>]*>([^<]+)</a>', row)
    t2_m = re.search(r'class="[^"]*rdexn-type2"[^>]*><a[^>]*>([^<]+)</a>', row)

    name = name_m.group(1).strip() if name_m else ''
    jp = jp_m.group(1).strip() if jp_m else ''
    en = en_m.group(1).strip() if en_m else ''
    t1 = t1_m.group(1).strip() if t1_m else '一般'
    t2 = t2_m.group(1).strip() if t2_m else None
    if t2 == t1:
        t2 = None

    types = [t1]
    if t2:
        types.append(t2)

    seen.add(id_num)
    pokemon_151.append({
        'id': id_num,
        'dexNo': f"#{id_num:03d}",
        'name': name,
        'jpName': jp,
        'enName': en,
        'types': types,
        'primaryType': t1,
        'secondaryType': t2,
        'color': type_colors.get(t1, '#3B82F6'),
        'icon': type_icons.get(t1, '⚡'),
        'image': f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id_num}.png",
        'localImage': f"assets/pokemon/gen1/{id_num}.png",
        'sprite': f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id_num}.png"
    })

pokemon_151.sort(key=lambda x: x['id'])
print(f"Parsed {len(pokemon_151)} Pokemon!")
print(f"Missing: {[i for i in range(1, 152) if i not in seen]}")
print(f"First 3: {[(p['id'], p['name'], p['types']) for p in pokemon_151[:3]]}")
print(f"Last 3: {[(p['id'], p['name'], p['types']) for p in pokemon_151[-3:]]}")

with open('tools/gen1_pokemon_52poke.json', 'w', encoding='utf-8') as f:
    json.dump(pokemon_151, f, ensure_ascii=False, indent=2)
print("Saved tools/gen1_pokemon_52poke.json successfully!")
