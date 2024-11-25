function Carousel(containerClass = '.carousel-container', slideClass = '.slide') {
  this.container = document.querySelector(containerClass);
  this.slides = document.querySelectorAll(slideClass);
}

Carousel.prototype = {
  _initProps: function () {
    this.currentSlide = 0;
    this.timer = null;
    this.startPosX = null;
    this.endPosX = null;
    this.SLIDES_COUNT = this.slides.length;

    this.CODE_ARROW_LEFT = 'ArrowLeft';
    this.CODE_ARROW_RIGHT = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.INTERVAL_TIME = 2000;
    this.isPlaying = true;
  },

  _initControls: function () {
    const controls = document.createElement('div');
    const PAUSE = '<div class="btn-pause"></div>';
    const PREV = '<div class="btn-prev"></div>';
    const NEXT = '<div class="btn-next"></div>';

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.append(controls);
    this.pauseBtn = this.container.querySelector('.btn-pause');
    this.prevBtn = this.container.querySelector('.btn-prev');
    this.nextBtn = this.container.querySelector('.btn-next');
  },

  _initIndicators: function () {
    const indicators = document.createElement('div');
    indicators.setAttribute('class', 'indicators-container');

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('div');

      indicator.setAttribute('class', i ? 'indicator' : 'indicator active');
      indicator.dataset.indicatorNumber = `${i}`;
      indicators.append(indicator);
    }

    this.container.append(indicators);

    this.indicatorsContainer = this.container.querySelector('.indicators-container');
    this.indicatorItems = this.container.querySelectorAll('.indicator');
  },

  _initListeners: function () {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.indicatorItems.forEach((indicator) => {
      indicator.addEventListener('click', this.indicator.bind(this));
    });
    document.addEventListener('keydown', this.key.bind(this));
  },

  _goToSlide: function (n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.slides.length) % this.slides.length;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
  },

  _gotoPrev: function () {
    this._goToSlide(this.currentSlide - 1);
  },

  _gotoNext: function () {
    this._goToSlide(this.currentSlide + 1);
  },

  _tick: function () {
    this.timer = setInterval(this._gotoNext.bind(this), this.INTERVAL_TIME);
  },

  pause: function () {
    this.pauseBtn.classList.remove('btn-pause');
    this.pauseBtn.classList.add('btn-play');
    this.isPlaying = false;
    clearInterval(this.timer);
  },

  play: function () {
    this.pauseBtn.classList.remove('btn-play');
    this.pauseBtn.classList.add('btn-pause');
    this.isPlaying = true;
    this._tick();
  },

  pausePlay: function () {
    this.isPlaying ? this.pause() : this.play();
  },

  next: function () {
    this._gotoNext();
    this.pause();
  },

  prev: function () {
    this._gotoPrev();
    this.pause();
  },

  indicator: function (e) {
    const target = e.target;
    this.pause();
    this._goToSlide(+target.dataset.indicatorNumber);
  },

  key: function (e) {
    if (e.code == this.CODE_SPACE) {
      e.preventDefault();
      this.pausePlay();
    }
    if (e.code == this.CODE_ARROW_RIGHT) this.next();
    if (e.code == this.CODE_ARROW_LEFT) this.prev();
  },

  init: function () {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick();
  },
};

export { Carousel };
