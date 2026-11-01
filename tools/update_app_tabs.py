import re

def main():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        code = f.read()

    # Find setupTabNavigation function
    target = '''  function setupTabNavigation() {

    dom.tabBtns.forEach(btn => {

      btn.addEventListener('click', () => {

        window.audioEngine.playPop();

        const tabTarget = btn.dataset.tab;



        dom.tabBtns.forEach(b => b.classList.remove('active'));

        dom.tabPanes.forEach(p => p.classList.remove('active'));



        btn.classList.add('active');
        try {
          btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } catch (e) {}

        const targetPane = document.getElementById(tabTarget);

        if (targetPane) {

          targetPane.classList.add('active');

        }

        if (tabTarget === 'tab-shop') {
          renderNurtureShop();
        }
        if (tabTarget === 'tab-gallery') {
          updatePokedexProgressUI();
          if (state.pokedexMode === 'gen1') {
            renderGen1Pokedex();
          } else {
            renderGallery();
          }
        }

        // 吉祥物鼓勵語音或提示
        const speeches = {
          'tab-adventure': '🗺️ 準備好前往道館闖關了嗎？點擊任何道館即可出發！',
          'tab-gallery': '🔴 歡迎來到 151 隻初代寶可夢注音圖鑑！每過一關都能解鎖收服！',
          'tab-achievements': '🏆 查看你辛苦獲得的道館榮譽徽章吧！',
          'tab-shop': '🛍️ 歡迎來到培育商店！用闖關獲得的金幣餵食夥伴、換購皇冠吧！'
        };

        if (speeches[tabTarget]) {

          setMascotSpeech(speeches[tabTarget]);

        }

      });

    });



    // 點擊 Logo 回到首頁

    const btnHome = document.getElementById('btn-home-logo');

    if (btnHome) {

      btnHome.addEventListener('click', () => {

        dom.tabBtns[0].click();

        showAdventureMap();

      });

    }

    // 冒險金幣培育商店快捷按鈕
    const btnCoin = document.getElementById('header-coin-btn');
    if (btnCoin) {
      btnCoin.addEventListener('click', () => {
        window.audioEngine.playPop();
        const shopTab = Array.from(dom.tabBtns).find(b => b.dataset.tab === 'tab-shop');
        if (shopTab) {
          shopTab.click();
        }
      });
    }



    // 榮譽星光榜快捷按鈕

    const btnStar = document.getElementById('header-star-btn');

    if (btnStar) {

      btnStar.addEventListener('click', () => {

        const achTab = Array.from(dom.tabBtns).find(b => b.dataset.tab === 'tab-achievements');

        if (achTab) achTab.click();

      });

    }

  }'''

    replacement = '''  function switchTab(tabTarget) {
    dom.tabBtns.forEach(b => {
      if (b.dataset.tab === tabTarget) {
        b.classList.add('active');
        try {
          b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } catch (e) {}
      } else {
        b.classList.remove('active');
      }
    });

    dom.tabPanes.forEach(p => {
      p.classList.toggle('active', p.id === tabTarget);
    });

    if (tabTarget === 'tab-shop') {
      renderNurtureShop();
    }
    if (tabTarget === 'tab-gallery') {
      updatePokedexProgressUI();
      if (state.pokedexMode === 'gen1') {
        renderGen1Pokedex();
      } else {
        renderGallery();
      }
    }

    // 吉祥物鼓勵語音或提示
    const speeches = {
      'tab-adventure': '🗺️ 準備好前往道館闖關了嗎？點擊任何道館即可出發！',
      'tab-gallery': '🔴 歡迎來到 151 隻初代寶可夢注音圖鑑！每過一關都能解鎖收服！',
      'tab-achievements': '🏆 查看你辛苦獲得的道館榮譽徽章吧！',
      'tab-shop': '🛍️ 歡迎來到培育商店！用闖關獲得的金幣餵食夥伴、換購皇冠吧！'
    };

    if (speeches[tabTarget]) {
      setMascotSpeech(speeches[tabTarget]);
    }
  }
  window.switchToTab = switchTab;

  function setupTabNavigation() {
    dom.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        window.audioEngine.playPop();
        switchTab(btn.dataset.tab);
      });
    });

    // 點擊 Logo 回到首頁
    const btnHome = document.getElementById('btn-home-logo');
    if (btnHome) {
      btnHome.addEventListener('click', () => {
        switchTab('tab-adventure');
        showAdventureMap();
      });
    }

    // 冒險金幣培育商店快捷按鈕（直接前往培育商店）
    const btnCoin = document.getElementById('header-coin-btn');
    if (btnCoin) {
      btnCoin.addEventListener('click', () => {
        window.audioEngine.playPop();
        switchTab('tab-shop');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 榮譽星光榜快捷按鈕（直接查看道館徽章盒）
    const btnStar = document.getElementById('header-star-btn');
    if (btnStar) {
      btnStar.addEventListener('click', () => {
        window.audioEngine.playPop();
        switchTab('tab-achievements');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }'''

    if target in code:
        code = code.replace(target, replacement)
        with open('js/app.js', 'w', encoding='utf-8') as f:
            f.write(code)
        print('Successfully replaced setupTabNavigation in js/app.js')
    else:
        print('Could not find exact target, attempting normalized replacement...')
        # Try finding by regex
        pattern = re.compile(r'function setupTabNavigation\(\)\s*\{[\s\S]*?const btnStar = document\.getElementById\(\x27header-star-btn\x27\);[\s\S]*?\}\s*\}')
        m = pattern.search(code)
        if m:
            code = code[:m.start()] + replacement.strip() + code[m.end():]
            with open('js/app.js', 'w', encoding='utf-8') as f:
                f.write(code)
            print('Successfully replaced using regex!')
        else:
            print('Failed to find pattern with regex.')

if __name__ == '__main__':
    main()
