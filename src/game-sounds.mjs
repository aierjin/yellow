let context;
let stoneNoise;

function play(schedule) {
  const AudioContext = globalThis.AudioContext ?? globalThis.webkitAudioContext;
  if (!AudioContext) return;

  // Resume from the input handler so the browser can authorize playback.
  try {
    context ??= new AudioContext();
    if (context.state === 'running') schedule(context);
    else context.resume().then(() => schedule(context)).catch(() => {});
  } catch {
    // Audio is optional on devices that cannot initialize it.
  }
}

function envelope(audio, start, duration, volume) {
  const gain = audio.createGain();
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  gain.connect(audio.destination);
  return gain;
}

function tone(audio, frequency, start, duration, volume) {
  const oscillator = audio.createOscillator();
  oscillator.frequency.value = frequency;
  oscillator.connect(envelope(audio, start, duration, volume));
  oscillator.start(start);
  oscillator.stop(start + duration);
}

export function playPillarSound(rises) {
  play(audio => {
    const start = audio.currentTime;
    if (!stoneNoise) {
      stoneNoise = audio.createBuffer(1, Math.ceil(audio.sampleRate * 0.09), audio.sampleRate);
      const samples = stoneNoise.getChannelData(0);
      for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
    }

    const strike = audio.createBufferSource();
    strike.buffer = stoneNoise;
    const resonance = audio.createBiquadFilter();
    resonance.type = 'bandpass';
    resonance.frequency.value = rises ? 1150 : 800;
    resonance.Q.value = 2;
    strike.connect(resonance).connect(envelope(audio, start, 0.09, 0.23));
    strike.start(start);
    tone(audio, rises ? 390 : 280, start, 0.1, 0.045);
  });
}

export function playRouteSound() {
  play(audio => {
    const start = audio.currentTime;
    const notes = [392, 493.88, 587.33, 783.99]; // G major, played from low to high.
    notes.forEach((frequency, index) => {
      const onset = start + index * 0.16;
      tone(audio, frequency, onset, 1.02, 0.075);
      tone(audio, frequency * 2, onset, 0.34, 0.013);
    });
  });
}

export function playUndoSound() {
  play(audio => {
    const start = audio.currentTime;
    tone(audio, 440, start, 0.12, 0.045);
    tone(audio, 329.63, start + 0.07, 0.16, 0.04);
  });
}

export function playHintSound() {
  play(audio => {
    const start = audio.currentTime;
    tone(audio, 523.25, start, 0.18, 0.045);
    tone(audio, 659.25, start + 0.09, 0.23, 0.035);
  });
}
