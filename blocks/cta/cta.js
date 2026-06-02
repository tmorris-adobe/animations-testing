export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      if (cell.querySelector('picture')) {
        cell.classList.add('cta-image');
      } else {
        cell.classList.add('cta-content');
      }
    });
    row.classList.add('cta-row');
  });
}
