css_to_append = """
/* ==========================================================================
   🗺️ 10 大道館巡迴冒險大地圖與訓練師移動系統 (Adventure World Map & Moving Trainer)
   ========================================================================== */

.map-view-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin: 14px 0 10px 0;
}

.map-instruction-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #EFF6FF;
  border: 2px solid #BFDBFE;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 800;
  color: #1E3A8A;
  box-shadow: 0 2px 6px rgba(30, 58, 138, 0.06);
}

.map-instruction-pill .pulse-icon {
  animation: pulseIcon 1.5s infinite;
  font-size: 18px;
}

@keyframes pulseIcon {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.map-view-mode-tabs {
  display: inline-flex;
  gap: 6px;
  background: #E2E8F0;
  padding: 4px;
  border-radius: 14px;
}

.map-mode-tab {
  border: none;
  background: transparent;
  padding: 7px 16px;
  border-radius: 10px;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 800;
  color: #64748B;
  cursor: pointer;
  transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.map-mode-tab.active {
  background: #FFFFFF;
  color: #0F172A;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
  transform: translateY(-1px);
}

/* 🗺️ 大地圖容器 */
.pokemon-world-map-wrap {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 24px;
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.1);
  border: 4px solid #7DD3FC;
  background: #E0F2FE;
  margin-bottom: 24px;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: rgba(14, 165, 233, 0.5) transparent;
}

.pokemon-world-map-board {
  position: relative;
  width: 100%;
  min-width: 960px;
  height: 650px;
  background: radial-gradient(circle at 50% 30%, #E0F2FE 0%, #D1FAE5 45%, #FEF3C7 75%, #FEE2E2 100%);
  overflow: hidden;
  user-select: none;
}

/* 背景地貌裝飾層 */
.map-decor-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.decor-elem {
  position: absolute;
  opacity: 0.8;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.06));
}

.decor-elem.cloud-1 { top: 6%; left: 24%; font-size: 32px; animation: cloudFloat1 22s linear infinite; }
.decor-elem.cloud-2 { top: 38%; left: 6%; font-size: 28px; animation: cloudFloat2 28s linear infinite; }
.decor-elem.wave-1 { top: 12%; left: 45%; font-size: 24px; opacity: 0.6; }
.decor-elem.wave-2 { top: 72%; left: 32%; font-size: 24px; opacity: 0.6; }
.decor-elem.trees-nw { top: 10%; left: 4%; font-size: 32px; }
.decor-elem.trees-se { top: 68%; left: 26%; font-size: 32px; }
.decor-elem.volcano-bg { top: 44%; left: 9%; font-size: 38px; opacity: 0.85; filter: drop-shadow(0 0 12px rgba(239, 68, 68, 0.4)); }
.decor-elem.ice-peaks { top: 74%; left: 4%; font-size: 36px; opacity: 0.85; }
.decor-elem.league-palace { top: 70%; left: 91%; font-size: 38px; opacity: 0.95; filter: drop-shadow(0 0 12px rgba(245, 158, 11, 0.5)); }

@keyframes cloudFloat1 {
  0% { transform: translateX(0); }
  50% { transform: translateX(45px); }
  100% { transform: translateX(0); }
}

@keyframes cloudFloat2 {
  0% { transform: translateX(0); }
  50% { transform: translateX(-40px); }
  100% { transform: translateX(0); }
}

/* SVG 路線線路 */
.map-road-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.road-path-base {
  fill: none;
  stroke: #FDE68A;
  stroke-width: 28;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 5px 6px rgba(180, 83, 9, 0.18));
}

.road-path-dash {
  fill: none;
  stroke: #D97706;
  stroke-width: 4;
  stroke-dasharray: 8 16;
  stroke-linecap: round;
  opacity: 0.75;
}

.road-path-active {
  fill: none;
  stroke: #10B981;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 12 10;
  animation: activeRoadGlow 1.2s linear infinite;
  filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.7));
}

@keyframes activeRoadGlow {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -22; }
}

/* 關卡地標層 */
.map-landmarks-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  pointer-events: none;
}

.map-landmark-node {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.map-landmark-node:hover {
  transform: translate(-50%, -56%) scale(1.12);
  z-index: 8;
}

.map-landmark-node.locked {
  filter: grayscale(85%) opacity(0.65);
  cursor: not-allowed;
}

.landmark-badge-top {
  font-size: 11px;
  font-weight: 900;
  color: #FFFFFF;
  padding: 2px 9px;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.18);
  margin-bottom: -7px;
  z-index: 3;
  white-space: nowrap;
  letter-spacing: 0.5px;
}

.landmark-icon-bubble {
  position: relative;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 4px solid #FFFFFF;
  box-shadow: 0 8px 18px rgba(0,0,0,0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.landmark-emoji {
  font-size: 34px;
}

.landmark-beacon-ring {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  border: 3.5px solid #EF4444;
  animation: beaconPulse 1.5s ease-out infinite;
  pointer-events: none;
}

.map-landmark-node.current-target .landmark-icon-bubble {
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.6), 0 8px 18px rgba(0,0,0,0.16);
}

.landmark-cleared-star {
  position: absolute;
  top: -6px;
  right: -6px;
  font-size: 18px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));
}

.landmark-crown-star {
  position: absolute;
  top: -12px;
  font-size: 18px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.landmark-title-plate {
  margin-top: 4px;
  background: rgba(255, 255, 255, 0.95);
  padding: 4px 10px;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.08);
  border: 1.5px solid #E2E8F0;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
}

.landmark-name {
  font-size: 12px;
  font-weight: 900;
  color: #1E293B;
}

.landmark-stars-row {
  font-size: 10.5px;
  letter-spacing: 1px;
}

.landmark-boss-tag {
  margin-top: 3px;
  background: #FFFFFF;
  border: 1.5px solid #CBD5E1;
  border-radius: 8px;
  padding: 1px 7px;
  font-size: 10px;
  font-weight: 800;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 3px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

/* 🏃 訓練師移動標記 (Animated Moving Trainer) */
.map-trainer-marker {
  position: absolute;
  transform: translate(-50%, -80%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  transition: left 0.88s cubic-bezier(0.25, 1, 0.5, 1), top 0.88s cubic-bezier(0.25, 1, 0.5, 1);
}

.trainer-sprite-duo {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  filter: drop-shadow(0 6px 12px rgba(0,0,0,0.3));
  transition: transform 0.2s;
}

.trainer-avatar-emoji {
  font-size: 44px;
  line-height: 1;
}

.trainer-partner-emoji {
  font-size: 32px;
  line-height: 1;
  margin-bottom: 2px;
  animation: partnerHop 1.2s ease-in-out infinite alternate;
}

@keyframes partnerHop {
  0% { transform: translateY(0); }
  100% { transform: translateY(-5px); }
}

.trainer-ground-shadow {
  width: 48px;
  height: 10px;
  background: rgba(0, 0, 0, 0.28);
  border-radius: 50%;
  margin-top: -3px;
  filter: blur(2px);
}

/* 跑步狀態 */
.map-trainer-marker.is-walking .trainer-sprite-duo {
  animation: trainerRunBob 0.22s infinite alternate ease-in-out;
}

@keyframes trainerRunBob {
  0% { transform: translateY(0) rotate(-4deg); }
  100% { transform: translateY(-12px) rotate(4deg); }
}

.trainer-bubble-cloud {
  background: #FFFFFF;
  border: 2.5px solid #F59E0B;
  color: #92400E;
  font-size: 12.5px;
  font-weight: 900;
  padding: 5px 12px;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);
  white-space: nowrap;
  margin-bottom: 6px;
  position: relative;
  opacity: 0;
  transform: translateY(8px) scale(0.9);
  transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}

.trainer-bubble-cloud.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.trainer-bubble-cloud::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px 5px 0 5px;
  border-style: solid;
  border-color: #F59E0B transparent transparent transparent;
}
"""

with open('css/style.css', 'a', encoding='utf-8') as f:
    f.write(css_to_append)

print("Appended world map CSS to css/style.css")
