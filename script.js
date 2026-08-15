const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

function closeNav() {
  nav.classList.remove('open');
  document.body.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.querySelector('.sr-only').textContent = 'Open navigation';
}

navToggle.addEventListener('click', () => {
  const willOpen = !nav.classList.contains('open');
  nav.classList.toggle('open', willOpen);
  document.body.classList.toggle('nav-open', willOpen);
  navToggle.setAttribute('aria-expanded', String(willOpen));
  navToggle.querySelector('.sr-only').textContent = willOpen ? 'Close navigation' : 'Open navigation';
});

nav.addEventListener('click', event => {
  if (event.target.closest('a')) closeNav();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    closeNav();
    navToggle.focus();
  }
});

const tabs = [...document.querySelectorAll('[role="tab"]')];
function activateTab(tab) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let target = index;
    if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = tabs.length - 1;
    else return;
    event.preventDefault();
    activateTab(tabs[target]);
    tabs[target].focus();
  });
});

const species = [
  ['Rainbow trout','Oncorhynchus mykiss','freshwater'],
  ['Chinook salmon','Oncorhynchus tshawytscha','anadromous'],
  ['Atlantic sturgeon','Acipenser oxyrinchus','anadromous'],
  ['Lake sturgeon','Acipenser fulvescens','freshwater'],
  ['Paddlefish','Polyodon spathula','freshwater'],
  ['Muskellunge','Esox masquinongy','freshwater'],
  ['Walleye','Sander vitreus','freshwater'],
  ['Striped bass','Morone saxatilis','anadromous'],
  ['Atlantic cod','Gadus morhua','marine'],
  ['Blue crab','Callinectes sapidus','marine'],
  ['Eastern oyster','Crassostrea virginica','marine'],
  ['American eel','Anguilla rostrata','anadromous']
];
const speciesGrid = document.querySelector('#species-grid');
function renderSpecies(filter = 'all') {
  speciesGrid.replaceChildren();
  species.filter(item => filter === 'all' || item[2] === filter).forEach(([name, scientific, habitat]) => {
    const card = document.createElement('article');
    card.className = 'species-card';
    const heading = document.createElement('h3');
    heading.textContent = name;
    const em = document.createElement('em');
    em.textContent = scientific;
    const badge = document.createElement('span');
    badge.textContent = habitat;
    const wrapper = document.createElement('div');
    wrapper.append(heading, em);
    card.append(wrapper, badge);
    speciesGrid.append(card);
  });
}

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    renderSpecies(button.dataset.filter);
  });
});

renderSpecies();
document.querySelector('#year').textContent = new Date().getFullYear();
