/**
 * ㄅㄆㄇ 快樂冒險島 - 音效與語音合成引擎
 * 結合 Web Speech API (台灣國語發音 zh-TW) 與 Web Audio API 合成音效
 */

class ZhuyinAudioEngine {
  constructor() {
    this.ctx = null;
    this.synth = window.speechSynthesis;
    this.currentAudio = null; // 預錄正音班神經語音 MP3 播放器
    this.taiwanVoice = null;
    let saved = localStorage.getItem('zhuyin_selected_voice');
    if (saved !== 'PERSONA::CUTE_GIRL' && saved !== 'PERSONA::TEACHER') {
      saved = 'PERSONA::TEACHER';
      localStorage.setItem('zhuyin_selected_voice', saved);
    }
    this.selectedVoiceName = saved;
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
    // 嚴格剔除所有中國大陸語音、簡體語音、普通話、兒化音、北方腔，以及所有「男聲」(Zhiwei/志偉/YunJhe/雲哲等)
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
      name.includes('simplified') ||
      // 刪除所有男聲
      name.includes('zhiwei') ||
      name.includes('志偉') ||
      name.includes('yunjhe') ||
      name.includes('雲哲') ||
      name.includes('danny') ||
      name.includes('male') ||
      // 刪除所有 Google 台灣女聲
      name.includes('google')
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
      name.includes('HsiaoChen') ||
      name.includes('曉臻') ||
      name.includes('HsiaoYu') ||
      name.includes('曉雨') ||
      name.includes('Meijia') ||
      name.includes('美佳') ||
      name.includes('Hanhan')
    );
  }

  /**
   * 取得最佳台灣女聲基底（供溫柔老師或可愛小女生角色共用）
   */
  getBestBaseFemaleVoice(taiwanVoices) {
    if (!taiwanVoices || taiwanVoices.length === 0) return null;
    return (
      taiwanVoices.find(v => v.name.includes('Yating') || v.name.includes('雅婷')) ||
      taiwanVoices.find(v => v.name.includes('HsiaoChen') || v.name.includes('曉臻')) ||
      taiwanVoices.find(v => v.name.includes('HsiaoYu') || v.name.includes('曉雨')) ||
      taiwanVoices.find(v => v.name.includes('Meijia') || v.name.includes('美佳')) ||
      taiwanVoices.find(v => v.lang === 'zh-TW' && !v.name.includes('Hanhan')) ||
      taiwanVoices.find(v => v.lang === 'zh-TW') ||
      null
    );
  }

  loadVoices() {
    if (!this.synth) return;
    const findVoice = () => {
      const voices = this.synth.getVoices();
      if (!voices || voices.length === 0) return;

      // 嚴格過濾出純台灣女聲清單（完全不含男聲）
      const taiwanVoices = voices.filter(v => this.isTaiwanVoice(v));

      if (this.selectedVoiceName !== 'PERSONA::CUTE_GIRL' && this.selectedVoiceName !== 'PERSONA::TEACHER') {
        this.selectedVoiceName = 'PERSONA::TEACHER';
        localStorage.setItem('zhuyin_selected_voice', 'PERSONA::TEACHER');
      }

      if (this.selectedVoiceName === 'PERSONA::CUTE_GIRL') {
        this.taiwanVoice =
          taiwanVoices.find(v => v.name.includes('HsiaoChen') || v.name.includes('曉臻')) ||
          taiwanVoices.find(v => v.name.includes('HsiaoYu') || v.name.includes('曉雨')) ||
          this.getBestBaseFemaleVoice(taiwanVoices);
        return;
      }

      this.taiwanVoice = this.getBestBaseFemaleVoice(taiwanVoices);
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
   * 台灣正音班標準「第一聲呼讀音」備援對照表（僅供動態未預錄字串使用）
   * 參考 YMCA 線上正音班女老師發音：37 個注音符號皆以第一聲清楚持續發音（ㄅ=bē, ㄆ=pē, ㄇ=mē, ㄈ=fē, ㄉ=dē, ㄊ=tē, ㄋ=nē, ㄌ=lē）
   */
  getClearPhoneticMap() {
    return {
      // 21個聲母（第一聲標準正音，不使用二聲「佛/得」或四聲「特/訥/勒」）
      'ㄅ': 'ㄅㄜ', 'ㄆ': 'ㄆㄜ', 'ㄇ': 'ㄇㄜ', 'ㄈ': 'ㄈㄜ',
      'ㄉ': 'ㄉㄜ', 'ㄊ': 'ㄊㄜ', 'ㄋ': 'ㄋㄜ', 'ㄌ': 'ㄌㄜ',
      'ㄍ': 'ㄍㄜ', 'ㄎ': 'ㄎㄜ', 'ㄏ': 'ㄏㄜ',
      'ㄐ': 'ㄐㄧ', 'ㄑ': 'ㄑㄧ', 'ㄒ': 'ㄒㄧ',
      'ㄓ': 'ㄓ', 'ㄔ': 'ㄔ', 'ㄕ': 'ㄕ', 'ㄖ': 'ㄖ',
      'ㄗ': 'ㄗ', 'ㄘ': 'ㄘ', 'ㄙ': 'ㄙ',
      // 3個介音
      'ㄧ': '衣', 'ㄨ': '烏', 'ㄩ': '迂',
      // 13個韻母
      'ㄚ': '啊', 'ㄛ': '喔', 'ㄜ': '婀', 'ㄝ': '耶',
      'ㄞ': '哀', 'ㄟ': '誒', 'ㄠ': '凹', 'ㄡ': '歐',
      'ㄢ': '安', 'ㄣ': '恩', 'ㄤ': '骯', 'ㄥ': '鞥', 'ㄦ': '兒'
    };
  }

  normalizeZhuyinForSpeech(text) {
    if (!text) return '';
    const map = this.getClearPhoneticMap();
    const keys = Object.keys(map).sort((a, b) => b.length - a.length);
    let result = text;
    for (const k of keys) {
      if (result.includes(k)) {
        result = result.split(k).join(map[k]);
      }
    }
    return result;
  }

  /**
   * 說話：根據目前選擇的角色，自動切換對應的真人級高清語音庫！
   * 1. PERSONA::DUET / PERSONA::SWEET_SISTER -> 🌻 小潔姐姐 ＆ 5歲小萌娃雙人律動跟讀 (AUDIO_DUET_MANIFEST)
   * 2. PERSONA::CUTE_GIRL -> 🍓 5歲超萌小莓妹妹獨唱配音 (AUDIO_CUTE_MANIFEST)
   * 3. PERSONA::TEACHER -> 🌸 YMCA 正音班溫柔單人女老師 (AUDIO_MANIFEST)
   */
  speak(text, options = {}) {
    if (this.isMuted || !text) return;
    this.stopSpeaking();

    const cleanKey = text.trim();
    const voiceRole = options.voiceName || this.selectedVoiceName || 'PERSONA::TEACHER';
    const targetPitch = options.pitch || this.speechPitch;

    const baseManifest = window.AUDIO_MANIFEST || {};
    const duetManifest = window.AUDIO_DUET_MANIFEST || {};
    const cuteManifest = window.AUDIO_CUTE_MANIFEST || {};

    let audioUrl = null;
    if (voiceRole === 'PERSONA::CUTE_GIRL' || targetPitch >= 1.35) {
      audioUrl = cuteManifest[cleanKey] || baseManifest[cleanKey];
    } else {
      audioUrl = baseManifest[cleanKey];
    }

    if (audioUrl) {
      try {
        const audio = new Audio(audioUrl);
        this.currentAudio = audio;
        audio.playbackRate = 1.0;

        if (options.onEnd) {
          audio.onended = options.onEnd;
        }
        audio.play().catch(() => {
          this.speakWithBrowserTTS(cleanKey, options);
        });
        return;
      } catch (e) {
        // fallback to browser TTS
      }
    }

    this.speakWithBrowserTTS(cleanKey, options);
  }

  speakWithBrowserTTS(text, options = {}) {
    if (!this.synth) return;
    const clearText = this.normalizeZhuyinForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(clearText);
    if (this.taiwanVoice) {
      utterance.voice = this.taiwanVoice;
      utterance.lang = this.taiwanVoice.lang;
    } else {
      utterance.lang = 'zh-TW';
    }
    utterance.rate = options.rate || this.speechRate;
    utterance.pitch = options.pitch || this.speechPitch;
    if (options.onEnd) {
      utterance.onend = options.onEnd;
    }
    this.synth.speak(utterance);
  }

  /**
   * 停止所有語音（包含高清 MP3 與瀏覽器 TTS）
   */
  stopSpeaking() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * 朗讀注音符號（完全比照台灣正音班女老師：第一聲清楚連念兩次＋代表詞彙＋口訣）
   */
  speakSymbol(symbolData, mode = 'full') {
    const c = symbolData.char;
    const w = symbolData.word;
    const m = symbolData.mnemonic;
    if (mode === 'short') {
      this.speak(`${c}，${c}。${w}的，${c}。`);
    } else {
      this.speak(`${c}，${c}。${w}的${c}。${m}`);
    }
  }

  /**
   * 拼音小火車循序拼讀（對應預錄的高清正音班女老師拼讀音檔）
   */
  spellBlending(initial, medial, final, toneMark, toneId, fullChar, fullWord) {
    const parts = [];
    if (initial) parts.push(initial);
    if (medial) parts.push(medial);
    if (final) parts.push(final);

    const toneText = toneId === 1 ? '一聲' :
                     toneId === 2 ? '二聲' :
                     toneId === 3 ? '三聲' :
                     toneId === 4 ? '四聲' : '輕聲';

    if (fullWord) {
      const cleanWord = fullWord.includes(' ') ? fullWord.split(' ')[0] : fullWord;
      const exactKey = `${parts.join('，')}，${toneText}，${fullChar}！${cleanWord}的${fullChar}！`;
      this.speak(exactKey);
      return;
    }

    const reading = `${parts.join('，')}，${toneText}，${fullChar}！`;
    this.speak(reading);
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
