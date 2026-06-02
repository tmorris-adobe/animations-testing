function createSegment(label, food, picture, includeImage) {
  const segment = document.createElement('div');
  segment.className = 'food-pairing-segment';

  const labelSpan = document.createElement('span');
  labelSpan.className = 'food-pairing-label';
  labelSpan.textContent = label;

  const foodSpan = document.createElement('span');
  foodSpan.className = 'food-pairing-food';
  foodSpan.textContent = food;

  if (includeImage && picture) {
    const imgSpan = document.createElement('span');
    imgSpan.className = 'food-pairing-image';
    imgSpan.append(picture.cloneNode(true));
    segment.append(imgSpan, labelSpan, foodSpan);
  } else {
    segment.append(labelSpan, foodSpan);
  }

  return segment;
}

export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  const labelRow = rows[0];
  const foodRow = rows[1];
  const imageRow = rows[2];

  const label = labelRow?.textContent?.trim() || '';
  const food = foodRow?.textContent?.trim() || '';
  const picture = imageRow?.querySelector('picture');

  const direction = block.classList.contains('left') ? 'left' : 'right';

  block.textContent = '';

  const track = document.createElement('div');
  track.className = `food-pairing-track food-pairing-${direction}`;

  for (let i = 0; i < 3; i += 1) {
    track.append(createSegment(label, food, picture, i > 0 || !picture));
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
