/**
 * GOLPER KOTHA (গল্পের কথা) - Audio & Ambient Sound Engine
 * Features:
 * 1. Web Audio API Ambient Sound Generator (Rain, Night Crickets, Fireplace, Wind)
 * 2. Story Narration via Web Speech API with sentence highlighting
 * 3. Dynamic Visualizer Canvas
 */

class AudioEngine {
  constructor() {
    this.audioCtx = null;
    this.ambientNodes = {};
    this.currentAmbient = null;
    this.ambientVolume = 0.4;
    this.speechUtterance = null;
    this.isSpeaking = false;
    this.speechRate = 1.0;
    this.currentStory = null;
    this.visualizerCanvas = null;
    this.animFrameId = null;
    this.bengaliVoice = null;

    this.initVoices();
  }

  ensureAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  initVoices() {
    if ('speechSynthesis' in window) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Look for Bengali voices first
        this.bengaliVoice = voices.find(v => v.lang.includes('bn') || v.lang.includes('ben')) ||
                            voices.find(v => v.lang.includes('hi') || v.lang.includes('en-IN')) ||
                            voices[0];
      };
      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
  }

  // --- AMBIENT SOUND GENERATOR (Web Audio API Synthesized) ---
  playAmbient(type) {
    this.ensureAudioContext();
    this.stopAmbient();

    if (!type || type === 'none') return;

    const masterGain = this.audioCtx.createGain();
    masterGain.gain.setValueAtTime(this.ambientVolume, this.audioCtx.currentTime);
    masterGain.connect(this.audioCtx.destination);

    if (type === 'rain') {
      this.createRainSound(masterGain);
    } else if (type === 'crickets') {
      this.createCricketsSound(masterGain);
    } else if (type === 'fire') {
      this.createFireSound(masterGain);
    } else if (type === 'wind') {
      this.createWindSound(masterGain);
    }

    this.currentAmbient = { type, masterGain };
    this.startVisualizer();
  }

  stopAmbient() {
    if (this.currentAmbient) {
      try {
        if (this.currentAmbient.masterGain) {
          this.currentAmbient.masterGain.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.2);
        }
      } catch (e) {}
      this.currentAmbient = null;
    }
  }

  setAmbientVolume(vol) {
    this.ambientVolume = Math.max(0, Math.min(1, vol));
    if (this.currentAmbient && this.currentAmbient.masterGain) {
      this.currentAmbient.masterGain.gain.setTargetAtTime(this.ambientVolume, this.audioCtx.currentTime, 0.05);
    }
  }

  createRainSound(destination) {
    const bufferSize = this.audioCtx.sampleRate * 2;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    // Pink noise generation
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate raindrops on leaves and windowpanes
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.audioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(destination);
    whiteNoise.start();
  }

  createCricketsSound(destination) {
    // Night gentle wind bed
    const bufferSize = this.audioCtx.sampleRate * 2;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.02;
    }
    const noise = this.audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    filter.Q.setValueAtTime(2, this.audioCtx.currentTime);
    noise.connect(filter);
    filter.connect(destination);
    noise.start();

    // Periodic cricket chirps
    const chirpOsc = this.audioCtx.createOscillator();
    chirpOsc.type = 'sine';
    chirpOsc.frequency.setValueAtTime(4500, this.audioCtx.currentTime);

    const chirpGain = this.audioCtx.createGain();
    chirpGain.gain.setValueAtTime(0, this.audioCtx.currentTime);

    // LFO for periodic chirping
    const lfo = this.audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(3.5, this.audioCtx.currentTime);
    const lfoGain = this.audioCtx.createGain();
    lfoGain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
    lfo.connect(chirpGain.gain);

    chirpOsc.connect(chirpGain);
    chirpGain.connect(destination);

    chirpOsc.start();
    lfo.start();
  }

  createFireSound(destination) {
    // Crackling fire
    const bufferSize = this.audioCtx.sampleRate * 2;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Occasional crackle spikes
      const isCrackle = Math.random() < 0.002;
      output[i] = isCrackle ? (Math.random() * 2 - 1) * 0.6 : (Math.random() * 2 - 1) * 0.03;
    }
    const noise = this.audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const lowpass = this.audioCtx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(900, this.audioCtx.currentTime);

    noise.connect(lowpass);
    lowpass.connect(destination);
    noise.start();
  }

  createWindSound(destination) {
    const bufferSize = this.audioCtx.sampleRate * 2;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.05;
    }
    const noise = this.audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(350, this.audioCtx.currentTime);
    filter.Q.setValueAtTime(3.0, this.audioCtx.currentTime);

    // Modulate wind frequency
    const lfo = this.audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, this.audioCtx.currentTime);
    const lfoGain = this.audioCtx.createGain();
    lfoGain.gain.setValueAtTime(150, this.audioCtx.currentTime);
    lfo.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(destination);

    noise.start();
    lfo.start();
  }

  // --- STORY NARRATION (Speech Synthesis) ---
  speakStory(text, lang = 'bn-IN', onBoundary = null, onEnd = null) {
    if (!('speechSynthesis' in window)) {
      alert("দুঃখিত, আপনার ব্রাউজার স্পিচ সাপোর্ট করে না। (Speech synthesis is not supported on this browser).");
      return;
    }

    this.stopSpeaking();
    this.speechUtterance = new SpeechSynthesisUtterance(text);
    this.speechUtterance.rate = this.speechRate;
    this.speechUtterance.lang = lang;

    if (this.bengaliVoice && (lang.startsWith('bn') || lang.startsWith('ben'))) {
      this.speechUtterance.voice = this.bengaliVoice;
    }

    this.speechUtterance.onboundary = (e) => {
      if (onBoundary) onBoundary(e);
    };

    this.speechUtterance.onend = () => {
      this.isSpeaking = false;
      this.updatePlayerUI();
      if (onEnd) onEnd();
    };

    this.speechUtterance.onerror = (e) => {
      console.warn("Speech synthesis notice:", e);
      this.isSpeaking = false;
      this.updatePlayerUI();
    };

    window.speechSynthesis.speak(this.speechUtterance);
    this.isSpeaking = true;
    this.startVisualizer();
    this.updatePlayerUI();
  }

  pauseSpeaking() {
    if ('speechSynthesis' in window && this.isSpeaking) {
      window.speechSynthesis.pause();
      this.isSpeaking = false;
      this.updatePlayerUI();
    }
  }

  resumeSpeaking() {
    if ('speechSynthesis' in window && !this.isSpeaking && this.speechUtterance) {
      window.speechSynthesis.resume();
      this.isSpeaking = true;
      this.startVisualizer();
      this.updatePlayerUI();
    }
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.speechUtterance = null;
      this.updatePlayerUI();
    }
  }

  setSpeechRate(rate) {
    this.speechRate = rate;
    if (this.isSpeaking && this.speechUtterance) {
      // Re-trigger with updated rate
      const currentText = this.speechUtterance.text;
      this.stopSpeaking();
      this.speakStory(currentText);
    }
  }

  // --- VISUALIZER ANIMATION ---
  setupVisualizer(canvasId) {
    this.visualizerCanvas = document.getElementById(canvasId);
  }

  startVisualizer() {
    if (!this.visualizerCanvas) return;
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

    const canvas = this.visualizerCanvas;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    const render = () => {
      this.animFrameId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numBars = 24;
      const barWidth = canvas.width / numBars - 2;
      const active = this.isSpeaking || this.currentAmbient !== null;

      for (let i = 0; i < numBars; i++) {
        let height = 4;
        if (active) {
          const wave = Math.sin(phase + i * 0.4) * 0.5 + 0.5;
          const noise = Math.random() * 0.3;
          height = Math.max(4, (wave + noise) * (canvas.height - 4));
        }

        const x = i * (barWidth + 2);
        const y = canvas.height - height;

        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
        gradient.addColorStop(0, '#f59e0b');
        gradient.addColorStop(1, '#e11d48');

        ctx.fillStyle = active ? gradient : 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(x, y, barWidth, height);
      }

      phase += 0.12;
    };

    render();
  }

  updatePlayerUI() {
    const playBtn = document.getElementById("playerPlayBtn");
    const playerBar = document.getElementById("globalAudioPlayer");
    if (playBtn) {
      playBtn.innerHTML = this.isSpeaking ? `<i class="ph-fill ph-pause"></i>` : `<i class="ph-fill ph-play"></i>`;
    }
    if (playerBar && (this.isSpeaking || this.currentStory)) {
      playerBar.classList.add("active");
    }
  }
}

window.audioEngine = new AudioEngine();
