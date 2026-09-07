// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu after a link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Scrollspy: highlight active nav link ----------
const sections = document.querySelectorAll('main section[id], .hero[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const setActive = (id) => {
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
  });
};

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(sec => observer.observe(sec));
}

// ---------- Lightbox for project screenshots ----------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('[data-lightbox]').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const href = trigger.getAttribute('href');
    const alt = trigger.querySelector('img')?.getAttribute('alt') || '';
    lightboxImg.setAttribute('src', href);
    lightboxImg.setAttribute('alt', alt);
    lightbox.classList.add('open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.setAttribute('src', '');
}

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
