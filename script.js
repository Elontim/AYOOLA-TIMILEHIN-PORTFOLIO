const body = document.body;
const themeButton = document.querySelector('.theme-toggle');
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') body.classList.add('dark');

if (themeButton) {
  const updateThemeLabel = () => themeButton.setAttribute('aria-label', body.classList.contains('dark') ? 'Switch to light theme' : 'Switch to dark theme');
  updateThemeLabel();
  themeButton.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('portfolio-theme', body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeLabel();
  });
}

if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active')?.classList.remove('active');
  document.querySelectorAll('.filter').forEach(filter => filter.setAttribute('aria-pressed', 'false'));
  button.classList.add('active');
  button.setAttribute('aria-pressed', 'true');
  const selected = button.dataset.filter;
  document.querySelectorAll('.project-card').forEach(card => {
    const match = selected === 'all' || card.dataset.category?.split(' ').includes(selected);
    card.classList.toggle('hidden', !match);
  });
}));
document.querySelectorAll('.filter').forEach(filter => filter.setAttribute('aria-pressed', String(filter.classList.contains('active'))));

const projectDetails = {
  concremix: {
    kicker: 'Smart materials • Quality assurance',
    title: 'ConcreMix',
    body: 'A handheld multi sensor concept for moving concrete quality checks from reactive inspection toward proactive verification.',
    challenge: 'Incorrect material ratios can remain invisible until structural defects appear, when correction is already costly.',
    approach: 'Combine electrical impedance, ultrasonic pulse velocity and temperature measurements with local processing, clear guidance and cloud ready records.'
  },
  solarguard: {
    kicker: 'Energy resilience • Public health',
    title: 'SolarGuard PHC',
    body: 'An EPICS in IEEE supported project designed for dependable power and actionable monitoring at a primary healthcare centre.',
    challenge: 'Unreliable electricity threatens essential healthcare services, including vaccine cold chain continuity.',
    approach: 'Integrate solar generation, battery autonomy and rapid remote alerts around measurable uptime, efficiency and diesel reduction targets.'
  },
  broiler: {
    kicker: 'Agritech • IoT automation',
    title: 'Automated Broiler Cage',
    body: 'A full stack monitoring and control platform for a multi tier poultry environment.',
    challenge: 'Manual monitoring makes it difficult to respond quickly and consistently to temperature, lighting, movement and feeding conditions.',
    approach: 'Stream ESP32 telemetry through MQTT and HiveMQ into a Django REST backend and React dashboard, using a simulator before gradual hardware integration.'
  },
  fire: {
    kicker: 'Safety systems • Embedded control',
    title: 'Smart Fire Detection and Extinguishing',
    body: 'An early response prototype that couples environmental sensing with automatic suppression and remote alerts.',
    challenge: 'Delayed detection and human response can allow small incidents to escalate before help arrives.',
    approach: 'Fuse flame and smoke sensing on an ESP32, trigger a local pump automatically and send web and Telegram notifications.'
  },
  educarbon: {
    kicker: 'Climate action • Inclusive learning',
    title: 'EduCarbon and GreenEduLoop',
    body: 'A social innovation concept that makes recycling participation visible, rewarding and educational.',
    challenge: 'Environmental awareness often fails to translate into repeatable action because incentives and accessible learning are disconnected.',
    approach: 'Use QR based activity records, micro learning and reward loops to help schools and communities build practical recycling habits.'
  },
  surveillance: {
    kicker: 'Robotics • Team engineering',
    title: 'WiFi Surveillance Robot',
    body: 'A mobile surveillance platform developed with more than 10 teammates for remote visual monitoring and navigation.',
    challenge: 'Remote inspection needs a compact platform that can move through an environment and transmit useful visual information.',
    approach: 'Integrate an ESP32 CAM, motor driver, geared motors, rechargeable power and a controllable mobile chassis through a collaborative hardware build.'
  }
};

const modal = document.querySelector('#project-modal');
if (modal) {
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
    const data = projectDetails[button.dataset.project];
    if (!data) return;
    document.querySelector('#modal-kicker').textContent = data.kicker;
    document.querySelector('#modal-title').textContent = data.title;
    document.querySelector('#modal-body').textContent = data.body;
    document.querySelector('#modal-challenge').textContent = data.challenge;
    document.querySelector('#modal-approach').textContent = data.approach;
    modal.showModal();
  }));
  document.querySelector('.modal-close')?.addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.open) modal.close(); });
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
document.querySelectorAll('#year').forEach(year => { year.textContent = new Date().getFullYear(); });
