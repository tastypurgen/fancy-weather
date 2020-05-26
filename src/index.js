import setDislayInfo from './setDisplayInfo';
import getMap from './getMap';

const langBtn = document.querySelector('.header__lang');

getMap();
setDislayInfo();

langBtn.addEventListener('change', (e) => {
  console.log(e.currentTarget.value);
});

// (async function index() {
//   console.log(object);
// }());
