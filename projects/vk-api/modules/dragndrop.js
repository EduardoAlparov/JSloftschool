function makeDnD(zones) {
  // let currentDrag;

  // for (const zone of zones) {
  //   zone.addEventListener('dragstart', (e) => {
  //     currentDrag = { source: zone, node: e.target };
  //     e.dataTransfer.setData('text/html', '...');
  //   });

  //   zone.addEventListener('dragover', (e) => {
  //     e.preventDefault();
  //   });

  //   zone.addEventListener('drop', (e) => {
  //     if (currentDrag) {
  //       e.preventDefault();

  //       if (currentDrag.source !== zone) {
  //         if (e.target.classList.contains('friends__item')) {
  //           zone.insertBefore(currentDrag.node, e.target.nextElementSibling);
  //         } else {
  //           zone.insertBefore(currentDrag.node, zone.lastElementChild);
  //         }
  //       }
  //       currentDrag = null;
  //     }
  //   });
  // }
}

export default {
  makeDnD
}