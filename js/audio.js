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
    const targetPitch = (options.pitch !== undefined) ? options.pitch : (this.speechPitch || 1.12);

    const baseManifest = window.AUDIO_MANIFEST || {};
    const cuteManifest = window.AUDIO_CUTE_MANIFEST || {};

    const isCute = (voiceRole === 'PERSONA::CUTE_GIRL' || targetPitch >= 1.35);
    const targetManifest = isCute ? cuteManifest : baseManifest;
    const fallbackManifest = isCute ? baseManifest : cuteManifest;

    let audioUrl = targetManifest[cleanKey];

    // 若符號或標點有微小差異，嘗試標點正規化比對以確保 100% 播放真人高畫質音檔
    if (!audioUrl) {
      const simplifiedKey = cleanKey.replace(/[，。！？、～~\s]/g, '');
      for (const [k, url] of Object.entries(targetManifest)) {
        if (k.replace(/[，。！？、～~\s]/g, '') === simplifiedKey) {
          audioUrl = url;
          break;
        }
      }
      // 僅在目標庫完全找不到時才作為後備
      if (!audioUrl && fallbackManifest[cleanKey]) {
        audioUrl = fallbackManifest[cleanKey];
      }
    }

    if (audioUrl) {
      try {
        const audio = new Audio(audioUrl);
        this.currentAudio = audio;
        // 連動語速調整滑桿 (Speech Rate)
        const currentRate = options.rate || this.speechRate || (isCute ? 0.92 : 0.86);
        const baseRate = isCute ? 0.92 : 0.86;
        audio.playbackRate = Math.max(0.65, Math.min(1.5, currentRate / baseRate));

        if (options.onEnd) {
          audio.onended = options.onEnd;
        }
        audio.play().catch(() => {
          this.speakWithBrowserTTS(cleanKey, options);
        });
        return;
      } catch (e) {
        // fallback to browser TTS with preserved voice
      }
    }

    this.speakWithBrowserTTS(cleanKey, options);
  }

  speakWithBrowserTTS(text, options = {}) {
    if (!this.synth) return;
    const clearText = this.normalizeZhuyinForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(clearText);

    // 嚴格確保使用已保存的台灣女聲選項（絕不允許生硬機器聲或非保存語音）
    if (this.taiwanVoice) {
      utterance.voice = this.taiwanVoice;
      utterance.lang = this.taiwanVoice.lang;
    } else {
      utterance.lang = 'zh-TW';
    }

    const voiceRole = options.voiceName || this.selectedVoiceName || 'PERSONA::TEACHER';
    const isCute = (voiceRole === 'PERSONA::CUTE_GIRL' || (this.speechPitch && this.speechPitch >= 1.35));
    // 連動使用者自訂的語速與音調設定
    utterance.rate = options.rate || this.speechRate || (isCute ? 0.95 : 0.88);
    utterance.pitch = options.pitch || this.speechPitch || (isCute ? 1.45 : 1.15);

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

  /**
   * 🔴 寶可夢精靈球投擲音效 (Pokéball Throw)
   */
  playPokeThrow() {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.18);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  /**
   * 🔴 精靈球開啟並發射紅色吸入光束音效 (Capture Beam)
   */
  playPokeBeam() {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.35);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.38);
  }

  /**
   * 🔴 寶可夢精靈球晃動音效 (Pokéball Wobble Click)
   */
  playPokeShake() {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  /**
   * ✨ 寶可夢成功收服大成功音效 (Classic Pokémon Catch Fanfare)
   */
  playPokeCaught() {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    // 經典四音收服完成 Jingle (G5, B5, D6, G6)
    const notes = [
      { f: 783.99, t: 0, d: 0.14 },
      { f: 987.77, t: 0.14, d: 0.14 },
      { f: 1174.66, t: 0.28, d: 0.16 },
      { f: 1567.98, t: 0.44, d: 0.55 }
    ];

    const now = this.ctx.currentTime;
    notes.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = now + n.t;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, start);

      gain.gain.setValueAtTime(0.22, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + n.d);
    });
  }

  /**
   * ⚡ 效果絕佳 / 招式擊中音效 (Super Effective Hit)
   */
  playPokeSuperEffective() {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.28);
  }

  /**
   * 🏅 獲得道館徽章熱烈慶祝音效
   */
  playBadgeGet() {
    this.playFanfare();
  }

  /**
   * ⚡ 寶可夢大絕招發動音效 (招式音效：電/火/水/草/星星)
   */
  playPokeAttack(fxType = 'electric') {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    if (fxType === 'electric') {
      // 電氣十萬伏特嗡鳴碎裂音
      for (let i = 0; i < 4; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400 + i * 220, now + i * 0.04);
        gain.gain.setValueAtTime(0.2, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (i + 1) * 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + (i + 1) * 0.05);
      }
    } else if (fxType === 'fire') {
      // 噴射火焰呼嘯爆鳴
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(320, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.35);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (fxType === 'water') {
      // 強力水炮旋渦浪濤音
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.linearRampToValueAtTime(650, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.32);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.32);
    } else if (fxType === 'grass') {
      // 飛葉快刀破空切削音
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.18);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else {
      // 高速星星清脆星光連發音
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.2, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.12);
      });
    }
  }

  /**
   * 🎉 夥伴升級音效 (Classic Pokémon Level-Up Chime)
   */
  playLevelUp() {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const notes = [
      { f: 523.25, d: 0.08 }, // C5
      { f: 659.25, d: 0.08 }, // E5
      { f: 783.99, d: 0.08 }, // G5
      { f: 1046.50, d: 0.10 }, // C6
      { f: 1318.51, d: 0.12 }, // E6
      { f: 1567.98, d: 0.32 }  // G6
    ];
    let offset = 0;
    const now = this.ctx.currentTime;
    notes.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now + offset);
      gain.gain.setValueAtTime(0.25, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + note.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + note.d);
      offset += note.d * 0.85;
    });
  }

  /**
   * 🧪 寶可夢中心治癒/傷藥回血音效 (Pokémon Center Recovery Tone)
   */
  playHeal() {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const notes = [
      { f: 659.25, d: 0.12 }, // E5
      { f: 587.33, d: 0.12 }, // D5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.28 }, // G5
      { f: 987.77, d: 0.35 }  // B5
    ];
    let offset = 0;
    const now = this.ctx.currentTime;
    notes.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, now + offset);
      gain.gain.setValueAtTime(0.25, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + note.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + note.d);
      offset += note.d * 0.82;
    });
  }

  /**
   * 🎒 使用道具精靈球或道具音效
   */
  playPowerUp() {
    this.playItemUse();
  }

  playItemUse() {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now);
    osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.14);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  /**
   * 🎁 道館寶箱開啟大驚喜音效
   */
  playChestOpen() {
    if (this.isMuted) return;
    this.ensureAudioContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [440, 554.37, 659.25, 880, 1108.73, 1318.51].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.22, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.25);
    });
  }

}

// 建立全域音效實例
window.audioEngine = new ZhuyinAudioEngine();
