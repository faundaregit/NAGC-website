const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

function closeNav() {
  if (!nav || !navToggle) return;
  nav.classList.remove('open');
  document.body.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.querySelector('.sr-only').textContent = 'Open navigation';
}

if (navToggle && nav) {
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
}

const species = [
  ['Rainbow trout', 'Oncorhynchus mykiss', 'freshwater'],
  ['Chinook salmon', 'Oncorhynchus tshawytscha', 'anadromous'],
  ['Atlantic sturgeon', 'Acipenser oxyrinchus', 'anadromous'],
  ['Lake sturgeon', 'Acipenser fulvescens', 'freshwater'],
  ['Paddlefish', 'Polyodon spathula', 'freshwater'],
  ['Muskellunge', 'Esox masquinongy', 'freshwater'],
  ['Walleye', 'Sander vitreus', 'freshwater'],
  ['Striped bass', 'Morone saxatilis', 'anadromous'],
  ['Atlantic cod', 'Gadus morhua', 'marine'],
  ['Blue crab', 'Callinectes sapidus', 'marine'],
  ['Eastern oyster', 'Crassostrea virginica', 'marine'],
  ['American eel', 'Anguilla rostrata', 'anadromous']
];

const speciesGrid = document.querySelector('#species-grid');
function renderSpecies(filter = 'all') {
  if (!speciesGrid) return;
  speciesGrid.replaceChildren();
  species.filter(item => filter === 'all' || item[2] === filter).forEach(([name, scientific, habitat]) => {
    const card = document.createElement('article');
    card.className = 'species-card';
    const text = document.createElement('div');
    const heading = document.createElement('h3');
    heading.textContent = name;
    const em = document.createElement('em');
    em.textContent = scientific;
    const badge = document.createElement('span');
    badge.textContent = habitat;
    text.append(heading, em);
    card.append(text, badge);
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

const projectForm = document.querySelector('#project-form');
if (projectForm) {
  projectForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(projectForm);
    const lines = [
      'Name: ' + (data.get('name') || ''),
      'Organization: ' + (data.get('organization') || ''),
      'Email: ' + (data.get('email') || ''),
      'Species or taxon: ' + (data.get('species') || ''),
      'Project stage: ' + (data.get('stage') || ''),
      'Approximate volume: ' + (data.get('volume') || ''),
      'Desired timeline: ' + (data.get('timeline') || ''),
      '',
      'Project summary:',
      data.get('summary') || ''
    ];
    const subject = encodeURIComponent('NAGC project inquiry: ' + (data.get('species') || 'aquatic germplasm'));
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = 'mailto:contact@nationalaquatic.org?subject=' + subject + '&body=' + body;
  });
}

document.querySelectorAll('[data-year]').forEach(node => {
  node.textContent = new Date().getFullYear();
});
