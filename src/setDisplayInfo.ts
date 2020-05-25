import * as moment from 'moment';
import getWeather from './getWeather';
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
const forecastWeekDays = document.querySelectorAll('.day');
const forecastElements = document.querySelectorAll('.temperature');
const forecastIcons = document.querySelectorAll('.icon img');


async function setDisplayInfo() {
  const { city, country } = await getLocationInfo();
  const {
    id, temperature, summary, feel, wind, humidity, d0Temp, d1Temp, d2Temp, d0Icon, d1Icon, d2Icon,
  } = await getWeather();

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

  forecastWeekDays[0].textContent = moment().add(1, 'day').format('dddd');
  forecastWeekDays[1].textContent = moment().add(2, 'day').format('dddd');
  forecastWeekDays[2].textContent = moment().add(3, 'day').format('dddd');
  forecastElements[0].textContent = d0Temp;
  forecastElements[1].textContent = d1Temp;
  forecastElements[2].textContent = d2Temp;
  forecastIcons[0].setAttribute('src', d0Icon);
  forecastIcons[1].setAttribute('src', d1Icon);
  forecastIcons[2].setAttribute('src', d2Icon);


  // forecastElements.forEach((el, i) => {
  //   const number = 0;
  //   el.textContent = days[`day${i}`];

  //   // console.log(days[`day${i}`]: );
  //   // console.log(days[i]);
  //   // console.log(days[`day${i}`]);
  //   // el.textContent = days[`day${i}`];
  // });
}

export default setDisplayInfo;
