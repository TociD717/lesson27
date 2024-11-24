import { Carousel } from '../../main.js';

class SwipeCarousel extends Carousel {
  constructor(...args) {
    super(...args);
    this.slidesContainer = this.container.querySelector('.carousel');
  }

  _initListeners() {
    super._initListeners();
    this.container.addEventListener('mousedown', this.swipeStart.bind(this));
    this.container.addEventListener('mouseup', this.swipeEnd.bind(this));
    this.container.addEventListener('touchstart', this.swipeStart.bind(this));
    this.container.addEventListener('touchend', this.swipeEnd.bind(this));
  }

  swipeStart(e) {
    if (e.changedTouches) {
      this.startPosX = e.changedTouches[0].pageX;
    } else {
      this.startPosX = e.pageX;
    }
  }

  swipeEnd(e) {
    if (e.changedTouches) {
      this.endPosX = e.changedTouches[0].pageX;
    } else {
      this.endPosX = e.pageX;
    }
    if (this.endPosX - this.startPosX > 100) this.prev();
    if (this.endPosX - this.startPosX < -100) this.next();
  }
}

const customCarousel = new SwipeCarousel();
customCarousel.init();
