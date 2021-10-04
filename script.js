'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const headerTitle = document.querySelector('.header__title');
const signin = document.querySelector('.signin');

const openModal = function (e) {
  // e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(el => el.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const div = document.createElement('div');
div.classList.add('cookie-message');
div.innerHTML = `We use cookies for better analytics
 <button class=btn btn--close-cookie">Got it!</button>`;
const header = document.querySelector('header');
header.append(div);
div.addEventListener('click', function () {
  div.remove();
});

//Smooth Scroll Functionality -- Buttons
const smoothScrollLearnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
smoothScrollLearnMore.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // e.preventDefault();
  // Matching strategy to see if the class element we are
  // interested in is contained within the event object.
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

//Selections
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//Event handlers -- Good Way
tabsContainer.addEventListener('click', function (e) {
  //Use closest method for event delegation matching sttrategy
  const tabClickedOn = e.target.closest('.operations__tab');
  //Guard Clause -- Modern
  if (!tabClickedOn) return;

  //Remove All tabs active classes before to place rest down.
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  //Add active class ONLY to clicked tab..
  tabClickedOn.classList.add('operations__tab--active');

  // Remove all active content area classes first
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Selecting active content area using dyanmic template literals
  document
    .querySelector(`.operations__content--${tabClickedOn.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu Link Nav Bar fade animation
const nav = document.querySelector('.nav');

const refactoredCode = function (e, val) {
  if (e.target.classList.contains('nav__link')) {
    //Store the target
    const hover = e.target;

    //Get the siblings including the target
    const siblingsOfClicked = hover
      .closest('nav')
      .querySelectorAll('.nav__link');

    //Set opacities
    siblingsOfClicked.forEach(el => {
      //Since hovered element included, exclude it
      if (el !== hover) {
        el.style.opacity = this;
      }
    });
  }
};
nav.addEventListener('mouseover', refactoredCode.bind(0.5));
nav.addEventListener('mouseout', refactoredCode.bind(1));

// const initialXYSect1 = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   if (this.window.scrollY > initialXYSect1.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

const headerEl = document.querySelector('.header');
const makeNavStick = function (entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  });
};
const headerObserver = new IntersectionObserver(makeNavStick, {
  root: null,
  threshold: 0, //When ZERO PERCENT of header is in viewport.
});
headerObserver.observe(headerEl);

// SCROLL UP REVEAL ANIMATION

const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, //section only revealed when a value > 0 is reached.
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// LAZY LOADING
const imageContainer = document.querySelectorAll('.features__img');
const lazyLoader = function (entries, observer) {
  const [val] = entries;
  //GUARD CLAUSE
  if (!val.isIntersecting) return;
  val.target.src = val.target.dataset.src;
  // val.target.addEventListener('load', function());
  // val.target.classList.remove('lazy-img'); Sometimes img not finished loading
  val.target.addEventListener('load', () =>
    val.target.classList.remove('lazy-img')
  );

  // STOP OBSERVING - TASK COMPLETED
  observer.unobserve(val.target);
};
const imageObserver = new IntersectionObserver(lazyLoader, {
  root: null,
  threshold: 1,
  // root-margin: "200px"
});
imageContainer.forEach(img => imageObserver.observe(img));

const slides = document.querySelectorAll('.slide');
const maxSlides = slides.length;
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

let currentSlide = 0;
slides.forEach((slide, i) => {
  slide.style.transform = `translateX(${100 * i}%)`;
});

btnRight.addEventListener('click', function () {
  if (maxSlides - 1 === currentSlide) currentSlide = 0;
  else currentSlide++;
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
});
btnLeft.addEventListener('click', function () {
  if (currentSlide === 0) currentSlide = maxSlides - 1;
  else currentSlide--;
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
});

const dotContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
//Event Delegation for handling button clicks
dotContainer.addEventListener('click', function (e) {
  //Match element:
  if (e.target.classList.contains('dots__dot')) {
    const slideNumber = e.target.dataset.slide;
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - slideNumber)}%)`;
    });
  }
});

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

//Activate only on the one we are interested in.

// const siblingsOfCurrent = e.target.closest('.dots').children;
// console.log(siblingsOfCurrent);
// siblingsOfCurrent.forEach(sibling => {
//   if (sibling === e.target) e.target.classList.add('dots__dot--active');
//   else dot.classList.remove('dots__dot--active');
// });

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});
