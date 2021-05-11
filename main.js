'use strict';

const header = document.querySelector('header');
const headerHeight = header.getBoundingClientRect().height;
const stars = document.querySelector('.stars');
const moon = document.querySelector('.moon');
const mountainsBehind = document.querySelector('.mountainsBehind');

document.addEventListener('scroll', () => {
  if (window.scrollY > headerHeight) {
    header.classList.add('header-dark');
  } else {
    header.classList.remove('header-dark');
  }
  stars.style.transform = `translateY(${window.scrollY}px)`;
  mountainsBehind.style.transform = `translateY(${window.scrollY}px)`;
});

// navbar 메뉴 클릭 시 해당 section 이동
const navbarMenu = document.querySelector('.navbar-list');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

//스크롤 다운 시 home contents 투명도 조절
const greet = document.querySelector('.greet');
const introBtn = document.querySelector('.intro-btn');

document.addEventListener('scroll', () => {
  greet.style.opacity = 1 - window.scrollY / 800;
  introBtn.style.opacity = 1 - window.scrollY / 1300;
});

// 스크롤 다운 시 arrow-up 투명도 조절
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

// arrow-up button 클릭 시 home section 이동
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// intro-btn button 클릭 시 intro section 이동
introBtn.addEventListener('click', () => {
  scrollIntoView('#intro');
});

// //Projects
// const prevBtn = document.querySelector('.slide__prev');
// const nextBtn = document.querySelector('.slide__next');
// const slideList = document.querySelector('.slide__list');
// const slides = document.querySelectorAll('.slide__item');
// let index = 0;
// moveSlide();

// function moveSlide() {
//   if (index === 0) {
//     prevBtn.classList.add('slide__side');
//   } else {
//     prevBtn.classList.remove('slide__side');
//   }

//   if (index === -(slides.length - 1)) {
//     nextBtn.classList.add('slide__side');
//   } else {
//     nextBtn.classList.remove('slide__side');
//   }

//   slideList.style.transform = `translateX(${index * 100}%)`;
// }

// prevBtn.addEventListener('click', () => {
//   ++index;
//   moveSlide();
// });

// nextBtn.addEventListener('click', () => {
//   --index;
//   moveSlide();
// });

// // IntersectionObserver API
// const sectionIds = [
//   '#home',
//   '#skills',
//   '#work',
//   '#announcement',
//   '#history',
//   '#testimonials',
//   '#contact',
// ];

// const sections = sectionIds.map((id) => document.querySelector(id));
// const navItems = sectionIds.map((id) => document.querySelector(`[data-link="${id}"]`));

// let selectedNavIndex = 0;
// let selectedNavItem = navItems[0];

// function selectNavItem(selected) {
//   selectedNavItem.classList.remove('active');
//   selectedNavItem = selected;
//   selectedNavItem.classList.add('active');
// }

// const observerOptions = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0.3,
// };

// const observerCallback = (entries, observer) => {
//   entries.forEach((entry) => {
//     if (!entry.isIntersecting && entry.intersectionRatio > 0) {
//       const index = sectionIds.indexOf(`#${entry.target.id}`);
//       if (entry.boundingClientRect.y < 0) {
//         selectedNavIndex = index + 1;
//       } else {
//         selectedNavIndex = index - 1;
//       }
//     }
//   });
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// sections.forEach((section) => observer.observe(section));

// window.addEventListener('wheel', () => {
//   if (window.scrollY === 0) {
//     selectedNavIndex = 0;
//   } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
//     selectedNavIndex = navItems.length - 1;
//   }
//   selectNavItem(navItems[selectedNavIndex]);
// });

// // History down
// const historyList = document.querySelector('.history__list');
// window.addEventListener('scroll', () => {
//   if (window.scrollY >= sections[4].offsetTop) {
//     historyList.classList.add('down');
//   } else {
//     historyList.classList.remove('down');
//   }
// });
