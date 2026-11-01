import re

replacement = """        <!-- 🗺️ 視圖控制與提示列 -->
        <div class="map-view-header-bar">
          <div class="map-instruction-pill">
            <span class="pulse-icon">🗺️</span>
            <strong>冒險島大地圖：</strong>點選亮起的道館，訓練師就會跑過去展開對決挑戰！
          </div>
          <div class="map-view-mode-tabs">
            <button class="map-mode-tab active" id="btn-mode-world-map" type="button">
              <span>🗺️</span> 冒險巡迴地圖
            </button>
            <button class="map-mode-tab" id="btn-mode-stage-cards" type="button">
              <span>📋</span> 關卡清單
            </button>
          </div>
        </div>

        <!-- 🗺️ 10 大道館巡迴冒險大地圖 (World Map Canvas) -->
        <div class="pokemon-world-map-wrap" id="pokemon-world-map-wrap">
          <div class="pokemon-world-map-board" id="pokemon-world-map-board">
            <!-- 地貌環境背景裝飾元素 -->
            <div class="map-decor-layer">
              <span class="decor-elem cloud-1">☁️</span>
              <span class="decor-elem cloud-2">☁️</span>
              <span class="decor-elem wave-1">🌊</span>
              <span class="decor-elem wave-2">🌊</span>
              <span class="decor-elem trees-nw">🌲🌲</span>
              <span class="decor-elem trees-se">🌴</span>
              <span class="decor-elem volcano-bg">🌋</span>
              <span class="decor-elem ice-peaks">🏔️❄️</span>
              <span class="decor-elem league-palace">✨🏛️✨</span>
            </div>

            <!-- SVG 冒險道路軌道線 -->
            <svg class="map-road-svg" id="map-road-svg" viewBox="0 0 1000 650" preserveAspectRatio="none">
              <!-- 鋪底寬泥土/石板路 -->
              <path id="svg-road-base" class="road-path-base" d="M 120,120 C 230,110 280,100 350,100 C 440,100 530,105 620,110 C 720,115 800,120 860,160 C 920,200 860,280 760,320 C 670,340 570,280 480,290 C 380,300 270,320 180,340 C 90,360 80,470 140,520 C 240,560 360,530 460,540 C 580,550 720,540 840,530" />
              <!-- 道路中心碎石斑馬線 -->
              <path id="svg-road-dash" class="road-path-dash" d="M 120,120 C 230,110 280,100 350,100 C 440,100 530,105 620,110 C 720,115 800,120 860,160 C 920,200 860,280 760,320 C 670,340 570,280 480,290 C 380,300 270,320 180,340 C 90,360 80,470 140,520 C 240,560 360,530 460,540 C 580,550 720,540 840,530" />
              <!-- 已通關金色發光路線 -->
              <path id="svg-road-active" class="road-path-active" d="" />
            </svg>

            <!-- 訓練師移動標記 (含訓練家頭像、跟隨的寶可夢、對話泡泡) -->
            <div class="map-trainer-marker" id="map-trainer-marker">
              <div class="trainer-bubble-cloud" id="trainer-bubble-cloud">準備出發！</div>
              <div class="trainer-sprite-duo" id="trainer-sprite-duo">
                <span class="trainer-avatar-emoji" id="map-trainer-avatar">👦</span>
                <span class="trainer-partner-emoji" id="map-trainer-partner">⚡</span>
              </div>
              <div class="trainer-ground-shadow"></div>
            </div>

            <!-- 10 大道館地標節點容器 -->
            <div class="map-landmarks-layer" id="map-landmarks-layer">
              <!-- 由 JS 動態生成 10 個道館節點地標 -->
            </div>
          </div>
        </div>

        <!-- 10 大關卡路線圖 (備用卡片清單檢視) -->
        <div class="adventure-stages-grid" id="adventure-stages-grid" style="display:none;">
          <!-- 由 JS 動態渲染 10 座島嶼關卡卡片 -->
        </div>"""

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'[ \t]*<!-- 10 大關卡路線圖 -->\s*<div class="adventure-stages-grid" id="adventure-stages-grid">\s*<!-- 由 JS 動態渲染 10 座島嶼關卡卡片 -->\s*</div>'
new_text, count = re.subn(pattern, replacement, text)

assert count == 1, f"Expected 1 match, found {count}"

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Successfully replaced in index.html!")
