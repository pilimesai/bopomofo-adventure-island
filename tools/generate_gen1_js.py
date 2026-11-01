import json

with open('tools/gen1_pokemon_full.json', 'r', encoding='utf-8') as f:
    pokemon_list = json.load(f)

# Fix '電' type color and icon
type_colors = {
    '一般': '#94A3B8',
    '火': '#EF4444',
    '水': '#3B82F6',
    '電': '#F59E0B',
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
    '電': '⚡',
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

signature_moves = {
    '草': ['飛葉快刀', '藤鞭', '種子炸彈', '日光束', '瘋狂植物'],
    '火': ['噴射火焰', '火焰旋渦', '大字爆炎', '閃焰衝鋒', '過熱'],
    '水': ['水槍', '水之波動', '水炮', '加農水炮', '衝浪'],
    '電': ['十萬伏特', '打雷', '電擊', '瘋狂伏特', '電光一閃'],
    '蟲': ['蟲咬', '十字剪', '銀色旋風', '急速折返', '致命針刺'],
    '一般': ['撞擊', '電光一閃', '劈開', '破壞光線', '泰山壓頂'],
    '毒': ['溶解液', '毒針', '污泥炸彈', '毒擊', '劇毒'],
    '地面': ['擲泥', '重踏', '地震', '大地之力', '骨頭回力鏢'],
    '飛行': ['起風', '翅膀攻擊', '啄食', '燕返', '勇鳥猛攻'],
    '超能力': ['念力', '幻象光線', '精神強念', '預知未來', '精神擊破'],
    '格鬥': ['下盤踢', '近身戰', '十字劈', '爆裂拳', '波導彈'],
    '岩石': ['落石', '岩石封鎖', '岩崩', '尖石攻擊', '原始之力'],
    '冰': ['細雪', '冰凍之風', '冰凍光束', '暴風雪', '絕對零度'],
    '幽靈': ['驚嚇', '奇異之光', '暗影球', '黑夜魔影', '禍不單行'],
    '龍': ['龍息', '龍之波動', '逆鱗', '龍之俯衝', '天龍流星'],
    '妖精': ['吸取之吻', '妖精之風', '魔法閃耀', '月亮之力', '嬉鬧'],
    '鋼': ['金屬爪', '加農光炮', '鐵頭', '彗星拳', '巨獸斬']
}

for p in pokemon_list:
    p['color'] = type_colors.get(p['primaryType'], '#3B82F6')
    p['icon'] = type_icons.get(p['primaryType'], '⚡')
    moves = signature_moves.get(p['primaryType'], ['電光一閃'])
    p['move'] = moves[p['id'] % len(moves)]

js_content = f"""/**
 * 🔴 全國寶可夢圖鑑 第一世代（關都地區 No.001 - No.151）
 * 資料來源：神奇寶貝百科 (52poke.com) 官方全國圖鑑編號列表
 * 包含官方中文名、日文名、英文名、標準教育部注音、屬性、代表招式、進化條件與官方立繪
 */

const GEN1_POKEMON_LIST = {json.dumps(pokemon_list, ensure_ascii=False, indent=2)};

if (typeof window !== 'undefined') {{
  window.GEN1_POKEMON_LIST = GEN1_POKEMON_LIST;
}}

if (typeof module !== 'undefined' && module.exports) {{
  module.exports = GEN1_POKEMON_LIST;
}}
"""

with open('js/gen1_pokemon.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Generated js/gen1_pokemon.js successfully with all 151 Pokemon!")
