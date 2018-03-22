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

  canPlay() {
    return this.audioLoadPromise;
  }

  play() {
    return new Promise((resolve) => {
      // this.audio.currentTime = 92;
      // this.audio.playbackRate = 3;
      this.reset();
      this.audio.play();

      const endedListener = () => {
        resolve();
      };
      this.audio.addEventListener('ended', endedListener);
    });
  }

  reset() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}

export default new AudioController();
