class AudioController {
  constructor() {
    this.audio = document.querySelector('#themeAudio');
    this.isLoaded = false;
    this.audioLoadPromise = new Promise((resolve) => {
      this.audio.oncanplaythrough = () => resolve();
    });

    this.audio.load();
  }

  loadAudio() {
    if (!this.isLoaded) {
      this.audio.load();
      this.isLoaded = true;
    }
  }

  playPromise() {
    return this.audioLoadPromise;
  }

  play() {
    this.audio.play();
  }

  reset() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}

export default new AudioController();
