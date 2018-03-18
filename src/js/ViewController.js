
import { defaultOpening } from './config';
import { callOnFocus } from './utils';
import AudioController from './AudioController';

import StarWarsAnimation from './StarWarsAnimation';

class ViewController {
  constructor() {
    this.body = document.querySelector('body');

    this.form = {
      intro: document.querySelector('#f-intro'),
      logo: document.querySelector('#f-logo'),
      episode: document.querySelector('#f-episode'),
      title: document.querySelector('#f-title'),
      text: document.querySelector('#f-text'),
      center: document.querySelector('#f-center'),
    };

    this.form.center.addEventListener('change', (e) => {
      const isCenteredText = e.target.checked;
      this.form.text.style.textAlign = isCenteredText ? 'center' : 'initial';
    });

    this.starWarsAnimation = new StarWarsAnimation();

    this.setFormValues(defaultOpening);
  }

  setLoading() {
    this.body.classList.add('loading');
  }

  unsetLoading() {
    this.body.classList.remove('loading');
  }

  setRunningVideo() {
    this.body.classList.add('runningVideo');
  }

  unsetRunningVideo() {
    this.body.classList.remove('runningVideo');
    this.body.classList.remove('showForm');
  }

  setRequestWindowFocus() {
    this.body.classList.add('requestFocus');
  }

  unsetRequestWindowFocus() {
    this.body.classList.remove('requestFocus');
  }

  setError() {
    this.body.classList.add('error');
  }

  unsetError() {
    this.body.classList.remove('error');
  }


  getFormValues = () => ({
    intro: this.form.intro.value,
    logo: this.form.logo.value,
    episode: this.form.episode.value,
    title: this.form.title.value,
    text: this.form.text.value,
    center: this.form.center.checked,
  });

  setFormValues(opening) {
    this.form.intro.value = opening.intro;
    this.form.logo.value = opening.logo;
    this.form.episode.value = opening.episode;
    this.form.title.value = opening.title;
    this.form.text.value = opening.text;
    this.form.center.checked = opening.center;
  }

  playOpening(opening) {
    this.starWarsAnimation.load(opening);
    AudioController.reset();
    this.setRequestWindowFocus();

    return new Promise((resolve) => {
      callOnFocus(async () => {
        this.unsetRequestWindowFocus();
        this.setRunningVideo();
        await AudioController.canPlay();

        this.starWarsAnimation.play();

        await AudioController.play();
        resolve();
      });
    });
  }

  stopPlaying() {
    setTimeout(() => {
      this.body.classList.add('showForm');
      setTimeout(() => {
        this.unsetRunningVideo();
        this.starWarsAnimation.reset();
      }, 6000);
    }, 2000);
  }
}

export default new ViewController();
