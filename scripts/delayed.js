// Custom cursor - oval with rotating "BUY NOW" text
function initCustomCursor() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.setAttribute('aria-hidden', 'true');

  // Build SVG via static file reference
  const img = document.createElement('img');
  img.src = '/icons/cursor-buy-now.svg';
  img.alt = '';
  img.width = 120;
  img.height = 80;
  cursor.append(img);
  document.body.append(cursor);

  let cursorX = -200;
  let cursorY = -200;
  let currentX = -200;
  let currentY = -200;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  function animate() {
    currentX += (cursorX - currentX) * 0.15;
    currentY += (cursorY - currentY) * 0.15;
    cursor.style.transform = `translate(${currentX - 50}px, ${currentY - 55}px)`;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

initCustomCursor();
