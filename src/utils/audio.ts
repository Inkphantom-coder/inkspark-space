// Procedural Ambient Soundscapes using Web Audio API (Offline & Zero-Asset)

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private currentMode: 'none' | 'rain' | 'crickets' | 'rhythm' = 'none';
  private masterGain: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private isMuted: boolean = false;
  private volume: number = 0.4;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMode() {
    return this.currentMode;
  }

  public stop() {
    this.activeNodes.forEach((node) => {
      if (typeof node === 'number') {
        window.clearInterval(node);
      } else {
        try {
          (node as any).stop?.();
          (node as any).disconnect?.();
        } catch (e) {
          // ignore
        }
      }
    });
    this.activeNodes = [];
    this.currentMode = 'none';
  }

  // 1. Lagos Rain on Zinc Roof
  public playLagosRain() {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.currentMode = 'rain';
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Pink/White noise buffer for rain body
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.11;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate resonance under corrugated zinc sheet
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, this.ctx.currentTime);

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(150, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(highpass);
    highpass.connect(this.masterGain);
    whiteNoise.start();

    this.activeNodes.push(whiteNoise, filter, highpass);

    // Periodic rain droplet pings on metal
    const interval = window.setInterval(() => {
      if (!this.ctx || this.currentMode !== 'rain') return;
      const osc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();
      const freq = 1200 + Math.random() * 1800;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      dropGain.gain.setValueAtTime(0.04 * (0.5 + Math.random() * 0.5), this.ctx.currentTime);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(dropGain);
      if (this.masterGain) dropGain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    }, 180);

    this.activeNodes.push(interval);
  }

  // 2. Evening Savannah Crickets (Ibadan / Plateau Dusk)
  public playSavannahCrickets() {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.currentMode = 'crickets';
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.8, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Chirping crickets
    const chirpInterval = window.setInterval(() => {
      if (!this.ctx || this.currentMode !== 'crickets') return;
      const now = this.ctx.currentTime;
      for (let burst = 0; burst < 3; burst++) {
        const osc = this.ctx.createOscillator();
        const chirpGain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(4500 + Math.random() * 300, now + burst * 0.05);

        chirpGain.gain.setValueAtTime(0, now + burst * 0.05);
        chirpGain.gain.linearRampToValueAtTime(0.03, now + burst * 0.05 + 0.015);
        chirpGain.gain.linearRampToValueAtTime(0.0001, now + burst * 0.05 + 0.04);

        osc.connect(chirpGain);
        if (this.masterGain) chirpGain.connect(this.masterGain);
        osc.start(now + burst * 0.05);
        osc.stop(now + burst * 0.05 + 0.05);
      }
    }, 450);

    this.activeNodes.push(chirpInterval);
  }

  // 3. Flow Drum Pulse (Soft Talking Drum at 56 BPM)
  public playFlowRhythm() {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.currentMode = 'rhythm';
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.6, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm resonant membrane hit every ~1.1 seconds (54 BPM)
    const drumInterval = window.setInterval(() => {
      if (!this.ctx || this.currentMode !== 'rhythm') return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const drumGain = this.ctx.createGain();

      osc.type = 'sine';
      // Pitch bend mimicking tension on talking drum strings
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);

      drumGain.gain.setValueAtTime(0.18, now);
      drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(drumGain);
      if (this.masterGain) drumGain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.36);
    }, 1100);

    this.activeNodes.push(drumInterval);
  }
}

export const ambientAudio = new AmbientAudioEngine();
