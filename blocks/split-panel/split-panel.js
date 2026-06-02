export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    row.classList.add('split-panel-item');
    const cells = [...row.children];
    cells.forEach((cell) => {
      if (cell.querySelector('picture')) {
        cell.classList.add('split-panel-image');
      } else {
        cell.classList.add('split-panel-content');
      }
    });
  });
}
