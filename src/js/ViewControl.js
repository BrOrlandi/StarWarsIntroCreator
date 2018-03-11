
import { defaultOpening } from './config';

import StarWarsAnimation from './StarWarsAnimation';

class ViewControl {
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
    const starWarsAnimation = new StarWarsAnimation();
    starWarsAnimation.load(opening);
    this.setRunningVideo();

    starWarsAnimation.play(() => {
      this.unsetRunningVideo();
    });
  }
}

export default new ViewControl();
