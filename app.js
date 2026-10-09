const toast = document.querySelector('.toast');
const content = document.querySelector('.content-wrap');
const pageLabel = document.querySelector('.breadcrumb strong');
const routes = {
  overview: { label: 'OVERVIEW', title: 'Good morning, Joris.', intro: 'The floor is moving well today. Here is your operational overview.' },
  production: { label: 'PRODUCTION', title: 'Production control room.', intro: 'A live view of every cell, shift, and handoff across the floor.' },
  projects: { label: 'PROJECTS', title: 'Programs in motion.', intro: 'Track the work that takes Scabro from first sketch to flight-ready.' },
  people: { label: 'PEOPLE & TEAMS', title: 'The people behind the work.', intro: 'Find a teammate, see who is on the floor, and stay connected.' },
  knowledge: { label: 'KNOWLEDGE BASE', title: 'Make the next answer easier.', intro: 'A living library of standards, playbooks, and lessons learned.' },
  quality: { label: 'QUALITY & SAFETY', title: 'Precision is a team sport.', intro: 'Keep every build traceable, safe, and ready for what comes next.' },
  calendar: { label: 'COMPANY CALENDAR', title: 'The week, at a glance.', intro: 'Meetings, briefings, and the moments that keep the whole system aligned.' }
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function pageTemplate(key) {
  const route = routes[key];
  if (key === 'overview') return null;
  const lists = {
    production: ['Cell 01 / Composite layup / On schedule', 'Cell 02 / Tooling inspection / Review needed', 'Cell 03 / Atlas airframe / Active now', 'Cell 04 / Helix landing gear / Handoff 14:30'],
    projects: ['Atlas / Flight-ready airframe', 'Helix / Landing gear system', 'Nova / Composite tooling', 'Orbit / Cabin demonstrator'],
    people: ['Engineering / 12 people online', 'Production / 18 people on the floor', 'Quality & safety / 8 people online', 'Operations / 4 people available'],
    knowledge: ['Getting started at Scabro', 'Composite handling standard', 'Atlas build playbook', 'Incident response guide'],
    quality: ['Open inspections / 3 items', 'Safety observations / 8 this month', 'Audit readiness / 94% complete', 'Recent completions / 21 items'],
    calendar: ['Daily floor briefing / Today 09:30', 'Atlas design review / Today 13:00', 'Safety walk / Today 15:30', 'Innovation afternoon / 22 October']
  };
  return `<section class="page-heading"><div><p class="eyebrow">${route.label} <span class="eyebrow-line"></span> KATWIJK</p><h1>${route.title.replace('.', '<span class="accent-dot">.</span>')}</h1><p class="intro">${route.intro}</p></div><button class="primary-button action-button">+ Create new</button></section><section class="route-grid">${lists[key].map((item, index) => `<article class="route-card"><span class="card-index">0${index + 1}</span><div><p class="eyebrow">${index % 2 ? 'ACTIVE NOW' : 'SCABRO HQ'}</p><h3>${item.split(' / ')[0]}</h3><p>${item.split(' / ').slice(1).join(' / ')}</p><a class="text-link" href="#overview">Open view <span>↗</span></a></div></article>`).join('')}</section><section class="data-panel"><div class="section-heading"><div><p class="eyebrow">WORKSPACE SIGNAL</p><h3>Today at Scabro</h3></div><span class="live-label dark-label"><span></span> LIVE</span></div><div class="signal-row"><strong>${key === 'calendar' ? '14' : key === 'quality' ? '98%' : '86%'}</strong><p>${key === 'calendar' ? 'events scheduled across HQ this week.' : 'of the workspace is moving on plan today.'}</p><span class="quality-trend">↗ 4.2%</span></div></section>`;
}

function navigate() {
  const key = window.location.hash.slice(1) || 'overview';
  const routeKey = routes[key] ? key : 'overview';
  pageLabel.textContent = routes[routeKey].label;
  const replacement = pageTemplate(routeKey);
  if (replacement) content.innerHTML = replacement;
  else window.location.reload();
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.getAttribute('href') === `#${routeKey}`));
  content.querySelectorAll('.action-button').forEach((item) => item.addEventListener('click', () => showToast(`${item.textContent.trim()} is ready for your note.`)));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('hashchange', navigate);
document.querySelector('.icon-button').addEventListener('click', () => showToast('Search is ready across the Scabro workspace.'));
document.querySelector('.notification-button').addEventListener('click', () => showToast('You have 3 new team updates.'));
document.querySelector('#addUpdate').addEventListener('click', () => showToast('Update composer is ready for your note.'));
document.querySelector('.add-calendar').addEventListener('click', () => showToast('New calendar event started.'));
navigate();
