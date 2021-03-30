import { Swiper, Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation } from 'swiper';
import { gsap, Power2 } from 'gsap';

import MicroModal from 'micromodal';

Swiper.use([Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation]);

document.addEventListener('DOMContentLoaded', () => {
  MicroModal.init({
    openTrigger: 'data-micromodal-open', // [3]
    closeTrigger: 'data-micromodal-close', // [4]
    openClass: 'is-open', // [5]
    disableScroll: true, // [6]
    disableFocus: false, // [7]
    awaitOpenAnimation: true, // [8]
    awaitCloseAnimation: true, // [9]
    debugMode: true, // [10]
  });

  const swiperText = new Swiper('.slider__text', {
    speed: 2400,
    spaceBetween: 100,
    parallax: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    mousewheel: {
      invert: false,
    },
  });

  const swiper = new Swiper('.slider__img', {
    speed: 2400,
    //  spaceBetween: 100,
    parallax: true,
    pagination: {
      el: '.slider__pagination-count .total',
      type: 'custom',
      renderCustom(swiper, current, total) {
        const totalRes = total >= 10 ? total : `0${total}`;
        return totalRes;
      },
    },
  });
  swiper.controller.control = swiperText;
  swiperText.controller.control = swiper;

  const gear = document.querySelector('.slider__gear');
  swiperText.on('slidePrevTransitionStart', () => {
    gsap.to(gear, 2.8, {
      rotation: '-=45',
      ease: Power2.easeOut,
    });
  });
  swiperText.on('slideNextTransitionStart', () => {
    gsap.to(gear, 2.8, {
      rotation: '+=45',
      ease: Power2.easeOut,
    });
  });
  // slide change
  const curnum = document.querySelector('.current');
  const pagcur = document.querySelector('.spc__number');
  swiperText.on('slideChange', () => {
    const ind = swiperText.realIndex + 1;
    const indResult = ind >= 10 ? ind : `0${ind}`;
    gsap.to(curnum, 0.2, {
      force3D: true,
      y: -10,
      opacity: 0,
      ease: Power2.easeOut,
      onComplete() {
        gsap.to(curnum, 0.1, {
          force3D: true,
          y: 10,
        });
        curnum.innerHTML = indResult;
        pagcur.innerHTML = indResult;
      },
    });
    gsap.to(curnum, 0.2, {
      force3D: true,
      y: 0,
      delay: 0.3,
      opacity: 1,
      ease: Power2.easeOut,
    });
  });
});
