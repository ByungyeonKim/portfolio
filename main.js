'use strict';

// 최상단메뉴 스크롤 시 고정
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

//navbar 메뉴 클릭 시 해당 section 이동
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});

//모바일 화면 시 Toggle button 활성화
const navbarToggleBtn = document.querySelector('.navbar__toggle-button');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
  navbarToggleBtn.classList.toggle('active');
  navbarToggleBtn.classList.toggle('not-active');
});

//contact me 버튼 클릭 시 contact section 이동
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

//스크롤 다운 시 home contents 투명도 조절
const home = document.querySelector('.home__container');
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / 500;
});

//스크롤 다운 시 arrow-up 투명도 조절
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

//arrow-up button 클릭 시 home section 이동
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

//Projects
const prevBtn = document.querySelector('.slide__prev');
const nextBtn = document.querySelector('.slide__next');
const slideList = document.querySelector('.slide__list');
const slides = document.querySelectorAll('.slide__item');
let index = 0;
moveSlide();

function moveSlide() {
  if(index === 0) {
    prevBtn.classList.add('slide__side');
  } else {
    prevBtn.classList.remove('slide__side');
  };

  if (index === -(slides.length -1)) {
    nextBtn.classList.add('slide__side');
  } else {
    nextBtn.classList.remove('slide__side');
  };

  slideList.style.transform = `translateX(${index * 100}%)`;
}

prevBtn.addEventListener('click', () => {
  ++index;
  moveSlide();
});

nextBtn.addEventListener('click', () => {
  --index;
  moveSlide();
});

// IntersectionObserver API
const sectionIds = [
  '#home', 
  '#skills', 
  '#work', 
  '#announcement',
  '#history', 
  '#testimonials', 
  '#contact'
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
  if(window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
      Math.round(window.scrollY + window.innerHeight) >= 
      document.body.clientHeight
    ) {
      selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});