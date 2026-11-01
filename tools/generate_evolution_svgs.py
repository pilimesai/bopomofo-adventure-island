import os

SVGS = {}

# 1. Charmeleon (火恐龍) - Crimson red, single head horn, sharp claws, blazing tail
SVGS['charmeleon.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="meleonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E11D48" />
      <stop offset="100%" stop-color="#BE123C" />
    </linearGradient>
    <radialGradient id="meleonFlame" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="45%" stop-color="#F97316" />
      <stop offset="100%" stop-color="#DC2626" />
    </radialGradient>
  </defs>

  <!-- 尾巴與猛烈火焰 -->
  <path d="M 65 142 Q 30 155 24 125 Q 18 100 34 85" fill="none" stroke="#BE123C" stroke-width="16" stroke-linecap="round" />
  <path d="M 34 85 Q 12 55 30 35 Q 56 55 38 85 Z" fill="url(#meleonFlame)" />
  <path d="M 32 75 Q 22 55 30 50 Q 42 55 36 75 Z" fill="#FFFFCC" />

  <!-- 身體 -->
  <ellipse cx="100" cy="138" rx="44" ry="40" fill="url(#meleonGrad)" stroke="#1E293B" stroke-width="3" />
  <!-- 淺粉紅米色肚皮 -->
  <ellipse cx="100" cy="142" rx="27" ry="26" fill="#FCE7F3" stroke="#F43F5E" stroke-width="1.5" />

  <!-- 強壯雙腿與利爪 -->
  <ellipse cx="72" cy="176" rx="14" ry="9" fill="url(#meleonGrad)" stroke="#1E293B" stroke-width="2.5" />
  <polygon points="64,183 67,178 70,183" fill="#FFF" />
  <polygon points="72,184 75,178 78,184" fill="#FFF" />
  <ellipse cx="128" cy="176" rx="14" ry="9" fill="url(#meleonGrad)" stroke="#1E293B" stroke-width="2.5" />
  <polygon points="122,184 125,178 128,184" fill="#FFF" />
  <polygon points="130,183 133,178 136,183" fill="#FFF" />

  <!-- 頭頂向後單角 -->
  <path d="M 92 65 Q 98 35 116 42 Q 108 60 102 70 Z" fill="#9F1239" stroke="#1E293B" stroke-width="2.5" />

  <!-- 頭部 -->
  <ellipse cx="100" cy="88" rx="46" ry="40" fill="url(#meleonGrad)" stroke="#1E293B" stroke-width="3" />

  <!-- 霸氣青綠雙眼 -->
  <ellipse cx="78" cy="82" rx="9" ry="11" fill="#10B981" stroke="#1E293B" stroke-width="2" />
  <circle cx="76" cy="78" r="3.5" fill="#FFFFFF" />
  <ellipse cx="122" cy="82" rx="9" ry="11" fill="#10B981" stroke="#1E293B" stroke-width="2" />
  <circle cx="120" cy="78" r="3.5" fill="#FFFFFF" />

  <!-- 鼻孔與利齒大嘴 -->
  <circle cx="95" cy="89" r="1.5" fill="#4C0519" />
  <circle cx="105" cy="89" r="1.5" fill="#4C0519" />
  <path d="M 85 98 Q 100 110 115 98" fill="none" stroke="#1E293B" stroke-width="3" stroke-linecap="round" />
  <polygon points="90,99 92,105 94,99" fill="#FFFFFF" stroke="#1E293B" stroke-width="1" />
  <polygon points="106,99 108,105 110,99" fill="#FFFFFF" stroke="#1E293B" stroke-width="1" />

  <!-- 雙手銳利爪子 -->
  <ellipse cx="74" cy="126" rx="9" ry="7" fill="url(#meleonGrad)" stroke="#1E293B" stroke-width="2" />
  <polygon points="66,128 72,126 69,132" fill="#FFF" />
  <ellipse cx="126" cy="126" rx="9" ry="7" fill="url(#meleonGrad)" stroke="#1E293B" stroke-width="2" />
  <polygon points="134,128 128,126 131,132" fill="#FFF" />
</svg>'''

# 2. Charizard (噴火龍) - Mighty orange dragon, huge teal wings, dual horns, blazing tail
SVGS['charizard.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="zardBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FF7800" />
      <stop offset="100%" stop-color="#EA580C" />
    </linearGradient>
    <linearGradient id="zardWing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06B6D4" />
      <stop offset="100%" stop-color="#0E7490" />
    </linearGradient>
    <radialGradient id="zardFire" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="40%" stop-color="#F97316" />
      <stop offset="100%" stop-color="#DC2626" />
    </radialGradient>
  </defs>

  <!-- 背後雙翼 (Huge Dragon Wings) -->
  <path d="M 75 95 Q 25 50 15 25 Q 40 45 60 70 Q 40 75 25 100 Q 55 95 72 108 Z" fill="url(#zardWing)" stroke="#1E293B" stroke-width="3" />
  <path d="M 125 95 Q 175 50 185 25 Q 160 45 140 70 Q 160 75 175 100 Q 145 95 128 108 Z" fill="url(#zardWing)" stroke="#1E293B" stroke-width="3" />

  <!-- 粗壯神龍長尾巴與熊熊巨焰 -->
  <path d="M 65 145 Q 25 165 18 130 Q 12 95 32 75" fill="none" stroke="#EA580C" stroke-width="18" stroke-linecap="round" />
  <path d="M 32 75 Q 8 40 28 20 Q 58 40 38 75 Z" fill="url(#zardFire)" />
  <path d="M 30 65 Q 18 42 28 35 Q 42 42 34 65 Z" fill="#FFFF99" />

  <!-- 龍身軀 -->
  <ellipse cx="100" cy="140" rx="46" ry="42" fill="url(#zardBody)" stroke="#1E293B" stroke-width="3" />
  <!-- 鵝黃肚皮 -->
  <ellipse cx="100" cy="144" rx="28" ry="28" fill="#FEF08A" stroke="#FBBF24" stroke-width="2" />

  <!-- 強健龍足與白色三爪 -->
  <ellipse cx="68" cy="178" rx="15" ry="9" fill="url(#zardBody)" stroke="#1E293B" stroke-width="2.5" />
  <polygon points="60,185 64,180 68,185" fill="#FFF" />
  <polygon points="68,186 72,180 76,186" fill="#FFF" />
  <ellipse cx="132" cy="178" rx="15" ry="9" fill="url(#zardBody)" stroke="#1E293B" stroke-width="2.5" />
  <polygon points="124,186 128,180 132,186" fill="#FFF" />
  <polygon points="132,185 136,180 140,185" fill="#FFF" />

  <!-- 頭部後方雙角 (Dual Dragon Horns) -->
  <path d="M 85 62 Q 72 32 60 40 Q 75 52 82 66 Z" fill="#C2410C" stroke="#1E293B" stroke-width="2.5" />
  <path d="M 115 62 Q 128 32 140 40 Q 125 52 118 66 Z" fill="#C2410C" stroke="#1E293B" stroke-width="2.5" />

  <!-- 霸氣龍頭 -->
  <ellipse cx="100" cy="82" rx="42" ry="36" fill="url(#zardBody)" stroke="#1E293B" stroke-width="3" />
  <!-- 龍吻突出 -->
  <ellipse cx="100" cy="94" rx="28" ry="18" fill="#FB923C" stroke="#1E293B" stroke-width="2" />

  <!-- 青藍雙目威嚴神采 -->
  <ellipse cx="82" cy="76" rx="8" ry="11" fill="#0284C7" stroke="#1E293B" stroke-width="2" />
  <circle cx="80" cy="72" r="3" fill="#FFFFFF" />
  <ellipse cx="118" cy="76" rx="8" ry="11" fill="#0284C7" stroke="#1E293B" stroke-width="2" />
  <circle cx="116" cy="72" r="3" fill="#FFFFFF" />

  <!-- 兩孔龍鼻與龍牙大口 -->
  <circle cx="94" cy="88" r="2" fill="#7C2D12" />
  <circle cx="106" cy="88" r="2" fill="#7C2D12" />
  <path d="M 82 98 Q 100 114 118 98" fill="none" stroke="#1E293B" stroke-width="3" stroke-linecap="round" />
  <polygon points="88,98 91,106 94,98" fill="#FFFFFF" />
  <polygon points="106,98 109,106 112,98" fill="#FFFFFF" />

  <!-- 龍爪手 -->
  <ellipse cx="72" cy="126" rx="10" ry="7" fill="url(#zardBody)" stroke="#1E293B" stroke-width="2" />
  <ellipse cx="128" cy="126" rx="10" ry="7" fill="url(#zardBody)" stroke="#1E293B" stroke-width="2" />
</svg>'''

# 3. Wartortle (卡咪龜) - Blue turtle, fluffy winged ears, swirling wave tail
SVGS['wartortle.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="warGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#93C5FD" />
      <stop offset="100%" stop-color="#3B82F6" />
    </linearGradient>
    <linearGradient id="warShell" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#92400E" />
      <stop offset="100%" stop-color="#78350F" />
    </linearGradient>
  </defs>

  <!-- 澎鬆浪花大尾巴 (Swirling Wave Tail) -->
  <path d="M 55 145 C 20 155 10 120 25 100 C 40 80 15 65 35 55 C 60 45 68 85 58 115 C 50 135 65 140 60 148 Z" fill="#EFF6FF" stroke="#3B82F6" stroke-width="3" />
  <path d="M 35 85 Q 45 70 52 80" fill="none" stroke="#93C5FD" stroke-width="2.5" />
  <path d="M 28 115 Q 38 100 48 112" fill="none" stroke="#93C5FD" stroke-width="2.5" />

  <!-- 龜殼背甲與白色滾邊 -->
  <ellipse cx="100" cy="144" rx="48" ry="38" fill="url(#warShell)" stroke="#1E293B" stroke-width="3" />
  <ellipse cx="100" cy="144" rx="52" ry="42" fill="none" stroke="#F8FAFC" stroke-width="4.5" />

  <!-- 雙腳 -->
  <ellipse cx="74" cy="180" rx="14" ry="9" fill="url(#warGrad)" stroke="#1E293B" stroke-width="2.5" />
  <ellipse cx="126" cy="180" rx="14" ry="9" fill="url(#warGrad)" stroke="#1E293B" stroke-width="2.5" />

  <!-- 雙耳毛茸茸羽翼 (Feathered Wing Ears) -->
  <path d="M 64 78 C 35 60 30 38 48 30 C 65 22 72 50 68 70 Z" fill="#F8FAFC" stroke="#3B82F6" stroke-width="3" />
  <path d="M 52 48 Q 58 38 65 52" fill="none" stroke="#93C5FD" stroke-width="2" />
  <path d="M 136 78 C 165 60 170 38 152 30 C 135 22 128 50 132 70 Z" fill="#F8FAFC" stroke="#3B82F6" stroke-width="3" />
  <path d="M 148 48 Q 142 38 135 52" fill="none" stroke="#93C5FD" stroke-width="2" />

  <!-- 頭部 -->
  <ellipse cx="100" cy="90" rx="46" ry="40" fill="url(#warGrad)" stroke="#1E293B" stroke-width="3" />

  <!-- 堅定棕紅大眼睛 -->
  <ellipse cx="78" cy="85" rx="9" ry="12" fill="#7C2D12" stroke="#1E293B" stroke-width="2" />
  <circle cx="76" cy="80" r="3.5" fill="#FFFFFF" />
  <ellipse cx="122" cy="85" rx="9" ry="12" fill="#7C2D12" stroke="#1E293B" stroke-width="2" />
  <circle cx="120" cy="80" r="3.5" fill="#FFFFFF" />

  <!-- 嘴巴露出可愛單側尖牙 -->
  <path d="M 88 102 Q 100 114 112 102" fill="none" stroke="#1E293B" stroke-width="3" stroke-linecap="round" />
  <polygon points="90,102 93,108 96,102" fill="#FFF" stroke="#1E293B" stroke-width="1" />
  <polygon points="104,102 107,108 110,102" fill="#FFF" stroke="#1E293B" stroke-width="1" />

  <!-- 雙手 -->
  <ellipse cx="74" cy="132" rx="10" ry="7" fill="url(#warGrad)" stroke="#1E293B" stroke-width="2" />
  <ellipse cx="126" cy="132" rx="10" ry="7" fill="url(#warGrad)" stroke="#1E293B" stroke-width="2" />
</svg>'''

# 4. Blastoise (水箭龜) - Massive brown shell with twin metallic hydro cannons
SVGS['blastoise.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="blasGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#60A5FA" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>
    <linearGradient id="cannonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#CBD5E1" />
      <stop offset="50%" stop-color="#94A3B8" />
      <stop offset="100%" stop-color="#64748B" />
    </linearGradient>
    <linearGradient id="shellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#B45309" />
      <stop offset="100%" stop-color="#78350F" />
    </linearGradient>
  </defs>

  <!-- 肩膀兩側雙聯巨型加農水炮 (Twin Steel Water Cannons) -->
  <g transform="rotate(-28 50 60)">
    <rect x="36" y="25" width="28" height="50" rx="4" fill="url(#cannonGrad)" stroke="#1E293B" stroke-width="3" />
    <ellipse cx="50" cy="25" rx="14" ry="6" fill="#475569" stroke="#1E293B" stroke-width="2" />
  </g>
  <g transform="rotate(28 150 60)">
    <rect x="136" y="25" width="28" height="50" rx="4" fill="url(#cannonGrad)" stroke="#1E293B" stroke-width="3" />
    <ellipse cx="150" cy="25" rx="14" ry="6" fill="#475569" stroke="#1E293B" stroke-width="2" />
  </g>

  <!-- 巨大堅硬龜甲與厚重白圈 -->
  <ellipse cx="100" cy="142" rx="55" ry="46" fill="url(#shellGrad)" stroke="#1E293B" stroke-width="3.5" />
  <ellipse cx="100" cy="142" rx="58" ry="49" fill="none" stroke="#F1F5F9" stroke-width="6" />

  <!-- 淺卡其色腹甲紋路 -->
  <ellipse cx="100" cy="146" rx="36" ry="32" fill="#FEF08A" stroke="#EAB308" stroke-width="2" />
  <line x1="100" y1="116" x2="100" y2="176" stroke="#CA8A04" stroke-width="2" />
  <line x1="68" y1="146" x2="132" y2="146" stroke="#CA8A04" stroke-width="2" />

  <!-- 粗壯雙腿 -->
  <ellipse cx="68" cy="180" rx="16" ry="10" fill="url(#blasGrad)" stroke="#1E293B" stroke-width="3" />
  <ellipse cx="132" cy="180" rx="16" ry="10" fill="url(#blasGrad)" stroke="#1E293B" stroke-width="3" />

  <!-- 雄偉大頭與三角形耳 -->
  <polygon points="56,76 68,52 74,76" fill="url(#blasGrad)" stroke="#1E293B" stroke-width="2" />
  <polygon points="144,76 132,52 126,76" fill="url(#blasGrad)" stroke="#1E293B" stroke-width="2" />
  <ellipse cx="100" cy="88" rx="48" ry="38" fill="url(#blasGrad)" stroke="#1E293B" stroke-width="3" />

  <!-- 威猛目光 -->
  <ellipse cx="76" cy="84" rx="9" ry="11" fill="#7C2D12" stroke="#1E293B" stroke-width="2" />
  <circle cx="74" cy="80" r="3" fill="#FFF" />
  <ellipse cx="124" cy="84" rx="9" ry="11" fill="#7C2D12" stroke="#1E293B" stroke-width="2" />
  <circle cx="122" cy="80" r="3" fill="#FFF" />

  <!-- 下顎兩顆銳利獠牙 -->
  <path d="M 80 102 Q 100 114 120 102" fill="none" stroke="#1E293B" stroke-width="3" stroke-linecap="round" />
  <polygon points="86,101 89,93 92,101" fill="#FFF" stroke="#1E293B" stroke-width="1" />
  <polygon points="108,101 111,93 114,101" fill="#FFF" stroke="#1E293B" stroke-width="1" />

  <!-- 雙手厚實前爪 -->
  <ellipse cx="65" cy="135" rx="14" ry="10" fill="url(#blasGrad)" stroke="#1E293B" stroke-width="2.5" />
  <ellipse cx="135" cy="135" rx="14" ry="10" fill="url(#blasGrad)" stroke="#1E293B" stroke-width="2.5" />
</svg>'''

# 5. Ivysaur (妙蛙草) - Teal quadruped with blooming pink flower bud on back
SVGS['ivysaur.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="ivyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#5EEAD4" />
      <stop offset="100%" stop-color="#0D9488" />
    </linearGradient>
    <linearGradient id="budGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FB7185" />
      <stop offset="100%" stop-color="#E11D48" />
    </linearGradient>
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ADE80" />
      <stop offset="100%" stop-color="#15803D" />
    </linearGradient>
  </defs>

  <!-- 背後 4 片向外伸展的巨大綠葉 -->
  <path d="M 100 100 Q 40 85 45 60 Q 75 70 100 95 Z" fill="url(#leafGrad)" stroke="#1E293B" stroke-width="2.5" />
  <path d="M 100 100 Q 160 85 155 60 Q 125 70 100 95 Z" fill="url(#leafGrad)" stroke="#1E293B" stroke-width="2.5" />
  <path d="M 100 100 Q 50 120 40 105 Q 65 95 100 100 Z" fill="url(#leafGrad)" stroke="#1E293B" stroke-width="2" />
  <path d="M 100 100 Q 150 120 160 105 Q 135 95 100 100 Z" fill="url(#leafGrad)" stroke="#1E293B" stroke-width="2" />

  <!-- 背後碩大的粉紅花苞 (Giant Pink Flower Bud) -->
  <ellipse cx="100" cy="68" rx="36" ry="40" fill="url(#budGrad)" stroke="#1E293B" stroke-width="3" />
  <path d="M 85 42 Q 100 68 100 95" fill="none" stroke="#BE123C" stroke-width="2.5" />
  <path d="M 115 42 Q 100 68 100 95" fill="none" stroke="#BE123C" stroke-width="2.5" />

  <!-- 壯碩身體與深青藍斑紋 -->
  <ellipse cx="100" cy="144" rx="48" ry="38" fill="url(#ivyGrad)" stroke="#1E293B" stroke-width="3" />
  <path d="M 75 132 Q 85 125 80 142 Z" fill="#0F766E" />
  <path d="M 125 135 Q 115 128 120 145 Z" fill="#0F766E" />

  <!-- 四肢腳爪 -->
  <ellipse cx="68" cy="176" rx="14" ry="9" fill="url(#ivyGrad)" stroke="#1E293B" stroke-width="2.5" />
  <polygon points="60,183 63,178 66,183" fill="#FFF" />
  <polygon points="68,184 71,178 74,184" fill="#FFF" />
  <ellipse cx="132" cy="176" rx="14" ry="9" fill="url(#ivyGrad)" stroke="#1E293B" stroke-width="2.5" />
  <polygon points="126,184 129,178 132,184" fill="#FFF" />
  <polygon points="134,183 137,178 140,183" fill="#FFF" />

  <!-- 雙耳與頭部 -->
  <polygon points="66,80 72,58 84,78" fill="url(#ivyGrad)" stroke="#1E293B" stroke-width="2.5" />
  <polygon points="134,80 128,58 116,78" fill="url(#ivyGrad)" stroke="#1E293B" stroke-width="2.5" />
  <ellipse cx="100" cy="100" rx="44" ry="36" fill="url(#ivyGrad)" stroke="#1E293B" stroke-width="3" />

  <!-- 威武紅寶石眼睛 -->
  <polygon points="72,92 84,86 86,98 74,102" fill="#E11D48" stroke="#1E293B" stroke-width="2" />
  <circle cx="78" cy="92" r="3" fill="#FFF" />
  <polygon points="128,92 116,86 114,98 126,102" fill="#E11D48" stroke="#1E293B" stroke-width="2" />
  <circle cx="122" cy="92" r="3" fill="#FFF" />

  <!-- 鼻孔與長口獠牙 -->
  <circle cx="96" cy="104" r="1.5" fill="#134E4A" />
  <circle cx="104" cy="104" r="1.5" fill="#134E4A" />
  <path d="M 85 114 Q 100 124 115 114" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" />
  <polygon points="88,114 91,120 94,114" fill="#FFF" />
  <polygon points="106,114 109,120 112,114" fill="#FFF" />
</svg>'''

# 6. Venusaur (妙蛙花) - Giant tropical blooming flower & palm fronds
SVGS['venusaur.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="venuGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2DD4BF" />
      <stop offset="100%" stop-color="#0F766E" />
    </linearGradient>
    <radialGradient id="flowerGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEE2E2" />
      <stop offset="35%" stop-color="#F43F5E" />
      <stop offset="100%" stop-color="#BE123C" />
    </radialGradient>
  </defs>

  <!-- 茂密熱帶棕櫚大葉片 -->
  <path d="M 100 70 Q 20 40 10 75 Q 50 68 100 72 Z" fill="#16A34A" stroke="#1E293B" stroke-width="2" />
  <path d="M 100 70 Q 180 40 190 75 Q 150 68 100 72 Z" fill="#16A34A" stroke="#1E293B" stroke-width="2" />
  <path d="M 100 70 Q 30 15 65 10 Q 75 45 100 65 Z" fill="#22C55E" stroke="#1E293B" stroke-width="2" />
  <path d="M 100 70 Q 170 15 135 10 Q 125 45 100 65 Z" fill="#22C55E" stroke="#1E293B" stroke-width="2" />

  <!-- 盛開的巨大粉紅熱帶花朵 (Massive Blooming Tropical Flower) -->
  <ellipse cx="65" cy="45" rx="20" ry="14" fill="url(#flowerGrad)" stroke="#1E293B" stroke-width="2" />
  <ellipse cx="135" cy="45" rx="20" ry="14" fill="url(#flowerGrad)" stroke="#1E293B" stroke-width="2" />
  <ellipse cx="100" cy="32" rx="24" ry="16" fill="url(#flowerGrad)" stroke="#1E293B" stroke-width="2" />
  <ellipse cx="100" cy="55" rx="28" ry="18" fill="url(#flowerGrad)" stroke="#1E293B" stroke-width="2.5" />
  <!-- 花瓣白斑點 -->
  <circle cx="65" cy="45" r="3.5" fill="#FFF" />
  <circle cx="135" cy="45" r="3.5" fill="#FFF" />
  <circle cx="92" cy="32" r="3.5" fill="#FFF" />
  <circle cx="108" cy="32" r="3.5" fill="#FFF" />
  <circle cx="100" cy="55" r="5" fill="#FEF08A" stroke="#EAB308" stroke-width="1.5" />

  <!-- 巨厚身軀與疙瘩斑塊 -->
  <ellipse cx="100" cy="146" rx="56" ry="42" fill="url(#venuGrad)" stroke="#1E293B" stroke-width="3.5" />
  <circle cx="70" cy="138" r="5" fill="#115E59" />
  <circle cx="130" cy="138" r="5" fill="#115E59" />
  <circle cx="100" cy="160" r="4" fill="#115E59" />

  <!-- 粗重雙腳 -->
  <ellipse cx="62" cy="182" rx="18" ry="10" fill="url(#venuGrad)" stroke="#1E293B" stroke-width="3" />
  <ellipse cx="138" cy="182" rx="18" ry="10" fill="url(#venuGrad)" stroke="#1E293B" stroke-width="3" />

  <!-- 寬厚頭部與紅眼 -->
  <ellipse cx="100" cy="106" rx="48" ry="35" fill="url(#venuGrad)" stroke="#1E293B" stroke-width="3" />
  <ellipse cx="76" cy="100" rx="9" ry="11" fill="#DC2626" stroke="#1E293B" stroke-width="2" />
  <circle cx="74" cy="96" r="3" fill="#FFF" />
  <ellipse cx="124" cy="100" rx="9" ry="11" fill="#DC2626" stroke="#1E293B" stroke-width="2" />
  <circle cx="122" cy="96" r="3" fill="#FFF" />

  <!-- 大嘴與粗獷獠牙 -->
  <path d="M 78 118 Q 100 130 122 118" fill="none" stroke="#1E293B" stroke-width="3.5" stroke-linecap="round" />
  <polygon points="84,118 87,110 90,118" fill="#FFF" stroke="#1E293B" stroke-width="1" />
  <polygon points="110,118 113,110 116,118" fill="#FFF" stroke="#1E293B" stroke-width="1" />
</svg>'''

# 7. Alolan Raichu (阿羅拉雷丘) - Golden hover surfing lightning tail, blue eyes, rounded ears
SVGS['alolan_raichu.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="alolaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="surfTail" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="50%" stop-color="#FACC15" />
      <stop offset="100%" stop-color="#EAB308" />
    </linearGradient>
  </defs>

  <!-- 衝浪閃電巨尾板 (Surfboard Tail on Bottom) -->
  <path d="M 20 170 C 15 155 45 150 90 152 C 140 154 185 160 188 175 C 190 190 135 188 85 184 C 40 180 25 182 20 170 Z" fill="url(#surfTail)" stroke="#CA8A04" stroke-width="3.5" />
  <path d="M 60 162 Q 100 166 150 168" fill="none" stroke="#FEF08A" stroke-width="3" stroke-linecap="round" />

  <!-- 連接細尾巴 -->
  <path d="M 95 140 Q 60 150 50 162" fill="none" stroke="#78350F" stroke-width="4.5" stroke-linecap="round" />

  <!-- 圓潤身軀與雪白肚肚 -->
  <ellipse cx="100" cy="120" rx="40" ry="34" fill="url(#alolaGrad)" stroke="#1E293B" stroke-width="2.5" />
  <ellipse cx="100" cy="124" rx="24" ry="22" fill="#FEF9C3" stroke="#FDE047" stroke-width="1.5" />

  <!-- 小腳踏在衝浪尾巴上 -->
  <ellipse cx="78" cy="148" rx="11" ry="7" fill="#FEF9C3" stroke="#1E293B" stroke-width="2" />
  <ellipse cx="122" cy="148" rx="11" ry="7" fill="#FEF9C3" stroke="#1E293B" stroke-width="2" />

  <!-- 阿羅拉招牌圓弧大耳 (Rounded Swirl Ears) -->
  <ellipse cx="58" cy="52" rx="18" ry="24" transform="rotate(-25 58 52)" fill="url(#alolaGrad)" stroke="#1E293B" stroke-width="2.5" />
  <ellipse cx="58" cy="52" rx="10" ry="14" transform="rotate(-25 58 52)" fill="#FEF08A" />
  <ellipse cx="142" cy="52" rx="18" ry="24" transform="rotate(25 142 52)" fill="url(#alolaGrad)" stroke="#1E293B" stroke-width="2.5" />
  <ellipse cx="142" cy="52" rx="10" ry="14" transform="rotate(25 142 52)" fill="#FEF08A" />

  <!-- 圓滾滾頭部 -->
  <ellipse cx="100" cy="80" rx="44" ry="38" fill="url(#alolaGrad)" stroke="#1E293B" stroke-width="2.5" />

  <!-- 碧藍清澈大萌眼 (Crystal Blue Eyes) -->
  <ellipse cx="78" cy="76" rx="9" ry="13" fill="#0284C7" stroke="#1E293B" stroke-width="2" />
  <circle cx="76" cy="72" r="4" fill="#FFFFFF" />
  <circle cx="80" cy="82" r="2" fill="#BAE6FD" />
  <ellipse cx="122" cy="76" rx="9" ry="13" fill="#0284C7" stroke="#1E293B" stroke-width="2" />
  <circle cx="120" cy="72" r="4" fill="#FFFFFF" />
  <circle cx="124" cy="82" r="2" fill="#BAE6FD" />

  <!-- 燦爛黃色電氣臉頰電囊 -->
  <circle cx="62" cy="88" r="9" fill="#FACC15" stroke="#EAB308" stroke-width="1.5" />
  <circle cx="138" cy="88" r="9" fill="#FACC15" stroke="#EAB308" stroke-width="1.5" />

  <!-- 微笑小嘴 -->
  <circle cx="100" cy="84" r="1.5" fill="#78350F" />
  <path d="M 92 92 Q 100 99 108 92" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" />

  <!-- 可愛小手手 -->
  <ellipse cx="78" cy="112" rx="8" ry="6" fill="#FEF9C3" stroke="#1E293B" stroke-width="2" />
  <ellipse cx="122" cy="112" rx="8" ry="6" fill="#FEF9C3" stroke="#1E293B" stroke-width="2" />
</svg>'''

# 8. Sylveon (仙子伊布) - Pink & white ribbons, fairy bows, gentle blue eyes
SVGS['sylveon.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="sylvGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF5F7" />
      <stop offset="100%" stop-color="#FCE7F3" />
    </linearGradient>
  </defs>

  <!-- 飄逸仙子緞帶 (Fairy Ribbons) -->
  <path d="M 55 58 C 25 50 15 80 35 110 C 50 130 25 150 10 160" fill="none" stroke="#F472B6" stroke-width="8" stroke-linecap="round" />
  <path d="M 55 58 C 25 50 15 80 35 110 C 50 130 25 150 10 160" fill="none" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />
  <path d="M 145 58 C 175 50 185 80 165 110 C 150 130 175 150 190 160" fill="none" stroke="#F472B6" stroke-width="8" stroke-linecap="round" />
  <path d="M 145 58 C 175 50 185 80 165 110 C 150 130 175 150 190 160" fill="none" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />

  <!-- 長兔兔仙子耳 (Long Pink Tipped Ears) -->
  <ellipse cx="68" cy="38" rx="13" ry="34" transform="rotate(-18 68 38)" fill="url(#sylvGrad)" stroke="#1E293B" stroke-width="2.5" />
  <ellipse cx="68" cy="22" rx="11" ry="16" transform="rotate(-18 68 38)" fill="#F472B6" />
  <ellipse cx="132" cy="38" rx="13" ry="34" transform="rotate(18 132 38)" fill="url(#sylvGrad)" stroke="#1E293B" stroke-width="2.5" />
  <ellipse cx="132" cy="22" rx="11" ry="16" transform="rotate(18 132 38)" fill="#F472B6" />

  <!-- 耳朵上可愛蝴蝶結 -->
  <circle cx="68" cy="56" r="6" fill="#F472B6" stroke="#1E293B" stroke-width="1.5" />
  <polygon points="56,52 68,56 56,60" fill="#38BDF8" />
  <polygon points="80,52 68,56 80,60" fill="#38BDF8" />

  <!-- 嬌小身軀與粉白四肢 -->
  <ellipse cx="100" cy="140" rx="36" ry="32" fill="url(#sylvGrad)" stroke="#1E293B" stroke-width="2.5" />
  <ellipse cx="78" cy="172" rx="9" ry="8" fill="#F472B6" stroke="#1E293B" stroke-width="2" />
  <ellipse cx="122" cy="172" rx="9" ry="8" fill="#F472B6" stroke="#1E293B" stroke-width="2" />

  <!-- 脖子胸前大蝴蝶結 -->
  <circle cx="100" cy="115" r="7" fill="#F472B6" stroke="#1E293B" stroke-width="1.5" />
  <polygon points="85,110 100,115 85,120" fill="#38BDF8" />
  <polygon points="115,110 100,115 115,120" fill="#38BDF8" />

  <!-- 秀氣臉蛋 -->
  <ellipse cx="100" cy="85" rx="40" ry="34" fill="url(#sylvGrad)" stroke="#1E293B" stroke-width="2.5" />

  <!-- 夢幻天藍精靈眼 (Fairy Blue Eyes) -->
  <ellipse cx="80" cy="80" rx="8" ry="12" fill="#0284C7" stroke="#1E293B" stroke-width="2" />
  <circle cx="78" cy="76" r="4" fill="#FFFFFF" />
  <ellipse cx="120" cy="80" rx="8" ry="12" fill="#0284C7" stroke="#1E293B" stroke-width="2" />
  <circle cx="118" cy="76" r="4" fill="#FFFFFF" />

  <!-- 粉紅小鼻與微笑小嘴 -->
  <polygon points="98,87 102,87 100,90" fill="#F472B6" />
  <path d="M 94 94 Q 100 98 106 94" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round" />
</svg>'''

# 9. Espeon (太陽伊布) - Sleek lilac psychic cat, red forehead gem, fork tail
SVGS['espeon.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="espGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E9D5FF" />
      <stop offset="100%" stop-color="#C084FC" />
    </linearGradient>
  </defs>

  <!-- 背後優雅分岔細尾 (Split Fork Tail) -->
  <path d="M 65 140 Q 30 135 25 105 C 22 85 10 75 8 60" fill="none" stroke="#C084FC" stroke-width="6" stroke-linecap="round" />
  <path d="M 25 105 C 26 85 38 75 42 60" fill="none" stroke="#C084FC" stroke-width="6" stroke-linecap="round" />

  <!-- 兩隻尖尖大耳與黑色耳廓 -->
  <polygon points="52,70 45,25 76,55" fill="url(#espGrad)" stroke="#1E293B" stroke-width="2.5" />
  <polygon points="52,65 48,35 68,55" fill="#581C87" />
  <polygon points="148,70 155,25 124,55" fill="url(#espGrad)" stroke="#1E293B" stroke-width="2.5" />
  <polygon points="148,65 152,35 132,55" fill="#581C87" />

  <!-- 兩側臉頰招牌長毛叢 (Cheek Tuft Whisker Furs) -->
  <polygon points="55,90 35,95 52,105" fill="url(#espGrad)" stroke="#1E293B" stroke-width="2" />
  <polygon points="145,90 165,95 148,105" fill="url(#espGrad)" stroke="#1E293B" stroke-width="2" />

  <!-- 修長身軀與纖細四肢 -->
  <ellipse cx="100" cy="142" rx="36" ry="32" fill="url(#espGrad)" stroke="#1E293B" stroke-width="2.5" />
  <ellipse cx="78" cy="174" rx="8" ry="7" fill="url(#espGrad)" stroke="#1E293B" stroke-width="2" />
  <ellipse cx="122" cy="174" rx="8" ry="7" fill="url(#espGrad)" stroke="#1E293B" stroke-width="2" />

  <!-- 貓系神秘頭部 -->
  <ellipse cx="100" cy="85" rx="42" ry="36" fill="url(#espGrad)" stroke="#1E293B" stroke-width="2.5" />

  <!-- 額頭正中央閃耀的紅寶石 (Forehead Psychic Ruby Gem) -->
  <circle cx="100" cy="70" r="7" fill="#EF4444" stroke="#991B1B" stroke-width="2" />
  <circle cx="98" cy="68" r="2.5" fill="#FFF" />

  <!-- 紫羅蘭神秘大貓眼 (Deep Violet Feline Eyes) -->
  <ellipse cx="78" cy="84" rx="8" ry="12" fill="#7E22CE" stroke="#1E293B" stroke-width="2" />
  <circle cx="76" cy="80" r="3.5" fill="#FFFFFF" />
  <ellipse cx="122" cy="84" rx="8" ry="12" fill="#7E22CE" stroke="#1E293B" stroke-width="2" />
  <circle cx="120" cy="80" r="3.5" fill="#FFFFFF" />

  <!-- 櫻桃小口 -->
  <polygon points="98,92 102,92 100,95" fill="#7E22CE" />
  <path d="M 94 98 Q 100 102 106 98" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round" />
</svg>'''

for name, content in SVGS.items():
    path = os.path.join('assets/pokemon', name)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.strip())
    print(f"Created {path}")

print("All 9 evolution SVGs created successfully!")
