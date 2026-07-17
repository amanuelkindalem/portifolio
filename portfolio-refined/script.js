// ---- Footer year ----
document.getElementById('year').textContent = `© ${new Date().getFullYear()} Amanuel Kindalem`;

// ---- Nav scroll shadow ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 12) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
});

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', () => {
  const isOpen = navMobile.style.display === 'flex';
  navMobile.style.display = isOpen ? 'none' : 'flex';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
});

/* ---- Typing animation for hero title + list ---- */
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function typeIntoElement(el, text, speed = 80) {
  const span = el.querySelector('.typed-text') || el;
  span.textContent = '';
  for (let i = 0; i < text.length; i++) {
    span.textContent += text[i];
    await sleep(speed);
  }
}

async function typeList(listEl, itemSpeed = 60, between = 250) {
  const items = Array.from(listEl.querySelectorAll('li'));
  for (const li of items) {
    const txt = li.dataset.text || li.textContent.trim();
    await typeIntoElement(li, txt, itemSpeed);
    await sleep(between);
  }
}

async function runTypingCycle() {
  const titleEl = document.querySelector('.hero__title');
  const rolesEl = document.querySelector('.hero__roles');
  if (!titleEl || !rolesEl) return;

  // make sure spots are empty
  titleEl.querySelector('.typed-text').textContent = '';
  rolesEl.querySelectorAll('.typed-text').forEach((s) => {
    s.textContent = '';
  });

  titleEl.classList.add('typing-active');
  await typeIntoElement(titleEl, titleEl.dataset.text || '', 90);
  titleEl.classList.remove('typing-active');
  await sleep(500);
  await typeList(rolesEl, 60, 220);

  // pause, then clear and restart after a short delay
  await sleep(1200);
  titleEl.querySelector('.typed-text').textContent = '';
  rolesEl.querySelectorAll('.typed-text').forEach((s) => {
    s.textContent = '';
  });
  await sleep(500);
  runTypingCycle();
}

// start after page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(runTypingCycle, 400));
} else {
  setTimeout(runTypingCycle, 400);
}
document.querySelectorAll('.nav__mobile-link').forEach((link) => {
  link.addEventListener('click', () => {
    navMobile.style.display = 'none';
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---- Portfolio filter tabs ----
const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('#projectsGrid .project-card');

filterTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    filterTabs.forEach((t) => t.classList.remove('filter-tab--active'));
    tab.classList.add('filter-tab--active');

    const filter = tab.dataset.filter;
    projectCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('project-card--hidden', !show);
    });
  });
});


