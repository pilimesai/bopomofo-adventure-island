/**
 * ㄅㄆㄇ 快樂冒險島 - 音效與語音合成引擎
 * 結合 Web Speech API (台灣國語發音 zh-TW) 與 Web Audio API 合成音效
 */

class ZhuyinAudioEngine {
  constructor() {
    this.ctx = null;
    this.synth = window.speechSynthesis;
    this.taiwanVoice = null;
    this.selectedVoiceName = localStorage.getItem('zhuyin_selected_voice') || '';
    this.isMuted = false;
    this.speechRate = parseFloat(localStorage.getItem('zhuyin_speech_rate') || '0.86');
    this.speechPitch = parseFloat(localStorage.getItem('zhuyin_speech_pitch') || '1.12'); // 台灣國小溫柔親切的老師音調
    this.initAudioContext();
    this.loadVoices();
  }

  initAudioContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.ctx = new AudioContext();
    }
  }

  ensureAudioContext() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  isForbiddenMainlandVoice(v) {
    if (!v) return true;
    const name = (v.name || '').toLowerCase();
    const lang = (v.lang || '').toLowerCase();
    // 嚴格剔除所有中國大陸語音、簡體語音、普通話、兒化音及北方腔
    return (
      lang.includes('cn') ||
      lang.includes('hans') ||
      lang.includes('sg') ||
      name.includes('china') ||
      name.includes('mainland') ||
      name.includes('普通话') ||
      name.includes('普通話') ||
      name.includes('xiaoxiao') ||
      name.includes('yunxi') ||
      name.includes('yunjian') ||
      name.includes('xiaoyi') ||
      name.includes('kangkang') ||
      name.includes('yaoyao') ||
      name.includes('huihui') ||
      name.includes('liaoning') ||
      name.includes('shaanxi') ||
      name.includes('simplified')
    );
  }

  isTaiwanVoice(v) {
    if (!v || this.isForbiddenMainlandVoice(v)) return false;
    const name = v.name || '';
    const lang = v.lang || '';
    return (
      lang === 'zh-TW' ||
      lang === 'zh-Hant-TW' ||
      name.includes('Taiwan') ||
      name.includes('臺灣') ||
      name.includes('台灣') ||
      name.includes('Yating') ||
      name.includes('雅婷') ||
      name.includes('Zhiwei') ||
      name.includes('志偉') ||
      name.includes('HsiaoChen') ||
      name.includes('曉臻') ||
      name.includes('YunJhe') ||
      name.includes('雲哲') ||
      name.includes('Hanhan')
    );
  }

  loadVoices() {
    if (!this.synth) return;
    const findVoice = () => {
      const voices = this.synth.getVoices();
      if (!voices || voices.length === 0) return;

      // 嚴格過濾出純台灣語音清單
      const taiwanVoices = voices.filter(v => this.isTaiwanVoice(v));

      // 如果使用者有指定過聲音，且符合台灣語音
      if (this.selectedVoiceName) {
        const found = taiwanVoices.find(v => v.name === this.selectedVoiceName);
        if (found) {
          this.taiwanVoice = found;
          return;
        }
      }

      // 台灣在地語音優先順序：
      // 1. Microsoft 雅婷 (Yating) -> 台北錄製、道地台灣腔調、溫柔親切幼兒園國小老師首選！
      // 2. Google 國語（臺灣）-> 台灣流暢發音
      // 3. Microsoft 志偉 (Zhiwei) -> 台灣親切男聲
      // 4. Microsoft 曉臻 (HsiaoChen) / 雲哲 (YunJhe)
      // 5. 其他 zh-TW 繁體語音
      this.taiwanVoice = 
        taiwanVoices.find(v => v.name.includes('Yating') || v.name.includes('雅婷')) ||
        taiwanVoices.find(v => v.name.includes('Google') && (v.name.includes('臺灣') || v.name.includes('Taiwan') || v.lang === 'zh-TW')) ||
        taiwanVoices.find(v => v.name.includes('HsiaoChen') || v.name.includes('曉臻')) ||
        taiwanVoices.find(v => v.name.includes('Zhiwei') || v.name.includes('志偉')) ||
        taiwanVoices.find(v => v.lang === 'zh-TW' && !v.name.includes('Hanhan')) ||
        taiwanVoices.find(v => v.lang === 'zh-TW') || null;
    };

    findVoice();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = findVoice;
    }
  }

  getAvailableTaiwanVoices() {
    if (!this.synth) return [];
    const all = this.synth.getVoices();
    return all.filter(v => this.isTaiwanVoice(v));
  }

  setVoice(voiceName) {
    this.selectedVoiceName = voiceName;
    localStorage.setItem('zhuyin_selected_voice', voiceName);
    this.loadVoices();
  }

  setSpeechParams(rate, pitch) {
    this.speechRate = rate;
    this.speechPitch = pitch;
    localStorage.setItem('zhuyin_speech_rate', rate.toString());
    localStorage.setItem('zhuyin_speech_pitch', pitch.toString());
  }

  /**
   * 說話：朗讀文字 (專為台灣小一國語最佳化)
   */
  speak(text, options = {}) {
    if (this.isMuted || !this.synth) return;
    this.synth.cancel(); // 停止先前的朗讀

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.taiwanVoice) {
      utterance.voice = this.taiwanVoice;
      utterance.lang = this.taiwanVoice.lang;
    } else {
      utterance.lang = 'zh-TW';
    }

    utterance.rate = options.rate || this.speechRate;
    utterance.pitch = options.pitch || this.speechPitch; // 活潑親切的老師語調

    if (options.onEnd) {
      utterance.onend = options.onEnd;
    }

    this.synth.speak(utterance);
  }

  /**
   * 停止所有語音
   */
  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * 朗讀注音符號（以自然、溫柔親切的老師口吻）
   */
  speakSymbol(symbolData, mode = 'full') {
    if (mode === 'short') {
      this.speak(`${symbolData.char}～！`);
    } else {
      // 親切生動的口誦教學：用「～」與驚嘆號引導自然語調抑揚頓挫
      const naturalText = `${symbolData.char}～！${symbolData.word}的${symbolData.char}！`;
      this.speak(naturalText);
    }
  }

  /**
   * 拼音小火車循序拼讀（自然生動、富有節奏感的拼讀）
   */
  spellBlending(initial, medial, final, toneMark, toneId, fullChar, fullWord) {
    const parts = [];
    if (initial) parts.push(initial);
    if (medial) parts.push(medial);
    if (final) parts.push(final);

    const spellSeq = parts.map(p => `${p}～`).join('，');
    const toneText = toneId === 1 ? '一聲' :
                     toneId === 2 ? '二聲' :
                     toneId === 3 ? '三聲' :
                     toneId === 4 ? '四聲' : '輕聲';

    let reading = `${spellSeq}，`;
    if (toneId > 0 && toneId !== 1) {
      reading += `${toneText}，`;
    }
    reading += `${fullChar}！`;
    if (fullWord) {
      reading += `是${fullWord}的${fullChar}哦！`;
    }

    this.speak(reading, { rate: this.speechRate * 0.95 });
  }

  // ==========================================
  // Web Audio API 趣味合成音效（完全無依賴外部音檔）
  // ==========================================

  /**
   * 氣球或按鈕可愛 Pop 泡泡聲
   */
  playPop() {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * 答對歡樂和弦音 (C大調三和弦琶音 C5 -> E5 -> G5 -> C6)
   */
  playCorrect() {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + index * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  /**
   * 答錯溫和提示音（俏皮低音彈簧 boing，不打擊孩子自信）
   */
  playWrong() {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  /**
   * 火車鳴笛聲（拼音火車啟動時專用）
   */
  playTrainWhistle() {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [587.33, 739.99]; // D5 + F#5 雙音汽笛

    freqs.forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain.gain.setValueAtTime(0.12, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    });
  }

  /**
   * 勝利熱鬧號角 (Fanfare)
   */
  playFanfare() {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const melody = [
      { f: 523.25, t: 0, d: 0.12 },
      { f: 523.25, t: 0.13, d: 0.12 },
      { f: 523.25, t: 0.26, d: 0.12 },
      { f: 659.25, t: 0.40, d: 0.2 },
      { f: 783.99, t: 0.62, d: 0.2 },
      { f: 1046.50, t: 0.85, d: 0.45 }
    ];

    const now = this.ctx.currentTime;
    melody.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = now + note.t;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, start);

      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + note.d);
    });
  }

  /**
   * 聲調音高模擬滑動音 (根據四聲特徵調值)
   * 1聲：高平 (55)
   * 2聲：中升 (35)
   * 3聲：降升 (214)
   * 4聲：全降 (51)
   * 輕聲：短降
   */
  playTonePitchCurve(toneId) {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    osc.type = 'sine';

    if (toneId === 1) {
      // 55 平音
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.setValueAtTime(0.25, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (toneId === 2) {
      // 35 向上升
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.35);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (toneId === 3) {
      // 214 轉個彎
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.5);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.start(now);
      osc.stop(now + 0.55);
    } else if (toneId === 4) {
      // 51 溜滑梯向下
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.3);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else {
      // 輕聲：短而輕
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.12);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    }

    osc.connect(gain);
    gain.connect(this.ctx.destination);
  }
}

// 建立全域音效實例
window.audioEngine = new ZhuyinAudioEngine();
