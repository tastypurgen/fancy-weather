import updateDisplay from './updateDisplay';
import getMap from './getMap';
import setPicture from './setPicture';
import { setLanguage, useMetric, useImperal } from './utils';
import playMusic from './playMusic';

const langBtn = document.querySelector('.header__lang');
const fBtn = document.querySelector('.header__degrees__btn-f');
const cBtn = document.querySelector('.header__degrees__btn-c');
const searchEl = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');
const reloadBtn = document.querySelector('.header__reload');
const playBtn = document.querySelector('.play-btn');

getMap();
updateDisplay();

if (!localStorage.lang) localStorage.lang = 'en';
if (!localStorage.unitsOW) localStorage.unitsOW = 'metric';
if (!localStorage.unitsWB) localStorage.unitsWB = 'M';
langBtn.value = localStorage.lang;

if (localStorage.unitsWB === 'm') fBtn.classList.add('active');
else cBtn.classList.add('active');

searchEl.addEventListener('submit', (e) => {
  e.preventDefault();
  updateDisplay(searchInput.value);
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

reloadBtn.addEventListener('click', () => {
  setPicture();
});

playBtn.addEventListener('click', () => {
  playMusic();
});
