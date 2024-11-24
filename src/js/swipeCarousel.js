import { Carousel } from '../../main.js';

function SwipeCarousel() {
  Carousel.apply(this, arguments);
  this.slidesContainer = this.container.querySelector('.carousel');
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype._initListeners = function () {
  Carousel.prototype._initListeners.apply(this);
  this.container.addEventListener('mousedown', this.swipeStart.bind(this));
  this.container.addEventListener('mouseup', this.swipeEnd.bind(this));
  this.container.addEventListener('touchstart', this.swipeStart.bind(this));
  this.container.addEventListener('touchend', this.swipeEnd.bind(this));
};

SwipeCarousel.prototype.swipeStart = function (e) {
  if (e.changedTouches) {
    this.startPosX = e.changedTouches[0].pageX;
  } else {
    this.startPosX = e.pageX;
  }
};

SwipeCarousel.prototype.swipeEnd = function (e) {
  if (e.changedTouches) {
    this.endPosX = e.changedTouches[0].pageX;
  } else {
    this.endPosX = e.pageX;
  }
  if (this.endPosX - this.startPosX > 100) this.prev();
  if (this.endPosX - this.startPosX < -100) this.next();
};

const customCarousel = new SwipeCarousel();
customCarousel.init();
