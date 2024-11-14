(function () {
  let carouselContainer = document.querySelector(".carousel-container");
  let carousel = carouselContainer.querySelector(".carousel");
  let slides = carousel.querySelectorAll(".slide");
  let indicatorsContainer = carouselContainer.querySelector(
    ".indicators-container"
  );
  let indicators = indicatorsContainer.querySelectorAll(".indicator");
  let pauseBtn = carouselContainer.querySelector(".btn-pause");
  let nextBtn = carouselContainer.querySelector(".btn-next");
  let prevBtn = carouselContainer.querySelector(".btn-prev");
  let currentSlide = 0;
  let timer = null;
  let startPosX = null;
  let endPosX = null;

  const CODE_ARROW_LEFT = "ArrowLeft";
  const CODE_ARROW_RIGHT = "ArrowRight";
  const CODE_SPACE = "Space";
  const INTERVAL_TIME = 2000;
  let isPlaying = true;

  function goToSlide(n) {
    slides[currentSlide].classList.toggle("active");
    indicators[currentSlide].classList.toggle("active");
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.toggle("active");
    indicators[currentSlide].classList.toggle("active");
  }

  function gotoPrev() {
    goToSlide(currentSlide - 1);
  }

  function gotoNext() {
    goToSlide(currentSlide + 1);
  }

  function tick() {
    timer = setInterval(gotoNext, INTERVAL_TIME);
  }

  function pauseHandler() {
    pauseBtn.classList.remove("btn-pause");
    pauseBtn.classList.add("btn-play");
    isPlaying = false;
    clearInterval(timer);
  }

  function playHandler() {
    pauseBtn.classList.remove("btn-play");
    pauseBtn.classList.add("btn-pause");
    isPlaying = true;
    tick();
  }

  function pausePlayHandler() {
    isPlaying ? pauseHandler() : playHandler();
  }

  function nextHandler() {
    gotoNext();
    pauseHandler();
  }

  function prevHandler() {
    gotoPrev();
    pauseHandler();
  }

  function indicatorHandler(e) {
    let target = e.target;
    pauseHandler();
    goToSlide(+target.dataset.indicatorNumber - 1);
  }

  function keyHandler(e) {
    pressedKey = e.code;
    if (e.code == CODE_SPACE) {
      e.preventDefault();
      pausePlayHandler();
    }
    if (e.code == CODE_ARROW_RIGHT) nextHandler();
    if (e.code == CODE_ARROW_LEFT) prevHandler();
  }

  function swipeStartHandler(e) {
    startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
  }

  function swipeEndHandler(e) {
    endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
    if (endPosX - startPosX > 100) prevHandler();
    if (endPosX - startPosX < -100) nextHandler();
  }

  function initListeners() {
    pauseBtn.addEventListener("click", pausePlayHandler);
    nextBtn.addEventListener("click", nextHandler);
    prevBtn.addEventListener("click", prevHandler);
    indicators.forEach((indicator) => {
      indicator.addEventListener("click", indicatorHandler);
    });
    carousel.addEventListener("mousedown", swipeStartHandler);
    carousel.addEventListener("mouseup", swipeEndHandler);
    carousel.addEventListener("touchstart", swipeStartHandler);
    carousel.addEventListener("touchend", swipeEndHandler);
    document.addEventListener("keydown", keyHandler);
  }

  function init() {
    initListeners();
    tick();
  }

  init();
})();
