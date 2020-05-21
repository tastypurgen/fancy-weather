import getCurrentWeather from './getCurrentWeather';
import getLocationInfo from './getLocationInfo';
import iconToDisplay from './iconToDisplay';

const cityEl = document.querySelector('.display__city span');
const dateEl = document.querySelector('.display__time span');
const timeEl = document.querySelector('.display__time span + span');
const temperatureEl = document.querySelector('.display__temperature');
const iconEl = <HTMLElement>document.querySelector('.right');
const summaryEl = document.querySelector('.summary');
const feelEl = document.querySelector('.feels-like span');
const windEl = document.querySelector('.wind span');
const humidityEl = document.querySelector('.humidity span');

async function setDisplayInfo() {
  const { city, country } = await getLocationInfo();
  const {
    id, temperature, summary, feel, wind, humidity,
  } = await getCurrentWeather();

  cityEl.textContent = `${city}, ${country}`;
  dateEl.textContent = new Date().toLocaleDateString('default', { weekday: 'short', month: 'long', day: 'numeric' });
  setInterval(() => { timeEl.textContent = new Date().toLocaleTimeString('ru'); }, 1000);
  temperatureEl.textContent = temperature;
  iconEl.textContent = `code: ${id.toString()}`;
  iconEl.style.cssText = iconToDisplay(id);
  summaryEl.textContent = summary;
  feelEl.textContent = feel;
  windEl.textContent = wind;
  humidityEl.textContent = humidity;
}

export default setDisplayInfo;
