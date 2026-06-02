export default function decorate(block) {
  const rows = [...block.children];
  const text = rows[0]?.textContent?.trim() || '';
  const stripCount = 4;
  const directions = ['right', 'left', 'right', 'left'];

  block.textContent = '';

  for (let i = 0; i < stripCount; i += 1) {
    const strip = document.createElement('div');
    strip.className = `scroll-text-strip scroll-text-${directions[i]}`;

    const track = document.createElement('div');
    track.className = 'scroll-text-track';

    for (let j = 0; j < 8; j += 1) {
      const item = document.createElement('span');
      item.className = 'scroll-text-item';
      item.textContent = text;
      track.append(item);
    }

    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');

    strip.append(track, clone);
    block.append(strip);
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    block.querySelectorAll('.scroll-text-track').forEach((t) => {
      t.style.animationPlayState = 'paused';
    });
  }
}
