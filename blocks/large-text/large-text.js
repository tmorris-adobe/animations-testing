export default function decorate(block) {
  const rows = [...block.children];
  const direction = block.classList.contains('left') ? 'left' : 'right';

  const text = rows.map((r) => r.textContent.trim()).join(' ');

  block.textContent = '';

  const track = document.createElement('div');
  track.className = `large-text-track large-text-${direction}`;

  for (let i = 0; i < 3; i += 1) {
    const item = document.createElement('span');
    item.className = 'large-text-item';
    item.textContent = text;
    item.setAttribute('aria-hidden', i > 0 ? 'true' : 'false');
    track.append(item);
  }

  block.append(track);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        track.classList.add('is-scrolling');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(block);
}
