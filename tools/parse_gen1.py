import re
import json

with open('tools/52poke_gen1.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Pattern for table rows
pattern = re.compile(
    r'<td class="rdexn-id">#0*(\d{1,4})\s*</td>[\s\S]*?'
    r'<td class="rdexn-name"><a[^>]*>([^<]+)</a>[\s\S]*?'
    r'<td class="rdexn-jpname">([^<]+)</td>[\s\S]*?'
    r'<td class="rdexn-enname">([^<]+)</td>[\s\S]*?'
    r'<td[^>]*class="[^"]*rdexn-type1"[^>]*><a[^>]*>([^<]+)</a></td>'
    r'(?:[\s\S]*?<td[^>]*class="[^"]*rdexn-type2"[^>]*><a[^>]*>([^<]+)</a></td>)?'
)

matches = pattern.findall(html)
print(f"Total row matches: {len(matches)}")

pokemon_151 = []
seen = set()

# Type color mapping
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

for dex_id, name, jpname, enname, type1, type2 in matches:
    id_num = int(dex_id)
    if id_num < 1 or id_num > 151:
        continue
    if id_num in seen:
        continue
    seen.add(id_num)

    t1 = type1.strip()
    t2 = type2.strip() if type2 and type2.strip() and type2.strip() != t1 else None
    types = [t1]
    if t2:
        types.append(t2)

    color = type_colors.get(t1, '#3B82F6')
    icon = type_icons.get(t1, '⚡')

    pokemon_151.append({
        'id': id_num,
        'dexNo': f"#{id_num:03d}",
        'name': name.strip(),
        'jpName': jpname.strip(),
        'enName': enname.strip(),
        'types': types,
        'primaryType': t1,
        'secondaryType': t2,
        'color': color,
        'icon': icon,
        'image': f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id_num}.png",
        'localImage': f"assets/pokemon/gen1/{id_num}.png",
        'sprite': f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id_num}.png"
    })

pokemon_151.sort(key=lambda x: x['id'])
print(f"Extracted {len(pokemon_151)} Pokemon!")

missing = [i for i in range(1, 152) if i not in seen]
if missing:
    print("Missing IDs:", missing)
else:
    print("SUCCESS: Exactly 151 Pokemon extracted!")

with open('tools/gen1_pokemon_52poke.json', 'w', encoding='utf-8') as f:
    json.dump(pokemon_151, f, ensure_ascii=False, indent=2)

print("Saved tools/gen1_pokemon_52poke.json")
