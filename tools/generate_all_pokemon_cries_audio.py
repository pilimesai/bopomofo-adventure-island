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

# 經典動畫寵物叫聲對照表
ANIME_CRIES = {
    1: "種子！種子～！",               # 妙蛙種子
    2: "妙蛙～草！",                   # 妙蛙草
    3: "妙蛙～花！",                   # 妙蛙花
    4: "火龍！火龍～！",               # 小火龍
    5: "恐龍！恐龍～！",               # 火恐龍
    6: "吼嗷嗷～～！噴火龍！",         # 噴火龍
    7: "傑尼！傑尼～！",               # 傑尼龜
    8: "卡咪！卡咪～！",               # 卡咪龜
    9: "卡美～水箭龜！",               # 水箭龜
    10: "毛蟲～毛蟲～",                # 綠毛蟲
    11: "鐵甲～蛹！",                  # 鐵甲蛹
    12: "巴大～蝶！",                  # 巴大蝶
    13: "獨角～蟲！",                  # 獨角蟲
    14: "鐵殼～蛹！",                  # 鐵殼蛹
    15: "大針～蜂！",                  # 大針蜂
    16: "波波～！波波～！",             # 波波
    17: "比比～鳥！",                  # 比比鳥
    18: "大比～鳥！",                  # 大比鳥
    19: "拉達～拉達～！",              # 小拉達
    20: "拉達～！",                    # 拉達
    21: "烈雀～烈雀～！",              # 烈雀
    22: "大嘴～雀！",                  # 大嘴雀
    23: "阿柏～蛇！",                  # 阿柏蛇
    24: "阿柏～怪！",                  # 阿柏怪
    25: "皮卡！皮卡皮卡～！",           # 皮卡丘
    26: "雷～丘！",                    # 雷丘
    27: "穿山～鼠！",                  # 穿山鼠
    28: "穿山～王！",                  # 穿山王
    29: "尼多～蘭！",                  # 尼多蘭
    30: "尼多～娜！",                  # 尼多娜
    31: "尼多～后！",                  # 尼多后
    32: "尼多～朗！",                  # 尼多朗
    33: "尼多力～諾！",                # 尼多力諾
    34: "尼多～王！",                  # 尼多王
    35: "皮～皮！皮皮～！",             # 皮皮
    36: "皮可～西！",                  # 皮可西
    37: "六尾～六尾～！",              # 六尾
    38: "九尾～！",                    # 九尾
    39: "波～波嚕波嚕波～波嚕哩～🎵 胖丁～胖丁～🎶", # 胖丁（經典催眠唱歌）
    40: "胖可～丁！波波哩～🎵",        # 胖可丁
    41: "超音～蝠！",                  # 超音蝠
    42: "大嘴～蝠！",                  # 大嘴蝠
    43: "走路～草！",                  # 走路草
    44: "臭臭～花！",                  # 臭臭花
    45: "霸王～花！",                  # 霸王花
    46: "派拉～斯！",                  # 派拉斯
    47: "派拉～斯特！",                # 派拉斯特
    48: "毛球～毛球～！",              # 毛球
    49: "摩魯～蛾！",                  # 摩魯蛾
    50: "地鼠～地鼠～！",              # 地鼠
    51: "三地～鼠！",                  # 三地鼠
    52: "喵～！就是這樣喵～！",         # 喵喵
    53: "貓老～大！",                  # 貓老大
    54: "可達～？可達可達～！",         # 可達鴨
    55: "哥達～！",                    # 哥達鴨
    56: "猴怪～猴怪～！",              # 猴怪
    57: "火爆～猴！",                  # 火爆猴
    58: "卡蒂～汪！",                  # 卡蒂狗
    59: "風速～汪汪！",                # 風速狗
    60: "蚊香～蝌蚪！",                # 蚊香蝌蚪
    61: "蚊香～君！",                  # 蚊香君
    62: "蚊香～泳士！",                # 蚊香泳士
    63: "凱西～凱西～",                # 凱西
    64: "勇基～拉！",                  # 勇基拉
    65: "胡地～胡地！",                # 胡地
    66: "腕力～腕力！",                # 腕力
    67: "豪力～！",                    # 豪力
    68: "怪力～怪力！",                # 怪力
    69: "喇叭～芽！",                  # 喇叭芽
    70: "口呆～花！",                  # 口呆花
    71: "大食～花！",                  # 大食花
    72: "瑪瑙～水母！",                # 瑪瑙水母
    73: "毒刺～水母！",                # 毒刺水母
    74: "小拳～石！",                  # 小拳石
    75: "隆隆～石！",                  # 隆隆石
    76: "隆隆～岩！",                  # 隆隆岩
    77: "小火～馬！",                  # 小火馬
    78: "烈焰～馬！",                  # 烈焰馬
    79: "呆～～呆～～",                # 呆呆獸
    80: "呆殼～～獸！",                # 呆殼獸
    81: "小磁～怪！",                  # 小磁怪
    82: "三合一～磁怪！",              # 三合一磁怪
    83: "大蔥～鴨！",                  # 大蔥鴨
    84: "嘟嘟～嘟嘟～！",              # 嘟嘟
    85: "嘟嘟～利！",                  # 嘟嘟利
    86: "小海～獅！",                  # 小海獅
    87: "白海～獅！",                  # 白海獅
    88: "臭泥～臭泥～",                # 臭泥
    89: "臭臭～泥！",                  # 臭臭泥
    90: "大舌～貝！",                  # 大舌貝
    91: "刺甲～貝！",                  # 刺甲貝
    92: "鬼斯～鬼斯～",                # 鬼斯
    93: "鬼斯～通！",                  # 鬼斯通
    94: "耿～鬼！",                    # 耿鬼
    95: "大岩～蛇！",                  # 大岩蛇
    96: "催眠～貘！",                  # 催眠貘
    97: "引夢～貘人！",                # 引夢貘人
    98: "大鉗～蟹！",                  # 大鉗蟹
    99: "巨鉗～蟹！",                  # 巨鉗蟹
    100: "霹靂～電球！",               # 霹靂電球
    101: "頑皮～雷彈！",               # 頑皮雷彈
    102: "蛋蛋～蛋蛋～！",             # 蛋蛋
    103: "椰蛋～樹！",                 # 椰蛋樹
    104: "卡拉～卡拉～！",             # 卡拉卡拉
    105: "嘎啦～嘎啦～！",             # 嘎啦嘎啦
    106: "飛腿～郎！",                 # 飛腿郎
    107: "快拳～郎！",                 # 快拳郎
    108: "大舌～頭！",                 # 大舌頭
    109: "瓦斯～彈！",                 # 瓦斯彈
    110: "雙彈～瓦斯！",               # 雙彈瓦斯
    111: "獨角～犀牛！",               # 獨角犀牛
    112: "鑽角～犀獸！",               # 鑽角犀獸
    113: "吉利～蛋！",                 # 吉利蛋
    114: "蔓藤～怪！",                 # 蔓藤怪
    115: "袋獸～袋獸～",               # 袋獸
    116: "墨海～馬！",                 # 墨海馬
    117: "海刺～龍！",                 # 海刺龍
    118: "角金～魚！",                 # 角金魚
    119: "金魚～王！",                 # 金魚王
    120: "海星～海星～！",             # 海星星
    121: "寶石～海星！",               # 寶石海星
    122: "巴利～巴利～魔牆！",         # 魔牆人偶
    123: "飛天～螳螂！",               # 飛天螳螂
    124: "迷唇～姐！",                 # 迷唇姐
    125: "電擊～獸！",                 # 電擊獸
    126: "鴨嘴～火獸！",               # 鴨嘴火獸
    127: "凱羅～斯！",                 # 凱羅斯
    128: "肯泰～羅！",                 # 肯泰羅
    129: "鯉魚～鯉魚～（啪嗒啪嗒）！", # 鯉魚王
    130: "吼嗷嗷嗷嗷～～！",           # 暴鯉龍
    131: "拉普～拉斯～",               # 拉普拉斯
    132: "百變～怪！",                 # 百變怪
    133: "布伊～！布伊～！",           # 伊布
    134: "水伊～布！",                 # 水伊布
    135: "雷伊～布！",                 # 雷伊布
    136: "火伊～布！",                 # 火伊布
    137: "多邊～獸！",                 # 多邊獸
    138: "菊石～獸！",                 # 菊石獸
    139: "多刺～菊石獸！",             # 多刺菊石獸
    140: "化石～盔！",                 # 化石盔
    141: "鐮刀～盔！",                 # 鐮刀盔
    142: "化石～翼龍！",               # 化石翼龍
    143: "卡比～卡比～（呼嚕嚕）",     # 卡比獸
    144: "急凍～～鳥！",               # 急凍鳥
    145: "閃電～～鳥！",               # 閃電鳥
    146: "火焰～～鳥！",               # 火焰鳥
    147: "迷你～龍！",                 # 迷你龍
    148: "哈克～龍！",                 # 哈克龍
    149: "嗷嗚～～快龍！",             # 快龍
    150: "我是超夢。",                 # 超夢
    151: "繆～！繆～！✨",              # 夢幻
}

def get_speech_text(p):
    pid = p['id']
    name = p['name']
    types_str = "與".join([t + "屬性" for t in p['types']])
    evo_str = ""

    evo = p.get('evolution')
    if evo:
        method = evo.get('method', 'level')
        if method == 'stone':
            evo_str = f"需要使用{evo.get('stoneName')}才能進化為{evo.get('evolvesToName')}。"
        elif method == 'branch_stone':
            evo_str = "可以使用水之石進化為水伊布、雷之石進化為雷伊布、或火之石進化為火伊布。"
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

    anime_cry = ANIME_CRIES.get(pid, f"{name}～！")
    return f"{anime_cry} {name}，{types_str}。{evo_str}"

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
    print(f"Synthesizing all {len(pokemon_list)} Pokémon anime calls + intro audios...")
    tasks = [synth(p) for p in pokemon_list]
    results = await asyncio.gather(*tasks)
    success = sum(1 for _, ok, _ in results if ok)
    print(f"Successfully generated {success}/{len(pokemon_list)} Pokémon intro audio files!")

if __name__ == '__main__':
    asyncio.run(main())
