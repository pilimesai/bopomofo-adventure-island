const fs = require('fs');

let code = fs.readFileSync('js/audio.js', 'utf8');

// 1. Add resolveAudioUrl and update preloadAudio
const oldPreload = `  /**
   * 預先載入題目的語音 MP3 至記憶體快取，切題換題時 0 延遲零漏音
   */
  preloadAudio(text) {
    if (!text) return;
    const cleanKey = text.trim();
    const baseManifest = window.AUDIO_MANIFEST || {};
    const cuteManifest = window.AUDIO_CUTE_MANIFEST || {};
    const url = baseManifest[cleanKey] || cuteManifest[cleanKey];
    if (url && typeof fetch !== 'undefined') {
      fetch(url, { cache: 'force-cache' }).catch(() => {});
    }
  }`;

const newPreload = `  /**
   * 從 Manifest 項目中正確解析出音訊 URL（支援 string 與 {teacher, cute} 物件結構）
   */
  resolveAudioUrl(entry, isCute = false) {
    if (!entry) return null;
    if (typeof entry === 'object') {
      if (isCute && entry.cute) return entry.cute;
      if (entry.teacher) return entry.teacher;
      if (entry.cute) return entry.cute;
      return null;
    }
    if (typeof entry === 'string') {
      if (isCute && entry.includes('/v_')) {
        return entry.replace('/v_', '/cute_');
      }
      return entry;
    }
    return null;
  }

  /**
   * 預先載入題目的語音 MP3 至記憶體快取，切題換題時 0 延遲零漏音
   */
  preloadAudio(text) {
    if (!text) return;
    const cleanKey = text.trim();
    const baseManifest = window.AUDIO_MANIFEST || {};
    const cuteManifest = window.AUDIO_CUTE_MANIFEST || {};
    const isCute = (this.selectedVoiceName === 'PERSONA::CUTE_GIRL');
    const targetManifest = isCute ? cuteManifest : baseManifest;
    const fallbackManifest = isCute ? baseManifest : cuteManifest;
    const raw = targetManifest[cleanKey] || fallbackManifest[cleanKey];
    const url = this.resolveAudioUrl(raw, isCute);
    if (url && typeof fetch !== 'undefined') {
      fetch(url, { cache: 'force-cache' }).catch(() => {});
    }
  }`;

// 2. Update speak function to resolve audioUrl
const oldSpeakBlock = `    let audioUrl = targetManifest[cleanKey];

    // 若符號或標點有微小差異，嘗試標點正規化比對以確保 100% 播放真人高畫質音檔
    if (!audioUrl) {
      const simplifiedKey = cleanKey.replace(/[，。！？、～~\\s「」『』【】（）()]/g, '');
      for (const [k, url] of Object.entries(targetManifest)) {
        if (k.replace(/[，。！？、～~\\s「」『』【】（）()]/g, '') === simplifiedKey) {
          audioUrl = url;
          break;
        }
      }
      if (!audioUrl) {
        for (const [k, url] of Object.entries(fallbackManifest)) {
          if (k.replace(/[，。！？、～~\\s「」『』【】（）()]/g, '') === simplifiedKey) {
            audioUrl = url;
            break;
          }
        }
      }
    }

    if (audioUrl) {
      this.playVoiceAudioUrl(audioUrl, options);
      return;
    }`;

const newSpeakBlock = `    let rawEntry = targetManifest[cleanKey];

    // 若符號或標點有微小差異，嘗試標點正規化比對以確保 100% 播放真人高畫質音檔
    if (!rawEntry) {
      const simplifiedKey = cleanKey.replace(/[，。！？、～~\\s「」『』【】（）()]/g, '');
      for (const [k, val] of Object.entries(targetManifest)) {
        if (k.replace(/[，。！？、～~\\s「」『』【】（）()]/g, '') === simplifiedKey) {
          rawEntry = val;
          break;
        }
      }
      if (!rawEntry) {
        for (const [k, val] of Object.entries(fallbackManifest)) {
          if (k.replace(/[，。！？、～~\\s「」『』【】（）()]/g, '') === simplifiedKey) {
            rawEntry = val;
            break;
          }
        }
      }
    }

    const audioUrl = this.resolveAudioUrl(rawEntry, isCute);

    if (audioUrl) {
      this.playVoiceAudioUrl(audioUrl, options);
      return;
    }`;

// 3. Update playVoiceAudioUrl to ensure preservesPitch and safe string
const oldPlayUrl = `    try {
      audio.src = audioUrl;
      audio.playbackRate = options.rate ? options.rate : 1.0;`;

const newPlayUrl = `    try {
      audio.src = audioUrl;
      audio.preservesPitch = true;
      audio.playbackRate = options.rate ? options.rate : 1.0;`;

let norm = code.replace(/\r\n/g, '\n');
norm = norm.replace(oldPreload.replace(/\r\n/g, '\n'), newPreload);
norm = norm.replace(oldSpeakBlock.replace(/\r\n/g, '\n'), newSpeakBlock);
norm = norm.replace(oldPlayUrl.replace(/\r\n/g, '\n'), newPlayUrl);

fs.writeFileSync('js/audio.js', norm, 'utf8');
console.log('Successfully updated js/audio.js!');
