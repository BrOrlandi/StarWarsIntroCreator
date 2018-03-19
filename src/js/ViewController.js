import { defaultOpening } from './config';
import { callOnFocus } from './utils';
import AudioController from './AudioController';
import { playButton, downloadButton } from './actions';

import StarWarsAnimation from './StarWarsAnimation';

class ViewController {
  constructor() {
    this.body = document.querySelector('body');
    this.downloadButton = document.querySelector('#downloadButton');
    this.form = document.querySelector('#configForm > form');

    this.formFields = {
      intro: document.querySelector('#f-intro'),
      logo: document.querySelector('#f-logo'),
      episode: document.querySelector('#f-episode'),
      title: document.querySelector('#f-title'),
      text: document.querySelector('#f-text'),
      center: document.querySelector('#f-center'),
    };

    this.formFields.center.addEventListener('change', (e) => {
      this._setFormTextAlignment(e.target.checked);
    });

    this.starWarsAnimation = new StarWarsAnimation();

    this.setFormValues(defaultOpening);

    window.addEventListener('beforeunload', () => {
      window.scrollTo(0, 0);
    });

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const opening = this.getFormValues();
      playButton(opening);
    });

    this.downloadButton.addEventListener('click', (e) => {
      e.preventDefault();
      downloadButton();
    });
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

  showDownloadButton() {
    this.downloadButton.classList.add('show');
  }

  hideDownloadButton() {
    this.downloadButton.classList.remove('show');
  }


  getFormValues = () => ({
    intro: this.formFields.intro.value,
    logo: this.formFields.logo.value,
    episode: this.formFields.episode.value,
    title: this.formFields.title.value,
    text: this.formFields.text.value,
    center: this.formFields.center.checked,
  });

  setFormValues(opening) {
    this.formFields.intro.value = opening.intro;
    this.formFields.logo.value = opening.logo;
    this.formFields.episode.value = opening.episode;
    this.formFields.title.value = opening.title;
    this.formFields.text.value = opening.text;
    this.formFields.center.checked = opening.center;

    this._setFormTextAlignment(opening.center);
  }

  _setFormTextAlignment(centralizedText) {
    this.formFields.text.style.textAlign = centralizedText ? 'center' : 'initial';
  }

  playOpening(opening) {
    // window.scrollTo(0, 0);
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
