// Mark JS-on so reveal animation activates
document.body.classList.remove('no-js');

// Subtle reveal on scroll
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.chain-item, .phase, .principle, .ribbon-step, .reg-cat, .glossary-item').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
