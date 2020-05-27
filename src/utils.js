import setDislayInfo from './setDisplayInfo';

const fBtn = document.querySelector('.header__degrees__btn-f');
const cBtn = document.querySelector('.header__degrees__btn-c');
const searchInput = document.querySelector('.search-input');

export function convertToMinutes(num) {
  return parseInt((Number(num.toString().match(/([^.]+$)/)[0].slice(0, 2)) / 1.67).toString(), 10);
}

export function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  setDislayInfo(searchInput.value);
}

export function useImperal() {
  localStorage.unitsOW = 'imperial';
  localStorage.unitsWB = 'i';
  fBtn.classList.toggle('active');
  cBtn.classList.toggle('active');

  setDislayInfo();
}

export function useMetric() {
  localStorage.unitsOW = 'metric';
  localStorage.unitsWB = 'm';
  fBtn.classList.toggle('active');
  cBtn.classList.toggle('active');

  setDislayInfo();
}
