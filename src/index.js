import setDislayInfo from './setDisplayInfo';
import getMap from './getMap';
import { setLanguage } from './utils';

const langBtn = document.querySelector('.header__lang');

getMap();
setDislayInfo();

langBtn.addEventListener('change', (e) => {
  setLanguage(e.target.value);
  setDislayInfo();
});

// (async function index() {
//   console.log(object);
// }());
