import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

replacement_code = """  const STAGE_MAP_COORDS = {
    1: { x: 120, y: 120, left: '12%', top: '18.5%' },
    2: { x: 350, y: 100, left: '35%', top: '15.4%' },
    3: { x: 620, y: 110, left: '62%', top: '16.9%' },
    4: { x: 860, y: 160, left: '86%', top: '24.6%' },
    5: { x: 760, y: 320, left: '76%', top: '49.2%' },
    6: { x: 480, y: 290, left: '48%', top: '44.6%' },
    7: { x: 180, y: 340, left: '18%', top: '52.3%' },
    8: { x: 140, y: 520, left: '14%', top: '80.0%' },
    9: { x: 460, y: 540, left: '46%', top: '83.1%' },
    10: { x: 840, y: 530, left: '84%', top: '81.5%' }
  };

  const ROAD_SEGMENTS = [
    "M 120,120 C 230,110 280,100 350,100", // 1 -> 2
    "C 440,100 530,105 620,110",           // 2 -> 3
    "C 720,115 800,120 860,160",           // 3 -> 4
    "C 920,200 860,280 760,320",           // 4 -> 5
    "C 670,340 570,280 480,290",           // 5 -> 6
    "C 380,300 270,320 180,340",           // 6 -> 7
    "C 90,360 80,470 140,520",             // 7 -> 8
    "C 240,560 360,530 460,540",           // 8 -> 9
    "C 580,550 720,540 840,530"            // 9 -> 10
  ];

  let isTrainerMoving = false;

  function updateMapTrainerVisuals() {
    const avatarEl = document.getElementById('map-trainer-avatar');
    const petEl = document.getElementById('map-trainer-partner');
    if (!avatarEl || !petEl) return;

    const charAvatar = (state.profile && state.profile.avatar) ? state.profile.avatar : '👦';
    avatarEl.textContent = charAvatar;

    const partner = (typeof getCurrentPartnerInfo === 'function') ? getCurrentPartnerInfo() : null;
    if (partner && partner.icon) {
      petEl.textContent = partner.icon;
    } else {
      petEl.textContent = '⚡';
    }
  }

  function moveTrainerToStage(stage, onArrive) {
    if (isTrainerMoving) return;
    const marker = document.getElementById('map-trainer-marker');
    const bubble = document.getElementById('trainer-bubble-cloud');
    const duo = document.getElementById('trainer-sprite-duo');

    if (!marker) {
      if (onArrive) onArrive();
      return;
    }

    const targetCoords = STAGE_MAP_COORDS[stage.id] || STAGE_MAP_COORDS[1];
    const currentLeft = parseFloat(marker.style.left) || 12;
    const targetLeft = parseFloat(targetCoords.left);

    // 面向移動方向
    if (duo) {
      if (targetLeft < currentLeft) {
        duo.style.transform = 'scaleX(-1)';
      } else {
        duo.style.transform = 'scaleX(1)';
      }
    }

    // 若本來就已經在此關卡，小跳躍直接進入
    if (Math.abs(targetLeft - currentLeft) < 1.5 && Math.abs(parseFloat(marker.style.top) - parseFloat(targetCoords.top)) < 1.5) {
      if (bubble) {
        bubble.textContent = `進入【${stage.name}】對決！`;
        bubble.classList.add('visible');
      }
      window.audioEngine.playPop();
      setTimeout(() => {
        if (bubble) bubble.classList.remove('visible');
        if (onArrive) onArrive();
      }, 350);
      return;
    }

    // 啟動跑步移動
    isTrainerMoving = true;
    marker.classList.add('is-walking');
    if (bubble) {
      bubble.textContent = `出發！前往【${stage.name}】！`;
      bubble.classList.add('visible');
    }
    window.audioEngine.playPop();

    // 移動到目標座標
    marker.style.left = targetCoords.left;
    marker.style.top = targetCoords.top;
    state.adventure.trainerStageId = stage.id;
    localStorage.setItem('zhuyin_trainer_stage', stage.id.toString());

    setTimeout(() => {
      marker.classList.remove('is-walking');
      if (bubble) {
        bubble.textContent = `抵達道館！`;
      }
      if (window.audioEngine.playBadgeGet) {
        window.audioEngine.playBadgeGet();
      }
      if (window.confetti) window.confetti.trigger(35);

      setTimeout(() => {
        isTrainerMoving = false;
        if (bubble) bubble.classList.remove('visible');
        if (onArrive) onArrive();
      }, 400);
    }, 900);
  }

  function renderAdventureMap() {
    const stages = ZHUYIN_DATA.adventureStages || [];
    let clearedCount = 0;
    let totalStageStars = 0;
    let latestTargetId = 1;

    stages.forEach(s => {
      const earned = state.adventure.stageStars[String(s.id)] || 0;
      if (earned > 0) {
        clearedCount++;
        totalStageStars += earned;
        if (s.id < stages.length) latestTargetId = s.id + 1;
      }
    });

    if (dom.advClearedCount) dom.advClearedCount.textContent = `${clearedCount} / ${stages.length}`;
    if (dom.advStageStars) dom.advStageStars.textContent = `${totalStageStars} / ${stages.length * 3}`;

    updateTrainerHeaderUI();
    if (typeof ensureStartersInGen1Caught === 'function') {
      ensureStartersInGen1Caught();
    }
    renderGymBadges();

    // 1. 渲染大地圖道路的高亮金色已通關路段
    const activeRoadSvg = document.getElementById('svg-road-active');
    if (activeRoadSvg) {
      let activePathD = '';
      for (let i = 1; i <= clearedCount && i < stages.length; i++) {
        activePathD += (activePathD ? ' ' : '') + ROAD_SEGMENTS[i - 1];
      }
      activeRoadSvg.setAttribute('d', activePathD);
    }

    // 2. 訓練師初始定位 (若有紀錄則定位在紀錄處，否則定位在當前挑戰關卡)
    updateMapTrainerVisuals();
    const trainerMarker = document.getElementById('map-trainer-marker');
    if (trainerMarker && !isTrainerMoving) {
      const savedStageId = parseInt(localStorage.getItem('zhuyin_trainer_stage') || String(latestTargetId), 10);
      const initialStageId = Math.min(Math.max(1, savedStageId), stages.length);
      const initialCoords = STAGE_MAP_COORDS[initialStageId] || STAGE_MAP_COORDS[1];
      trainerMarker.style.left = initialCoords.left;
      trainerMarker.style.top = initialCoords.top;
      state.adventure.trainerStageId = initialStageId;
    }

    // 3. 渲染大地圖 10 個道館節點地標
    const landmarksLayer = document.getElementById('map-landmarks-layer');
    if (landmarksLayer) {
      landmarksLayer.innerHTML = '';
      stages.forEach(stage => {
        const coords = STAGE_MAP_COORDS[stage.id] || { left: '50%', top: '50%' };
        const unlocked = isStageUnlocked(stage.id);
        const earnedStars = state.adventure.stageStars[String(stage.id)] || 0;
        const isCurrentTarget = unlocked && earnedStars === 0 && stage.id === latestTargetId;
        const badge = (ZHUYIN_DATA.gymBadges || []).find(b => b.stageId === stage.id);
        const starStr = [1, 2, 3].map(n => (n <= earnedStars ? '⭐' : '☆')).join('');

        const node = document.createElement('div');
        node.className = `map-landmark-node ${unlocked ? 'unlocked' : 'locked'} ${earnedStars > 0 ? 'cleared' : ''} ${isCurrentTarget ? 'current-target' : ''}`;
        node.style.left = coords.left;
        node.style.top = coords.top;
        node.title = `${stage.name}（館主：${stage.bossName}）`;

        node.innerHTML = `
          <div class="landmark-badge-top" style="background:${unlocked ? stage.color : '#94A3B8'};">
            道館 ${stage.id}
          </div>
          <div class="landmark-icon-bubble" style="background:${unlocked ? stage.bgGradient : '#E2E8F0'}; border-color:${unlocked ? stage.color : '#CBD5E1'};">
            <span class="landmark-emoji">${unlocked ? stage.icon : '🔒'}</span>
            ${isCurrentTarget ? '<div class="landmark-beacon-ring"></div>' : ''}
            ${earnedStars > 0 ? '<span class="landmark-cleared-star">⭐</span>' : ''}
            ${earnedStars === 3 ? '<span class="landmark-crown-star">👑</span>' : ''}
          </div>
          <div class="landmark-title-plate">
            <strong class="landmark-name">${badge ? badge.gym : stage.name}</strong>
            <div class="landmark-stars-row" style="color:${earnedStars > 0 ? '#F59E0B' : '#CBD5E1'};">
              ${starStr}
            </div>
          </div>
          <div class="landmark-boss-tag" style="border-color:${unlocked ? stage.color : '#CBD5E1'};">
            <span>${stage.bossIcon}</span>
            <span>${stage.bossName}</span>
          </div>
        `;

        node.addEventListener('click', () => {
          if (isTrainerMoving) return;
          if (!unlocked) {
            window.audioEngine.playWrong();
            const bubble = document.getElementById('trainer-bubble-cloud');
            if (bubble) {
              bubble.textContent = '要先通過前面的道館喔！';
              bubble.classList.add('visible');
              setTimeout(() => bubble.classList.remove('visible'), 1600);
            }
            window.audioEngine.speak('要先通過前面的道館，才能挑戰這一座道館！也可以開啟自由選關！');
            return;
          }

          moveTrainerToStage(stage, () => {
            startStageBattle(stage);
          });
        });

        landmarksLayer.appendChild(node);
      });
    }

    // 4. 同步渲染備用清單檢視 (Card Grid)
    if (dom.advStagesGrid) {
      dom.advStagesGrid.innerHTML = '';
      stages.forEach(stage => {
        const unlocked = isStageUnlocked(stage.id);
        const earnedStars = state.adventure.stageStars[String(stage.id)] || 0;
        const isCurrentTarget = unlocked && earnedStars === 0 && stage.id === latestTargetId;
        const badge = (ZHUYIN_DATA.gymBadges || []).find(b => b.stageId === stage.id);
        const starStr = [1, 2, 3].map(n => (n <= earnedStars ? '⭐' : '☆')).join('');

        const card = document.createElement('div');
        card.className = `stage-node-card ${unlocked ? '' : 'locked'} ${isCurrentTarget ? 'current-target' : ''}`;
        if (unlocked && earnedStars > 0) {
          card.style.borderColor = stage.color;
        }

        card.innerHTML = `
          <div>
            <div class="stage-top-row">
              <div style="display:flex;align-items:center;gap:6px;">
                <span class="stage-num-badge" style="background:${unlocked ? stage.color : '#ADB5BD'};">
                  道館 ${stage.id}
                </span>
                <span class="battle-diff-badge ${state.examDifficulty === 'final' ? 'final' : 'midterm'}" style="font-size:11px;padding:2px 8px;">
                  ${state.examDifficulty === 'final' ? '🦅 期末段考題' : '🏛️ 小一段考 1:1 原卷'}
                </span>
              </div>
              <span class="stage-stars-row" style="color:${earnedStars > 0 ? '#FCC419' : '#CED4DA'};">
                ${starStr}
              </span>
            </div>
            <div class="stage-main-hero">
              <div class="stage-icon-circle" style="background:${unlocked ? stage.bgGradient : '#E9ECEF'};">
                ${unlocked ? stage.icon : '🔒'}
              </div>
              <div class="stage-title-info">
                <h3>${badge ? badge.gym : stage.name}</h3>
                <div class="stage-sub">${stage.subtitle}</div>
              </div>
            </div>
            <div class="stage-desc-text">${stage.desc}</div>
          </div>
          <div class="stage-footer-row">
            <div class="stage-boss-tag">
              <span>${stage.bossIcon}</span>
              <span>館主：${stage.bossName}</span>
              ${badge ? `<span style="margin-left:6px;font-size:12px;color:${earnedStars > 0 ? '#F59E0B' : '#94A3B8'};font-weight:900;">[${badge.name}]</span>` : ''}
            </div>
            <button class="stage-play-btn">
              ${!unlocked ? '🔒 未解鎖' : earnedStars > 0 ? '🔄 再次挑戰' : '🔴 進入道館挑戰'}
            </button>
          </div>
        `;

        card.addEventListener('click', () => {
          if (!unlocked) {
            window.audioEngine.playWrong();
            window.audioEngine.speak('要先通過前面的道館，才能挑戰這一座道館！也可以開啟自由選關！');
            return;
          }
          window.audioEngine.playPop();
          startStageBattle(stage);
        });

        dom.advStagesGrid.appendChild(card);
      });
    }

    // 5. 綁定切換按鈕事件
    const btnWorldMap = document.getElementById('btn-mode-world-map');
    const btnStageCards = document.getElementById('btn-mode-stage-cards');
    const worldMapWrap = document.getElementById('pokemon-world-map-wrap');
    if (btnWorldMap && btnStageCards && worldMapWrap && !btnWorldMap.dataset.bound) {
      btnWorldMap.dataset.bound = 'true';
      btnWorldMap.addEventListener('click', () => {
        btnWorldMap.classList.add('active');
        btnStageCards.classList.remove('active');
        worldMapWrap.style.display = 'block';
        if (dom.advStagesGrid) dom.advStagesGrid.style.display = 'none';
      });

      btnStageCards.addEventListener('click', () => {
        btnStageCards.classList.add('active');
        btnWorldMap.classList.remove('active');
        worldMapWrap.style.display = 'none';
        if (dom.advStagesGrid) dom.advStagesGrid.style.display = 'grid';
      });
    }
  }"""

# Replace from `function renderAdventureMap() {` to the end of that function
# Find start of renderAdventureMap
start_idx = code.find("function renderAdventureMap() {")
assert start_idx != -1, "renderAdventureMap not found"

# Find start of startStageBattle(stage)
end_idx = code.find("function startStageBattle(stage) {", start_idx)
assert end_idx != -1, "startStageBattle not found"

new_code = code[:start_idx] + replacement_code + "\n\n  " + code[end_idx:]

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(new_code)

print("Successfully replaced renderAdventureMap in js/app.js!")
