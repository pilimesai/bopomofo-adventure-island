import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Replace <nav class="tab-navigation"> to strictly contain only the 2 buttons: 道館闖關 & 注音圖鑑
    new_nav = '''  <!-- 功能選單分頁列 -->
  <nav class="tab-navigation" aria-label="學習專區切換">
    <button class="tab-btn active" data-tab="tab-adventure">
      <span class="tab-icon">🗺️</span>
      <span>道館闖關</span>
    </button>
    <button class="tab-btn" data-tab="tab-gallery">
      <span class="pokeball-icon-btn" style="width:22px;height:22px;display:inline-block;vertical-align:middle;margin-right:4px;border-width:2px;"></span>
      <span>注音圖鑑</span>
    </button>
  </nav>'''

    html = re.sub(r'  <!-- 功能選單分頁列 -->\s*<nav class="tab-navigation"[\s\S]*?</nav>', new_nav, html)

    # In #tab-achievements, add return to adventure button if not present
    if 'back-to-adventure-achieve' not in html:
        achieve_back_btn = '''    <section class="tab-pane" id="tab-achievements">
      <div style="margin-bottom:14px;">
        <button class="btn btn-secondary back-to-adventure-achieve" style="display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:24px;font-weight:900;cursor:pointer;background:#FFF;border:2px solid #CBD5E1;box-shadow:0 3px 0 #CBD5E1;" onclick="window.switchToTab('tab-adventure')">
          <span>🗺️ 返回道館闖關</span>
        </button>
      </div>'''
        html = html.replace('    <section class="tab-pane" id="tab-achievements">', achieve_back_btn)

    # In #tab-shop, add return to adventure button if not present
    if 'back-to-adventure-shop' not in html:
        shop_back_btn = '''    <section class="tab-pane" id="tab-shop">
      <div style="margin-bottom:14px;">
        <button class="btn btn-secondary back-to-adventure-shop" style="display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:24px;font-weight:900;cursor:pointer;background:#FFF;border:2px solid #CBD5E1;box-shadow:0 3px 0 #CBD5E1;" onclick="window.switchToTab('tab-adventure')">
          <span>🗺️ 返回道館闖關</span>
        </button>
      </div>'''
        html = html.replace('    <section class="tab-pane" id="tab-shop">', shop_back_btn)

    # Bump version to v=54
    html = re.sub(r'\?v=\d+', '?v=54', html)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('index.html updated successfully.')

if __name__ == '__main__':
    main()
