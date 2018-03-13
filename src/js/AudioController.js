class AudioController {
  constructor() {
    this.audio = document.querySelector('#themeAudio');
    this.isLoaded = false;
    this.audioLoadPromise = new Promise((resolve) => {
      this.audio.oncanplaythrough = () => resolve();
    });

    document.body.addEventListener('touchstart', this.loadAudio);
  }

  loadAudio() {
    if (!this.isLoaded) {
      this.audio.load();
      this.isLoaded = true;
    }
  }

  play() {
    this.audio.play();
  }
}

export default new AudioController();
