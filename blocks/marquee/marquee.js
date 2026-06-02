export default function decorate(block) {
  const direction = block.classList.contains('right') ? 'right' : 'left';
  const speed = block.classList.contains('slow') ? '40s' : '20s';

  const items = [...block.children];
  const track = document.createElement('div');
  track.className = 'marquee-track';
  track.style.setProperty('--marquee-speed', speed);

  items.forEach((item) => {
    const text = item.textContent.trim();
    const span = document.createElement('span');
    span.className = 'marquee-item';
    span.textContent = text;
    track.append(span);

    const separator = document.createElement('span');
    separator.className = 'marquee-separator';
    separator.textContent = '+';
    track.append(separator);
  });

  const clone = track.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');

  const wrapper = document.createElement('div');
  wrapper.className = `marquee-wrapper marquee-${direction}`;
  wrapper.append(track, clone);

  block.textContent = '';
  block.append(wrapper);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    wrapper.style.animationPlayState = 'paused';
  }
}
