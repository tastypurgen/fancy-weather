import setDislayInfo from './updateDisplay';

const fBtn = document.querySelector('.header__degrees__btn-f');
const cBtn = document.querySelector('.header__degrees__btn-c');
const searchInput = document.querySelector('.search-input');
const spinnerContainer = document.querySelector('.spinner-container');
const main = document.querySelector('.main');

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

export function toggleSpinner() {
  spinnerContainer.classList.toggle('hidden');
  main.classList.toggle('blur');
}

export function getPlace(suburb, city, county, state, country) {
  const result = [];

  if (suburb) result.push(suburb);
  if (city) result.push(city);
  else if (county) result.push(county);
  else if (state) result.push(state);
  if (country) result.push(country);

  return result.join(', ');
}
