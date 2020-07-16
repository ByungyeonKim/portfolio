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

//공통 함수 분리
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

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
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

//스크롤 다운 시 arrow-up 투명도 조절
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 3) {
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
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }
  //categoryBtn 클릭 시 효과 구현
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target =
    // ? = BUTTON이 맞으면 e.target을 실행하고 아니면(:) e.target.parentNode를 실행 해줘
    e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});
