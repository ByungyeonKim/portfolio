'use strict';

const header = document.querySelector('header');
const headerHeight = header.getBoundingClientRect().height;
const stars = document.querySelector('.stars');

document.addEventListener('scroll', () => {
  if (window.scrollY > headerHeight) {
    header.classList.add('header-dark');
  } else {
    header.classList.remove('header-dark');
  }
  stars.style.transform = `translateY(${window.scrollY}px)`;
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

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

// arrow-up button 클릭 시 home section 이동
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// intro-btn button 클릭 시 intro section 이동
introBtn.addEventListener('click', () => {
  scrollIntoView('#intro');
});

// .json 파일에서 데이터 불러오기
function loadProjectCards() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((result) => result.cards);
}

// 불러온 데이터에 HTML 추가
function createHTMLCard(card) {
  return `
  <li class="card">
    <img class="card-image" src="${card.src}" alt="${card.alt}" />
    <div class="card-content">
      <h2 class="crad-title">${card.title}</h2>
      <p class="card-body">
        ${card.description}
      </p>
      <a href="${card.url}" class="card-button" target="_blank">${card.detail}</a>
    </div>
  </li>
  `;
}

// 불러온 데이터 렌더
function displayCards(cards) {
  const projectList = document.querySelector('.project-list');
  projectList.innerHTML = cards.map((card) => createHTMLCard(card)).join('');
}

loadProjectCards().then((cards) => {
  displayCards(cards);
});

// ClipboardJS

window.onload = () => {
  const clipboard = new ClipboardJS('.copy-btn');
  const tooltip = document.querySelector('.tooltip');

  clipboard.on('success', (e) => {
    tooltip.innerText = '복사 되었습니다!';
    tooltip.classList.add('show-tooltip');
    setTimeout(() => {
      tooltip.classList.remove('show-tooltip');
    }, 1500);
    e.clearSelection();
  });

  clipboard.on('error', (e) => {
    tooltip.innerText = '지원하지 않는 브라우저입니다.';
    tooltip.classList.add('show-tooltip');
    setTimeout(() => {
      tooltip.classList.remove('show-tooltip');
    }, 1500);
    e.clearSelection();
  });
};
