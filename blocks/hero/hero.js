export default function decorate(block) {
  const rows = [...block.children];

  const content = document.createElement('div');
  content.className = 'hero-content';

  const images = document.createElement('div');
  images.className = 'hero-images';

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      const pictures = cell.querySelectorAll('picture');
      if (pictures.length > 0) {
        pictures.forEach((pic) => {
          const img = pic.querySelector('img');
          const alt = (img?.alt || '').toLowerCase();
          const wrapper = document.createElement('div');

          if (alt.includes('bottle')) {
            wrapper.className = 'hero-bottle';
          } else if (alt.includes('logo')) {
            wrapper.className = 'hero-logo';
          } else {
            wrapper.className = 'hero-fire';
          }
          wrapper.append(pic);
          images.append(wrapper);
        });
      } else {
        const heading = cell.querySelector('h1');
        const headings = cell.querySelectorAll('h2, h3');
        const paragraphs = cell.querySelectorAll('p');
        const link = cell.querySelector('a');

        if (heading) content.append(heading);
        paragraphs.forEach((p) => {
          if (!p.querySelector('a') && !p.querySelector('picture')) content.append(p);
        });
        if (link) {
          link.className = 'button primary';
          const wrapper = document.createElement('p');
          wrapper.className = 'button-wrapper';
          wrapper.append(link);
          content.append(wrapper);
        }
        headings.forEach((h) => content.append(h));
      }
    });
  });

  block.textContent = '';
  block.append(content, images);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const bottle = block.querySelector('.hero-bottle');
  if (!bottle) return;

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const { scrollY } = window;
        const speed = 0.0026;
        const translateX = Math.sin(scrollY * speed) * 55;
        const rotate = translateX * 0.15;

        bottle.style.transform = `translateX(${translateX}vw) rotate(${rotate}deg)`;
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}
