class StarWarsAnimation {
  constructor() {
    this.animationContainer = document.querySelector('#animationContainer');
    this.animation = null;

    this.reset();
  }

  reset() {
    const animation = this.animationContainer.querySelector('.starwarsAnimation');
    const cloned = animation.cloneNode(true);

    this.animationContainer.removeChild(animation);
    this.animation = cloned;
  }

  load(opening) {
    const introHtml = opening.intro
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');

    this.animation.querySelector('#intro').innerHTML = introHtml;

    // TODO other fields
  }

  play(endCallback) {
    this.animationContainer.appendChild(this.animation);
  }
}

export default StarWarsAnimation;
