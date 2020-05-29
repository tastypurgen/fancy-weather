import setDislpayInfo from './setDisplayInfo';
import getMap from './getMap';
import { setLanguage, useMetric, useImperal } from './utils';

const langBtn = document.querySelector('.header__lang');
const fBtn = document.querySelector('.header__degrees__btn-f');
const cBtn = document.querySelector('.header__degrees__btn-c');
const searchEl = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');

getMap();
setDislpayInfo();

if (!localStorage.lang) localStorage.lang = 'en';
if (!localStorage.unitsOW) localStorage.unitsOW = 'metric';
if (!localStorage.unitsWB) localStorage.unitsWB = 'M';
langBtn.value = localStorage.lang;

if (localStorage.unitsWB === 'm') fBtn.classList.add('active');
else cBtn.classList.add('active');

searchEl.addEventListener('submit', (e) => {
  e.preventDefault();
  // getMap(searchInput.value);
  setDislpayInfo(searchInput.value);
});

langBtn.addEventListener('change', (e) => {
  setLanguage(e.target.value);
});

fBtn.addEventListener('click', () => {
  useImperal();
});

cBtn.addEventListener('click', () => {
  useMetric();
});
