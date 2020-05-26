import setDislayInfo from './setDisplayInfo';
import getMap from './getMap';
import { setLanguage, useMetric, useImperal } from './utils';

const langBtn = document.querySelector('.header__lang');
const fBtn = document.querySelector('.header__degrees__btn-f');
const cBtn = document.querySelector('.header__degrees__btn-c');

getMap();
setDislayInfo();
if (!localStorage.unitsOW) localStorage.unitsOW = 'metric';
if (!localStorage.unitsWB) localStorage.unitsWB = 'M';
if (!localStorage.lang) localStorage.lang = 'en';

if (localStorage.unitsWB === 'm') fBtn.classList.add('active');
else cBtn.classList.add('active');

langBtn.addEventListener('change', (e) => {
  setLanguage(e.target.value);
});

fBtn.addEventListener('click', () => {
  useImperal();
});

cBtn.addEventListener('click', () => {
  useMetric();
});
