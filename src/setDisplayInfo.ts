import getCurrentWeather from './getCurrentWeather';
import getLocationInfo from './getLocationInfo';

const cityEl = document.querySelector('.display__city span')
const dateEl = document.querySelector('.display__time span')
const timeEl = document.querySelector('.display__time span + span')
const temperatureEl = document.querySelector('.display__temperature')
const iconEl = document.querySelector('.display__temperature::after')
const summaryEl = document.querySelector('.summary')
const feelEl = document.querySelector('.feels-like span')
const windEl = document.querySelector('.wind span')
const humidityEl = document.querySelector('.humidity span')

async function setDisplayInfo() {
  const { city, state, country } = await getLocationInfo();
  const { temperature, icon, summary, feel, wind, humidity } = await getCurrentWeather();

  cityEl.textContent = `${city}, ${state}, ${country}`
  dateEl.textContent = new Date().toLocaleDateString('default', { weekday: 'short', month: 'long', day: 'numeric' })
  setInterval(() => timeEl.textContent = new Date().toLocaleTimeString('ru'), 1000)
  temperatureEl.textContent = temperature
  summaryEl.textContent = summary
  feelEl.textContent = feel
  windEl.textContent = wind
  humidityEl.textContent = humidity

}

export default setDisplayInfo;
