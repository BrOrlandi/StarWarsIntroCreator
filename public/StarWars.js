/*
http://codepen.io/TimPietrusky/pen/eHGfj

 * Star Wars opening crawl from 1977
 * 
 * I freaking love Star Wars, but could not find
 * a web version of the original opening crawl from 1977.
 * So I created this one.
 *
 * I wrote an article where I explain how this works:
 * http://timpietrusky.com/star-wars-opening-crawl-from-1977
 * 
 * Watch the Start Wars opening crawl on YouTube.
 * http://www.youtube.com/watch?v=7jK-jZo6xjY
 * 
 * Stuff I used:
 * - CSS (animation, transform)
 * - HTML audio (the opening theme)
 * - SVG (the Star Wars logo from wikimedia.org)
 *   http://commons.wikimedia.org/wiki/File:Star_Wars_Logo.svg
 * - JavaScript (to sync the animation/audio)
 *
 * Thanks to Craig Buckler for his amazing article 
 * which helped me to create this remake of the Star Wars opening crawl. 
 * http://www.sitepoint.com/css3-starwars-scrolling-text/ 
 *
 * Sound copyright by The Walt Disney Company.
 * 
 *
 * 2013 by Tim Pietrusky
 * timpietrusky.com
 *  
 */
StarWarsOpening = (function() {
  
  /* 
   * Constructor
   */
  function StarWarsOpening(args) {
    // Context wrapper
    this.el = $(args.el);
    
    // Audio to play the opening crawl
    this.audio = this.el.find('audio').get(0);
    
    // Start the animation
    this.start = this.el.find('.start');
    
    // The animation wrapper
    this.animation = this.el.find('.animation');
    
    // Remove animation and shows the start screen
    this.reset();
    
    // Reset the animation and shows the start screen
    $(this.audio).bind('ended', $.proxy(function() {
      this.audio.currentTime = 0;
      this.reset();
    }, this));
  }
  
  /*
   * Resets the animation and shows the start screen.
   */
  StarWarsOpening.prototype.reset = function() {
    this.start.show();
    this.cloned = this.animation.clone(true);
    this.animation.remove();
    this.animation = this.cloned;
  };

  StarWarsOpening.prototype.resetAudio = function() {
    this.audio.pause();
    this.audio.currentTime = 0;
  };

  StarWarsOpening.prototype.play = function(){
      this.start.hide();
      this.audio.play();
      this.el.append(this.animation);
  }

  return StarWarsOpening;
})();

var StarWars = new StarWarsOpening({
  el : '.starwars'
});