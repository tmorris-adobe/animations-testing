export default function decorate(block) {
  const rows = [...block.children];

  const content = document.createElement('div');
  content.className = 'hero-content';

  const images = document.createElement('div');
  images.className = 'hero-images';

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      const pic = cell.querySelector('picture');
      if (pic) {
        const img = pic.querySelector('img');
        const alt = img?.alt || '';
        const wrapper = document.createElement('div');

        if (alt.toLowerCase().includes('bottle')) {
          wrapper.className = 'hero-bottle';
        } else if (alt.toLowerCase().includes('logo')) {
          wrapper.className = 'hero-logo';
        } else {
          wrapper.className = 'hero-fire';
        }
        wrapper.append(pic);
        images.append(wrapper);
      } else {
        const heading = cell.querySelector('h1, h2, h3');
        const paragraphs = cell.querySelectorAll('p');
        const link = cell.querySelector('a');

        if (heading) content.append(heading);
        paragraphs.forEach((p) => {
          if (!p.querySelector('a')) content.append(p);
        });
        if (link) {
          link.className = 'button primary';
          const wrapper = document.createElement('p');
          wrapper.className = 'button-wrapper';
          wrapper.append(link);
          content.append(wrapper);
        }
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
        const rect = block.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
        const scale = 1 + progress * 0.15;
        bottle.style.transform = `scale(${scale})`;
        ticking = false;
      });
      ticking = true;
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    });
  }, { threshold: 0 });

  observer.observe(block);
}
